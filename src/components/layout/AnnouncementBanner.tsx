"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Zap } from "lucide-react";
import { routeFromCategory } from "@/lib/opportunity-constants";
import { getRegStatus } from "@/lib/opportunity-status";

type TickerItem = {
  id: string;
  label: string;
  note: string; // countdown / status text
  urgent: boolean;
  ppi: boolean;
  href: string;
  sortKey: number;
};

/* ── Component ─────────────────────────────────────────────── */
interface ApiOpportunity {
  _id: string;
  title: string;
  slug: string;
  category: string;
  opensAt?: string;
  closesAt?: string;
  endsAt?: string;
  eventDate?: string;
  statusOverride?: string;
  recurringMonth?: string;
  isPPIOffering: boolean;
}

export function AnnouncementBanner({ onDismiss }: { onDismiss?: () => void }) {
  const [dismissed, setDismissed] = useState(false);
  const [, tick] = useState(0);
  const [active, setActive] = useState<TickerItem[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem("ticker-dismissed") === "1") setDismissed(true);
  }, []);

  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch("/api/opportunities")
      .then((r) => r.json())
      .then((data: ApiOpportunity[]) => {
        if (!Array.isArray(data)) return;
        const items: TickerItem[] = data
          .map((o) => {
            const status = getRegStatus(o);
            if (status === "ended") return null;
            let note = "";
            let urgent = false;
            let sortKey = Infinity;
            if (status === "registration_open" && o.closesAt) {
              const d = Math.ceil(
                (new Date(o.closesAt).getTime() - Date.now()) / 86_400_000
              );
              note = d <= 1 ? "Closing today" : `${d} days left`;
              urgent = d <= 7;
              sortKey = new Date(o.closesAt).getTime();
            } else if (status === "ongoing") {
              note = "Ongoing";
              sortKey = Date.now() + 1e10;
            } else if (status === "upcoming") {
              note = o.recurringMonth ? `Opens ${o.recurringMonth}` : "Opening soon";
              sortKey = Date.now() + 2e10;
            }
            return {
              id: o._id,
              label: o.title,
              note,
              urgent,
              ppi: o.isPPIOffering,
              href: `/opportunities/${routeFromCategory(o.category)}/${o.slug}`,
              sortKey,
            } as TickerItem;
          })
          .filter((x): x is TickerItem => x !== null)
          .sort((a, b) => a.sortKey - b.sortKey);
        setActive(items);
      })
      .catch(() => {});
  }, []);

  if (dismissed || active.length === 0) return null;

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
          {items.map((item, i) => (
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

              {/* Status / countdown */}
              {item.note && (
                <span
                  className={`font-bold text-[11px] ${
                    item.urgent ? "text-red-400" : "text-background/60"
                  }`}
                >
                  — {item.note}
                </span>
              )}
            </Link>
          ))}
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
