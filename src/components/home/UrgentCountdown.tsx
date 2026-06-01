"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, ArrowRight, Sparkles } from "lucide-react";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { routeFromCategory } from "@/lib/opportunity-constants";
import { getCountdownParts } from "@/lib/opportunity-status";

export interface SpotlightOpportunity {
  _id: string;
  title: string;
  slug: string;
  category: string;
  organizer?: string;
  companySlug?: string;
  logoUrl?: string;
  description?: string;
  closesAt?: string;
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

/**
 * Home/hub spotlight. Smartly handles two cases:
 *  - countdown (registration open + deadline): live DD:HH:MM:SS, red accent
 *  - featured showcase (no live deadline): animated glow, amber accent
 * If an opportunity is both featured AND closing soon, it shows both.
 */
export function UrgentCountdown({
  opp,
  showCountdown = true,
  featured = false,
}: {
  opp: SpotlightOpportunity | null;
  showCountdown?: boolean;
  featured?: boolean;
}) {
  const [, tick] = useState(0);

  useEffect(() => {
    if (!showCountdown) return;
    const id = setInterval(() => tick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, [showCountdown]);

  if (!opp) return null;

  const counting = showCountdown && !!opp.closesAt;
  const parts = counting ? getCountdownParts(opp.closesAt!) : null;
  const href = `/opportunities/${routeFromCategory(opp.category)}/${opp.slug}`;

  // Accent: red when actively counting down, amber/primary when featured-only.
  const accent = counting
    ? {
        wrap: "border-red-500/30 bg-gradient-to-br from-red-500/[0.06] to-transparent",
        chipText: "text-red-500",
        cta: "bg-red-500 hover:bg-red-600 text-white",
        icon: Zap,
        label: "Closing Soon",
      }
    : {
        wrap: "featured-card border-primary/40 bg-gradient-to-br from-primary/[0.06] to-transparent",
        chipText: "text-primary",
        cta: "bg-primary hover:bg-primary/90 text-primary-foreground",
        icon: Sparkles,
        label: "Featured Opportunity",
      };
  const Icon = accent.icon;

  return (
    <section className="w-full px-4 sm:px-6 pt-10">
      <div className="max-w-3xl mx-auto">
        <div className={`relative rounded-3xl border p-6 sm:p-8 overflow-hidden ${accent.wrap}`}>
          <div className="flex items-center gap-2 mb-5">
            <Icon className={`w-4 h-4 ${accent.chipText}`} />
            <span className={`text-[10px] font-black uppercase tracking-widest ${accent.chipText}`}>
              {accent.label}
            </span>
            {featured && counting && (
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                · Featured
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <CompanyLogo
                name={opp.organizer}
                slug={opp.companySlug}
                logoUrl={opp.logoUrl}
                size={48}
                rounded="rounded-2xl"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
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
                  <p className="text-sm text-muted-foreground">{opp.organizer}</p>
                )}
                {!counting && opp.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 max-w-md">
                    {opp.description}
                  </p>
                )}
              </div>
            </div>

            {counting && parts && (
              <div className="flex items-center gap-3 sm:gap-4">
                <Unit value={parts.d} label="days" />
                <span className="text-2xl sm:text-4xl font-black text-muted-foreground/30 pb-4">:</span>
                <Unit value={parts.h} label="hrs" />
                <span className="text-2xl sm:text-4xl font-black text-muted-foreground/30 pb-4">:</span>
                <Unit value={parts.m} label="min" />
                <span className="text-2xl sm:text-4xl font-black text-muted-foreground/30 pb-4">:</span>
                <Unit value={parts.s} label="sec" />
              </div>
            )}
          </div>

          <Link
            href={href}
            className={`relative z-10 mt-6 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${accent.cta}`}
          >
            View details &amp; apply
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
