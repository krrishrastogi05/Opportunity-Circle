import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  OSBreadcrumb, SectionLabel, StatCard, DiffBox, StepBlock,
  TimelineRow, TipItem, ResourceLink, SimilarPrograms, StipendBox, OSDisclaimer,
} from "@/components/open-source/OpenSourceLayout";

export const metadata = {
  title: "Google Summer of Code (GSoC) — Open Source Program Guide",
  description:
    "Complete guide to GSoC — how to apply, write a winning proposal, find the right organization, timeline, stipend details, and pro tips from the open-source community.",
};

export default function GSoCPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">
      <OSBreadcrumb program="Google Summer of Code" />

      {/* ── Header ── */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-[#4285F4] flex items-center justify-center shrink-0">
            <span style={{ color: "#fff", fontSize: 22, fontWeight: 800, fontFamily: "sans-serif" }}>G</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Google Summer of Code</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              summerofcode.withgoogle.com ·{" "}
              <a href="https://summerofcode.withgoogle.com/" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                Apply here <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {["Google Backed", "Global", "Paid Stipend", "Any Year", "180+ Orgs", "Competitive"].map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>
          ))}
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          Google Summer of Code is the world&apos;s most recognised open-source program. Accepted contributors
          work 12–22 weeks on a real open-source project under an experienced mentor, and receive a{" "}
          <strong className="font-semibold text-foreground">paid stipend</strong> adjusted for their country.
          A GSoC contribution on your resume is one of the strongest open-source signals to any engineering team globally.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatCard label="Stipend (India)"  value="~₹1.2L–₹2.5L+"  sub="PPP-adjusted by project size" />
          <StatCard label="Duration"         value="12–22 weeks"     sub="Flexible project scope" />
          <StatCard label="Orgs"             value="180+"            sub="Apache · CNCF · Mozilla · KDE" />
        </div>
      </header>

      <Separator className="mb-10" />

      {/* ── StipendBox ── */}
      <div className="mb-10">
        <StipendBox
          amount="~$1,500 – $3,300 USD"
          note="Stipend is PPP-adjusted based on your country of residence and the project size (Small / Medium / Large). Indian contributors typically receive ₹1.2L–₹2.5L+ depending on scope. Paid via Payoneer in two installments — after midterm evaluation and after final evaluation. You must pass both evaluations to receive both installments."
        />
      </div>

      <Separator className="mb-10" />

      {/* ── What makes GSoC different ── */}
      <section className="mb-10">
        <SectionLabel>What makes GSoC different</SectionLabel>
        <div>
          <DiffBox icon="🌍" title="The most recognised open-source credential globally">
            GSoC alumni work at Google, Meta, Microsoft, Amazon, and every major open-source organization.
            The program has been running since 2005 and has produced over 40,000 contributors across 800+ orgs.
            A GSoC completion on your resume is immediately understood by any engineering recruiter or
            senior engineer worldwide — it signals you can navigate a real codebase, work with mentors, and ship code.
          </DiffBox>
          <DiffBox icon="🏢" title="180+ organizations — choose your ecosystem">
            GSoC orgs span every corner of open source: Apache (Hadoop, Kafka), CNCF (Kubernetes, Prometheus, Argo),
            Mozilla (Firefox, Rust), KDE, Python Software Foundation, OpenCV, TensorFlow, and hundreds more.
            You choose the org — which means you can target the exact technology ecosystem you want to build
            expertise in, whether that&apos;s cloud-native, compilers, ML frameworks, or web infrastructure.
          </DiffBox>
          <DiffBox icon="📝" title="The proposal IS the competition">
            GSoC selection is based almost entirely on your written proposal. The strongest coder with a weak
            proposal loses to a moderate coder with a detailed, well-researched proposal. Mentors read
            proposals to evaluate whether you understand the project, have a realistic plan, and can communicate
            clearly — not just whether you can code. This means the selection is more meritocratic than most
            programs for non-Tier-1 institute students.
          </DiffBox>
          <DiffBox icon="⚡" title="Prior contribution is the real differentiator">
            Across most GSoC orgs, contributors who made at least one merged PR before the proposal deadline
            have 3–5x higher selection rates than those who didn&apos;t. Mentors notice GitHub handles they&apos;ve
            seen in issues and PRs before. Starting contributions in January (not March) is the single
            biggest structural advantage you can give yourself.
          </DiffBox>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* ── How to Apply ── */}
      <section className="mb-10">
        <SectionLabel>How to Apply — Step by Step</SectionLabel>
        <div>
          <StepBlock step="1" label="Find your organisation early (January–February)" tag="Most critical step">
            Browse the org list on summerofcode.withgoogle.com when it opens (typically January). Filter by
            programming language, topic, or technology. Pick 2–3 orgs whose software you&apos;ve actually used or
            want to learn deeply. Read their Ideas pages (linked from the GSoC org entry) — this is where
            mentors propose specific projects. Shortlist 1–2 specific project ideas that match your skills.
          </StepBlock>
          <StepBlock step="2" label="Join the community and contribute before applying" tag="Highest-ROI action">
            Join the org&apos;s communication channels (Slack, Discord, IRC, mailing list). Introduce yourself
            with context: who you are, what you&apos;re interested in, and questions you have about the project.
            Find a &quot;good first issue&quot; on their GitHub and submit a PR — even a docs fix or a small bug.
            This step directly increases your proposal acceptance probability.
          </StepBlock>
          <StepBlock step="3" label="Write a strong proposal (March–April)" tag="The core deliverable">
            A strong GSoC proposal covers: (1) the problem you&apos;re solving and why it matters to the project,
            (2) a detailed technical approach, (3) a week-by-week timeline with concrete milestones,
            (4) your relevant background and prior contributions to this org. Most orgs publish a proposal
            template on their GSoC page — follow it exactly. Proposals that skip the timeline or deliverables
            section are almost always rejected.
          </StepBlock>
          <StepBlock step="4" label="Submit your proposal(s)" tag="Up to 3 proposals allowed">
            Register on the GSoC platform and submit before the April deadline. You can submit proposals
            to up to 3 different orgs — diversify your applications. After submission, continue engaging
            with mentors (answer questions they post on your proposal, refine based on feedback).
          </StepBlock>
          <StepBlock step="5" label="Community Bonding → Coding → Evaluations" tag="May–November">
            Accepted contributors are announced in May. Community Bonding Period (3–4 weeks): meet your
            mentor, understand the codebase, set up your dev environment, and plan your first month.
            Coding Period: work on your project with weekly mentor check-ins. Midterm evaluation (pass to
            receive first stipend installment). Final evaluation (pass to receive final installment).
          </StepBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* ── Timeline ── */}
      <section className="mb-10">
        <SectionLabel>Program Timeline (General — verify at summerofcode.withgoogle.com)</SectionLabel>
        <div>
          <TimelineRow phase="Org applications" when="January – February" tip="Watch the GSoC blog for org list announcement" />
          <TimelineRow phase="Contributor applications open" when="March" tip="Start contributing in January, not March" />
          <TimelineRow phase="Proposal submission deadline" when="April" tip="Submit at least 2 days early — the platform gets slow" />
          <TimelineRow phase="Accepted projects announced" when="May" tip="Notification via GSoC dashboard and email" />
          <TimelineRow phase="Community Bonding Period" when="May – June" tip="Meet mentor, read codebase, plan first 4 weeks of coding" />
          <TimelineRow phase="Coding Period begins" when="June" tip="Commit to your weekly milestone plan" />
          <TimelineRow phase="Midterm evaluation" when="July" tip="Must pass to receive first stipend installment" />
          <TimelineRow phase="Final evaluation" when="August – September" tip="Must pass to receive final installment and GSoC certificate" />
        </div>
      </section>

      <Separator className="mb-10" />

      {/* ── What they look for ── */}
      <section className="mb-10">
        <SectionLabel>How to maximise your selection chances</SectionLabel>
        <ul className="space-y-3">
          <TipItem
            bold="Start contributing in January, not March:"
            text="The proposal window opens in March, but selection rates for contributors who started engaging in January are dramatically higher. Mentors trust people they've already seen in their community."
          />
          <TipItem
            bold="Write the proposal for a technical reader, not an evaluator:"
            text="Mentors are engineers, not HR. They want to see that you understand the technical problem and have a realistic plan. Skip the inspirational intro — get to the technical substance fast."
          />
          <TipItem
            bold="Pick a realistic project size:"
            text="GSoC has Small (90 hrs), Medium (175 hrs), and Large (350 hrs) projects. If you're a first-time contributor, a Small or Medium project with a focused deliverable beats a Large project you can't complete. A successful Small project is better than a failed Large one."
          />
          <TipItem
            bold="Diversify across orgs:"
            text="Apply to 2–3 orgs in different parts of the org list. Different orgs have wildly different competition levels. Some orgs receive 5 proposals per slot; others receive 200. Research proposal competition before committing your effort."
          />
          <TipItem
            bold="Follow up on your proposal after submission:"
            text="Many orgs post questions or feedback on submitted proposals. Check your dashboard daily. A mentor who leaves a comment on your proposal and doesn't hear back often rejects it at ranking time."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      {/* ── Resources ── */}
      <section className="mb-10">
        <SectionLabel>Official Resources</SectionLabel>
        <div>
          <ResourceLink
            href="https://summerofcode.withgoogle.com/"
            label="summerofcode.withgoogle.com"
            description="Official GSoC website — org list, contributor guide, timeline, and application portal"
          />
          <ResourceLink
            href="https://google.github.io/gsocguides/student/"
            label="GSoC Student / Contributor Guide"
            description="Official Google guide on writing proposals, engaging with orgs, and succeeding in the program"
          />
          <ResourceLink
            href="https://developers.google.com/open-source/gsoc/faq"
            label="GSoC FAQ"
            description="Official FAQ — eligibility, stipend, evaluations, and program rules"
          />
          <ResourceLink
            href="https://www.reddit.com/r/gsoc/"
            label="r/gsoc on Reddit"
            description="Community discussion — proposal reviews, org-specific tips, and experience posts from past contributors"
          />
          <ResourceLink
            href="https://github.com/tapaswenipathak/Google-Summer-of-Code"
            label="Curated GSoC Resources (GitHub)"
            description="Community-maintained list of past accepted proposals, org guides, and timeline resources"
          />
        </div>
      </section>

      <Separator className="mb-10" />

      {/* ── Similar Programs ── */}
      <section className="mb-10">
        <SectionLabel>Similar Programs to Explore</SectionLabel>
        <SimilarPrograms programs={[
          { name: "LFX Mentorship",  slug: "lfx" },
          { name: "Outreachy",       slug: "outreachy" },
          { name: "MLH Fellowship",  slug: "mlh-fellowship" },
          { name: "GSSoC",           slug: "gssoc" },
        ]} />
      </section>

      <OSDisclaimer program="Google Summer of Code" />
    </article>
  );
}
