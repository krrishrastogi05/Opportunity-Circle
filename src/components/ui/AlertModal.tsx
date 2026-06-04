"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { TriangleAlert, X, ArrowRight, Clock } from "lucide-react";

type Tone = "urgent" | "warning";

const TONES: Record<
  Tone,
  { ring: string; iconWrap: string; icon: string; chip: string; cta: string; grad: string; eyebrow: string }
> = {
  urgent: {
    ring: "bg-red-500/30",
    iconWrap: "bg-red-500/15 text-red-500",
    icon: "text-red-500",
    chip: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
    cta: "bg-red-500 hover:bg-red-600 text-white",
    grad: "from-red-500/20",
    eyebrow: "text-red-500",
  },
  warning: {
    ring: "bg-amber-500/30",
    iconWrap: "bg-amber-500/15 text-amber-500",
    icon: "text-amber-500",
    chip: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    cta: "bg-amber-500 hover:bg-amber-600 text-white",
    grad: "from-amber-500/20",
    eyebrow: "text-amber-500",
  },
};

/**
 * Dramatic, front-and-center alert popup for important notices.
 * Portals to <body> so it always centers on the viewport.
 * Shows once per browser (per `storageKey`).
 */
export function AlertModal({
  storageKey,
  eyebrow = "Important update",
  title,
  body,
  chip,
  ctaText = "View details",
  ctaHref,
  tone = "urgent",
  delayMs = 600,
  enabled = true,
}: {
  storageKey: string;
  eyebrow?: string;
  title: string;
  body: string;
  chip?: string;
  ctaText?: string;
  ctaHref?: string;
  tone?: Tone;
  delayMs?: number;
  enabled?: boolean;
}) {
  const [show, setShow] = useState(false);
  const t = TONES[tone];

  useEffect(() => {
    if (!enabled) return;
    if (localStorage.getItem(storageKey) === "1") return;
    const id = setTimeout(() => setShow(true), delayMs);
    return () => clearTimeout(id);
  }, [enabled, storageKey, delayMs]);

  function dismiss() {
    localStorage.setItem(storageKey, "1");
    setShow(false);
  }

  if (!show || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[130] flex items-center justify-center px-4">
      <div
        className="celebrate-backdrop absolute inset-0 bg-background/70 backdrop-blur-md"
        onClick={dismiss}
      />

      <div className="celebrate-pop relative z-10 w-full max-w-sm rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
        <div className={`absolute inset-x-0 -top-24 h-40 bg-gradient-to-b ${t.grad} to-transparent blur-2xl pointer-events-none`} />

        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-3 right-3 z-20 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative px-7 pt-8 pb-7 text-center">
          <div className="relative inline-flex items-center justify-center mb-5">
            <span className={`celebrate-ring absolute inset-0 rounded-full ${t.ring}`} />
            <span className={`relative inline-flex items-center justify-center w-14 h-14 rounded-full ${t.iconWrap}`}>
              <TriangleAlert className="h-7 w-7" />
            </span>
          </div>

          <p className={`text-[11px] font-semibold uppercase tracking-widest mb-2 ${t.eyebrow}`}>
            {eyebrow}
          </p>
          <h2 className="text-lg font-bold tracking-tight mb-2">{title}</h2>

          {chip && (
            <div className="flex justify-center mb-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${t.chip}`}>
                <Clock className="h-3.5 w-3.5" />
                {chip}
              </span>
            </div>
          )}

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {body}
          </p>

          {ctaHref ? (
            <Link
              href={ctaHref}
              onClick={dismiss}
              className={`inline-flex items-center justify-center gap-1.5 w-full px-5 py-3 rounded-xl text-sm font-semibold transition-colors ${t.cta}`}
            >
              {ctaText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <button
              onClick={dismiss}
              className={`inline-flex items-center justify-center gap-1.5 w-full px-5 py-3 rounded-xl text-sm font-semibold transition-colors ${t.cta}`}
            >
              Got it
            </button>
          )}
          {ctaHref && (
            <button
              onClick={dismiss}
              className="mt-2 text-xs text-muted-foreground/70 hover:text-foreground transition-colors"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
