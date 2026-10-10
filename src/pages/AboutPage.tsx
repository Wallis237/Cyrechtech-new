import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useServices } from "@/hooks/useContent";
import { useLanguage } from "@/i18n/LanguageProvider";

const principles = [
  {
    icon: HeartHandshake,
    title: "People first",
    description: "We listen before we build and make decisions around the people using the things we create.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity and trust",
    description: "We value honest communication, clear expectations, and taking responsibility for our work.",
  },
  {
    icon: Lightbulb,
    title: "Curiosity and creativity",
    description: "We stay open to better ideas and combine imagination with practical problem-solving.",
  },
  {
    icon: Check,
    title: "Quality with purpose",
    description: "We care about the details while keeping every choice connected to a real goal.",
  },
];

const clients = [
  "Founders and early-stage startups",
  "Growing small and medium businesses",
  "Organizations modernizing their digital presence",
  "Teams looking for a reliable technology partner",
];

const differentiators = [
  "We connect creative thinking and technical execution in one collaborative process.",
  "We shape solutions around your goals instead of forcing a one-size-fits-all package.",
  "We make the work understandable, with clear communication from discovery to delivery.",
];

const AboutPage = () => {
  const { data: serviceRows } = useServices();
  const { t } = useLanguage();
  const services = serviceRows?.length
    ? serviceRows
    : [
        { num: "01", title: "UI/UX Strategy" },
        { num: "02", title: "Web Systems" },
        { num: "03", title: "Game Architecture" },
        { num: "04", title: "Cloud Solutions" },
      ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24">
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-28 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          </div>
          <div className="container relative mx-auto px-6 py-20 md:py-28">
            <div className="max-w-4xl">
              <p className="eyebrow">{t("About Cyrech Tech")}</p>
              <h1 className="mt-5 font-display text-5xl font-bold leading-[0.98] tracking-tight md:text-7xl">
                {t("Technology with purpose.")}
                <span className="mt-2 block accent-italic">{t("Creativity with direction.")}</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {t("Cyrech Tech is a Cameroon-based creative technology company helping people and organizations turn ambitious ideas into useful digital products, clear brands, and dependable online experiences.")}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-lime">
                  {t("Let’s work together")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/projects" className="btn-ghost">
                  {t("Explore projects")} <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link to="/team" className="btn-ghost">
                  {t("Meet Our Team")} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container mx-auto px-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="surface-card p-8 md:p-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Target className="h-5 w-5" />
                </div>
                <p className="eyebrow">{t("Our mission")}</p>
                <h2 className="mt-3 font-display text-3xl font-bold">{t("Make technology work for people.")}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {t("We create thoughtful, accessible digital solutions that help businesses and communities solve real problems, communicate clearly, and move forward with confidence.")}
                </p>
              </article>
              <article className="surface-card p-8 md:p-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Compass className="h-5 w-5" />
                </div>
                <p className="eyebrow">{t("Our vision")}</p>
                <h2 className="mt-3 font-display text-3xl font-bold">{t("A trusted technology partner, without borders.")}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {t("We aim to grow into a leading creative technology company from Cameroon—known for dependable work, meaningful innovation, and digital products that create lasting value locally and globally.")}
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section-padding border-y border-border bg-card/30">
          <div className="container mx-auto px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="eyebrow">{t("What we believe")}</p>
              <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
                {t("Principles that shape every decision.")}
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {principles.map(({ icon: Icon, title, description }) => (
                <article key={title} className="rounded-2xl border border-border bg-background p-6">
                  <Icon className="mb-5 h-5 w-5 text-primary" />
                  <h3 className="font-display text-xl font-bold">{t(title)}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{t(description)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="eyebrow">{t("Why we started")}</p>
                <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">{t("Closing the gap between ideas and impact.")}</h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  {t("Too many promising ideas get held back by confusing digital experiences, disconnected tools, limited access to technical expertise, or a lack of trusted partners who can carry a project from first conversation to launch. Cyrech Tech exists to help close that gap with practical guidance and thoughtful execution.")}
                </p>
              </div>
              <div className="surface-card p-7 md:p-9">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-2xl font-bold">{t("Who we serve")}</h3>
                </div>
                <p className="mt-4 text-muted-foreground">
                  {t("We work with people who want to make progress and value a thoughtful technology partner:")}
                </p>
                <ul className="mt-6 space-y-4">
                  {clients.map((client) => (
                    <li key={client} className="flex items-start gap-3 text-sm leading-6">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{t(client)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding border-y border-border bg-card/30">
          <div className="container mx-auto px-6">
            <div className="mb-10 max-w-2xl">
              <p className="eyebrow">{t("What we offer")}</p>
              <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
                {t("From first thought to finished product.")}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {t("Our products and services bring strategy, design, and engineering together to support your next stage of growth.")}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => (
                <article key={`${service.id ?? service.num}-${index}`} className="surface-card p-6">
                  <span className="font-mono text-xs text-primary">{service.num}</span>
                  <h3 className="mt-4 font-display text-xl font-bold">{t(service.title)}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {t(service.description || "A thoughtful, tailored solution designed around your goals and the people you serve.")}
                  </p>
                  <Link
                    to={`/booking?service=${encodeURIComponent(service.title)}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
                  >
                    {t("Discuss this service")} <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
              <article className="surface-card p-6">
                <span className="font-mono text-xs text-primary"><Wrench className="inline h-4 w-4" /></span>
                <h3 className="mt-4 font-display text-xl font-bold">{t("Digital products")}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {t("We also design and build custom software and digital tools around specific customer needs.")}
                </p>
                <Link to="/projects" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
                  {t("View projects")} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="eyebrow">{t("Why Cyrech Tech")}</p>
                <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">{t("A different kind of partnership.")}</h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  {t("We bring strategy, design, and technical work closer together. That means fewer handoffs, more context, and a solution that reflects your actual needs—not just the latest trend or a prebuilt template.")}
                </p>
                <ul className="mt-7 space-y-4">
                  {differentiators.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-primary p-8 text-primary-foreground md:p-10">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] opacity-75">{t("Looking ahead")}</p>
                <h3 className="mt-4 font-display text-3xl font-bold">{t("Building capability. Creating lasting value.")}</h3>
                <p className="mt-5 leading-relaxed opacity-85">
                  {t("Our goal is to grow a strong, multidisciplinary team, deepen our engineering and design practice, and create digital products that solve meaningful challenges. We want to contribute to a more innovative digital future for Cameroon while serving ambitious customers wherever they are.")}
                </p>
                <Link
                  to="/projects"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5"
                >
                  {t("See what we’re building")} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 pb-20 md:pb-28">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-7 py-12 text-center text-primary-foreground md:px-16 md:py-16">
            <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border-[24px] border-primary-foreground/10" />
            <p className="relative font-mono text-xs font-semibold uppercase tracking-[0.2em] opacity-75">{t("Let’s make your next idea real")}</p>
            <h2 className="relative mx-auto mt-4 max-w-3xl font-display text-4xl font-bold md:text-5xl">
              {t("Choose a partner who cares about the outcome.")}
            </h2>
            <p className="relative mx-auto mt-5 max-w-2xl leading-relaxed opacity-85">
              {t("Tell us what you’re working toward. We’ll listen, ask the right questions, and help you find a practical next step.")}
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5">
                {t("Contact Cyrech Tech")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/booking" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold transition hover:bg-primary-foreground/10">
                {t("Book a service")} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
