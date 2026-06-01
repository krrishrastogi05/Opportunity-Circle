"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Only companies that actually have a profile page under /companies/<slug>.
 * Uniform style: solid brand-coloured tile + white initials. No mixed
 * icon/image/blank states — keeps the dock clean and consistent.
 */
const companies = [
  { name: "Amazon", slug: "amazon", mark: "a", bg: "#FF9900" },
  { name: "Google", slug: "google", mark: "G", bg: "#4285F4" },
  { name: "Microsoft", slug: "microsoft", mark: "MS", bg: "#0078D4" },
  { name: "Uber", slug: "uber", mark: "U", bg: "#10131A" },
  { name: "Flipkart", slug: "flipkart", mark: "F", bg: "#2874F0" },
  { name: "Swiggy", slug: "swiggy", mark: "S", bg: "#FC8019" },
  { name: "Zomato", slug: "zomato", mark: "Z", bg: "#E23744" },
  { name: "PhonePe", slug: "phonepe", mark: "Pe", bg: "#5F259F" },
  { name: "Razorpay", slug: "razorpay", mark: "R", bg: "#0C2451" },
  { name: "Atlassian", slug: "atlassian", mark: "A", bg: "#0052CC" },
];

const TOTAL_COMPANIES = 13;

export function CompanyDock() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <p className="text-[11px] text-muted-foreground tracking-widest uppercase">
        Companies you can explore
      </p>
      <div className="flex items-center gap-2 px-3 py-3 rounded-2xl border border-border bg-card shadow-sm max-w-full overflow-x-auto no-scrollbar [&>*]:shrink-0">
        {companies.map((co) => {
          const isHov = hovered === co.name;
          return (
            <Link
              key={co.slug}
              href={`/companies/${co.slug}`}
              className="relative flex items-center justify-center"
              onMouseEnter={() => setHovered(co.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium px-2 py-0.5 rounded-md bg-foreground text-background pointer-events-none transition-opacity"
                style={{ opacity: isHov ? 1 : 0 }}
              >
                {co.name}
              </span>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-150 hover:scale-110"
                style={{ backgroundColor: co.bg }}
              >
                <span
                  style={{
                    color: "#fff",
                    fontSize: co.mark.length > 1 ? 12 : 16,
                    fontWeight: 800,
                    fontFamily: "sans-serif",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {co.mark}
                </span>
              </div>
            </Link>
          );
        })}
        <Link
          href="/companies"
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/25 text-primary text-[11px] font-bold transition-transform duration-150 hover:scale-110"
        >
          +{TOTAL_COMPANIES - companies.length}
        </Link>
      </div>
    </div>
  );
}
