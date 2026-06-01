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
  title: "Swiggy — Company Profile",
  description:
    "Understand Swiggy's hiring process in India — machine coding round, DSA + system design, hyperlocal delivery focus, Bangalore HQ.",
};

/* ── Page ─────────────────────────────────────────── */

export default function SwiggyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">

      {/* 1. Breadcrumb */}
      <CompanyBreadcrumb company="Swiggy" />

      {/* 2. Header */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <CompanyLogo name="Swiggy" slug="swiggy" size={56} rounded="rounded-2xl" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Swiggy</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              swiggy.com ·{" "}
              <a href="https://careers.swiggy.com" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                careers.swiggy.com <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {["Food Delivery & Quick Commerce", "Machine Coding", "Bangalore HQ", "Hyperlocal Tech", "Instamart"].map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>
          ))}
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          Swiggy is India&apos;s leading food delivery and quick commerce platform. They solve hyperlocal delivery and
          real-time logistics problems at massive scale. Their process combines DSA, a{" "}
          <strong className="font-semibold text-foreground">Machine Coding round</strong>, and system design — with a
          strong preference for engineers who can think about real-world scale and reliability.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatCard label="DSA Expectation"  value="High"            sub="Medium–Hard" />
          <StatCard label="Unique Round"     value="Machine Coding"  sub="LLD · 60–120 min" />
          <StatCard label="Campus Access"    value="Broad"           sub="IITs · NITs · BITS + off-campus" />
        </div>
      </header>

      <Separator className="mb-10" />

      {/* 3. What makes Swiggy different */}
      <section className="mb-10">
        <SectionLabel>What makes Swiggy different</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Swiggy&apos;s process stands out in the Indian product company landscape. These four factors shape what you need to prepare.
        </p>
        <div>
          <DiffBox icon="🍕" title="Domain problems are real">
            Swiggy&apos;s interview problems are often inspired by their actual product: Snake and Ladder game (as a model
            for state management), Splitwise, parking systems, real-time delivery assignment. Understanding Swiggy&apos;s
            product — food delivery + Instamart quick commerce — helps frame design answers.
          </DiffBox>
          <DiffBox icon="🏗️" title="Machine Coding is a decisive round">
            Similar to Flipkart and Meesho, Swiggy has a dedicated Machine Coding round. Given 60–120 minutes to build
            a working, extensible application. Clean OOP code, modular architecture, and mandatory/optional feature
            handling are all evaluated.
          </DiffBox>
          <DiffBox icon="⚡" title="Real-time system scale">
            Swiggy handles millions of concurrent orders, real-time delivery tracking, and surge demand. System design
            questions (for SDE-1) focus on building scalable, available systems under real-time constraints. Think about
            Kafka, Redis, and database sharding.
          </DiffBox>
          <DiffBox icon="🎯" title="Clean code standard">
            Swiggy explicitly evaluates code quality in machine coding rounds — not just &ldquo;does it run&rdquo; but
            &ldquo;is it maintainable, readable, and extensible?&rdquo; Variable naming, structure, and handling of
            optional vs mandatory requirements all matter.
          </DiffBox>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 4. Opportunities in India */}
      <section className="mb-10">
        <SectionLabel>Opportunities in India</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Swiggy hires from top campuses and off-campus for both internship and full-time SDE roles.
        </p>
        <div>
          <OpportunityBlock
            title="SDE Internship"
            type="Internship · 2–3 months"
            access="Campus (IITs, NITs, BITS) + Off-campus"
          >
            <p>
              Swiggy recruits from Tier-1 campuses and off-campus via their careers portal (
              <a href="https://careers.swiggy.com" target="_blank" rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                careers.swiggy.com <ExternalLink className="w-3 h-3 inline" />
              </a>
              ) and referrals. Interns work on live systems — delivery assignment algorithms, catalog infrastructure,
              payment flows, and Instamart inventory. PPO offered to strong interns.
            </p>
          </OpportunityBlock>

          <OpportunityBlock
            title="SDE-1 (Full-Time)"
            type="Full-time · Entry Level"
            access="Campus + Portal + Referral"
          >
            <p>
              Full-time SDE roles via campus placement (Aug–Feb season) and{" "}
              <a href="https://careers.swiggy.com" target="_blank" rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                careers.swiggy.com <ExternalLink className="w-3 h-3 inline" />
              </a>
              . Referrals from current Swiggy engineers meaningfully improve response rates. The full-time loop adds
              an HLD system design round.
            </p>
          </OpportunityBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 5. Interview Process */}
      <section className="mb-10">
        <SectionLabel>Interview Process (4 rounds)</SectionLabel>
        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
          Swiggy&apos;s standard loop includes a dedicated Machine Coding round alongside a deep DSA technical interview.
        </p>
        <div>
          <RoundBlock round="1" label="Online Assessment" tag="HackerRank · 3 problems">
            Mix of Easy, Medium, Hard. Core topics: Arrays, Strings, Graphs, Trees, Heaps, Greedy, DP. May include
            SQL queries. Pass all test cases — Swiggy&apos;s OA filter is strict.
          </RoundBlock>
          <RoundBlock round="2" label="Machine Coding Round" tag="LLD · 60–120 min">
            Build a working application from scratch. Common problems: Snake and Ladder, Splitwise, Parking System,
            Food Ordering Engine. Define classes, handle mandatory vs optional features, follow OOP and SOLID
            principles. Clean, modular, readable code is expected — not just functional code.
          </RoundBlock>
          <RoundBlock round="3" label="DSA Technical Round" tag="Live coding · 45–60 min">
            Deep DSA problems. Topics: Graphs, DP, Trees, Heaps. Interviewers probe thought process, edge cases,
            complexity. May ask about core CS fundamentals (DBMS, OS) as follow-ups.
          </RoundBlock>
          <RoundBlock round="4" label="Hiring Manager Round" tag="Project depth + scale thinking">
            Resume project deep-dive with a focus on scale: how you&apos;d handle 10x traffic, what failed in
            production, what monitoring you set up. Behavioral questions around ownership and customer-first thinking.
          </RoundBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 6. Skill Importance */}
      <section className="mb-10">
        <SectionLabel>Skill Importance at Swiggy</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          ●●● = widely essential · ●●○ = generally important · ●○○ = sometimes relevant
        </p>
        <div>
          <SkillBar label="Machine Coding / LLD / OOP"            level={3} note="decisive standalone round" />
          <SkillBar label="DSA (Data Structures & Algorithms)"    level={3} note="Medium–Hard" />
          <SkillBar label="Code quality & structure"               level={3} note="explicitly evaluated" />
          <SkillBar label="System Design / HLD"                    level={2} note="SDE-1 and above" />
          <SkillBar label="Project depth & scale thinking"         level={2} note="HM round focus" />
          <SkillBar label="CS Fundamentals (DBMS, OS)"             level={2} note="follow-up questions" />
          <SkillBar label="Competitive Programming"                level={1} note="not a direct signal" />
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 7. Preparation Guide */}
      <section className="mb-10">
        <SectionLabel>How to prepare</SectionLabel>
        <ul className="space-y-3">
          <PrepItem
            bold="Machine Coding is the differentiator:"
            text="Practice building working applications in 90 minutes. Common problems at Swiggy: Snake and Ladder, Splitwise, Parking Lot, Delivery Assignment Engine. SOLID principles and OOP design are the criteria. Write clean, well-structured code — not just code that passes edge cases."
          />
          <PrepItem
            bold="DSA — Medium to Hard:"
            text="Practice Graphs (BFS/DFS, shortest path), Trees, Heaps, DP, and Greedy on LeetCode. Swiggy-tagged problems are a useful filter. Pass all edge cases — the OA is eliminatory."
          />
          <PrepItem
            bold="Think at Swiggy's scale:"
            text="In HM rounds, frame your answers in terms of real-world reliability and scale. What happens at 1M concurrent orders? Where does your design break? What would you cache? What would you put in a queue? This mindset differentiates engineering candidates."
          />
          <PrepItem
            bold="Know your DBMS:"
            text="SQL queries (GROUP BY, joins, subqueries), ACID properties, indexing strategies, and SQL vs NoSQL trade-offs often appear in technical rounds. Do not skip database fundamentals."
          />
          <PrepItem
            bold="Apply via referral:"
            text="Cold applications at Swiggy have low response rates. Connect with Swiggy engineers at Bangalore on LinkedIn. A referral gets you to the OA significantly faster than a portal application."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      {/* 8. Similar Companies */}
      <section className="mb-10">
        <SectionLabel>Similar Companies to Explore</SectionLabel>
        <SimilarCompanies companies={[
          { name: "Zomato",   slug: "zomato" },
          { name: "Meesho",   slug: "meesho" },
          { name: "Flipkart", slug: "flipkart" },
          { name: "Uber",     slug: "uber" },
          { name: "PhonePe",  slug: "phonepe" },
        ]} />
      </section>

      {/* 9. Disclaimer */}
      <Disclaimer company="Swiggy" />

    </article>
  );
}
