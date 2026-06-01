"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { CompanyLogo } from "@/components/ui/CompanyLogo";

type CompanyEntry = {
  slug: string;
  name: string;
  tags: string;
  tier: "big-tech" | "unicorn" | "high-growth";
  hiring?: boolean; // has an active opportunity right now
};

const companies: CompanyEntry[] = [
  /* ── Big Tech ── */
  { slug: "amazon", name: "Amazon", tier: "big-tech", hiring: true, tags: "Big Tech · E-commerce · Cloud (AWS) · DSA + LP" },
  { slug: "google", name: "Google", tier: "big-tech", tags: "Big Tech · Search & Cloud · Pure DSA · STEP Intern" },
  { slug: "microsoft", name: "Microsoft", tier: "big-tech", tags: "Big Tech · Cloud & Productivity · DSA + CS Fundamentals · Very Broad Campus" },
  { slug: "uber", name: "Uber", tier: "big-tech", tags: "Ride-hailing · Real-time Systems · High DSA Bar · LLD + HLD" },
  /* ── Indian Unicorns ── */
  { slug: "flipkart", name: "Flipkart", tier: "unicorn", hiring: true, tags: "Indian E-commerce · Machine Coding Round · Campus-Heavy" },
  { slug: "swiggy", name: "Swiggy", tier: "unicorn", tags: "Food Delivery · Quick Commerce · Machine Coding · Bangalore" },
  { slug: "zomato", name: "Zomato", tier: "unicorn", tags: "Food Tech · Blinkit · Engineering Intuition · DSA + DBMS · Gurugram" },
  { slug: "phonepe", name: "PhonePe", tier: "unicorn", tags: "UPI & Payments · Fintech · High DSA Bar · LLD + Concurrency · Bangalore" },
  { slug: "meesho", name: "Meesho", tier: "unicorn", tags: "Social Commerce · AI Screening · Machine Coding · Bangalore" },
  /* ── High Growth ── */
  { slug: "razorpay", name: "Razorpay", tier: "high-growth", tags: "Indian Fintech · Payments · CS Fundamentals + Project Depth" },
  { slug: "rippling", name: "Rippling", tier: "high-growth", tags: "HR Tech · SaaS · LLD-Heavy · Tier-1 Campus + Off-campus" },
  { slug: "atlassian", name: "Atlassian", tier: "high-growth", tags: "Dev Tools · Jira & Confluence · Code Quality Focus · Values-Driven" },
  { slug: "freshworks", name: "Freshworks", tier: "high-growth", tags: "Indian SaaS · CRM & Helpdesk · Accessible DSA · OOP + SQL · Chennai" },
];

const TIERS = [
  { key: "big-tech",    label: "Big Tech",        desc: "Global scale, highest DSA bar, brand recognition" },
  { key: "unicorn",     label: "Indian Unicorns",  desc: "Billion-dollar Indian tech — machine coding, product depth" },
  { key: "high-growth", label: "High Growth",      desc: "Fast-scaling companies with strong engineering culture" },
] as const;


export default function CompaniesPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return companies;
    const q = query.toLowerCase();
    return companies.filter(
      (c) => c.name.toLowerCase().includes(q) || c.tags.toLowerCase().includes(q)
    );
  }, [query]);

  const isSearching = query.trim().length > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">
      <h1 className="text-3xl font-bold tracking-tight mb-1">Company Explorer</h1>
      <p className="text-muted-foreground mb-8">
        Uniform profiles — understand what each company expects before you prepare.
      </p>

      {/* ── Search bar ── */}
      <div className="relative mb-10">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search companies or tech stack…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />
        {query && (
          <button onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs">
            Clear
          </button>
        )}
      </div>

      {/* ── Search results (flat list) ── */}
      {isSearching && (
        <div>
          <p className="text-xs text-muted-foreground mb-3">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{query}&quot;
          </p>
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">No companies matched your search.</p>
          ) : (
            <div>
              {filtered.map((c) => <CompanyRow key={c.slug} c={c} />)}
            </div>
          )}
        </div>
      )}

      {/* ── Tiered listing ── */}
      {!isSearching && (
        <div className="space-y-12">
          {TIERS.map(({ key, label, desc }) => {
            const tier = companies.filter((c) => c.tier === key);
            return (
              <div key={key}>
                <div className="mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</h2>
                  <p className="text-xs text-muted-foreground/60 mt-0.5">{desc}</p>
                </div>
                <div>
                  {tier.map((c) => <CompanyRow key={c.slug} c={c} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CompanyRow({ c }: { c: CompanyEntry }) {
  return (
    <Link href={`/companies/${c.slug}`}
      className="flex items-center gap-4 py-4 border-b border-border hover:bg-accent/20 transition-colors rounded-lg px-2 -mx-2 group">
      <CompanyLogo name={c.name} slug={c.slug} size={48} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-sm group-hover:underline">{c.name}</p>
          {c.hiring && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
              <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
              Hiring now
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{c.tags}</p>
      </div>
      <span className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors text-sm shrink-0">→</span>
    </Link>
  );
}
