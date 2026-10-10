# Booking email setup

Booking requests are sent to the configured company email address by this
Supabase Edge Function. The Resend API key stays in Supabase secrets and is
never exposed to the browser.

1. Create a Resend account and verify a sending domain. Add and verify
   `cyrechtech@gmail.com` as a recipient if Resend requests recipient verification.
2. Link the Supabase CLI to the project used by this site, then set both secrets:

   ```sh
   supabase link --project-ref your-project-ref
   supabase secrets set RESEND_API_KEY=your_resend_api_key
   supabase secrets set BOOKING_NOTIFICATION_FROM="Cyrech Tech bookings <bookings@your-verified-domain>"
   supabase secrets set COMPANY_BOOKING_EMAIL=cyrechtech@gmail.com
   ```

3. Deploy the function:

   ```sh
   supabase functions deploy send-booking-request
   ```

Booking records continue to be stored in `booking_requests` when the database
migration has been applied. Email delivery does not depend on that storage
succeeding.
