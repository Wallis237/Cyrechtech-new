import { ArrowUpRight, Globe2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import AnimationWrapper from "@/components/AnimationWrapper";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useCollaborators } from "@/hooks/useContent";
import { useLanguage } from "@/i18n/LanguageProvider";

const firstCollaborator = {
  id: "pablo-perez",
  name: "Pablo Perez",
  occupation: "Partner of Cyrech Tech",
  country: "Spain",
  biography: "Works for the Commonwealth Organisation.",
  image: "/lovable-uploads/collaborator-pablo-perez.png",
  profile_url: "",
  sort_order: 1,
};

const CollaborationsPage = () => {
  const { data: collaborators, isLoading } = useCollaborators();
  const { t } = useLanguage();
  const profiles = [
    firstCollaborator,
    ...(collaborators ?? []).filter((person) => person.name.trim().toLowerCase() !== firstCollaborator.name.toLowerCase()),
  ];
  const completeProfiles = profiles.filter((person) =>
    person.name.trim() && person.occupation.trim() && person.country.trim()
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          </div>
          <div className="container relative mx-auto px-6 py-16 md:py-24">
            <p className="eyebrow">{t("Our collaborators")}</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-tight md:text-7xl">
              {t("Better work, built together.")}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("Meet the talented people and professionals we collaborate with to bring thoughtful digital work to life.")}
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container mx-auto px-6">
            <div className="mb-9 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="eyebrow">{t("Our network")}</p>
                <h2 className="mt-1 font-display text-2xl font-bold">{t("People we create with.")}</h2>
              </div>
            </div>

            {isLoading && (
              <p className="mb-6 text-sm text-muted-foreground">{t("Loading additional collaborator profiles…")}</p>
            )}
            {completeProfiles.length ? (
              <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {completeProfiles.map((person, index) => (
                  <AnimationWrapper key={person.id} animation="fadeUpScale" delay={Math.min(index * 80, 400)}>
                    <article className="surface-card-hover group flex h-full flex-col overflow-hidden">
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                        {person.image ? (
                          <img
                            src={person.image}
                            alt={person.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 via-card to-muted">
                            <span className="font-display text-6xl font-bold text-primary/70">
                              {person.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("")}
                            </span>
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
                        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/85 px-3 py-1.5 text-xs font-medium backdrop-blur">
                          <Globe2 className="h-3.5 w-3.5 text-primary" />{t(person.country)}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="font-display text-2xl font-bold transition-colors group-hover:text-primary">{t(person.name)}</h3>
                        <p className="mt-1 text-sm font-medium text-primary">{t(person.occupation)}</p>
                        {person.biography && (
                          <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{t(person.biography)}</p>
                        )}
                        {person.profile_url && (
                          <a
                            href={person.profile_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                          >
                            {t("View profile")} <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </article>
                  </AnimationWrapper>
                ))}
              </div>
            ) : (
              <div className="surface-card mx-auto max-w-3xl px-6 py-14 text-center md:px-10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">{t("Our collaboration profiles are coming soon.")}</h3>
                <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">
                  {t("We are preparing profiles for the talented people we work with. Please check back soon.")}
                </p>
              </div>
            )}

            <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-3xl border border-border bg-card p-7 md:flex-row md:items-center md:p-10">
              <div>
                <p className="eyebrow">{t("Interested in collaborating?")}</p>
                <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">{t("Let’s create something together.")}</h2>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/collaborations/careers" className="btn-ghost shrink-0">{t("Explore career opportunities")} <ArrowUpRight className="h-4 w-4" /></Link>
                <Link to="/contact" className="btn-lime shrink-0">{t("Contact us")} <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CollaborationsPage;
