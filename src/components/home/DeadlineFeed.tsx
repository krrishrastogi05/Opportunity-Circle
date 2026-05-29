"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink, ChevronRight, ArrowUpRight, Zap } from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────── */
type DeadlineEntry = {
  id: string;
  name: string;
  org: string;
  orgColor: string;
  mark: string;
  type: "Hackathon" | "Open Source" | "Internship Program";
  internalLink?: string;
  externalLink: string;
  opensAt: string | null;
  closesAt: string | null;
  note: string;
  ppi: boolean;
};

const deadlines: DeadlineEntry[] = [
  {
    id: "amazon-hackon",
    name: "HackOn with Amazon",
    org: "Amazon",
    orgColor: "#FF9900",
    mark: "a",
    type: "Hackathon",
    internalLink: "/opportunities",
    externalLink: "https://unstop.com/hackathons/amazon-hackon",
    opensAt: "2026-05-15",
    closesAt: "2026-06-10",
    note: "Coding challenge open. All team members must individually clear the OA.",
    ppi: true,
  },
  {
    id: "gs-hackathon",
    name: "Goldman Sachs India Hackathon",
    org: "Goldman Sachs",
    orgColor: "#1A6CF4",
    mark: "GS",
    type: "Hackathon",
    internalLink: "/opportunities",
    externalLink: "https://www.goldmansachs.com/careers",
    opensAt: "2026-05-01",
    closesAt: "2026-06-05",
    note: "12-hour challenge on HackerRank. CS + Quant tracks both open.",
    ppi: true,
  },
  {
    id: "lfx-summer",
    name: "LFX Mentorship — Summer Term",
    org: "Linux Foundation",
    orgColor: "#003399",
    mark: "LF",
    type: "Open Source",
    internalLink: "/open-source/lfx",
    externalLink: "https://mentorship.lfx.linuxfoundation.org/",
    opensAt: "2026-05-01",
    closesAt: "2026-06-15",
    note: "CNCF, OpenSSF, Hyperledger projects. Complete prerequisite tasks first.",
    ppi: false,
  },
  {
    id: "gsoc-coding",
    name: "Google Summer of Code — Coding Period",
    org: "Google",
    orgColor: "#4285F4",
    mark: "G",
    type: "Open Source",
    internalLink: "/open-source/gsoc",
    externalLink: "https://summerofcode.withgoogle.com/",
    opensAt: "2026-06-02",
    closesAt: "2026-09-08",
    note: "Coding period underway. Midterm eval in July. Final eval in Aug–Sep.",
    ppi: false,
  },
  {
    id: "flipkart-grid",
    name: "Flipkart GRiD 7.0",
    org: "Flipkart",
    orgColor: "#2874F0",
    mark: "F",
    type: "Hackathon",
    internalLink: "/opportunities",
    externalLink: "https://unstop.com/hackathons/flipkart-grid",
    opensAt: "2026-06-20",
    closesAt: "2026-07-25",
    note: "Expected June. Level 1 quiz + prototype submission. Level 2+ = PPI eligible.",
    ppi: true,
  },
  {
    id: "gssoc",
    name: "GirlScript Summer of Code",
    org: "GirlScript",
    orgColor: "#F97316",
    mark: "GS",
    type: "Open Source",
    internalLink: "/open-source/gssoc",
    externalLink: "https://gssoc.girlscript.tech/",
    opensAt: "2026-05-01",
    closesAt: "2026-07-31",
    note: "Contribution period live. Merge PRs to earn points on the leaderboard.",
    ppi: false,
  },
  {
    id: "mlh-fellowship",
    name: "MLH Fellowship — Next Cohort",
    org: "MLH",
    orgColor: "#E31337",
    mark: "MLH",
    type: "Internship Program",
    internalLink: "/open-source/mlh-fellowship",
    externalLink: "https://fellowship.mlh.io/",
    opensAt: null,
    closesAt: null,
    note: "Rolling admissions. Apply 4–6 weeks before your target cohort start.",
    ppi: false,
  },
  {
    id: "outreachy-dec",
    name: "Outreachy — December Cohort",
    org: "Outreachy",
    orgColor: "#6E40C9",
    mark: "O",
    type: "Open Source",
    internalLink: "/open-source/outreachy",
    externalLink: "https://www.outreachy.org/",
    opensAt: "2026-08-10",
    closesAt: "2026-09-20",
    note: "Initial applications open in August. Contribution period in Sep–Oct.",
    ppi: false,
  },
];

