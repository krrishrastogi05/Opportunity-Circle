import Link from "next/link";

const paths = [
  {
    href: "/companies",
    num: "01",
    label: "Company Explorer",
    desc: "Browse companies by hiring style, DSA weight, and what they generally expect.",
  },
  {
    href: "/opportunities",
    num: "02",
    label: "Opportunity Types",
    desc: "Internships, open source, fellowships, hackathons — understand what each path looks like.",
  },
  {
    href: "/skills",
    num: "03",
    label: "Skill Library",
    desc: "Plain-English explanations of DSA, LLD, HLD, OS, DBMS, projects and more.",
  },
  {
    href: "/guides",
    num: "04",
    label: "Expectation Guides",
    desc: "What intern level, fresher level, big tech, and startup paths generally require.",
  },
];

export function WhatSection() {
  return (
    <section className="py-28 sm:py-36">
      <div className="max-w-5xl mx-auto px-5">

        {/* Header */}
        <div className="mb-16 max-w-md">
          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">
            What&apos;s inside
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight">
            Four ways to{" "}
            <span className="font-display italic font-normal text-primary">
              explore
            </span>
            .
          </h2>
        </div>

        {/* List — editorial, no cards */}
        <div className="divide-y divide-border/50">
          {paths.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex items-start gap-6 py-7 transition-colors hover:text-foreground"
            >
              {/* Number */}
              <span className="font-display italic text-3xl text-muted-foreground/30 group-hover:text-primary/60 transition-colors shrink-0 leading-none mt-1">
                {p.num}
              </span>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-base group-hover:underline-accent mb-1.5 underline-accent">
                  {p.label}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>

              {/* Arrow */}
              <span className="shrink-0 text-muted-foreground/30 group-hover:text-primary mt-1 text-lg transition-all duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
