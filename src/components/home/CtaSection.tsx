import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30 dark:opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/20 to-transparent pointer-events-none" />

      {/* Orbs */}
      <div className="orb-animate absolute -left-20 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="orb-animate-slow absolute -right-20 top-1/3 w-64 h-64 rounded-full bg-primary/6 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
          <MapPin className="w-7 h-7 text-primary" />
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
          Stop piecing together advice
          <br className="hidden sm:block" />
          from{" "}
          <span className="shimmer-text">random sources.</span>
        </h2>

        <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Explore a structured career map. Browse companies, understand
          opportunity types, learn what skills matter and where — all in one
          calm, beginner-friendly place.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/companies"
            id="cta-companies"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold
                       bg-primary text-primary-foreground hover:bg-primary/90
                       shadow-lg shadow-primary/25 hover:shadow-primary/40
                       transition-all duration-200 active:scale-95 w-full sm:w-auto justify-center"
          >
            Explore Companies
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/skills"
            id="cta-skills"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold
                       border border-border bg-card text-foreground
                       hover:bg-accent hover:border-primary/30
                       transition-all duration-200 active:scale-95 w-full sm:w-auto justify-center"
          >
            Browse Skills
          </Link>
        </div>

        {/* Disclaimer note */}
        <p className="mt-10 text-xs text-muted-foreground/50 max-w-lg mx-auto leading-relaxed">
          OpportunitySignal is a career awareness platform — not a job board.
          All information is for general awareness. Hiring patterns change
          yearly; always verify with recent, independent sources.
        </p>
      </div>
    </section>
  );
}
