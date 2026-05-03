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

const appointmentSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(40),
  contactMethod: z.enum(["call", "text"]),
  date: z.string().trim().max(80),
  time: z.string().trim().max(40),
  serviceType: z.string().trim().min(2).max(80),
  notes: z.string().trim().max(1000).optional(),
  website: z.string().optional(),
  turnstileToken: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const limit = checkRateLimit(request, "appointments", 5);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfter);

  const json = await request.json().catch(() => null);
  const parsed = appointmentSchema.safeParse(json);

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
    const { error } = await supabase.from("appointments").insert({
      client_name: data.name,
      client_email: data.email,
      client_phone: data.phone,
      appointment_date: data.date,
      appointment_time: data.time,
      service_type: data.serviceType,
      notes: optionalText(data.notes),
      status: "pending",
      user_id: null,
    });

    if (error) throw error;

    const { error: alertError } = await supabase.functions.invoke("send-appointment-alert", {
      body: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        contactMethod: data.contactMethod,
        date: data.date,
        time: data.time,
        serviceType: data.serviceType,
        notes: data.notes ?? "",
      },
    });

    if (alertError) {
      console.error("Appointment alert failed:", alertError.message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Appointment request failed:", getErrorMessage(error));
    return NextResponse.json({ error: "Unable to submit this request right now." }, { status: 500 });
  }
}
