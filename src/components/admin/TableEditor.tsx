import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import ImageField from "./ImageField";
import { AdminCard, Field, GhostButton, PrimaryButton } from "./ui";

export type FieldType = "text" | "textarea" | "number" | "image" | "csv" | "bool";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
}

interface TableEditorProps {
  table: string;
  queryKey: string;
  fields: FieldDef[];
  rows: Record<string, unknown>[];
  titleKey: string;
  emptyRow: Record<string, unknown>;
}

const TableEditor = ({ table, queryKey, fields, rows, titleKey, emptyRow }: TableEditorProps) => {
  const qc = useQueryClient();
  const [drafts, setDrafts] = useState<Record<string, Record<string, unknown>>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const draftFor = (row: Record<string, unknown>) =>
    drafts[row.id as string] ?? row;

  const setValue = (row: Record<string, unknown>, key: string, value: unknown) =>
    setDrafts((d) => ({
      ...d,
      [row.id as string]: { ...draftFor(row), [key]: value },
    }));

  const save = async (row: Record<string, unknown>) => {
    const id = row.id as string;
    const payload = { ...draftFor(row) };
    delete payload.id;
    delete payload.created_at;
    delete payload.updated_at;
    setSaving(id);
    const { error } = await supabase.from(table as never).update(payload as never).eq("id", id);
    setSaving(null);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setDrafts((d) => {
      const next = { ...d };
      delete next[id];
      return next;
    });
    void qc.invalidateQueries({ queryKey: [queryKey] });
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from(table as never).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    void qc.invalidateQueries({ queryKey: [queryKey] });
  };

  const [adding, setAdding] = useState(false);

  const add = async () => {
    setAdding(true);
    const { error } = await supabase.from(table as never).insert(emptyRow as never);
    setAdding(false);
    if (error) return toast.error(error.message);
    toast.success("Added — scroll down to edit it");
    void qc.invalidateQueries({ queryKey: [queryKey] });
  };

  const renderField = (row: Record<string, unknown>, f: FieldDef) => {
    const d = draftFor(row);
    const v = d[f.key];
    switch (f.type) {
      case "image":
        return (
          <ImageField
            key={f.key}
            label={f.label}
            value={(v as string) ?? ""}
            onChange={(url) => setValue(row, f.key, url)}
          />
        );
      case "csv":
        return (
          <Field
            key={f.key}
            label={`${f.label} (comma separated)`}
            value={Array.isArray(v) ? (v as string[]).join(", ") : ""}
            onChange={(val) =>
              setValue(
                row,
                f.key,
                val.split(",").map((s) => s.trim()).filter(Boolean)
              )
            }
          />
        );
      case "bool":
        return (
          <label key={f.key} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={Boolean(v)}
              onChange={(e) => setValue(row, f.key, e.target.checked)}
            />
            {f.label}
          </label>
        );
      case "number":
        return (
          <Field
            key={f.key}
            label={f.label}
            type="number"
            value={(v as number) ?? 0}
            onChange={(val) => setValue(row, f.key, Number(val))}
          />
        );
      default:
        return (
          <Field
            key={f.key}
            label={f.label}
            textarea={f.type === "textarea"}
            value={(v as string) ?? ""}
            onChange={(val) => setValue(row, f.key, val)}
          />
        );
    }
  };

  return (
    <div className="space-y-5">
      <PrimaryButton onClick={add} disabled={adding}>
        <Plus className="w-4 h-4" /> {adding ? "Adding…" : "Add new"}
      </PrimaryButton>

      {rows.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Nothing here yet — use “Add new” to create your first entry.
        </p>
      )}



      {rows.map((row) => (
        <AdminCard key={row.id as string}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display font-bold text-lg truncate">
              {(draftFor(row)[titleKey] as string) || "Untitled"}
            </h3>
            <button
              onClick={() => remove(row.id as string)}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors shrink-0"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">{fields.map((f) => renderField(row, f))}</div>
          <div className="flex gap-3">
            <PrimaryButton
              onClick={() => save(row)}
              disabled={saving === (row.id as string)}
            >
              Save
            </PrimaryButton>
            {drafts[row.id as string] && (
              <GhostButton
                onClick={() =>
                  setDrafts((d) => {
                    const next = { ...d };
                    delete next[row.id as string];
                    return next;
                  })
                }
              >
                Reset
              </GhostButton>
            )}
          </div>
        </AdminCard>
      ))}
    </div>
  );
};

export default TableEditor;
