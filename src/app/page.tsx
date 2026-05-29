import { HeroSection }  from "@/components/home/HeroSection";
import { WhatSection } from "@/components/home/PillarsSection";
import { DeadlineFeed } from "@/components/home/DeadlineFeed";

export const metadata = {
  title: "OpportunityCircle — Tech Career Discovery",
  description:
    "The tech career map every confused student needs. Explore company profiles, opportunity types, and skill guides.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <DeadlineFeed />
      <WhatSection />
    </>
  );
}
