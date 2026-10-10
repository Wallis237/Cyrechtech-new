import {
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Camera,
  Cloud,
  Code2,
  Gamepad2,
  IdCard,
  Megaphone,
  Palette,
  PanelsTopLeft,
  PenTool,
  ShoppingCart,
  Smartphone,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useServices } from "@/hooks/useContent";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ADDITIONAL_SERVICES } from "@/content/additionalServices";

const defaultServices = [
  { id: "01", num: "01", title: "UI/UX Strategy", description: "" },
  { id: "02", num: "02", title: "Web Systems", description: "" },
  { id: "03", num: "03", title: "Game Architecture", description: "" },
  { id: "04", num: "04", title: "Cloud Solutions", description: "" },
  ...ADDITIONAL_SERVICES.map((service, index) => ({
    ...service,
    num: String(index + 5).padStart(2, "0"),
    sort_order: index + 5,
  })),
];

const serviceDetails: { match: string[]; icon: LucideIcon; description: string; benefits: string[] }[] = [
  {
    match: ["company logo"],
    icon: BadgeCheck,
    description: "Create a distinctive company logo that makes your business recognisable and gives your brand a clear visual foundation.",
    benefits: ["Memorable visuals that make your business easy to recognise", "Consistent creative assets for print and digital channels", "Design files prepared for practical use"],
  },
  {
    match: ["graphic design"],
    icon: Palette,
    description: "Design polished visual materials for your campaigns, products, and communications across print and digital channels.",
    benefits: ["Memorable visuals that make your business easy to recognise", "Consistent creative assets for print and digital channels", "Design files prepared for practical use"],
  },
  {
    match: ["business card"],
    icon: IdCard,
    description: "Make a memorable first impression with professional business cards that reflect your brand and make it easy to connect.",
    benefits: ["Memorable visuals that make your business easy to recognise", "Consistent creative assets for print and digital channels", "Design files prepared for practical use"],
  },
  {
    match: ["social media marketing"],
    icon: Megaphone,
    description: "Plan and create consistent social media content that helps your business engage the right audience and grow its community.",
    benefits: ["Clear campaigns aligned with your business goals", "Content tailored to your audience and channels", "Actionable insights to guide the next campaign"],
  },
  {
    match: ["digital marketing"],
    icon: Megaphone,
    description: "Reach the right customers online with a practical digital marketing strategy shaped around your goals and budget.",
    benefits: ["Clear campaigns aligned with your business goals", "Content tailored to your audience and channels", "Actionable insights to guide the next campaign"],
  },
  {
    match: ["brand identity"],
    icon: PenTool,
    description: "Build a cohesive brand identity with a clear visual direction and reusable assets for every customer touchpoint.",
    benefits: ["Memorable visuals that make your business easy to recognise", "Consistent creative assets for print and digital channels", "Design files prepared for practical use"],
  },
  {
    match: ["ai solutions", "business automation"],
    icon: BrainCircuit,
    description: "Use practical AI tools and automation to reduce repetitive work and improve the way your business operates.",
    benefits: ["Less repetitive manual work", "Tools and processes tailored to your workflow", "Practical implementation with a clear handover"],
  },
  {
    match: ["business it consultancy", "it consultancy"],
    icon: BriefcaseBusiness,
    description: "Get clear, independent IT guidance to choose technology, plan improvements, and align systems with your business needs.",
    benefits: ["Independent advice grounded in your business needs", "Clear priorities for technology investment", "Practical recommendations your team can act on"],
  },
  {
    match: ["ui", "ux", "design"],
    icon: Palette,
    description: "We research, structure, and design intuitive digital experiences around the people who use them.",
    benefits: ["Clearer product direction", "Simpler customer journeys", "Responsive design foundations"],
  },
  {
    match: ["web systems", "web system"],
    icon: PanelsTopLeft,
    description: "Responsive websites and web applications that explain your value and support the way your business works.",
    benefits: ["A stronger digital presence", "Experiences built for every screen", "A platform ready to evolve"],
  },
  {
    match: ["website", "web development"],
    icon: PanelsTopLeft,
    description: "Create a distinctive, accessible website that explains your value and helps visitors take the next step.",
    benefits: ["A stronger first impression", "A smoother mobile experience", "More clarity for potential customers"],
  },
  {
    match: ["game", "architecture"],
    icon: Gamepad2,
    description: "Technical planning and system design for engaging, reliable interactive and game experiences.",
    benefits: ["Coherent player experiences", "Scalable gameplay foundations", "Less uncertainty during development"],
  },
  {
    match: ["cloud", "hosting", "infrastructure"],
    icon: Cloud,
    description: "Cloud infrastructure and deployment workflows designed to keep your products dependable as they grow.",
    benefits: ["More reliable releases", "A foundation for growth", "Smoother operations"],
  },
  {
    match: ["e-commerce", "commerce", "store"],
    icon: ShoppingCart,
    description: "Online storefronts that present your products clearly and make it easier for customers to buy.",
    benefits: ["A more convenient buying journey", "A storefront shaped around your brand", "Room to grow your catalogue"],
  },
  {
    match: ["mobile", "application", "app"],
    icon: Smartphone,
    description: "Mobile product experiences that bring helpful digital services directly to your customers.",
    benefits: ["Direct access to your service", "A focused mobile experience", "A clear path for future improvements"],
  },
  {
    match: ["brand", "identity", "graphic"],
    icon: PenTool,
    description: "Brand strategy and visual systems that make your business recognisable and consistent.",
    benefits: ["A clearer brand story", "Consistent visual direction", "Assets ready to use across channels"],
  },
  {
    match: ["photography", "photo"],
    icon: Camera,
    description: "Photography and visual content that give your brand a distinctive, authentic presence.",
    benefits: ["Memorable brand visuals", "Content tailored to your audience", "A consistent look across platforms"],
  },
  {
    match: ["software", "custom", "application"],
    icon: Code2,
    description: "Custom software and digital tools designed around your team's workflows and customer needs.",
    benefits: ["Less friction in daily work", "Tools tailored to your process", "A platform that can grow with you"],
  },
  {
    match: ["e-commerce", "commerce", "store"],
    icon: ShoppingCart,
    description: "Online storefronts that present your products clearly and make it easier for customers to buy.",
    benefits: ["A more convenient buying journey", "A storefront shaped around your brand", "Room to grow your catalogue"],
  },
  {
    match: ["mobile", "application", "app"],
    icon: Smartphone,
    description: "Mobile product experiences that bring helpful digital services directly to your customers.",
    benefits: ["Direct access to your service", "A focused mobile experience", "A clear path for future improvements"],
  },
  {
    match: ["brand", "identity", "graphic"],
    icon: PenTool,
    description: "Brand strategy and visual systems that make your business recognisable and consistent.",
    benefits: ["A clearer brand story", "Consistent visual direction", "Assets ready to use across channels"],
  },
  {
    match: ["photography", "photo"],
    icon: Camera,
    description: "Photography and visual content that give your brand a distinctive, authentic presence.",
    benefits: ["Memorable brand visuals", "Content tailored to your audience", "A consistent look across platforms"],
  },
];

