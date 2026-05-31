import { HeroSection } from "@/components/home/HeroSection";
import { WhatSection } from "@/components/home/PillarsSection";
import { DeadlineFeed } from "@/components/home/DeadlineFeed";
import { connectDB } from "@/lib/mongodb";
import { Opportunity } from "@/models/Opportunity";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "OpportunitySignal — Tech Career Discovery",
  description:
    "The tech career map every confused student needs. Explore company profiles, opportunity types, and skill guides.",
};

export default async function Home() {
  await connectDB();
  const opportunities = await Opportunity.find({ published: true })
    .sort({ closesAt: 1, createdAt: -1 })
    .lean();

  const serialized = JSON.parse(JSON.stringify(opportunities));

  return (
    <>
      <HeroSection />
      <DeadlineFeed opportunities={serialized} />
      <WhatSection />
    </>
  );
}
