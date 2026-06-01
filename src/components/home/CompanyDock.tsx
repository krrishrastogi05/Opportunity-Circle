"use client";

import { useState } from "react";
import Link from "next/link";
import { CompanyLogo } from "@/components/ui/CompanyLogo";

/**
 * Only companies that actually have a profile page under /companies/<slug>.
 * Real logos are resolved (local → Clearbit → logo.dev) with a coloured
 * initials tile as the final fallback, so the dock stays consistent.
 */
const companies = [
  { name: "Amazon", slug: "amazon" },
  { name: "Google", slug: "google" },
  { name: "Microsoft", slug: "microsoft" },
  { name: "Uber", slug: "uber" },
  { name: "Flipkart", slug: "flipkart" },
  { name: "Swiggy", slug: "swiggy" },
  { name: "Eternal", slug: "eternal" },
  { name: "PhonePe", slug: "phonepe" },
  { name: "Razorpay", slug: "razorpay" },
  { name: "Atlassian", slug: "atlassian" },
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
              <div className="transition-transform duration-150 hover:scale-110">
                <CompanyLogo name={co.name} slug={co.slug} size={40} />
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
