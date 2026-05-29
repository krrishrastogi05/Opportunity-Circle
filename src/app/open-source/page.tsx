"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ExternalLink, ChevronDown, ChevronRight,
  CircleCheck, Clock, Globe, Users, User,
  BookOpen, GitMerge, Lightbulb, Trophy, CalendarDays, Zap,
} from "lucide-react";

/* ─── Types ────────────────────────────────────────────────── */
type Step = { title: string; detail: string };
type Timeline = { phase: string; when: string; tip?: string };
type Program = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  org: string;
  orgColor: string;
  mark: string;
  tagline: string;
  type: "Individual" | "Team";
  stipend: string;
  stipendNote: string;
  duration: string;
  difficulty: "Beginner-friendly" | "Intermediate" | "Competitive";
  url: string;
  tags: string[];
  about: string;
  steps: Step[];
  timeline: Timeline[];
  tips: string[];
  active?: boolean;
};

/* ─── Data ──────────────────────────────────────────────────── */
const programs: Program[] = [
  {
    id: "gsoc",
    slug: "gsoc",
    name: "Google Summer of Code",
    shortName: "GSoC",
    org: "Google",
    orgColor: "#4285F4",
    mark: "G",
    tagline: "The world's most prestigious open-source program. 3 months of paid coding with a mentoring organization — and a global community behind you.",
    type: "Individual",
    stipend: "~$1,500 – $3,300",
    stipendNote: "Amount varies by country (PPP-adjusted) and project size (Small / Medium / Large). Paid via Payoneer in two installments after midterm and final evaluations. Indian contributors typically receive ₹1.2L–₹2.5L+ depending on project scope.",
    duration: "12–22 weeks (flexible)",
    difficulty: "Competitive",
    url: "https://summerofcode.withgoogle.com/",
    tags: ["Google Backed", "Global", "Paid", "Any year", "Any background"],
    about: "GSoC connects contributors with open-source organizations (Apache, Linux Foundation, CNCF, Mozilla, and 180+ others) to work on real-world projects over a coding period. You work under a mentor, submit code to a real open-source repo, and get paid. It's one of the best resume signals in the open-source world.",
    steps: [
      { title: "Find an org early (Jan–Feb)", detail: "Browse the org list at summerofcode.withgoogle.com. Pick 2–3 orgs whose tech stack you know or want to learn. Read their ideas pages (linked on the GSoC org page). This is the most important step — most rejected proposals come from people who picked an org they didn't understand." },
      { title: "Join the community & contribute", detail: "Join the org's Slack / Discord / mailing list. Introduce yourself. Pick a 'good first issue' from their repo and submit a PR — even a small docs fix counts. Mentors notice active contributors during the proposal window. This step massively improves your selection probability." },
      { title: "Write a strong proposal (Mar–Apr)", detail: "The proposal is your pitch document. It must include: clear deliverables, a week-by-week timeline, your background, and evidence you've engaged with the community. Most orgs publish a proposal template — follow it exactly. Bad proposals are often good code with no clear plan." },
      { title: "Submit (April deadline)", detail: "Submit on the GSoC platform before the deadline. You can submit up to 3 proposals across different orgs. Accepted contributors are announced in May." },
      { title: "Community Bonding → Coding → Evaluations", detail: "After selection: 3–4 weeks of community bonding (understand codebase, talk to mentor), then the coding period. Midterm and final evaluations — you must pass both to receive your stipend installments." },
    ],
    timeline: [
      { phase: "Org applications", when: "January – February", tip: "Watch the GSoC blog — org list is announced here" },
      { phase: "Contributor applications", when: "March – April", tip: "Start contributing in January, not March" },
      { phase: "Accepted projects announced", when: "May" },
      { phase: "Community Bonding", when: "May – June", tip: "Meet your mentor, read the codebase, set up dev env" },
      { phase: "Coding Period", when: "June – September", tip: "Weekly syncs with mentor. Commit regularly." },
      { phase: "Final results", when: "November" },
    ],
    tips: [
      "Pick orgs where you've already used the software. Familiarity shows in your proposal.",
      "Submit at least one real PR before the application deadline — mentors look for this.",
      "Write your proposal for a technical reader who doesn't know your background.",
      "Don't wait for March to start — the best contributors are already active in January.",
      "You can apply to up to 3 orgs — diversify your bets.",
    ],
  },
  {
    id: "lfx",
    slug: "lfx",
    name: "LFX Mentorship",
    shortName: "LFX",
    org: "Linux Foundation",
    orgColor: "#003399",
    mark: "LF",
    tagline: "Linux Foundation's structured mentorship across CNCF, OpenSSF, and 50+ top open-source projects. Three terms a year — apply in Spring, Summer, or Fall.",
    type: "Individual",
    stipend: "$3,000 – $6,600",
    stipendNote: "Stipend amount depends on the term (full-time vs part-time) and your location. Paid in two installments — 50% at midterm, 50% on successful completion. One of the highest-paying open-source programs globally.",
    duration: "12 weeks (full-time) or longer (part-time)",
    difficulty: "Intermediate",
    url: "https://mentorship.lfx.linuxfoundation.org/",
    tags: ["Linux Foundation", "CNCF", "Kubernetes", "Cloud Native", "3 terms/year"],
    about: "LFX runs three mentorship terms annually (Spring, Summer, Fall) with projects from CNCF (Kubernetes, Prometheus, Argo), OpenSSF, Hyperledger, and dozens of other major open-source foundations. Projects span cloud-native, security, blockchain, and systems. Less competitive than GSoC but requires solid technical background — you'll be writing production code in major OSS ecosystems.",
    steps: [
      { title: "Create your LFX profile", detail: "Sign up at mentorship.lfx.linuxfoundation.org as a Mentee. Fill in your GitHub, LinkedIn, and upload your resume. A complete profile is required before applying — incomplete profiles are auto-rejected." },
      { title: "Browse open projects", detail: "Filter by 'Accepting Applications'. Projects list the required skills, expected work, and mentors. CNCF projects (Kubernetes, Argo, Prometheus, Helm) are the most popular and impactful on a resume." },
      { title: "Read the project and join the community", detail: "Before applying, join the project's Slack channel (most CNCF projects are on cloud-native.slack.com). Read recent PRs and issues. Understanding what the project does and what's being actively worked on dramatically improves your application quality." },
      { title: "Complete prerequisite tasks", detail: "Many projects require you to complete a specific task during the application window (e.g., fix a specific bug, write a test, or document a feature). These prerequisite tasks are listed on the project page — they are eliminatory. If you don't complete them, your application won't be reviewed." },
      { title: "Write your Statement of Purpose", detail: "This is the core of your application — a cover letter tailored to the project. Explain: what the project does, what the specific task involves, why you're qualified, and what your approach would be. Generic cover letters are rejected quickly by mentors who've seen hundreds." },
    ],
    timeline: [
      { phase: "Spring Term applications", when: "February", tip: "Term runs March – May" },
      { phase: "Summer Term applications", when: "May", tip: "Term runs June – August" },
      { phase: "Fall Term applications", when: "July – August", tip: "Term runs September – November" },
      { phase: "Mentor reviews & selection", when: "~2 weeks after close", tip: "Complete prerequisite tasks before this" },
      { phase: "Coding period", when: "12 weeks", tip: "Weekly syncs. Midterm eval at week 6." },
      { phase: "Stipend payments", when: "Week 6 (50%) + Week 12 (50%)" },
    ],
    tips: [
      "CNCF projects are the most resume-relevant — Kubernetes, Argo, Prometheus contributions are immediately recognizable to cloud-native hiring teams.",
      "The prerequisite task is non-negotiable. If the project lists one, completing it is step zero — not optional.",
      "You can apply to multiple projects per term. Apply to 3–5 and tailor each application.",
      "LFX is less competitive than GSoC — a solid SoP + completed prerequisite task often gets you in.",
      "Look at merged PRs in the project to understand the code style and quality bar before writing a single line.",
    ],
  },
  {
    id: "outreachy",
    slug: "outreachy",
    name: "Outreachy",
    shortName: "Outreachy",
    org: "Software Freedom Conservancy",
    orgColor: "#6E40C9",
    mark: "O",
    tagline: "Paid remote internships for underrepresented people in tech. $7,000 USD stipend. Focus on the contribution period — that's where selection actually happens.",
    type: "Individual",
    stipend: "$7,000 USD",
    stipendNote: "$7,000 USD flat for the 3-month internship + up to $500 travel stipend for approved events. One of the highest flat stipends of any open-source program. Paid in installments. Note: Past GSoC participants are not eligible.",
    duration: "3 months (full-time, 30–40 hrs/week)",
    difficulty: "Beginner-friendly",
    url: "https://www.outreachy.org/",
    tags: ["Underrepresented in tech", "$7K stipend", "Beginner-friendly", "Remote", "2 cohorts/year"],
    about: "Outreachy specifically supports people who face underrepresentation or discrimination in the tech industry of their country. It runs two cohorts: May–August (Northern Hemisphere) and December–March. The selection process is contribution-based — after your initial application is approved, you enter a contribution period where you actively contribute to 1–2 projects, and mentors select interns based on contribution quality. Past GSoC interns are ineligible.",
    steps: [
      { title: "Check eligibility carefully", detail: "Outreachy has specific eligibility rules: you must face underrepresentation in your country's tech industry. You must NOT be a past Outreachy intern or past GSoC contributor. You must be available full-time (30–40 hrs/week) with no other internship or full-time job. Students need 42+ consecutive days free from exams. Read outreachy.org/eligibility before applying." },
      { title: "Submit initial application with essays", detail: "The initial application includes essay questions about your background, experiences with systemic bias or underrepresentation, and motivation. These essays are evaluated carefully — be genuine, specific, and personal. Generic answers don't pass." },
      { title: "Enter the contribution period", detail: "If your initial application is approved, you get access to the contribution period. This is where the real selection happens. Choose 1–2 projects that interest you. Join their community, ask questions, and start making contributions (code, docs, design, testing — depends on the project). Record your contributions on the Outreachy platform." },
      { title: "Submit final application", detail: "For each project you contributed to, submit a final application describing your contributions, what you learned, and your plan for the internship. Mentors select interns primarily based on contribution quality and community engagement — not the essays." },
    ],
    timeline: [
      { phase: "Initial applications open", when: "January (May cohort) / August (Dec cohort)", tip: "Check outreachy.org for exact dates — they shift slightly each year" },
      { phase: "Contribution period", when: "February – March (May cohort)", tip: "This is where selection really happens. Contribute actively." },
      { phase: "Interns announced", when: "March / October" },
      { phase: "Internship starts", when: "May or December" },
      { phase: "Stipend payments", when: "Installments during the 3 months" },
    ],
    tips: [
      "The contribution period is where selection actually happens — not your essays. Contribute early and actively.",
      "Pick projects where you can start contributing within the first week. Avoid projects where setup alone takes days.",
      "Communicate in public (mailing lists, GitHub issues) not just DMs — mentors see your engagement.",
      "Quality over quantity on contributions. One well-reviewed, merged PR beats ten untouched submissions.",
      "If you're a past GSoC contributor you are ineligible — this is strictly enforced.",
    ],
  },
  {
    id: "mlh-fellowship",
    slug: "mlh-fellowship",
    name: "MLH Fellowship",
    shortName: "MLH",
    org: "Major League Hacking",
    orgColor: "#E31337",
    mark: "MLH",
    tagline: "12-week remote internship alternative for developers. Work on open-source projects used by real companies — rolling admissions, year-round cohorts.",
    type: "Individual",
    stipend: "Up to $5,000",
    stipendNote: "Educational stipend up to $5,000 USD — amount varies by region and batch. Not guaranteed to all participants. Rolling cohorts run year-round, so you can plan around your academic schedule.",
    duration: "12 weeks (20–30 hrs/week)",
    difficulty: "Intermediate",
    url: "https://fellowship.mlh.io/",
    tags: ["Rolling admissions", "Year-round", "Open source track", "Startup track", "Explorer track"],
    about: "MLH Fellowship runs year-round with three tracks: Open Source (contribute to major OSS projects used by companies like Meta, GitHub, Shopify), Explorer (build your own project with a team), and Startup (work at an early-stage startup). Open to students, self-taught developers, and early-career engineers. The technical interview is real — prepare properly.",
    steps: [
      { title: "Choose your track", detail: "MLH runs three tracks: (1) Open Source — contribute to real OSS projects (most popular, best resume value). (2) Explorer — build a project with a team of fellows. (3) Startup — work with an early-stage company. Pick based on your goals. Open Source is the most relevant if you want to signal OSS experience to employers." },
      { title: "Submit your application", detail: "Fill in your application at fellowship.mlh.io. Include your GitHub profile — it's evaluated seriously. Projects should be well-documented with a clear README, clean code, and commit history. A sparse GitHub profile is a red flag." },
      { title: "Behavioral interview", detail: "If shortlisted: a behavioral interview about your background, motivation, communication style, and how you handle challenges. MLH values team players — be genuine about how you collaborate." },
      { title: "Technical interview", detail: "A coding challenge or technical interview to assess your programming ability. Prepare for standard DSA problems (Easy–Medium) and be able to discuss your past projects in technical depth." },
      { title: "Program & weekly structure", detail: "Fellows work 20–30 hours/week. Weekly standups, code reviews, and cohort events. You're evaluated on contributions, communication, and engagement — not just code output." },
    ],
    timeline: [
      { phase: "Applications", when: "Rolling — opens a few weeks before each batch", tip: "Check fellowship.mlh.io for next cohort start date" },
      { phase: "Interviews", when: "Within 2 weeks of applying", tip: "Apply early — spots fill before the deadline" },
      { phase: "Cohort starts", when: "Roughly every 3 months year-round" },
      { phase: "12-week program", when: "Full cohort period", tip: "20–30 hrs/week. Weekly syncs." },
      { phase: "Stipend", when: "During/after program", tip: "Amount varies by region" },
    ],
    tips: [
      "Apply at least 4–6 weeks before a cohort start date — rolling admissions means earlier = better odds.",
      "Clean up your GitHub before applying. Pin 3–4 strong projects with good READMEs.",
      "The Open Source track is the most valuable for engineering resumes — you contribute to codebases like CPython, React, and FastAPI.",
      "Prepare for DSA (Easy–Medium LeetCode) for the technical interview.",
      "Read about the specific OSS projects in your chosen track before the interview — mentors ask what you're excited to work on.",
    ],
  },
  {
    id: "gssoc",
    slug: "gssoc",
    name: "GirlScript Summer of Code",
    shortName: "GSSoC",
    org: "GirlScript Foundation",
    orgColor: "#F97316",
    mark: "GS",
    tagline: "India's largest open-source program. No stipend — but certificates, LORs, internship opportunities, and leaderboard recognition for top contributors.",
    type: "Individual",
    stipend: "No stipend",
    stipendNote: "GSSoC does not pay a stipend. Top contributors (top 25) receive LORs and internship opportunities. Top 50 get swag/goodies. Certificate for anyone with 60+ points or a merged PR. Open to everyone — no eligibility restrictions.",
    duration: "3 months",
    difficulty: "Beginner-friendly",
    url: "https://gssoc.girlscript.tech/",
    tags: ["India", "No stipend", "Certificate", "LOR for top 25", "Beginner-friendly", "Open to all"],
    about: "GSSoC is India's most accessible open-source program — no eligibility restrictions, no stipend, but a great way to start contributing to open source for the first time. Projects span web dev, ML, mobile, and tools. The program is leaderboard-driven — contributors earn points for merged PRs. Top contributors receive Letters of Recommendation (LOR) and internship opportunities. It's a strong starting point before applying to GSoC or LFX.",
    steps: [
      { title: "Register as a contributor", detail: "Sign up at gssoc.girlscript.tech. Registration is free and open to all — no eligibility gate. Browse the list of selected projects for the current edition." },
      { title: "Pick 2–3 projects", detail: "Choose projects in your tech stack. Don't spread too thin across 10 projects — focus on 2–3 where you can make meaningful contributions. Read existing PRs and issues to understand what's needed." },
      { title: "Find issues and contribute", detail: "Look for issues labelled 'GSSoC', 'good first issue', or 'help wanted'. Comment on the issue to claim it before starting work. Submit PRs — each merged PR earns points based on difficulty (Level 1, 2, 3)." },
      { title: "Track your points on the leaderboard", detail: "GSSoC uses a public leaderboard. Points are awarded per merged PR: Level 1 (10 pts), Level 2 (25 pts), Level 3 (45 pts). 60+ points = certificate. Top 25 = LOR + internship opportunities. Top 50 = swag." },
    ],
    timeline: [
      { phase: "Program registration", when: "March – April (typically)", tip: "Watch gssoc.girlscript.tech and LinkedIn for announcements" },
      { phase: "Coding period", when: "May – July" , tip: "3 months of contributing to selected projects"},
      { phase: "Results & certificates", when: "August", tip: "LORs sent to top 25 contributors" },
    ],
    tips: [
      "GSSoC is the best first open-source program — use it to build confidence before GSoC or LFX.",
      "Focus on Level 2–3 issues, not just Level 1. Higher-difficulty contributions build real skills and more points.",
      "Quality matters — maintainers can reject low-effort PRs. Read contributing guidelines before submitting.",
      "Use GSSoC as a stepping stone: document your contributions, then reference them in your GSoC proposal.",
      "Even without a stipend, a LOR from a project maintainer is valuable for internship applications.",
    ],
  },
];

