import { connectDB } from "@/lib/mongodb";
import { Opportunity } from "@/models/Opportunity";
import { OpportunityList } from "@/components/admin/OpportunityList";

export const dynamic = "force-dynamic";

export default async function AdminOpportunitiesPage() {
  await connectDB();
  const opportunities = await Opportunity.find()
    .sort({ createdAt: -1 })
    .lean();

  const serialized = opportunities.map((o) => ({
    ...o,
    _id: o._id.toString(),
    createdAt: o.createdAt.toISOString(),
    closesAt: o.closesAt?.toISOString(),
  }));

  return <OpportunityList initialOpportunities={serialized} />;
}
