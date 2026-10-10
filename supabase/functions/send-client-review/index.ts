const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const fallbackRecipient = "cyrechtech@gmail.com";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);

const jsonResponse = (body: Record<string, string>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405);

  const apiKey = Deno.env.get("RESEND_API_KEY");
  const sender = Deno.env.get("BOOKING_NOTIFICATION_FROM");
  const recipient = Deno.env.get("COMPANY_BOOKING_EMAIL") || fallbackRecipient;
  if (!apiKey || !sender) {
    console.error("Review email delivery is not configured: RESEND_API_KEY and BOOKING_NOTIFICATION_FROM are required.");
    return jsonResponse({ error: "Review email delivery is not configured." }, 503);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid review request." }, 400);
  }
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return jsonResponse({ error: "Invalid review request." }, 400);
  }
  const review = payload as Record<string, unknown>;
  const fields = ["full_name", "email", "review"];
  for (const field of fields) {
    if (typeof review[field] !== "string" || (review[field] as string).trim().length === 0) {
      return jsonResponse({ error: `Missing required field: ${field}.` }, 400);
    }
  }
  const limits: Record<string, number> = {
    full_name: 120,
    company_name: 160,
    email: 254,
    review: 3000,
  };
  for (const [field, limit] of Object.entries(limits)) {
    const value = review[field];
    if (value !== undefined && (typeof value !== "string" || value.length > limit)) {
      return jsonResponse({ error: `Invalid field: ${field}.` }, 400);
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(review.email as string)) {
    return jsonResponse({ error: "Invalid email address." }, 400);
  }
  if (!Number.isInteger(review.rating) || (review.rating as number) < 1 || (review.rating as number) > 5) {
    return jsonResponse({ error: "Rating must be a whole number from 1 to 5." }, 400);
  }

  const safeName = escapeHtml((review.full_name as string).trim());
  const safeCompany = escapeHtml(((review.company_name as string | undefined)?.trim()) || "Not provided");
  const safeEmail = escapeHtml((review.email as string).trim());
  const safeReview = escapeHtml((review.review as string).trim()).replace(/\n/g, "<br>");
  const rating = review.rating as number;
  const stars = `${"★".repeat(rating)}${"☆".repeat(5 - rating)}`;
  const html = `<h2>New client review</h2><table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse"><tbody><tr><th align="left">Name</th><td>${safeName}</td></tr><tr><th align="left">Company</th><td>${safeCompany}</td></tr><tr><th align="left">Email</th><td>${safeEmail}</td></tr><tr><th align="left">Rating</th><td>${stars} (${rating}/5)</td></tr><tr><th align="left">Review</th><td>${safeReview}</td></tr></tbody></table>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: review.email,
        subject: `New Client Review – ${String(review.full_name).replace(/[\r\n]/g, " ").slice(0, 100)}`,
        html,
      }),
    });
    if (!response.ok) {
      console.error("Resend rejected client review email:", response.status, await response.text());
      return jsonResponse({ error: "The review email could not be delivered." }, 502);
    }
    return jsonResponse({ message: "Client review sent." });
  } catch (error) {
    console.error("Client review email delivery request failed:", error);
    return jsonResponse({ error: "The review email could not be delivered." }, 502);
  }
});
