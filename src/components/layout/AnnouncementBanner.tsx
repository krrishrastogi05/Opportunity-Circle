"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Zap } from "lucide-react";

/* ── Ticker items ──────────────────────────────────────────── */
const ITEMS = [
  { id: "gs",      label: "Goldman Sachs India Hackathon", closesAt: "2026-06-05", ppi: true,  href: "/opportunities" },
  { id: "hackon",  label: "HackOn with Amazon",            closesAt: "2026-06-10", ppi: true,  href: "/opportunities" },
  { id: "lfx",     label: "LFX Mentorship — Summer Term",  closesAt: "2026-06-15", ppi: false, href: "/open-source/lfx" },
  { id: "gssoc",   label: "GSSoC Contribution Period",     closesAt: "2026-07-31", ppi: false, href: "/open-source/gssoc" },
  { id: "grid",    label: "Flipkart GRiD 7.0",             closesAt: "2026-07-25", ppi: true,  href: "/opportunities" },
  { id: "gsoc",    label: "GSoC Coding Period",            closesAt: "2026-09-08", ppi: false, href: "/open-source/gsoc" },
  { id: "mlh",     label: "MLH Fellowship",                closesAt: null,         ppi: false, href: "/open-source/mlh-fellowship" },
  { id: "out",     label: "Outreachy — December Cohort",   closesAt: "2026-09-20", ppi: false, href: "/open-source/outreachy" },
];

function countdown(dateStr: string | null): string {
  if (!dateStr) return "Rolling";
  const d = Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86_400_000);
  if (d <= 0)  return "Closed";
  if (d === 1) return "1 day left";
  return `${d} days left`;
}

/* ── Component ─────────────────────────────────────────────── */
export function AnnouncementBanner({ onDismiss }: { onDismiss?: () => void }) {
  const [dismissed, setDismissed] = useState(false);
  const [, tick] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("ticker-dismissed") === "1") setDismissed(true);
  }, []);

  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  if (dismissed) return null;

  // Filter out closed items
  const active = ITEMS.filter((i) => {
    if (!i.closesAt) return true;
    return new Date(i.closesAt).getTime() > Date.now();
  });

  // Duplicate for seamless infinite scroll
  const items = [...active, ...active];

  function dismiss() {
    setDismissed(true);
    sessionStorage.setItem("ticker-dismissed", "1");
    onDismiss?.();
  }

  return (
    <div className="relative z-50 w-full flex items-center bg-foreground text-background h-9 overflow-hidden select-none">

      {/* ── Fixed LEFT label ── */}
      <div className="shrink-0 flex items-center gap-1.5 px-3 h-full bg-primary text-primary-foreground z-10">
        <Zap className="w-3 h-3" />
        <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Live</span>
      </div>

      {/* ── Scrolling ticker ── */}
      <div className="flex-1 overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-foreground to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-foreground to-transparent z-10 pointer-events-none" />

        <div
          className="flex items-center whitespace-nowrap"
          style={{
            animation: "ticker-scroll 40s linear infinite",
            width: "max-content",
          }}
        >
          {items.map((item, i) => {
            const cd = countdown(item.closesAt);
            const isUrgent = item.closesAt
              ? Math.ceil((new Date(item.closesAt).getTime() - Date.now()) / 86_400_000) <= 7
              : false;

            return (
              <Link
                key={`${item.id}-${i}`}
                href={item.href}
                className="inline-flex items-center gap-2 px-5 text-xs hover:opacity-70 transition-opacity"
              >
                {/* Separator dot */}
                <span className="text-background/30 text-base leading-none">·</span>

                {/* Name */}
                <span className="font-semibold text-background">{item.label}</span>

                {/* PPI */}
                {item.ppi && (
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-primary text-primary-foreground">
                    ⚡ PPI
                  </span>
                )}

                {/* Countdown */}
                <span
                  className={`font-bold text-[11px] ${
                    isUrgent ? "text-red-400" : "text-background/60"
                  }`}
                >
                  — {cd}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Fixed RIGHT dismiss ── */}
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="shrink-0 px-2 h-full flex items-center text-background/50 hover:text-background transition-colors z-10"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* ── Keyframe injection ── */}
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
