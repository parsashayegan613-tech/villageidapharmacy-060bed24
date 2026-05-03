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

const refillSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(40),
  email: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().trim().email().max(254).optional(),
  ),
  prescriptions: z.array(z.string().trim().max(80)).max(12),
  deliveryType: z.enum(["pickup", "delivery"]),
  address: z.string().trim().max(180).optional(),
  city: z.string().trim().max(80).optional(),
  postalCode: z.string().trim().max(20).optional(),
  notes: z.string().trim().max(1000).optional(),
  website: z.string().optional(),
  turnstileToken: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const limit = checkRateLimit(request, "refills", 5);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfter);

  const json = await request.json().catch(() => null);
  const parsed = refillSchema.safeParse(json);

  if (!parsed.success || isHoneypotFilled(parsed.success ? parsed.data.website : undefined)) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const data = parsed.data;
  const turnstile = await verifyTurnstile(request, data.turnstileToken);
  if (!turnstile.ok) {
    return NextResponse.json({ error: turnstile.error }, { status: 400 });
  }

  const prescriptions = data.prescriptions.map((rx) => rx.trim()).filter(Boolean);

  if (prescriptions.length === 0) {
    return NextResponse.json({ error: "Add at least one prescription number." }, { status: 400 });
  }

  if (data.deliveryType === "delivery" && !data.address?.trim()) {
    return NextResponse.json({ error: "Add a delivery address." }, { status: 400 });
  }

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("refills").insert({
      full_name: data.name,
      phone: data.phone,
      email: data.email ?? null,
      contact_method: "text",
      prescriptions,
      delivery_type: data.deliveryType,
      address: data.deliveryType === "delivery" ? optionalText(data.address) : null,
      city: data.deliveryType === "delivery" ? optionalText(data.city) : null,
      postal_code: data.deliveryType === "delivery" ? optionalText(data.postalCode) : null,
      notes: optionalText(data.notes),
      status: "pending",
      user_id: null,
    });

    if (error) throw error;

    const { error: alertError } = await supabase.functions.invoke("send-refill-alert", {
      body: {
        name: data.name,
        phone: data.phone,
        prescriptions,
        deliveryType: data.deliveryType,
      },
    });

    if (alertError) {
      console.error("Refill alert failed:", alertError.message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Refill request failed:", getErrorMessage(error));
    return NextResponse.json({ error: "Unable to submit this request right now." }, { status: 500 });
  }
}
