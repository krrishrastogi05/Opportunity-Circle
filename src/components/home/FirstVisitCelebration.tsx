"use client";

import { useSession } from "next-auth/react";
import { MilestoneCelebration } from "@/components/ui/MilestoneCelebration";

/**
 * Greets logged-out visitors with the 200-users milestone celebration.
 * (Logged-in users are already counted, so they don't see it.)
 *
 * To celebrate a future milestone, bump `count` and use a new `storageKey`.
 */
export function FirstVisitCelebration() {
  const { status } = useSession();

  return (
    <MilestoneCelebration
      enabled={status === "unauthenticated"}
      count={200}
      unit="students already on OpportunitySignal"
      eyebrow="We just hit 200"
      title="200 students and counting."
      message="Live deadlines, saved opportunities, and reminders so you never miss a shot. Hop in — it takes a few seconds."
      ctaText="Join free"
      ctaHref="/auth/signin"
      storageKey="celebrate-200-users"
      delayMs={900}
    />
  );
}
