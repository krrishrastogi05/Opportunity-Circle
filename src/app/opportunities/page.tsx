import { connectDB } from "@/lib/mongodb";
import { Opportunity } from "@/models/Opportunity";
import { CategorySection } from "@/components/opportunities/CategorySection";
import { UrgentCountdown } from "@/components/home/UrgentCountdown";
import {
  CATEGORY_ORDER,
  type OpportunityCategory,
} from "@/lib/opportunity-constants";
import { getRegStatus } from "@/lib/opportunity-status";
import type { OpportunityCardData } from "@/components/opportunities/OpportunityCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Opportunities",
  description:
    "Hiring challenges, hackathons, internships & programs, and open source — all in one place.",
};

const PREVIEW_COUNT = 4;

export default async function OpportunitiesHubPage() {
  await connectDB();
  const all = await Opportunity.find({ published: true })
    .sort({ closesAt: 1, createdAt: -1 })
    .lean();

  const serialized: OpportunityCardData[] = JSON.parse(JSON.stringify(all));

  // Group by category, featured first within each
  const byCategory = new Map<OpportunityCategory, OpportunityCardData[]>();
  for (const opp of serialized) {
    const cat = opp.category as OpportunityCategory;
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat)!.push(opp);
  }
  Array.from(byCategory.values()).forEach((list) =>
    list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
  );

  const openByDeadline = serialized
    .filter((o) => o.closesAt && getRegStatus(o) === "registration_open")
    .sort(
      (a, b) =>
        new Date(a.closesAt!).getTime() - new Date(b.closesAt!).getTime()
    );
  const spotlight =
    openByDeadline.find((o) => o.featured) ??
    serialized.find((o) => o.featured) ??
    openByDeadline[0];
  const spotlightCounting =
    !!spotlight?.closesAt && getRegStatus(spotlight) === "registration_open";

  return (
    <div className="pb-24">
      {spotlight && (
        <UrgentCountdown
          opp={spotlight}
          showCountdown={spotlightCounting}
          featured={!!spotlight.featured}
        />
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
        <div className="mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Career Pathways
          </p>
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Opportunities
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Curated hiring challenges, hackathons, programs, and open-source
            mentorships — categorised so you can find the right path fast.
          </p>
        </div>

        {CATEGORY_ORDER.map((cat) => {
          const list = byCategory.get(cat) ?? [];
          return (
            <CategorySection
              key={cat}
              category={cat}
              opportunities={list.slice(0, PREVIEW_COUNT)}
              total={list.length}
            />
          );
        })}

        {serialized.length === 0 && (
          <p className="text-muted-foreground text-center py-12">
            No opportunities published yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
}
