/**
 * Shared sub-components for ALL company profile pages.
 * Import from here — never redefine locally inside a page.
 */
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ── Section label ──────────────────────────────── */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
      {children}
    </p>
  );
}

/* ── Quick stat card row ────────────────────────── */
export function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="py-3 px-2 rounded-xl border border-border bg-card">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
      <p className="font-semibold text-sm text-foreground">{value}</p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}

/* ── Opportunity block ──────────────────────────── */
export function OpportunityBlock({
  title, type, access, children,
}: {
  title: string; type: string; access: string; children: React.ReactNode;
}) {
  return (
    <div className="py-5 border-b border-border last:border-0">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-base text-foreground">{title}</h3>
        <div className="flex gap-1.5 flex-wrap">
          <Badge variant="secondary" className="text-xs font-normal">{type}</Badge>
          <Badge variant="outline" className="text-xs font-normal">{access}</Badge>
        </div>
      </div>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-1.5">{children}</div>
    </div>
  );
}

/* ── Interview round block ──────────────────────── */
export function RoundBlock({
  round, label, tag, children,
}: {
  round: string; label: string; tag?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 items-start py-4 border-b border-border last:border-0">
      <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-foreground text-background text-[11px] font-semibold flex items-center justify-center">
        {round}
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

/* ── Skill importance bar ───────────────────────── */
export function SkillBar({
  label, level, note,
}: {
  label: string; level: 1 | 2 | 3; note?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0 gap-4">
      <div>
        <span className="text-sm text-foreground">{label}</span>
        {note && <span className="text-xs text-muted-foreground ml-2">— {note}</span>}
      </div>
      <div className="flex gap-1 shrink-0">
        {[1, 2, 3].map((d) => (
          <div key={d} className={`w-2 h-2 rounded-full ${d <= level ? "bg-foreground" : "bg-border"}`} />
        ))}
      </div>
    </div>
  );
}

/* ── "What makes this company different" item ───── */
export function DiffBox({
  title, children,
}: {
  icon?: string; title: string; children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 py-4 border-b border-border last:border-0">
      <span className="w-1 self-stretch shrink-0 rounded-full bg-primary/50" aria-hidden />
      <div>
        <p className="text-sm font-semibold text-foreground mb-0.5">{title}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

/* ── Preparation guide item ─────────────────────── */
export function PrepItem({ bold, text }: { bold: string; text: string }) {
  return (
    <li className="flex gap-2">
      <span className="shrink-0 text-foreground font-semibold mt-0.5">→</span>
      <p className="text-sm text-muted-foreground">
        <strong className="font-semibold text-foreground">{bold}</strong>{" "}{text}
      </p>
    </li>
  );
}

/* ── Similar companies row ──────────────────────── */
export function SimilarCompanies({
  companies,
}: {
  companies: { name: string; slug: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {companies.map((c) => (
        <Link key={c.slug} href={`/companies/${c.slug}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
          {c.name}
          <ChevronRight className="w-3 h-3" />
        </Link>
      ))}
    </div>
  );
}

/* ── Page-level disclaimer ──────────────────────── */
export function Disclaimer({ company }: { company: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-5 py-4 text-xs text-muted-foreground leading-relaxed">
      <strong className="font-semibold text-foreground">Disclaimer:</strong>{" "}
      This page is for general career awareness only. Information is based on publicly shared community experiences,
      not official {company} statements. Hiring processes, eligibility criteria, and campus patterns change every year.
      Always verify with recent sources, your institution&apos;s placement cell, and official job postings.
    </div>
  );
}

/* ── Breadcrumb ─────────────────────────────────── */
export function CompanyBreadcrumb({ company }: { company: string }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
      <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
      <ChevronRight className="w-3 h-3" />
      <Link href="/companies" className="hover:text-foreground transition-colors">Companies</Link>
      <ChevronRight className="w-3 h-3" />
      <span className="text-foreground">{company}</span>
    </nav>
  );
}
