import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import { Opportunity } from "@/models/Opportunity";
import { CategoryListClient } from "@/components/opportunities/CategoryListClient";
import {
  categoryFromRoute,
  CATEGORY_META,
} from "@/lib/opportunity-constants";
import type { OpportunityCardData } from "@/components/opportunities/OpportunityCard";

export const dynamic = "force-dynamic";

export function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  const cat = categoryFromRoute(params.category);
  if (!cat) return { title: "Opportunities" };
  return {
    title: CATEGORY_META[cat].label,
    description: CATEGORY_META[cat].blurb,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const cat = categoryFromRoute(params.category);
  if (!cat) notFound();

  const meta = CATEGORY_META[cat];

  await connectDB();
  const list = await Opportunity.find({ published: true, category: cat })
    .sort({ closesAt: 1, createdAt: -1 })
    .lean();

  const serialized: OpportunityCardData[] = JSON.parse(JSON.stringify(list));

  const showPPIFilter = cat === "hiring_challenge" || cat === "internship";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-24">
      <Link
        href="/opportunities"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        All opportunities
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{meta.label}</h1>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          {meta.blurb}
        </p>
      </div>

      <CategoryListClient
        opportunities={serialized}
        showPPIFilter={showPPIFilter}
      />
    </div>
  );
}
