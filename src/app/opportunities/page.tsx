"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, ChevronDown, Trophy, Users, User, CircleCheck, CircleX, Calendar } from "lucide-react";

/* ── Types ─────────────────────────────────────────── */
type Round = {
  label: string;
  tag: string;
  detail: string;
};

type Opportunity = {
  id: string;
  name: string;
  company: string;
  companySlug: string;
  companyColor: string;
  companyMark: string;
  tagline: string;
  type: "Team" | "Individual";
  active?: boolean;
  ppi: boolean;
  ppiNote: string;
  prize: string;
  platform: string;
  platformUrl: string;
  eligibility: string;
  timing: string;
  rounds: Round[];
  tags: string[];
};

/* ── Data ───────────────────────────────────────────── */
const opportunities: Opportunity[] = [
  {
    id: "amazon-hackon",
    name: "HackOn with Amazon",
    company: "Amazon",
    companySlug: "amazon",
    companyColor: "#FF9900",
    companyMark: "a",
    tagline: "Amazon's flagship engineering hackathon. Solve real-world problems across AWS, Amazon Pay, Alexa, and Shopping — and fast-track your way to a PPI.",
    type: "Team",
    active: true,
    ppi: true,
    ppiNote: "Top finalists receive a PPI for Amazon internship/FTE roles, bypassing the OA screening round.",
    prize: "Up to ₹2.25 Lakhs + swag + Amazon goodies",
    platform: "Unstop",
    platformUrl: "https://unstop.com/hackathons/amazon-hackon",
    eligibility: "B.Tech / M.Tech / MCA students. Teams of 2–3. Minimum CGPA 6.5. Only eligible colleges as recognised by Amazon.",
    timing: "Typically announced July–August. Registration opens on Unstop.",
    tags: ["AWS", "Alexa", "Amazon Pay", "Shopping"],
    rounds: [
      {
        label: "Round 1 — Coding Challenge",
        tag: "Individual · Proctored",
        detail: "Every team member must individually complete a proctored test. Includes DSA coding problems (Medium–Hard) + MCQs covering CS fundamentals and GenAI-based questions. This round is eliminatory — all team members must clear it to advance."
      },
      {
        label: "Round 2 — Idea & Prototype Submission",
        tag: "Team · Async",
        detail: "Shortlisted teams submit a project idea targeting a real Amazon business problem (across AWS, Pay, Shopping, Alexa, etc.). Then build and submit a working prototype with demo video, documentation, and a GitHub repository."
      },
      {
        label: "Round 3 — Mentorship & Refinement",
        tag: "Team · Guided",
        detail: "Top prototype teams are paired with Amazon tech leaders for mentorship sessions. Teams refine their solution based on feedback before the finale. This round is unique to HackOn — direct exposure to senior Amazon engineers."
      },
      {
        label: "Grand Finale",
        tag: "Team · In-person / Virtual",
        detail: "Finalists present to a jury of Amazon leaders. Judged on problem impact, technical depth, scalability, and presentation. Winners receive cash prizes. Top teams are offered PPI opportunities for internship and FTE roles."
      },
    ]
  },
  {
    id: "gs-hackathon",
    name: "Goldman Sachs India Hackathon",
    company: "Goldman Sachs",
    companySlug: "goldman-sachs",
    companyColor: "#1A6CF4",
    companyMark: "GS",
    tagline: "12-hour individual coding and quantitative challenge on HackerRank. One of the most direct fast-tracks to a Goldman Sachs internship PPI in India.",
    type: "Individual",
    active: true,
    ppi: true,
    ppiNote: "Outstanding performers are directly offered a PPI for GS engineering or quant internship roles — one of the most direct campus-bypass pathways available.",
    prize: "PPI + mentorship + GS campus event invite",
    platform: "HackerRank",
    platformUrl: "https://www.goldmansachs.com/careers",
    eligibility: "B.E. / B.Tech students (pre-final or final year) from eligible colleges. Individual participation only.",
    timing: "Typically announced September–October. Watch the GS Careers portal and campus announcements.",
    tags: ["CS Track", "Quant Track", "Finance + Tech", "Individual"],
    rounds: [
      {
        label: "Round 1 — 12-Hour Online Challenge",
        tag: "Individual · HackerRank",
        detail: "12-hour competitive challenge hosted on HackerRank. Two tracks: CS Track (DSA, algorithms, optimization) and Quant Track (probability, statistics, calculus, linear algebra, optimization). You can attempt one or both tracks. Problems range from algorithmic hard-level to applied mathematical modelling."
      },
      {
        label: "Round 2 — Mentorship & Shortlisting",
        tag: "Individual · By invite",
        detail: "Top performers from the challenge are invited to a mentorship session with Goldman Sachs engineers and quant professionals. This is also the evaluation stage for identifying PPI candidates."
      },
      {
        label: "Round 3 — Finale Event",
        tag: "Individual · GS Campus",
        detail: "Finalists are invited to a Finale at the Goldman Sachs India office. Top performers are extended PPI offers for engineering or quantitative internship roles. Performance here directly determines hiring outcomes."
      },
    ]
  },
  {
    id: "flipkart-grid",
    name: "Flipkart GRiD",
    company: "Flipkart",
    companySlug: "flipkart",
    companyColor: "#2874F0",
    companyMark: "F",
    tagline: "Flipkart's annual engineering hackathon — the largest campus tech competition run by an Indian e-commerce company. Teams that reach Level 2+ become eligible for PPIs.",
    type: "Team",
    ppi: true,
    ppiNote: "Teams advancing to Level 2 (Prototype round) and above are eligible for Flipkart PPIs for internship and SDE-1 roles. Finale teams get direct interview fast-tracks.",
    prize: "₹ cash prizes + Flipkart swag + direct PPI pathway",
    platform: "Unstop",
    platformUrl: "https://unstop.com/hackathons/flipkart-grid",
    eligibility: "B.Tech / B.E. / M.Tech / M.S. students. Teams of 1–3 (cross-campus and cross-year allowed). Batches vary by edition — check current edition on Unstop.",
    timing: "Typically announced June–July. Registration on Unstop. No registration fee.",
    tags: ["E-commerce", "Tech + Product", "India Scale", "Cross-campus teams"],
    rounds: [
      {
        label: "Level 1 — Qualifier Quiz",
        tag: "Individual · MCQ",
        detail: "All team members must individually clear an MCQ quiz covering e-commerce trivia, technology awareness, and CS fundamentals (OS, DBMS, Networking, DSA concepts). This is the first elimination gate. It's often underestimated — brush up on CS basics and Flipkart's product domain before attempting."
      },
      {
        label: "Level 2 — Prototype Submission",
        tag: "Team · Async",
        detail: "Qualifying teams receive a problem statement (from Flipkart's real engineering challenges) and build a working prototype. Submit a detailed proposal, prototype code, and documentation. Teams advancing here become PPI-eligible. This is the critical threshold."
      },
      {
        label: "Level 3 — Video Submission / Presentation",
        tag: "Team · Async",
        detail: "Shortlisted teams create a video demonstration of their solution, presenting the problem, approach, architecture, and impact. Judged on technical depth, scalability, and product thinking. Think of it as a technical demo pitch."
      },
      {
        label: "National Finale",
        tag: "Team · In-person at Flipkart HQ",
        detail: "Top teams present live to a Flipkart engineering jury at their Bangalore HQ. Technical Q&A from senior engineers. Winners receive cash prizes. Finale teams are directly fast-tracked for Flipkart internship and SDE-1 interviews — the strongest PPI pathway available."
      },
    ]
  },
  {
    id: "microsoft-engage",
    name: "Microsoft Engage",
    company: "Microsoft",
    companySlug: "microsoft",
    companyColor: "#00A4EF",
    companyMark: "MS",
    tagline: "Microsoft's 4-week mentorship program for second-year students. Build a real project under Microsoft engineer mentorship — strong performers are offered a PPO for the SDE internship.",
    type: "Individual",
    ppi: false,
    ppiNote: "Engage is a mentorship + project program, not a hackathon. Strong performers receive a PPO (Pre-Placement Offer) for the SDE internship — even more direct than a PPI.",
    prize: "PPO for Microsoft SDE Internship + Microsoft swag + certificate",
    platform: "Microsoft Careers",
    platformUrl: "https://careers.microsoft.com/",
    eligibility: "B.Tech / B.E. students specifically in their 2nd year (first year of college). Open to students from a broad range of institutes — not restricted to Tier-1 only.",
    timing: "Applications typically open January–February each year. Program runs May–June. Check careers.microsoft.com.",
    tags: ["2nd Year Only", "PPO Pathway", "Azure", "4 Weeks", "Mentored Project"],
    rounds: [
      {
        label: "Stage 1 — Application & Resume Screening",
        tag: "Individual · Online",
        detail: "Submit your application with resume and academic details at the Microsoft Engage portal. No OA required at this stage. Selection is based on resume quality, academic performance, and demonstrated interest in engineering. Open to a broad range of institutes."
      },
      {
        label: "Stage 2 — Coding Assessment (some editions)",
        tag: "Individual · Optional",
        detail: "Some editions include a coding assessment for shortlisting. Easy–Medium difficulty DSA problems. Not all editions include this stage — check the specific year's guidelines."
      },
      {
        label: "Stage 3 — 4-Week Mentorship Program",
        tag: "Individual · Virtual / Hybrid",
        detail: "Selected students are paired with Microsoft engineers as mentors. Work on a real project over 4 weeks with weekly check-ins. Build and present a working application by the end of the program. Mentors evaluate technical growth, communication, and project quality."
      },
      {
        label: "Stage 4 — Project Demo & PPO Decision",
        tag: "Individual · Final evaluation",
        detail: "Submit and demo your final project. Microsoft evaluates overall performance across the 4 weeks. High-performing participants are extended PPO (Pre-Placement Offer) for the Microsoft SDE internship — skipping the full interview process entirely."
      },
    ]
  },
  {
    id: "google-step",
    name: "Google STEP Internship",
    company: "Google",
    companySlug: "google",
    companyColor: "#4285F4",
    companyMark: "G",
    tagline: "Google's early-career internship for 1st and 2nd year students. Not a hackathon — a direct internship application with a focused technical interview loop.",
    type: "Individual",
    ppi: false,
    ppiNote: "STEP is a direct internship program, not a hackathon. Completing STEP successfully often fast-tracks you to a standard Google SWE internship interview in your pre-final year.",
    prize: "Paid internship at Google India + mentorship + strong SWE internship pathway",
    platform: "Google Careers",
    platformUrl: "https://careers.google.com/programs/step/",
    eligibility: "B.Tech students in 1st or 2nd year only. Apply via careers.google.com/programs/step/. Applications open August–November each year.",
    timing: "Applications open August–November for the following summer. Apply as early as possible — rolling selection.",
    tags: ["1st & 2nd Year", "Paid Internship", "Not a Hackathon", "Direct Apply"],
    rounds: [
      {
        label: "Round 1 — Resume Screening",
        tag: "Individual · Online",
        detail: "Apply at careers.google.com/programs/step/. No OA — selection is based on resume, academic performance, and demonstrated technical interest. A strong competitive programming background (Codeforces, ICPC) is a meaningful differentiator at this stage."
      },
      {
        label: "Round 2 — Technical Interview × 1–2",
        tag: "Individual · 45 min each",
        detail: "DSA-focused interviews, similar to the standard Google SWE interview loop but calibrated for 1st/2nd year students. Conducted on a shared document (no IDE). Topics: Arrays, Strings, Trees, Graphs, basic DP. Think aloud — Googleyness is evaluated even in STEP interviews."
      },
      {
        label: "STEP Internship (10–12 weeks)",
        tag: "Individual · Summer",
        detail: "Selected students complete a 10–12 week paid internship at Google India (Hyderabad or Bangalore). Paired with a mentor. Work on a real codebase. STEP alumni have a meaningfully better chance of being selected for the standard Google SWE Internship in their pre-final year."
      },
    ]
  },
  {
    id: "uber-star",
    name: "Uber Star Engineer",
    company: "Uber",
    companySlug: "uber",
    companyColor: "#000000",
    companyMark: "U",
    tagline: "Uber's campus talent identification program. A competitive challenge that fast-tracks exceptional candidates into Uber's internship interview loop.",
    type: "Individual",
    ppi: true,
    ppiNote: "Top performers receive a fast-track PPI into Uber's internship interview loop — skipping the standard OA. Uber's OA is notoriously strict, making this a valuable bypass.",
    prize: "PPI fast-track + Uber swag + recognition",
    platform: "Unstop / Uber Careers",
    platformUrl: "https://www.uber.com/in/en/careers/",
    eligibility: "B.Tech / M.Tech students (pre-final year). Check official Uber Careers and Unstop for current edition eligibility.",
    timing: "Typically announced alongside campus placement season. Watch Uber Careers and Unstop for announcements.",
    tags: ["Fast-track PPI", "OA Bypass", "Competitive", "Campus"],
    rounds: [
      {
        label: "Round 1 — Online Coding Challenge",
        tag: "Individual · Competitive",
        detail: "Competitive DSA challenge similar to Uber's standard OA. Medium–Hard problems. Topics: Graphs, DP, Trees, Arrays. This is a high-bar round — Uber's OA is one of the strictest in the industry. Near-perfect performance is expected to advance."
      },
      {
        label: "Round 2 — Technical Evaluation",
        tag: "Individual · Live / Async",
        detail: "Top performers from the coding challenge undergo a technical evaluation round. Assessed on problem-solving depth, code quality, and communication. Performance here determines PPI eligibility."
      },
      {
        label: "PPI Fast-track",
        tag: "By invite only",
        detail: "Outstanding candidates are extended a PPI — directly entering Uber's internship interview loop (DSA rounds + LLD round) without the standard OA gate. This is the most valuable outcome given how strict Uber's standard OA is."
      },
    ]
  },
];

