import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { Opportunity } from "@/models/Opportunity";
import {
  OpportunityDetail,
  type OpportunityDetailData,
} from "@/components/opportunities/OpportunityDetail";
import { categoryFromRoute, routeFromCategory } from "@/lib/opportunity-constants";

export const dynamic = "force-dynamic";

async function getOpportunity(slug: string) {
  await connectDB();
  const doc = await Opportunity.findOne({ slug, published: true }).lean();
  if (!doc) return null;
  const opp = JSON.parse(JSON.stringify(doc)) as OpportunityDetailData;
  // Normalise array fields — docs created via upsert/admin may omit them,
  // and the detail UI reads .length / .map on them.
  opp.rounds = opp.rounds ?? [];
  opp.steps = opp.steps ?? [];
  opp.timeline = opp.timeline ?? [];
  opp.tips = opp.tips ?? [];
  opp.tags = opp.tags ?? [];
  return opp;
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const opp = await getOpportunity(params.slug);
  if (!opp) return { title: "Opportunity" };
  return {
    title: opp.title,
    description: opp.description?.slice(0, 160),
  };
}

export default async function OpportunityDetailPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const cat = categoryFromRoute(params.category);
  if (!cat) notFound();

  const opp = await getOpportunity(params.slug);
  if (!opp) notFound();

  // If category in URL doesn't match the opportunity's actual category,
  // 404 rather than serving under the wrong path (keeps URLs canonical).
  if (routeFromCategory(opp.category) !== params.category) notFound();

  return <OpportunityDetail opp={opp} />;
}
