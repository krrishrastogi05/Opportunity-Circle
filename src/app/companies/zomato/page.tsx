import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SectionLabel, StatCard, OpportunityBlock, RoundBlock,
  SkillBar, DiffBox, PrepItem, SimilarCompanies, Disclaimer, CompanyBreadcrumb,
} from "@/components/company/CompanyLayout";

export const metadata = {
  title: "Zomato — Company Profile",
  description:
    "Understand Zomato's hiring process in India — DSA + system design + CS fundamentals, product-inspired problems, and what it takes for an SDE internship or full-time role.",
};

export default function ZomatoPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">
      <CompanyBreadcrumb company="Zomato" />

      <header className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <CompanyLogo name="Zomato" slug="zomato" size={56} rounded="rounded-2xl" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Zomato</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              zomato.com ·{" "}
              <a href="https://www.zomato.com/careers" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                zomato.com/careers <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {["Food Tech", "Blinkit (Quick Commerce)", "Gurugram HQ", "DSA + System Design", "Engineering Intuition"].map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>
          ))}
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          Zomato is India&apos;s dominant food delivery and quick commerce platform (Blinkit). Their engineering
          team solves real-time delivery routing, restaurant discovery, and inventory allocation at massive scale.
          Interviews focus on{" "}
          <strong className="font-semibold text-foreground">engineering intuition</strong> — they value clear
          thinking and product-aware system design over algorithmic complexity alone.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatCard label="DSA Expectation"  value="High"         sub="Medium–Hard" />
          <StatCard label="System Design"    value="Both LLD/HLD" sub="Product-inspired" />
          <StatCard label="Campus Access"    value="Tier-1 + 2"   sub="IITs · NITs · BITS + off-campus" />
        </div>
      </header>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>What makes Zomato different</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Zomato is distinct for its emphasis on engineering intuition and product-aware design thinking — not just raw algorithmic ability.
        </p>
        <div>
          <DiffBox icon="🧠" title="Engineering intuition over algorithmic complexity">
            Zomato interviewers care more about how you think than whether you know a specific algorithm.
            They value candidates who clarify requirements, discuss trade-offs out loud, and arrive at
            good-enough solutions systematically — rather than silently producing perfect code.
            Pseudocode and logical walk-throughs are explicitly valued here.
          </DiffBox>
          <DiffBox icon="🍕" title="Product-inspired system design">
            System design questions at Zomato are drawn from their real product: food delivery tracking,
            restaurant rating systems, Blinkit inventory allocation, shuffle/recommendation algorithms.
            Understanding how Zomato's product actually works — order lifecycle, delivery partner assignment,
            restaurant discovery — gives you concrete language for design discussions.
          </DiffBox>
          <DiffBox icon="🗄️" title="DBMS is a first-class topic">
            Unlike Big Tech interviews where DBMS is a follow-up, at Zomato it&apos;s a primary topic.
            Database schema design (restaurants, orders, managers), SQL vs NoSQL trade-offs, ACID properties,
            indexing, and concurrency control are all directly asked — not just theoretically, but
            applied to Zomato-like scenarios.
          </DiffBox>
          <DiffBox icon="⚡" title="Blinkit = 10-minute delivery engineering">
            Since acquiring Blinkit, Zomato engineers work on 10-minute grocery delivery infrastructure.
            This means sub-second inventory updates, real-time warehouse routing, and extreme reliability requirements.
            Understanding these constraints gives your system design answers concrete real-world grounding.
          </DiffBox>
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>Opportunities in India</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Zomato is headquartered in Gurugram with engineering teams also in Bangalore. They recruit from campuses and off-campus.
        </p>
        <div>
          <OpportunityBlock
            title="SDE Internship"
            type="Internship · 2–3 months"
            access="Campus (Tier-1 & 2) + Off-campus"
          >
            <p>
              Zomato recruits from IITs, NITs, BITS, and select Tier-2 institutes during placement season.
              Off-campus applications via{" "}
              <a href="https://www.zomato.com/careers" target="_blank" rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                zomato.com/careers <ExternalLink className="w-3 h-3 inline" />
              </a>{" "}
              and LinkedIn referrals. Interns work on live product systems — delivery algorithms, rating pipelines, catalog infrastructure.
            </p>
            <p className="text-xs text-muted-foreground/70 italic">PPO offered to strong performers.</p>
          </OpportunityBlock>

          <OpportunityBlock
            title="SDE-1 (Full-Time Fresher)"
            type="Full-time · Entry Level"
            access="Campus + Portal + Referral"
          >
            <p>
              Full-time SDE roles via campus placement and the careers portal. The full-time loop includes
              a system design round not present in intern interviews. Referrals from Zomato engineers
              meaningfully improve response rates for off-campus candidates.
            </p>
          </OpportunityBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>Interview Process (3–5 rounds)</SectionLabel>
        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
          Intern loop: OA → Technical × 2 → Cultural. Full-time: same + System Design. DBMS and OOP appear across rounds.
        </p>
        <div>
          <RoundBlock round="1" label="Online Assessment" tag="DSA + CS MCQs · 60–90 min">
            2–3 coding problems (Medium–Hard) + MCQs on OS, DBMS, Networking. Topics: Arrays,
            Strings, HashMaps, Graphs, Binary Search, DP. The MCQ section is a real filter — do not
            skip fundamentals. Communicate your approach clearly even in written form.
          </RoundBlock>
          <RoundBlock round="2" label="Technical Round 1 — DSA + Project" tag="Live coding · 45–60 min">
            DSA problem + resume project deep-dive. Interviewers value thought process over final answer —
            always clarify requirements and discuss trade-offs before coding. Expect follow-up questions
            on your project&apos;s data model, API design, and how you&apos;d scale it.
          </RoundBlock>
          <RoundBlock round="3" label="Technical Round 2 — CS Fundamentals + Design" tag="Concepts · 45–60 min">
            Direct questions on DBMS (schema design for Zomato-like entities: restaurants, orders, managers),
            SQL queries, ACID properties, SQL vs NoSQL trade-offs, OS (multithreading, concurrency),
            OOP (polymorphism, encapsulation, inheritance vs composition). May include a basic LLD
            problem (e.g., design a restaurant rating system or LRU cache).
          </RoundBlock>
          <RoundBlock round="4" label="System Design" tag="SDE-1 · 45–60 min">
            Design a real-world system inspired by Zomato&apos;s product: food delivery tracking, Blinkit
            inventory allocation, restaurant discovery ranking, notification pipeline. Discuss
            API design, database schema, caching, real-time updates, and scalability.
            The focus is product-aware design — not just buzzword architecture.
          </RoundBlock>
          <RoundBlock round="5" label="Cultural / HR Round" tag="Motivation + team fit">
            Why Zomato? What interests you about the food-tech domain? Situational questions about
            handling conflict, dealing with ambiguity, and taking initiative. Be genuine and specific —
            Zomato values authenticity over rehearsed answers.
          </RoundBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>Skill Importance at Zomato</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          ●●● = widely essential · ●●○ = generally important · ●○○ = sometimes relevant
        </p>
        <div>
          <SkillBar label="DSA (Data Structures & Algorithms)"    level={3} note="Medium–Hard across all rounds" />
          <SkillBar label="CS Fundamentals (DBMS, OS, OOP)"      level={3} note="directly tested, Zomato-applied" />
          <SkillBar label="Engineering intuition & communication" level={3} note="core eval criterion" />
          <SkillBar label="System Design (LLD + HLD)"            level={2} note="full-time SDE; basic for interns" />
          <SkillBar label="Project depth & architecture"         level={2} note="every technical round" />
          <SkillBar label="Machine Coding / LLD"                 level={1} note="not a standard standalone round" />
          <SkillBar label="Competitive Programming"              level={1} note="not a primary signal" />
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>How to prepare</SectionLabel>
        <ul className="space-y-3">
          <PrepItem
            bold="Think out loud — always:"
            text="Zomato interviewers explicitly value communication. Restate the problem, ask clarifying questions, present brute force, then optimise. Silence during coding is a red flag. Pseudocode walk-throughs are explicitly valued — don't rush to code."
          />
          <PrepItem
            bold="DBMS is non-negotiable:"
            text="Revise: entity-relationship schema design, normalization, SQL (GROUP BY, JOINs, subqueries, window functions), ACID properties, transaction isolation levels, indexing (B-tree, composite), and SQL vs NoSQL trade-offs. Apply these to food-tech scenarios."
          />
          <PrepItem
            bold="Understand Zomato's product:"
            text="Know the order lifecycle (search → cart → order → delivery), how Blinkit's 10-minute delivery works (dark stores, inventory allocation), and how restaurant discovery/ranking works. This gives you concrete language in system design rounds."
          />
          <PrepItem
            bold="DSA — LeetCode Medium to Hard:"
            text="Focus on HashMaps, Graphs (BFS/DFS), Binary Search, Trees, and DP. Practice Zomato-tagged LeetCode problems. Always state time and space complexity. Handle all edge cases before submitting."
          />
          <PrepItem
            bold="Project architecture matters:"
            text="Be able to explain every project on your resume end-to-end: data model, API design, tech stack rationale, what went wrong, how you'd scale it. The HM round probes technical depth, not just what you built."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>Similar Companies to Explore</SectionLabel>
        <SimilarCompanies companies={[
          { name: "Swiggy",    slug: "swiggy" },
          { name: "Meesho",    slug: "meesho" },
          { name: "Flipkart",  slug: "flipkart" },
          { name: "PhonePe",   slug: "phonepe" },
          { name: "Razorpay",  slug: "razorpay" },
        ]} />
      </section>

      <Disclaimer company="Zomato" />
    </article>
  );
}
