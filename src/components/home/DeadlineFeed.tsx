"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink, ChevronRight, ArrowUpRight, Zap } from "lucide-react";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { routeFromCategory } from "@/lib/opportunity-constants";
import { getRegStatus } from "@/lib/opportunity-status";

type DeadlineEntry = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  organizer?: string;
  companySlug?: string;
  logoUrl?: string;
  applicationUrl?: string;
  opensAt?: string;
  closesAt?: string;
  endsAt?: string;
  statusOverride?: string;
  recurringMonth?: string;
  description: string;
  isPPIOffering: boolean;
};

type Status = "closing-soon" | "live" | "rolling" | "upcoming" | "ended";

function getStatus(e: DeadlineEntry): Status {
  const reg = getRegStatus(e);
  if (reg === "upcoming") return "upcoming";
  if (reg === "registration_open") {
    const closes = e.closesAt ? new Date(e.closesAt).getTime() : null;
    if (closes && (closes - Date.now()) / 86_400_000 <= 7) return "closing-soon";
    return "live";
  }
  if (reg === "ongoing") return "rolling"; // active, registration closed
  return "ended"; // registration_closed (no event window) or ended
}

function getCountdownParts(dateStr: string) {
  const diff = Math.max(0, new Date(dateStr).getTime() - Date.now());
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  return { d, h, m };
}

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const ORDER: Record<Status, number> = {
  "closing-soon": 0,
  live: 1,
  rolling: 2,
  upcoming: 3,
  ended: 4,
};

type Filter = "all" | "hackathon" | "open-source" | "program";

function CountdownBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center min-w-[32px]">
      <span className="text-xl sm:text-2xl font-black tabular-nums leading-none text-red-500">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[8px] uppercase tracking-widest text-red-400/70 font-semibold mt-0.5">
        {label}
      </span>
    </div>
  );
}

function getTypeLabel(category: string): string {
  if (category === "hiring_challenge") return "Hiring Challenge";
  if (category === "hackathon") return "Hackathon";
  if (category === "open_source") return "Open Source";
  if (category === "internship") return "Program";
  return "Opportunity";
}

function detailLink(entry: DeadlineEntry): string {
  return `/opportunities/${routeFromCategory(entry.category)}/${entry.slug}`;
}