/* ── Filter Tabs ─────────────────────────────────────── */
type Filter = "All" | "PPI" | "Team" | "Individual";

export default function OpportunitiesPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = opportunities.filter((o) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "PPI") return o.ppi;
    if (activeFilter === "Team") return o.type === "Team";
    if (activeFilter === "Individual") return o.type === "Individual";
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-24">

      {/* Header */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Career Pathways
        </p>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Competitions & Opportunities</h1>
        <p className="text-muted-foreground leading-relaxed">
          Hackathons and company programs that open fast-track hiring pathways — many include{" "}
          <strong className="font-semibold text-foreground">PPI (Pre-Placement Interview)</strong> offers
          that bypass the standard OA screening. Linked to each company&apos;s full profile.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {(["All", "PPI", "Team", "Individual"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
              activeFilter === f
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {f === "PPI" ? "⚡ PPI Available" : f}
          </button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground self-center">{filtered.length} opportunities</span>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {filtered.map((opp) => {
          const isOpen = expanded === opp.id;
          return (
            <div
              key={opp.id}
              className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                isOpen ? "border-foreground/20 shadow-sm" : "border-border"
              }`}
            >
              {/* Card Header — always visible */}
              <button
                onClick={() => setExpanded(isOpen ? null : opp.id)}
                className="w-full text-left px-5 py-4 flex items-start gap-4 group"
              >
                {/* Company mark */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: opp.companyColor }}
                >
                  <span style={{ color: "#fff", fontSize: 13, fontWeight: 800, fontFamily: "sans-serif", letterSpacing: "-0.5px" }}>
                    {opp.companyMark}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-foreground">{opp.name}</span>
                    {/* Active badge */}
                    {opp.active && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                        </span>
                        Currently Active
                      </span>
                    )}
                    {/* PPI badge */}
                    {opp.ppi ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-foreground text-background text-[10px] font-semibold">
                        <CircleCheck className="w-2.5 h-2.5" /> PPI
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-border text-muted-foreground text-[10px] font-semibold">
                        <CircleX className="w-2.5 h-2.5" /> No PPI
                      </span>
                    )}
                    {/* Team/Individual */}
                    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground border border-border rounded-full px-2 py-0.5">
                      {opp.type === "Team" ? <Users className="w-2.5 h-2.5" /> : <User className="w-2.5 h-2.5" />}
                      {opp.type}
                    </span>
                    {/* Company link */}
                    <Link
                      href={`/companies/${opp.companySlug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[10px] text-muted-foreground underline underline-offset-2 decoration-border hover:text-foreground hover:decoration-foreground transition-colors"
                    >
                      {opp.company} profile →
                    </Link>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{opp.tagline}</p>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Trophy className="w-3 h-3" />{opp.prize}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Calendar className="w-3 h-3" />{opp.timing.split(".")[0]}
                    </span>
                  </div>
                </div>

                <ChevronDown
                  className={`w-4 h-4 shrink-0 mt-1 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Expanded content */}
              {isOpen && (
                <div className="px-5 pb-6 border-t border-border">

                  {/* PPI note */}
                  <div className={`mt-4 mb-5 rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    opp.ppi
                      ? "bg-foreground/5 border border-foreground/10"
                      : "bg-card border border-border"
                  }`}>
                    <p className="font-semibold text-foreground text-xs mb-1">
                      {opp.ppi ? "⚡ PPI / Fast-track Details" : "ℹ️ Hiring Pathway"}
                    </p>
                    <p className="text-xs text-muted-foreground">{opp.ppiNote}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {opp.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg border border-border text-[10px] text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Rounds timeline */}
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                    Rounds
                  </p>
                  <div className="space-y-0">
                    {opp.rounds.map((r, i) => (
                      <div key={i} className="flex gap-3">
                        {/* Timeline line */}
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </div>
                          {i < opp.rounds.length - 1 && (
                            <div className="w-px flex-1 bg-border mt-1 mb-1" />
                          )}
                        </div>
                        {/* Content */}
                        <div className={`pb-5 ${i < opp.rounds.length - 1 ? "" : ""}`}>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <p className="text-sm font-semibold text-foreground">{r.label}</p>
                            <span className="px-2 py-0.5 rounded-full border border-border text-[10px] text-muted-foreground">
                              {r.tag}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{r.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Eligibility + Register */}
                  <div className="mt-2 pt-4 border-t border-border space-y-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Eligibility</p>
                      <p className="text-xs text-muted-foreground">{opp.eligibility}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Timing</p>
                      <p className="text-xs text-muted-foreground">{opp.timing}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <a
                        href={opp.platformUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-80 transition-opacity"
                      >
                        Register on {opp.platform} <ExternalLink className="w-3 h-3" />
                      </a>
                      <Link
                        href={`/companies/${opp.companySlug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                      >
                        View {opp.company} profile →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom note */}
      <div className="mt-10 rounded-xl border border-border bg-card px-5 py-4 text-xs text-muted-foreground leading-relaxed">
        <strong className="font-semibold text-foreground">Note:</strong>{" "}
        Hackathon dates, eligibility, and PPI policies change every year. Always verify on the official platform
        (Unstop, HackerRank, company careers portal) before applying. PPI outcomes depend on individual performance
        and company hiring decisions — participation does not guarantee an interview or offer.
      </div>
    </div>
  );
}
