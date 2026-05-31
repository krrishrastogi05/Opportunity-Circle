"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { routeFromCategory } from "@/lib/opportunity-constants";
import { getCountdownParts, orgColor, orgMark } from "@/lib/opportunity-status";

export interface UrgentOpportunity {
  _id: string;
  title: string;
  slug: string;
  category: string;
  organizer?: string;
  closesAt: string;
  isPPIOffering: boolean;
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl sm:text-5xl font-black tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mt-1">
        {label}
      </span>
    </div>
  );
}

export function UrgentCountdown({ opp }: { opp: UrgentOpportunity | null }) {
  const [, tick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  if (!opp) return null;

  const { d, h, m, s } = getCountdownParts(opp.closesAt);
  const color = orgColor(opp.organizer);
  const mark = orgMark(opp.organizer);
  const href = `/opportunities/${routeFromCategory(opp.category)}/${opp.slug}`;

  return (
    <section className="w-full px-4 sm:px-6 pt-10">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-500/[0.06] to-transparent p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-5">
            <Zap className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-red-500">
              Closing Soon
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: color }}
              >
                <span
                  style={{
                    color: "#fff",
                    fontSize: mark.length > 2 ? 11 : 15,
                    fontWeight: 800,
                  }}
                >
                  {mark}
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold truncate">
                    {opp.title}
                  </h2>
                  {opp.isPPIOffering && (
                    <span className="px-2 py-0.5 rounded-full bg-foreground text-background text-[10px] font-semibold shrink-0">
                      PPI
                    </span>
                  )}
                </div>
                {opp.organizer && (
                  <p className="text-sm text-muted-foreground">
                    {opp.organizer}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <Unit value={d} label="days" />
              <span className="text-2xl sm:text-4xl font-black text-muted-foreground/30 pb-4">:</span>
              <Unit value={h} label="hrs" />
              <span className="text-2xl sm:text-4xl font-black text-muted-foreground/30 pb-4">:</span>
              <Unit value={m} label="min" />
              <span className="text-2xl sm:text-4xl font-black text-muted-foreground/30 pb-4">:</span>
              <Unit value={s} label="sec" />
            </div>
          </div>

          <Link
            href={href}
            className="mt-6 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
          >
            View details & apply
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
