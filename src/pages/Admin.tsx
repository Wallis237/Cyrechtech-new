import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, ArrowLeft, ShieldAlert } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useCollaborators, useGallery, useProjects, useServices, useSkills, useTeam } from "@/hooks/useContent";
import TableEditor from "@/components/admin/TableEditor";
import SettingsEditor from "@/components/admin/SettingsEditor";
import BookingRequests from "@/components/admin/BookingRequests";
import HiringApplications from "@/components/admin/HiringApplications";
import { AdminCard, Field, PrimaryButton } from "@/components/admin/ui";

const AuthPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="eyebrow">// Restricted</div>
        <h1 className="mt-3 font-display font-bold text-4xl tracking-tight">
          Admin <span className="accent-italic">Access</span>
        </h1>
        <form onSubmit={submit} className="surface-card p-6 mt-6 space-y-4">
          <Field label="Email" value={email} onChange={setEmail} type="email" />
          <Field label="Password" value={password} onChange={setPassword} type="password" />
          <PrimaryButton type="submit" disabled={busy}>
            Sign in
          </PrimaryButton>
          <p className="text-xs text-muted-foreground">
            Admin accounts are provisioned by an authorized site operator.
          </p>
        </form>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4" /> Back to site
        </Link>
      </div>
    </div>
  );
};

const tabs = ["Projects", "Gallery", "Services", "Team", "Collaborators", "Skills", "Bookings", "Applications", "Profile"] as const;
type Tab = (typeof tabs)[number];

const Admin = () => {
  const { session, isAdmin, loading } = useAdminAuth();
  const [tab, setTab] = useState<Tab>("Projects");
  const projects = useProjects();
  const gallery = useGallery();
  const services = useServices();
  const team = useTeam();
  const collaborators = useCollaborators();
  const skills = useSkills();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }

  if (!session) return <AuthPanel />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-md space-y-4">
          <ShieldAlert className="w-10 h-10 text-primary mx-auto" />
          <h1 className="font-display font-bold text-3xl">Not authorised</h1>
          <p className="text-muted-foreground">
            This account does not have admin privileges.
          </p>
          <button onClick={() => supabase.auth.signOut()} className="btn-ghost">
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <span className="font-display font-bold text-primary tracking-tight">CYRECH TECH · ADMIN</span>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary">
              View site
            </Link>
            <button
              onClick={() => supabase.auth.signOut()}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-6">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Projects" && (
          <TableEditor
            table="projects"
            queryKey="projects"
            titleKey="title"
            rows={(projects.data ?? []) as unknown as Record<string, unknown>[]}
            emptyRow={{ title: "New project", sort_order: (projects.data?.length ?? 0) + 1 }}
            fields={[
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "image", label: "Image", type: "image" },
              { key: "categories", label: "Categories", type: "csv" },
              { key: "tags", label: "Tags", type: "csv" },
              { key: "demo_link", label: "Demo link", type: "text" },
              { key: "github_link", label: "Code link", type: "text" },
              { key: "sort_order", label: "Order", type: "number" },
              { key: "featured", label: "Featured (wide card)", type: "bool" },
            ]}
          />
        )}

        {tab === "Gallery" && (
          <TableEditor
            table="gallery_items"
            queryKey="gallery_items"
            titleKey="title"
            rows={(gallery.data ?? []) as unknown as Record<string, unknown>[]}
            emptyRow={{ title: "New image", sort_order: (gallery.data?.length ?? 0) + 1 }}
            fields={[
              { key: "title", label: "Title", type: "text" },
              { key: "category", label: "Category", type: "text" },
              { key: "image", label: "Image", type: "image" },
              { key: "sort_order", label: "Order", type: "number" },
            ]}
          />
        )}

        {tab === "Services" && (
          <TableEditor
            table="services"
            queryKey="services"
            titleKey="title"
            rows={(services.data ?? []) as unknown as Record<string, unknown>[]}
            emptyRow={{ title: "New service", num: "0", sort_order: (services.data?.length ?? 0) + 1 }}
            fields={[
              { key: "num", label: "Number", type: "text" },
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "sort_order", label: "Order", type: "number" },
            ]}
          />
        )}

        {tab === "Bookings" && <BookingRequests />}
        {tab === "Applications" && <HiringApplications />}

        {tab === "Team" && (
          <TableEditor
            table="team_members"
            queryKey="team_members"
            titleKey="name"
            rows={(team.data ?? []) as unknown as Record<string, unknown>[]}
            emptyRow={{ name: "New team member", role: "Role", description: "", image: "", sort_order: (team.data?.length ?? 0) + 1 }}
            fields={[
              { key: "name", label: "Full name", type: "text" },
              { key: "role", label: "Position / title", type: "text" },
              { key: "description", label: "Biography", type: "textarea" },
              { key: "image", label: "Professional photo", type: "image" },
              { key: "sort_order", label: "Order", type: "number" },
            ]}
          />
        )}

        {tab === "Collaborators" && (
          <TableEditor
            table="collaborators"
            queryKey="collaborators"
            titleKey="name"
            rows={(collaborators.data ?? []) as unknown as Record<string, unknown>[]}
            emptyRow={{ name: "New collaborator", occupation: "", country: "", biography: "", image: "", profile_url: "", sort_order: (collaborators.data?.length ?? 0) + 1 }}
            fields={[
              { key: "name", label: "Full name", type: "text" },
              { key: "occupation", label: "Occupation", type: "text" },
              { key: "country", label: "Country", type: "text" },
              { key: "biography", label: "Profile / biography", type: "textarea" },
              { key: "image", label: "Profile photo", type: "image" },
              { key: "profile_url", label: "Website or profile link", type: "text" },
              { key: "sort_order", label: "Order", type: "number" },
            ]}
          />
        )}

        {tab === "Skills" && (
          <TableEditor
            table="skills"
            queryKey="skills"
            titleKey="name"
            rows={(skills.data ?? []) as unknown as Record<string, unknown>[]}
            emptyRow={{ name: "New skill", level: 80, sort_order: (skills.data?.length ?? 0) + 1 }}
            fields={[
              { key: "name", label: "Name", type: "text" },
              { key: "icon", label: "Icon (emoji or text)", type: "text" },
              { key: "level", label: "Level (0-100)", type: "number" },
              { key: "sort_order", label: "Order", type: "number" },
            ]}
          />
        )}

        {tab === "Profile" && <SettingsEditor />}
      </main>
    </div>
  );
};

export default Admin;
