"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Building2, Code2, Trophy, X, ArrowRight, Zap } from "lucide-react";

/* ─── Search index ──────────────────────────────────────── */
type SearchItem = {
  id: string;
  label: string;
  sublabel: string;
  href: string;
  category: "company" | "opportunity" | "open-source";
  tags?: string;
  hot?: boolean;
};

const INDEX: SearchItem[] = [
  /* Companies */
  { id: "amazon",     label: "Amazon",     sublabel: "Big Tech · DSA + LP",                     href: "/companies/amazon",     category: "company",      tags: "aws cloud ecommerce", hot: true },
  { id: "google",     label: "Google",     sublabel: "Big Tech · Pure DSA · STEP Intern",        href: "/companies/google",     category: "company",      tags: "search cloud gsoc step" },
  { id: "microsoft",  label: "Microsoft",  sublabel: "Big Tech · DSA + CS Fundamentals",         href: "/companies/microsoft",  category: "company",      tags: "azure cloud engage" },
  { id: "uber",       label: "Uber",       sublabel: "Real-time Systems · LLD + HLD",            href: "/companies/uber",       category: "company",      tags: "rides maps star engineer" },
  { id: "flipkart",   label: "Flipkart",   sublabel: "Indian E-commerce · Machine Coding",       href: "/companies/flipkart",   category: "company",      tags: "grid hackathon ecommerce", hot: true },
  { id: "swiggy",     label: "Swiggy",     sublabel: "Food Delivery · Machine Coding",           href: "/companies/swiggy",     category: "company",      tags: "food delivery bangalore" },
  { id: "zomato",     label: "Zomato",     sublabel: "Food Tech · DSA + DBMS",                   href: "/companies/zomato",     category: "company",      tags: "food blinkit gurugram" },
  { id: "phonepe",    label: "PhonePe",    sublabel: "UPI Fintech · LLD + Concurrency",          href: "/companies/phonepe",    category: "company",      tags: "payments upi bangalore" },
  { id: "meesho",     label: "Meesho",     sublabel: "Social Commerce · AI Screening",           href: "/companies/meesho",     category: "company",      tags: "social ecommerce bangalore" },
  { id: "razorpay",   label: "Razorpay",   sublabel: "Payments Fintech · CS Fundamentals",       href: "/companies/razorpay",   category: "company",      tags: "payments fintech" },
  { id: "rippling",   label: "Rippling",   sublabel: "HR Tech SaaS · LLD-Heavy",                 href: "/companies/rippling",   category: "company",      tags: "hr saas lld" },
  { id: "atlassian",  label: "Atlassian",  sublabel: "Dev Tools · Code Quality Focus",           href: "/companies/atlassian",  category: "company",      tags: "jira confluence devtools" },
  { id: "freshworks", label: "Freshworks", sublabel: "Indian SaaS · Accessible DSA",             href: "/companies/freshworks", category: "company",      tags: "crm saas chennai" },
  /* Opportunities */
  { id: "hackon",     label: "HackOn with Amazon",          sublabel: "Hackathon · PPI Available · Closes Jun 10",  href: "/opportunities", category: "opportunity", tags: "amazon hackathon ppi active", hot: true },
  { id: "gs-hack",    label: "Goldman Sachs India Hackathon", sublabel: "Hackathon · PPI · Closes Jun 5",           href: "/opportunities", category: "opportunity", tags: "goldman sachs hackathon ppi active", hot: true },
  { id: "flipgrid",   label: "Flipkart GRiD 7.0",           sublabel: "Hackathon · PPI Available",                  href: "/opportunities", category: "opportunity", tags: "flipkart grid hackathon ppi" },
  { id: "ms-engage",  label: "Microsoft Engage",            sublabel: "Mentorship · PPO Pathway",                   href: "/opportunities", category: "opportunity", tags: "microsoft engage ppo" },
  { id: "google-step",label: "Google STEP Internship",      sublabel: "1st & 2nd Year Internship",                  href: "/opportunities", category: "opportunity", tags: "google step internship" },
  { id: "uber-star",  label: "Uber Star Engineer",          sublabel: "PPI Fast-track",                             href: "/opportunities", category: "opportunity", tags: "uber star ppi" },
  /* Open Source */
  { id: "gsoc",       label: "Google Summer of Code",       sublabel: "Open Source · Stipend · Jun–Sep",            href: "/open-source/gsoc",          category: "open-source", tags: "gsoc google stipend" },
  { id: "lfx",        label: "LFX Mentorship",              sublabel: "Open Source · Linux Foundation · Active",    href: "/open-source/lfx",           category: "open-source", tags: "lfx linux foundation cncf" },
  { id: "outreachy",  label: "Outreachy",                   sublabel: "Open Source · Stipend · Diversity",          href: "/open-source/outreachy",     category: "open-source", tags: "outreachy diversity stipend" },
  { id: "gssoc",      label: "GirlScript Summer of Code",   sublabel: "Open Source · Contribution · Active",       href: "/open-source/gssoc",         category: "open-source", tags: "gssoc girlscript contribution" },
  { id: "mlh",        label: "MLH Fellowship",              sublabel: "Open Source / Internship · Rolling",         href: "/open-source/mlh-fellowship", category: "open-source", tags: "mlh fellowship hackathon" },
];

