import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  OSBreadcrumb, SectionLabel, StatCard, DiffBox, StepBlock,
  TimelineRow, TipItem, ResourceLink, SimilarPrograms, StipendBox, OSDisclaimer,
} from "@/components/open-source/OpenSourceLayout";

export const metadata = {
  title: "LFX Mentorship (Linux Foundation) — Open Source Program Guide",
  description:
    "Complete guide to LFX Mentorship — how to apply, CNCF projects, stipend details, Spring/Summer/Fall terms, and tips for getting selected.",
};

export default function LFXPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">
      <OSBreadcrumb program="LFX Mentorship" />

      {/* ── Header ── */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-[#003399] flex items-center justify-center shrink-0">
            <span style={{ color: "#fff", fontSize: 14, fontWeight: 800, fontFamily: "sans-serif", letterSpacing: "-0.5px" }}>LF</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">LFX Mentorship</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Linux Foundation ·{" "}
              <a href="https://mentorship.lfx.linuxfoundation.org/" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                mentorship.lfx.linuxfoundation.org <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {["Linux Foundation", "CNCF", "Kubernetes", "3 Terms / Year", "Paid Stipend", "Intermediate"].map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>
          ))}
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          LFX Mentorship is the Linux Foundation&apos;s structured paid mentorship program with projects from
          CNCF (Kubernetes, Prometheus, Argo), OpenSSF, Hyperledger, and 50+ other major foundations.
          Three terms per year (Spring, Summer, Fall) with one of the{" "}
          <strong className="font-semibold text-foreground">highest stipends of any open-source program</strong> —
          and less competitive than GSoC for candidates who complete the prerequisite tasks.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatCard label="Stipend"        value="$3,000–$6,600"   sub="Full-time · location-based" />
          <StatCard label="Duration"       value="12 weeks"        sub="Full-time · or longer PT" />
          <StatCard label="Terms per year" value="3 terms"         sub="Spring · Summer · Fall" />
        </div>
      </header>

      <Separator className="mb-10" />

      {/* ── StipendBox ── */}
      <div className="mb-10">
        <StipendBox
          amount="$3,000 – $6,600 USD"
          note="Stipend varies by term (full-time vs part-time) and location. Paid in two equal installments: 50% at midterm evaluation (end of week 6), 50% on successful completion and final evaluation (end of week 12). Indian participants typically receive $3,000–$4,500 for a full-time 12-week term. One of the highest-paying open-source programs globally."
        />
      </div>

      <Separator className="mb-10" />

      {/* ── What makes LFX different ── */}
      <section className="mb-10">
        <SectionLabel>What makes LFX different</SectionLabel>
        <div>
          <DiffBox icon="☁️" title="CNCF projects are resume gold for cloud-native roles">
            LFX hosts more CNCF projects than any other mentorship program. Contributing to Kubernetes,
            Prometheus, Argo CD, Helm, Linkerd, or Jaeger during LFX is immediately legible to cloud-native
            hiring teams at AWS, Google Cloud, Datadog, HashiCorp, and any company running Kubernetes in production.
            These are not toy projects — your contributions go into production infrastructure used by Fortune 500 companies.
          </DiffBox>
          <DiffBox icon="📋" title="The prerequisite task is eliminatory — not optional">
            Most LFX projects list a specific prerequisite task that applicants must complete during the
            application window: fix a tagged bug, write a test, create documentation, or implement a small feature.
            These tasks are listed on the project page and are strictly enforced — if you don&apos;t complete them,
            your application is not reviewed, regardless of how strong your Statement of Purpose is.
            This is the #1 reason candidates fail to advance.
          </DiffBox>
          <DiffBox icon="📅" title="Three terms per year — multiple chances annually">
            Unlike GSoC (once per year), LFX runs three terms: Spring (March–May), Summer (June–August), and
            Fall (September–November). Applications open roughly 6–8 weeks before each term. If you miss the
            Summer term, Fall is only a few months away. This makes LFX significantly more accessible from a
            scheduling perspective, especially for students on non-standard academic calendars.
          </DiffBox>
          <DiffBox icon="🔒" title="Security and infrastructure projects — a niche with low supply">
            LFX hosts many OpenSSF (Open Source Security Foundation) projects focused on supply chain security,
            SBOM, and infrastructure hardening. Very few students target security and infrastructure projects —
            which means competition is significantly lower than for web/ML projects of similar quality.
            If your background includes systems, networking, or security, LFX is an underexplored opportunity.
          </DiffBox>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* ── How to Apply ── */}
      <section className="mb-10">
        <SectionLabel>How to Apply — Step by Step</SectionLabel>
        <div>
          <StepBlock step="1" label="Create your LFX Mentee profile" tag="Required before applying">
            Go to mentorship.lfx.linuxfoundation.org and sign up or log in with your Linux Foundation account.
            Create a Mentee profile — upload your resume (PDF), add your GitHub and LinkedIn URLs, and fill in
            your technical background. A complete profile is required to apply to any project. Incomplete
            profiles are automatically excluded from mentor review.
          </StepBlock>
          <StepBlock step="2" label="Browse projects and select your targets" tag="Filter by 'Accepting Applications'">
            Navigate to the Mentorships section and filter by &quot;Accepting Applications&quot;. Each project
            lists its technology stack, expected deliverables, mentors, and prerequisite tasks.
            Apply to 3–5 projects — don&apos;t put all effort into one. Read CNCF and OpenSSF projects carefully;
            these have the strongest hiring signal for cloud-native and security roles.
          </StepBlock>
          <StepBlock step="3" label="Complete the prerequisite task" tag="Eliminatory — do this first">
            Every project with a prerequisite task lists it on the project page. Do this before writing
            your Statement of Purpose. Typical tasks: fix a tagged issue, write a unit test, document
            an API endpoint, create a small feature. Submit your PR and include the link in your application.
            Mentors reject applications without completed prerequisite tasks before reading anything else.
          </StepBlock>
          <StepBlock step="4" label="Join the project community" tag="Before applying">
            Most CNCF projects are on cloud-native.slack.com (free to join at slack.cncf.io). Join the
            project&apos;s Slack channel, introduce yourself, and read recent PR discussions. Understanding what
            the team is actively working on dramatically improves the quality of your Statement of Purpose —
            you can reference real ongoing work instead of generic project goals.
          </StepBlock>
          <StepBlock step="5" label="Write a tailored Statement of Purpose" tag="Core of your application">
            Your SoP is a cover letter tailored to the specific project. Cover: what the project does (in
            your own words, not copy-pasted), what the specific mentorship project involves, your relevant
            skills, your approach to the prerequisite task, and why you&apos;re a good fit for this specific
            project — not open source in general. Generic SoPs are quickly spotted and rejected.
          </StepBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* ── Timeline ── */}
      <section className="mb-10">
        <SectionLabel>Program Timeline — 3 Terms per Year</SectionLabel>
        <div>
          <TimelineRow phase="Spring Term — Applications" when="February" tip="Term runs March – May · Check mentorship.lfx.linuxfoundation.org for exact dates" />
          <TimelineRow phase="Spring Term — Program" when="March – May" tip="12 weeks full-time. Midterm eval at week 6." />
          <TimelineRow phase="Summer Term — Applications" when="May" tip="Term runs June – August" />
          <TimelineRow phase="Summer Term — Program" when="June – August" tip="Most competitive term — highest applicant volume" />
          <TimelineRow phase="Fall Term — Applications" when="July – August" tip="Term runs September – November" />
          <TimelineRow phase="Fall Term — Program" when="September – November" tip="Less competition than Summer — often overlooked" />
          <TimelineRow phase="Stipend payments" when="Week 6 (50%) + Week 12 (50%)" tip="Must pass midterm and final evaluations" />
        </div>
      </section>

      <Separator className="mb-10" />

      {/* ── Pro Tips ── */}
      <section className="mb-10">
        <SectionLabel>How to get selected</SectionLabel>
        <ul className="space-y-3">
          <TipItem
            bold="The prerequisite task is non-negotiable:"
            text="Do not spend 10 hours writing a beautiful SoP before completing the prerequisite task. Mentors reject incomplete applications before reading the SoP. Task first, SoP second."
          />
          <TipItem
            bold="CNCF projects = best career ROI:"
            text="Kubernetes, Argo, Prometheus, Helm, and other CNCF projects are immediately recognizable to cloud-native engineering teams. If you're targeting cloud infrastructure, DevOps, or SRE roles, prioritise CNCF projects over less-known foundations."
          />
          <TipItem
            bold="Fall term is underrated:"
            text="Most students apply in Summer because it coincides with their semester break. Fall has noticeably lower competition for the same quality projects — same stipend, same experience, fewer applicants."
          />
          <TipItem
            bold="Apply to 3–5 projects, not just 1:"
            text="LFX allows multiple concurrent applications. Apply to 3–5 projects and tailor each SoP. Acceptance is per-project and depends heavily on who else applied — diversification is your safety net."
          />
          <TipItem
            bold="Join Slack before applying:"
            text="Mentors notice applicants who've been active on Slack before the application window closes. A well-timed, thoughtful question in the project Slack channel is worth more than a paragraph in your SoP."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      {/* ── Resources ── */}
      <section className="mb-10">
        <SectionLabel>Official Resources</SectionLabel>
        <div>
          <ResourceLink
            href="https://mentorship.lfx.linuxfoundation.org/"
            label="LFX Mentorship Portal"
            description="Official platform — project listings, Mentee profile creation, and application portal"
          />
          <ResourceLink
            href="https://docs.linuxfoundation.org/lfx/mentorship"
            label="LFX Mentorship Docs"
            description="Official documentation for mentees — application guide, evaluation process, and stipend FAQ"
          />
          <ResourceLink
            href="https://slack.cncf.io"
            label="CNCF Slack (slack.cncf.io)"
            description="Join the CNCF community Slack — find the channel for your target project before applying"
          />
          <ResourceLink
            href="https://github.com/cncf/mentoring"
            label="CNCF Mentoring GitHub"
            description="Source of truth for CNCF mentorship projects — project proposals, past terms, and contributor guides"
          />
          <ResourceLink
            href="https://www.youtube.com/@linuxfoundation"
            label="Linux Foundation YouTube"
            description="Mentee experience talks, KubeCon sessions, and project walkthroughs"
          />
        </div>
      </section>

      <Separator className="mb-10" />

      {/* ── Similar Programs ── */}
      <section className="mb-10">
        <SectionLabel>Similar Programs to Explore</SectionLabel>
        <SimilarPrograms programs={[
          { name: "GSoC",           slug: "gsoc" },
          { name: "Outreachy",      slug: "outreachy" },
          { name: "MLH Fellowship", slug: "mlh-fellowship" },
          { name: "GSSoC",          slug: "gssoc" },
        ]} />
      </section>

      <OSDisclaimer program="LFX Mentorship" />
    </article>
  );
}
