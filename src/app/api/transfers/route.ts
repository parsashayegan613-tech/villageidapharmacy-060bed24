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

const transferSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(40),
  currentPharmacy: z.string().trim().min(2).max(160),
  currentPharmacyPhone: z.string().trim().max(40).optional(),
  notes: z.string().trim().max(1000).optional(),
  medications: z.array(z.string().trim().max(120)).max(12),
  website: z.string().optional(),
  turnstileToken: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const limit = checkRateLimit(request, "transfers", 5);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfter);

  const json = await request.json().catch(() => null);
  const parsed = transferSchema.safeParse(json);

  if (!parsed.success || isHoneypotFilled(parsed.success ? parsed.data.website : undefined)) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const data = parsed.data;
  const turnstile = await verifyTurnstile(request, data.turnstileToken);
  if (!turnstile.ok) {
    return NextResponse.json({ error: turnstile.error }, { status: 400 });
  }

  const medications = data.medications.map((medication) => medication.trim()).filter(Boolean);
  const medicationsText = medications.length > 0
    ? `Medications to Transfer:\n${medications.map((medication) => `- ${medication}`).join("\n")}\n\n`
    : "";
  const fullNotes = `${medicationsText}Notes:\n${data.notes ?? ""}`.trim();

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("transfers").insert({
      full_name: data.name,
      phone: data.phone,
      current_pharmacy: data.currentPharmacy,
      current_pharmacy_phone: optionalText(data.currentPharmacyPhone),
      notes: fullNotes || null,
      status: "pending",
      user_id: null,
    });

    if (error) throw error;

    const { error: alertError } = await supabase.functions.invoke("send-transfer-alert", {
      body: {
        name: data.name,
        phone: data.phone,
        currentPharmacy: data.currentPharmacy,
        medications,
      },
    });

    if (alertError) {
      console.error("Transfer alert failed:", alertError.message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Transfer request failed:", getErrorMessage(error));
    return NextResponse.json({ error: "Unable to submit this request right now." }, { status: 500 });
  }
}
