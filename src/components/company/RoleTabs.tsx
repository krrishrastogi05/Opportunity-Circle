"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

type RoleKey = "intern-2m" | "intern-6m" | "sde1";

const roles: Record<
  RoleKey,
  {
    label: string;
    badge: string;
    access: string[];
    rounds: { label: string; detail: string }[];
    focus: string[];
  }
> = {
  "intern-2m": {
    label: "2-Month Intern",
    badge: "Pre-final year",
    access: [
      "Campus drives at select Tier-1 & Tier-2 colleges (typically Oct–Jan)",
      "Off-campus via Amazon Jobs portal or APAC interest forms",
    ],
    rounds: [
      {
        label: "Online Assessment",
        detail:
          "2–3 DSA problems (Easy–Medium) + Work Simulation section testing Leadership Principles. Both sections are eliminatory — never skip the Work Simulation.",
      },
      {
        label: "Technical Interview",
        detail:
          "45–60 min virtual round. ~30–40 min DSA problem-solving + ~15–20 min LP behavioral questions. Think aloud, start with brute force, then optimise.",
      },
      {
        label: "Bar Raiser (sometimes)",
        detail:
          "A senior interviewer from a different team. Mostly behavioral — STAR stories, LP alignment. May have minimal or no coding.",
      },
    ],
    focus: [
      "DSA — Arrays, Trees, Graphs, DP",
      "Leadership Principles & Work Simulation",
      "Communication of thought process",
    ],
  },
  "intern-6m": {
    label: "6-Month Intern",
    badge: "Final year / Semester-off",
    access: [
      "Amazon Jobs portal — search 'SDE Intern' or 'University' roles at amazon.jobs",
      "Amazon HackOn on Unstop — top performers are often fast-tracked to interviews",
    ],
    rounds: [
      {
        label: "Online Assessment",
        detail:
          "Same structure as 2M — 2–3 DSA problems + Work Simulation. Pool is slightly more competitive off-campus.",
      },
      {
        label: "Technical Interview × 1–2",
        detail:
          "DSA-focused with LP questions interspersed. CS fundamentals (OS, DBMS) can appear as follow-ups in later rounds.",
      },
      {
        label: "Bar Raiser",
        detail:
          "More likely in the 6M loop. Heavily LP-focused. Prepare 8–10 STAR stories mapped to specific Leadership Principles.",
      },
    ],
    focus: [
      "DSA Medium–Hard (LeetCode scale)",
      "LP stories using STAR method",
      "CS fundamentals as interview follow-ups",
    ],
  },
  sde1: {
    label: "SDE-1 Fresher",
    badge: "Final year / Graduated",
    access: [
      "Campus placement drives (typically Aug–Jan) via Amazon University Talent Acquisition",
      "Off-campus hiring interest forms sent periodically by Amazon APAC",
    ],
    rounds: [
      {
        label: "Online Assessment",
        detail:
          "2 DSA problems (Medium–Hard) + Work Simulation. CS fundamentals MCQs may also appear depending on the drive.",
      },
      {
        label: "Technical Round 1",
        detail:
          "Deep DSA problem with complexity analysis, edge cases, and follow-ups on data structure internals (e.g. how a HashMap works, why a Red-Black tree).",
      },
      {
        label: "Technical Round 2",
        detail:
          "A harder DSA problem + CS fundamentals. OS scheduling, DB indexing, OOP, and some LLD/system design awareness can appear.",
      },
      {
        label: "Bar Raiser",
        detail:
          "Led by a specially trained senior from a different team. This is where many strong coders get rejected for poor behavioral prep. Prepare thoroughly.",
      },
    ],
    focus: [
      "DSA Hard — the bar is higher than internships",
      "LP prep — equally weighted, many coders fail here",
      "CS fundamentals (OS, DBMS, Networking, OOP)",
      "Some LLD / System Design awareness",
    ],
  },
};

const tabOrder: RoleKey[] = ["intern-2m", "intern-6m", "sde1"];

export function RoleTabs() {
  const [active, setActive] = useState<RoleKey>("intern-2m");
  const role = roles[active];

  return (
    <div>
      {/* Tab bar */}
      <div className="flex border-b border-border mb-8 gap-0 overflow-x-auto">
        {tabOrder.map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`shrink-0 px-4 py-2.5 text-sm font-medium transition-all duration-150 border-b-2 -mb-px
              ${active === key
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
          >
            {roles[key].label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div key={active} className="space-y-8" style={{ animation: "fadeIn 0.2s ease-out" }}>

        {/* Badge + access */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">{role.badge}</Badge>
          </div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">How to access</p>
          <ul className="space-y-2">
            {role.access.map((a, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <span className="shrink-0 text-foreground mt-0.5">→</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Rounds */}
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Interview rounds</p>
          <div className="space-y-4">
            {role.rounds.map((r, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-foreground text-background text-[11px] font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{r.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Focus areas */}
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Key focus areas</p>
          <div className="flex flex-wrap gap-2">
            {role.focus.map((f) => (
              <span key={f} className="text-xs px-3 py-1.5 rounded-full border border-border text-foreground/80">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
