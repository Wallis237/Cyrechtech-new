import { useState } from 'react';
import { ArrowRight, BriefcaseBusiness, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import AnimationWrapper from './AnimationWrapper';
import { useProjects } from '@/hooks/useContent';
import { useLanguage } from "@/i18n/LanguageProvider";

interface Project {
  id: number | string;
  title: string;
  description: string;
  image: string;
  category: string[];
  tags?: string[];
  featured?: boolean;
}

const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured online store with payment processing and inventory management.",
    image: "/lovable-uploads/bfecc9f4-5d72-4357-8d01-57d515ca89b0.png",
    category: ["software", "web"],
    tags: ["React", "Tailwind", "Framer Motion"],
    featured: true,
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Responsive portfolio website with animated sections and filtering gallery.",
    image: "/lovable-uploads/033930a6-c382-4cc3-ba0e-9f3e9c7bfd31.png",
    category: ["web"],
    tags: ["TypeScript"],
  },
  {
    id: 3,
    title: "Photography Portfolio",
    description: "Elegant photography showcase with lightbox gallery and smooth transitions.",
    image: "/lovable-uploads/IMG-20250501-WA0034.jpg",
    category: ["photography"],
    tags: ["React", "GSAP"],
  },
  {
    id: 4,
    title: "Brand Identity Pack",
    description: "Complete brand identity including logo, color palette, and marketing materials.",
    image: "/lovable-uploads/Purple White Orange Modern Geometric Digital Marketing Training Banner_20250430_130331_0000.png",
    category: ["design"],
    tags: ["Branding", "Design"],
  },
  {
    id: 5,
    title: "Mobile Application",
    description: "Cross-platform mobile app with user authentication and cloud synchronization.",
    image: "/lovable-uploads/Screenshot_20250707-133307.png",
    category: ["software"],
    tags: ["React Native"],
  },
  {
    id: 6,
    title: "UI/UX Design System",
    description: "Comprehensive design system with component library and usage guidelines.",
    image: "/lovable-uploads/0d30ad6b-398e-41f3-81d9-091bcccc1dd0.png",
    category: ["design", "web"],
    tags: ["Figma", "System"],
  },
  {
    id: 7,
    title: "Chat App",
    description: "A full chat app where users create accounts and message each other with profile uploads.",
    image: "/lovable-uploads/e85332d2-9f30-40f5-9d44-f9bf93ebb34e.png",
    category: ["software", "web"],
    tags: ["Realtime", "React"],
  },
  {
    id: 8,
    title: "Client Intake",
    description: "A full-featured online questionnaire to help me understand client demands.",
    image: "/lovable-uploads/3028df71-0167-4088-a78f-40507a4ea535.png",
    category: ["software", "web"],
    tags: ["Forms", "TypeScript"],
  },
];

const categories = [
  { id: "all", name: "All" },
  { id: "software", name: "Software" },
  { id: "web", name: "Web Dev" },
  { id: "photography", name: "Photography" },
  { id: "design", name: "Design" },
];

const ProjectsSection = () => {
  const [filter, setFilter] = useState<string>("all");
  const { data: rows } = useProjects();
  const { t } = useLanguage();

  const projects: Project[] = rows?.length
    ? rows.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        image: r.image,
        category: r.categories ?? [],
        tags: r.tags ?? [],
        featured: r.featured,
      }))
    : fallbackProjects;

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter((project) => project.category.includes(filter));
  const activeCategory = categories.find((category) => category.id === filter);


  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute -left-48 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="container mx-auto px-6">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <AnimationWrapper animation="fadeUp">
            <div className="max-w-3xl">
              <div className="eyebrow">{t("Selected Work")} / {t("Made with purpose")}</div>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[.98] tracking-tight md:text-6xl">
                {t("Ideas made")} <span className="accent-italic">{t("visible.")}</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                {t("Explore a collection of digital products, web experiences, and creative work built to solve real problems and help brands move forward.")}
              </p>
            </div>
          </AnimationWrapper>
          <AnimationWrapper animation="fadeUp" delay={120}>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/70 px-5 py-4 backdrop-blur">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BriefcaseBusiness className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-2xl font-bold leading-none">{projects.length.toString().padStart(2, "0")}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{t("Selected projects")}</div>
              </div>
            </div>
          </AnimationWrapper>
        </div>

        <AnimationWrapper animation="fadeUp" delay={180}>
          <div className="mb-8 flex flex-col gap-4 border-y border-border py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-muted-foreground">
              <Layers3 className="h-4 w-4 text-primary" />
              {t("Browse by category")}
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => {
                const count = c.id === "all"
                  ? projects.length
                  : projects.filter((project) => project.category.includes(c.id)).length;
                const selected = filter === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setFilter(c.id)}
                    aria-pressed={selected}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      selected ? "bg-primary text-primary-foreground shadow-[0_6px_24px_-8px_hsl(var(--primary)/.7)]" : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {t(c.name)}
                    <span className={`text-[10px] ${selected ? "text-primary-foreground/70" : "text-muted-foreground/70"}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </AnimationWrapper>

        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{t("Project collection")}</p>
            <h3 className="mt-1 font-display text-2xl font-bold">{t(activeCategory?.name ?? "All")} <span className="text-muted-foreground">({filteredProjects.length})</span></h3>
          </div>
          <Link to="/contact" className="hidden items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground sm:inline-flex">
            {t("Have a project in mind?")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {filteredProjects.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <AnimationWrapper
                key={project.id}
                animation="fadeUpScale"
                delay={80 + (index % 4) * 70}
                className={project.featured ? "md:col-span-2 xl:col-span-2" : ""}
              >
                <ProjectCard project={project} />
              </AnimationWrapper>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
            <p className="font-display text-xl font-semibold">{t("No projects in this category yet.")}</p>
            <button onClick={() => setFilter("all")} className="btn-ghost mt-5">{t("View all projects")}</button>
          </div>
        )}

        <div className="mt-14 flex flex-col gap-5 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-7 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="eyebrow">{t("Your idea could be next")}</p>
            <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">{t("Let’s build something meaningful.")}</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{t("Tell us what you’re planning and we’ll help shape a practical path from idea to launch.")}</p>
          </div>
          <Link to="/contact" className="btn-lime shrink-0">{t("Contact Us")} <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const { t } = useLanguage();
  return (
    <article className={`surface-card-hover group flex h-full flex-col overflow-hidden ${project.featured ? "md:flex-row" : ""}`}>
      <div className={`relative aspect-[16/10] overflow-hidden bg-muted ${project.featured ? "md:aspect-auto md:w-1/2 md:shrink-0" : ""}`}>
        {project.image ? (
          <img
            src={project.image}
            alt={t(project.title)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-6xl font-display font-bold text-muted-foreground/20">
            {project.title.charAt(0)}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent opacity-80" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {project.category.slice(0, 2).map((category) => (
            <span key={category} className="rounded-full border border-primary/20 bg-background/85 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-primary backdrop-blur-md">
              {t(categories.find((item) => item.id === category)?.name ?? category)}
            </span>
          ))}
        </div>
        {project.featured && (
          <span className="absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground">
            {t("Featured")}
          </span>
        )}
      </div>

      <div className="flex flex-grow flex-col p-6 md:p-7">
        <h3 className="font-display font-bold text-xl md:text-2xl group-hover:text-primary transition-colors">
          {t(project.title)}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-grow">
          {t(project.description)}
        </p>
        {project.tags && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-1 rounded-md bg-muted text-muted-foreground uppercase tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <Link to="/contact" className="btn-ghost mt-6 w-full justify-center">
          {t("Contact Us")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
};

export default ProjectsSection;
