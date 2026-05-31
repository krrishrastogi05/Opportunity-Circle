import { connectDB } from "@/lib/mongodb";
import { Opportunity } from "@/models/Opportunity";
import { OpenSourceClient } from "@/components/open-source/OpenSourceClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Open Source Programs",
  description:
    "Paid mentorships and contribution programs — GSoC, LFX, Outreachy, MLH Fellowship, GSSoC.",
};

export default async function OpenSourcePage() {
  await connectDB();
  const programs = await Opportunity.find({
    published: true,
    category: "open_source",
  })
    .sort({ createdAt: 1 })
    .lean();

  const serialized = JSON.parse(JSON.stringify(programs));

  return <OpenSourceClient programs={serialized} />;
}
