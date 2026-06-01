"use client";

import Link from "next/link";
import { Calendar, Trophy, Sparkles } from "lucide-react";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { routeFromCategory } from "@/lib/opportunity-constants";
import {
  orgColor,
  orgMark,
  fmtDate,
  getRegStatus,
  getBadges,
  showRegistrationCountdown,
  REG_STATUS_LABEL,
  REG_STATUS_CLASS,
} from "@/lib/opportunity-status";

export interface OpportunityCardData {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  organizer?: string;
  logoUrl?: string;
  isPPIOffering: boolean;
  isDiversity?: boolean;
  isFemaleOnly?: boolean;
  prizes?: string;
  stipend?: string;
  opensAt?: string;
  closesAt?: string;
  endsAt?: string;
  eventDate?: string;
  recurringMonth?: string;
  statusOverride?: string;
  featured?: boolean;
  tags?: string[];
}

export function OpportunityCard({ opp }: { opp: OpportunityCardData }) {
  const color = orgColor(opp.organizer);
  const mark = orgMark(opp.organizer);
  const status = getRegStatus(opp);
  const badges = getBadges(opp);
  const showCountdown = showRegistrationCountdown(opp);
  const href = `/opportunities/${routeFromCategory(opp.category)}/${opp.slug}`;

  return (
    <div
      className={`group relative rounded-2xl p-4 transition-all bg-card ${
        opp.featured
          ? "featured-card border border-primary/40"
          : "border border-border hover:border-foreground/20 hover:shadow-sm"
      }`}
    >
      <Link href={href} className="absolute inset-0 z-0" aria-label={opp.title}>
        <span className="sr-only">{opp.title}</span>
      </Link>

      {opp.featured && (
        <span className="absolute -top-2 left-4 z-20 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-wide shadow">
          <Sparkles className="w-2.5 h-2.5" /> Featured
        </span>
      )}

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
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span className="font-semibold text-sm text-foreground group-hover:underline underline-offset-2">
              {opp.title}
            </span>
            {/* status */}
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold border ${REG_STATUS_CLASS[status]}`}
            >
              {REG_STATUS_LABEL[status]}
            </span>
            {/* badges */}
            {badges.map((b) => (
              <span
                key={b.label}
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${b.className}`}
              >
                {b.label}
              </span>
            ))}
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
            {showCountdown && opp.closesAt && (
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Calendar className="w-3 h-3" />
                Closes {fmtDate(opp.closesAt)}
              </span>
            )}
            {!opp.closesAt && opp.recurringMonth && (
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Calendar className="w-3 h-3" />
                Usually opens {opp.recurringMonth}
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
