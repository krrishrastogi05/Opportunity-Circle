"use client";

import Link from "next/link";
import { CircleCheck, Calendar, Trophy } from "lucide-react";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { routeFromCategory } from "@/lib/opportunity-constants";
import { orgColor, orgMark, getStatus, fmtDate } from "@/lib/opportunity-status";

export interface OpportunityCardData {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  organizer?: string;
  logoUrl?: string;
  isPPIOffering: boolean;
  prizes?: string;
  stipend?: string;
  opensAt?: string;
  closesAt?: string;
  tags?: string[];
}

export function OpportunityCard({ opp }: { opp: OpportunityCardData }) {
  const color = orgColor(opp.organizer);
  const mark = orgMark(opp.organizer);
  const status = getStatus({ opensAt: opp.opensAt, closesAt: opp.closesAt });
  const href = `/opportunities/${routeFromCategory(opp.category)}/${opp.slug}`;

  return (
    <div className="group relative border border-border rounded-2xl p-4 hover:border-foreground/20 hover:shadow-sm transition-all bg-card">
      {/* Full-card click target (kept behind interactive elements) */}
      <Link href={href} className="absolute inset-0 z-0" aria-label={opp.title}>
        <span className="sr-only">{opp.title}</span>
      </Link>

      <div className="relative z-10 flex items-start gap-3 pointer-events-none">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: color }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: mark.length > 2 ? 10 : 13,
              fontWeight: 800,
              fontFamily: "sans-serif",
              letterSpacing: "-0.5px",
            }}
          >
            {mark}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-semibold text-sm text-foreground group-hover:underline underline-offset-2">
              {opp.title}
            </span>
            {opp.isPPIOffering && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-foreground text-background text-[10px] font-semibold">
                <CircleCheck className="w-2.5 h-2.5" /> PPI
              </span>
            )}
            {status === "live" && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Open
              </span>
            )}
            {status === "closing-soon" && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                Closing soon
              </span>
            )}
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {opp.description}
          </p>

          <div className="flex flex-wrap gap-3 mt-2">
            {(opp.prizes || opp.stipend) && (
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Trophy className="w-3 h-3" />
                {opp.prizes || opp.stipend}
              </span>
            )}
            {opp.closesAt && status !== "ended" && (
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Calendar className="w-3 h-3" />
                Closes {fmtDate(opp.closesAt)}
              </span>
            )}
          </div>
        </div>

        <div className="pointer-events-auto">
          <BookmarkButton opportunityId={opp._id} />
        </div>
      </div>
    </div>
  );
}
