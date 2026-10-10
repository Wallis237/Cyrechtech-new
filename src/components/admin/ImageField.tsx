import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload } from "lucide-react";

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

interface ImageFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

const ImageField = ({ value, onChange, label = "Image" }: ImageFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("site-images")
        .upload(path, file, { upsert: false, contentType: file.type });
      if (upErr) throw upErr;
      const { data, error: signErr } = await supabase.storage
        .from("site-images")
        .createSignedUrl(path, TEN_YEARS);
      if (signErr) throw signErr;
      onChange(data.signedUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <div className="flex gap-3 items-start">
        {value ? (
          <img
            src={value}
            alt="Preview"
            className="w-20 h-20 rounded-lg object-cover border border-border shrink-0"
          />
        ) : (
          <div className="w-20 h-20 rounded-lg border border-dashed border-border shrink-0" />
        )}
        <div className="flex-1 space-y-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image URL or upload"
            className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest px-3 py-2 rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
            Upload
          </button>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
          e.target.value = "";
        }}
      />
    </div>
  );
};

export default ImageField;
