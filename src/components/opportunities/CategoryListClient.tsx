"use client";

import { useState } from "react";
import { OpportunityCard, type OpportunityCardData } from "./OpportunityCard";
import { getStatus, STATUS_ORDER } from "@/lib/opportunity-status";

type Filter = "all" | "ppi" | "open";

export function CategoryListClient({
  opportunities,
  showPPIFilter,
}: {
  opportunities: OpportunityCardData[];
  showPPIFilter: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = opportunities
    .filter((o) => {
      if (filter === "ppi") return o.isPPIOffering;
      if (filter === "open") {
        const s = getStatus(o);
        return s === "live" || s === "closing-soon" || s === "rolling";
      }
      return true;
    })
    .sort((a, b) => {
      const sa = STATUS_ORDER[getStatus(a)];
      const sb = STATUS_ORDER[getStatus(b)];
      if (sa !== sb) return sa - sb;
      if (a.closesAt && b.closesAt)
        return new Date(a.closesAt).getTime() - new Date(b.closesAt).getTime();
      return 0;
    });

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "open", label: "Open now" },
    ...(showPPIFilter
      ? [{ key: "ppi" as Filter, label: "PPI Available" }]
      : []),
  ];

  return (
    <>
      <div className="flex gap-2 mb-6 flex-wrap items-center">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
              filter === f.key
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "opportunity" : "opportunities"}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          Nothing here right now.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {filtered.map((opp) => (
            <OpportunityCard key={opp._id} opp={opp} />
          ))}
        </div>
      )}
    </>
  );
}
