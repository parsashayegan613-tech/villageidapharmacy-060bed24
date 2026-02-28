# SOP: Appointment Booking Process

## Goal
To successfully capture appointment requests from clients and persist them in the Supabase `appointments` table.

## Inputs
- `client_name`: Full name of the client.
- `client_email`: Valid email address.
- `client_phone`: Optional phone number.
- `appointment_date`: The selected date.
- `appointment_time`: The selected time slot.
- `service_type`: The reason for the appointment (e.g., Flu Shot).
- `notes`: Optional client comments.

## Tool Logic (Layer 3)
1.  **Validation**: Check all required fields are present and email format is valid.
2.  **Duplicate Check**: (Optional) Prevent double-booking for the same client and time.
3.  **Client Persistence**: Upsert client record into the `clients` table.
4.  **Appointment Persistence**: Insert the appointment record into the `appointments` table.

## Edge Cases
- **Database Downtime**: Form should show a retry/error message if Supabase is unreachable.
- **Race Conditions**: Two clients booking the same slot simultaneously (handled by database constraints if implemented).
- **Validation Errors**: Inform the user immediately on the frontend.
