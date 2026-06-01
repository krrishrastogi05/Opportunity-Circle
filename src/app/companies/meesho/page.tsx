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
  title: "Meesho — Company Profile",
  description:
    "Understand Meesho's hiring process in India — AI screening round, DSA + machine coding, social commerce focus, Bangalore HQ.",
};

/* ── Page ─────────────────────────────────────────── */

export default function MeeshoPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">

      {/* 1. Breadcrumb */}
      <CompanyBreadcrumb company="Meesho" />

      {/* 2. Header */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <CompanyLogo name="Meesho" slug="meesho" size={56} rounded="rounded-2xl" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Meesho</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              meesho.com ·{" "}
              <a href="https://meesho.io/careers" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                meesho.io/careers <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {["Social Commerce", "Machine Coding", "AI Screening Round", "Bangalore HQ", "D2C Platform"].map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>
          ))}
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          Meesho is India&apos;s fastest-growing social commerce platform, connecting small businesses with consumers
          through social channels. Their hiring process is unique for starting with an{" "}
          <strong className="font-semibold text-foreground">AI-based screening round</strong> before the standard
          DSA + Machine Coding interview loop. They hire broadly from Tier-1 campuses and off-campus.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatCard label="DSA Expectation"  value="High"          sub="Medium–Hard" />
          <StatCard label="Unique Round"     value="AI Screening"  sub="MCQ + verbal AI eval" />
          <StatCard label="Campus Access"    value="Tier-1"        sub="IITs · NITs · BITS + off-campus" />
        </div>
      </header>

      <Separator className="mb-10" />

      {/* 3. What makes Meesho different */}
      <section className="mb-10">
        <SectionLabel>What makes Meesho different</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Meesho&apos;s process stands out in the Indian startup hiring landscape. These four factors shape what you need to prepare.
        </p>
        <div>
          <DiffBox title="AI-based screening round first">
            Unlike any other company on this platform, Meesho starts with an AI-evaluated screening round (often via
            NextLevel platform). It includes MCQs on DSA, OS, CN, DBMS and AI-evaluated verbal/speaking questions.
            This round eliminates a large portion of applicants. Do not skip it — most candidates treat it as a
            formality and get eliminated here.
          </DiffBox>
          <DiffBox title="Machine Coding is a critical round">
            Meesho has a dedicated Machine Coding (LLD) round where you build a working system in 60–90 minutes.
            Common problems: Inventory Management System, Car Pooling System, Ride Sharing app. Evaluated on OOP
            design, modularity, SOLID principles, and clean code.
          </DiffBox>
          <DiffBox title="Social commerce domain knowledge helps">
            Meesho&apos;s product serves small Indian merchants (resellers) and Tier-2/3 consumers. Understanding
            reseller economics, catalog management, and why social commerce is uniquely valuable in India gives you
            a genuine edge in HM and project discussions.
          </DiffBox>
          <DiffBox title="Fast growth = early ownership">
            Meesho is in a rapid growth phase. Engineers take ownership of features from early in their career.
            The HM round evaluates initiative, bias-to-action, and ability to handle ambiguity — not just technical depth.
          </DiffBox>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 4. Opportunities in India */}
      <section className="mb-10">
        <SectionLabel>Opportunities in India</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Meesho runs campus drives and accepts off-campus applications for both internship and full-time SDE roles.
        </p>
        <div>
          <OpportunityBlock
            title="SDE Internship"
            type="Internship · 2–3 months"
            access="Campus (IITs, NITs, BITS) + Off-campus"
          >
            <p>
              Meesho recruits from Tier-1 campuses during placement season. Off-campus via the careers portal (
              <a href="https://meesho.io/careers" target="_blank" rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                meesho.io/careers <ExternalLink className="w-3 h-3 inline" />
              </a>
              ) and referrals. Interns work on live product features — catalog, payments, logistics, and seller tools.
              PPO is offered to high performers.
            </p>
          </OpportunityBlock>

          <OpportunityBlock
            title="SDE-1 (Full-Time)"
            type="Full-time · Entry Level"
            access="Campus + Portal + Referral"
          >
            <p>
              Full-time SDE roles via campus placement and direct applications at{" "}
              <a href="https://meesho.io/careers" target="_blank" rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                meesho.io/careers <ExternalLink className="w-3 h-3 inline" />
              </a>
              . Referrals improve response rates significantly. Meesho&apos;s engineering culture is lean and fast —
              expect early ownership with minimal handholding.
            </p>
          </OpportunityBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 5. Interview Process */}
      <section className="mb-10">
        <SectionLabel>Interview Process (5 rounds)</SectionLabel>
        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
          Meesho&apos;s loop is unique for its AI screening gate and the dedicated Machine Coding round that follows.
        </p>
        <div>
          <RoundBlock round="1" label="AI Screening" tag="NextLevel platform · MCQ + verbal">
            MCQs on DSA, OS, DBMS, CN + AI-evaluated verbal responses. Eliminates most applicants. Do not treat this
            as a formality. Prepare CS fundamentals and communicate answers clearly even to an AI evaluator.
          </RoundBlock>
          <RoundBlock round="2" label="Online Coding Assessment" tag="HackerRank · 105–165 min">
            3 coding problems. Medium to Hard difficulty. Topics: Trees, Graphs, DP, Backtracking, Heaps, Segment
            Trees, Binary Search. Time window is generous but problems are hard — optimized solutions required.
          </RoundBlock>
          <RoundBlock round="3" label="DSA Technical Round" tag="Live coding · 45–60 min">
            Live problem-solving. Interviewers probe thought process, edge cases, and complexity trade-offs. May ask
            you to dry-run code on test cases verbally. Topics mirror the OA: Graphs, DP, Trees.
          </RoundBlock>
          <RoundBlock round="4" label="Machine Coding (LLD)" tag="OOP design · 60–90 min">
            Build a working system from scratch. Evaluated on OOP principles, SOLID, design patterns (Strategy,
            Observer, Factory), code extensibility. Common problems: Inventory Management, Car Pooling, Ride Sharing,
            Notification System.
          </RoundBlock>
          <RoundBlock round="5" label="Hiring Manager Round" tag="Project depth + culture fit">
            Deep dive into resume projects (architecture, tech stack rationale, production challenges). Behavioral
            questions around ownership, bias-to-action, and handling ambiguity in a fast-paced environment.
          </RoundBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 6. Skill Importance */}
      <section className="mb-10">
        <SectionLabel>Skill Importance at Meesho</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          ●●● = widely essential · ●●○ = generally important · ●○○ = sometimes relevant
        </p>
        <div>
          <SkillBar label="Machine Coding / LLD / OOP"            level={3} note="dedicated round" />
          <SkillBar label="DSA (Data Structures & Algorithms)"    level={3} note="Medium–Hard, 3 problems" />
          <SkillBar label="CS Fundamentals (OS, DBMS, CN)"        level={3} note="AI screening + interviews" />
          <SkillBar label="Project ownership & architecture"       level={2} note="HM round focus" />
          <SkillBar label="High-Level System Design"               level={1} note="rarely asked for interns" />
          <SkillBar label="Competitive Programming"                level={1} note="not a signal" />
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 7. Preparation Guide */}
      <section className="mb-10">
        <SectionLabel>How to prepare</SectionLabel>
        <ul className="space-y-3">
          <PrepItem
            bold="Don't skip the AI screening:"
            text="The NextLevel AI screening eliminates most candidates. Revise OS, DBMS, CN, and basic DSA for the MCQ section. For verbal responses, speak clearly and structure answers logically — the AI evaluates coherence, not just correctness."
          />
          <PrepItem
            bold="DSA — Hard LeetCode focus:"
            text="Meesho's OA has 3 problems and a long time window, but the problems are hard. Practice Segment Trees, Backtracking, advanced DP, and Bipartite Graphs. Use Striver's SDE Sheet or NeetCode as a structured roadmap."
          />
          <PrepItem
            bold="Machine Coding practice is essential:"
            text="Build 3–4 complete systems before the interview: Inventory Management System, Car Pooling app, Notification Engine, Library System. Focus on SOLID principles, clean class structure, and extensibility — not just passing edge cases."
          />
          <PrepItem
            bold="Own your resume projects deeply:"
            text="The HM round probes every project 3 layers deep. Prepare to explain architecture, data model, why you chose the tech stack, what production issues you faced, and what you'd redesign today."
          />
          <PrepItem
            bold="Referral for off-campus:"
            text="Cold portal applications at Meesho have low response rates. Connect with Meesho engineers at Bangalore on LinkedIn. A referral significantly improves your chances of receiving an OA link."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      {/* 8. Similar Companies */}
      <section className="mb-10">
        <SectionLabel>Similar Companies to Explore</SectionLabel>
        <SimilarCompanies companies={[
          { name: "Flipkart",  slug: "flipkart" },
          { name: "Swiggy",   slug: "swiggy" },
          { name: "Eternal", slug: "eternal" },
          { name: "PhonePe",  slug: "phonepe" },
          { name: "Razorpay", slug: "razorpay" },
        ]} />
      </section>

      {/* 9. Disclaimer */}
      <Disclaimer company="Meesho" />

    </article>
  );
}
