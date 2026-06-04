"use client";

import { useSession } from "next-auth/react";
import { AlertModal } from "@/components/ui/AlertModal";

/**
 * Important notices shown to signed-in users. Each notice is a front-and-
 * center popup. Add another <AlertModal> (fresh storageKey) for new updates.
 */
export function LoggedInNotices() {
  const { status } = useSession();
  if (status !== "authenticated") return null;

  return (
    <AlertModal
      storageKey="notice-gridlock-deadline-jun5-popup"
      tone="urgent"
      eyebrow="Deadline preponed"
      title="Flipkart Gridlock 2.0 — submit sooner"
      chip="Now closes 5 June 2026, 11:59 PM IST"
      body="Round 1 has been moved earlier. Finish your submission before the new deadline. Shortlisted entries undergo a reproducibility review — keep your source (.ipynb) ready."
      ctaText="View Gridlock"
      ctaHref="/opportunities/hackathons/flipkart-gridlock-2"
    />
  );
}
