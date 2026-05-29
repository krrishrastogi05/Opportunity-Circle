import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

// Static preview cards — will be replaced with DB data in Phase 1
const previewCompanies = [
  {
    slug: "google",
    name: "Google",
    category: "Big Tech",
    categoryColor: "text-blue-500 bg-blue-500/10",
    dsaScore: 9,
    dsaLabel: "Very High",
    hiringStyles: ["DSA-Heavy", "System Design", "CP-Friendly"],
    candidateLevel: "Elite",
    levelColor: "text-red-500 bg-red-500/10",
    tagline: "Generally considered one of the most DSA-intensive hiring processes globally.",
  },
  {
    slug: "razorpay",
    name: "Razorpay",
    category: "Fintech",
    categoryColor: "text-violet-500 bg-violet-500/10",
    dsaScore: 6,
    dsaLabel: "Moderate",
    hiringStyles: ["Project-Heavy", "DSA-Moderate", "Off-Campus-Friendly"],
    candidateLevel: "Intermediate",
    levelColor: "text-amber-500 bg-amber-500/10",
    tagline: "Project depth and system thinking are generally valued alongside standard DSA.",
  },
  {
    slug: "jane-street",
    name: "Jane Street",
    category: "Quant / HFT",
    categoryColor: "text-emerald-500 bg-emerald-500/10",
    dsaScore: 8,
    dsaLabel: "High (Math + CS)",
    hiringStyles: ["CP-Friendly", "Math-Heavy", "Highly Selective"],
    candidateLevel: "Elite",
    levelColor: "text-red-500 bg-red-500/10",
    tagline: "Mathematical reasoning and functional thinking are distinctly emphasised here.",
  },
  {
    slug: "freshworks",
    name: "Freshworks",
    category: "SaaS",
    categoryColor: "text-cyan-500 bg-cyan-500/10",
    dsaScore: 5,
    dsaLabel: "Moderate",
    hiringStyles: ["Project-Heavy", "Broad Campus", "Beginner-Accessible"],
    candidateLevel: "Intermediate",
    levelColor: "text-amber-500 bg-amber-500/10",
    tagline: "Generally considered accessible with emphasis on practical coding and product thinking.",
  },
];

function DsaBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="text-xs font-mono text-muted-foreground w-6 text-right">
        {score}/10
      </span>
    </div>
  );
}

export function CompanyPreview() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-border" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Company Explorer
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Browse company profiles.
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-lg">
              Uniform profiles — not job listings. Understand what each company
              is like before you start preparing.
            </p>
          </div>
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border bg-card hover:bg-accent hover:border-primary/30 transition-colors self-start sm:self-auto flex-shrink-0"
          >
            All Companies
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {previewCompanies.map((co) => (
            <Link
              key={co.slug}
              href={`/companies/${co.slug}`}
              id={`company-preview-${co.slug}`}
              className="group flex flex-col gap-3 p-5 rounded-2xl border border-border bg-card card-hover"
            >
              {/* Top row: name + category */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {co.name}
                  </p>
                  <span className={`inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${co.categoryColor}`}>
                    {co.category}
                  </span>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${co.levelColor}`}>
                  {co.candidateLevel}
                </span>
              </div>

              {/* Tagline */}
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {co.tagline}
              </p>

              {/* DSA bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-muted-foreground font-medium">
                    DSA Expectation
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {co.dsaLabel}
                  </span>
                </div>
                <DsaBar score={co.dsaScore} />
              </div>

              {/* Hiring style tags */}
              <div className="flex flex-wrap gap-1 mt-auto pt-1">
                {co.hiringStyles.slice(0, 2).map((s) => (
                  <span
                    key={s}
                    className="text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
                {co.hiringStyles.length > 2 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground">
                    +{co.hiringStyles.length - 2}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-xs text-center text-muted-foreground/60">
          All company profiles reflect general community perception, not official
          benchmarks. Hiring patterns change yearly — verify independently.
        </p>
      </div>
    </section>
  );
}
