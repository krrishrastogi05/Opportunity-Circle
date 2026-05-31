"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock,
  Globe,
  Users,
  User,
  BookOpen,
  GitMerge,
  Lightbulb,
  Trophy,
  CalendarDays,
  Zap,
} from "lucide-react";

type Step = { step: number; title: string; description: string };
type TimelinePhase = { phase: string; period: string; description: string };

type Program = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  organizer?: string;
  applicationUrl?: string;
  stipend?: string;
  tags: string[];
  steps: Step[];
  timeline: TimelinePhase[];
  tips: string[];
};

type Filter = "All" | "Paid" | "Has Stipend";

const orgColors: Record<string, string> = {
  Google: "#4285F4",
  "Linux Foundation": "#003399",
  "Software Freedom Conservancy": "#6E40C9",
  "Major League Hacking": "#E31337",
  "GirlScript Foundation": "#F97316",
};

const orgMarks: Record<string, string> = {
  Google: "G",
  "Linux Foundation": "LF",
  "Software Freedom Conservancy": "O",
  "Major League Hacking": "MLH",
  "GirlScript Foundation": "GS",
};

export function OpenSourceClient({ programs }: { programs: Program[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [tab, setTab] = useState<Record<string, "steps" | "timeline" | "tips">>({});

  const filtered = programs.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Paid") return p.stipend && !p.stipend.startsWith("No");
    return true;
  });

  function getTab(id: string): "steps" | "timeline" | "tips" {
    return tab[id] ?? "steps";
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-24">
      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Career Pathways
        </p>
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Open Source Programs
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          Paid mentorships and contribution programs that build real engineering
          skills, open-source credibility, and direct fast-tracks into top
          companies.
        </p>
      </div>

      <div className="flex gap-2 mb-8 flex-wrap items-center">
        {(["All", "Paid"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
              filter === f
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">
          {filtered.length} programs
        </span>
      </div>

      <div className="space-y-3">
        {filtered.map((p) => {
          const isOpen = expanded === p._id;
          const activeTab = getTab(p._id);
          const orgColor = orgColors[p.organizer ?? ""] ?? "#666";
          const mark = orgMarks[p.organizer ?? ""] ?? p.organizer?.[0] ?? "?";

          return (
            <div
              key={p._id}
              className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                isOpen ? "border-foreground/20 shadow-sm" : "border-border"
              }`}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : p._id)}
                className="w-full text-left px-5 py-4 flex items-start gap-4"
              >
                <div
                  className="w-11 h-11 rounded-xl shrink-0 mt-0.5 flex items-center justify-center"
                  style={{ backgroundColor: orgColor }}
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
                    <span className="font-semibold text-sm">{p.title}</span>
                    {p.stipend && !p.stipend.startsWith("No") ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold border border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400">
                        {p.stipend}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-border text-muted-foreground">
                        No stipend
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground border border-border rounded-full px-2 py-0.5">
                      <User className="w-2.5 h-2.5" />
                      Individual
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Globe className="w-3 h-3" />
                      {p.organizer}
                    </span>
                  </div>
                </div>

                <ChevronDown
                  className={`w-4 h-4 shrink-0 mt-1 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-border">
                  <div className="px-5 mb-4 flex flex-wrap gap-1.5 pt-4">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg border border-border text-[10px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="px-5 mb-4 flex gap-1 border-b border-border pb-0">
                    {(
                      [
                        { key: "steps", label: "How to Apply", icon: BookOpen },
                        {
                          key: "timeline",
                          label: "Timeline",
                          icon: CalendarDays,
                        },
                        { key: "tips", label: "Pro Tips", icon: Zap },
                      ] as {
                        key: "steps" | "timeline" | "tips";
                        label: string;
                        icon: React.ElementType;
                      }[]
                    ).map(({ key, label, icon: Icon }) => (
                      <button
                        key={key}
                        onClick={() =>
                          setTab((prev) => ({ ...prev, [p._id]: key }))
                        }
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                          activeTab === key
                            ? "border-foreground text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        {label}
                      </button>
                    ))}
                  </div>

                  <div className="px-5 pb-5">
                    {activeTab === "steps" && (
                      <div className="space-y-0">
                        {p.steps.map((s, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="w-6 h-6 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center shrink-0">
                                {i + 1}
                              </div>
                              {i < p.steps.length - 1 && (
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

                    {activeTab === "timeline" && (
                      <div className="space-y-2">
                        {p.timeline.map((t, i) => (
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

                    {activeTab === "tips" && (
                      <ul className="space-y-3">
                        {p.tips.map((tip, i) => (
                          <li key={i} className="flex gap-2.5">
                            <CircleCheck className="w-4 h-4 shrink-0 mt-0.5 text-green-500" />
                            <span className="text-xs text-muted-foreground leading-relaxed">
                              {tip}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="px-5 pb-5 pt-1 border-t border-border flex flex-wrap gap-3">
                    <Link
                      href={`/open-source/${p.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-80 transition-opacity"
                    >
                      Full Guide
                    </Link>
                    {p.applicationUrl && (
                      <a
                        href={p.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Official Site <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border bg-card px-5 py-4 mt-8 mb-8 space-y-2">
        <p className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-yellow-500" /> Why open source
          matters
        </p>
        <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
          <li className="flex gap-2">
            <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-muted-foreground/50" />
            GSoC and LFX are immediately recognised by top companies as strong
            signals of real engineering ability.
          </li>
          <li className="flex gap-2">
            <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-muted-foreground/50" />
            Many programs pay $3,000-$7,000 USD — competitive with or better
            than most Indian internship stipends.
          </li>
          <li className="flex gap-2">
            <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-muted-foreground/50" />
            For off-campus candidates, open source is the single most effective
            resume differentiator.
          </li>
        </ul>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card px-5 py-4 text-xs text-muted-foreground leading-relaxed">
        <strong className="font-semibold text-foreground">
          Recommended progression:
        </strong>{" "}
        Start with <strong className="text-foreground">GSSoC</strong> to build
        first PRs, then apply to{" "}
        <strong className="text-foreground">LFX</strong> or{" "}
        <strong className="text-foreground">Outreachy</strong>, then target{" "}
        <strong className="text-foreground">GSoC</strong> with a strong proposal.
      </div>

      <p className="mt-6 text-[10px] text-muted-foreground/60 leading-relaxed">
        Program dates, stipend amounts, and eligibility criteria change annually.
        Always verify on official program websites before applying.
      </p>
    </div>
  );
}
