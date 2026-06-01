"use client";

import { useState } from "react";
import { resolveLogoCandidates } from "@/lib/logos";
import { orgColor, orgMark } from "@/lib/opportunity-status";

export function CompanyLogo({
  name,
  slug,
  logoUrl,
  size = 44,
  rounded = "rounded-xl",
}: {
  name?: string;
  slug?: string;
  logoUrl?: string;
  size?: number;
  rounded?: string;
}) {
  const candidates = resolveLogoCandidates({ logoUrl, slug, name });
  const [idx, setIdx] = useState(0);

  const dim = { width: size, height: size };

  // All image candidates exhausted (or none) → coloured initials tile.
  if (idx >= candidates.length) {
    const mark = orgMark(name);
    return (
      <div
        className={`${rounded} flex items-center justify-center shrink-0`}
        style={{ ...dim, backgroundColor: orgColor(name) }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: mark.length > 2 ? size * 0.3 : size * 0.4,
            fontWeight: 800,
            fontFamily: "sans-serif",
            letterSpacing: "-0.5px",
          }}
        >
          {mark}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${rounded} flex items-center justify-center shrink-0 bg-white border border-border/50 overflow-hidden`}
      style={dim}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={candidates[idx]}
        alt={name ?? "logo"}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setIdx((i) => i + 1)}
        style={{
          width: "78%",
          height: "78%",
          objectFit: "contain",
        }}
      />
    </div>
  );
}
