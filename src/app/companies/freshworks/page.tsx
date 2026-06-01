import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SectionLabel, StatCard, OpportunityBlock, RoundBlock,
  SkillBar, DiffBox, PrepItem, SimilarCompanies, Disclaimer, CompanyBreadcrumb,
} from "@/components/company/CompanyLayout";

export const metadata = {
  title: "Freshworks — Company Profile",
  description:
    "Understand Freshworks' hiring process in India — DSA + CS fundamentals, SaaS product mindset, Chennai & Bangalore offices, campus and off-campus routes.",
};

export default function FreshworksPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">
      <CompanyBreadcrumb company="Freshworks" />

      <header className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <CompanyLogo name="Freshworks" slug="freshworks" size={56} rounded="rounded-2xl" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Freshworks</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              freshworks.com ·{" "}
              <a href="https://www.freshworks.com/company/careers/" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                freshworks.com/careers <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {["Indian SaaS", "CRM & Helpdesk", "Chennai & Bangalore", "Accessible DSA Bar", "NASDAQ Listed", "Campus-Friendly"].map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>
          ))}
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          Freshworks is India&apos;s most successful SaaS company (Freshdesk, Freshsales, Freshservice) and the{" "}
          <strong className="font-semibold text-foreground">first Indian SaaS company to list on NASDAQ</strong>.
          Their hiring process is more accessible than Big Tech — DSA at Easy–Medium difficulty,
          combined with CS fundamentals and project discussions. A great option for students who want
          product engineering at scale without the extreme algorithmic pressure of Amazon or Google.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatCard label="DSA Expectation"  value="Moderate"    sub="Easy–Medium focus" />
          <StatCard label="CS Fundamentals"  value="Important"   sub="OOP · DBMS · OS" />
          <StatCard label="Campus Access"    value="Very Broad"  sub="IITs · NITs · BITS · Tier-2" />
        </div>
      </header>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>What makes Freshworks different</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Freshworks is the right company for engineers who want product depth, customer-facing impact, and a genuinely accessible interview process.
        </p>
        <div>
          <DiffBox title="India's leading SaaS success story">
            Freshworks was founded in Chennai in 2010 and grew to a $1B+ ARR NASDAQ-listed company
            without moving its engineering headquarters. The Chennai and Bangalore teams build the core
            product. Engineers here work on real enterprise software used by 65,000+ businesses globally —
            Freshdesk (helpdesk), Freshsales (CRM), Freshservice (ITSM), and Freshchat.
          </DiffBox>
          <DiffBox title="Accessible bar — quality over extreme algorithmic complexity">
            Freshworks&apos; DSA difficulty is Easy to Medium — genuinely more accessible than Amazon, Uber,
            or PhonePe. They prioritise candidates who write clean code, understand product engineering
            fundamentals, and can reason about real customer-facing systems. Knowing their products
            and demonstrating product thinking is a meaningful edge.
          </DiffBox>
          <DiffBox title="Take-home assignments for some roles">
            For some SDE roles (especially backend or full-stack), Freshworks uses a take-home challenge
            (12–24 hours) to build a small feature or API. This tests practical engineering ability,
            code organisation, and attention to edge cases — not just whiteboard performance under pressure.
          </DiffBox>
          <DiffBox title="OOP and DBMS are directly tested">
            OOP principles (abstraction, inheritance, encapsulation, polymorphism), DBMS (SQL queries,
            normalisation, indexing), and sometimes basic networking/API concepts appear across OA and
            interview rounds. Freshworks builds enterprise software — they care about well-structured,
            maintainable code from day one.
          </DiffBox>
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>Opportunities in India</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Freshworks has offices in Chennai (HQ) and Bangalore. They recruit broadly across Tier-1 and Tier-2 campuses — one of the most campus-accessible product companies in India.
        </p>
        <div>
          <OpportunityBlock
            title="SDE Internship"
            type="Internship · 2–3 months"
            access="Campus (Broad) + Off-campus"
          >
            <p>
              Freshworks visits a wide range of campuses — IITs, NITs, BITS, VIT, SRM, PSG Tech, and many
              other Tier-2 institutes. Applications also accepted via the careers portal and referrals.
              Interns work on live product features (Freshdesk, Freshsales) serving real enterprise customers.
            </p>
            <p className="text-xs text-muted-foreground/70 italic">PPO offered to high-performing interns.</p>
          </OpportunityBlock>

          <OpportunityBlock
            title="SDE-1 (Full-Time Fresher)"
            type="Full-time · Entry Level"
            access="Campus (Very Broad) + freshworks.com/careers"
          >
            <p>
              One of the most campus-accessible product companies in India. Freshworks hires from an
              exceptionally broad set of institutes. Off-campus via the careers portal at{" "}
              <a href="https://www.freshworks.com/company/careers/" target="_blank" rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                freshworks.com/careers <ExternalLink className="w-3 h-3 inline" />
              </a>.
              A great first product engineering job for students from non-Tier-1 institutes.
            </p>
          </OpportunityBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>Interview Process (3–4 rounds)</SectionLabel>
        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
          More balanced than Big Tech — DSA difficulty is accessible, but CS fundamentals and project depth matter significantly.
        </p>
        <div>
          <RoundBlock round="1" label="Online Assessment" tag="DSA + CS Fundamentals · 60–90 min">
            3–4 coding problems (Easy to Medium) + MCQs on DSA, DBMS, SQL, OOP. The aptitude section
            may include logical reasoning. Difficulty is more accessible than Amazon or PhonePe —
            but clean, optimal code is still expected. Pass all test cases.
          </RoundBlock>
          <RoundBlock round="2" label="Take-home Challenge (some roles)" tag="Practical engineering · 12–24 hrs">
            For specific backend or full-stack roles, a take-home assignment to build a small API or
            feature. Evaluated on code structure, separation of concerns, edge case handling, and
            documentation quality. This is a practical engineering test, not an algorithmic one.
          </RoundBlock>
          <RoundBlock round="3" label="Technical Interview" tag="DSA + CS Fundamentals + Project · 45–60 min">
            Live coding (Easy–Medium DSA), direct OOP questions (design patterns, inheritance vs composition),
            DBMS (SQL queries, normalisation, indexing), and OS basics. Significant portion on resume
            project deep-dive — architecture, tech choices, challenges, and how you&apos;d improve it.
          </RoundBlock>
          <RoundBlock round="4" label="Managerial / HR Round" tag="Culture fit + motivation">
            Why Freshworks? Team collaboration, handling feedback, and career goals.
            Demonstrating knowledge of Freshworks&apos; products (Freshdesk, Freshsales, Freshservice)
            and genuine interest in B2B SaaS engineering is a meaningful positive signal.
          </RoundBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>Skill Importance at Freshworks</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          ●●● = widely essential · ●●○ = generally important · ●○○ = sometimes relevant
        </p>
        <div>
          <SkillBar label="DSA (Data Structures & Algorithms)"   level={2} note="Easy–Medium focus" />
          <SkillBar label="CS Fundamentals (OOP, DBMS, OS)"      level={3} note="directly tested in OA + interviews" />
          <SkillBar label="Project depth & tech decisions"       level={3} note="technical interview focus" />
          <SkillBar label="Code quality & structure"             level={2} note="especially in take-home rounds" />
          <SkillBar label="SQL proficiency"                      level={2} note="joins, GROUP BY, subqueries" />
          <SkillBar label="Machine Coding / LLD"                 level={1} note="not a standard round" />
          <SkillBar label="System Design / HLD"                  level={1} note="rarely asked at entry level" />
        </div>
        <p className="text-xs text-muted-foreground/60 italic mt-4">
          Freshworks is one of the best targets for students who have strong fundamentals but are not targeting extreme DSA competition.
        </p>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>How to prepare</SectionLabel>
        <ul className="space-y-3">
          <PrepItem
            bold="DSA — LeetCode Easy to Medium is the target:"
            text="150–200 well-solved problems is more than enough. Focus on Arrays, Strings, Trees, Linked Lists, Hashing, Graphs (BFS/DFS), and basic DP. Freshworks does not require competitive programming or Hard LeetCode proficiency."
          />
          <PrepItem
            bold="OOP fundamentals are mandatory:"
            text="Revise all four pillars (abstraction, encapsulation, inheritance, polymorphism) with real code examples. Know SOLID principles, when to use composition vs inheritance, and basic design patterns (Factory, Singleton, Observer). These are directly asked."
          />
          <PrepItem
            bold="SQL is a real filter:"
            text="Practice SQL: GROUP BY with HAVING, JOIN types (INNER, LEFT, FULL), subqueries, window functions. Know when to use NoSQL vs SQL, what normalisation achieves, and what indexing does. Freshworks builds enterprise software — database proficiency matters."
          />
          <PrepItem
            bold="Know Freshworks' products:"
            text="Spend 30 minutes understanding Freshdesk (helpdesk for customer support), Freshsales (CRM), and Freshservice (IT service management). In the HM round, candidates who can discuss why B2B SaaS is interesting and what engineering challenges it creates stand out significantly."
          />
          <PrepItem
            bold="Broad campus access — check with your T&P cell:"
            text="Freshworks visits far more campuses than most product companies. Even if you're at a Tier-2 institute, check with your T&P cell for Freshworks visits. They are one of the most campus-accessible quality product companies in India."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>Similar Companies to Explore</SectionLabel>
        <SimilarCompanies companies={[
          { name: "Atlassian",  slug: "atlassian" },
          { name: "Razorpay",   slug: "razorpay" },
          { name: "Microsoft",  slug: "microsoft" },
          { name: "Salesforce", slug: "salesforce" },
          { name: "Meesho",     slug: "meesho" },
        ]} />
      </section>

      <Disclaimer company="Freshworks" />
    </article>
  );
}
