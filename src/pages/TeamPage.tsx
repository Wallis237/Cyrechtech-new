import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useTeam, type TeamRow } from "@/hooks/useContent";
import { useLanguage } from "@/i18n/LanguageProvider";

type TeamProfile = TeamRow & {
  expertise: string;
  secondaryRole?: string;
};

const teamProfiles: TeamProfile[] = [
  {
    id: "tarshi-williams",
    name: "Tarshi Williams",
    role: "Director",
    description: "Tarshi helps guide the company's direction, coordinate delivery, and keep client goals at the centre of each engagement.",
    image: "/lovable-uploads/team-tarshi-williams.png",
    sort_order: 1,
    expertise: "Leadership, project coordination, client partnerships",
  },
  {
    id: "akimbong-chercy",
    name: "Monthe Christian",
    role: "Human Resources",
    description: "Monthe supports the people and team practices that help Cyrech Tech collaborate, grow, and do thoughtful work.",
    image: "/lovable-uploads/team-monthe-christian.png",
    sort_order: 2,
    expertise: "People operations, team support, collaboration",
  },
  {
    id: "ndel-mike",
    name: "Ndel Mike",
    role: "Head of Engineering",
    description: "Ndel leads engineering work, helping turn product requirements into dependable, well-structured digital solutions.",
    image: "/lovable-uploads/team-ndel-mike.png",
    sort_order: 3,
    expertise: "Software engineering, web systems, technical delivery",
  },
  {
    id: "pieukam-ralf",
    name: "Pieukam Ralf",
    role: "Chief of Operations",
    secondaryRole: "Chief of Marketing Team",
    description: "Pieukam leads operational coordination and marketing efforts, helping projects run smoothly while strengthening the team's reach and brand presence.",
    image: "/lovable-uploads/team-pieukam-ralf.png",
    sort_order: 4,
    expertise: "Operations leadership, marketing strategy, project delivery",
  },
  {
    id: "sufeu-tallla-grace",
    name: "Sufeu Tallla Grace",
    role: "Client Experience & Technology Officer",
    description: "Combines client support with technology-driven solutions to enhance customer satisfaction, resolve issues, and build lasting relationships.",
    image: "/lovable-uploads/team-sufeu-tallla-grace.png",
    sort_order: 6,
    expertise: "Client experience, technology-driven support, customer relationships",
  },
];

const displayName = (name: string) => {
  const normalizedName = name.trim().toLowerCase();
  if (normalizedName === "ebua glenn" || normalizedName === "ebua glenn ndoh") return "Ebua Glenn";
  if (normalizedName === "akimbong chercy") return "Monthe Christian";
  if (normalizedName === "ebua ford" || normalizedName === "ebua ford buo") return "Pieukam Ralf";
  if (normalizedName === "ewe bryan") return "Ndel Mike";
  return name;
};

const displayRole = (name: string, role: string) =>
  name.trim().toLowerCase() === "tarshi williams" ? "Director" : role;

const isPieukamProfile = (name: string) =>
  ["pieukam ralf", "ebua ford", "ebua ford buo"].includes(name.trim().toLowerCase());

const isMontheProfile = (name: string) =>
  ["monthe christian", "akimbong chercy"].includes(name.trim().toLowerCase());

const isTarshiProfile = (name: string) =>
  name.trim().toLowerCase() === "tarshi williams";

const isCeoProfile = (name: string) =>
  ["ebua glenn", "ebua glenn ndoh"].includes(name.trim().toLowerCase());

const isGraceProfile = (name: string) =>
  ["sufeu talla grace", "sufeu tallla grace"].includes(name.trim().toLowerCase());

