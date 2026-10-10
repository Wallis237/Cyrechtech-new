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
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  const sender = Deno.env.get("BOOKING_NOTIFICATION_FROM");
  const recipient = Deno.env.get("COMPANY_BOOKING_EMAIL") || fallbackRecipient;
  if (!apiKey || !sender) {
    console.error("Booking email delivery is not configured: RESEND_API_KEY and BOOKING_NOTIFICATION_FROM are required.");
    return jsonResponse({ error: "Booking email delivery is not configured." }, 503);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid booking request." }, 400);
  }
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return jsonResponse({ error: "Invalid booking request." }, 400);
  }
  const booking = payload as Record<string, unknown>;

  const requiredFields = [
    "service_title",
    "service_description",
    "preferred_date",
    "full_name",
    "email",
    "phone",
    "country",
    "city",
    "preferred_contact_method",
    "project_title",
    "project_description",
    "objectives",
    "project_timeline",
    "language",
  ];
  for (const field of requiredFields) {
    const value = booking[field];
    if (typeof value !== "string" || value.trim().length === 0) {
      return jsonResponse({ error: `Missing required field: ${field}.` }, 400);
    }
  }

  const limits: Record<string, number> = {
    service_title: 160,
    service_description: 3000,
    full_name: 120,
    company_name: 160,
    email: 254,
    phone: 40,
    country: 100,
    city: 100,
    preferred_contact_method: 20,
    project_title: 180,
    project_description: 5000,
    objectives: 3000,
    requirements: 3000,
    estimated_budget: 100,
    project_timeline: 160,
    additional_information: 3000,
    language: 2,
  };
  for (const [field, limit] of Object.entries(limits)) {
    const value = booking[field];
    if (value !== undefined && (typeof value !== "string" || value.length > limit)) {
      return jsonResponse({ error: `Invalid field: ${field}.` }, 400);
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email as string)) {
    return jsonResponse({ error: "Invalid email address." }, 400);
  }
  if (!["WhatsApp", "Phone", "Email"].includes(booking.preferred_contact_method as string)) {
    return jsonResponse({ error: "Invalid preferred contact method." }, 400);
  }
  if (!["en", "fr", "es", "de", "pt"].includes(booking.language as string)) {
    return jsonResponse({ error: "Invalid language." }, 400);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(booking.preferred_date as string)) {
    return jsonResponse({ error: "Invalid preferred date." }, 400);
  }
  const [year, month, day] = (booking.preferred_date as string).split("-").map(Number);
  const selectedDate = new Date(Date.UTC(year, month - 1, day));
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (
    selectedDate.getUTCFullYear() !== year ||
    selectedDate.getUTCMonth() !== month - 1 ||
    selectedDate.getUTCDate() !== day ||
    selectedDate < today
  ) {
    return jsonResponse({ error: "Invalid preferred date." }, 400);
  }

  const fields = [
    ["Service", booking.service_title],
    ["Service description", booking.service_description],
    ["Preferred date", booking.preferred_date],
    ["Full name", booking.full_name],
    ["Company", booking.company_name || "Not provided"],
    ["Email", booking.email],
    ["Phone", booking.phone],
    ["Location", `${booking.city}, ${booking.country}`],
    ["Preferred contact method", booking.preferred_contact_method],
    ["Project title", booking.project_title],
    ["Project description", booking.project_description],
    ["Main objectives", booking.objectives],
    ["Specific requirements", booking.requirements || "Not provided"],
    ["Estimated budget", booking.estimated_budget || "Not provided"],
    ["Project timeline", booking.project_timeline],
    ["Additional information", booking.additional_information || "Not provided"],
    ["Website language", booking.language],
  ];
  const html = `<h2>New service booking request</h2><table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse"><tbody>${fields
    .map(([label, value]) => `<tr><th align="left">${escapeHtml(label as string)}</th><td>${escapeHtml(String(value))}</td></tr>`)
    .join("")}</tbody></table>`;
  const subjectService = (booking.service_title as string).replace(/[\r\n]/g, " ").slice(0, 120);
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
        reply_to: booking.email,
        subject: `New Service Booking – ${subjectService}`,
        html,
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected booking email:", response.status, await response.text());
      return jsonResponse({ error: "The booking email could not be delivered." }, 502);
    }
    return jsonResponse({ message: "Booking email sent." });
  } catch (error) {
    console.error("Booking email delivery request failed:", error);
    return jsonResponse({ error: "The booking email could not be delivered." }, 502);
  }
});
