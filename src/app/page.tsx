import { HeroSection } from "@/components/home/HeroSection";
import { WhatSection } from "@/components/home/PillarsSection";
import { DeadlineFeed } from "@/components/home/DeadlineFeed";
import { UrgentCountdown } from "@/components/home/UrgentCountdown";
import { connectDB } from "@/lib/mongodb";
import { Opportunity } from "@/models/Opportunity";
import { getStatus } from "@/lib/opportunity-status";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "OpportunitySignal — Tech Career Discovery",
  description:
    "The tech career map every confused student needs. Explore company profiles, opportunity types, and skill guides.",
};

interface SerializedOpp {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  organizer?: string;
  applicationUrl?: string;
  closesAt?: string;
  opensAt?: string;
  isPPIOffering: boolean;
}

export default async function Home() {
  await connectDB();
  const opportunities = await Opportunity.find({ published: true })
    .sort({ closesAt: 1, createdAt: -1 })
    .lean();

  const serialized: SerializedOpp[] = JSON.parse(JSON.stringify(opportunities));

  const urgent = serialized
    .filter((o) => o.closesAt && getStatus(o) === "closing-soon")
    .sort(
      (a, b) =>
        new Date(a.closesAt!).getTime() - new Date(b.closesAt!).getTime()
    )[0];

  return (
    <>
      <HeroSection />
      {urgent && (
        <UrgentCountdown
          opp={{
            _id: urgent._id,
            title: urgent.title,
            slug: urgent.slug,
            category: urgent.category,
            organizer: urgent.organizer,
            closesAt: urgent.closesAt!,
            isPPIOffering: urgent.isPPIOffering,
          }}
        />
      )}
      <DeadlineFeed opportunities={serialized} />
      <WhatSection />
    </>
  );
}
