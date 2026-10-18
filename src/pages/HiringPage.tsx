import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, Check, HandCoins, Users } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useServices } from "@/hooks/useContent";
import { useLanguage } from "@/i18n/LanguageProvider";
import { supabase } from "@/integrations/supabase/client";
import { submitToWeb3Forms } from "@/lib/web3forms";

const opportunityTypes = ["Employment", "Commission-based work"] as const;
const additionalServices = [
  "UI/UX Strategy",
  "Web Systems",
  "Game Architecture",
  "Cloud Solutions",
  "Website Design & Dev",
  "E-Commerce Solution",
  "Mobile Application",
  "Digital Marketing",
  "Graphic Designs",
  "AI-Powered Solutions",
  "Photography",
  "Branding",
  "Other",
];

const HiringPage = () => {
  const { data: services } = useServices();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const serviceOptions = [...new Set([
    ...(services ?? []).map((service) => service.title),
    ...additionalServices,
  ])];

  const submitApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setError("");

    try {
      const application = {
        full_name: String(form.get("full_name") || "").trim(),
        email: String(form.get("email") || "").trim(),
        phone: String(form.get("phone") || "").trim(),
        location: String(form.get("location") || "").trim(),
        opportunity_type: String(form.get("opportunity_type") || ""),
        service_title: String(form.get("service_title") || ""),
        experience: String(form.get("experience") || ""),
        availability: String(form.get("availability") || "").trim(),
        portfolio_url: String(form.get("portfolio_url") || "").trim(),
        message: String(form.get("message") || "").trim(),
      };
      const [web3Result, storageResult] = await Promise.allSettled([
        submitToWeb3Forms(`Careers application: ${application.full_name}`, {
          form_type: "Careers application",
          ...application,
          name: application.full_name,
        }),
        supabase.from("job_applications").insert({ ...application, status: "new" }),
      ]);
      const storedInAdmin = storageResult.status === "fulfilled" && !storageResult.value.error;
      const deliveredByWeb3Forms = web3Result.status === "fulfilled";

      if (storageResult.status === "rejected") {
        console.error("Job application could not be saved to the admin dashboard:", storageResult.reason);
      } else if (storageResult.value.error) {
        console.error("Job application could not be saved to the admin dashboard:", storageResult.value.error);
      }
      if (web3Result.status === "rejected") {
        console.error("Job application Web3Forms delivery failed:", web3Result.reason);
      }
      if (!storedInAdmin && !deliveredByWeb3Forms) {
        throw new Error("Neither the admin dashboard nor Web3Forms accepted the application.");
      }
      navigate("/collaborations/careers/success", { state: { applicantName: String(form.get("full_name") || "").trim(), language } });
    } catch (submissionError) {
      console.error("Job application submission failed:", submissionError);
      setError(t("We couldn't submit your application. Please try again or email cyrechtech@gmail.com."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          </div>
          <div className="container relative mx-auto px-6 py-16 md:py-24">
            <p className="eyebrow">{t("Careers at Cyrech Tech")}</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-tight md:text-7xl">
              {t("Bring your talent. Build what’s next.")}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("We welcome passionate people looking for a role or commission-based projects across every service we offer. Tell us what you do and how you would like to work with us.")}
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <aside className="surface-card p-7 md:p-9">
              <p className="eyebrow">{t("Flexible ways to collaborate")}</p>
              <h2 className="mt-3 font-display text-3xl font-bold">{t("Find your place on the team.")}</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                {t("Whether you are seeking an ongoing opportunity or want to contribute on a commission basis, we would love to hear about your skills.")}
              </p>
              <div className="mt-7 space-y-4">
                <OpportunityCard icon={BriefcaseBusiness} title={t("Job opportunities")} text={t("Share your experience and the kind of role you are looking for.")} />
                <OpportunityCard icon={HandCoins} title={t("Commission-based work")} text={t("Partner with us on client projects that match your expertise.")} />
                <OpportunityCard icon={Users} title={t("Every discipline welcome")} text={t("From design and development to marketing, AI, and more.")} />
              </div>
            </aside>

            <div className="surface-card p-6 md:p-9">
              <div className="mb-7">
                <p className="eyebrow">{t("Start a conversation")}</p>
                <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">{t("Tell us about yourself")}</h2>
              </div>
              <form onSubmit={submitApplication} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField label={t("Full Name")} required>
                    <input name="full_name" autoComplete="name" required minLength={2} maxLength={120} className="hiring-input" />
                  </FormField>
                  <FormField label={t("Email Address")} required>
                    <input name="email" type="email" autoComplete="email" required maxLength={254} className="hiring-input" />
                  </FormField>
                  <FormField label={t("Phone Number")} required>
                    <input name="phone" type="tel" autoComplete="tel" required minLength={3} maxLength={40} className="hiring-input" />
                  </FormField>
                  <FormField label={t("City / Country")} required>
                    <input name="location" autoComplete="country-name" required minLength={2} maxLength={160} className="hiring-input" />
                  </FormField>
                  <FormField label={t("How would you like to work with us?")} required>
                    <select name="opportunity_type" required defaultValue="" className="hiring-input">
                      <option value="" disabled>{t("Select an opportunity type")}</option>
                      {opportunityTypes.map((type) => <option key={type} value={type}>{t(type)}</option>)}
                    </select>
                  </FormField>
                  <FormField label={t("Service / role")} required>
                    <select name="service_title" required defaultValue="" className="hiring-input">
                      <option value="" disabled>{t("Select an area")}</option>
                      {serviceOptions.map((service) => <option key={service} value={service}>{t(service)}</option>)}
                    </select>
                  </FormField>
                  <FormField label={t("Relevant experience")} required>
                    <select name="experience" required defaultValue="" className="hiring-input">
                      <option value="" disabled>{t("Select your experience")}</option>
                      {["Student / Entry level", "1–2 years", "3–5 years", "6+ years"].map((level) => <option key={level} value={level}>{t(level)}</option>)}
                    </select>
                  </FormField>
                  <FormField label={t("Availability")}>
                    <input name="availability" maxLength={120} placeholder={t("e.g. Immediately, evenings, part-time")} className="hiring-input" />
                  </FormField>
                  <FormField label={t("Portfolio or profile link")} className="sm:col-span-2">
                    <input name="portfolio_url" type="url" maxLength={2048} placeholder="https://" className="hiring-input" />
                  </FormField>
                  <FormField label={t("Tell us about your skills and what you are looking for")} required className="sm:col-span-2">
                    <textarea name="message" required minLength={20} maxLength={3000} rows={5} className="hiring-input resize-y" />
                  </FormField>
                </div>
                {error && <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</p>}
                <button type="submit" disabled={submitting} className="btn-lime w-full sm:w-auto">
                  {submitting ? t("Submitting…") : t("Send application")} <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-xs leading-5 text-muted-foreground">
                  {t("Your details will only be used to review your application and contact you about suitable opportunities.")}
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export const HiringSuccessPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto flex min-h-[75vh] max-w-3xl flex-col items-center justify-center px-6 pb-16 pt-32 text-center">
        <div className="hiring-smile-face mb-8" role="img" aria-label={t("A smiling face")}>
          <svg viewBox="0 0 120 120" aria-hidden="true" className="h-full w-full">
            <circle cx="60" cy="60" r="54" className="fill-primary/15 stroke-primary" strokeWidth="3" />
            <ellipse cx="42" cy="48" rx="4" ry="7" className="hiring-smile-eye fill-foreground" />
            <ellipse cx="78" cy="48" rx="4" ry="7" className="hiring-smile-eye fill-foreground" />
            <path d="M37 69 Q60 96 83 69" fill="none" className="stroke-primary" strokeLinecap="round" strokeWidth="5" />
          </svg>
        </div>
        <p className="eyebrow">{t("Application received")}</p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight md:text-6xl">
          {t("Your request was noted.")}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {t("Thank you for your interest in working with Cyrech Tech. We will review your information and get back to you as soon as possible.")}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link to="/careers" className="btn-ghost">{t("Back to careers")}</Link>
          <Link to="/" className="btn-lime">{t("Back to home")} <Check className="h-4 w-4" /></Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const OpportunityCard = ({ icon: Icon, title, text }: { icon: typeof BriefcaseBusiness; title: string; text: string }) => (
  <div className="flex gap-4 rounded-2xl border border-border bg-muted/40 p-4">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  </div>
);

const FormField = ({ label, required, className, children }: { label: string; required?: boolean; className?: string; children: ReactNode }) => (
  <label className={`block ${className ?? ""}`}>
    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {label}{required ? " *" : ""}
    </span>
    {children}
  </label>
);

export default HiringPage;
