
import { ArrowRight, Gauge, Layers3, Sparkles, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomePageSections from '../components/HomePageSections';
import AnimationWrapper from "@/components/AnimationWrapper";
import { useLanguage } from "@/i18n/LanguageProvider";

const highlights = [
  {
    icon: Sparkles,
    title: "Brand direction",
    description: "Creative strategy that gives your business a clearer message and stronger identity.",
  },
  {
    icon: Layers3,
    title: "Digital experiences",
    description: "Thoughtful website design and product experiences built to convert attention into action.",
  },
  {
    icon: Gauge,
    title: "Growth systems",
    description: "Simple, scalable systems that keep your marketing, product, and customer journey moving.",
  },
];

const Index = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <Navbar />

      <main className="relative pt-28 pb-16 md:pt-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-5xl text-center">
            <span className="lime-black-cycle inline-flex items-center rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
              {t("Creative digital studio")}
            </span>

            <h1 className="mt-8 font-display text-5xl font-bold leading-[0.92] tracking-tight text-foreground md:text-7xl lg:text-[6rem]">
              {t("We build ")}<span className="accent-italic">{t("clearer")}</span>{t(" brands for bold ideas.")}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
              {t("We help founders and teams turn scattered ideas into polished digital experiences that look premium and perform with purpose.")}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="btn-lime">
                {t("Book a discovery call")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/projects" className="btn-ghost">
                {t("See our projects")}
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {highlights.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-[28px] border border-border bg-card/70 p-6 text-left shadow-[0_30px_80px_rgba(0,0,0,0.06)] backdrop-blur-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">{t(title)}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{t(description)}</p>
              </div>
            ))}
          </div>

          <AnimationWrapper animation="dropDown" trigger="load" className="mt-12">
            <section className="relative overflow-hidden rounded-[28px] border border-primary/20 bg-card p-7 shadow-[0_30px_80px_rgba(0,0,0,0.14)] md:p-10">
              <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <p className="eyebrow">{t("Good work grows together")}</p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
                    {t("Let’s make your next move count.")}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
                    {t("Share your experience or talk with our team about bringing your next idea to life.")}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                  <Link to="/reviews" className="btn-lime">
                    <Star className="h-4 w-4" /> {t("Clients Reviews")}
                  </Link>
                  <Link to="/contact" className="btn-ghost">
                    <Users className="h-4 w-4" /> {t("Add Us to Your Bench")}
                  </Link>
                </div>
              </div>
            </section>
          </AnimationWrapper>
        </div>
        <HomePageSections />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
