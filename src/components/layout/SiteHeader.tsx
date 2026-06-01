"use client";

/**
 * Banner + Navbar are a single pinned unit at the top. Keeping them together
 * (rather than a fixed navbar + an in-flow banner) avoids the gap/"floating
 * nav" that appeared when the banner scrolled away.
 */
import { useState } from "react";
import { AnnouncementBanner } from "./AnnouncementBanner";
import { Navbar } from "./Navbar";
import { GlobalSearch } from "./GlobalSearch";

export function SiteHeader() {
  const [bannerActive, setBannerActive] = useState(false);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <AnnouncementBanner onVisibilityChange={setBannerActive} />
        <Navbar />
      </div>
      {/* Spacer matches the pinned header height: banner (36px) + nav (56px) */}
      <div className={bannerActive ? "h-[92px]" : "h-14"} />
      <GlobalSearch />
    </>
  );
}
