import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SectionLabel, StatCard, OpportunityBlock, RoundBlock,
  SkillBar, DiffBox, PrepItem, SimilarCompanies, Disclaimer, CompanyBreadcrumb,
} from "@/components/company/CompanyLayout";

export const metadata = {
  title: "Microsoft — Company Profile",
  description:
    "Understand Microsoft India's hiring process — campus-heavy, DSA + CS fundamentals + LLD, Growth Mindset culture, and what it takes for an SDE intern or full-time role.",
};

export default function MicrosoftPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">

      {/* 1. Breadcrumb */}
      <CompanyBreadcrumb company="Microsoft" />

      {/* 2. Header */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center shrink-0">
            {/* Microsoft 4-square logo */}
            <svg width="28" height="28" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
              <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
              <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
              <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Microsoft</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              microsoft.com ·{" "}
              <a href="https://careers.microsoft.com/" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                careers.microsoft.com <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {["Big Tech", "Cloud & Productivity", "Hyderabad & Bangalore", "CS Fundamentals", "Growth Mindset", "Campus-Heavy"].map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>
          ))}
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          Microsoft is one of the most accessible Big Tech employers in India, with one of its largest engineering
          campuses in Hyderabad. Their process combines{" "}
          <strong className="font-semibold text-foreground">DSA, CS fundamentals, and basic LLD</strong> — more
          balanced than Google (pure DSA) or Rippling (pure design). Microsoft explicitly evaluates{" "}
          <strong className="font-semibold text-foreground">Growth Mindset</strong> as a cultural criterion across all rounds.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatCard label="DSA Expectation"  value="High"        sub="Easy–Medium primarily" />
          <StatCard label="CS Fundamentals"  value="Essential"   sub="OS · DBMS · OOP" />
          <StatCard label="Campus Access"    value="Very Broad"  sub="IITs · NITs · BITS + Tier-2" />
        </div>
      </header>

      <Separator className="mb-10" />

      {/* 3. What makes Microsoft different */}
      <section className="mb-10">
        <SectionLabel>What makes Microsoft different</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Microsoft is often described as the most well-rounded Big Tech hire — it tests DSA, CS fundamentals, LLD, and behavioral all in one loop.
        </p>
        <div>
          <DiffBox icon="📚" title="CS fundamentals are formally tested">
            Microsoft is one of the few Big Tech companies where OS, DBMS, and OOP concepts are directly asked — not just as follow-ups.
            Expect questions on process scheduling, memory management, database indexing, transaction isolation, and OOP design principles across technical rounds.
          </DiffBox>
          <DiffBox icon="🌱" title="Growth Mindset is a formal eval criterion">
            Every round includes a behavioral component called &ldquo;Growth Mindset&rdquo; evaluation — how you handle feedback,
            approach problems you don&apos;t know, and respond to making mistakes during the interview.
            Being collaborative and intellectually humble matters here in a way it doesn&apos;t at Amazon or Google.
          </DiffBox>
          <DiffBox icon="🎓" title="Microsoft Engage & Mentorship programs">
            Microsoft runs{" "}
            <strong className="font-semibold text-foreground">Microsoft Engage</strong> (formerly Engage Mentorship) — a 4-week
            program for second-year students that often leads to intern/PPO opportunities.
            This is a unique early-career pathway separate from standard campus placement.
          </DiffBox>
          <DiffBox icon="🌐" title="Hyderabad campus is one of the largest outside the US">
            Microsoft India Development Center (MSIDC) in Hyderabad is one of the largest Microsoft engineering campuses globally.
            Engineers here work on Azure, Microsoft 365, Visual Studio, and core platform products.
            The work is product-grade and impactful from day one.
          </DiffBox>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 4. Opportunities */}
      <section className="mb-10">
        <SectionLabel>Opportunities in India</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Microsoft hires broadly across Tier-1 and select Tier-2 campuses, plus strong off-campus routes.
        </p>
        <div>
          <OpportunityBlock
            title="Microsoft Engage Program (2nd year students)"
            type="Mentorship + project · 4 weeks"
            access="Off-campus · msft.social/engage"
          >
            <p>
              A mentorship program for second-year students who complete a project under Microsoft mentorship.
              Strong performers are often offered a PPO for the SDE internship. Applications typically open in early
              <strong className="font-medium text-foreground"> January–February</strong> each year.
            </p>
            <p className="text-xs text-muted-foreground/70 italic">
              One of the best early-career pathways for students before their pre-final year.
            </p>
          </OpportunityBlock>

          <OpportunityBlock
            title="SDE Internship"
            type="Internship · 2 months"
            access="Campus (Tier-1 & 2) + Off-campus"
          >
            <p>
              Summer internship (May–July) for pre-final year students. Microsoft visits a wide range of campuses —
              <strong className="font-medium text-foreground"> IITs, NITs, BITS, VIT, Manipal, and many Tier-2 institutes</strong>
              {" "}during placement season. CGPA cutoff often 7.5+ on campus, but varies by college.
            </p>
            <p>
              Off-campus applications via{" "}
              <a href="https://careers.microsoft.com/" target="_blank" rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                careers.microsoft.com <ExternalLink className="w-3 h-3 inline" />
              </a>.
            </p>
          </OpportunityBlock>

          <OpportunityBlock
            title="SDE-1 (Full-Time Fresher)"
            type="Full-time · Entry Level"
            access="Campus + careers.microsoft.com"
          >
            <p>
              Full-time SDE roles via campus placement (broad institute coverage, Aug–Feb) and the careers portal.
              The full-time loop is similar to the internship loop but with an additional System Design round.
            </p>
            <p className="text-xs text-muted-foreground/70 italic">
              Microsoft is one of the most accessible Big Tech companies for students outside Tier-1 institutes.
            </p>
          </OpportunityBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 5. Interview Process */}
      <section className="mb-10">
        <SectionLabel>Interview Process (3–4 rounds)</SectionLabel>
        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
          Intern loop: 2–3 technical rounds + behavioral. Full-time: same + System Design. Every round has a Growth Mindset component.
        </p>
        <div>
          <RoundBlock round="1" label="Online Assessment" tag="DSA · 60–90 min">
            2–3 DSA problems on Codility or similar. Difficulty: Easy to Medium. Topics: Arrays, Strings,
            Trees, Linked Lists, Sorting. CGPA screening happens before the OA on many campuses.
          </RoundBlock>
          <RoundBlock round="2" label="Technical Round 1 — DSA" tag="Live coding · 45–60 min">
            Core DSA problem-solving. Topics: Arrays, Trees, Graphs, DP, Linked Lists.
            Interviewers look for clean code, clear complexity analysis, and good communication.
            A behavioral Growth Mindset question is typically asked at the end of the round
            (e.g., &ldquo;tell me about a time you made a mistake and how you recovered&rdquo;).
          </RoundBlock>
          <RoundBlock round="3" label="Technical Round 2 — CS Fundamentals + LLD" tag="Fundamentals · 45–60 min">
            Mix of CS fundamentals and basic design. Direct questions on OS (process scheduling, deadlocks,
            virtual memory), DBMS (normalization, indexing, SQL queries, transactions), and OOP (SOLID, design patterns,
            inheritance vs composition). May include a basic LLD problem (URL shortener, vending machine).
          </RoundBlock>
          <RoundBlock round="4" label="System Design / Hiring Manager" tag="SDE-1 · 45–60 min">
            For full-time SWE roles. Basic system design (not as rigorous as Amazon or Uber).
            Discuss scalability at a conceptual level. HM round discusses your projects, career goals,
            and team-fit aligned with Microsoft&apos;s Growth Mindset culture.
          </RoundBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 6. Skill Importance */}
      <section className="mb-10">
        <SectionLabel>Skill Importance at Microsoft</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          ●●● = widely essential · ●●○ = generally important · ●○○ = sometimes relevant
        </p>
        <div>
          <SkillBar label="DSA (Data Structures & Algorithms)"    level={3} note="core of every round" />
          <SkillBar label="CS Fundamentals (OS, DBMS, OOP)"       level={3} note="directly asked — not just follow-ups" />
          <SkillBar label="Communication & Growth Mindset"         level={2} note="formal eval component" />
          <SkillBar label="Basic LLD / System Design"             level={2} note="SDE-1 and above" />
          <SkillBar label="Project depth"                         level={2} note="HM round discussion" />
          <SkillBar label="Machine Coding"                        level={1} note="not a standard round" />
          <SkillBar label="Competitive Programming"               level={1} note="not a primary signal" />
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 7. Preparation Guide */}
      <section className="mb-10">
        <SectionLabel>How to prepare</SectionLabel>
        <ul className="space-y-3">
          <PrepItem
            bold="DSA — LeetCode Easy to Medium:"
            text="Microsoft's DSA difficulty is more accessible than Google or Uber. Focus on core topics: Arrays, Strings, Trees, Graphs, Linked Lists, DP. Use Microsoft-tagged LeetCode problems. 150–200 quality problems is a good target."
          />
          <PrepItem
            bold="CS Fundamentals are mandatory:"
            text="Unlike Google, Microsoft directly asks OS and DBMS questions. Revise: process vs thread, deadlocks, virtual memory, paging, B-tree indexing, normalization, SQL joins and transactions, ACID properties, OOP principles."
          />
          <PrepItem
            bold="Growth Mindset stories:"
            text="Every round ends with a behavioral question. Prepare 3–4 stories about making mistakes and recovering, receiving critical feedback, and collaborating under pressure. Be genuine — Microsoft interviewers probe for authenticity."
          />
          <PrepItem
            bold="Apply to Engage early:"
            text="If you're in your second year, Microsoft Engage (applications ~Jan–Feb) is one of the best early pathways. It's less competitive than direct campus placement and has a direct PPO pipeline."
          />
          <PrepItem
            bold="Broad campus access — verify with your T&P cell:"
            text="Microsoft visits many institutes beyond IITs and NITs. Check with your Training & Placement cell for Microsoft's campus visit schedule. Many students at Tier-2 institutes successfully get shortlisted."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      {/* 8. Similar Companies */}
      <section className="mb-10">
        <SectionLabel>Similar Companies to Explore</SectionLabel>
        <SimilarCompanies companies={[
          { name: "Google",    slug: "google" },
          { name: "Amazon",    slug: "amazon" },
          { name: "Atlassian", slug: "atlassian" },
          { name: "Uber",      slug: "uber" },
          { name: "Rippling",  slug: "rippling" },
        ]} />
      </section>

      {/* 9. Disclaimer */}
      <Disclaimer company="Microsoft" />
    </article>
  );
}
