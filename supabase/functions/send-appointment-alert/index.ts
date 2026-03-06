import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const { name, email, phone, contactMethod, date, time, serviceType, notes } = payload;

    const formattedServiceType = serviceType.replace('-', ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #0f172a;">New Appointment Request ⏱️</h2>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
          <p><strong>Patient:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Contact Method:</strong> <span style="text-transform: capitalize;">${contactMethod}</span></p>
          <p><strong>Service Type:</strong> ${formattedServiceType}</p>
          <p><strong>Preferred Date:</strong> ${date}</p>
          <p><strong>Preferred Time:</strong> ${time}</p>
          <p><strong>Notes:</strong><br/>${notes || "None"}</p>
        </div>
        
        <p style="margin-bottom: 20px;">Please contact the patient to confirm their appointment time.</p>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="mailto:${email}" style="background-color: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block; font-size: 16px; margin-right: 15px;">
            ✉️ Email Patient
          </a>
          <a href="tel:${phone}" style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block; font-size: 16px;">
            📞 Call Patient
          </a>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Pharmacy Alerts <onboarding@resend.dev>", // Note: Resend onboarding domain is strictly for testing, production uses custom domain
        to: "parsashayegan613@gmail.com",
        subject: `New Appointment Request - ${name} (${formattedServiceType})`,
        html: html,
      }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
});
