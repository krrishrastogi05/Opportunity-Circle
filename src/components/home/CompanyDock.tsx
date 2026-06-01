"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ── Inline brand marks — no external deps ────────────── */
const MicrosoftIcon = () => (
  <svg viewBox="0 0 21 21" width="20" height="20">
    <rect x="0"  y="0"  width="10" height="10" fill="#f25022"/>
    <rect x="11" y="0"  width="10" height="10" fill="#7fba00"/>
    <rect x="0"  y="11" width="10" height="10" fill="#00a4ef"/>
    <rect x="11" y="11" width="10" height="10" fill="#ffb900"/>
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="22" height="22">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const LetterMark = ({ letter, color, size = 20 }: { letter: string; color: string; size?: number }) => (
  <span style={{ color, fontSize: size, fontWeight: 700, lineHeight: 1, fontFamily: "sans-serif" }}>
    {letter}
  </span>
);

const companies = [
  {
    name: "Amazon",    slug: "amazon",    bg: "#FFFFFF",
    Icon: <Image src="/companies/amazon.png" alt="Amazon" width={28} height={28} className="object-contain" />,
  },
  { name: "Google",    slug: "google",    bg: "#E8F0FE", Icon: <GoogleIcon /> },
  { name: "Microsoft", slug: "microsoft", bg: "#F0F8FF", Icon: <MicrosoftIcon /> },
  { name: "Meta",      slug: "meta",      bg: "#E7F0FF", Icon: <LetterMark letter="f" color="#1877F2" size={22} /> },
  { name: "Apple",     slug: "apple",     bg: "#F5F5F5", Icon: <LetterMark letter="" color="#1C1C1E" size={20} /> },
  { name: "Netflix",   slug: "netflix",   bg: "#FFE8E8", Icon: <LetterMark letter="N" color="#E50914" size={20} /> },
  { name: "Stripe",    slug: "stripe",    bg: "#EEEDFF", Icon: <LetterMark letter="S" color="#635BFF" size={20} /> },
  { name: "Uber",      slug: "uber",      bg: "#EEEEEE", Icon: <LetterMark letter="U" color="#000000" size={20} /> },
  { name: "Flipkart",  slug: "flipkart",  bg: "#E8F0FF", Icon: <LetterMark letter="F" color="#2874F0" size={20} /> },
];

export function CompanyDock() {
  const [hovered, setHovered] = useState<string | null>(null);

  const getScale = (name: string) => {
    if (hovered === name) return 1.5;
    if (!hovered) return 1;
    const hi = companies.findIndex((c) => c.name === hovered);
    const ci = companies.findIndex((c) => c.name === name);
    return Math.abs(hi - ci) === 1 ? 1.2 : 1;
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <p className="text-[11px] text-muted-foreground tracking-widest uppercase">
        Companies you can explore
      </p>
      <div className="flex items-end gap-2.5 px-5 py-3.5 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md shadow-xl shadow-black/25 max-w-full overflow-x-auto no-scrollbar [&>*]:shrink-0">
        {companies.map((co) => {
          const isHov = hovered === co.name;
          return (
            <Link key={co.name} href={`/companies/${co.slug}`}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHovered(co.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="absolute -top-9 left-1/2 whitespace-nowrap text-[11px] font-medium px-2 py-0.5 rounded-md bg-foreground text-background pointer-events-none"
                style={{ opacity: isHov ? 1 : 0, transform: `translateX(-50%) translateY(${isHov ? 0 : 6}px)`, transition: "all 0.15s" }}>
                {co.name}
              </span>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm"
                style={{ backgroundColor: co.bg, transform: `scale(${getScale(co.name)})`, transformOrigin: "bottom center", transition: "transform 0.18s cubic-bezier(0.34,1.56,0.64,1)" }}>
                {co.Icon}
              </div>
            </Link>
          );
        })}
        <Link href="/companies"
          className="w-11 h-11 rounded-2xl flex items-center justify-center bg-primary/15 border border-primary/25 text-primary text-xs font-semibold"
          style={{ transform: `scale(${hovered === "__more" ? 1.2 : 1})`, transformOrigin: "bottom center", transition: "transform 0.18s cubic-bezier(0.34,1.56,0.64,1)" }}
          onMouseEnter={() => setHovered("__more")} onMouseLeave={() => setHovered(null)}>
          50+
        </Link>
      </div>
    </div>
  );
}
