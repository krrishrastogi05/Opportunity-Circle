import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { OpportunityCard, type OpportunityCardData } from "./OpportunityCard";
import { CATEGORY_META, type OpportunityCategory } from "@/lib/opportunity-constants";

export function CategorySection({
  category,
  opportunities,
  total,
}: {
  category: OpportunityCategory;
  opportunities: OpportunityCardData[];
  total: number;
}) {
  const meta = CATEGORY_META[category];
  if (opportunities.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-end justify-between mb-4 gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">{meta.label}</h2>
          <p className="text-sm text-muted-foreground mt-0.5 max-w-xl">
            {meta.blurb}
          </p>
        </div>
        <Link
          href={`/opportunities/${meta.routeSegment}`}
          className="shrink-0 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          View all {total > opportunities.length ? `(${total})` : ""}
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {opportunities.map((opp) => (
          <OpportunityCard key={opp._id} opp={opp} />
        ))}
      </div>
    </section>
  );
}
