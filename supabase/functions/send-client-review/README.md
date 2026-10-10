# Client review email setup

Client reviews are sent to the configured company email through this Supabase
Edge Function. The Resend API key remains server-side and is never exposed to
the browser.

Configure `RESEND_API_KEY`, `BOOKING_NOTIFICATION_FROM` (a sender verified with
Resend), and optionally `COMPANY_BOOKING_EMAIL` (defaults to
`cyrechtech@gmail.com`) as Supabase secrets. Then deploy:

```sh
supabase functions deploy send-client-review
```

The function shares the Resend secret configuration used by
`send-booking-request`.
