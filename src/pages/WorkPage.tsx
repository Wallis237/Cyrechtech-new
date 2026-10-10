import { ArrowDown, ArrowRight, Layers3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectsSection from "../components/ProjectsSection";
import GallerySection from "../components/GallerySection";
import { useLanguage } from "@/i18n/LanguageProvider";

const WorkPage = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-16">
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-28 -top-32 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>
          <div className="container relative mx-auto grid gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            <div className="max-w-4xl">
              <p className="eyebrow inline-flex items-center gap-2"><Sparkles className="h-4 w-4" /> {t("Our portfolio")} / {t("Projects")}</p>
              <h1 className="mt-5 font-display text-5xl font-bold leading-[.96] tracking-tight md:text-7xl">
                {t("Good ideas deserve")} <span className="accent-italic">{t("great execution.")}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                {t("A showcase of thoughtful digital products, web experiences, and creative work built to help people and businesses move forward.")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-lime">{t("Start a project")} <ArrowRight className="h-4 w-4" /></Link>
                <a href="#projects" className="btn-ghost">{t("Explore projects")} <ArrowDown className="h-4 w-4" /></a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] border border-primary/15 rotate-3" />
              <div className="relative overflow-hidden rounded-[1.6rem] border border-border bg-card p-5 shadow-[0_30px_90px_rgba(0,0,0,.25)] sm:p-7">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-muted-foreground">
                    <Layers3 className="h-4 w-4 text-primary" /> {t("Selected work")}
                  </div>
                  <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    { title: t("Software"), style: "from-primary/20 to-primary/5" },
                    { title: t("Web Dev"), style: "from-blue-500/20 to-blue-500/5" },
                    { title: t("Photography"), style: "from-orange-400/20 to-orange-400/5" },
                    { title: t("Design"), style: "from-violet-500/20 to-violet-500/5" },
                  ].map(({ title, style }, index) => (
                    <div key={title} className={`group relative flex aspect-[1.18] items-end overflow-hidden rounded-xl border border-border bg-gradient-to-br ${style} p-4 transition-transform duration-300 hover:-translate-y-1`}>
                      <span className="absolute right-3 top-3 font-display text-4xl font-bold text-foreground/10">0{index + 1}</span>
                      <span className="relative text-sm font-semibold">{title}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">{t("Thoughtful ideas, carefully crafted into work that makes a difference.")}</p>
              </div>
            </div>
          </div>
        </section>

        <ProjectsSection />
        <GallerySection />
      </main>

      <Footer />
    </div>
  );
};

export default WorkPage;
