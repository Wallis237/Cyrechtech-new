import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, Mail, Phone, RefreshCw, UserRound } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { AdminCard } from "./ui";

type BookingRequest = Tables<"booking_requests">;
type BookingStatus = "new" | "in_review" | "contacted" | "closed";

const statuses: { value: BookingStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "in_review", label: "In review" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
];

const BookingRequests = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["booking_requests"],
    queryFn: async (): Promise<BookingRequest[]> => {
      const { data: rows, error: queryError } = await supabase
        .from("booking_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (queryError) throw queryError;
      return rows;
    },
  });

  useEffect(() => {
    if (error) toast.error(`Could not load booking requests: ${error.message}`);
  }, [error]);

  const updateStatus = async (id: string, status: BookingStatus) => {
    const { error: updateError } = await supabase
      .from("booking_requests")
      .update({ status })
      .eq("id", id);
    if (updateError) {
      toast.error(`Could not update booking status: ${updateError.message}`);
      return;
    }
    toast.success("Booking status updated");
    await queryClient.invalidateQueries({ queryKey: ["booking_requests"] });
  };

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading booking requests…</p>;
  if (error) {
    return (
      <div className="surface-card flex flex-wrap items-center justify-between gap-4 p-6">
        <p className="text-sm text-destructive">Unable to load booking requests: {error.message}</p>
        <button type="button" className="btn-ghost" onClick={() => void refetch()}>
          <RefreshCw className="h-4 w-4" /> Retry
        </button>
      </div>
    );
  }
  if (!data?.length) {
    return <p className="surface-card p-6 text-sm text-muted-foreground">No booking requests have been submitted yet.</p>;
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">{data.length} booking request{data.length === 1 ? "" : "s"}</p>
      {data.map((booking) => (
        <AdminCard key={booking.id}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary">{booking.service_title}</p>
              <h2 className="mt-2 font-display text-xl font-bold">{booking.project_title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{booking.project_description}</p>
            </div>
            <label className="shrink-0 text-xs text-muted-foreground">
              Status
              <select
                value={booking.status}
                onChange={(event) => void updateStatus(booking.id, event.target.value as BookingStatus)}
                className="mt-1 block rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
              >
                {statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
              </select>
            </label>
          </div>

          <div className="mt-5 grid gap-3 border-t border-border pt-5 text-sm sm:grid-cols-2">
            <Detail icon={UserRound} label="Client" value={`${booking.full_name}${booking.company_name ? ` · ${booking.company_name}` : ""}`} />
            <Detail icon={CalendarDays} label="Preferred date" value={booking.preferred_date} />
            <Detail icon={Mail} label="Email" value={booking.email} href={`mailto:${booking.email}`} />
            <Detail icon={Phone} label={`Phone · ${booking.preferred_contact_method}`} value={booking.phone} href={`tel:${booking.phone}`} />
            <Detail label="Location" value={`${booking.city}, ${booking.country}`} />
            <Detail label="Budget · Timeline" value={`${booking.estimated_budget || "Not specified"} · ${booking.project_timeline}`} />
            <Detail label="Objectives" value={booking.objectives} />
            <Detail label="Requirements" value={booking.requirements || "Not specified"} />
            <Detail label="Additional information" value={booking.additional_information || "Not specified"} />
            <Detail label="Language · Submitted" value={`${booking.language.toUpperCase()} · ${new Date(booking.created_at).toLocaleString()}`} />
          </div>
        </AdminCard>
      ))}
    </div>
  );
};

const Detail = ({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon?: typeof UserRound;
  label: string;
  value: string;
  href?: string;
}) => (
  <div className="min-w-0">
    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}{label}
    </span>
    {href
      ? <a href={href} className="mt-1 block break-words hover:text-primary">{value}</a>
      : <p className="mt-1 break-words">{value}</p>}
  </div>
);

export default BookingRequests;
