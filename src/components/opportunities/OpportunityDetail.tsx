"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  CircleCheck,
  Calendar,
  Trophy,
  Building2,
  Globe,
  BookOpen,
  CalendarDays,
  Zap,
  ChevronLeft,
} from "lucide-react";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { categoryLabel, routeFromCategory } from "@/lib/opportunity-constants";
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

interface Round {
  name: string;
  description: string;
  timeline?: string;
}
interface Step {
  step: number;
  title: string;
  description: string;
}
interface TimelinePhase {
  phase: string;
  period: string;
  description: string;
}

export interface OpportunityDetailData {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  longDescription?: string;
  organizer?: string;
  companySlug?: string;
  companyUrl?: string;
  eligibility?: string;
  applicationUrl?: string;
  logoUrl?: string;
  opensAt?: string;
  closesAt?: string;
  endsAt?: string;
  eventDate?: string;
  recurringMonth?: string;
  statusOverride?: string;
  isPPIOffering: boolean;
  ppiDetails?: string;
  isDiversity?: boolean;
  isFemaleOnly?: boolean;
  prizes?: string;
  stipend?: string;
  rounds: Round[];
  steps: Step[];
  timeline: TimelinePhase[];
  tips: string[];
  tags: string[];
}

export function OpportunityDetail({ opp }: { opp: OpportunityDetailData }) {
  const hasOpenSource =
    opp.steps.length > 0 || opp.timeline.length > 0 || opp.tips.length > 0;
  const [tab, setTab] = useState<"steps" | "timeline" | "tips">(
    opp.steps.length ? "steps" : opp.timeline.length ? "timeline" : "tips"
  );

  const color = orgColor(opp.organizer);
  const mark = orgMark(opp.organizer);
  const status = getRegStatus(opp);
  const badges = getBadges(opp);
  const showCountdown = showRegistrationCountdown(opp);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-24">
      <Link
        href={`/opportunities/${routeFromCategory(opp.category)}`}
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        {categoryLabel(opp.category)}
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: color }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: mark.length > 2 ? 13 : 18,
              fontWeight: 800,
            }}
          >
            {mark}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight">{opp.title}</h1>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${REG_STATUS_CLASS[status]}`}
            >
              {REG_STATUS_LABEL[status]}
            </span>
            {badges.map((b) => (
              <span
                key={b.label}
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${b.className}`}
              >
                {b.label}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {opp.organizer} · {categoryLabel(opp.category)}
          </p>
        </div>
        <BookmarkButton opportunityId={opp._id} size="md" />
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-4 mb-6 text-xs text-muted-foreground">
        {showCountdown && opp.closesAt && (
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Registration closes {fmtDate(opp.closesAt)}
          </span>
        )}
        {!showCountdown && opp.endsAt && status === "ongoing" && (
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Runs until {fmtDate(opp.endsAt)}
          </span>
        )}
        {opp.recurringMonth && !opp.closesAt && (
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Usually opens {opp.recurringMonth}
          </span>
        )}
        {(opp.prizes || opp.stipend) && (
          <span className="flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" />
            {opp.prizes || opp.stipend}
          </span>
        )}
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {opp.applicationUrl && (
          <a
            href={opp.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            Apply Now <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
        {opp.companySlug && (
          <Link
            href={`/companies/${opp.companySlug}`}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Building2 className="w-3.5 h-3.5" />
            Company Profile
          </Link>
        )}
        {opp.companyUrl && (
          <a
            href={opp.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            Website
          </a>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-foreground/80 leading-relaxed mb-6">
        {opp.description}
      </p>
      {opp.longDescription && (
        <div className="space-y-3 mb-8">
          {opp.longDescription.split("\n").filter(Boolean).map((para, i) => (
            <p key={i} className="text-sm text-muted-foreground leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      )}

      {/* PPI details */}
      {opp.ppiDetails && (
        <div className="mb-8 rounded-xl px-4 py-3 bg-foreground/5 border border-foreground/10">
          <p className="font-semibold text-foreground text-xs mb-1">
            PPI / Fast-track Details
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {opp.ppiDetails}
          </p>
        </div>
      )}

      {/* Tags */}
      {opp.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-8">
          {opp.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-lg border border-border text-[10px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Rounds (hiring/hackathon) */}
      {opp.rounds.length > 0 && (
        <section className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Rounds
          </p>
          <div className="space-y-0">
            {opp.rounds.map((r, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  {i < opp.rounds.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-1 mb-1" />
                  )}
                </div>
                <div className="pb-5">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-foreground">
                      {r.name}
                    </p>
                    {r.timeline && (
                      <span className="px-2 py-0.5 rounded-full border border-border text-[10px] text-muted-foreground">
                        {r.timeline}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {r.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Open source tabs */}
      {hasOpenSource && (
        <section className="mb-8">
          <div className="flex gap-1 border-b border-border mb-4">
            {(
              [
                { key: "steps", label: "How to Apply", icon: BookOpen, show: opp.steps.length > 0 },
                { key: "timeline", label: "Timeline", icon: CalendarDays, show: opp.timeline.length > 0 },
                { key: "tips", label: "Pro Tips", icon: Zap, show: opp.tips.length > 0 },
              ] as { key: "steps" | "timeline" | "tips"; label: string; icon: React.ElementType; show: boolean }[]
            )
              .filter((t) => t.show)
              .map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                    tab === key
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </button>
              ))}
          </div>

          {tab === "steps" && (
            <div className="space-y-0">
              {opp.steps.map((s, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    {i < opp.steps.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-1 mb-1" />
                    )}
                  </div>
                  <div className="pb-5">
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {s.title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "timeline" && (
            <div className="space-y-2">
              {opp.timeline.map((t, i) => (
                <div
                  key={i}
                  className="flex gap-3 py-2.5 border-b border-border last:border-0"
                >
                  <div className="w-5 h-5 rounded-full bg-foreground/10 text-foreground text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {t.phase}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {t.period}
                      </span>
                    </div>
                    {t.description && (
                      <p className="text-[11px] text-muted-foreground/70 mt-0.5 italic">
                        {t.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "tips" && (
            <ul className="space-y-3">
              {opp.tips.map((tip, i) => (
                <li key={i} className="flex gap-2.5">
                  <CircleCheck className="w-4 h-4 shrink-0 mt-0.5 text-green-500" />
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    {tip}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Eligibility */}
      {opp.eligibility && (
        <section className="border-t border-border pt-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            Eligibility
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {opp.eligibility}
          </p>
        </section>
      )}
    </div>
  );
}
