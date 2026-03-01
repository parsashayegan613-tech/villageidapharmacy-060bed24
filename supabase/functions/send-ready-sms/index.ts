import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID")!;
const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN")!;
const twilioPhoneNumber = Deno.env.get("TWILIO_PHONE_NUMBER")!;

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        let name = "Patient";
        let number: string | null = null;
        let type = "pickup";

        if (req.method === 'POST') {
            const body = await req.json();
            name = body.name || name;
            number = body.number;
            type = body.type || type;
        } else {
            const url = new URL(req.url);
            name = url.searchParams.get("name") || name;
            number = url.searchParams.get("number");
            type = url.searchParams.get("type") || type;
        }

        if (!number) {
            return new Response(JSON.stringify({ error: "Missing number" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
        }

        let message;
        if (type === "delivery") {
            message = `Village IDA Pharmacy: Hello ${name}, your prescription is out for delivery and will be dropped off soon!`;
        } else if (type === "delivered") {
            message = `Village IDA Pharmacy: Hello ${name}, your prescription has been delivered to your address!`;
        } else {
            message = `Village IDA Pharmacy: Hello ${name}, your prescription refill request is now complete and ready for pickup!`;
        }

        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
        const basicAuth = btoa(`${twilioAccountSid}:${twilioAuthToken}`);

        const bodyParams = new URLSearchParams();
        bodyParams.append("To", number);
        bodyParams.append("From", twilioPhoneNumber);
        bodyParams.append("Body", message);

        const twilioRes = await fetch(twilioUrl, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${basicAuth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: bodyParams.toString(),
        });

        if (!twilioRes.ok) {
            const err = await twilioRes.text();
            console.error(err);
            return new Response(JSON.stringify({ error: `Failed to send SMS: ${err}` }), {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
        }

        if (req.method === 'GET') {
            return new Response(
                "<html><head><title>Success</title><meta name='viewport' content='width=device-width, initial-scale=1' /></head><body style='font-family: sans-serif; text-align: center; padding: 50px;'><h1>✅ Message Sent!</h1><p style='color:#555;'>The patient has been notified.</p><script>setTimeout(() => { window.close() }, 3000)</script></body></html>",
                { headers: { "Content-Type": "text/html" } }
            );
        } else {
            return new Response(JSON.stringify({ success: true }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
        }
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
    }
});
