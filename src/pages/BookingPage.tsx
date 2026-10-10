import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CalendarDays, Check, ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { format, startOfDay } from "date-fns";
import { de, enUS, es, fr, pt } from "date-fns/locale";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useServices } from "@/hooks/useContent";
import { useLanguage } from "@/i18n/LanguageProvider";
import { supabase } from "@/integrations/supabase/client";
import { submitToWeb3Forms } from "@/lib/web3forms";

type BookingForm = {
  preferred_date: Date | undefined;
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  preferred_contact_method: "WhatsApp" | "Phone" | "Email";
  project_title: string;
  project_description: string;
  objectives: string;
  requirements: string;
  estimated_budget: string;
  project_timeline: string;
  additional_information: string;
};

const initialForm: BookingForm = {
  preferred_date: undefined,
  full_name: "",
  company_name: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  preferred_contact_method: "Email",
  project_title: "",
  project_description: "",
  objectives: "",
  requirements: "",
  estimated_budget: "",
  project_timeline: "",
  additional_information: "",
};

const serviceInformation: Record<string, { description: string; includes: string[]; benefits: string[] }> = {
  "UI/UX Strategy": {
    description: "Research, structure, and design intuitive digital experiences that make it easier for people to reach their goals.",
    includes: ["User and business goal discovery", "Information architecture and user flows", "Responsive interface concepts"],
    benefits: ["A clearer product direction", "More usable customer journeys", "A practical design foundation for development"],
  },
  "Web Systems": {
    description: "Plan and build responsive websites and web applications that help your organization work and grow online.",
    includes: ["Project discovery and technical planning", "Responsive frontend implementation", "Integration and launch support"],
    benefits: ["A polished presence across devices", "Purpose-built tools for your workflow", "A foundation that can evolve with your needs"],
  },
  "Game Architecture": {
    description: "Shape the systems and interactive foundations behind engaging, reliable game experiences.",
    includes: ["Core gameplay and system planning", "Architecture and technical direction", "Prototype and iteration guidance"],
    benefits: ["A more coherent player experience", "Scalable foundations for new features", "Reduced uncertainty during development"],
  },
  "Cloud Solutions": {
    description: "Design dependable cloud infrastructure and deployment workflows that support your digital products.",
    includes: ["Infrastructure and deployment planning", "Environment setup and configuration", "Reliability and growth recommendations"],
    benefits: ["More reliable releases", "Improved readiness for growth", "Less operational friction for your team"],
  },
  "Website Design & Dev": {
    description: "Create a distinctive, accessible website that explains your value and helps visitors take the next step.",
    includes: ["Page structure and visual direction", "Responsive website development", "Content and launch readiness"],
    benefits: ["A stronger first impression", "A smoother mobile experience", "More clarity for potential customers"],
  },
  "E-Commerce Solution": {
    description: "Build an online store that presents your products clearly and makes it simple for customers to buy.",
    includes: ["Storefront design and setup", "Product and checkout flow planning", "Launch and operational guidance"],
    benefits: ["A more convenient buying journey", "A storefront shaped around your brand", "A platform prepared to grow with your catalogue"],
  },
  "Mobile Application": {
    description: "Plan and develop mobile product experiences that bring useful digital services directly to customers.",
    includes: ["Feature and user journey planning", "Mobile interface and application development", "Release and iteration planning"],
    benefits: ["Direct access to your service", "A focused mobile customer experience", "A clear path for future improvements"],
  },
  "Company Logo Design": {
    description: "Create a distinctive company logo that makes your business recognisable and gives your brand a clear visual foundation.",
    includes: ["Discovery and project planning", "A solution tailored to your requirements", "Delivery guidance and next steps"],
    benefits: ["Clearer direction for your project", "A solution designed around your needs", "A trusted partner throughout delivery"],
  },
  "Graphic Design": {
    description: "Design polished visual materials for your campaigns, products, and communications across print and digital channels.",
    includes: ["Discovery and project planning", "A solution tailored to your requirements", "Delivery guidance and next steps"],
    benefits: ["Clearer direction for your project", "A solution designed around your needs", "A trusted partner throughout delivery"],
  },
  "Business Card Design": {
    description: "Make a memorable first impression with professional business cards that reflect your brand and make it easy to connect.",
    includes: ["Discovery and project planning", "A solution tailored to your requirements", "Delivery guidance and next steps"],
    benefits: ["Clearer direction for your project", "A solution designed around your needs", "A trusted partner throughout delivery"],
  },
  "Social Media Marketing": {
    description: "Plan and create consistent social media content that helps your business engage the right audience and grow its community.",
    includes: ["Discovery and project planning", "A solution tailored to your requirements", "Delivery guidance and next steps"],
    benefits: ["Clearer direction for your project", "A solution designed around your needs", "A trusted partner throughout delivery"],
  },
  "Digital Marketing": {
    description: "Reach the right customers online with a practical digital marketing strategy shaped around your goals and budget.",
    includes: ["Discovery and project planning", "A solution tailored to your requirements", "Delivery guidance and next steps"],
    benefits: ["Clearer direction for your project", "A solution designed around your needs", "A trusted partner throughout delivery"],
  },
  "Brand Identity": {
    description: "Build a cohesive brand identity with a clear visual direction and reusable assets for every customer touchpoint.",
    includes: ["Discovery and project planning", "A solution tailored to your requirements", "Delivery guidance and next steps"],
    benefits: ["Clearer direction for your project", "A solution designed around your needs", "A trusted partner throughout delivery"],
  },
  "AI Solutions & Business Automation": {
    description: "Use practical AI tools and automation to reduce repetitive work and improve the way your business operates.",
    includes: ["Discovery and project planning", "A solution tailored to your requirements", "Delivery guidance and next steps"],
    benefits: ["Clearer direction for your project", "A solution designed around your needs", "A trusted partner throughout delivery"],
  },
  "Business IT Consultancy": {
    description: "Get clear, independent IT guidance to choose technology, plan improvements, and align systems with your business needs.",
    includes: ["Discovery and project planning", "A solution tailored to your requirements", "Delivery guidance and next steps"],
    benefits: ["Clearer direction for your project", "A solution designed around your needs", "A trusted partner throughout delivery"],
  },
};

