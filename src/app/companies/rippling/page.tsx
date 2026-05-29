import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SectionLabel, StatCard, OpportunityBlock, RoundBlock,
  SkillBar, DiffBox, PrepItem, SimilarCompanies, Disclaimer, CompanyBreadcrumb,
} from "@/components/company/CompanyLayout";

export const metadata = {
  title: "Rippling — Company Profile",
  description:
    "Understand Rippling's hiring process in India — campus hiring at IITs/NITs/BITS, LLD-heavy interviews, DSA medium-hard, and a strong emphasis on project depth.",
};

export default function RipplingPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">

      {/* 1. Breadcrumb */}
      <CompanyBreadcrumb company="Rippling" />

      {/* 2. Header */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-[#FFCE00] flex items-center justify-center shrink-0">
            <span style={{ color: "#000", fontSize: 26, fontWeight: 800, fontFamily: "sans-serif" }}>R</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Rippling</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              rippling.com ·{" "}
              <a href="https://www.rippling.com/careers" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                rippling.com/careers <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {["HR Tech", "Payroll & Compliance", "SaaS", "LLD-Heavy", "Bangalore HQ (India)"].map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>
          ))}
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          Rippling is a fast-growing US-headquartered HR, IT, and finance platform with a major engineering hub in{" "}
          <strong className="font-semibold text-foreground">Bangalore, India</strong>. They actively recruit from
          top-tier campuses (IITs, NITs, BITS) and off-campus. The interview process is notably{" "}
          <strong className="font-semibold text-foreground">design-heavy</strong> — Low-Level Design (LLD) is a
          first-class round, not an afterthought.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatCard label="DSA Expectation"  value="High"          sub="Medium–Hard" />
          <StatCard label="Design Rounds"    value="LLD + HLD"     sub="Both tested" />
          <StatCard label="Campus Access"    value="Tier-1 Only"   sub="IITs · NITs · BITS" />
        </div>
      </header>

      <Separator className="mb-10" />

      {/* 3. What makes Rippling different */}
      <section className="mb-10">
        <SectionLabel>What makes Rippling different</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Rippling is not a typical Big Tech or product startup hire. Understanding these differences will help you prepare correctly.
        </p>
        <div>
          <DiffBox icon="🏗️" title="LLD is a mandatory, standalone round">
            At Amazon, LLD is uncommon for interns. At Rippling, Low-Level Design is a dedicated round for
            both interns and SDEs. Expect to design real systems — Employee Access Manager, Rate Limiter,
            Notification Engine — using OOP, SOLID principles, and clean extensible class structures.
          </DiffBox>
          <DiffBox icon="📁" title="Project depth over behavioral stories">
            The Hiring Manager round is not LP-style storytelling. It&apos;s a deep technical interrogation of
            your past projects — why you chose the stack, what broke in production, what trade-offs you made,
            and what you&apos;d redesign. Vague projects fail here.
          </DiffBox>
          <DiffBox icon="⚡" title="Product-context problems">
            Interview problems are often inspired by Rippling&apos;s own product domain — employee records,
            payroll flows, onboarding pipelines, permissions engines. Knowing what Rippling does gives you
            an edge in framing your design answers.
          </DiffBox>
          <DiffBox icon="🎯" title="Strong PPO culture">
            Rippling&apos;s 3-month internship (typically May–August) has a strong Pre-Placement Offer (PPO)
            track. High-performing interns are frequently converted to full-time SDE-1 roles.
          </DiffBox>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 4. Opportunities in India */}
      <section className="mb-10">
        <SectionLabel>Opportunities in India</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Rippling hires from campuses and off-campus for both internship and full-time roles at their Bangalore engineering office.
        </p>
        <div>
          <OpportunityBlock
            title="SDE Internship (3 months)"
            type="Internship · 3 months"
            access="Campus (Tier-1) + Off-campus"
          >
            <p>
              Rippling visits <strong className="font-medium text-foreground">IITs, NITs, and BITS</strong> for
              campus placement drives. The internship runs approximately May–August and involves working on
              production-grade software — AI/ML pipelines, core product features, and platform infrastructure.
            </p>
            <p>
              Off-campus candidates can apply via the{" "}
              <a href="https://www.rippling.com/careers" target="_blank" rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                careers portal <ExternalLink className="w-3 h-3 inline" />
              </a>{" "}
              or through employee referrals. Referrals significantly improve response rate.
            </p>
            <p className="text-xs text-muted-foreground/70 italic">
              PPO (Pre-Placement Offer) is commonly extended to high-performing interns.
            </p>
          </OpportunityBlock>

          <OpportunityBlock
            title="SDE-1 / SDE-2 (Full-Time)"
            type="Full-time · Entry & Mid"
            access="Campus (Tier-1) + Portal + Referral"
          >
            <p>
              Full-time SDE roles are available both through campus placement and the off-campus portal.
              Rippling&apos;s bar for SDE-1 is notably high — they expect design thinking and project depth
              that many companies only require at SDE-2 level.
            </p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>
                <strong className="font-medium text-foreground">Campus:</strong> Placement drives at IITs,
                NITs, BITS during the standard placement season (Aug–Feb).
              </li>
              <li>
                <strong className="font-medium text-foreground">Off-campus:</strong> Apply at{" "}
                <a href="https://www.rippling.com/careers" target="_blank" rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                  rippling.com/careers <ExternalLink className="w-3 h-3 inline" />
                </a>
                {" "}or via a referral from a Rippling engineer.
              </li>
            </ul>
          </OpportunityBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 5. Interview Process */}
      <section className="mb-10">
        <SectionLabel>Interview Process (4–5 rounds)</SectionLabel>
        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
          The full interview loop for both interns and SDE-1. Intern loops may skip the HLD round.
        </p>
        <div>
          <RoundBlock round="1" label="Online Assessment" tag="DSA · 60–90 min">
            2–3 DSA problems, typically Medium to Hard. Conducted on HackerRank or HackerEarth.
            Hidden test cases — write correct, edge-case-aware code, not just examples that pass.
            Code quality and structure are evaluated alongside correctness.
          </RoundBlock>
          <RoundBlock round="2" label="DSA Technical Round" tag="Live coding · 45–60 min">
            A live collaborative coding round. Expect follow-up constraints mid-problem to test scalability.
            Common topics: trees, graphs, strings, DP, sliding window. Always communicate your approach first,
            state time and space complexity, then code. Interviewers value thought process as much as the solution.
          </RoundBlock>
          <RoundBlock round="3" label="Low-Level Design (LLD)" tag="Critical · 60 min">
            Design a real system component from scratch. Past problems include: Employee Access Management system,
            Rate Limiter, Task Scheduler, Notification Engine, Parking Lot.
            Expected output: class structure, interfaces, data model, extensibility discussion, SOLID principles applied.
            This is a dedicated standalone round — do not under-prepare it.
          </RoundBlock>
          <RoundBlock round="4" label="High-Level Design (HLD)" tag="SDE-1 · 60 min">
            System design round, more common for SDE-1 than interns. Design a scalable architecture for
            real-world problems (event tracking, payroll pipeline, news aggregator). Focus on DB schema,
            API design, SQL vs NoSQL trade-offs, caching strategy, and handling scale.
          </RoundBlock>
          <RoundBlock round="5" label="Hiring Manager Round" tag="Project depth + culture fit">
            Deep technical discussion about your past projects — not LP-style storytelling. Interviewers ask
            why you chose a specific stack, what the bottlenecks were, how you debugged production issues,
            and what you would redesign. Prepare to go 3–4 layers deep on any project you list.
          </RoundBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 6. Skill Importance */}
      <section className="mb-10">
        <SectionLabel>Skill Importance at Rippling</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          ●●● = widely essential · ●●○ = generally important · ●○○ = sometimes relevant
        </p>
        <div>
          <SkillBar label="Low-Level Design (LLD / OOP)"         level={3} note="mandatory standalone round" />
          <SkillBar label="DSA (Data Structures & Algorithms)"   level={3} note="Medium–Hard" />
          <SkillBar label="Project depth & design decisions"     level={3} note="HM round focus" />
          <SkillBar label="High-Level Design (System Design)"    level={2} note="SDE-1 and above" />
          <SkillBar label="CS Fundamentals (OS, DBMS, Networks)" level={2} note="appear in HLD discussions" />
          <SkillBar label="Clean & modular code"                 level={2} note="judged across all rounds" />
          <SkillBar label="Competitive Programming"              level={1} note="not a primary signal" />
          <SkillBar label="Behavioral / LP stories"              level={1} note="project depth preferred over STAR" />
        </div>
        <p className="text-xs text-muted-foreground/60 italic mt-4">
          Rippling&apos;s biggest differentiator: most candidates over-prepare DSA and neglect LLD. Flip the ratio.
        </p>
      </section>

      <Separator className="mb-10" />

      {/* 7. Preparation Guide */}
      <section className="mb-10">
        <SectionLabel>How to prepare</SectionLabel>
        <ul className="space-y-3">
          <PrepItem
            bold="LLD first:"
            text="Practice designing systems using OOP — Employee Management, Parking Lot, Library System, Rate Limiter. Study SOLID principles and design patterns (Strategy, Observer, Factory, Builder). Most candidates fail at Rippling due to weak LLD, not weak DSA."
          />
          <PrepItem
            bold="DSA — LeetCode Medium/Hard:"
            text="Practice Rippling-tagged problems on LeetCode. Expect follow-up constraints mid-interview. Write modular, production-quality code — not just minimum viable code to pass test cases."
          />
          <PrepItem
            bold="Own your projects deeply:"
            text="Build 1–2 substantial projects you can defend end-to-end. Know the architecture, data model, why you chose the stack, what broke in production, and what you optimised. Surface-level descriptions fail the HM round."
          />
          <PrepItem
            bold="System Design basics (for SDE-1):"
            text="Study SQL vs NoSQL trade-offs, caching strategies (Redis), pub/sub systems, API rate limiting, and database indexing. Alex Xu's System Design Interview book is a commonly referenced resource."
          />
          <PrepItem
            bold="Referral > cold apply:"
            text="Connect with Rippling engineers at the Bangalore office on LinkedIn. A referral significantly increases your chance of receiving an OA link compared to a cold portal application."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      {/* 8. Similar Companies */}
      <section className="mb-10">
        <SectionLabel>Similar Companies to Explore</SectionLabel>
        <SimilarCompanies companies={[
          { name: "Stripe",     slug: "stripe" },
          { name: "Razorpay",  slug: "razorpay" },
          { name: "Salesforce", slug: "salesforce" },
          { name: "Atlassian",  slug: "atlassian" },
          { name: "Freshworks", slug: "freshworks" },
        ]} />
      </section>

      {/* 9. Disclaimer */}
      <Disclaimer company="Rippling" />

    </article>
  );
}
