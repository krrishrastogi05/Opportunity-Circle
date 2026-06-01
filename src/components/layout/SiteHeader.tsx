"use client";

/**
 * Wraps AnnouncementBanner + Navbar together. The Navbar is only offset
 * downward when the banner is ACTUALLY rendering content — otherwise we'd
 * leave an empty strip at the top that page content scrolls through.
 */
import { useState } from "react";
import { AnnouncementBanner } from "./AnnouncementBanner";
import { Navbar } from "./Navbar";
import { GlobalSearch } from "./GlobalSearch";

export function SiteHeader() {
  const [bannerActive, setBannerActive] = useState(false);

  return (
    <>
      <AnnouncementBanner onVisibilityChange={setBannerActive} />
      <Navbar offset={bannerActive} />
      <GlobalSearch />
    </>
  );
}
