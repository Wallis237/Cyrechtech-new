import { useEffect, useLayoutEffect, useState } from "react";

const SiteIntro = () => {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useLayoutEffect(() => {
    document.getElementById("initial-site-loader")?.remove();
  }, []);

  useEffect(() => {
    const exitTimeout = window.setTimeout(() => setExiting(true), 1650);
    const removeTimeout = window.setTimeout(() => setVisible(false), 2000);
    return () => {
      window.clearTimeout(exitTimeout);
      window.clearTimeout(removeTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`site-intro fixed inset-0 z-[100] flex items-center justify-center bg-background${exiting ? " site-intro-exit" : ""}`} role="status" aria-label="Cyrech Tech page loading">
      <div className="flex w-full max-w-2xl flex-col items-center px-6">
        <div className="intro-scene relative flex h-40 w-full items-center justify-center sm:h-56" aria-hidden="true">
          <div className="intro-device-left intro-laptop-left absolute rounded-xl border border-primary/40 bg-card p-2 shadow-[0_0_50px_hsl(var(--primary)/0.14)]">
            <div className="flex h-full items-center justify-center rounded-lg border border-border bg-background">
              <span className="font-display text-2xl font-bold text-primary sm:text-4xl">C</span>
            </div>
            <div className="mx-auto mt-1 h-1 w-1/3 rounded-full bg-muted-foreground/40" />
          </div>
          <div className="intro-device-right intro-laptop-right absolute rounded-xl border border-primary/40 bg-card p-2 shadow-[0_0_50px_hsl(var(--primary)/0.14)]">
            <div className="flex h-full items-center justify-center rounded-lg border border-border bg-background">
              <span className="font-display text-2xl font-bold text-primary sm:text-4xl">T</span>
            </div>
            <div className="mx-auto mt-1 h-1 w-1/3 rounded-full bg-muted-foreground/40" />
          </div>
          <div className="intro-spinning-person absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/40 bg-background/95 text-primary shadow-[0_0_28px_hsl(var(--primary)/0.35)] sm:h-14 sm:w-14">
            <span className="intro-person-figure relative block h-9 w-7" aria-hidden="true">
              <span className="intro-person-head absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary" />
              <span className="intro-person-body absolute left-1/2 top-3 h-3.5 w-2.5 -translate-x-1/2 rounded-full bg-primary" />
              <span className="intro-person-arm intro-person-arm-left absolute left-[3px] top-3.5 h-1 w-3 rounded-full bg-primary" />
              <span className="intro-person-arm intro-person-arm-right absolute right-[3px] top-3.5 h-1 w-3 rounded-full bg-primary" />
              <span className="intro-person-leg intro-person-leg-left absolute left-[8px] top-6 h-3 w-1 rounded-full bg-primary" />
              <span className="intro-person-leg intro-person-leg-right absolute right-[8px] top-6 h-3 w-1 rounded-full bg-primary" />
            </span>
          </div>
          <div className="intro-chat intro-chat-left absolute left-1/2 top-0 -translate-x-[115%] rounded-2xl rounded-br-sm border border-primary/30 bg-card px-3 py-2 shadow-lg sm:top-2" aria-hidden="true">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-.2s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-.1s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
            </span>
          </div>
          <div className="intro-chat intro-chat-right absolute left-1/2 top-9 translate-x-[15%] rounded-2xl rounded-bl-sm border border-border bg-muted px-3 py-2 shadow-lg sm:top-12" aria-hidden="true">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-.2s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-.1s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
            </span>
          </div>
        </div>
        <div className="intro-brand mt-4 flex items-center gap-3">
          <img
            src="/lovable-uploads/logo.jpg"
            alt=""
            className="h-10 w-10 rounded-xl border border-border object-contain"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
          <span className="font-display text-xl font-bold uppercase tracking-tight">Cyrech Tech</span>
        </div>
        <div className="relative mt-4 h-8 w-full overflow-visible text-center" aria-hidden="true">
          <p className="intro-popping-text intro-message-one absolute inset-x-0 text-sm font-semibold text-primary sm:text-base">
            Welcome to Cyrech Tech
          </p>
          <p className="intro-popping-text intro-message-two absolute inset-x-0 text-xs font-medium text-foreground sm:text-sm">
            Beautiful digital experiences, designed around you.
          </p>
          <p className="intro-popping-text intro-message-three absolute inset-x-0 text-xs font-medium text-muted-foreground sm:text-sm">
            Creative minds. Reliable technology. Ideas made real.
          </p>
        </div>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">Loading</p>
      </div>
    </div>
  );
};

export default SiteIntro;
