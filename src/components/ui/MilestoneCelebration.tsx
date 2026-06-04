"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PartyPopper, X, ArrowRight } from "lucide-react";

const CONFETTI_COLORS = [
  "#f59e0b",
  "#34d399",
  "#60a5fa",
  "#f472b6",
  "#a78bfa",
  "#fbbf24",
  "#fb7185",
];

interface MilestoneCelebrationProps {
  /** The big number to celebrate. */
  count: number;
  /** What the number counts, e.g. "students already on board". */
  unit?: string;
  /** Eyebrow above the number. */
  eyebrow?: string;
  /** Headline below the number. */
  title?: string;
  /** Supporting line. */
  message?: string;
  ctaText?: string;
  ctaHref?: string;
  /**
   * If set, the celebration shows only once per browser (stored in
   * localStorage under this key). Omit to show every time.
   */
  storageKey?: string;
  /** Delay before it appears (ms). */
  delayMs?: number;
  /** Auto-dismiss after this many ms (0 = never). */
  autoDismissMs?: number;
  /** Render condition gate — if false, never shows. */
  enabled?: boolean;
}

export function MilestoneCelebration({
  count,
  unit = "members already on board",
  eyebrow = "Milestone unlocked",
  title = "We just crossed a big one.",
  message = "Join the community and never miss an opportunity again.",
  ctaText = "Join them — it's free",
  ctaHref = "/auth/signin",
  storageKey,
  delayMs = 700,
  autoDismissMs = 0,
  enabled = true,
}: MilestoneCelebrationProps) {
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(0);
  const confetti = useRef(
    Array.from({ length: 70 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      dx: `${(Math.random() - 0.5) * 120}px`,
      dur: `${2.6 + Math.random() * 2.4}s`,
      delay: `${Math.random() * 0.8}s`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      w: 6 + Math.random() * 6,
      h: 10 + Math.random() * 8,
    }))
  );

  // Decide whether to show (respect once-per-browser storage).
  useEffect(() => {
    if (!enabled) return;
    if (storageKey && localStorage.getItem(storageKey) === "1") return;
    const t = setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(t);
  }, [enabled, storageKey, delayMs]);

  // Count-up animation when it becomes visible.
  useEffect(() => {
    if (!visible) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setDisplay(Math.round(eased * count));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, count]);

  // Optional auto-dismiss.
  useEffect(() => {
    if (!visible || !autoDismissMs) return;
    const t = setTimeout(() => dismiss(), autoDismissMs);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, autoDismissMs]);

  function dismiss() {
    if (storageKey) localStorage.setItem(storageKey, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="celebrate-backdrop absolute inset-0 bg-background/70 backdrop-blur-md"
        onClick={dismiss}
      />

      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confetti.current.map((c) => (
          <span
            key={c.id}
            className="confetti-piece"
            style={
              {
                left: `${c.left}%`,
                backgroundColor: c.color,
                width: c.w,
                height: c.h,
                "--dx": c.dx,
                "--dur": c.dur,
                "--delay": c.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Card */}
      <div className="celebrate-pop relative z-10 w-full max-w-sm rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Top gradient sheen */}
        <div className="absolute inset-x-0 -top-24 h-40 bg-gradient-to-b from-primary/20 to-transparent blur-2xl pointer-events-none" />

        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-3 right-3 z-20 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative px-7 pt-8 pb-7 text-center">
          {/* Icon with pulsing rings */}
          <div className="relative inline-flex items-center justify-center mb-5">
            <span className="celebrate-ring absolute inset-0 rounded-full bg-primary/30" />
            <span className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/15 text-primary">
              <PartyPopper className="h-7 w-7" />
            </span>
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-3">
            {eyebrow}
          </p>

          <div className="flex items-end justify-center gap-1.5 mb-1">
            <span className="text-6xl font-black tabular-nums leading-none bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
              {display.toLocaleString()}
            </span>
            <span className="text-2xl font-black text-primary pb-1">+</span>
          </div>
          <p className="text-sm text-muted-foreground mb-5">{unit}</p>

          <h2 className="text-lg font-bold tracking-tight mb-1.5">{title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {message}
          </p>

          {ctaHref && (
            <Link
              href={ctaHref}
              onClick={dismiss}
              className="inline-flex items-center justify-center gap-1.5 w-full px-5 py-3 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {ctaText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          <button
            onClick={dismiss}
            className="mt-2 text-xs text-muted-foreground/70 hover:text-foreground transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
