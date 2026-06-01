import Link from "next/link";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SectionLabel, StatCard, OpportunityBlock, RoundBlock,
  SkillBar, DiffBox, PrepItem, SimilarCompanies, Disclaimer, CompanyBreadcrumb,
} from "@/components/company/CompanyLayout";

export const metadata = {
  title: "Uber — Company Profile",
  description:
    "Understand Uber India's hiring process — high DSA bar, machine coding, system design, and what it takes for a Bangalore SDE internship or full-time role.",
};

/* ── Page ─────────────────────────────────────────── */

export default function UberPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">

      {/* 1. Breadcrumb */}
      <CompanyBreadcrumb company="Uber" />

      {/* 2. Header */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <CompanyLogo name="Uber" slug="uber" size={56} rounded="rounded-2xl" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Uber</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              uber.com ·{" "}
              <a href="https://www.uber.com/us/en/careers/" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                uber.com/careers <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {["Ride-hailing", "Real-time Systems", "Bangalore HQ", "High DSA Bar", "LLD + HLD"].map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>
          ))}
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          Uber&apos;s Bangalore engineering office (one of its largest globally) is a serious{" "}
          <strong className="font-semibold text-foreground">Big Tech-tier hire</strong>. The process is
          rigorous — strong DSA, machine coding / LLD, and system design. Near-perfect OA scores are
          typically required to proceed.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatCard label="DSA Expectation"  value="Very High"       sub="Medium–Hard (strict)" />
          <StatCard label="Design Rounds"    value="LLD + HLD"       sub="Both standard" />
          <StatCard label="Campus Access"    value="Tier-1 Focused"  sub="IITs · NITs · BITS" />
        </div>
      </header>

      <Separator className="mb-10" />

      {/* 3. What makes Uber different */}
      <section className="mb-10">
        <SectionLabel>What makes Uber different</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Uber Bangalore operates at global engineering scale. These factors set its hiring bar apart from typical Indian product companies.
        </p>
        <div>
          <DiffBox title="Near-perfect OA scores required">
            Uber&apos;s OA (often on CodeSignal) is highly competitive. Even a single failing test case can eliminate
            a candidate. The bar is set close to perfect — clean, optimal, edge-case-aware code is expected from the start.
          </DiffBox>
          <DiffBox title="Real-world system context">
            Interview problems are often inspired by Uber&apos;s product: ride matching, surge pricing, driver-rider allocation,
            notification systems. Understanding what Uber does as a platform helps frame design answers.
          </DiffBox>
          <DiffBox title="LLD is a standard round">
            Machine Coding / Low-Level Design is part of the standard Uber loop. Expect to design components like
            Rate Limiter, Notification Engine, Cab Booking system, or Movie Rating System.
          </DiffBox>
          <DiffBox title="Bangalore is a global engineering hub">
            Uber Bangalore works on core platform problems (maps, matching algorithms, safety systems). Engineers here
            work on the same codebase as the US team. The hiring bar reflects that.
          </DiffBox>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 4. Opportunities in India */}
      <section className="mb-10">
        <SectionLabel>Opportunities in India</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Uber Bangalore hires for core platform engineering roles. Access is primarily through campus drives and the careers portal.
        </p>
        <div>
          <OpportunityBlock
            title="SDE Internship"
            type="Internship · 3–6 months"
            access="Campus (Tier-1) + Off-campus portal"
          >
            <p>
              Uber hires interns primarily from IITs and select NITs during campus placement drives. Off-campus applications
              via the{" "}
              <a href="https://www.uber.com/us/en/careers/" target="_blank" rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                Uber Careers portal <ExternalLink className="w-3 h-3 inline" />
              </a>
              {" "}are also open periodically. Interns work on real production systems.
            </p>
          </OpportunityBlock>

          <OpportunityBlock
            title="SDE-1 / SDE-2 (Full-Time)"
            type="Full-time · Entry & Mid"
            access="Campus + Portal + Referral"
          >
            <p>
              Full-time SDE roles available via campus and the careers portal. Referrals significantly improve response rates.
              Uber Bangalore hires for core platform engineering — maps, pricing algorithms, safety, and infrastructure.
            </p>
          </OpportunityBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 5. Interview Process */}
      <section className="mb-10">
        <SectionLabel>Interview Process (5 rounds)</SectionLabel>
        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
          Uber&apos;s full loop covers DSA, LLD, HLD, and a behavioral round. Both design rounds are standard even for SDE-1.
        </p>
        <div>
          <RoundBlock round="1" label="Online Assessment" tag="CodeSignal · 90 min">
            2–3 DSA problems, Medium to Hard. Near-perfect score typically required to advance. Hidden test cases —
            write clean, optimised, edge-case-aware code. Focus: Graphs, DP, BFS/Multi-source BFS, Trees.
          </RoundBlock>
          <RoundBlock round="2" label="DSA Technical Round × 1–2" tag="Live coding · 45–60 min">
            Challenging DSA problems with follow-up optimizations. Expect constraints to be added mid-problem.
            Always communicate complexity trade-offs. Topics: Dijkstra&apos;s, DP, sliding window, graph theory.
          </RoundBlock>
          <RoundBlock round="3" label="Machine Coding / LLD" tag="OOP design · 60 min">
            Design a functional system component: Rate Limiter, Cab Booking, Ride Matching Engine, Parking Lot.
            Focus on OOP principles, clean API design, extensibility, and concurrent-safe structures.
          </RoundBlock>
          <RoundBlock round="4" label="High-Level Design (HLD)" tag="System design · 45–60 min">
            Design a distributed system inspired by Uber&apos;s products. Common topics: surge pricing system,
            notification pipeline, driver-rider matching, event tracking. Focus on scalability, availability,
            DB choices, message queues (Kafka).
          </RoundBlock>
          <RoundBlock round="5" label="Hiring Manager Round" tag="Behavioral + project depth">
            Resume project deep-dive (technical decisions, trade-offs), Uber leadership principles (make big bets,
            build with humility). STAR method for behavioral questions.
          </RoundBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 6. Skill Importance */}
      <section className="mb-10">
        <SectionLabel>Skill Importance at Uber</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          ●●● = widely essential · ●●○ = generally important · ●○○ = sometimes relevant
        </p>
        <div>
          <SkillBar label="DSA (Data Structures & Algorithms)"          level={3} note="very high bar, near-perfect OA" />
          <SkillBar label="Machine Coding / LLD / OOP"                  level={3} note="standard standalone round" />
          <SkillBar label="High-Level Design (System Design)"           level={3} note="standard for SDE-1" />
          <SkillBar label="Project depth & architecture"                level={2} note="HM round focus" />
          <SkillBar label="CS Fundamentals (OS, DBMS, Networking)"      level={2} note="appear in HLD rounds" />
          <SkillBar label="Competitive Programming"                     level={1} note="not a direct signal" />
          <SkillBar label="Behavioral prep"                             level={1} note="STAR method, not LP-style" />
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 7. Preparation Guide */}
      <section className="mb-10">
        <SectionLabel>How to prepare</SectionLabel>
        <ul className="space-y-3">
          <PrepItem
            bold="Aim for perfection on the OA:"
            text="Uber's OA (often CodeSignal) eliminates candidates based on test case pass rates. Practice until you can solve Medium–Hard problems cleanly in 30–40 minutes, including all edge cases."
          />
          <PrepItem
            bold="DSA — Hard LeetCode:"
            text="Practice graph problems (Dijkstra's, multi-source BFS, topological sort), DP, and tree variations at Hard difficulty. Use Uber-tagged LeetCode problems."
          />
          <PrepItem
            bold="LLD practice is essential:"
            text="Build small systems using OOP: Cab Booking, Parking Lot, Rate Limiter, Notification Engine. Focus on SOLID principles, extensibility, and clean class interfaces."
          />
          <PrepItem
            bold="System Design (for SDE-1):"
            text="Study scalable system design: caching (Redis), message queues (Kafka), DB sharding, load balancing. Practice designing Uber-like systems: surge pricing, ride matching, live tracking."
          />
          <PrepItem
            bold="Referral strongly recommended:"
            text="Cold portal applications at Uber have low response rates. Connect with Uber Bangalore engineers on LinkedIn for a referral before applying."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      {/* 8. Similar Companies */}
      <section className="mb-10">
        <SectionLabel>Similar Companies to Explore</SectionLabel>
        <SimilarCompanies companies={[
          { name: "Google",     slug: "google" },
          { name: "Rippling",   slug: "rippling" },
          { name: "Atlassian",  slug: "atlassian" },
          { name: "Microsoft",  slug: "microsoft" },
          { name: "Swiggy",     slug: "swiggy" },
        ]} />
      </section>

      {/* 9. Disclaimer */}
      <Disclaimer company="Uber" />

    </article>
  );
}
