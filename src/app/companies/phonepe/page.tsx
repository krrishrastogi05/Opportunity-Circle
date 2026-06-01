import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SectionLabel, StatCard, OpportunityBlock, RoundBlock,
  SkillBar, DiffBox, PrepItem, SimilarCompanies, Disclaimer, CompanyBreadcrumb,
} from "@/components/company/CompanyLayout";

export const metadata = {
  title: "PhonePe — Company Profile",
  description:
    "Understand PhonePe's hiring process in India — high DSA bar, LLD round, CS fundamentals, fintech domain advantage, Bangalore HQ.",
};

export default function PhonePePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">
      <CompanyBreadcrumb company="PhonePe" />

      <header className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <CompanyLogo name="PhonePe" slug="phonepe" size={56} rounded="rounded-2xl" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">PhonePe</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              phonepe.com ·{" "}
              <a href="https://www.phonepe.com/en/careers.html" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                phonepe.com/careers <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {["UPI & Payments", "Fintech", "Bangalore HQ", "High DSA Bar", "LLD Round", "Flipkart Spinoff"].map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>
          ))}
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          PhonePe is India&apos;s largest UPI payment platform (processed over 20 billion transactions/month in 2024),
          spun out of Flipkart and backed by Walmart. Their hiring bar is high —{" "}
          <strong className="font-semibold text-foreground">DSA at Hard difficulty</strong>, a Machine Coding /
          LLD round, CS fundamentals, and fintech domain awareness all feature. Engineers here work on
          payment infrastructure that cannot go down.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatCard label="DSA Expectation"  value="Very High"   sub="Medium–Hard (strict)" />
          <StatCard label="Design Rounds"    value="LLD + HLD"   sub="Both expected" />
          <StatCard label="Campus Access"    value="Tier-1"      sub="IITs · NITs · BITS" />
        </div>
      </header>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>What makes PhonePe different</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          PhonePe sits at the intersection of Big Tech rigor and Indian fintech urgency — a demanding but fast-moving engineering culture.
        </p>
        <div>
          <DiffBox icon="💸" title="Payment reliability is non-negotiable">
            PhonePe processes billions of UPI transactions. A 99.99% uptime requirement shapes the entire
            engineering culture. Interviews often probe reliability thinking: idempotency in payment APIs,
            distributed transaction management, and graceful degradation under load. This is not just domain
            trivia — it&apos;s a lens through which all design questions are evaluated.
          </DiffBox>
          <DiffBox icon="⚡" title="OA difficulty is among the highest in Indian startups">
            PhonePe&apos;s OA (3–4 problems, 80–90 minutes) consistently features Medium–Hard problems
            comparable to Codeforces 1500–2000 ratings. Solving 2–3 questions fully is typically enough
            to advance, but the bar for full solutions is high. Graph algorithms (Dijkstra&apos;s, multi-source BFS),
            DP, and Trees dominate.
          </DiffBox>
          <DiffBox icon="🏗️" title="LLD round tests concurrency & thread safety">
            PhonePe&apos;s Machine Coding / LLD round goes beyond simple OOP design — problems often involve
            concurrent operations (e.g., two users buying the last item simultaneously, idempotent payment
            retries, notification deduplication). Handling thread safety and concurrent-safe data structures
            is expected at a level above most other companies on this list.
          </DiffBox>
          <DiffBox icon="🎓" title="Flipkart heritage — similar process DNA">
            PhonePe spun out of Flipkart and shares hiring process DNA — strong emphasis on clean code,
            LLD design, and project depth. If you&apos;ve prepared for Flipkart&apos;s Machine Coding round,
            you&apos;re well-positioned for PhonePe&apos;s LLD round as well.
          </DiffBox>
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>Opportunities in India</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          PhonePe is headquartered in Bangalore and recruits from Tier-1 campuses. Off-campus routes are available but competitive.
        </p>
        <div>
          <OpportunityBlock
            title="SDE Internship"
            type="Internship · 2–3 months"
            access="Campus (IITs, NITs, BITS) + Off-campus"
          >
            <p>
              PhonePe visits Tier-1 campuses during placement season. Off-campus candidates can apply via{" "}
              <a href="https://www.phonepe.com/en/careers.html" target="_blank" rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                phonepe.com/careers <ExternalLink className="w-3 h-3 inline" />
              </a>{" "}
              or via referrals. Interns work on live payment infrastructure — UPI flows,
              merchant APIs, and reliability systems. Strong performers receive PPO offers.
            </p>
          </OpportunityBlock>

          <OpportunityBlock
            title="SDE-1 (Full-Time)"
            type="Full-time · Entry Level"
            access="Campus (Tier-1) + Portal + Referral"
          >
            <p>
              Full-time SDE roles via campus placement and the careers portal. PhonePe&apos;s hiring bar for SDE-1
              is notably high — they expect LLD and reliability thinking that many companies only require at SDE-2.
              Referrals from PhonePe engineers significantly improve response rates for off-campus applicants.
            </p>
          </OpportunityBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>Interview Process (3–4 rounds)</SectionLabel>
        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
          All rounds are often conducted in rapid succession — sometimes on the same day. Fast-paced, high-signal process.
        </p>
        <div>
          <RoundBlock round="1" label="Online Assessment" tag="3–4 problems · 80–90 min">
            Hard-level DSA. Topics: Graphs (Dijkstra&apos;s, multi-source BFS, topological sort),
            Dynamic Programming, Trees, Arrays. Solving 2–3 problems completely is typically sufficient
            to advance. Always think out loud — even in written OA responses, structure your approach.
          </RoundBlock>
          <RoundBlock round="2" label="DSA Technical Round × 1–2" tag="Live coding · 45 min">
            Live DSA problems with follow-up optimizations. Interviewers probe thought process heavily —
            present brute force first, then optimize step by step. Dry-run your code verbally on test cases.
            Expect mid-problem constraint changes to test adaptability.
          </RoundBlock>
          <RoundBlock round="3" label="Machine Coding / LLD" tag="Concurrent systems · 60–90 min">
            Design a working system, often with concurrency requirements: idempotent payment processor,
            lift/elevator system, notification deduplication engine, inventory manager with concurrent buyers.
            Clean OOP code, thread-safe data structures, and SOLID principles are all evaluated.
            This goes beyond most companies&apos; LLD rounds in depth.
          </RoundBlock>
          <RoundBlock round="4" label="Hiring Manager Round" tag="Project depth + fintech domain">
            Deep project discussion (3 layers: what, how, why). CS fundamentals (DBMS, OS) as follow-ups.
            Fintech awareness: why idempotency matters, how UPI works, what consistency guarantees
            payment systems need. Cultural fit: ownership, reliability mindset, handling production incidents.
          </RoundBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>Skill Importance at PhonePe</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          ●●● = widely essential · ●●○ = generally important · ●○○ = sometimes relevant
        </p>
        <div>
          <SkillBar label="DSA (Data Structures & Algorithms)"     level={3} note="Hard difficulty, strict bar" />
          <SkillBar label="Machine Coding / LLD + concurrency"     level={3} note="thread-safe design expected" />
          <SkillBar label="CS Fundamentals (OS, DBMS, Networking)" level={2} note="HM round & follow-ups" />
          <SkillBar label="Fintech domain awareness"               level={2} note="idempotency, UPI, reliability" />
          <SkillBar label="Project depth & architecture"           level={2} note="HM round focus" />
          <SkillBar label="High-Level System Design"              level={1} note="SDE-1 — basic discussions" />
          <SkillBar label="Competitive Programming"               level={2} note="strong OA signal" />
        </div>
        <p className="text-xs text-muted-foreground/60 italic mt-4">
          PhonePe&apos;s LLD expectations are higher than most Indian startups — concurrency-aware design is expected, not a bonus.
        </p>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>How to prepare</SectionLabel>
        <ul className="space-y-3">
          <PrepItem
            bold="Hard DSA is the baseline:"
            text="PhonePe's OA is one of the hardest in the Indian startup ecosystem. Practice Codeforces (target 1600–1800 rating) and Hard LeetCode problems. Focus on graph algorithms (Dijkstra's, multi-source BFS, Floyd-Warshall), advanced DP, and Trees. Always present brute force before optimizing."
          />
          <PrepItem
            bold="LLD with concurrency — the differentiator:"
            text="Practice LLD problems with concurrent access: idempotent payment processor, notification deduplication, inventory manager with race conditions. Study Java concurrent collections, mutex/semaphore patterns, and thread-safe singleton design. This separates PhonePe candidates from everyone else."
          />
          <PrepItem
            bold="Learn fintech fundamentals:"
            text="Understand how UPI works (VPA, NPCI routing, payment lifecycle), what idempotency means in payments (why retrying a payment should not charge twice), and basic distributed system consistency guarantees. This knowledge pays off across all rounds."
          />
          <PrepItem
            bold="DBMS and OS — focused revision:"
            text="DBMS: transactions, ACID, isolation levels (READ COMMITTED vs SERIALIZABLE), indexing, SQL query writing. OS: process vs thread, semaphores, deadlock conditions, virtual memory. These appear in HM rounds as follow-ups to design discussions."
          />
          <PrepItem
            bold="Referral is the most effective off-campus route:"
            text="PhonePe's cold portal response rates are low. Connect with PhonePe engineers at Bangalore on LinkedIn. Many PhonePe engineers are active on community forums — referrals are the single most effective way to get into the interview pipeline."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>Similar Companies to Explore</SectionLabel>
        <SimilarCompanies companies={[
          { name: "Razorpay", slug: "razorpay" },
          { name: "Flipkart", slug: "flipkart" },
          { name: "Swiggy",   slug: "swiggy" },
          { name: "Meesho",   slug: "meesho" },
          { name: "Uber",     slug: "uber" },
        ]} />
      </section>

      <Disclaimer company="PhonePe" />
    </article>
  );
}
