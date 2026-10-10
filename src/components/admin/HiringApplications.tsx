import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Mail, Phone, RefreshCw, UserRound } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { AdminCard } from "./ui";

type Application = Tables<"job_applications">;
type ApplicationStatus = "new" | "in_review" | "contacted" | "closed";
const statuses: { value: ApplicationStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "in_review", label: "In review" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
];

const HiringApplications = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["job_applications"],
    queryFn: async (): Promise<Application[]> => {
      const { data: rows, error: queryError } = await supabase
        .from("job_applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (queryError) throw queryError;
      return rows;
    },
  });

  useEffect(() => {
    if (error) toast.error(`Could not load job applications: ${error.message}`);
  }, [error]);

  const updateStatus = async (id: string, status: ApplicationStatus) => {
    const { error: updateError } = await supabase.from("job_applications").update({ status }).eq("id", id);
    if (updateError) {
      toast.error(`Could not update application status: ${updateError.message}`);
      return;
    }
    toast.success("Application status updated");
    await queryClient.invalidateQueries({ queryKey: ["job_applications"] });
  };

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading applications…</p>;
  if (error) {
    return (
      <div className="surface-card flex flex-wrap items-center justify-between gap-4 p-6">
        <p className="text-sm text-destructive">Unable to load applications: {error.message}</p>
        <button type="button" className="btn-ghost" onClick={() => void refetch()}>
          <RefreshCw className="h-4 w-4" /> Retry
        </button>
      </div>
    );
  }
  if (!data?.length) return <p className="surface-card p-6 text-sm text-muted-foreground">No applications have been submitted yet.</p>;

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">{data.length} application{data.length === 1 ? "" : "s"}</p>
      {data.map((application) => (
        <AdminCard key={application.id}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary">{application.service_title} · {application.opportunity_type}</p>
              <h2 className="mt-2 font-display text-xl font-bold">{application.full_name}</h2>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{application.message}</p>
            </div>
            <label className="shrink-0 text-xs text-muted-foreground">
              Status
              <select
                value={application.status}
                onChange={(event) => void updateStatus(application.id, event.target.value as ApplicationStatus)}
                className="mt-1 block rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
              >
                {statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
              </select>
            </label>
          </div>
          <div className="mt-5 grid gap-3 border-t border-border pt-5 text-sm sm:grid-cols-2">
            <Detail icon={UserRound} label="Location · Experience" value={`${application.location} · ${application.experience}`} />
            <Detail icon={Mail} label="Email" value={application.email} href={`mailto:${application.email}`} />
            <Detail icon={Phone} label="Phone" value={application.phone} href={`tel:${application.phone}`} />
            <Detail label="Availability" value={application.availability || "Not specified"} />
            <Detail label="Portfolio" value={application.portfolio_url || "Not provided"} href={application.portfolio_url || undefined} />
            <Detail label="Submitted" value={new Date(application.created_at).toLocaleString()} />
          </div>
        </AdminCard>
      ))}
    </div>
  );
};

const Detail = ({ icon: Icon, label, value, href }: { icon?: typeof UserRound; label: string; value: string; href?: string }) => (
  <div className="min-w-0">
    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}{label}
    </span>
    {href
      ? <a href={href} target={label === "Portfolio" ? "_blank" : undefined} rel={label === "Portfolio" ? "noopener noreferrer" : undefined} className="mt-1 block break-words hover:text-primary">{value}</a>
      : <p className="mt-1 break-words">{value}</p>}
  </div>
);

export default HiringApplications;
