import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  OSBreadcrumb,
  SectionLabel,
  StatCard,
  DiffBox,
  StepBlock,
  TimelineRow,
  TipItem,
  ResourceLink,
  SimilarPrograms,
  StipendBox,
  OSDisclaimer,
} from "@/components/open-source/OpenSourceLayout";

export const metadata: Metadata = {
  title: "MLH Fellowship — Open Source Program Guide",
  description:
    "Complete guide to the MLH Fellowship — 12-week remote program, up to $5,000 stipend, rolling admissions, open source and startup tracks.",
};

export default function MLHFellowshipPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">

      {/* ── 1. Breadcrumb ── */}
      <OSBreadcrumb program="MLH Fellowship" />

      {/* ── 2. Header ── */}
      <section className="mb-10">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-[#E31337] flex items-center justify-center shrink-0">
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 800, fontFamily: "sans-serif", letterSpacing: "-0.5px" }}>MLH</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold tracking-tight">MLH Fellowship</h1>
              {["Up to $5,000", "12 Weeks", "Rolling Admissions", "Year-Round", "3 Tracks", "Remote"].map((b) => (
                <Badge key={b} variant="outline" className="text-[10px] font-medium">
                  {b}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              MLH Fellowship is a 12-week remote program that runs{" "}
              <strong className="text-foreground">year-round with rolling admissions</strong> — no annual deadline to
              miss. Work on real open-source projects used by companies like Meta and GitHub, get paid a stipend, and
              build a network of engineers from around the world.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Stipend" value="Up to $5,000" sub="Varies by region & batch" />
          <StatCard label="Duration" value="12 weeks" sub="20–30 hrs/week" />
          <StatCard label="Admissions" value="Rolling" sub="Year-round · 3 tracks" />
        </div>
      </section>

      <Separator className="mb-10" />

      {/* ── 3. What makes MLH Fellowship different ── */}
      <section className="mb-10">
        <SectionLabel>What makes MLH Fellowship different</SectionLabel>
        <DiffBox icon="🔄" title="Rolling admissions — no once-a-year deadline">
          Unlike GSoC (one application window per year) or Outreachy (two cohorts), MLH Fellowship runs multiple
          cohorts throughout the year with rolling admissions. If you miss one batch, the next one starts in a few
          months. This makes it uniquely accessible for students with varying academic calendars.
        </DiffBox>
        <DiffBox icon="🛤️" title="Three distinct tracks for different goals">
          Open Source track: contribute to established OSS projects (CPython, FastAPI, React, Kubernetes). Explorer
          track: build your own project with a team of fellows. Startup track: work at an early-stage startup as an
          intern alternative. Each track has different outcomes — choose based on your career goals.
        </DiffBox>
        <DiffBox icon="💼" title="Real OSS projects used in production">
          The Open Source track places fellows on projects actively used by millions of developers. Contributions go
          into production codebases with real users. This is qualitatively different from most internship toy projects.
        </DiffBox>
        <DiffBox icon="🌐" title="Global cohort & network">
          MLH selects fellows from around the world. Weekly standups, peer code reviews, and cohort events create a
          genuine engineering peer network. Many fellows collaborate on side projects or refer each other for jobs
          after the program.
        </DiffBox>
      </section>

      <Separator className="mb-10" />

      {/* ── 4. How to apply ── */}
      <section className="mb-10">
        <SectionLabel>How to apply</SectionLabel>
        <StepBlock step="1" label="Choose your track" tag="Strategic decision">
          Pick your track before applying: Open Source (best resume signal for OSS/engineering roles), Explorer (best
          for building product experience), Startup (best as an internship replacement). Your track selection shapes
          the technical interview focus.
        </StepBlock>
        <StepBlock step="2" label="Polish your GitHub profile" tag="Most evaluated signal">
          Your GitHub is evaluated heavily in the application. Ensure: 3–5 pinned projects with clear READMEs,
          consistent commit history, well-structured code. A sparse or messy GitHub profile is a fast rejection.
        </StepBlock>
        <StepBlock step="3" label="Submit application" tag="fellowship.mlh.io">
          Fill in the application with your GitHub, programming experience, and motivation. For the Open Source track,
          mention specific projects you want to contribute to and why. Generic &apos;I love open source&apos; answers are weak.
        </StepBlock>
        <StepBlock step="4" label="Behavioral interview" tag="Team fit · 30 min">
          If shortlisted: a behavioral interview about your background, how you collaborate, how you handle feedback,
          and how you communicate under pressure. MLH places you in teams — they select for team players explicitly.
        </StepBlock>
        <StepBlock step="5" label="Technical interview" tag="DSA + project discussion">
          A coding challenge (Easy–Medium DSA) + discussion of your past projects at a technical depth. Know your
          projects well — not just what you built but the architecture, why you chose the stack, and what you&apos;d
          improve.
        </StepBlock>
      </section>

      <Separator className="mb-10" />

      {/* ── 5. Timeline ── */}
      <section className="mb-10">
        <SectionLabel>Timeline</SectionLabel>
        <TimelineRow
          phase="Applications open"
          when="Rolling — always open"
          tip="Check fellowship.mlh.io for the next cohort start date"
        />
        <TimelineRow
          phase="Interviews"
          when="Within 2 weeks of applying"
          tip="Apply at least 4–6 weeks before your target cohort start"
        />
        <TimelineRow
          phase="Cohort starts"
          when="Roughly every 3 months"
          tip="Multiple cohorts per year — check the website for upcoming dates"
        />
        <TimelineRow
          phase="12-week program"
          when="Full cohort period"
          tip="20–30 hrs/week. Weekly standups, code reviews, cohort events."
        />
      </section>

      <Separator className="mb-10" />

      {/* ── 6. What they look for ── */}
      <section className="mb-10">
        <SectionLabel>What they look for</SectionLabel>
        <ul className="space-y-3">
          <TipItem
            bold="Apply 4–6 weeks early:"
            text="Rolling admissions doesn't mean infinite capacity. Cohorts fill up before the start date. Apply early enough to complete interviews and onboarding."
          />
          <TipItem
            bold="GitHub is your resume here:"
            text="Clean up your GitHub before applying. Pin 3–4 strong projects. Add READMEs. Make commits meaningful. A well-maintained GitHub is worth more than a well-written cover letter for this program."
          />
          <TipItem
            bold="Name specific OSS projects you want to work on:"
            text="In your application and interviews, name real projects (CPython, FastAPI, Kubernetes, React) and explain why. Vague enthusiasm is weak — specific interest is strong."
          />
          <TipItem
            bold="Prepare DSA (Easy–Medium):"
            text="The technical interview includes DSA problems. Prepare 50–100 LeetCode Easy–Medium problems. Arrays, Strings, Hashmaps, Trees are the most common topics."
          />
          <TipItem
            bold="The Open Source track has the best ROI for resumes:"
            text="Contributing to CPython, FastAPI, or a CNCF project during MLH Fellowship is a stronger resume signal than most academic projects. Prioritise the Open Source track if your goal is engineering job applications."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      {/* ── 7. Useful Resources ── */}
      <section className="mb-10">
        <SectionLabel>Useful resources</SectionLabel>
        <ResourceLink
          href="https://fellowship.mlh.io/"
          label="fellowship.mlh.io"
          description="Official site — application portal, cohort dates, and track information"
        />
        <ResourceLink
          href="https://github.com/explore"
          label="GitHub Explore"
          description="Browse trending open source projects across all languages — find projects you want to contribute to before applying"
        />
        <ResourceLink
          href="https://mlh.io/seasons/fellowship-2025/events"
          label="MLH Events Calendar"
          description="Upcoming cohort dates and fellowship events"
        />
        <ResourceLink
          href="https://dev.to/mlh"
          label="MLH on Dev.to"
          description="Fellow experience write-ups — read what the program is actually like day-to-day"
        />
      </section>

      <Separator className="mb-10" />

      {/* ── 8. Similar Programs ── */}
      <section className="mb-10">
        <SectionLabel>Similar programs</SectionLabel>
        <SimilarPrograms
          programs={[
            { name: "GSoC", slug: "gsoc" },
            { name: "LFX Mentorship", slug: "lfx" },
            { name: "Outreachy", slug: "outreachy" },
            { name: "GSSoC", slug: "gssoc" },
          ]}
        />
      </section>

      <Separator className="mb-10" />

      {/* ── 9. Stipend + Disclaimer ── */}
      <section className="mb-10">
        <StipendBox
          amount="Up to $5,000"
          note="Educational stipend — amount varies by region and batch. Not guaranteed to all participants. Paid during or after the program. Check the current cohort details for the exact amount for your region."
        />
      </section>

      <OSDisclaimer program="MLH Fellowship" />

    </article>
  );
}
