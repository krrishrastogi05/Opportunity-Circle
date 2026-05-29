import Link from "next/link";

const paths = [
  {
    href: "/companies",
    num: "01",
    label: "Company Explorer",
    desc: "Browse every company by hiring style, DSA weight, and what they generally expect — all in a uniform format.",
    primary: true,
  },
  {
    href: "/opportunities",
    num: "02",
    label: "Live Deadlines",
    desc: "Hackathons, open source programs, and internship windows — sorted by urgency, updated every season.",
    primary: true,
  },
  {
    href: "/open-source",
    num: "03",
    label: "Open Source Programs",
    desc: "GSoC, LFX, Outreachy, GSSoC, MLH — stipend, timeline, and step-by-step guide for each.",
    primary: false,
  },
];

export function WhatSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-5">

        {/* Header */}
        <div className="mb-10 sm:mb-14 max-w-md">
          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">
            What&apos;s inside
          </p>
          <h2 className="text-2xl sm:text-4xl font-semibold leading-tight tracking-tight">
            Everything in one{" "}
            <span className="font-display italic font-normal text-primary">
              structured
            </span>{" "}
            place.
          </h2>
        </div>

        {/* List — primary items visually louder */}
        <div className="divide-y divide-border/50">
          {paths.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className={`group flex items-start gap-5 sm:gap-6 py-6 sm:py-7 transition-colors hover:text-foreground ${
                p.primary ? "" : "opacity-70 hover:opacity-100"
              }`}
            >
              {/* Number */}
              <span className={`font-display italic shrink-0 leading-none mt-1 transition-colors ${
                p.primary
                  ? "text-2xl sm:text-3xl text-muted-foreground/40 group-hover:text-primary/60"
                  : "text-xl sm:text-2xl text-muted-foreground/25 group-hover:text-primary/40"
              }`}>
                {p.num}
              </span>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <p className={`font-semibold text-foreground underline-accent ${
                    p.primary ? "text-base sm:text-lg" : "text-sm sm:text-base"
                  }`}>
                    {p.label}
                  </p>
                  {p.primary && (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                      Core
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>

              {/* Arrow */}
              <span className={`shrink-0 text-muted-foreground/30 group-hover:text-primary mt-1 transition-all duration-200 group-hover:translate-x-1 ${
                p.primary ? "text-lg" : "text-base"
              }`}>
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