const genericDetail = {
  icon: Workflow,
  description: "A tailored digital solution shaped around your goals, customers, and the way your business works.",
  benefits: ["Clearer direction for your project", "A solution designed around your needs", "A trusted partner throughout delivery"],
};

const ServicesPage = () => {
  const { data: rows } = useServices();
  const { t } = useLanguage();
  const services = rows?.length ? rows : defaultServices;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          </div>
          <div className="container relative mx-auto px-6 py-16 md:py-24">
            <p className="eyebrow">{t("Services")}</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-tight md:text-7xl">
              {t("Strategy, design, and product execution.")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("From brand systems to product experiences, we build digital solutions that help teams grow with confidence and clarity.")}
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container mx-auto px-6">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="eyebrow">{t("What we offer")}</p>
                <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                  {t("Every service is tailored to your goals.")}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                {t("Choose a service to discuss your project and plan the right next step.")}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => {
                const detail = serviceDetails.find(({ match }) =>
                  match.some((keyword) => service.title.toLowerCase().includes(keyword))
                ) ?? genericDetail;
                const Icon = detail.icon;
                const description = service.description || detail.description || genericDetail.description;
                const benefits = detail.benefits || genericDetail.benefits;

                return (
                  <article key={service.id ?? `${service.num}-${index}`} className="surface-card-hover flex h-full flex-col overflow-hidden p-6 md:p-7">
                    <div className="mb-7 flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-7 w-7" strokeWidth={1.7} />
                      </div>
                      <span className="font-mono text-xs tracking-widest text-muted-foreground">{service.num}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold">{t(service.title)}</h3>
                    <p className="mt-3 min-h-16 text-sm leading-6 text-muted-foreground">{t(description)}</p>
                    <div className="mt-6 border-t border-border pt-5">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("Benefits for you")}</h4>
                      <ul className="mt-4 space-y-3">
                        {benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2.5 text-sm">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {t(benefit)}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      to={`/booking?service=${encodeURIComponent(service.title)}`}
                      className="btn-lime mt-7 w-full"
                    >
                      {t("Book This Service")} <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 pb-20">
          <div className="rounded-3xl border border-border bg-card p-8 text-center md:p-12">
            <h2 className="font-display text-3xl font-bold md:text-4xl">{t("Not sure which service is right for you?")}</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              {t("Tell us what you are trying to achieve and we will help you find a practical way forward.")}
            </p>
            <Link to="/contact" className="btn-ghost mt-7">
              {t("Talk to our team")} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
