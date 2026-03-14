import { skills, type Skill } from "@/data/skills";

function SkillBadge({ name, icon: Icon, color }: Skill) {
  return (
    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-[15px] font-medium text-foreground/80 whitespace-nowrap shadow-sm transition-colors hover:border-neutral-400 dark:hover:border-neutral-500">
      {Icon && <Icon size={18} style={{ color }} />}
      {name}
    </span>
  );
}

export function SkillsCarousel() {
  const half = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, half);
  const row2 = skills.slice(half);

  return (
    <section className="py-8 w-full relative flex flex-col items-center justify-center overflow-hidden bg-background">
      <div className="w-full max-w-3xl px-4 mb-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Tech I work with
        </h2>
      </div>

      {/* Row 1 — left to right */}
      <div className="group marquee-container flex w-full overflow-hidden py-1 [--gap:0.75rem] [gap:var(--gap)]">
        <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
          {[...row1, ...row1].map((skill, i) => (
            <SkillBadge key={`r1a-${i}`} {...skill} />
          ))}
        </div>
        <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
          {[...row1, ...row1].map((skill, i) => (
            <SkillBadge key={`r1b-${i}`} {...skill} />
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="group marquee-container flex w-full overflow-hidden py-1 mt-2 [--gap:0.75rem] [gap:var(--gap)]">
        <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused] [animation-direction:reverse]">
          {[...row2, ...row2].map((skill, i) => (
            <SkillBadge key={`r2a-${i}`} {...skill} />
          ))}
        </div>
        <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused] [animation-direction:reverse]">
          {[...row2, ...row2].map((skill, i) => (
            <SkillBadge key={`r2b-${i}`} {...skill} />
          ))}
        </div>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent" />
    </section>
  );
}
