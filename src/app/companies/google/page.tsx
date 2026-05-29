import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SectionLabel, StatCard, OpportunityBlock, RoundBlock,
  SkillBar, DiffBox, PrepItem, SimilarCompanies, Disclaimer, CompanyBreadcrumb,
} from "@/components/company/CompanyLayout";

export const metadata = {
  title: "Google — Company Profile",
  description:
    "Understand Google India's hiring process — campus-heavy, pure DSA focus, Googleyness evaluation, and what it takes for a STEP Intern, SWE Intern, or full-time SWE role.",
};

export default function GooglePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">

      {/* 1. Breadcrumb */}
      <CompanyBreadcrumb company="Google" />

      {/* 2. Header */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          {/* Google G mark */}
          <div className="w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center shrink-0">
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M43.6 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11C34.5 31 32.9 33 30.5 34.4v4.5h6.9C41.2 35.2 43.6 30.3 43.6 24.5z" fill="#4285F4"/>
              <path d="M24 44c5.4 0 9.9-1.8 13.2-4.8l-6.9-4.5c-1.8 1.2-4.1 1.9-6.4 1.9-4.9 0-9-3.3-10.5-7.8H6.5v4.6C9.8 39.9 16.4 44 24 44z" fill="#34A853"/>
              <path d="M13.5 28.8c-.4-1.2-.6-2.5-.6-3.8s.2-2.6.6-3.8v-4.6H6.5C5 19.4 4 21.6 4 24s1 4.6 2.5 7.4l7-5.6z" fill="#FBBC05"/>
              <path d="M24 10.4c2.7 0 5.1 1 7 2.8l5.2-5.2C32.9 5 28.4 3 24 3 16.4 3 9.8 7.1 6.5 13.4l7 5.6C15 14.7 19.1 10.4 24 10.4z" fill="#EA4335"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Google</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              google.com ·{" "}
              <a href="https://careers.google.com/" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                careers.google.com <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {["Big Tech", "Search & Cloud", "Hyderabad & Bangalore", "Pure DSA Focus", "Campus-Heavy"].map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>
          ))}
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          Google is among the most prestigious tech employers globally and one of the most active Big Tech campus recruiters
          in India. Their process is almost entirely{" "}
          <strong className="font-semibold text-foreground">DSA-focused</strong> — no machine coding, no extensive LLD.
          The bar is extremely high and competitive, but the process is one of the most transparent in the industry.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatCard label="DSA Expectation"  value="Extreme"       sub="Hard (LeetCode scale)" />
          <StatCard label="Design Rounds"    value="Minimal"       sub="Basic HLD for SWE" />
          <StatCard label="Campus Access"    value="Broad"         sub="IITs · NITs · BITS + off-campus" />
        </div>
      </header>

      <Separator className="mb-10" />

      {/* 3. What makes Google different */}
      <section className="mb-10">
        <SectionLabel>What makes Google different</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Google's hiring process is uniquely focused and different from every other company on this list.
        </p>
        <div>
          <DiffBox icon="📐" title="Pure DSA — no machine coding, minimal LLD">
            Unlike Flipkart or Rippling, Google does not have a dedicated Machine Coding or LLD round for most intern and entry-level SWE roles.
            Every round is algorithmic. You write code on a shared Google Doc (no IDE, no compiler) and think through edge cases verbally.
            The focus is on your problem-solving methodology, not OOP design.
          </DiffBox>
          <DiffBox icon="🧠" title="Googleyness — culture is a formal eval criterion">
            Every Google interview round has a &ldquo;Googleyness&rdquo; component — interviewers formally rate you on collaboration, intellectual humility, intellectual curiosity, and how you respond to hints.
            Being technically correct but communicating poorly or being rigid will still get you rejected.
          </DiffBox>
          <DiffBox icon="📝" title="No IDE — shared document coding">
            Google interviews are conducted on a shared document (Google Docs or a similar tool), not an IDE.
            You must write syntactically clean code mentally, without autocomplete or compiler support.
            Practicing on paper or a plain text editor is genuinely useful preparation.
          </DiffBox>
          <DiffBox icon="🎓" title="STEP Internship for first/second-year students">
            Google runs the{" "}
            <strong className="font-semibold text-foreground">STEP (Student Training in Engineering Program)</strong> for
            first and second-year students — a unique early-career pathway not offered by most Big Tech companies.
            Applications open around August–October each year.
          </DiffBox>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 4. Opportunities */}
      <section className="mb-10">
        <SectionLabel>Opportunities in India</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Google has engineering offices in Hyderabad and Bangalore and recruits both on-campus and off-campus.
        </p>
        <div>
          <OpportunityBlock
            title="STEP Internship (1st & 2nd year students)"
            type="Internship · 10–12 weeks"
            access="Off-campus · careers.google.com"
          >
            <p>
              The Student Training in Engineering Program is Google&apos;s early-career internship for first and second-year students.
              Applications open around <strong className="font-medium text-foreground">August–October</strong> each year on the careers portal.
              No campus visits — fully applied online. It is highly competitive globally.
            </p>
            <p className="text-xs text-muted-foreground/70 italic">
              Apply at{" "}
              <a href="https://careers.google.com/programs/step/" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                careers.google.com/programs/step <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </OpportunityBlock>

          <OpportunityBlock
            title="SWE Internship (pre-final year)"
            type="Internship · 10–12 weeks"
            access="Campus (Tier-1) + Off-campus"
          >
            <p>
              The standard Software Engineering Internship for pre-final year students. Google visits
              <strong className="font-medium text-foreground"> IITs, NITs, BITS, and select other institutes</strong> during campus placement season.
              Applications also open on the careers portal (Aug–Nov for the following summer).
            </p>
            <p>
              CGPA cutoff is typically 7.0+, but technical ability is the primary filter.
              Referrals improve resume shortlisting chances but don&apos;t bypass the interview process.
            </p>
          </OpportunityBlock>

          <OpportunityBlock
            title="SWE (Full-Time Fresher)"
            type="Full-time · Entry Level"
            access="Campus + careers.google.com"
          >
            <p>
              Full-time SWE roles via campus placement at Tier-1 institutes (Aug–Feb season)
              and via the careers portal. Google&apos;s full-time loop adds a System Design round absent in intern interviews.
            </p>
            <p className="text-xs text-muted-foreground/70 italic">
              Off-campus: Apply at careers.google.com. Competition is extremely high.
            </p>
          </OpportunityBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 5. Interview Process */}
      <section className="mb-10">
        <SectionLabel>Interview Process (3–5 rounds)</SectionLabel>
        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
          Intern loop: typically 2–3 technical rounds. Full-time SWE: 4–5 rounds including System Design.
          All coding done on shared documents — no IDE.
        </p>
        <div>
          <RoundBlock round="1" label="Online Assessment (sometimes)" tag="DSA · 60–90 min">
            Some campus drives and off-campus paths start with an OA (1–2 coding problems, Easy–Medium difficulty).
            Not all candidates receive an OA — some are directly invited to interviews based on resume screening.
            OA performance determines shortlisting for the interview loop.
          </RoundBlock>
          <RoundBlock round="2" label="Technical Interview × 2–3" tag="Pure DSA · 45 min each">
            Core of the Google process. Each round: 1–2 DSA problems on a shared document.
            No compiler. You must write clean, syntactically correct code while thinking aloud.
            Interviewers assess problem decomposition, edge case identification, time/space complexity,
            and communication. Topics: Trees, Graphs, DP, Hashing, Sliding Window, Binary Search.
            Each round also includes a Googleyness evaluation — expect behavioral probing mid-round.
          </RoundBlock>
          <RoundBlock round="3" label="System Design" tag="SWE full-time · 45–60 min">
            Present in the full-time SWE loop, rarely for interns. Design a real-world system
            (e.g., URL shortener, YouTube watch history, distributed cache). Focus on scalability,
            API design, database selection, and trade-offs. Google interviewers value structured thinking
            over buzzword-dropping.
          </RoundBlock>
          <RoundBlock round="4" label="Googleyness & Leadership (sometimes separate)" tag="Behavioral">
            Some loops include a dedicated behavioral round. Discuss collaboration, intellectual curiosity,
            handling failure, and how you respond to feedback. Be genuinely self-reflective — Google
            interviewers are specifically trained to detect rehearsed vs authentic responses.
          </RoundBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 6. Skill Importance */}
      <section className="mb-10">
        <SectionLabel>Skill Importance at Google</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          ●●● = widely essential · ●●○ = generally important · ●○○ = sometimes relevant
        </p>
        <div>
          <SkillBar label="DSA (Data Structures & Algorithms)"   level={3} note="the entire eval — non-negotiable" />
          <SkillBar label="Problem decomposition & communication" level={3} note="Googleyness component" />
          <SkillBar label="Time & space complexity analysis"      level={3} note="expected in every round" />
          <SkillBar label="System Design / HLD"                  level={2} note="full-time SWE only" />
          <SkillBar label="CS Fundamentals (OS, DBMS)"           level={1} note="rarely tested directly" />
          <SkillBar label="Machine Coding / LLD"                 level={1} note="not a standard round" />
          <SkillBar label="Competitive Programming"               level={2} note="strong signal for shortlisting" />
        </div>
        <p className="text-xs text-muted-foreground/60 italic mt-4">
          Google is the most DSA-pure company on this list. If your goal is Google, DSA is your entire preparation focus.
        </p>
      </section>

      <Separator className="mb-10" />

      {/* 7. Preparation Guide */}
      <section className="mb-10">
        <SectionLabel>How to prepare</SectionLabel>
        <ul className="space-y-3">
          <PrepItem
            bold="LeetCode Hard is the target:"
            text="Google's DSA bar is among the highest in the industry. Practice 300+ problems, targeting Hard difficulty. Blind 75 and NeetCode 150 are popular structured roadmaps. Focus heavily on Graphs, DP, and Trees."
          />
          <PrepItem
            bold="Practice coding without an IDE:"
            text="Google interviews use shared documents with no compiler. Practice writing on Google Docs or paper. Your code must be syntactically clean — small bugs matter."
          />
          <PrepItem
            bold="Think aloud from the first word:"
            text="Interviewers evaluate communication as seriously as the answer. Start by restating the problem, ask clarifying questions, walk through examples, present brute force, then optimise. Never code in silence."
          />
          <PrepItem
            bold="Competitive programming helps shortlisting:"
            text="A Codeforces Expert rating or ICPC participation is a meaningful signal for resume shortlisting at Google. This is not true for most other companies on this list."
          />
          <PrepItem
            bold="Apply early for off-campus:"
            text="Google's portal opens around August–November. Apply as early as possible — hiring is rolling and positions fill up. STEP applications open around the same time for junior students."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      {/* 8. Similar Companies */}
      <section className="mb-10">
        <SectionLabel>Similar Companies to Explore</SectionLabel>
        <SimilarCompanies companies={[
          { name: "Microsoft", slug: "microsoft" },
          { name: "Amazon",    slug: "amazon" },
          { name: "Uber",      slug: "uber" },
          { name: "Atlassian", slug: "atlassian" },
          { name: "Rippling",  slug: "rippling" },
        ]} />
      </section>

      {/* 9. Disclaimer */}
      <Disclaimer company="Google" />
    </article>
  );
}
