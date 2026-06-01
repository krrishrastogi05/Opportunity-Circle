import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SectionLabel, StatCard, OpportunityBlock, RoundBlock,
  SkillBar, DiffBox, PrepItem, SimilarCompanies, Disclaimer, CompanyBreadcrumb,
} from "@/components/company/CompanyLayout";

export const metadata = {
  title: "Razorpay — Company Profile",
  description:
    "Understand Razorpay's hiring process in India — DSA + CS fundamentals + project depth, fintech domain awareness, campus and off-campus routes, Bangalore HQ.",
};

export default function RazorpayPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">

      {/* 1. Breadcrumb */}
      <CompanyBreadcrumb company="Razorpay" />

      {/* 2. Header */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <CompanyLogo name="Razorpay" slug="razorpay" size={56} rounded="rounded-2xl" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Razorpay</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              razorpay.com ·{" "}
              <a href="https://razorpay.com/jobs/" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                razorpay.com/jobs <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {["Indian Fintech", "Payments & Banking", "Bangalore HQ", "Project Depth Focus", "CS Fundamentals"].map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>
          ))}
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          Razorpay is one of India&apos;s leading fintech companies — a payments and banking platform that powers
          millions of Indian businesses. Their hiring process balances{" "}
          <strong className="font-semibold text-foreground">DSA, CS fundamentals, and deep project discussions</strong>.
          Fintech domain awareness (transactions, consistency, payment flows) is a distinct advantage.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatCard label="DSA Expectation"  value="High"        sub="Medium–Hard" />
          <StatCard label="CS Fundamentals"  value="Essential"   sub="OS · DBMS · Networks" />
          <StatCard label="Campus Access"    value="Broad"       sub="IITs · NITs · BITS + off-campus" />
        </div>
      </header>

      <Separator className="mb-10" />

      {/* 3. What makes Razorpay different */}
      <section className="mb-10">
        <SectionLabel>What makes Razorpay different</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Razorpay sits between Big Tech and Indian product startups — a balanced process with a fintech twist.
        </p>
        <div>
          <DiffBox title="Fintech domain awareness is a real edge">
            Razorpay builds payment gateways, UPI infrastructure, payroll systems, and banking APIs.
            Interviewers genuinely value candidates who understand transaction consistency, idempotency,
            distributed locks, and why payment systems require special reliability guarantees.
            A basic understanding of how payment flows work will set you apart.
          </DiffBox>
          <DiffBox title="Project discussion is as important as DSA">
            Every technical round at Razorpay includes a project discussion segment.
            Interviewers probe the architecture, trade-offs, and reasoning behind your resume projects.
            Listing a project you can&apos;t defend technically is a fast elimination path.
          </DiffBox>
          <DiffBox title="DBMS and OS are directly tested">
            Like Microsoft, Razorpay directly asks CS fundamentals — not just as follow-ups.
            DBMS (indexing, transactions, ACID properties, SQL), OS (process scheduling, semaphores, deadlocks),
            and OOPs are standard OA and interview components.
          </DiffBox>
          <DiffBox title="Fast-paced, impact-driven culture">
            Razorpay moves fast. Engineers own features end-to-end from early in their career.
            The HM round evaluates not just culture-fit but whether you&apos;re comfortable with ambiguity,
            rapid iteration, and making technical calls independently.
          </DiffBox>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 4. Opportunities */}
      <section className="mb-10">
        <SectionLabel>Opportunities in India</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Razorpay hires from campuses and off-campus for both internship and full-time roles at their Bangalore office.
        </p>
        <div>
          <OpportunityBlock
            title="SDE Internship"
            type="Internship · 2–6 months"
            access="Campus (IITs, NITs, BITS) + Off-campus"
          >
            <p>
              Razorpay recruits from Tier-1 campuses during placement season (Aug–Feb) and also hires
              off-campus through their{" "}
              <a href="https://razorpay.com/jobs/" target="_blank" rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                careers portal <ExternalLink className="w-3 h-3 inline" />
              </a>{" "}
              and LinkedIn referrals. Interns work on real payment infrastructure — not side projects.
            </p>
            <p className="text-xs text-muted-foreground/70 italic">
              PPO is offered to high-performing interns.
            </p>
          </OpportunityBlock>

          <OpportunityBlock
            title="SDE-1 (Full-Time Fresher)"
            type="Full-time · Entry Level"
            access="Campus + Portal + Referral"
          >
            <p>
              Full-time SDE roles available via campus placement and direct portal applications.
              Off-campus candidates benefit significantly from referrals — reach out to Razorpay engineers
              on LinkedIn. The full-time loop adds a Hiring Manager round to the intern process.
            </p>
          </OpportunityBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 5. Interview Process */}
      <section className="mb-10">
        <SectionLabel>Interview Process (3–4 rounds)</SectionLabel>
        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
          The process is structured but more balanced than pure DSA shops — expect fundamentals and project depth throughout.
        </p>
        <div>
          <RoundBlock round="1" label="Online Assessment" tag="DSA + CS Fundamentals · 60–90 min">
            MCQs on Computer Science fundamentals (OS, DBMS, OOPs, Computer Networks) + 1–3 coding
            problems (Medium to Hard). The MCQ section is eliminatory — do not skip fundamentals preparation.
            Coding topics: Sliding Window, Trees, Graphs, Hashing, DP.
          </RoundBlock>
          <RoundBlock round="2" label="Technical Round 1 — DSA + Project" tag="Live coding · 45–60 min">
            DSA problem (Medium–Hard) + deep project discussion. Expect the interviewer to ask
            &ldquo;walk me through this project&rdquo; and then probe the architecture, data model, tech stack choices,
            and scaling decisions. Dry-run your code on sample inputs when prompted.
          </RoundBlock>
          <RoundBlock round="3" label="Technical Round 2 — Fundamentals + Design" tag="Concepts · 45–60 min">
            Direct CS fundamentals questions: DBMS indexing, transactions, ACID, SQL queries,
            OS scheduling, semaphores, OOP design. May include a basic LLD problem relevant to
            fintech (e.g., design a transaction ledger, idempotent payment handler).
          </RoundBlock>
          <RoundBlock round="4" label="Hiring Manager Round" tag="Culture + domain + project">
            &ldquo;Why Razorpay?&rdquo; and fintech domain interest. Behavioral questions around ambiguity, ownership,
            and iterating under pressure. Deep dive into your most complex project. Fintech awareness
            (payment systems, consistency models) is a genuine advantage here.
          </RoundBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 6. Skill Importance */}
      <section className="mb-10">
        <SectionLabel>Skill Importance at Razorpay</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          ●●● = widely essential · ●●○ = generally important · ●○○ = sometimes relevant
        </p>
        <div>
          <SkillBar label="DSA (Data Structures & Algorithms)"    level={3} note="Medium–Hard focus" />
          <SkillBar label="CS Fundamentals (OS, DBMS, Networks)"  level={3} note="directly tested in OA + rounds" />
          <SkillBar label="Project depth & architecture"          level={3} note="every technical round" />
          <SkillBar label="Fintech domain awareness"              level={2} note="distinct edge in HM round" />
          <SkillBar label="Basic LLD / OOP design"               level={2} note="may appear in round 3" />
          <SkillBar label="System Design / HLD"                  level={1} note="rarely asked for interns" />
          <SkillBar label="Machine Coding"                       level={1} note="not a standard round" />
        </div>
        <p className="text-xs text-muted-foreground/60 italic mt-4">
          Razorpay is one of the few companies where a weak project discussion can eliminate a strong DSA candidate.
        </p>
      </section>

      <Separator className="mb-10" />

      {/* 7. Preparation Guide */}
      <section className="mb-10">
        <SectionLabel>How to prepare</SectionLabel>
        <ul className="space-y-3">
          <PrepItem
            bold="CS Fundamentals — don't skip the OA MCQs:"
            text="Razorpay's OA has a strong MCQ section on OS, DBMS, OOP, and Networks. Revise: process scheduling, deadlocks, paging, SQL (joins, GROUP BY, subqueries), normalization, ACID properties, indexing, TCP/IP basics."
          />
          <PrepItem
            bold="DSA — LeetCode Medium to Hard:"
            text="Focus on Sliding Window, Trees, Graphs, DP, and Hashing. Practice Razorpay-tagged problems on LeetCode. 150–200 problems is a good base. Always dry-run your code on examples before finalizing."
          />
          <PrepItem
            bold="Project ownership is critical:"
            text="Prepare to discuss every project on your resume 3 layers deep — what it does, the architecture, why you chose the tech stack, what problems you hit, and what you'd redesign. Shallow projects don't survive Razorpay's technical interviews."
          />
          <PrepItem
            bold="Learn fintech basics:"
            text="Understand how payment gateways work (merchant → payment gateway → bank), what UPI is, why idempotency matters in payment APIs, and what transaction isolation levels do. Even surface-level knowledge helps in the HM round."
          />
          <PrepItem
            bold="Referral for off-campus:"
            text="Cold portal applications have low response rates. Connect with Razorpay engineers at their Bangalore office on LinkedIn — a referral can get your resume to the right team much faster."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      {/* 8. Similar Companies */}
      <section className="mb-10">
        <SectionLabel>Similar Companies to Explore</SectionLabel>
        <SimilarCompanies companies={[
          { name: "Rippling",   slug: "rippling" },
          { name: "Flipkart",   slug: "flipkart" },
          { name: "Atlassian",  slug: "atlassian" },
          { name: "Microsoft",  slug: "microsoft" },
          { name: "Amazon",     slug: "amazon" },
        ]} />
      </section>

      {/* 9. Disclaimer */}
      <Disclaimer company="Razorpay" />
    </article>
  );
}
