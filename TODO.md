# Village IDA Pharmacy — To-Do List

## Pending
- [ ] **Custom SMTP for auth emails** — Configure Supabase to send confirmation/reset emails from `villida@telus.net` instead of `noreply@mail.app.supabase.io`. Go to Supabase Dashboard → Auth → SMTP Settings and enter TELUS SMTP credentials. Also customize email templates under Auth → Email Templates.
- [ ] **Change admin password** — Update the default admin password (`VillageAdmin2026!`) in Supabase Dashboard → Authentication → Users.
- [ ] **Propel Rx Integration** — Connect website to McKesson Canada's Propel Rx PMS to sync patient profiles, pull prescription data, and route refill/transfer requests into the PMS workflow. Explore McKesson API access and HL7/FHIR interoperability options. May require contacting McKesson Canada for API credentials or partner access.
- [ ] **Security Hardening (Turnstile & RLS)** — Post-domain connection: set up Cloudflare Turnstile invisible widget for forms. Deploy Supabase Edge Functions to validate tokens and revoke direct `INSERT` access from public SQL to prevent bot spam.

## Completed
- [x] Admin Portal (Dashboard, Appointments, Refills, Transfers, Messages)
- [x] Unified auth system (Sign In / Sign Up with admin auto-redirect)
- [x] Phone number field on customer sign-up