const TeamPage = () => {
  const { data: rows } = useTeam();
  const { t } = useLanguage();
  const members: TeamProfile[] = rows?.length
    ? rows.map((row) => {
        const displayedName = displayName(row.name);
        const profile = teamProfiles.find((item) => item.name.toLowerCase() === displayedName.toLowerCase());
        const pieukam = isPieukamProfile(row.name);
        const monthe = isMontheProfile(displayedName);
        const tarshi = isTarshiProfile(displayedName);
        const ndel = displayedName.toLowerCase() === "ndel mike";
        const ceo = isCeoProfile(row.name);
        const grace = isGraceProfile(row.name);
        return {
          ...row,
          name: grace ? "Sufeu Tallla Grace" : displayedName,
          role: ceo ? "CEO" : grace ? "Client Experience & Technology Officer" : pieukam ? "Chief of Operations" : displayRole(row.name, row.role),
          secondaryRole: pieukam ? "Chief of Marketing Team" : undefined,
          description: grace
            ? "Combines client support with technology-driven solutions to enhance customer satisfaction, resolve issues, and build lasting relationships."
            : row.description || profile?.description || t("A valued member of our multidisciplinary team, contributing to thoughtful digital solutions for our clients."),
          image: grace
            ? "/lovable-uploads/team-sufeu-tallla-grace.png"
            : ceo
            ? "/lovable-uploads/team-ebua-glenn.png"
            : pieukam
            ? "/lovable-uploads/team-pieukam-ralf.png"
            : monthe
              ? "/lovable-uploads/team-monthe-christian.png"
              : tarshi
                ? "/lovable-uploads/team-tarshi-williams.png"
                : ndel
                  ? "/lovable-uploads/team-ndel-mike.png"
              : row.image || profile?.image || "",
          expertise: profile?.expertise || row.role,
        };
      })
    : teamProfiles.map((member) => ({ ...member, name: displayName(member.name) }));
  const displayedNames = new Set(members.map((member) => member.name.trim().toLowerCase()));
  members.push(...teamProfiles
    .filter((member) => !displayedNames.has(member.name.trim().toLowerCase()))
    .map((member) => ({ ...member, name: displayName(member.name) })));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          </div>
          <div className="container relative mx-auto px-6 py-16 md:py-24">
            <p className="eyebrow">{t("The people behind Cyrech Tech")}</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-tight md:text-7xl">
              {t("Meet the Team Behind Our Work")}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("Our team brings together creativity, technology, strategy, and experience to transform ideas into practical digital solutions. Get to know the people working behind the scenes to help our clients achieve their goals.")}
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
                <p className="eyebrow">{t("Meet Our Team")}</p>
                <h2 className="mt-1 font-display text-2xl font-bold">{t("Creative minds. Practical delivery.")}</h2>
              </div>
            </div>
            <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <article key={member.id} className="surface-card-hover group flex h-full flex-col overflow-hidden">
                  <div className={`relative aspect-[4/3] overflow-hidden ${["Ebua Glenn", "Sufeu Tallla Grace", "Pieukam Ralf", "Monthe Christian", "Tarshi Williams", "Ndel Mike"].includes(member.name) ? "bg-white" : "bg-muted"}`}>
                      {!member.image && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 via-card to-muted">
                          <span className="font-display text-6xl font-bold text-primary/70">
                            {member.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("")}
                          </span>
                        </div>
                      )}
                      {member.image ? (
                        <img
                        src={member.image}
                        alt={t(member.name)}
                        loading="lazy"
                        className={`h-full w-full transition-transform duration-700 ${["Ebua Glenn", "Sufeu Tallla Grace", "Tarshi Williams", "Pieukam Ralf", "Monthe Christian", "Ndel Mike"].includes(member.name) ? "object-contain object-center" : "object-cover group-hover:scale-105"}`}
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : null}
                    {member.name !== "Tarshi Williams" && (
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
                    )}
                    <span className="absolute bottom-4 left-4 rounded-full border border-border/80 bg-background/85 px-3 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider backdrop-blur">
                      {t(member.role)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-2xl font-bold transition-colors group-hover:text-primary">{t(member.name)}</h3>
                    <p className="mt-1 text-sm font-medium text-primary">{t(member.role)}</p>
                    {member.secondaryRole && (
                      <p className="mt-1 text-sm font-medium text-primary">{t(member.secondaryRole)}</p>
                    )}
                    <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{t(member.description)}</p>
                    <div className="mt-5 border-t border-border pt-4">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t("Areas of expertise")}</p>
                      <p className="mt-2 text-sm leading-relaxed">{t(member.expertise)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-3xl border border-border bg-card p-7 md:flex-row md:items-center md:p-10">
              <div>
                <p className="eyebrow">{t("Have a project in mind?")}</p>
                <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">{t("Let’s build something meaningful.")}</h2>
              </div>
              <Link to="/services" className="btn-lime shrink-0">
                {t("Explore our services")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;
