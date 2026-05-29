"use client";

/**
 * Wraps AnnouncementBanner + Navbar together so the Navbar
 * can reactively drop to top-0 when the banner is dismissed.
 */
import { useState, useEffect, useCallback } from "react";
import { AnnouncementBanner } from "./AnnouncementBanner";
import { Navbar } from "./Navbar";

export function SiteHeader() {
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    // Show banner only if not previously dismissed this session
    setBannerVisible(sessionStorage.getItem("ticker-dismissed") !== "1");
  }, []);

  const onDismiss = useCallback(() => setBannerVisible(false), []);

  return (
    <>
      {bannerVisible && <AnnouncementBanner onDismiss={onDismiss} />}
      <Navbar offset={bannerVisible} />
    </>
  );
}
