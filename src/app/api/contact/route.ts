import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import {
  checkRateLimit,
  getErrorMessage,
  isHoneypotFilled,
  optionalText,
  rateLimitResponse,
  verifyTurnstile,
} from "@/lib/form-security";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(40),
  message: z.string().trim().min(2).max(1500),
  website: z.string().optional(),
  turnstileToken: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const limit = checkRateLimit(request, "contact", 5);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfter);

  const json = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success || isHoneypotFilled(parsed.success ? parsed.data.website : undefined)) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const data = parsed.data;
  const turnstile = await verifyTurnstile(request, data.turnstileToken);
  if (!turnstile.ok) {
    return NextResponse.json({ error: turnstile.error }, { status: 400 });
  }

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("contact_messages").insert({
      full_name: data.name,
      phone: data.phone,
      message: data.message,
      status: "unread",
      user_id: null,
    });

    if (error) throw error;

    const { error: alertError } = await supabase.functions.invoke("send-contact-alert", {
      body: {
        name: data.name,
        phone: data.phone,
        message: optionalText(data.message),
      },
    });

    if (alertError) {
      console.error("Contact alert failed:", alertError.message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact request failed:", getErrorMessage(error));
    return NextResponse.json({ error: "Unable to submit this message right now." }, { status: 500 });
  }
}
