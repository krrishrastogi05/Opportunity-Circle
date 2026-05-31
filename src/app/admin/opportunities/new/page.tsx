import { OpportunityForm } from "@/components/admin/OpportunityForm";

export default function NewOpportunityPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">New Opportunity</h1>
      <OpportunityForm />
    </div>
  );
}
