# Village IDA Pharmacy — To-Do List

## Pending
- [ ] **Custom SMTP for auth emails** — Configure Supabase to send confirmation/reset emails from `villageidapharmacy@gmail.com`. Go to Supabase Dashboard → Auth → SMTP Settings and enter SMTP credentials. Also customize email templates under Auth → Email Templates.
- [ ] **Change admin password** — Update the default admin password (`VillageAdmin2026!`) in Supabase Dashboard → Authentication → Users.
- [ ] **Propel Rx Integration** (CANCELLED / ON HOLD) — Deemed not worth the ROI since patients are used to the current workflow and McKesson integration is complex.
- [ ] **Security Hardening (Turnstile & RLS)** — Post-domain connection: set up Cloudflare Turnstile invisible widget for forms. Deploy Supabase Edge Functions to validate tokens and revoke direct `INSERT` access from public SQL to prevent bot spam.

## Completed
- [x] Admin Portal (Dashboard, Appointments, Refills, Transfers, Messages)
- [x] Unified auth system (Sign In / Sign Up with admin auto-redirect)
- [x] Phone number field on customer sign-up
