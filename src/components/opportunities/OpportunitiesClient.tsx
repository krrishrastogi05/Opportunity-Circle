"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  ChevronDown,
  Trophy,
  Users,
  User,
  CircleCheck,
  CircleX,
  Calendar,
} from "lucide-react";

type Round = {
  name: string;
  description: string;
  timeline?: string;
};

type Opportunity = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  organizer?: string;
  companySlug?: string;
  eligibility?: string;
  applicationUrl?: string;
  isPPIOffering: boolean;
  ppiDetails?: string;
  prizes?: string;
  rounds: Round[];
  tags: string[];
  opensAt?: string;
  closesAt?: string;
};

type Filter = "All" | "PPI" | "Hackathon" | "Competition";

export function OpportunitiesClient({
  opportunities,
}: {
  opportunities: Opportunity[];
}) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = opportunities.filter((o) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "PPI") return o.isPPIOffering;
    if (activeFilter === "Hackathon") return o.category === "hackathon";
    if (activeFilter === "Competition")
      return o.category === "competition" || o.category === "internship";
    return true;
  });

  const companyColors: Record<string, string> = {
    amazon: "#FF9900",
    "goldman-sachs": "#1A6CF4",
    flipkart: "#2874F0",
    microsoft: "#00A4EF",
    google: "#4285F4",
    uber: "#000000",
  };

  const companyMarks: Record<string, string> = {
    amazon: "a",
    "goldman-sachs": "GS",
    flipkart: "F",
    microsoft: "MS",
    google: "G",
    uber: "U",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-24">
      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Career Pathways
        </p>
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Competitions & Opportunities
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Hackathons and company programs that open fast-track hiring pathways —
          many include{" "}
          <strong className="font-semibold text-foreground">
            PPI (Pre-Placement Interview)
          </strong>{" "}
          offers that bypass the standard OA screening.
        </p>
      </div>

      <div className="flex gap-2 mb-8 flex-wrap">
        {(["All", "PPI", "Hackathon", "Competition"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
              activeFilter === f
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {f === "PPI" ? "PPI Available" : f}
          </button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground self-center">
          {filtered.length} opportunities
        </span>
      </div>

      <div className="space-y-3">
        {filtered.map((opp) => {
          const isOpen = expanded === opp._id;
          const color = companyColors[opp.companySlug ?? ""] ?? "#666";
          const mark = companyMarks[opp.companySlug ?? ""] ?? opp.organizer?.[0] ?? "?";

          return (
            <div
              key={opp._id}
              className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                isOpen ? "border-foreground/20 shadow-sm" : "border-border"
              }`}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : opp._id)}
                className="w-full text-left px-5 py-4 flex items-start gap-4 group"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: color }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontSize: 13,
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
                    <span className="font-semibold text-sm text-foreground">
                      {opp.title}
                    </span>
                    {opp.isPPIOffering ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-foreground text-background text-[10px] font-semibold">
                        <CircleCheck className="w-2.5 h-2.5" /> PPI
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-border text-muted-foreground text-[10px] font-semibold">
                        <CircleX className="w-2.5 h-2.5" /> No PPI
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground border border-border rounded-full px-2 py-0.5">
                      {opp.category === "hackathon" ? (
                        <Users className="w-2.5 h-2.5" />
                      ) : (
                        <User className="w-2.5 h-2.5" />
                      )}
                      {opp.category}
                    </span>
                    {opp.companySlug && (
                      <Link
                        href={`/companies/${opp.companySlug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] text-muted-foreground underline underline-offset-2 decoration-border hover:text-foreground transition-colors"
                      >
                        {opp.organizer} profile
                      </Link>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {opp.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {opp.prizes && (
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Trophy className="w-3 h-3" />
                        {opp.prizes}
                      </span>
                    )}
                    {opp.closesAt && (
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        Closes:{" "}
                        {new Date(opp.closesAt).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                </div>

                <ChevronDown
                  className={`w-4 h-4 shrink-0 mt-1 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-6 border-t border-border">
                  {opp.ppiDetails && (
                    <div
                      className={`mt-4 mb-5 rounded-xl px-4 py-3 text-sm leading-relaxed ${
                        opp.isPPIOffering
                          ? "bg-foreground/5 border border-foreground/10"
                          : "bg-card border border-border"
                      }`}
                    >
                      <p className="font-semibold text-foreground text-xs mb-1">
                        {opp.isPPIOffering
                          ? "PPI / Fast-track Details"
                          : "Hiring Pathway"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {opp.ppiDetails}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {opp.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg border border-border text-[10px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {opp.rounds.length > 0 && (
                    <>
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
                    </>
                  )}

                  <div className="mt-2 pt-4 border-t border-border space-y-3">
                    {opp.eligibility && (
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                          Eligibility
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {opp.eligibility}
                        </p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-3 pt-1">
                      {opp.applicationUrl && (
                        <a
                          href={opp.applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-80 transition-opacity"
                        >
                          Register <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {opp.companySlug && (
                        <Link
                          href={`/companies/${opp.companySlug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          View {opp.organizer} profile
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-xl border border-border bg-card px-5 py-4 text-xs text-muted-foreground leading-relaxed">
        <strong className="font-semibold text-foreground">Note:</strong>{" "}
        Hackathon dates, eligibility, and PPI policies change every year. Always
        verify on the official platform before applying. PPI outcomes depend on
        individual performance and company hiring decisions.
      </div>
    </div>
  );
}
