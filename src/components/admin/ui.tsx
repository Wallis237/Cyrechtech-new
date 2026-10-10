import { ReactNode } from "react";

export const Field = ({
  label,
  value,
  onChange,
  textarea,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  textarea?: boolean;
  type?: string;
}) => (
  <div className="space-y-1.5">
    <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
      {label}
    </label>
    {textarea ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm"
      />
    )}
  </div>
);

export const AdminCard = ({ children }: { children: ReactNode }) => (
  <div className="surface-card p-5 space-y-4">{children}</div>
);

export const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="btn-lime !py-2 !px-5 text-sm disabled:opacity-50"
  >
    {children}
  </button>
);

export const GhostButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="text-xs font-mono uppercase tracking-widest px-3 py-2 rounded-lg border border-border hover:border-primary/50 transition-colors"
  >
    {children}
  </button>
);
