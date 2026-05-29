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
  title: "Outreachy — Open Source Program Guide",
  description:
    "Complete guide to Outreachy — $7,000 USD stipend, contribution-based selection, underrepresented in tech, remote internship.",
};

export default function OutreachyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">

      {/* ── 1. Breadcrumb ── */}
      <OSBreadcrumb program="Outreachy" />

      {/* ── 2. Header ── */}
      <section className="mb-10">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-[#6E40C9] flex items-center justify-center shrink-0">
            <span style={{ color: "#fff", fontSize: 22, fontWeight: 800, fontFamily: "sans-serif" }}>O</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold tracking-tight">Outreachy</h1>
              {["$7,000 USD", "3 Months", "Remote", "Underrepresented in Tech", "2 Cohorts/Year"].map((b) => (
                <Badge key={b} variant="outline" className="text-[10px] font-medium">
                  {b}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Outreachy is a paid remote open-source internship for people underrepresented in the tech industry.
              With a <strong className="text-foreground">$7,000 USD stipend</strong> and a contribution-based selection
              process, it&apos;s one of the most accessible and financially rewarding open-source programs available —
              but the eligibility and selection process are unlike any other.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Stipend" value="$7,000 USD" sub="Flat + $500 travel" />
          <StatCard label="Duration" value="3 months" sub="30–40 hrs/week full-time" />
          <StatCard label="Cohorts" value="2 per year" sub="May–Aug · Dec–Mar" />
        </div>
      </section>

      <Separator className="mb-10" />

      {/* ── 3. What makes Outreachy different ── */}
      <section className="mb-10">
        <SectionLabel>What makes Outreachy different</SectionLabel>
        <DiffBox icon="🎯" title="Contribution period IS the selection">
          Outreachy is unlike most programs: you don&apos;t get selected on your application essays. After your initial
          application is approved, you enter a Contribution Period where you actively contribute to 1–2 projects of
          your choice. Mentors select interns based on the quality and consistency of contributions during this period
          — not your essays. Many strong writers with poor contributions are rejected; many average writers with
          excellent contributions are selected.
        </DiffBox>
        <DiffBox icon="💸" title="Highest flat stipend of any open-source program">
          $7,000 USD is a flat payment for all participants regardless of country. This is higher than many Indian tech
          internship stipends when converted to INR. It is not PPP-adjusted (unlike GSoC) — everyone gets the same
          amount.
        </DiffBox>
        <DiffBox icon="⚠️" title="Strict eligibility — not for everyone">
          Outreachy has specific eligibility requirements: you must face underrepresentation or discrimination in the
          tech industry of your country. Past GSoC contributors are explicitly ineligible. You must be available
          full-time (30–40 hrs/week) with no other internship or full-time job. Students must have 42+ consecutive
          exam-free days. Read the eligibility page carefully before spending time on your application.
        </DiffBox>
        <DiffBox icon="🌍" title="Uniquely diverse project types">
          Unlike GSoC (mostly code), Outreachy accepts projects in documentation, community management, UX/design,
          data science, and infrastructure — alongside traditional coding. This opens the program to non-traditional
          tech backgrounds.
        </DiffBox>
      </section>

      <Separator className="mb-10" />

      {/* ── 4. How to apply ── */}
      <section className="mb-10">
        <SectionLabel>How to apply</SectionLabel>
        <StepBlock step="1" label="Check eligibility before anything else" tag="outreachy.org/eligibility">
          Read the eligibility requirements at outreachy.org/eligibility before writing a single word. Key gates: you
          must be underrepresented in tech in your country; no past GSoC; no full-time job or internship during the
          program; students need 42+ consecutive exam-free days.
        </StepBlock>
        <StepBlock step="2" label="Write your initial application essays" tag="Personal · Eliminatory">
          The initial application includes essay questions about your background, specific experiences with systemic
          bias or discrimination, and your motivation. These are evaluated by Outreachy organisers — be genuine,
          specific, and personal. Generic answers don&apos;t pass. This stage happens before you even see the project
          list.
        </StepBlock>
        <StepBlock step="3" label="Enter the Contribution Period" tag="The real selection">
          Once your initial application is approved, you gain access to the Contribution Period. Browse 1–2 projects
          that interest you. Join their communities (mailing lists, IRC, Matrix, GitHub). Make real contributions —
          code, documentation, translation, UX work — whatever the project accepts. Record each contribution on the
          Outreachy dashboard.
        </StepBlock>
        <StepBlock step="4" label="Submit your Final Application" tag="Per project">
          For each project you contributed to, submit a final application describing your contributions, what you
          learned, and your plan for the full internship. Mentors rank applicants based on contribution quality and
          engagement — this is where interns are actually selected.
        </StepBlock>
        <StepBlock step="5" label="Internship (3 months)" tag="Remote · Full-time">
          Selected interns work 30–40 hours/week for 3 months with a dedicated mentor. Two check-in posts are required
          (week 1 and midpoint). Stipend paid in installments.
        </StepBlock>
      </section>

      <Separator className="mb-10" />

      {/* ── 5. Timeline ── */}
      <section className="mb-10">
        <SectionLabel>Timeline</SectionLabel>
        <TimelineRow
          phase="Initial applications open"
          when="January (May cohort) · August (Dec cohort)"
          tip="Check outreachy.org — exact dates shift slightly each year"
        />
        <TimelineRow
          phase="Initial application deadline"
          when="Late January / Early September"
          tip="Essays due here — allocate 3–5 days to write them well"
        />
        <TimelineRow
          phase="Contribution period"
          when="February–March (May) · September–October (Dec)"
          tip="Contribute actively from day one — don't wait for week 3"
        />
        <TimelineRow
          phase="Interns announced"
          when="March (May cohort) · October (Dec cohort)"
        />
        <TimelineRow
          phase="Internship runs"
          when="May–August · December–March"
          tip="$3,500 at start, $3,500 at midpoint"
        />
      </section>

      <Separator className="mb-10" />

      {/* ── 6. What they look for ── */}
      <section className="mb-10">
        <SectionLabel>What they look for</SectionLabel>
        <ul className="space-y-3">
          <TipItem
            bold="Contribution period > Essays:"
            text="The Outreachy selection happens in the contribution period, not your essays. Strong contributors with average essays are selected over great writers who contribute little. Prioritise contribution quality."
          />
          <TipItem
            bold="Pick projects you can contribute to immediately:"
            text="Choose projects in your existing tech stack. If setup takes 3 days, you've lost a week of contribution time. Start with the project whose README you can follow fastest."
          />
          <TipItem
            bold="Communicate publicly:"
            text="Post questions on mailing lists, GitHub issues, and project channels — not just DMs. Mentors see public communication and it signals genuine engagement with the community."
          />
          <TipItem
            bold="Past GSoC participants are ineligible:"
            text="This is strictly enforced. Do not apply if you've been a GSoC contributor — your application will be rejected."
          />
          <TipItem
            bold="Applications open twice a year:"
            text="If you miss the May cohort, the December cohort is another shot. Plan ahead — the contribution period requires 4–6 weeks of active participation."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      {/* ── 7. Useful Resources ── */}
      <section className="mb-10">
        <SectionLabel>Useful resources</SectionLabel>
        <ResourceLink
          href="https://www.outreachy.org/"
          label="outreachy.org"
          description="Official site — internship listing, eligibility checker, and application portal"
        />
        <ResourceLink
          href="https://www.outreachy.org/docs/applicant/"
          label="Applicant Guide"
          description="Official documentation for applicants — contribution period, final application, and FAQ"
        />
        <ResourceLink
          href="https://www.outreachy.org/eligibility/"
          label="Eligibility Checker"
          description="Verify your eligibility before writing your application"
        />
        <ResourceLink
          href="https://chat.outreachy.org/"
          label="Outreachy Chat"
          description="Community chat — ask questions, find mentors, connect with past interns"
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
            { name: "MLH Fellowship", slug: "mlh-fellowship" },
            { name: "GSSoC", slug: "gssoc" },
          ]}
        />
      </section>

      <Separator className="mb-10" />

      {/* ── 9. Stipend + Disclaimer ── */}
      <section className="mb-10">
        <StipendBox
          amount="$7,000 USD"
          note="Flat stipend for all participants — not PPP-adjusted. Paid in installments. Additional $500 travel stipend for approved events. One of the highest flat stipends of any open-source program globally."
        />
      </section>

      <OSDisclaimer program="Outreachy" />

    </article>
  );
}
