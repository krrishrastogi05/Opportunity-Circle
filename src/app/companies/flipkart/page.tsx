import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SectionLabel, StatCard, OpportunityBlock, RoundBlock,
  SkillBar, DiffBox, PrepItem, SimilarCompanies, Disclaimer, CompanyBreadcrumb,
} from "@/components/company/CompanyLayout";

export const metadata = {
  title: "Flipkart — Company Profile",
  description:
    "Understand Flipkart's hiring process in India — campus-heavy, machine coding round, DSA expectations, and what it generally takes for an internship or SDE role.",
};

/* ── Page ─────────────────────────────────────────── */

export default function FlipkartPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">

      {/* 1. Breadcrumb */}
      <CompanyBreadcrumb company="Flipkart" />

      {/* 2. Header */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-[#2874F0] flex items-center justify-center shrink-0">
            <span style={{ color: "#fff", fontSize: 26, fontWeight: 800, fontFamily: "sans-serif" }}>F</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Flipkart</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              flipkart.com ·{" "}
              <a href="https://www.flipkartcareers.com" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                flipkartcareers.com <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {["Indian E-commerce", "Machine Coding Round", "Bangalore HQ", "Campus-Heavy"].map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>
          ))}
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          Flipkart is India&apos;s largest e-commerce company and one of the most active campus recruiters.
          Their hiring process is unique for having a{" "}
          <strong className="font-semibold text-foreground">Machine Coding Round</strong> as a standard
          stage — a 90-minute timed round where you build a working mini-application from scratch using OOP principles.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatCard label="DSA Expectation"  value="High"            sub="Medium–Hard" />
          <StatCard label="Unique Round"     value="Machine Coding"  sub="90 min · OOP focus" />
          <StatCard label="Campus Access"    value="Broad"           sub="IITs · NITs · BITS + off-campus" />
        </div>
      </header>

      <Separator className="mb-10" />

      {/* 3. What makes Flipkart different */}
      <section className="mb-10">
        <SectionLabel>What makes Flipkart different</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Flipkart&apos;s process stands out in the Indian startup hiring landscape. These four factors shape what you need to prepare.
        </p>
        <div>
          <DiffBox icon="🏗️" title="Machine Coding Round is non-negotiable">
            90-min round to build a console application (e.g., Splitwise, Food Delivery, Parking Lot) from scratch.
            Evaluated on OOP design, code structure, SOLID principles, edge case handling. Many strong DSA candidates
            fail here due to poor LLD preparation.
          </DiffBox>
          <DiffBox icon="🛒" title="India-first product thinking">
            As India&apos;s largest e-commerce platform, Flipkart values candidates who can think about scale,
            reliability, and affordability at Indian internet scale. HM rounds often include product sense discussions.
          </DiffBox>
          <DiffBox icon="📁" title="Hackathon access via Flipkart GRID">
            Flipkart GRID is a flagship annual hackathon on Unstop that acts as an additional off-campus hiring funnel.
            Top performers get shortlisted for the intern/SDE interview process.{" "}
            <a href="https://unstop.com/hackathons/flipkart-grid" target="_blank" rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
              Flipkart GRID on Unstop <ExternalLink className="w-3 h-3 inline" />
            </a>
          </DiffBox>
          <DiffBox icon="⚡" title="PPO culture is strong">
            High-performing interns are regularly converted to full-time SDE-1 through the PPO route.
            The internship is a genuine evaluation period.
          </DiffBox>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 4. Opportunities in India */}
      <section className="mb-10">
        <SectionLabel>Opportunities in India</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Flipkart runs multiple hiring tracks for students in India — campus drives, direct portal applications, and open hackathons.
        </p>
        <div>
          <OpportunityBlock
            title="SDE Internship (Summer)"
            type="Internship · 2 months"
            access="Campus (IITs, NITs, BITS) + Flipkart GRID"
          >
            <p>
              Runs May–July. Campus drives at major institutes during placement season. Off-campus access via{" "}
              <a href="https://unstop.com/hackathons/flipkart-grid" target="_blank" rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                Flipkart GRID hackathon on Unstop <ExternalLink className="w-3 h-3 inline" />
              </a>
              {" "}— top performers are shortlisted for interviews. Strong PPO pipeline.
            </p>
          </OpportunityBlock>

          <OpportunityBlock
            title="SDE-1 (Full-Time Fresher)"
            type="Full-time · Entry Level"
            access="Campus + Off-campus portal"
          >
            <p>
              Available via campus placement (Aug–Feb season) and{" "}
              <a href="https://careers.flipkart.com" target="_blank" rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                careers.flipkart.com <ExternalLink className="w-3 h-3 inline" />
              </a>
              . Flipkart hires broadly from IITs, NITs, BITS, VIT, Manipal, and other institutes. Off-campus via direct portal applications.
            </p>
          </OpportunityBlock>

          <OpportunityBlock
            title="GRID Hackathon (Off-campus funnel)"
            type="Hackathon → Interview"
            access="Off-campus · Unstop"
          >
            <p>
              Flipkart GRID is Flipkart&apos;s flagship engineering contest. Conducted in stages (online MCQ + coding + project).
              Top performers are directly shortlisted for Flipkart internship/SDE interviews.{" "}
              <a href="https://unstop.com/hackathons/flipkart-grid" target="_blank" rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                Flipkart GRID on Unstop <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </OpportunityBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 5. Interview Process */}
      <section className="mb-10">
        <SectionLabel>Interview Process (4 rounds)</SectionLabel>
        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
          Flipkart&apos;s standard loop includes a rare Machine Coding Round that eliminates many otherwise strong candidates.
        </p>
        <div>
          <RoundBlock round="1" label="Online Assessment" tag="DSA · 60–90 min">
            2–3 DSA problems (Medium difficulty). Topics: Greedy, DFS/BFS, Sliding Window, Priority Queues,
            String manipulation. Clean, correct code required.
          </RoundBlock>
          <RoundBlock round="2" label="DSA Technical Round" tag="Live coding · 45–60 min">
            Problem-solving round with follow-up optimizations. Must think aloud, state complexity, handle edge cases.
            Topics: Arrays, Trees, Graphs, DP, Hashing.
          </RoundBlock>
          <RoundBlock round="3" label="Machine Coding Round" tag="LLD · 90 min">
            Build a working application from scratch. Common problems: Splitwise, Food Ordering System, Library Management,
            Cab Booking. Judged on OOP design, SOLID principles, class structure, extensibility, readable code.
            This is a decisive round — many good DSA candidates are eliminated here.
          </RoundBlock>
          <RoundBlock round="4" label="Hiring Manager Round" tag="Project depth + culture fit">
            Discussion of resume projects (technical depth), behavioral questions around ownership and customer focus,
            and Flipkart&apos;s &ldquo;DNA&rdquo; (customer-first, move fast). Prepare project architecture discussions.
          </RoundBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 6. Skill Importance */}
      <section className="mb-10">
        <SectionLabel>Skill Importance at Flipkart</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          ●●● = widely essential · ●●○ = generally important · ●○○ = sometimes relevant
        </p>
        <div>
          <SkillBar label="Machine Coding / LLD / OOP"            level={3} note="standalone timed round" />
          <SkillBar label="DSA (Data Structures & Algorithms)"    level={3} note="Medium–Hard" />
          <SkillBar label="Project depth & design decisions"      level={2} note="HM round focus" />
          <SkillBar label="CS Fundamentals (OS, DBMS, OOP)"       level={2} note="follow-up questions" />
          <SkillBar label="High-Level Design (System Design)"     level={1} note="interns rarely asked" />
          <SkillBar label="Competitive Programming"               level={1} note="not a signal" />
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 7. Preparation Guide */}
      <section className="mb-10">
        <SectionLabel>How to prepare</SectionLabel>
        <ul className="space-y-3">
          <PrepItem
            bold="Machine Coding first:"
            text="Practice building small working applications in 60–90 min. Common problems: Parking Lot, Splitwise, In-Memory Cache, Book My Show (booking system). Focus on clean OOP, SOLID principles. Use design patterns like Strategy, Observer, Factory."
          />
          <PrepItem
            bold="DSA — LeetCode Medium:"
            text="Practice standard topics. Flipkart's DSA difficulty is Medium (slightly easier than Amazon SDE-1). Use Flipkart-tagged LeetCode problems as reference."
          />
          <PrepItem
            bold="Know your projects deeply:"
            text="The HM round probes architecture and trade-offs. Be able to explain your projects 3 layers deep — architecture, data model, and what you'd improve."
          />
          <PrepItem
            bold="Apply via GRID:"
            text="If you're off-campus or from a non-Tier-1 institute, Flipkart GRID is your best entry point. It's open to all students and has consistently led to interview calls."
          />
          <PrepItem
            bold="Think customer-first:"
            text="Flipkart values a product mindset. In HM rounds, frame your answers around impact, reliability, and user experience — not just technical correctness."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      {/* 8. Similar Companies */}
      <section className="mb-10">
        <SectionLabel>Similar Companies to Explore</SectionLabel>
        <SimilarCompanies companies={[
          { name: "Amazon",  slug: "amazon" },
          { name: "Meesho",  slug: "meesho" },
          { name: "Swiggy",  slug: "swiggy" },
          { name: "Zomato",  slug: "zomato" },
          { name: "Nykaa",   slug: "nykaa" },
        ]} />
      </section>

      {/* 9. Disclaimer */}
      <Disclaimer company="Flipkart" />

    </article>
  );
}