export function DeadlineFeed({
  opportunities,
  excludeId,
}: {
  opportunities: DeadlineEntry[];
  excludeId?: string;
}) {
  const [, tick] = useState(0);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  const entries = opportunities
    .filter((d) => d._id !== excludeId)
    .map((d) => ({ ...d, status: getStatus(d) }))
    .filter((d) => {
      if (filter === "hackathon")
        return d.category === "hiring_challenge" || d.category === "hackathon";
      if (filter === "open-source") return d.category === "open_source";
      if (filter === "program") return d.category === "internship";
      return true;
    })
    .sort((a, b) => {
      if (ORDER[a.status] !== ORDER[b.status])
        return ORDER[a.status] - ORDER[b.status];
      if (a.closesAt && b.closesAt)
        return (
          new Date(a.closesAt).getTime() - new Date(b.closesAt).getTime()
        );
      return 0;
    });

  const urgentEntries = entries.filter((e) => e.status === "closing-soon");
  const liveCount = entries.filter((e) =>
    ["live", "closing-soon", "rolling"].includes(e.status)
  ).length;

  return (
    <section className="w-full py-14 sm:py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-muted-foreground mb-8 border-l-2 border-primary/40 pl-4 italic">
          {liveCount} opportunities are open right now. Are you applying?
        </p>

        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                Live updates
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-none">
              What&apos;s Open
              <br />
              <span className="text-muted-foreground font-light">
                Right Now
              </span>
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              <span className="font-semibold text-foreground">{liveCount}</span>{" "}
              active · sorted by urgency
            </p>
          </div>
          <Link
            href="/opportunities"
            className="shrink-0 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            View all <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {urgentEntries.length > 0 && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/[0.03] overflow-hidden">
            <div className="px-4 py-2 border-b border-red-500/20 flex items-center gap-2 bg-red-500/5">
              <Zap className="w-3.5 h-3.5 text-red-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-red-500">
                Closing Soon — Act Now
              </span>
            </div>
            <div className="divide-y divide-red-500/10">
              {urgentEntries.map((entry) => {
                const { d, h, m } = getCountdownParts(entry.closesAt!);
                return (
                  <div
                    key={entry._id}
                    className="px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
                  >
                    <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                      <CompanyLogo
                        name={entry.organizer}
                        slug={entry.companySlug}
                        logoUrl={entry.logoUrl}
                        size={40}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground">
                          {entry.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {entry.description}
                        </p>
                        {entry.isPPIOffering && (
                          <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                            PPI Available
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-13 sm:pl-0">
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <CountdownBlock label="days" value={d} />
                        <span className="text-red-400 font-black text-base sm:text-lg pb-1">
                          :
                        </span>
                        <CountdownBlock label="hrs" value={h} />
                        <span className="text-red-400 font-black text-base sm:text-lg pb-1">
                          :
                        </span>
                        <CountdownBlock label="min" value={m} />
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <Link
                          href={detailLink(entry)}
                          className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors whitespace-nowrap"
                        >
                          Details
                        </Link>
                        {entry.applicationUrl && (
                          <a
                            href={entry.applicationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-4 flex-wrap">
          {(
            [
              { key: "all", label: "All" },
              { key: "hackathon", label: "Hackathons & Hiring" },
              { key: "open-source", label: "Open Source" },
              { key: "program", label: "Programs" },
            ] as { key: Filter; label: string }[]
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150 ${
                filter === key
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-1.5">
          {entries
            .filter((e) => e.status !== "closing-soon")
            .map((entry) => {
              const daysClose = entry.closesAt
                ? Math.ceil(
                    (new Date(entry.closesAt).getTime() - Date.now()) /
                      86_400_000
                  )
                : null;
              const daysOpen = entry.opensAt
                ? Math.ceil(
                    (new Date(entry.opensAt).getTime() - Date.now()) /
                      86_400_000
                  )
                : null;

              const isLive = entry.status === "live";
              const isRolling = entry.status === "rolling";
              const isUpcoming = entry.status === "upcoming";
              const isEnded = entry.status === "ended";

              return (
                <div
                  key={entry._id}
                  className={`group relative flex items-center gap-3 px-3 sm:px-4 py-3 rounded-xl border transition-all duration-150 ${
                    isEnded
                      ? "opacity-40 border-border bg-transparent"
                      : "border-border hover:border-foreground/25 bg-card hover:shadow-sm"
                  }`}
                >
                  <div
                    className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-all ${
                      isLive
                        ? "bg-green-500"
                        : isRolling
                          ? "bg-blue-500"
                          : isUpcoming
                            ? "bg-yellow-500"
                            : "bg-transparent"
                    }`}
                  />

                  <div className="ml-1">
                    <CompanyLogo
                      name={entry.organizer}
                      slug={entry.companySlug}
                      logoUrl={entry.logoUrl}
                      size={32}
                      rounded="rounded-lg"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-sm font-semibold text-foreground">
                        {entry.title}
                      </span>
                      {isLive && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          Open
                        </span>
                      )}
                      {isRolling && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                          {entry.endsAt ? "Ongoing" : "Rolling"}
                        </span>
                      )}
                      {isUpcoming && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">
                          Opens in {daysOpen}d
                        </span>
                      )}
                      {isEnded && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium border border-border text-muted-foreground">
                          Ended
                        </span>
                      )}
                      {entry.isPPIOffering && !isEnded && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                          PPI
                        </span>
                      )}
                      <span className="hidden sm:inline px-1.5 py-0.5 rounded-md text-[10px] border border-border text-muted-foreground">
                        {getTypeLabel(entry.category)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      {isLive && entry.closesAt && daysClose !== null && (
                        <span className="text-xs text-muted-foreground">
                          Closes{" "}
                          <span className="font-semibold text-foreground">
                            {fmt(entry.closesAt)}
                          </span>
                          <span className="text-muted-foreground/60 ml-1">
                            · {daysClose}d left
                          </span>
                        </span>
                      )}
                      {isRolling && (
                        <span className="text-xs text-muted-foreground">
                          {entry.endsAt
                            ? `Registration closed · runs until ${fmt(entry.endsAt)}`
                            : "No hard deadline"}
                        </span>
                      )}
                      {isUpcoming && entry.opensAt && (
                        <span className="text-xs text-muted-foreground">
                          Opens{" "}
                          <span className="font-semibold text-foreground">
                            {fmt(entry.opensAt)}
                          </span>
                        </span>
                      )}
                      {isEnded && entry.closesAt && (
                        <span className="text-xs text-muted-foreground">
                          Closed {fmt(entry.closesAt)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <Link
                      href={detailLink(entry)}
                      className="inline-flex items-center gap-0.5 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-semibold bg-foreground text-background hover:opacity-80 transition-opacity"
                    >
                      <span className="hidden sm:inline">Details</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                    {entry.applicationUrl && (
                      <a
                        href={entry.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <BookmarkButton opportunityId={entry._id} />
                  </div>
                </div>
              );
            })}
        </div>

        <div className="mt-6 pt-5 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-[10px] text-muted-foreground/50">
            Dates verified each season. Always check official platforms before
            applying.
          </p>
          <Link
            href="/opportunities"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-medium whitespace-nowrap"
          >
            All opportunities <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
