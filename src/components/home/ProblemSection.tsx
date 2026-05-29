import { AlertTriangle, Shuffle, BrainCircuit, CheckCircle2 } from "lucide-react";

const chaosItems = [
  "YouTube video from 2021",
  "Senior's WhatsApp advice",
  "LinkedIn post (outdated)",
  "Telegram group rumour",
  "College senior's experience",
  "Random Quora thread",
  "Confusing Reddit comment",
  "Discord server tip",
];

const confusionPoints = [
  { icon: Shuffle,        text: "No one agrees on what to prepare" },
  { icon: AlertTriangle,  text: "Advice is campus-specific, not universal" },
  { icon: BrainCircuit,   text: "Skills overlap — DSA, projects, CP, design?" },
];

export function ProblemSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 max-w-8 bg-border" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            The Problem
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — prose */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Career information is{" "}
              <span className="text-primary">scattered everywhere.</span>
            </h2>

            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              Tech career advice for students comes from{" "}
              <strong className="font-medium text-foreground">
                dozens of conflicting, unstructured sources
              </strong>
              . There is no central reference. Every student builds their own
              fragmented picture — and most of it is incomplete or outdated.
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              {confusionPoints.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-destructive" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pt-1.5">
                    {text}
                  </p>
                </li>
              ))}
            </ul>

            {/* Solution hint */}
            <div className="mt-10 flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/15">
              <CheckCircle2 className="mt-0.5 w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-sm text-foreground/80 leading-relaxed">
                <strong className="font-semibold text-foreground">
                  OpportunityCircle organises it all.
                </strong>{" "}
                One structured map — company expectations, opportunity types,
                skills, and what different paths usually require — written in
                plain, hedged language a student can actually trust.
              </p>
            </div>
          </div>

          {/* Right — chaos visualisation */}
          <div className="relative flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border border-border bg-card overflow-hidden">
            {/* Blurred glow behind */}
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent pointer-events-none" />

            <p className="relative z-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Where students currently learn from
            </p>

            <div className="relative z-10 flex flex-wrap gap-2 justify-center">
              {chaosItems.map((item, i) => (
                <span
                  key={item}
                  style={{
                    opacity: 1 - i * 0.07,
                    transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (i + 1)}deg)`,
                  }}
                  className="pill-badge border-dashed text-xs"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Arrow pointing down */}
            <div className="relative z-10 mt-4 flex flex-col items-center gap-1.5 text-muted-foreground">
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-px h-6 bg-border" />
                <div className="w-px h-4 bg-border opacity-60" />
                <div className="w-px h-2 bg-border opacity-30" />
              </div>
              <span className="text-xs text-muted-foreground/60">result</span>
            </div>

            <div className="relative z-10 px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
              <p className="text-sm font-semibold text-destructive">
                Confused, anxious, wrong path
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