/* ─── Difficulty badge colour ──────────────────────────────── */
function difficultyStyle(d: Program["difficulty"]) {
  if (d === "Beginner-friendly") return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
  if (d === "Intermediate")      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
  return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
}

/* ─── Filter types ─────────────────────────────────────────── */
type Filter = "All" | "Paid" | "Beginner-friendly" | "Competitive";

/* ─── Component ────────────────────────────────────────────── */
export default function OpenSourcePage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [tab, setTab] = useState<Record<string, "steps" | "timeline" | "tips">>({});

  const filtered = programs.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Paid") return !p.stipend.startsWith("No");
    if (filter === "Beginner-friendly") return p.difficulty === "Beginner-friendly";
    if (filter === "Competitive") return p.difficulty === "Competitive";
    return true;
  });

  function getTab(id: string): "steps" | "timeline" | "tips" {
    return tab[id] ?? "steps";
  }
  function setTabFor(id: string, t: "steps" | "timeline" | "tips") {
    setTab((prev) => ({ ...prev, [id]: t }));
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-24">

      {/* ── Page header ── */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Career Pathways
        </p>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Open Source Programs</h1>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          Paid mentorships and contribution programs that build real engineering skills, open-source credibility, and — in several cases — direct fast-tracks into Big Tech and top startups.
          These are some of the best resume signals available to students outside of campus placement.
        </p>
      </div>


      {/* ── Filter tabs ── */}
      <div className="flex gap-2 mb-8 flex-wrap items-center">
        {(["All", "Paid", "Beginner-friendly", "Competitive"] as Filter[]).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
              filter === f
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            }`}>
            {f}
          </button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">{filtered.length} programs</span>
      </div>

      {/* ── Program cards ── */}
      <div className="space-y-3">
        {filtered.map((p) => {
          const isOpen = expanded === p.id;
          const activeTab = getTab(p.id);
          return (
            <div key={p.id}
              className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                isOpen ? "border-foreground/20 shadow-sm" : "border-border"
              }`}>

              {/* ── Card header ── */}
              <button
                onClick={() => setExpanded(isOpen ? null : p.id)}
                className="w-full text-left px-5 py-4 flex items-start gap-4">

                {/* Logo mark */}
                <div className="w-11 h-11 rounded-xl shrink-0 mt-0.5 flex items-center justify-center"
                  style={{ backgroundColor: p.orgColor }}>
                  <span style={{ color:"#fff", fontSize: p.mark.length > 2 ? 10 : 13, fontWeight:800, fontFamily:"sans-serif", letterSpacing:"-0.5px" }}>
                    {p.mark}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{p.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${difficultyStyle(p.difficulty)}`}>
                      {p.difficulty}
                    </span>
                    {p.stipend.startsWith("No") ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-border text-muted-foreground">No stipend</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold border border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400">
                        {p.stipend}
                      </span>
                    )}
                    {p.type === "Individual"
                      ? <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground border border-border rounded-full px-2 py-0.5"><User className="w-2.5 h-2.5" />Individual</span>
                      : <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground border border-border rounded-full px-2 py-0.5"><Users className="w-2.5 h-2.5" />Team</span>
                    }
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{p.tagline}</p>

                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3" />{p.duration}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Globe className="w-3 h-3" />{p.org}
                    </span>
                  </div>
                </div>

                <ChevronDown className={`w-4 h-4 shrink-0 mt-1 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {/* ── Expanded body ── */}
              {isOpen && (
                <div className="border-t border-border">

                  {/* About */}
                  <div className="px-5 pt-5 pb-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.about}</p>
                  </div>

                  {/* Stipend callout */}
                  <div className="mx-5 mb-4 rounded-xl border border-border bg-card px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-1.5">
                      <Trophy className="w-3 h-3" /> Stipend / Rewards
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.stipendNote}</p>
                  </div>

                  {/* Tags */}
                  <div className="px-5 mb-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg border border-border text-[10px] text-muted-foreground">{t}</span>
                    ))}
                  </div>

                  {/* Tab switcher */}
                  <div className="px-5 mb-4 flex gap-1 border-b border-border pb-0">
                    {([
                      { key: "steps",    label: "How to Apply",     icon: BookOpen },
                      { key: "timeline", label: "Timeline",         icon: CalendarDays },
                      { key: "tips",     label: "Pro Tips",         icon: Zap },
                    ] as { key: "steps"|"timeline"|"tips"; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
                      <button key={key}
                        onClick={() => setTabFor(p.id, key)}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                          activeTab === key
                            ? "border-foreground text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}>
                        <Icon className="w-3 h-3" />{label}
                      </button>
                    ))}
                  </div>

                  {/* Tab content */}
                  <div className="px-5 pb-5">

                    {/* Steps tab */}
                    {activeTab === "steps" && (
                      <div className="space-y-0">
                        {p.steps.map((s, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="w-6 h-6 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center shrink-0">
                                {i + 1}
                              </div>
                              {i < p.steps.length - 1 && <div className="w-px flex-1 bg-border mt-1 mb-1" />}
                            </div>
                            <div className="pb-5">
                              <p className="text-sm font-semibold text-foreground mb-1">{s.title}</p>
                              <p className="text-xs text-muted-foreground leading-relaxed">{s.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Timeline tab */}
                    {activeTab === "timeline" && (
                      <div className="space-y-2">
                        {p.timeline.map((t, i) => (
                          <div key={i} className="flex gap-3 py-2.5 border-b border-border last:border-0">
                            <div className="w-5 h-5 rounded-full bg-foreground/10 text-foreground text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {i + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-baseline gap-2">
                                <span className="text-sm font-semibold text-foreground">{t.phase}</span>
                                <span className="text-xs text-muted-foreground">{t.when}</span>
                              </div>
                              {t.tip && (
                                <p className="text-[11px] text-muted-foreground/70 mt-0.5 italic">{t.tip}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tips tab */}
                    {activeTab === "tips" && (
                      <ul className="space-y-3">
                        {p.tips.map((tip, i) => (
                          <li key={i} className="flex gap-2.5">
                            <CircleCheck className="w-4 h-4 shrink-0 mt-0.5 text-green-500" />
                            <span className="text-xs text-muted-foreground leading-relaxed">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* CTA footer */}
                  <div className="px-5 pb-5 pt-1 border-t border-border flex flex-wrap gap-3">
                    <Link href={`/open-source/${p.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-80 transition-opacity">
                      Full Guide →
                    </Link>
                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                      Official Site <ExternalLink className="w-3 h-3" />
                    </a>
                    <a href="https://github.com/explore" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                      <GitMerge className="w-3 h-3" /> Browse projects on GitHub
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Quick comparison table ── */}
      {/* ── Why open source matters (moved below cards) ── */}
      <div className="rounded-2xl border border-border bg-card px-5 py-4 mb-8 space-y-2">
        <p className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-yellow-500" /> Why open source matters for your career
        </p>
        <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
          <li className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-muted-foreground/50" />GSoC and LFX on your resume are immediately recognised by Google, Meta, Amazon, and top startups as strong signals of real engineering ability.</li>
          <li className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-muted-foreground/50" />Open source contributions give you production-grade code experience at projects used by millions — something internships rarely offer this early.</li>
          <li className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-muted-foreground/50" />Many programs pay $3,000–$7,000 USD — competitive with or better than most Indian internship stipends.</li>
          <li className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-muted-foreground/50" />For off-campus candidates, open source is the single most effective resume differentiator.</li>
        </ul>
      </div>

      <div className="mt-12 mb-2">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Quick Comparison
        </p>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Program</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Stipend</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Duration</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Bar</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p, i) => (
                <tr key={p.id} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-accent/5"}`}>
                  <td className="px-4 py-3 font-medium text-foreground">
                    <Link href={`/open-source/${p.slug}`} className="hover:underline underline-offset-4">{p.shortName}</Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.stipend}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.duration}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${difficultyStyle(p.difficulty)}`}>
                      {p.difficulty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Recommended path note ── */}
      <div className="mt-6 rounded-2xl border border-border bg-card px-5 py-4 text-xs text-muted-foreground leading-relaxed">
        <strong className="font-semibold text-foreground">Recommended progression:</strong>{" "}
        Start with <strong className="text-foreground">GSSoC</strong> to build your first open-source PRs →
        Apply to <strong className="text-foreground">LFX Mentorship</strong> or <strong className="text-foreground">Outreachy</strong> in your 2nd year →
        Target <strong className="text-foreground">GSoC</strong> in your pre-final year with a strong proposal backed by prior contributions.
        Each program builds the foundation for the next.
      </div>

      {/* ── Disclaimer ── */}
      <p className="mt-6 text-[10px] text-muted-foreground/60 leading-relaxed">
        Program dates, stipend amounts, and eligibility criteria change annually. Always verify on official program websites before applying. This page is maintained by the OpportunityCircle community and may not reflect the latest updates.
      </p>
    </div>
  );
}
