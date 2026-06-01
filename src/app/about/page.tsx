import Link from "next/link";
import { Linkedin, ArrowRight, Zap, Calendar, Search } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "Why OpportunitySignal exists — built by Krrish Rastogi after years of chasing national-level hackathons and deadlines across a dozen scattered platforms.",
};

const LINKEDIN_URL = "https://www.linkedin.com/in/krrish-rastogi-a41712283/";

export default function AboutPage() {
  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 pt-14 pb-24">
      {/* Eyebrow */}
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        The story
      </p>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1] mb-4">
        Built because tracking opportunities was a{" "}
        <span className="font-display italic font-normal text-primary">
          genuine pain.
        </span>
      </h1>

      <p className="text-muted-foreground leading-relaxed mb-10">
        OpportunitySignal is made by{" "}
        <Link
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
        >
          Krrish Rastogi
        </Link>{" "}
        — a student who got tired of missing deadlines that mattered.
      </p>

      {/* Body — blog style */}
      <div className="space-y-6 text-[15px] leading-relaxed text-foreground/85">
        <p>
          Over the last couple of years I competed in a bunch of national-level
          hackathons — HackOn with Amazon, Flipkart GRiD, the Goldman Sachs
          hackathon, and plenty more. They were some of the most rewarding things
          I did in college. They were also, honestly, a logistical nightmare to
          keep track of.
        </p>

        <p>
          Every opportunity lived somewhere different. Registration on Unstop.
          The coding round on HackerRank. Updates buried in a LinkedIn post you
          only saw if the algorithm felt like it. Deadlines hidden three clicks
          deep on a careers page. Open-source programs like GSoC and Outreachy
          on their own calendars entirely. I kept a messy notes file and{" "}
          <span className="font-display italic text-foreground">still</span>{" "}
          missed things — including a couple of PPI shots I genuinely wanted.
        </p>

        <p>
          The frustrating part was never the competition. It was that the hardest
          step was just{" "}
          <span className="font-semibold">finding out something existed</span>{" "}
          while there was still time to act on it. The signal was always there —
          it was just scattered across ten platforms and buried in noise.
        </p>

        <blockquote className="border-l-2 border-primary/50 pl-5 py-1 text-foreground/90 italic">
          So I built the thing I wished existed: one calm, structured place that
          tells you what&apos;s open, when it closes, and exactly what to do
          next.
        </blockquote>

        <p>
          That&apos;s OpportunitySignal. Real opportunities, sorted by urgency,
          with live deadlines and clear hiring pathways — hackathons that
          fast-track you to interviews, general hackathons, internships and
          programs, and open-source mentorships, each kept separate so you
          aren&apos;t wading through clutter.
        </p>
      </div>

      {/* What it does */}
      <div className="mt-12 grid sm:grid-cols-3 gap-3">
        {[
          {
            icon: Zap,
            title: "One signal",
            body: "Every open deadline and hiring pathway, in one feed sorted by urgency.",
          },
          {
            icon: Calendar,
            title: "Never miss it",
            body: "Live countdowns and alerts so a deadline never sneaks past you again.",
          },
          {
            icon: Search,
            title: "Zero clutter",
            body: "Categorised cleanly — hiring challenges, hackathons, programs, open source.",
          },
        ].map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <Icon className="w-4 h-4 text-primary mb-2" />
            <p className="text-sm font-semibold mb-1">{title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {body}
            </p>
          </div>
        ))}
      </div>

      {/* Author card */}
      <div className="mt-12 rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            Maker
          </p>
          <p className="text-lg font-bold">Krrish Rastogi</p>
          <p className="text-sm text-muted-foreground">
            Engineering student, hackathon competitor, and the person who got
            tired enough to build this.
          </p>
        </div>
        <Link
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90 transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          Connect on LinkedIn
        </Link>
      </div>

      {/* CTA */}
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Browse opportunities
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/companies"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:text-foreground transition-colors"
        >
          Explore companies
        </Link>
      </div>
    </article>
  );
}
