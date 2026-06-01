"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Building2, Code2, Trophy, X, ArrowRight, Zap } from "lucide-react";
import { routeFromCategory, categoryLabel } from "@/lib/opportunity-constants";
import { getRegStatus, REG_STATUS_LABEL } from "@/lib/opportunity-status";

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

// Companies are static pages — safe to hardcode.
const COMPANIES: SearchItem[] = [
  { id: "amazon",     label: "Amazon",     sublabel: "Big Tech · DSA + LP",                href: "/companies/amazon",     category: "company", tags: "aws cloud ecommerce" },
  { id: "google",     label: "Google",     sublabel: "Big Tech · Pure DSA · STEP Intern",  href: "/companies/google",     category: "company", tags: "search cloud gsoc step" },
  { id: "microsoft",  label: "Microsoft",  sublabel: "Big Tech · DSA + CS Fundamentals",   href: "/companies/microsoft",  category: "company", tags: "azure cloud engage" },
  { id: "uber",       label: "Uber",       sublabel: "Real-time Systems · LLD + HLD",      href: "/companies/uber",       category: "company", tags: "rides maps star engineer" },
  { id: "flipkart",   label: "Flipkart",   sublabel: "Indian E-commerce · Machine Coding", href: "/companies/flipkart",   category: "company", tags: "grid hackathon ecommerce" },
  { id: "swiggy",     label: "Swiggy",     sublabel: "Food Delivery · Machine Coding",     href: "/companies/swiggy",     category: "company", tags: "food delivery bangalore" },
  { id: "zomato",     label: "Zomato",     sublabel: "Food Tech · DSA + DBMS",             href: "/companies/zomato",     category: "company", tags: "food blinkit gurugram" },
  { id: "phonepe",    label: "PhonePe",    sublabel: "UPI Fintech · LLD + Concurrency",    href: "/companies/phonepe",    category: "company", tags: "payments upi bangalore" },
  { id: "meesho",     label: "Meesho",     sublabel: "Social Commerce · AI Screening",     href: "/companies/meesho",     category: "company", tags: "social ecommerce bangalore" },
  { id: "razorpay",   label: "Razorpay",   sublabel: "Payments Fintech · CS Fundamentals", href: "/companies/razorpay",   category: "company", tags: "payments fintech" },
  { id: "rippling",   label: "Rippling",   sublabel: "HR Tech SaaS · LLD-Heavy",           href: "/companies/rippling",   category: "company", tags: "hr saas lld" },
  { id: "atlassian",  label: "Atlassian",  sublabel: "Dev Tools · Code Quality Focus",     href: "/companies/atlassian",  category: "company", tags: "jira confluence devtools" },
  { id: "freshworks", label: "Freshworks", sublabel: "Indian SaaS · Accessible DSA",       href: "/companies/freshworks", category: "company", tags: "crm saas chennai" },
];

interface ApiOpportunity {
  _id: string;
  title: string;
  slug: string;
  category: string;
  organizer?: string;
  isPPIOffering: boolean;
  opensAt?: string;
  closesAt?: string;
  endsAt?: string;
  statusOverride?: string;
  tags?: string[];
}

const CATEGORY_ICONS = {
  company:       <Building2 className="w-3.5 h-3.5" />,
  opportunity:   <Trophy className="w-3.5 h-3.5" />,
  "open-source": <Code2 className="w-3.5 h-3.5" />,
};

const CATEGORY_LABELS = {
  company:       "Company",
  opportunity:   "Opportunity",
  "open-source": "Open Source",
};

