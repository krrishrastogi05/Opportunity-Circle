"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

const GoogleG = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M43.6 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11C34.5 31 32.9 33 30.5 34.4v4.5h6.9C41.2 35.2 43.6 30.3 43.6 24.5z" fill="#4285F4"/>
    <path d="M24 44c5.4 0 9.9-1.8 13.2-4.8l-6.9-4.5c-1.8 1.2-4.1 1.9-6.4 1.9-4.9 0-9-3.3-10.5-7.8H6.5v4.6C9.8 39.9 16.4 44 24 44z" fill="#34A853"/>
    <path d="M13.5 28.8c-.4-1.2-.6-2.5-.6-3.8s.2-2.6.6-3.8v-4.6H6.5C5 19.4 4 21.6 4 24s1 4.6 2.5 7.4l7-5.6z" fill="#FBBC05"/>
    <path d="M24 10.4c2.7 0 5.1 1 7 2.8l5.2-5.2C32.9 5 28.4 3 24 3 16.4 3 9.8 7.1 6.5 13.4l7 5.6C15 14.7 19.1 10.4 24 10.4z" fill="#EA4335"/>
  </svg>
);

const MSSquares = () => (
  <svg width="22" height="22" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
    <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
    <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
    <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
  </svg>
);

type CompanyEntry = {
  slug: string;
  name: string;
  tags: string;
  tier: "big-tech" | "unicorn" | "high-growth";
  hiring?: boolean; // has an active opportunity right now
  bg: string;
  border?: boolean;
  content: React.ReactNode;
};

const companies: CompanyEntry[] = [
  /* ── Big Tech ── */
  {
    slug: "amazon", name: "Amazon", tier: "big-tech", hiring: true,
    tags: "Big Tech · E-commerce · Cloud (AWS) · DSA + LP",
    bg: "bg-white", border: true,
    content: <Image src="/companies/amazon.png" alt="Amazon" width={36} height={36} className="object-contain" />,
  },
  {
    slug: "google", name: "Google", tier: "big-tech",
    tags: "Big Tech · Search & Cloud · Pure DSA · STEP Intern",
    bg: "bg-white", border: true,
    content: <GoogleG />,
  },
  {
    slug: "microsoft", name: "Microsoft", tier: "big-tech",
    tags: "Big Tech · Cloud & Productivity · DSA + CS Fundamentals · Very Broad Campus",
    bg: "bg-white", border: true,
    content: <MSSquares />,
  },
  {
    slug: "uber", name: "Uber", tier: "big-tech",
    tags: "Ride-hailing · Real-time Systems · High DSA Bar · LLD + HLD",
    bg: "bg-black",
    content: <span style={{ color:"#fff", fontSize:20, fontWeight:800, fontFamily:"sans-serif" }}>U</span>,
  },
  /* ── Indian Unicorns ── */
  {
    slug: "flipkart", name: "Flipkart", tier: "unicorn", hiring: true,
    tags: "Indian E-commerce · Machine Coding Round · Campus-Heavy",
    bg: "bg-[#2874F0]",
    content: <span style={{ color:"#fff", fontSize:20, fontWeight:800, fontFamily:"sans-serif" }}>F</span>,
  },
  {
    slug: "swiggy", name: "Swiggy", tier: "unicorn",
    tags: "Food Delivery · Quick Commerce · Machine Coding · Bangalore",
    bg: "bg-[#FC8019]",
    content: <span style={{ color:"#fff", fontSize:20, fontWeight:800, fontFamily:"sans-serif" }}>S</span>,
  },
  {
    slug: "zomato", name: "Zomato", tier: "unicorn",
    tags: "Food Tech · Blinkit · Engineering Intuition · DSA + DBMS · Gurugram",
    bg: "bg-[#E23744]",
    content: <span style={{ color:"#fff", fontSize:20, fontWeight:800, fontFamily:"sans-serif" }}>Z</span>,
  },
  {
    slug: "phonepe", name: "PhonePe", tier: "unicorn",
    tags: "UPI & Payments · Fintech · High DSA Bar · LLD + Concurrency · Bangalore",
    bg: "bg-[#5F259F]",
    content: <span style={{ color:"#fff", fontSize:16, fontWeight:800, fontFamily:"sans-serif" }}>Pe</span>,
  },
  {
    slug: "meesho", name: "Meesho", tier: "unicorn",
    tags: "Social Commerce · AI Screening · Machine Coding · Bangalore",
    bg: "bg-[#F43397]",
    content: <span style={{ color:"#fff", fontSize:20, fontWeight:800, fontFamily:"sans-serif" }}>M</span>,
  },
  /* ── High Growth ── */
  {
    slug: "razorpay", name: "Razorpay", tier: "high-growth",
    tags: "Indian Fintech · Payments · CS Fundamentals + Project Depth",
    bg: "bg-[#2EB5C0]",
    content: <span style={{ color:"#fff", fontSize:16, fontWeight:800, fontFamily:"sans-serif" }}>Rp</span>,
  },
  {
    slug: "rippling", name: "Rippling", tier: "high-growth",
    tags: "HR Tech · SaaS · LLD-Heavy · Tier-1 Campus + Off-campus",
    bg: "bg-[#FFCE00]",
    content: <span style={{ color:"#000", fontSize:20, fontWeight:800, fontFamily:"sans-serif" }}>R</span>,
  },
  {
    slug: "atlassian", name: "Atlassian", tier: "high-growth",
    tags: "Dev Tools · Jira & Confluence · Code Quality Focus · Values-Driven",
    bg: "bg-[#0052CC]",
    content: <span style={{ color:"#fff", fontSize:20, fontWeight:800, fontFamily:"sans-serif" }}>A</span>,
  },
  {
    slug: "freshworks", name: "Freshworks", tier: "high-growth",
    tags: "Indian SaaS · CRM & Helpdesk · Accessible DSA · OOP + SQL · Chennai",
    bg: "bg-[#25C16F]",
    content: <span style={{ color:"#fff", fontSize:16, fontWeight:800, fontFamily:"sans-serif" }}>fw</span>,
  },
];

const TIERS = [
  { key: "big-tech",    label: "Big Tech",        desc: "Global scale, highest DSA bar, brand recognition" },
  { key: "unicorn",     label: "Indian Unicorns",  desc: "Billion-dollar Indian tech — machine coding, product depth" },
  { key: "high-growth", label: "High Growth",      desc: "Fast-scaling companies with strong engineering culture" },
] as const;

export const metadata = {
  title: "Company Explorer",
  description: "Browse company profiles — hiring style, DSA expectations, opportunity types, and what each company generally looks for.",
};

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
      <div className={`w-12 h-12 rounded-xl ${c.bg} ${c.border ? "border border-border" : ""} flex items-center justify-center shrink-0 overflow-hidden p-1`}>
        {c.content}
      </div>
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
