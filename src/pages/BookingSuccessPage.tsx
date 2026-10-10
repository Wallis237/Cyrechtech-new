import { ArrowLeft, ArrowRight, Check, MailCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageProvider";

type BookingSummary = {
  service_title: string;
  service_description: string;
  preferred_date: string;
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  preferred_contact_method: string;
  project_title: string;
  project_description: string;
  objectives: string;
  requirements: string;
  estimated_budget: string;
  project_timeline: string;
  additional_information: string;
};

type BookingSuccessState = {
  booking?: BookingSummary;
  emailSent?: boolean;
  storedInAdmin?: boolean;
};

const BookingSuccessPage = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const state = (location.state ?? {}) as BookingSuccessState;
  const booking = state.booking;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto max-w-4xl px-6 pb-20 pt-32">
        <header className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-7 flex h-20 w-20 animate-in zoom-in items-center justify-center rounded-full bg-primary/15 text-primary">
            <Check className="h-10 w-10" strokeWidth={2.5} />
          </div>
          <p className="eyebrow">{t("Booking request received")}</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
            {t("Thank You for Booking!")} <span aria-hidden="true">🎉</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("Your booking has been successfully received. We appreciate your interest in working with us. Our team will review your request and get back to you as soon as possible.")}
          </p>
        </header>

        {booking && (
          <section className="surface-card mt-10 p-6 md:p-9" aria-labelledby="booking-summary-heading">
            <div className="flex items-center gap-3">
              <MailCheck className="h-5 w-5 text-primary" />
              <h2 id="booking-summary-heading" className="font-display text-2xl font-bold">
                {t("Booking summary")}
              </h2>
            </div>
            <div className="mt-6 space-y-7">
              <SummarySection title={t("Service information")} rows={[
                [t("Service"), booking.service_title],
                [t("Service description"), booking.service_description],
                [t("Preferred date"), booking.preferred_date],
              ]} />
              <SummarySection title={t("Your details")} rows={[
                [t("Full Name"), booking.full_name],
                [t("Company/Business Name"), booking.company_name || t("Not provided")],
                [t("Email Address"), booking.email],
                [t("Phone Number"), booking.phone],
                [t("Location"), `${booking.city}, ${booking.country}`],
                [t("Preferred Contact Method"), t(booking.preferred_contact_method)],
              ]} />
              <SummarySection title={t("Project details")} rows={[
                [t("Project Title"), booking.project_title],
                [t("Project Description"), booking.project_description],
                [t("Main Objectives"), booking.objectives],
                [t("Specific Requirements"), booking.requirements || t("Not provided")],
                [t("Estimated Budget"), booking.estimated_budget || t("Not decided yet")],
                [t("Project Timeline"), t(booking.project_timeline)],
                [t("Additional Information or Special Requests"), booking.additional_information || t("Not provided")],
              ]} />
            </div>
          </section>
        )}

        <nav className="mt-9 flex flex-wrap justify-center gap-3" aria-label={t("Next steps")}>
          <Link to="/" className="btn-ghost">
            <ArrowLeft className="h-4 w-4" /> {t("Back to Home")}
          </Link>
          <Link to="/services" className="btn-lime">
            {t("View Our Services")} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/team" className="btn-ghost">{t("Meet Our Team")}</Link>
        </nav>
      </main>
      <Footer />
    </div>
  );
};

const SummarySection = ({ title, rows }: { title: string; rows: [string, string][] }) => (
  <section className="border-t border-border pt-5 first:border-t-0 first:pt-0">
    <h3 className="font-display text-lg font-bold">{title}</h3>
    <dl className="mt-3 space-y-3">
      {rows.map(([label, value]) => (
        <div key={label} className="grid gap-1 sm:grid-cols-[13rem_1fr]">
          <dt className="text-sm text-muted-foreground">{label}</dt>
          <dd className="break-words text-sm leading-relaxed">{value}</dd>
        </div>
      ))}
    </dl>
  </section>
);

export default BookingSuccessPage;
