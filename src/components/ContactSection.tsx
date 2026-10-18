import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Github, Linkedin, Facebook, Instagram, Mail, MapPin, ArrowUpRight, CalendarDays, Navigation } from "lucide-react";
import { format, startOfDay } from "date-fns";
import AnimationWrapper from './AnimationWrapper';
import { socialLinks } from "@/lib/socialLinks";
import { useServices, useSiteSettings } from "@/hooks/useContent";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLanguage } from "@/i18n/LanguageProvider";
import { submitToWeb3Forms } from "@/lib/web3forms";

const ContactSection = () => {
  const mapLocation = { latitude: 3.8334487, longitude: 11.4909211 };
  const { toast } = useToast();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const isBookingPage = pathname === "/booking";
  const { data: settings } = useSiteSettings();
  const { data: serviceRows } = useServices();
  const { t } = useLanguage();
  const email = settings?.contact_email || "cyrechtech@gmail.com";
  const location = settings?.location || "Douala, Cameroon";
  const selectedService = searchParams.get('service') || 'UI/UX Design';
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: selectedService,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const services = [...new Set([
    "UI/UX Design",
    "Web Development",
    "Photography",
    "Branding",
    "Mobile Application",
    "Digital Marketing",
    "Graphic Designs",
    "AI-Powered Solutions",
    ...(serviceRows ?? []).map((service) => service.title),
    "Other",
  ])];

  if (selectedService && !services.includes(selectedService)) {
    services.push(selectedService);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isBookingPage && !selectedDate) {
      toast({
        title: t("Choose a preferred date"),
        description: t("Select a date for your booking request before continuing."),
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      await submitToWeb3Forms(
        `[${formData.service}] Inquiry from ${formData.name}`,
        {
          form_type: isBookingPage ? "Contact booking inquiry" : "Contact inquiry",
          name: formData.name.trim(),
          email: formData.email.trim(),
          service: formData.service,
          preferred_date: selectedDate ? format(selectedDate, "PPP") : "",
          message: formData.message.trim(),
        },
      );
      toast({
        title: t("Message sent"),
        description: isBookingPage ? t("Your booking inquiry was sent.") : t("Your message was sent."),
      });
      setFormData((current) => ({ ...current, name: "", email: "", message: "" }));
    } catch (error) {
      console.error("Contact form submission failed:", error);
      toast({
        title: t("We couldn't send your message."),
        description: t("Please try again or email cyrechtech@gmail.com."),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const socials = [
    { name: 'LinkedIn', icon: Linkedin, href: socialLinks.linkedin },
    { name: 'GitHub', icon: Github, href: socialLinks.github },
    { name: 'Facebook', icon: Facebook, href: socialLinks.facebook },
    { name: 'Instagram', icon: Instagram, href: socialLinks.instagram },
  ];

  return (
    <section id="contact" className="section-padding relative">
      <div className="container mx-auto px-6">
        {/* CTA banner */}
        <AnimationWrapper animation="fadeUp">
          <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 text-center mb-16 md:mb-24 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border-[24px] border-primary-foreground" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border-[24px] border-primary-foreground" />
            </div>
            <h2 className="relative font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight max-w-3xl mx-auto">
              {t("Let's Build the Future Together.")}
            </h2>
            <p className="relative mt-5 text-primary-foreground/80 max-w-xl mx-auto">
              {t("We're excited to connect with like-minded people, share ideas, and work on projects that make a difference.")}
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-background text-foreground font-semibold text-sm hover:-translate-y-0.5 transition-transform"
              >
                <Mail className="h-4 w-4" /> {t("Email Us")}
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary-foreground/30 font-semibold text-sm hover:bg-primary-foreground/10 transition-colors"
              >
                {t("Follow Our Journey")} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </AnimationWrapper>

        {/* Contact grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          <AnimationWrapper animation="slideLeft">
            <div>
              <div className="eyebrow">// {t("Get In Touch")}</div>
              <h3 className="mt-3 font-display font-bold text-4xl md:text-5xl leading-[0.95] tracking-tight">
                {t("Let's craft your")} <span className="accent-italic">{t("digital future")}</span> {t("today.")}
              </h3>
              <p className="mt-5 text-muted-foreground max-w-md">
                {t("Whether you have a specific project in mind or just want to chat about the latest in tech, we're always open to new connections and collaborations.")}
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">{t("Email Us")}</div>
                    <a href={`mailto:${email}`} className="font-medium hover:text-primary transition-colors">
                      {email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">{t("Location")}</div>
                    <div className="font-medium">{location}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                {socials.map(({ name, icon: Icon, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                    aria-label={name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              {!isBookingPage && (
                <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="flex items-center justify-between gap-3 p-4">
                    <div>
                      <h4 className="font-display font-semibold">Find us at Neptune Tam Tam</h4>
                      <p className="mt-1 text-xs text-muted-foreground">{location}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-primary">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                      </span>
                      Live location
                    </span>
                  </div>
                  <div className="relative h-64 bg-muted sm:h-80">
                    <iframe
                      title="Map showing Neptune Tam Tam, Cameroon"
                      src={`https://maps.google.com/maps?q=${mapLocation.latitude},${mapLocation.longitude}&z=16&output=embed`}
                      className="h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-label="Pulsing location marker at Neptune Tam Tam">
                      <span className="absolute -inset-3 animate-ping rounded-full bg-primary/60" />
                      <span className="relative block h-5 w-5 rounded-full border-[3px] border-background bg-primary shadow-lg" />
                    </div>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapLocation.latitude},${mapLocation.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-primary transition-colors hover:text-foreground"
                  >
                    <Navigation className="h-4 w-4" />
                    Get directions
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slideRight" delay={150}>
            <form onSubmit={handleSubmit} className="surface-card p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label={t("Your Name")}>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="input-lime"
                  />
                </Field>
                <Field label={t("Email Address")}>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="input-lime"
                  />
                </Field>
              </div>
              <Field label={t("Service Required")}>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="input-lime"
                >
                  {services.map((s) => <option key={s} value={s}>{t(s)}</option>)}
                </select>
              </Field>
              {isBookingPage && (
                <Field label={t("Preferred Date")}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={`input-lime justify-start text-left font-normal ${selectedDate ? "" : "text-muted-foreground"}`}
                        aria-label={t("Choose a date")}
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : t("Choose a date")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={{ before: startOfDay(new Date()) }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              )}
              <Field label={t("Message")}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder={t("Tell me about your project ideas...")}
                  className="input-lime resize-none"
                />
              </Field>
              <button type="submit" disabled={submitting} className="btn-lime w-full disabled:cursor-wait disabled:opacity-60">
                {submitting ? t("Sending…") : t("Send Inquiry")} <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </AnimationWrapper>
        </div>
      </div>

      <style>{`
        .input-lime {
          width: 100%;
          background: hsl(var(--muted));
          border: 1px solid hsl(var(--border));
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: hsl(var(--foreground));
          font-size: 0.875rem;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .input-lime::placeholder {
          color: hsl(var(--muted-foreground));
        }
        .input-lime:focus {
          border-color: hsl(var(--primary));
          box-shadow: 0 0 0 3px hsl(var(--primary) / 0.15);
        }
      `}</style>
    </section>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-2 block">
      {label}
    </span>
    {children}
  </label>
);

export default ContactSection;
