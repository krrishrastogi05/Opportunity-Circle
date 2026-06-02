"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Forces a signed-in user with an incomplete profile to finish onboarding
 * before using the app. Captures branch / grad year / gender up front,
 * since most users never come back to fill them in later.
 */
export function OnboardingGuard() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") return;
    const user = session?.user as { profileCompleted?: boolean } | undefined;
    if (user?.profileCompleted) return;

    // Don't trap them on the pages they need to reach to complete/sign in,
    // and never interfere with the admin area (separate auth).
    if (
      pathname.startsWith("/onboarding") ||
      pathname.startsWith("/auth") ||
      pathname.startsWith("/admin")
    ) {
      return;
    }

    router.replace("/onboarding");
  }, [status, session, pathname, router]);

  return null;
}
