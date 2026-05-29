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
  title: "GirlScript Summer of Code — Open Source Program Guide",
  description:
    "Complete guide to GSSoC — India's largest open source program, certificate + LOR for top contributors, leaderboard system, no stipend, beginner-friendly.",
};

export default function GSSoCPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">

      {/* ── 1. Breadcrumb ── */}
      <OSBreadcrumb program="GSSoC" />

      {/* ── 2. Header ── */}
      <section className="mb-10">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-[#F97316] flex items-center justify-center shrink-0">
            <span style={{ color: "#fff", fontSize: 14, fontWeight: 800, fontFamily: "sans-serif" }}>GSSoC</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold tracking-tight">GirlScript Summer of Code</h1>
              {["India", "No Stipend", "Certificate", "LOR Top 25", "Beginner-Friendly", "Open to All"].map((b) => (
                <Badge key={b} variant="outline" className="text-[10px] font-medium">
                  {b}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              GSSoC is India&apos;s largest and most accessible open-source program — no eligibility restrictions, no
              stipend, but a real path to open-source contributions, certificates, Letters of Recommendation, and a
              launchpad for bigger programs like GSoC and LFX.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Stipend" value="No stipend" sub="Certificate + LOR for top 25" />
          <StatCard label="Duration" value="3 months" sub="May – July" />
          <StatCard label="Access" value="Open to all" sub="No eligibility gate" />
        </div>
      </section>

      <Separator className="mb-10" />

      {/* ── 3. What makes GSSoC different ── */}
      <section className="mb-10">
        <SectionLabel>What makes GSSoC different</SectionLabel>
        <DiffBox icon="🇮🇳" title="India's most accessible open-source entry point">
          GSSoC has zero eligibility restrictions — any student from any year, any institute, any background can
          participate. There is no application essay, no shortlisting interview, and no prior open-source experience
          required. This makes it the ideal starting point for students who have never contributed to open source
          before.
        </DiffBox>
        <DiffBox icon="📊" title="Leaderboard-driven contribution system">
          GSSoC uses a points-based leaderboard. Every merged PR earns points based on difficulty: Level 1 (10 pts),
          Level 2 (25 pts), Level 3 (45 pts). Top 25 on the leaderboard earn a Letter of Recommendation (LOR) from
          project maintainers. Top 50 receive swag. 60+ points earns a certificate of participation.
        </DiffBox>
        <DiffBox icon="🎓" title="Best stepping stone to GSoC and LFX">
          GSSoC alumni have gone on to GSoC and LFX with strong applications backed by documented open-source
          contribution history. The GitHub activity from GSSoC — merged PRs, commit history, issue discussions — is
          exactly what GSoC proposal reviewers and LFX mentors look for.
        </DiffBox>
        <DiffBox icon="📁" title="Projects span all skill levels and domains">
          GSSoC selected projects cover web development, machine learning, mobile apps, DevOps, documentation, and
          more. There is almost always a project in your current tech stack. Projects also range from very
          beginner-friendly to intermediate — you can grow within the program.
        </DiffBox>
      </section>

      <Separator className="mb-10" />

      {/* ── 4. How to apply ── */}
      <section className="mb-10">
        <SectionLabel>How to apply</SectionLabel>
        <StepBlock step="1" label="Register as a contributor" tag="Free · gssoc.girlscript.tech">
          Sign up at gssoc.girlscript.tech. Registration is free and requires only basic information. No essays, no
          interviews. Browse the list of selected projects for the current edition.
        </StepBlock>
        <StepBlock step="2" label="Pick 2–3 projects in your stack" tag="Strategic">
          Don&apos;t spread across 10 projects. Focus on 2–3 where you understand the codebase quickly. Read the
          existing PRs and open issues. Check if the project has a &apos;GSSoC&apos; or &apos;good first issue&apos; label on GitHub —
          those are your entry points.
        </StepBlock>
        <StepBlock step="3" label="Claim issues and submit PRs" tag="Points earned per merged PR">
          Comment on an issue to claim it before starting work (most projects require this). Submit your PR according
          to the contributing guidelines. Each merged PR earns points: Level 1 (docs/minor fixes), Level 2
          (feature/bug fix), Level 3 (complex feature). Aim for Level 2–3 issues for real skill-building.
        </StepBlock>
        <StepBlock step="4" label="Track leaderboard and collect rewards" tag="Top 25 = LOR">
          Monitor the public GSSoC leaderboard. 60+ points = participation certificate. Top 25 = Letter of
          Recommendation. Top 50 = swag. Screenshot and document your contributions — you&apos;ll reference them in future
          GSoC and LFX applications.
        </StepBlock>
      </section>

      <Separator className="mb-10" />

      {/* ── 5. Timeline ── */}
      <section className="mb-10">
        <SectionLabel>Timeline</SectionLabel>
        <TimelineRow
          phase="Program registration & project selection"
          when="March – April"
          tip="Watch gssoc.girlscript.tech and their LinkedIn for announcements"
        />
        <TimelineRow
          phase="Coding / Contribution period"
          when="May – July"
          tip="3 months to contribute. Consistency matters more than a sprint at the end."
        />
        <TimelineRow
          phase="Results, certificates & LORs"
          when="August"
          tip="LORs sent directly to top 25 contributors by project maintainers"
        />
      </section>

      <Separator className="mb-10" />

      {/* ── 6. What they look for ── */}
      <section className="mb-10">
        <SectionLabel>Key criteria</SectionLabel>
        <ul className="space-y-3">
          <TipItem
            bold="GSSoC is a stepping stone, not the destination:"
            text="Use GSSoC to build your first 5–10 merged PRs, document them, and reference them in your GSoC proposal or LFX application. The combination is powerful."
          />
          <TipItem
            bold="Focus on Level 2–3 issues:"
            text="Level 1 (docs, typo fixes) earns 10 points but doesn't build real skills. Level 2–3 issues build understanding of the codebase and earn more points. Both matter — but weight your time toward higher-impact contributions."
          />
          <TipItem
            bold="Quality over quantity:"
            text="Maintainers can reject low-effort PRs. A rejected PR earns zero points. Read the contributing guidelines before writing code. Follow code style, add tests if required, write a clear PR description."
          />
          <TipItem
            bold="Communicate before you code:"
            text="Comment on the issue to claim it. Ask clarifying questions in the issue thread. Maintainers appreciate contributors who understand requirements before submitting a PR, not after."
          />
          <TipItem
            bold="Document everything for future applications:"
            text="Export your GSSoC leaderboard page, save links to merged PRs, and note what each contribution did. This is the raw material for your GSoC proposal and LFX Statement of Purpose."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      {/* ── 7. Useful Resources ── */}
      <section className="mb-10">
        <SectionLabel>Useful resources</SectionLabel>
        <ResourceLink
          href="https://gssoc.girlscript.tech/"
          label="gssoc.girlscript.tech"
          description="Official site — contributor registration, project list, leaderboard"
        />
        <ResourceLink
          href="https://github.com/GirlScriptSummerOfCode"
          label="GSSoC GitHub"
          description="Project list and contributor guidelines"
        />
        <ResourceLink
          href="https://www.linkedin.com/company/girlscript-foundation/"
          label="GSSoC LinkedIn"
          description="Announcements, edition dates, and community updates"
        />
        <ResourceLink
          href="https://unstop.com"
          label="Unstop"
          description="GSSoC occasionally lists on Unstop — check for the latest edition registration"
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
            { name: "MLH Fellowship", slug: "mlh-fellowship" },
          ]}
        />
      </section>

      <Separator className="mb-10" />

      {/* ── 9. Stipend + Disclaimer ── */}
      <section className="mb-10">
        <StipendBox
          amount="No Stipend"
          note="GSSoC does not pay a stipend. Top 25 contributors receive a Letter of Recommendation from project maintainers. Top 50 receive swag (t-shirt, stickers). All contributors with 60+ points or at least one merged PR receive a digital participation certificate."
        />
      </section>

      <OSDisclaimer program="GSSoC" />

    </article>
  );
}
