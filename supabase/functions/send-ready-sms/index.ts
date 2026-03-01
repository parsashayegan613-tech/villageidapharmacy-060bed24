import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID")!;
const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN")!;
const twilioPhoneNumber = Deno.env.get("TWILIO_PHONE_NUMBER")!;

serve(async (req) => {
    const url = new URL(req.url);
    const name = url.searchParams.get("name") || "Patient";
    const number = url.searchParams.get("number");

    if (!number) {
        return new Response("Missing number", { status: 400 });
    }

    const message = `Village IDA Pharmacy: Hello ${name}, your prescription refill request is now complete and ready!`;

    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
    const basicAuth = btoa(`${twilioAccountSid}:${twilioAuthToken}`);

    const body = new URLSearchParams();
    body.append("To", number);
    body.append("From", twilioPhoneNumber);
    body.append("Body", message);

    try {
        const twilioRes = await fetch(twilioUrl, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${basicAuth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body.toString(),
        });

        if (!twilioRes.ok) {
            const err = await twilioRes.text();
            console.error(err);
            return new Response(`Failed to send SMS: ${err}`, { status: 500 });
        }

        return new Response(
            "<html><head><title>Success</title><meta name='viewport' content='width=device-width, initial-scale=1' /></head><body style='font-family: sans-serif; text-align: center; padding: 50px;'><h1>✅ Message Sent!</h1><p style='color:#555;'>The patient has been notified that their prescription is ready.</p><script>setTimeout(() => { window.close() }, 3000)</script></body></html>",
            { headers: { "Content-Type": "text/html" } }
        );
    } catch (e: any) {
        return new Response(`Error: ${e.message}`, { status: 500 });
    }
});
