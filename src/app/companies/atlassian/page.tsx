import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SectionLabel, StatCard, OpportunityBlock, RoundBlock,
  SkillBar, DiffBox, PrepItem, SimilarCompanies, Disclaimer, CompanyBreadcrumb,
} from "@/components/company/CompanyLayout";

export const metadata = {
  title: "Atlassian — Company Profile",
  description:
    "Understand Atlassian India's hiring process — DSA + code quality focus, Managerial & Values round, production-ready code expectations, Bangalore engineering hub.",
};

export default function AtlassianPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">

      {/* 1. Breadcrumb */}
      <CompanyBreadcrumb company="Atlassian" />

      {/* 2. Header */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <CompanyLogo name="Atlassian" slug="atlassian" size={56} rounded="rounded-2xl" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Atlassian</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              atlassian.com ·{" "}
              <a href="https://www.atlassian.com/company/careers" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                atlassian.com/careers <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {["Dev Tools & Collaboration", "Jira · Confluence · Bitbucket", "Bangalore HQ", "Code Quality Focus", "Values-Driven"].map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>
          ))}
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          Atlassian — makers of Jira, Confluence, and Bitbucket — has a significant engineering presence in Bangalore.
          Their process emphasizes{" "}
          <strong className="font-semibold text-foreground">code quality and production-readiness</strong> above raw
          algorithmic complexity. A unique{" "}
          <strong className="font-semibold text-foreground">Managerial &amp; Values (M&amp;V) round</strong> formally
          evaluates cultural alignment with Atlassian&apos;s five core values.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatCard label="DSA Expectation"  value="Moderate"     sub="Easy–Medium focus" />
          <StatCard label="Code Quality"     value="High"         sub="Production-ready standard" />
          <StatCard label="Campus Access"    value="Tier-1 + 2"   sub="IITs · NITs · BITS + select" />
        </div>
      </header>

      <Separator className="mb-10" />

      {/* 3. What makes Atlassian different */}
      <section className="mb-10">
        <SectionLabel>What makes Atlassian different</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Atlassian prioritizes code craftsmanship and cultural alignment over pure algorithmic horsepower.
        </p>
        <div>
          <DiffBox icon="✅" title="Production-ready code is the standard">
            Atlassian explicitly expects interviewees to write code as if it were going to production.
            Use meaningful variable names, handle edge cases, add comments where helpful, and structure
            your code modularly. Hacky code that just passes test cases is a red flag here.
          </DiffBox>
          <DiffBox icon="🏛️" title="Managerial & Values (M&V) is a dedicated, non-skippable round">
            Atlassian has a formal M&amp;V round that evaluates alignment with their five core values:
            Open company no BS, Build with heart and balance, Don&apos;t #@!% the customer, Play as a team, and Be the change you seek.
            You must come with concrete stories mapped to these values — generic behavioral answers fail this round.
          </DiffBox>
          <DiffBox icon="🔍" title="OA on HackerRank — 3 problems in 90 min">
            Atlassian&apos;s OA is well-known: 3 coding problems across 90 minutes on HackerRank, ranging
            Easy to Hard. Speed and accuracy both matter — the OA is eliminatory and shortlisting is competitive,
            especially for off-campus applicants.
          </DiffBox>
          <DiffBox icon="🌐" title="TEAM Anywhere — distributed-first company">
            Atlassian operates as a distributed-first company with no required in-office days.
            The Bangalore engineering team contributes to the same global codebase as Sydney and New York.
            This culture means engineers are expected to communicate exceptionally well in writing and async formats.
          </DiffBox>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 4. Opportunities */}
      <section className="mb-10">
        <SectionLabel>Opportunities in India</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Atlassian hires from campuses and off-campus for both internship and full-time engineering roles in Bangalore.
        </p>
        <div>
          <OpportunityBlock
            title="SWE Internship"
            type="Internship · 3 months"
            access="Campus (Tier-1 & 2) + Off-campus"
          >
            <p>
              Atlassian recruits from IITs, NITs, BITS, and select other institutes during placement season.
              Off-campus applications via the{" "}
              <a href="https://www.atlassian.com/company/careers" target="_blank" rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                careers portal <ExternalLink className="w-3 h-3 inline" />
              </a>{" "}
              or Unstop are also open. Interns work on real product features (Jira, Confluence, Bitbucket)
              with production impact.
            </p>
          </OpportunityBlock>

          <OpportunityBlock
            title="Graduate SWE (Full-Time)"
            type="Full-time · Entry Level"
            access="Campus + careers.atlassian.com"
          >
            <p>
              Full-time graduate SWE roles via campus placement and the careers portal. Atlassian also
              occasionally lists roles on Unstop. The full-time loop adds an additional technical round to
              the intern process. Referrals from current Atlassians improve response rates significantly.
            </p>
          </OpportunityBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 5. Interview Process */}
      <section className="mb-10">
        <SectionLabel>Interview Process (3–4 rounds)</SectionLabel>
        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
          Intern loop: OA → Technical × 1–2 → M&V. Full-time: OA → Technical × 2 → M&V. Code quality is evaluated in every technical round.
        </p>
        <div>
          <RoundBlock round="1" label="Online Assessment" tag="HackerRank · 90 min · 3 problems">
            3 problems across 90 minutes. Easy to Hard difficulty. Topics: Arrays, Trees, DP, Greedy.
            Pass all test cases — Atlassian&apos;s OA elimination is strict. Write clean, efficient code.
            This is the primary shortlisting filter for off-campus candidates.
          </RoundBlock>
          <RoundBlock round="2" label="Technical Interview × 1–2" tag="DSA + code quality · 45–60 min each">
            Live DSA problem-solving via Zoom. Interviewers explicitly evaluate code quality —
            variable naming, modularity, edge case handling, and structure. You may be asked to implement
            a data structure from scratch or optimize an existing solution. The interviewer may ask you to
            adapt your solution if requirements change mid-problem — a signal of real-world readiness.
          </RoundBlock>
          <RoundBlock round="3" label="Managerial & Values (M&V) Round" tag="Core values · 30–45 min">
            A formal, dedicated behavioral round. You will be asked to share specific stories
            demonstrating Atlassian&apos;s five core values — particularly &ldquo;Build with heart and balance&rdquo;,
            &ldquo;Don&apos;t #@!% the customer&rdquo;, and &ldquo;Play as a team&rdquo;.
            Research the values deeply and prepare 2–3 STAR stories per value. Generic answers fail.
            Interviewer also discusses your career goals and interest in Atlassian&apos;s products.
          </RoundBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 6. Skill Importance */}
      <section className="mb-10">
        <SectionLabel>Skill Importance at Atlassian</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          ●●● = widely essential · ●●○ = generally important · ●○○ = sometimes relevant
        </p>
        <div>
          <SkillBar label="Code quality (naming, structure, edge cases)" level={3} note="explicitly evaluated" />
          <SkillBar label="DSA (Data Structures & Algorithms)"           level={3} note="Easy–Medium primary focus" />
          <SkillBar label="Atlassian values alignment (M&V round)"       level={3} note="dedicated non-skippable round" />
          <SkillBar label="Communication & thought process"              level={2} note="async culture value" />
          <SkillBar label="LLD / System Design"                         level={2} note="may appear in technical rounds" />
          <SkillBar label="CS Fundamentals (OS, DBMS)"                  level={1} note="rarely directly tested" />
          <SkillBar label="Machine Coding"                              level={1} note="not a standard round" />
        </div>
        <p className="text-xs text-muted-foreground/60 italic mt-4">
          Atlassian&apos;s biggest differentiator: candidates who write clean production-quality code beat those who write correct-but-messy code.
        </p>
      </section>

      <Separator className="mb-10" />

      {/* 7. Preparation Guide */}
      <section className="mb-10">
        <SectionLabel>How to prepare</SectionLabel>
        <ul className="space-y-3">
          <PrepItem
            bold="Code quality over cleverness:"
            text="Practice writing production-quality code in interviews — meaningful variable names, modular functions, clear comments. After solving a LeetCode problem, review your code for readability before submitting."
          />
          <PrepItem
            bold="DSA — HackerRank style OA prep:"
            text="Practice 3-problem sets in 90 minutes to simulate the OA. Focus on Easy to Medium topics: Arrays, Trees, Greedy, DP. Pass all edge cases — Atlassian's OA filter is strict."
          />
          <PrepItem
            bold="Learn Atlassian's 5 core values deeply:"
            text="Research the values at atlassian.com/company/values. For each value, prepare 1–2 concrete STAR stories from your own experience. 'Build with heart and balance', 'Play as a team', and 'Be the change you seek' are the most commonly probed."
          />
          <PrepItem
            bold="Practice adapting to changing requirements:"
            text="Atlassian interviewers sometimes modify the problem mid-round. Practice handling this — 'what if the constraint changed to X?' — by treating your first solution as extensible rather than final."
          />
          <PrepItem
            bold="Know what Atlassian's products do:"
            text="Understand Jira (issue tracking), Confluence (team wiki), Bitbucket (code hosting), and Trello. Knowing the product helps in the M&V round and shows genuine interest beyond just the job title."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      {/* 8. Similar Companies */}
      <section className="mb-10">
        <SectionLabel>Similar Companies to Explore</SectionLabel>
        <SimilarCompanies companies={[
          { name: "Rippling",   slug: "rippling" },
          { name: "Microsoft",  slug: "microsoft" },
          { name: "Google",     slug: "google" },
          { name: "Uber",       slug: "uber" },
          { name: "Razorpay",   slug: "razorpay" },
        ]} />
      </section>

      {/* 9. Disclaimer */}
      <Disclaimer company="Atlassian" />
    </article>
  );
}