const defaultServiceInfo = {
  description: "A tailored digital solution shaped around your goals, customers, and the way your business works.",
  includes: ["Discovery and project planning", "A solution tailored to your requirements", "Delivery guidance and next steps"],
  benefits: ["Clearer direction for your project", "A solution designed around your needs", "A trusted partner throughout delivery"],
};

const steps = [
  { title: "Service information & date", number: 1 },
  { title: "Contact information", number: 2 },
  { title: "Project information", number: 3 },
];

const BookingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: services } = useServices();
  const { language, t } = useLanguage();
  const dateLocale = { en: enUS, fr, es, de, pt }[language];
  const serviceTitle = searchParams.get("service")?.trim() || "";
  const selectedService = services?.find((service) => service.title === serviceTitle);
  const serviceName = selectedService?.title || serviceTitle || "Web Systems";
  const serviceInfo = serviceInformation[serviceName] || {
    ...defaultServiceInfo,
    description: selectedService?.description || defaultServiceInfo.description,
  };
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const formattedDate = useMemo(
    () => form.preferred_date ? format(form.preferred_date, "PPP", { locale: dateLocale }) : "",
    [form.preferred_date, dateLocale],
  );

  const update = <K extends keyof BookingForm>(key: K, value: BookingForm[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const continueToNextStep = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep((current) => Math.min(current + 1, 3));
  };

  const submitBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.preferred_date) {
      toast.error(t("Select a preferred date"));
      setStep(1);
      return;
    }

    setSubmitting(true);
    try {
      const emailBooking = {
        service_title: serviceName,
        service_description: selectedService?.description || serviceInfo.description,
        preferred_date: format(form.preferred_date, "yyyy-MM-dd"),
        full_name: form.full_name.trim(),
        company_name: form.company_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        country: form.country.trim(),
        city: form.city.trim(),
        preferred_contact_method: form.preferred_contact_method,
        project_title: form.project_title.trim(),
        project_description: form.project_description.trim(),
        objectives: form.objectives.trim(),
        requirements: form.requirements.trim(),
        estimated_budget: form.estimated_budget,
        project_timeline: form.project_timeline,
        additional_information: form.additional_information.trim(),
        language,
      };
      const [web3Result, storageResult, emailResult] = await Promise.allSettled([
        submitToWeb3Forms(`Booking request: ${emailBooking.service_title}`, {
          form_type: "Service booking",
          ...emailBooking,
          name: emailBooking.full_name,
          message: emailBooking.project_description,
        }),
        supabase.from("booking_requests").insert({
          service_title: emailBooking.service_title,
          preferred_date: emailBooking.preferred_date,
          full_name: emailBooking.full_name,
          company_name: emailBooking.company_name,
          email: emailBooking.email,
          phone: emailBooking.phone,
          country: emailBooking.country,
          city: emailBooking.city,
          preferred_contact_method: emailBooking.preferred_contact_method,
          project_title: emailBooking.project_title,
          project_description: emailBooking.project_description,
          objectives: emailBooking.objectives,
          requirements: emailBooking.requirements,
          estimated_budget: emailBooking.estimated_budget,
          project_timeline: emailBooking.project_timeline,
          additional_information: emailBooking.additional_information,
          language: emailBooking.language,
        }),
        supabase.functions.invoke("send-booking-request", {
          body: emailBooking,
        }),
      ]);

      const web3FormsSent = web3Result.status === "fulfilled";
      if (web3Result.status === "rejected") {
        console.error("Booking Web3Forms delivery failed:", web3Result.reason);
      }

      const storedInAdmin = storageResult.status === "fulfilled" && !storageResult.value.error;
      if (storageResult.status === "rejected") {
        console.error("Booking could not be saved to the admin dashboard:", storageResult.reason);
      } else if (storageResult.value.error) {
        console.error("Booking could not be saved to the admin dashboard:", storageResult.value.error);
      }

      const emailSent = emailResult.status === "fulfilled" && !emailResult.value.error;
      if (emailResult.status === "rejected") {
        console.error("Booking email delivery failed:", emailResult.reason);
      } else if (emailResult.value.error) {
        console.error("Booking email delivery failed:", emailResult.value.error);
      }

      if (!storedInAdmin && !emailSent && !web3FormsSent) {
        toast.error(t("We couldn't submit your booking. Please try again."));
        return;
      }

      navigate("/booking/success", {
        replace: true,
        state: {
          booking: {
            ...emailBooking,
          },
          emailSent,
          storedInAdmin,
        },
      });
    } catch (error) {
      console.error("Booking submission failed:", error);
      toast.error(t("We couldn't submit your booking. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto max-w-5xl px-6 pb-20 pt-32">
        {
          <>
            <header className="mb-10 max-w-3xl">
              <p className="eyebrow">{t("Booking")}</p>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
                {t("Book your next service.")}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                {t("Share a few details about your project. Our team will review your request and follow up using your preferred contact method.")}
              </p>
            </header>

            <ol className="mb-10 grid gap-3 sm:grid-cols-3" aria-label={t("Booking progress")}>
              {steps.map(({ number, title }) => (
                <li
                  key={number}
                  aria-current={step === number ? "step" : undefined}
                  className={`flex items-center gap-3 rounded-2xl border p-4 transition-colors ${
                    step === number ? "border-primary bg-primary/10" : number < step ? "border-primary/40 bg-card" : "border-border bg-card/50"
                  }`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    number < step ? "bg-primary text-primary-foreground" : step === number ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {number < step ? <Check className="h-4 w-4" /> : number}
                  </span>
                  <span>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t(`Step ${number}`)}</span>
                    <span className="mt-1 block text-sm font-semibold">{t(title)}</span>
                  </span>
                </li>
              ))}
            </ol>

            {step === 1 && (
              <form onSubmit={continueToNextStep} className="surface-card space-y-7 p-6 md:p-10">
                <div>
                  <p className="eyebrow">{t("Selected service")}</p>
                  <h2 className="mt-2 font-display text-3xl font-bold">{t(serviceName)}</h2>
                  <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{t(serviceInfo.description)}</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <InfoList title={t("What’s included")} items={serviceInfo.includes} t={t} />
                  <InfoList title={t("Client benefits")} items={serviceInfo.benefits} t={t} />
                </div>
                <Field label={t("Preferred Date")} required>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={`h-12 w-full justify-start rounded-xl text-left font-normal ${form.preferred_date ? "" : "text-muted-foreground"}`}
                        aria-label={t("Choose a date")}
                      >
                        <CalendarDays className="mr-3 h-4 w-4" />
                        {form.preferred_date ? formattedDate : t("Choose a date")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        locale={dateLocale}
                        selected={form.preferred_date}
                        onSelect={(date) => update("preferred_date", date)}
                        disabled={{ before: startOfDay(new Date()) }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {!form.preferred_date && (
                    <span className="mt-2 block text-xs text-muted-foreground">{t("Select a preferred date")}</span>
                  )}
                </Field>
                <div className="flex justify-end">
                  <Button type="submit" disabled={!form.preferred_date} className="btn-lime h-auto">
                    {t("Continue")} <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={continueToNextStep} className="surface-card space-y-6 p-6 md:p-10">
                <StepHeading title={t("Contact information")} description={t("Tell us how to reach you about your booking request.")} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t("Full Name")} required>
                    <input autoComplete="name" required maxLength={120} value={form.full_name} onChange={(event) => update("full_name", event.target.value)} className="booking-input" />
                  </Field>
                  <Field label={t("Company/Business Name (optional)")}>
                    <input autoComplete="organization" maxLength={160} value={form.company_name} onChange={(event) => update("company_name", event.target.value)} className="booking-input" />
                  </Field>
                  <Field label={t("Email Address")} required>
                    <input type="email" autoComplete="email" required maxLength={254} value={form.email} onChange={(event) => update("email", event.target.value)} className="booking-input" />
                  </Field>
                  <Field label={t("Phone Number")} required>
                    <input type="tel" autoComplete="tel" required maxLength={40} value={form.phone} onChange={(event) => update("phone", event.target.value)} className="booking-input" />
                  </Field>
                  <Field label={t("Country")} required>
                    <input autoComplete="country-name" required maxLength={100} value={form.country} onChange={(event) => update("country", event.target.value)} className="booking-input" />
                  </Field>
                  <Field label={t("City")} required>
                    <input autoComplete="address-level2" required maxLength={100} value={form.city} onChange={(event) => update("city", event.target.value)} className="booking-input" />
                  </Field>
                  <Field label={t("Preferred Contact Method")} required>
                    <select required value={form.preferred_contact_method} onChange={(event) => update("preferred_contact_method", event.target.value as BookingForm["preferred_contact_method"])} className="booking-input">
                      {(["WhatsApp", "Phone", "Email"] as const).map((method) => <option key={method} value={method}>{t(method)}</option>)}
                    </select>
                  </Field>
                </div>
                <StepActions step={step} setStep={setStep} t={t} />
              </form>
            )}

            {step === 3 && (
              <form onSubmit={submitBooking} className="surface-card space-y-6 p-6 md:p-10">
                <StepHeading title={t("Project information")} description={t("The more you can tell us, the better we can prepare for your project.")} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t("Project Title")} required>
                    <input required maxLength={180} value={form.project_title} onChange={(event) => update("project_title", event.target.value)} className="booking-input" />
                  </Field>
                  <Field label={t("Project Timeline")} required>
                    <select required value={form.project_timeline} onChange={(event) => update("project_timeline", event.target.value)} className="booking-input">
                      <option value="">{t("Select a timeline")}</option>
                      {["As soon as possible", "Within 1 month", "1–3 months", "3–6 months", "Flexible"].map((timeline) => <option value={timeline} key={timeline}>{t(timeline)}</option>)}
                    </select>
                  </Field>
                  <Field label={t("Project Description")} required className="sm:col-span-2">
                    <textarea required minLength={10} maxLength={5000} rows={4} value={form.project_description} onChange={(event) => update("project_description", event.target.value)} className="booking-input resize-y" />
                  </Field>
                  <Field label={t("Main Objectives")} required className="sm:col-span-2">
                    <textarea required minLength={5} maxLength={3000} rows={3} value={form.objectives} onChange={(event) => update("objectives", event.target.value)} className="booking-input resize-y" />
                  </Field>
                  <Field label={t("Specific Requirements")} className="sm:col-span-2">
                    <textarea maxLength={3000} rows={3} value={form.requirements} onChange={(event) => update("requirements", event.target.value)} className="booking-input resize-y" />
                  </Field>
                  <Field label={t("Estimated Budget")}>
                    <select value={form.estimated_budget} onChange={(event) => update("estimated_budget", event.target.value)} className="booking-input">
                      <option value="">{t("Not decided yet")}</option>
                      {["Under $500", "$500–$2,000", "$2,000–$5,000", "$5,000–$10,000", "$10,000+", "Prefer to discuss"].map((budget) => <option key={budget} value={budget}>{t(budget)}</option>)}
                    </select>
                  </Field>
                  <Field label={t("Additional Information or Special Requests")} className="sm:col-span-2">
                    <textarea maxLength={3000} rows={3} value={form.additional_information} onChange={(event) => update("additional_information", event.target.value)} className="booking-input resize-y" />
                  </Field>
                </div>
                <StepActions step={step} setStep={setStep} t={t}>
                  <Button type="submit" disabled={submitting} className="btn-lime h-auto">
                    {submitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                    {t("Submit Booking")}
                  </Button>
                </StepActions>
              </form>
            )}
          </>
        }
      </main>
      <Footer />
      <style>{`
        .booking-input {
          width: 100%;
          min-height: 3rem;
          border: 1px solid hsl(var(--border));
          border-radius: 0.75rem;
          background: hsl(var(--muted));
          padding: 0.75rem 1rem;
          color: hsl(var(--foreground));
          font-size: 0.875rem;
          outline: none;
        }
        .booking-input:focus {
          border-color: hsl(var(--primary));
          box-shadow: 0 0 0 3px hsl(var(--primary) / 0.15);
        }
      `}</style>
    </div>
  );
};

const StepHeading = ({ title, description }: { title: string; description: string }) => (
  <header>
    <h2 className="font-display text-2xl font-bold md:text-3xl">{title}</h2>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
  </header>
);

const StepActions = ({
  step,
  setStep,
  t,
  children,
}: {
  step: number;
  setStep: (step: number) => void;
  t: (english: string) => string;
  children?: React.ReactNode;
}) => (
  <div className="flex flex-wrap justify-between gap-3 border-t border-border pt-6">
    <Button type="button" variant="outline" onClick={() => setStep(Math.max(1, step - 1))} className="rounded-full">
      <ChevronLeft className="h-4 w-4" /> {t("Back")}
    </Button>
    {children ?? (
      <Button type="submit" className="btn-lime h-auto">
        {t("Continue")} <ChevronRight className="h-4 w-4" />
      </Button>
    )}
  </div>
);

const InfoList = ({ title, items, t }: { title: string; items: string[]; t: (english: string) => string }) => (
  <section className="rounded-2xl border border-border bg-background p-5">
    <h3 className="font-display font-bold">{title}</h3>
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          {t(item)}
        </li>
      ))}
    </ul>
  </section>
);

const Field = ({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) => (
  <label className={`block ${className ?? ""}`}>
    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {label}{required ? <span className="ml-1 text-primary" aria-hidden="true">*</span> : null}
    </span>
    {children}
  </label>
);

export default BookingPage;
