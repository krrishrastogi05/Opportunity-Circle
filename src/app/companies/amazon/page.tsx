import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RoleTabs } from "@/components/company/RoleTabs";
import { HiringCalendar } from "@/components/company/HiringCalendar";
import {
  SectionLabel, StatCard, OpportunityBlock,
  SkillBar, PrepItem, SimilarCompanies, Disclaimer, CompanyBreadcrumb,
} from "@/components/company/CompanyLayout";

export const metadata = {
  title: "Amazon — Company Profile",
  description:
    "Understand Amazon India's hiring process, opportunity types, DSA expectations, and what it generally takes to get an internship or full-time SDE role.",
};

/* ── Page ─────────────────────────────────────────── */

export default function AmazonPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">

      {/* 1. Breadcrumb */}
      <CompanyBreadcrumb company="Amazon" />

      {/* ── Header ─────────────────────────────────── */}
      <header className="mb-10">
        {/* Logo + name row */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center shrink-0 overflow-hidden p-1.5">
            <Image src="/companies/amazon.png" alt="Amazon" width={48} height={48} className="object-contain" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Amazon</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              amazon.com · amazon.jobs
            </p>
          </div>
        </div>

        {/* Category tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {["Big Tech", "E-commerce", "Cloud (AWS)", "DSA-Heavy", "LP-Driven"].map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>
          ))}
        </div>

        {/* One-liner */}
        <p className="text-base text-muted-foreground leading-relaxed">
          Amazon is one of the most active tech recruiters in India. Their hiring process is distinctly structured around{" "}
          <strong className="font-semibold text-foreground">DSA problem-solving</strong> and{" "}
          <strong className="font-semibold text-foreground">Leadership Principles (LPs)</strong> — both are treated as equally important filters.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatCard label="DSA Expectation"  value="High"          sub="Medium–Hard" />
          <StatCard label="Candidate Level"  value="Intermediate+" sub="Competitive" />
          <StatCard label="Campus Access"    value="Broad"         sub="Tier 1 & 2 + Off-campus" />
        </div>
      </header>

      <Separator className="mb-10" />

      {/* ── Opportunities in India ─────────────────── */}
      <section className="mb-10">
        <SectionLabel>Opportunities in India</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Amazon runs multiple distinct hiring tracks for students in India. Each has a different duration, access mode, and timeline.
        </p>

        <div>
          <OpportunityBlock
            title="2-Month Summer Internship (SDE Intern)"
            type="Internship · 2 months"
            access="Campus + Off-campus"
          >
            <p>
              The flagship summer intern program. Generally runs May–July for pre-final year students.
              Amazon visits <strong className="text-foreground font-medium">select Tier-1 and Tier-2 campuses</strong> during placement season
              (typically Oct–Dec for the following summer). Off-campus candidates can apply through the{" "}
              <a
                href="https://www.amazon.jobs/en/teams/university-programs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5"
              >
                Amazon Jobs portal <ExternalLink className="w-3 h-3 inline" />
              </a>
              {" "}or interest forms sent by Amazon APAC.
            </p>
            <p className="text-xs text-muted-foreground/70 italic">
              Campus patterns vary each year. Always verify with your placement cell.
            </p>
          </OpportunityBlock>

          <OpportunityBlock
            title="6-Month Internship (SDE Intern — Long Duration)"
            type="Internship · 6 months"
            access="Off-campus portal + Amazon HackOn"
          >
            <p>
              A longer-duration internship typically offered to students who can take a semester off or are in their final year.
              Two main access routes exist:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>
                <strong className="text-foreground font-medium">Amazon Jobs Portal</strong> — Direct application via{" "}
                <a
                  href="https://www.amazon.jobs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5"
                >
                  amazon.jobs <ExternalLink className="w-3 h-3 inline" />
                </a>
                , searching for &ldquo;University&rdquo; or &ldquo;SDE Intern&rdquo; roles.
              </li>
              <li>
                <strong className="text-foreground font-medium">Amazon HackOn</strong> — A flagship hiring challenge hosted on Unstop.
                Top performers are fast-tracked for intern interviews and sometimes PPI (Pre-Placement Interview) opportunities.{" "}
                <a
                  href="https://unstop.com/hackathons/amazon-hackon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5"
                >
                  Amazon HackOn on Unstop <ExternalLink className="w-3 h-3 inline" />
                </a>
              </li>
            </ul>
          </OpportunityBlock>

          <OpportunityBlock
            title="SDE-1 (Full-Time — Fresher)"
            type="Full-time · Entry Level"
            access="Campus + Off-campus portal"
          >
            <p>
              Amazon&apos;s entry-level software development role. Freshers are hired through two paths:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>
                <strong className="text-foreground font-medium">Campus placement drives</strong> — Amazon University Talent Acquisition visits colleges annually (usually Sept–Jan).
              </li>
              <li>
                <strong className="text-foreground font-medium">Off-campus interest forms</strong> — Amazon periodically sends hiring interest forms to students. Shortlisted candidates receive a direct application link on amazon.jobs.
              </li>
            </ul>
            <p className="text-xs text-muted-foreground/70 italic mt-2">
              Minimum CGPA of 6.5 and no active backlogs is a commonly stated eligibility criterion, though this may vary by drive.
            </p>
          </OpportunityBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* ── Hiring Calendar ────────────────────────── */}
      <section className="mb-10">
        <SectionLabel>When does Amazon hire? (approx. calendar)</SectionLabel>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Hover over any month to see what&apos;s typically happening for that track. Months vary each year — use this as a rough mental model.
        </p>
        <HiringCalendar />
      </section>

      <Separator className="mb-10" />

      {/* ── Interview Process (Tabbed) ─────────────── */}
      <section className="mb-10">
        <SectionLabel>Interview Process by Role</SectionLabel>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Select a role to see the access routes, interview rounds, and key focus areas specific to that track.
        </p>
        <RoleTabs />
      </section>

      <Separator className="mb-10" />

      {/* ── Skill Importance ───────────────────────── */}
      <section className="mb-10">
        <SectionLabel>Skill Importance at Amazon</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Based on general community experience. ●●● = widely essential, ●●○ = generally important, ●○○ = sometimes relevant.
        </p>
        <div>
          <SkillBar label="DSA (Data Structures & Algorithms)" level={3} />
          <SkillBar label="Leadership Principles (Behavioral)" level={3} />
          <SkillBar label="CS Fundamentals (OS, DBMS, Networks)" level={2} />
          <SkillBar label="Projects (demonstrated ownership)" level={2} />
          <SkillBar label="Low-Level Design (LLD / OOP)" level={1} />
          <SkillBar label="System Design / HLD" level={1} />
          <SkillBar label="Competitive Programming (Codeforces)" level={1} />
        </div>
        <p className="text-xs text-muted-foreground/60 italic mt-4">
          LP preparation is treated as seriously as DSA at Amazon. Students who skip behavioral prep are often rejected despite strong coding.
        </p>
      </section>

      <Separator className="mb-10" />

      {/* ── What to prepare ────────────────────────── */}
      <section className="mb-10">
        <SectionLabel>General Preparation Guidance</SectionLabel>
        <ul className="space-y-3">
          <PrepItem bold="DSA:" text="Practice LeetCode Medium–Hard problems. Focus on Arrays, Trees, Graphs, DP, and Greedy. Amazon-tagged problems on LeetCode are a useful filter." />
          <PrepItem bold="Leadership Principles:" text="Prepare 8–10 STAR stories from your projects. Map each story to one or more of Amazon's 16 LPs before your interview." />
          <PrepItem bold="Think aloud:" text="Amazon interviewers prioritize your thought process. Start with a brute-force approach, explain its limitations, then optimize iteratively." />
          <PrepItem bold="Complexity:" text="Always state time and space complexity. Be ready to discuss trade-offs between approaches." />
          <PrepItem bold="CS Fundamentals:" text="OS concepts, DBMS indexing and transactions, and networking basics can appear as follow-ups, especially in the OA." />
        </ul>
      </section>

      <Separator className="mb-10" />

      {/* 8. Similar Companies */}
      <section className="mb-10">
        <SectionLabel>Similar Companies to Explore</SectionLabel>
        <SimilarCompanies companies={[
          { name: "Google",    slug: "google" },
          { name: "Microsoft", slug: "microsoft" },
          { name: "Flipkart",  slug: "flipkart" },
          { name: "Uber",      slug: "uber" },
          { name: "Rippling",  slug: "rippling" },
        ]} />
      </section>

      {/* 9. Disclaimer */}
      <Disclaimer company="Amazon" />
    </article>
  );
}
