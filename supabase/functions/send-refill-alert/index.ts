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
        const { name, phone, prescriptions, deliveryType } = payload;

        const encodedName = encodeURIComponent(name);
        const encodedPhone = encodeURIComponent(phone);
        const magicLink = `https://nbbpchwweyzpiurlluzz.supabase.co/functions/v1/send-ready-sms?name=${encodedName}&number=${encodedPhone}`;

        const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #0f172a;">New Refill Request 💊</h2>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
          <p><strong>Patient:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Type:</strong> <span style="text-transform: capitalize;">${deliveryType}</span></p>
          <p><strong>Prescriptions:</strong> ${prescriptions.map((rx: string) => `<br/>• ${rx}`).join("")}</p>
        </div>
        
        <p style="margin-bottom: 20px;">When you finish filling this prescription, click the button below to instantly mark it as complete and send a text message alert to the patient:</p>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="${magicLink}" 
             style="background-color: #22c55e; color: white; padding: 16px 28px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block; font-size: 16px;">
            ✅ Mark as Ready & Text Patient
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
                to: "villageidapharmacy@gmail.com",
                subject: `New Refill Request - ${name}`,
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
