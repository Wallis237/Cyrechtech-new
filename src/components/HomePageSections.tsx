import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Compass, HeartHandshake, Lightbulb, Send, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useServices } from "@/hooks/useContent";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ADDITIONAL_SERVICES } from "@/content/additionalServices";
import { submitToWeb3Forms } from "@/lib/web3forms";

const defaultServices = [
  { num: "01", title: "UI/UX Strategy", description: "" },
  { num: "02", title: "Web Systems", description: "" },
  { num: "03", title: "Game Architecture", description: "" },
  { num: "04", title: "Cloud Solutions", description: "" },
  ...ADDITIONAL_SERVICES.map((service, index) => ({
    num: String(index + 5).padStart(2, "0"),
    title: service.title,
    description: service.description,
  })),
];

const serviceDetails = [
  {
    match: ["ui", "ux", "design"],
    description: "We research, structure, and design intuitive digital experiences around the people who use them.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=85",
  },
  {
    match: ["web systems", "web system"],
    description: "Responsive websites and web applications that explain your value and support the way your business works.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=85",
  },
  {
    match: ["website", "web development"],
    description: "Create a distinctive, accessible website that explains your value and helps visitors take the next step.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=85",
  },
  {
    match: ["game", "architecture"],
    description: "Technical planning and system design for engaging, reliable interactive and game experiences.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=85",
  },
  {
    match: ["cloud", "hosting", "infrastructure"],
    description: "Cloud infrastructure and deployment workflows designed to keep your products dependable as they grow.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85",
  },
  {
    match: ["e-commerce", "commerce", "store"],
    description: "Online storefronts that present your products clearly and make it easier for customers to buy.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=85",
  },
  {
    match: ["mobile", "app"],
    description: "Mobile product experiences that bring helpful digital services directly to your customers.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=85",
  },
  {
    match: ["brand", "identity", "graphic"],
    description: "Brand strategy and visual systems that make your business recognisable and consistent.",
    image: "https://images.unsplash.com/photo-1634942536790-25350e7c1ba6?w=1200&q=85",
  },
  {
    match: ["photography", "photo"],
    description: "Photography and visual content that give your brand a distinctive, authentic presence.",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=85",
  },
  {
    match: ["software", "custom"],
    description: "Custom software and digital tools designed around your team's workflows and customer needs.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85",
  },
];

const genericServiceDetail = {
  description: "A tailored digital solution shaped around your goals, customers, and the way your business works.",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85",
};

const values = [
  {
    icon: Target,
    title: "Our mission",
    description:
      "To make technology work for people and businesses by creating useful, thoughtful digital products and experiences.",
  },
  {
    icon: Compass,
    title: "Our vision",
    description:
      "To be a trusted creative technology partner from Cameroon, helping ambitious ideas make a lasting impact everywhere.",
  },
];

const reasons = [
  {
    icon: Lightbulb,
    title: "Thoughtful by design",
    description: "We start by understanding your goals, then shape a clear solution around what matters most.",
  },
  {
    icon: HeartHandshake,
    title: "A partner, not just a provider",
    description: "You stay involved throughout the process, with honest communication and decisions made together.",
  },
  {
    icon: Check,
    title: "Built to make a difference",
    description: "We bring creativity and technical care together to make work that is useful, dependable, and ready to grow.",
  },
];

