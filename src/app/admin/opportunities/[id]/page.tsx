import { connectDB } from "@/lib/mongodb";
import { Opportunity } from "@/models/Opportunity";
import { OpportunityForm } from "@/components/admin/OpportunityForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditOpportunityPage({
  params,
}: {
  params: { id: string };
}) {
  await connectDB();
  const opportunity = await Opportunity.findById(params.id).lean();

  if (!opportunity) notFound();

  const serialized = JSON.parse(JSON.stringify(opportunity));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Opportunity</h1>
      <OpportunityForm initial={serialized} />
    </div>
  );
}
