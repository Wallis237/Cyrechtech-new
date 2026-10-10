import { ArrowRight, Download } from "lucide-react";
import AnimationWrapper from "./AnimationWrapper";
import { useSiteSettings } from "@/hooks/useContent";

const HeroSection = () => {
  const { data: settings } = useSiteSettings();
  const stats = [
    { value: "2000+", label: "Global Reach" },
    { value: "3+", label: "Years Exp." },
    { value: "50+", label: "Projects" },
    { value: "100%", label: "Passion" },
  ];


  return (
    <section id="home" className="relative pt-28 md:pt-32 pb-16 overflow-hidden">
      {/* Radial background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.04] blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Availability chip */}
        <AnimationWrapper animation="fadeUp" trigger="load" delay={100}>
          <div className="flex justify-center mb-8">
            <span className="availability-chip">
              Available for new projects
            </span>
          </div>
        </AnimationWrapper>

        {/* Headline */}
        <AnimationWrapper animation="fadeUp" trigger="load" delay={200}>
          <h1 className="font-display font-bold text-center text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl mx-auto">
            {settings?.hero_title ? (
              settings.hero_title
            ) : (
              <>
                Empowering Brands<br />
                Through <span className="accent-italic">Creative Solutions</span>
              </>
            )}
          </h1>
        </AnimationWrapper>

        <AnimationWrapper animation="fadeUp" trigger="load" delay={350}>
          <p className="mt-8 text-center text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {settings?.hero_subtitle ||
              "From Cameroon to the world. Cyrech Tech crafts high-performance digital experiences through precision engineering and artistic mastery."}
          </p>
        </AnimationWrapper>

        <AnimationWrapper animation="fadeUp" trigger="load" delay={500}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#contact" className="btn-lime">
              Start Your Project <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#projects" className="btn-ghost">
              View Portfolio
            </a>
          </div>
        </AnimationWrapper>

        {/* Stats strip */}
        <AnimationWrapper animation="fadeUp" delay={700}>
          <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-border">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-card px-6 py-8 flex flex-col items-center text-center"
              >
                <div className="font-display font-bold text-3xl md:text-4xl text-primary">
                  {s.value}
                </div>
                <div className="mt-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground font-mono">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </AnimationWrapper>

        {/* Company profile link */}
        <AnimationWrapper animation="fadeUp" delay={800}>
          <div className="mt-10 flex justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              <Download className="h-3.5 w-3.5" />
              Company Profile
            </a>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
};

export default HeroSection;