const HomePageSections = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { data: serviceRows } = useServices();
  const [name, setName] = useState("");
  const [experienceEmail, setExperienceEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [experienceSubmitting, setExperienceSubmitting] = useState(false);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const carouselOffsetRef = useRef(0);
  const services = (serviceRows?.length ? serviceRows : defaultServices).map((service) => {
    const detail = serviceDetails.find(({ match }) =>
      match.some((keyword) => service.title.toLowerCase().includes(keyword))
    ) ?? genericServiceDetail;

    return {
      ...service,
      description: service.description || detail.description,
      image: detail.image,
    };
  });

  const moveCarousel = (direction: -1 | 1) => {
    const track = carouselTrackRef.current;
    if (!track || services.length < 2) return;
    const halfWidth = track.scrollWidth / 2;
    const slideWidth = halfWidth / services.length;
    let offset = carouselOffsetRef.current - direction * slideWidth;
    while (offset >= 0) offset -= halfWidth;
    while (offset < -halfWidth) offset += halfWidth;
    carouselOffsetRef.current = offset;
    track.style.transform = `translate3d(${offset}px, 0, 0)`;
  };

  useEffect(() => {
    const track = carouselTrackRef.current;
    if (!track || services.length < 2) return;

    let frameId = 0;
    let previousTime = 0;
    let halfWidth = track.scrollWidth / 2;
    if (!halfWidth) return;

    if (!carouselOffsetRef.current) carouselOffsetRef.current = -halfWidth;
    const applyOffset = () => {
      halfWidth = track.scrollWidth / 2;
      if (carouselOffsetRef.current < -halfWidth || carouselOffsetRef.current > 0) {
        carouselOffsetRef.current = -halfWidth;
      }
      track.style.transform = `translate3d(${carouselOffsetRef.current}px, 0, 0)`;
    };
    applyOffset();

    const resizeObserver = new ResizeObserver(applyOffset);
    resizeObserver.observe(track);

    const animate = (time: number) => {
      if (previousTime) {
        const elapsed = Math.min(time - previousTime, 50);
        if (!carouselPaused) {
          carouselOffsetRef.current += elapsed * 0.03;
          if (carouselOffsetRef.current >= 0) carouselOffsetRef.current -= halfWidth;
          track.style.transform = `translate3d(${carouselOffsetRef.current}px, 0, 0)`;
        }
      }
      previousTime = time;
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [carouselPaused, services.length]);

  const renderServiceCards = (duplicate = false) => services.map((service, index) => (
    <div key={`${duplicate ? "duplicate-" : ""}${service.num ?? service.title}-${index}`} className="home-offer-slide shrink-0 pl-5">
      <article className="surface-card-hover group h-full overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={service.image}
            alt={duplicate ? "" : `${t(service.title)} ${t("service")}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-xs text-white backdrop-blur">
            {service.num}
          </span>
        </div>
        <div className="flex min-h-48 flex-col p-6">
          <h3 className="font-display text-xl font-bold">{t(service.title)}</h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
            {t(service.description)}
          </p>
          <Link
            to="/services"
            tabIndex={duplicate ? -1 : undefined}
            className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            {t("Explore")} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </div>
  ));

  const shareExperience = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setExperienceSubmitting(true);
    try {
      await submitToWeb3Forms(`Website experience shared by ${name}`, {
        form_type: "Website feedback",
        name: name.trim(),
        email: experienceEmail.trim(),
        message: experience.trim(),
      });
      toast({
        title: t("Feedback sent"),
        description: t("Thank you for sharing your experience."),
      });
      setName("");
      setExperienceEmail("");
      setExperience("");
    } catch (error) {
      console.error("Website feedback submission failed:", error);
      toast({
        title: t("We couldn't send your feedback."),
        description: t("Please try again or email cyrechtech@gmail.com."),
        variant: "destructive",
      });
    } finally {
      setExperienceSubmitting(false);
    }
  };

  return (
    <>
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="eyebrow">{t("Purpose & direction")}</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              {t("What drives our work")}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map(({ icon: Icon, title, description }) => (
              <article key={title} className="surface-card p-8 md:p-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl font-bold">{t(title)}</h3>
                <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{t(description)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-y border-border bg-card/30">
        <div className="container mx-auto px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow">{t("What we offer")}</p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
                {t("Services built for your next step.")}
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                {t("Explore the ways we can help your ideas move from concept to a polished digital experience.")}
              </p>
            </div>
            <Link to="/services" className="btn-ghost">
              {t("All services")} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div
            className="relative"
            onFocusCapture={() => setCarouselPaused(true)}
            onBlurCapture={() => setCarouselPaused(false)}
            role="region"
            aria-roledescription="carousel"
            aria-label={t("Services offered by Cyrech Tech")}
          >
            <style>{`
              .home-offer-track { width: max-content; will-change: transform; }
              .home-offer-slide {
                box-sizing: border-box;
                flex: 0 0 calc((100vw - 3rem) * .88);
              }
              @media (min-width: 640px) {
                .home-offer-slide { flex-basis: calc((100vw - 3rem) * .5); }
              }
              @media (min-width: 1024px) {
                .home-offer-slide { flex-basis: calc((min(100vw, 1280px) - 3rem) / 3); }
              }
            `}</style>
            <div className="absolute -top-[4.25rem] right-0 flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => moveCarousel(-1)}
                aria-label={t("Previous service")}
                disabled={services.length < 2}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => moveCarousel(1)}
                aria-label={t("Next service")}
                disabled={services.length < 2}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="overflow-hidden -ml-5">
              <div
                ref={carouselTrackRef}
                className="home-offer-track flex"
              >
                <div className="flex shrink-0">
                  {renderServiceCards()}
                </div>
                {services.length > 1 && (
                  <div className="flex shrink-0" aria-hidden="true">
                    {renderServiceCards(true)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-y border-border bg-card/30">
        <div className="container mx-auto px-6">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">{t("Why Cyrech Tech")}</p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight md:text-5xl">
                {t("Good thinking. Great partnership.")}
              </h2>
            </div>
            <p className="max-w-md leading-relaxed text-muted-foreground">
              {t("The best results come from clear goals, close collaboration, and care in every detail.")}
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {reasons.map(({ icon: Icon, title, description }) => (
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
          <div className="grid gap-10 rounded-3xl border border-border bg-card p-7 md:grid-cols-2 md:items-center md:p-12">
            <div>
              <p className="eyebrow">{t("Your voice matters")}</p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
                {t("Share your experience.")}
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
                {t("Have you worked with us or explored our work? Tell us what stood out or how we can do better.")}
              </p>
            </div>
            <form onSubmit={shareExperience} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("Your name")}</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  maxLength={100}
                  placeholder={t("Your name")}
                  className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("Email Address")}</span>
                <input
                  type="email"
                  value={experienceEmail}
                  onChange={(event) => setExperienceEmail(event.target.value)}
                  required
                  maxLength={254}
                  placeholder={t("Email Address")}
                  className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("Your experience")}</span>
                <textarea
                  value={experience}
                  onChange={(event) => setExperience(event.target.value)}
                  required
                  maxLength={2000}
                  rows={4}
                  placeholder={t("Share your feedback with us...")}
                  className="w-full resize-y rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <button type="submit" disabled={experienceSubmitting} className="btn-lime disabled:cursor-wait disabled:opacity-60">
                {experienceSubmitting ? t("Sending…") : t("Share feedback")} <Send className="h-4 w-4" />
              </button>
              <p className="text-xs text-muted-foreground">{t("Your feedback will be sent directly to our team.")}</p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePageSections;