/* ─── Status logic ─────────────────────────────────────────── */
type Status = "closing-soon" | "live" | "rolling" | "upcoming" | "ended";

function getStatus(e: DeadlineEntry): Status {
  const now = Date.now();
  if (!e.opensAt && !e.closesAt) return "rolling";
  const opens  = e.opensAt  ? new Date(e.opensAt).getTime()  : null;
  const closes = e.closesAt ? new Date(e.closesAt).getTime() : null;
  if (closes && now > closes) return "ended";
  if (opens  && now < opens)  return "upcoming";
  if (closes) {
    const days = (closes - now) / 86_400_000;
    return days <= 7 ? "closing-soon" : "live";
  }
  return "live";
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
    day: "numeric", month: "short", year: "numeric",
  });
}

const ORDER: Record<Status, number> = {
  "closing-soon": 0, "live": 1, "rolling": 2, "upcoming": 3, "ended": 4,
};

type Filter = "all" | "hackathon" | "open-source" | "internship";

/* ─── CountdownBlock (HH MM) ────────────────────────────────── */
function CountdownBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-black tabular-nums leading-none text-red-500">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] uppercase tracking-widest text-red-400/70 font-semibold mt-0.5">{label}</span>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────── */
export function DeadlineFeed() {
  const [, tick] = useState(0);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  const entries = deadlines
    .map((d) => ({ ...d, status: getStatus(d) }))
    .filter((d) => {
      if (filter === "hackathon")   return d.type === "Hackathon";
      if (filter === "open-source") return d.type === "Open Source";
      if (filter === "internship")  return d.type === "Internship Program";
      return true;
    })
    .sort((a, b) => {
      if (ORDER[a.status] !== ORDER[b.status]) return ORDER[a.status] - ORDER[b.status];
      if (a.closesAt && b.closesAt)
        return new Date(a.closesAt).getTime() - new Date(b.closesAt).getTime();
      return 0;
    });

  const urgentEntries = entries.filter((e) => e.status === "closing-soon");
  const liveCount     = entries.filter((e) => ["live","closing-soon","rolling"].includes(e.status)).length;

  return (
    <section className="w-full py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* ── Emotional bridge ── */}
        <p className="text-sm text-muted-foreground mb-8 border-l-2 border-primary/40 pl-4 italic">
          {liveCount} opportunities are open right now. Are you applying?
        </p>

        {/* ── Header ── */}
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            {/* LIVE pill */}
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">Live updates</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
              What&apos;s Open<br />
              <span className="text-muted-foreground font-light">Right Now</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              <span className="font-semibold text-foreground">{liveCount}</span> active · deadlines auto-sorted by urgency
            </p>
          </div>
          <Link href="/opportunities"
            className="shrink-0 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* ── URGENT ZONE — closing soon ── */}
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
                  <div key={entry.id} className="px-4 py-4 flex items-center gap-4">
                    {/* Mark */}
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ring-1 ring-red-500/20"
                      style={{ backgroundColor: entry.orgColor }}>
                      <span style={{ color:"#fff", fontSize: entry.mark.length > 2 ? 9 : 13, fontWeight:800, fontFamily:"sans-serif" }}>
                        {entry.mark}
                      </span>
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{entry.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{entry.note}</p>
                      {entry.ppi && (
                        <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                          ⚡ PPI Available
                        </span>
                      )}
                    </div>
                    {/* Countdown */}
                    <div className="shrink-0 flex items-center gap-1.5">
                      <CountdownBlock label="days" value={d} />
                      <span className="text-red-400 font-black text-lg mb-1">:</span>
                      <CountdownBlock label="hrs" value={h} />
                      <span className="text-red-400 font-black text-lg mb-1">:</span>
                      <CountdownBlock label="min" value={m} />
                    </div>
                    {/* Links */}
                    <div className="flex gap-1 shrink-0">
                      {entry.internalLink && (
                        <Link href={entry.internalLink}
                          className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors">
                          Guide →
                        </Link>
                      )}
                      <a href={entry.externalLink} target="_blank" rel="noopener noreferrer"
                        className="p-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Filter pills ── */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {([
            { key: "all",         label: "All" },
            { key: "hackathon",   label: "Hackathons" },
            { key: "open-source", label: "Open Source" },
            { key: "internship",  label: "Programs" },
          ] as { key: Filter; label: string }[]).map(({ key, label }) => (
            <button key={key} onClick={() => setFilter(key)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150 ${
                filter === key
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* ── Main feed ── */}
        <div className="space-y-1.5">
          {entries.filter((e) => e.status !== "closing-soon").map((entry) => {
            const daysClose = entry.closesAt ? Math.ceil((new Date(entry.closesAt).getTime() - Date.now()) / 86_400_000) : null;
            const daysOpen  = entry.opensAt  ? Math.ceil((new Date(entry.opensAt).getTime()  - Date.now()) / 86_400_000) : null;

            const isLive     = entry.status === "live";
            const isRolling  = entry.status === "rolling";
            const isUpcoming = entry.status === "upcoming";
            const isEnded    = entry.status === "ended";

            return (
              <div key={entry.id}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-150 ${
                  isEnded
                    ? "opacity-40 border-border bg-transparent"
                    : "border-border hover:border-foreground/25 bg-card hover:shadow-sm"
                }`}
              >
                {/* Left accent line */}
                <div className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-all ${
                  isLive     ? "bg-green-500" :
                  isRolling  ? "bg-blue-500"  :
                  isUpcoming ? "bg-yellow-500":
                  "bg-transparent"
                }`} />

                {/* Mark */}
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ml-1"
                  style={{ backgroundColor: entry.orgColor }}>
                  <span style={{ color:"#fff", fontSize: entry.mark.length > 2 ? 8 : 11, fontWeight:800, fontFamily:"sans-serif" }}>
                    {entry.mark}
                  </span>
                </div>

                {/* Main */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-sm font-semibold text-foreground">{entry.name}</span>

                    {/* Status pill */}
                    {isLive && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Open
                      </span>
                    )}
                    {isRolling && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Rolling
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">
                        ◷ Opens in {daysOpen}d
                      </span>
                    )}
                    {isEnded && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium border border-border text-muted-foreground">Ended</span>
                    )}

                    {/* PPI */}
                    {entry.ppi && !isEnded && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        ⚡ PPI
                      </span>
                    )}

                    {/* Type */}
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] border border-border text-muted-foreground">
                      {entry.type}
                    </span>
                  </div>

                  {/* Deadline line */}
                  <div className="flex items-center gap-3 mt-0.5">
                    {isLive && entry.closesAt && daysClose !== null && (
                      <span className="text-xs text-muted-foreground">
                        Closes <span className="font-semibold text-foreground">{fmt(entry.closesAt)}</span>
                        <span className="text-muted-foreground/60 ml-1">· {daysClose}d left</span>
                      </span>
                    )}
                    {isRolling && (
                      <span className="text-xs text-muted-foreground">No hard deadline</span>
                    )}
                    {isUpcoming && entry.opensAt && (
                      <span className="text-xs text-muted-foreground">
                        Opens <span className="font-semibold text-foreground">{fmt(entry.opensAt)}</span>
                      </span>
                    )}
                    {isEnded && entry.closesAt && (
                      <span className="text-xs text-muted-foreground">Closed {fmt(entry.closesAt)}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  {entry.internalLink && (
                    <Link href={entry.internalLink}
                      className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-foreground text-background hover:opacity-80 transition-opacity">
                      Guide <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  )}
                  <a href={entry.externalLink} target="_blank" rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
          <p className="text-[10px] text-muted-foreground/50">
            Dates verified each season. Always check official platforms before applying.
          </p>
          <Link href="/opportunities"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-medium">
            All opportunities <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