const CATEGORY_ICONS = {
  company:      <Building2 className="w-3.5 h-3.5" />,
  opportunity:  <Trophy className="w-3.5 h-3.5" />,
  "open-source":<Code2 className="w-3.5 h-3.5" />,
};

const CATEGORY_LABELS = {
  company: "Company",
  opportunity: "Opportunity",
  "open-source": "Open Source",
};

/* ─── Main component ────────────────────────────────────── */
export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  /* Keyboard shortcut — Ctrl+K / Cmd+K */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* Auto-focus when opened */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setCursor(0);
    }
  }, [open]);

  /* Results */
  const results = query.trim()
    ? INDEX.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.label.toLowerCase().includes(q) ||
          item.sublabel.toLowerCase().includes(q) ||
          (item.tags || "").toLowerCase().includes(q)
        );
      }).slice(0, 8)
    : INDEX.filter((i) => i.hot).slice(0, 6);

  const navigate = useCallback((href: string) => {
    setOpen(false);
    router.push(href);
  }, [router]);

  /* Arrow key navigation */
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, results.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
    if (e.key === "Enter" && results[cursor]) navigate(results[cursor].href);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Palette */}
      <div className="fixed left-1/2 top-[15vh] -translate-x-1/2 z-[101] w-full max-w-lg mx-auto px-4">
        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">

          {/* Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setCursor(0); }}
              onKeyDown={handleKey}
              placeholder="Search companies, hackathons, programs…"
              className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/60 outline-none text-foreground"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results */}
          <div className="py-2 max-h-80 overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No results for &quot;{query}&quot;</p>
            ) : (
              <>
                {!query && (
                  <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 flex items-center gap-1.5">
                    <Zap className="w-3 h-3" /> Hot right now
                  </p>
                )}
                {results.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.href)}
                    onMouseEnter={() => setCursor(i)}
                    className={`w-full text-left flex items-center gap-3 px-4 py-2.5 transition-colors ${
                      cursor === i ? "bg-accent" : "hover:bg-accent/50"
                    }`}
                  >
                    <span className={`p-1.5 rounded-md shrink-0 ${
                      item.category === "company"      ? "bg-blue-500/10 text-blue-500" :
                      item.category === "opportunity"  ? "bg-amber-500/10 text-amber-500" :
                                                         "bg-green-500/10 text-green-500"
                    }`}>
                      {CATEGORY_ICONS[item.category]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-foreground">{item.label}</span>
                        {item.hot && (
                          <span className="px-1 py-0.5 rounded text-[9px] font-black uppercase bg-green-500/10 text-green-600 dark:text-green-400">Active</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{item.sublabel}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground/50 shrink-0 hidden sm:block">
                      {CATEGORY_LABELS[item.category]}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-border flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground/50">
              <kbd className="px-1 py-0.5 rounded border border-border bg-muted text-[9px]">↑↓</kbd> navigate
              {" · "}
              <kbd className="px-1 py-0.5 rounded border border-border bg-muted text-[9px]">↵</kbd> open
              {" · "}
              <kbd className="px-1 py-0.5 rounded border border-border bg-muted text-[9px]">Esc</kbd> close
            </span>
            <span className="text-[10px] text-muted-foreground/40">{INDEX.length} items indexed</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Trigger button (for navbar) ───────────────────────── */
export function SearchTrigger() {
  return (
    <button
      onClick={() => {
        const e = new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true });
        window.dispatchEvent(e);
      }}
      className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/60 text-xs text-muted-foreground hover:text-foreground hover:border-border transition-colors"
    >
      <Search className="w-3.5 h-3.5" />
      <span>Search</span>
      <kbd className="ml-1 px-1.5 py-0.5 rounded border border-border bg-muted text-[10px] font-mono">⌘K</kbd>
    </button>
  );
}
