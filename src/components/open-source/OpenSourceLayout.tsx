/**
 * Shared sub-components for ALL open source program pages.
 * Import from here — never redefine locally inside a page.
 */
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ── Breadcrumb ─────────────────────────────────────── */
export function OSBreadcrumb({ program }: { program: string }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
      <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
      <ChevronRight className="w-3 h-3" />
      <Link href="/open-source" className="hover:text-foreground transition-colors">Open Source</Link>
      <ChevronRight className="w-3 h-3" />
      <span className="text-foreground">{program}</span>
    </nav>
  );
}

/* ── Section label ──────────────────────────────────── */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
      {children}
    </p>
  );
}

/* ── Stat card (3-col grid) ─────────────────────────── */
export function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="py-3 px-2 rounded-xl border border-border bg-card">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
      <p className="font-semibold text-sm text-foreground">{value}</p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}

/* ── "What makes this program different" item ───────── */
export function DiffBox({
  icon, title, children,
}: {
  icon: string; title: string; children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 py-4 border-b border-border last:border-0">
      <span className="text-lg shrink-0 mt-0.5">{icon}</span>
      <div>
        <p className="text-sm font-semibold text-foreground mb-0.5">{title}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

/* ── Numbered step block ────────────────────────────── */
export function StepBlock({
  step, label, tag, children,
}: {
  step: string; label: string; tag?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 items-start py-4 border-b border-border last:border-0">
      <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-foreground text-background text-[11px] font-semibold flex items-center justify-center">
        {step}
      </span>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <p className="text-sm font-semibold text-foreground">{label}</p>
          {tag && (
            <Badge variant="outline" className="text-[10px] font-normal px-2 py-0">{tag}</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

/* ── Timeline phase row ─────────────────────────────── */
export function TimelineRow({
  phase, when, tip,
}: {
  phase: string; when: string; tip?: string;
}) {
  return (
    <div className="flex gap-3 py-3 border-b border-border last:border-0">
      <div className="w-2 h-2 rounded-full bg-foreground shrink-0 mt-1.5" />
      <div>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-sm font-semibold text-foreground">{phase}</span>
          <span className="text-xs text-muted-foreground">{when}</span>
        </div>
        {tip && <p className="text-[11px] text-muted-foreground/70 italic mt-0.5">{tip}</p>}
      </div>
    </div>
  );
}

/* ── Pro tip item ───────────────────────────────────── */
export function TipItem({ bold, text }: { bold: string; text: string }) {
  return (
    <li className="flex gap-2">
      <span className="shrink-0 text-foreground font-semibold mt-0.5">→</span>
      <p className="text-sm text-muted-foreground">
        <strong className="font-semibold text-foreground">{bold}</strong>{" "}{text}
      </p>
    </li>
  );
}

/* ── Resource link ──────────────────────────────────── */
export function ResourceLink({
  href, label, description,
}: {
  href: string; label: string; description: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 py-3 border-b border-border last:border-0 group"
    >
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground group-hover:underline underline-offset-4 decoration-border inline-flex items-center gap-1">
          {label} <ExternalLink className="w-3 h-3 text-muted-foreground" />
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </a>
  );
}

/* ── Similar programs row ───────────────────────────── */
export function SimilarPrograms({
  programs,
}: {
  programs: { name: string; slug: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {programs.map((p) => (
        <Link
          key={p.slug}
          href={`/open-source/${p.slug}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
        >
          {p.name}
          <ChevronRight className="w-3 h-3" />
        </Link>
      ))}
    </div>
  );
}

/* ── Stipend callout ────────────────────────────────── */
export function StipendBox({
  amount, note,
}: {
  amount: string; note: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card px-5 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
        💰 Stipend / Rewards
      </p>
      <p className="text-xl font-bold text-foreground mb-1">{amount}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{note}</p>
    </div>
  );
}

/* ── Disclaimer ─────────────────────────────────────── */
export function OSDisclaimer({ program }: { program: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-5 py-4 text-xs text-muted-foreground leading-relaxed">
      <strong className="font-semibold text-foreground">Disclaimer:</strong>{" "}
      This page is for general awareness only. Program dates, stipend amounts, and eligibility criteria
      for {program} change annually. Always verify the latest details at the official website before applying.
      Selection is competitive — outcomes depend entirely on individual effort and program capacity.
    </div>
  );
}
