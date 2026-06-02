import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SectionLabel, StatCard, OpportunityBlock, RoundBlock,
  SkillBar, DiffBox, PrepItem, SimilarCompanies, Disclaimer, CompanyBreadcrumb,
} from "@/components/company/CompanyLayout";

export const metadata = {
  title: "Cisco — Company Profile",
  description:
    "Understand Cisco India's hiring — networking & infrastructure giant in Bengaluru. The 'Code with Cisco' code-a-thon, OA pattern, and what it takes for an internship or full-time engineering role.",
};

export default function CiscoPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">
      <CompanyBreadcrumb company="Cisco" />

      <header className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <CompanyLogo name="Cisco" slug="cisco" size={56} rounded="rounded-2xl" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Cisco</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              cisco.com ·{" "}
              <a href="https://careers.cisco.com/global/en/india" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                careers <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {["Networking & Infra", "Security", "Bengaluru Hub", "DSA + CS Fundamentals", "Code with Cisco"].map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>
          ))}
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          Cisco is a global leader in networking, security, and infrastructure that powers much of the
          internet&apos;s backbone. Its Bengaluru campus is one of the largest engineering sites outside the US.
          For students, Cisco&apos;s most accessible entry point is{" "}
          <strong className="font-semibold text-foreground">Code with Cisco</strong> — a nationwide code-a-thon
          that fast-tracks strong performers into internship and full-time roles, with no CGPA or branch barrier.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatCard label="DSA Expectation"  value="Medium"        sub="MCQ + coding" />
          <StatCard label="CS Fundamentals"  value="Important"     sub="OS · DBMS · Networking" />
          <StatCard label="Campus Access"    value="Broad"         sub="All branches · code-a-thon" />
        </div>
      </header>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>What makes Cisco different</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Cisco values potential over credentials — its flagship student program is explicitly open to all branches and colleges.
        </p>
        <div>
          <DiffBox title="Code with Cisco is the real entry point">
            Rather than relying only on campus placements, Cisco runs a national code-a-thon (Code with Cisco)
            that anyone passing out in the eligible year can enter via their placement cell. It&apos;s a direct,
            merit-based route into internship and full-time engineering roles — no CGPA cutoff, no branch filter.
          </DiffBox>
          <DiffBox title="Networking & systems context helps">
            As an infrastructure company, Cisco rewards candidates who understand computer networks, operating
            systems, and how large-scale systems communicate. Solid CS fundamentals matter alongside DSA.
          </DiffBox>
          <DiffBox title="Common Entrance Test (CCET)">
            The first gate is the Cisco Common Entrance Test — a mix of multiple-choice questions and coding
            challenges, remotely AI-proctored. No negative marking, 90-minute test with a 30-minute login window.
          </DiffBox>
          <DiffBox title="Team-based, in-person finale">
            Top contestants are flown to the Cisco Bengaluru campus for a sponsored 2-day in-person code-a-thon —
            teams are assigned by Cisco, so collaboration and communication matter as much as raw coding.
          </DiffBox>
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>Opportunities in India</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Cisco hires through campus placements and the Code with Cisco code-a-thon, primarily into its Bengaluru engineering teams.
        </p>
        <div>
          <OpportunityBlock
            title="Code with Cisco (Code-a-thon)"
            type="Code-a-thon → Internship / Full-time"
            access="Final-year students (eligible batch) · all branches"
          >
            <p>
              A national code-a-thon and the most accessible route into Cisco for students. Clear the Common
              Entrance Test, advance through the online stages, and the top teams compete in person at the
              Bengaluru campus — with internship and full-time offers for strong performers. Register via your
              placement cell.{" "}
              <a href="https://careers.cisco.com/global/en/india/etr/code-with-cisco" target="_blank" rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5">
                Code with Cisco <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </OpportunityBlock>

          <OpportunityBlock
            title="Campus Internship & New-Grad Roles"
            type="Internship · Full-time"
            access="Campus + Portal"
          >
            <p>
              Standard campus and off-campus engineering hiring into networking, security, and cloud teams.
              Expect an OA followed by technical interviews on DSA and CS fundamentals.
            </p>
          </OpportunityBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>Code with Cisco — Process</SectionLabel>
        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
          A multi-stage, merit-based funnel from a national online test down to an in-person finale.
        </p>
        <div>
          <RoundBlock round="1" label="Registration & Kick-off" tag="Via placement cell">
            Eligible final-year students register through their college placement cell. Individual registration
            only — teams are assigned later by Cisco.
          </RoundBlock>
          <RoundBlock round="2" label="Common Entrance Test (CCET)" tag="MCQ + coding · 90 min">
            AI-proctored online assessment combining multiple-choice questions and coding challenges. No negative
            marking; 30-minute login window. A skills-based evaluation of your core fundamentals.
          </RoundBlock>
          <RoundBlock round="3" label="Code-a-thon Begins — Top Contestants" tag="Shortlist + pre-work">
            Top contestants are announced and grouped into teams. Align on pre-work and kickstart collaboration
            before the finale.
          </RoundBlock>
          <RoundBlock round="4" label="In-person Code-a-thon (Bengaluru)" tag="2 days · Cisco campus">
            A Cisco-sponsored, in-person 2-day code-a-thon and demos at the Bengaluru campus. Top teams win prizes
            and the chance at internship / full-time offers, plus networking with industry experts.
          </RoundBlock>
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>Skill Importance at Cisco</SectionLabel>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          ●●● = widely essential · ●●○ = generally important · ●○○ = sometimes relevant
        </p>
        <div>
          <SkillBar label="DSA (Data Structures & Algorithms)" level={3} note="MCQ + coding in the CCET" />
          <SkillBar label="CS Fundamentals (OS, DBMS, Networking)" level={3} note="core to an infra company" />
          <SkillBar label="Networking concepts" level={2} note="a real edge given Cisco's domain" />
          <SkillBar label="Teamwork & communication" level={2} note="assigned teams in the finale" />
          <SkillBar label="Project depth" level={2} note="discussed in interviews" />
          <SkillBar label="Competitive Programming" level={1} note="helps in the timed test" />
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>How to prepare</SectionLabel>
        <ul className="space-y-3">
          <PrepItem
            bold="Register through your placement cell early:"
            text="Code with Cisco registration runs through colleges — talk to your placement cell as soon as it opens so you don't miss the unique test link."
          />
          <PrepItem
            bold="Revise CS fundamentals:"
            text="Operating systems, DBMS, and computer networks are weighted heavily for an infrastructure company. Don't go in with DSA alone."
          />
          <PrepItem
            bold="Practice timed MCQ + coding:"
            text="The CCET mixes MCQs and coding in 90 minutes with no negative marking — answer everything, manage time, and don't leave MCQs blank."
          />
          <PrepItem
            bold="Be ready to collaborate:"
            text="Teams are assigned by Cisco for the finale. Communication, dividing work, and presenting your solution matter as much as the code."
          />
        </ul>
      </section>

      <Separator className="mb-10" />

      <section className="mb-10">
        <SectionLabel>Similar Companies to Explore</SectionLabel>
        <SimilarCompanies companies={[
          { name: "Microsoft",  slug: "microsoft" },
          { name: "Google",     slug: "google" },
          { name: "Atlassian",  slug: "atlassian" },
          { name: "Rippling",   slug: "rippling" },
          { name: "Uber",       slug: "uber" },
        ]} />
      </section>

      <Disclaimer company="Cisco" />
    </article>
  );
}