/* ─── Main component ────────────────────────────────────── */
export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [oppItems, setOppItems] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Live opportunities from the DB → accurate, never stale.
  useEffect(() => {
    fetch("/api/opportunities")
      .then((r) => r.json())
      .then((data: ApiOpportunity[]) => {
        if (!Array.isArray(data)) return;
        const items: SearchItem[] = data.map((o) => {
          const status = getRegStatus(o);
          const isOpenSource = o.category === "open_source";
          return {
            id: o._id,
            label: o.title,
            sublabel: `${categoryLabel(o.category)} · ${REG_STATUS_LABEL[status]}${o.isPPIOffering ? " · PPI" : ""}`,
            href: `/opportunities/${routeFromCategory(o.category)}/${o.slug}`,
            category: isOpenSource ? "open-source" : "opportunity",
            tags: [o.organizer, ...(o.tags ?? [])].filter(Boolean).join(" ").toLowerCase(),
            hot: status === "registration_open",
          };
        });
        setOppItems(items);
      })
      .catch(() => {});
  }, []);

  const INDEX: SearchItem[] = [...COMPANIES, ...oppItems];

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
      setTimeout(() => inputRef.current?.focus(), 80);
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
        className="fixed inset-0 z-[100] bg-background/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Palette — full-screen on mobile, centered card on desktop */}
      <div className="fixed inset-x-0 bottom-0 sm:inset-auto sm:left-1/2 sm:top-[12vh] sm:-translate-x-1/2 z-[101] sm:w-full sm:max-w-lg sm:px-4">
        <div className="bg-card border border-border sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[75vh] rounded-t-2xl">

          {/* Input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border shrink-0">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setCursor(0); }}
              onKeyDown={handleKey}
              placeholder="Search companies, hackathons, programs…"
              className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/60 outline-none text-foreground min-w-0"
            />
            <button
              onClick={() => setOpen(false)}
              className="shrink-0 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results */}
          <div className="overflow-y-auto flex-1 py-2">
            {results.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-10">
                No results for &quot;{query}&quot;
              </p>
            ) : (
              <>
                {!query && (
                  <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 flex items-center gap-1.5">
                    <Zap className="w-3 h-3" /> Hot right now
                  </p>
                )}
                {query && (
                  <p className="px-4 py-1.5 text-[10px] text-muted-foreground/50">
                    {results.length} result{results.length !== 1 ? "s" : ""}
                  </p>
                )}
                {results.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.href)}
                    onMouseEnter={() => setCursor(i)}
                    className={`w-full text-left flex items-center gap-3 px-4 py-3 sm:py-2.5 transition-colors active:bg-accent ${
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
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-semibold text-foreground">{item.label}</span>
                        {item.hot && (
                          <span className="px-1 py-0.5 rounded text-[9px] font-black uppercase bg-green-500/10 text-green-600 dark:text-green-400">
                            Active
                          </span>
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

          {/* Footer — keyboard hints hidden on mobile */}
          <div className="px-4 py-2.5 border-t border-border flex items-center justify-between shrink-0">
            <span className="hidden sm:flex items-center gap-1 text-[10px] text-muted-foreground/50">
              <kbd className="px-1 py-0.5 rounded border border-border bg-muted text-[9px]">↑↓</kbd> navigate
              {" · "}
              <kbd className="px-1 py-0.5 rounded border border-border bg-muted text-[9px]">↵</kbd> open
              {" · "}
              <kbd className="px-1 py-0.5 rounded border border-border bg-muted text-[9px]">Esc</kbd> close
            </span>
            <span className="sm:hidden text-[10px] text-muted-foreground/40">Tap to open</span>
            <span className="text-[10px] text-muted-foreground/40">{INDEX.length} items indexed</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Trigger button (for navbar) ───────────────────────── */
export function SearchTrigger() {
  function openSearch() {
    const e = new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true });
    window.dispatchEvent(e);
  }

  return (
    <>
      {/* Desktop: full button with label + kbd */}
      <button
        onClick={openSearch}
        className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/60 text-xs text-muted-foreground hover:text-foreground hover:border-border transition-colors"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search</span>
        <kbd className="ml-1 px-1.5 py-0.5 rounded border border-border bg-muted text-[10px] font-mono">⌘K</kbd>
      </button>

      {/* Mobile: icon-only */}
      <button
        onClick={openSearch}
        className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>
    </>
  );
}
