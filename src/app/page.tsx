import { HeroSection } from "@/components/home/HeroSection";
import { WhatSection } from "@/components/home/PillarsSection";
import { DeadlineFeed } from "@/components/home/DeadlineFeed";
import { UrgentCountdown } from "@/components/home/UrgentCountdown";
import { FirstVisitCelebration } from "@/components/home/FirstVisitCelebration";
import { connectDB } from "@/lib/mongodb";
import { Opportunity } from "@/models/Opportunity";
import { getRegStatus } from "@/lib/opportunity-status";

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
  companySlug?: string;
  logoUrl?: string;
  applicationUrl?: string;
  closesAt?: string;
  opensAt?: string;
  endsAt?: string;
  statusOverride?: string;
  recurringMonth?: string;
  isPPIOffering: boolean;
  featured?: boolean;
}

export default async function Home() {
  await connectDB();
  const opportunities = await Opportunity.find({ published: true })
    .sort({ closesAt: 1, createdAt: -1 })
    .lean();

  const serialized: SerializedOpp[] = JSON.parse(JSON.stringify(opportunities));

  const openByDeadline = serialized
    .filter((o) => o.closesAt && getRegStatus(o) === "registration_open")
    .sort(
      (a, b) =>
        new Date(a.closesAt!).getTime() - new Date(b.closesAt!).getTime()
    );

  // Spotlight priority:
  //   1. a featured opp that's still open (→ featured + live countdown combo)
  //   2. any featured opp (→ animated showcase, no timer)
  //   3. the soonest closing open opp (→ plain live countdown)
  const featuredOpen = openByDeadline.find((o) => o.featured);
  const featuredAny = serialized.find((o) => o.featured);
  const urgent = openByDeadline[0];
  const spotlight = featuredOpen ?? featuredAny ?? urgent;

  const spotlightCounting =
    !!spotlight?.closesAt && getRegStatus(spotlight) === "registration_open";
  const spotlightFeatured = !!spotlight?.featured;

  return (
    <>
      <FirstVisitCelebration />
      <HeroSection />
      {spotlight && (
        <UrgentCountdown
          opp={spotlight}
          showCountdown={spotlightCounting}
          featured={spotlightFeatured}
        />
      )}
      <DeadlineFeed opportunities={serialized} excludeId={spotlight?._id} />
      <WhatSection />
    </>
  );
}
