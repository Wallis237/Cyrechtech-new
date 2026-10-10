import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSiteSettings, SiteSettingsRow } from "@/hooks/useContent";
import { AdminCard, Field, PrimaryButton } from "./ui";

const SettingsEditor = () => {
  const { data } = useSiteSettings();
  const qc = useQueryClient();
  const [form, setForm] = useState<SiteSettingsRow | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  if (!form) return <p className="text-muted-foreground">Loading…</p>;

  const set = (key: keyof SiteSettingsRow) => (v: string) =>
    setForm((f) => (f ? { ...f, [key]: v } : f));

  const save = async () => {
    setSaving(true);
    const { id, ...payload } = form;
    const { error } = await supabase
      .from("site_settings" as never)
      .update(payload as never)
      .eq("id", id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Settings saved");
    void qc.invalidateQueries({ queryKey: ["site_settings"] });
  };

  return (
    <AdminCard>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Hero title" value={form.hero_title} onChange={set("hero_title")} />
        <Field label="Contact email" value={form.contact_email} onChange={set("contact_email")} />
        <Field label="Hero subtitle" value={form.hero_subtitle} onChange={set("hero_subtitle")} textarea />
        <Field label="About text" value={form.about_text} onChange={set("about_text")} textarea />
        <Field label="Location" value={form.location} onChange={set("location")} />
        <Field label="LinkedIn URL" value={form.linkedin} onChange={set("linkedin")} />
        <Field label="GitHub URL" value={form.github} onChange={set("github")} />
        <Field label="Facebook URL" value={form.facebook} onChange={set("facebook")} />
        <Field label="Instagram URL" value={form.instagram} onChange={set("instagram")} />
      </div>
      <PrimaryButton onClick={save} disabled={saving}>
        Save settings
      </PrimaryButton>
    </AdminCard>
  );
};

export default SettingsEditor;
