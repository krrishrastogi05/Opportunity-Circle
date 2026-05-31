import { connectDB } from "@/lib/mongodb";
import { Opportunity } from "@/models/Opportunity";
import { OpportunitiesClient } from "@/components/opportunities/OpportunitiesClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Competitions & Opportunities",
  description:
    "Hackathons, competitions, and company programs with PPI pathways for tech students.",
};

export default async function OpportunitiesPage() {
  await connectDB();
  const opportunities = await Opportunity.find({
    published: true,
    category: { $in: ["hackathon", "competition", "internship"] },
  })
    .sort({ closesAt: 1, createdAt: -1 })
    .lean();

  const serialized = JSON.parse(JSON.stringify(opportunities));

  return <OpportunitiesClient opportunities={serialized} />;
}
