"use client";

import { useSession } from "next-auth/react";
import { DismissibleNotice } from "@/components/ui/DismissibleNotice";

/**
 * Short notices shown to signed-in users on the home page.
 * Add a new <DismissibleNotice> (with a fresh storageKey) for each update.
 */
export function LoggedInNotices() {
  const { status } = useSession();
  if (status !== "authenticated") return null;

  return (
    <DismissibleNotice
      storageKey="notice-gridlock-deadline-jun5-v2"
      title="Flipkart Gridlock 2.0 — Round 1 deadline preponed"
      body="Heads up: submissions now close earlier — 5 June 2026, 11:59 PM IST. Shortlisted entries go through a reproducibility review, so keep your source (.ipynb) ready and submit soon."
      href="/opportunities/hackathons/flipkart-gridlock-2"
      linkText="View Gridlock"
    />
  );
}
