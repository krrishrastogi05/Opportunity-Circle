import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CompanyDock } from "@/components/home/CompanyDock";

export function HeroSection() {
  return (
    <section className="noise relative isolate min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-5">

      {/* Mesh gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Main deep bg — dark uses card colour for a very subtle lift */}
        <div className="absolute inset-0 bg-background" />

        {/* Warm amber orb — top left */}
        <div
          className="orb-1 absolute -top-48 -left-40 h-[560px] w-[560px] rounded-full
                     bg-primary/10 blur-[100px]"
        />
        {/* Purple/indigo orb — bottom right */}
        <div
          className="orb-2 absolute -bottom-32 -right-32 h-[480px] w-[480px] rounded-full
                     bg-[hsl(262_60%_55%/0.10)] blur-[90px]"
        />
        {/* Faint centre glow */}
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2
                        bg-primary/5 blur-[120px] rounded-full" />
      </div>

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-4xl w-full">

        {/* Eyebrow */}
        <div className="au inline-flex items-center gap-2 text-xs text-muted-foreground tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Career Intelligence Platform
        </div>

        {/* Headline — pain-first, action-oriented */}
        <h1 className="au1 text-[2.6rem] sm:text-6xl lg:text-7xl font-semibold leading-[1.06] tracking-tight text-foreground">
          Stop{" "}
          <span className="font-display italic font-normal text-primary">
            guessing.
          </span>
          <br />
          <span className="font-semibold">Start preparing.</span>
        </h1>

        {/* Sub — urgency-driven, not descriptive */}
        <p className="au2 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">
          Every{" "}
          <span className="text-foreground/80">company profile</span>,{" "}
          <span className="text-foreground/80">open deadline</span>, and{" "}
          <span className="underline-accent text-foreground/80">hiring pathway</span>{" "}
          — one structured place. Know exactly what to do next.
        </p>

        {/* CTAs */}
        <div className="au3 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/companies"
            id="hero-cta-companies"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
                       bg-primary text-primary-foreground hover:bg-primary/85
                       shadow-lg shadow-primary/20 transition-all duration-200 active:scale-[0.98]"
          >
            Find your target company
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/opportunities"
            id="hero-cta-opportunities"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium
                       border border-border/70 text-muted-foreground hover:text-foreground hover:border-border
                       transition-all duration-200"
          >
            See open deadlines
          </Link>
        </div>

        {/* Floating company dock */}
        <div className="au4 w-full flex justify-center mt-4">
          <CompanyDock />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
