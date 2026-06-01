// Logo resolution with a graceful fallback chain. <CompanyLogo> tries each
// candidate URL in order and advances on error, finally showing an initials
// tile. Locally-shipped logos in /public/companies/<slug>.png are preferred,
// so we don't hit any external service for the common companies.
//   1. explicit logoUrl
//   2. /public/companies/<slug>.png
//   3. /public/companies/<slugified-name>.png
//   4. Clearbit (free, no key)
//   5. logo.dev (needs NEXT_PUBLIC_LOGODEV_TOKEN)

import { slugify } from "./utils";

// Organizer / company name (and slug) → primary web domain (for remote fallback).
const DOMAINS: Record<string, string> = {
  amazon: "amazon.com",
  google: "google.com",
  microsoft: "microsoft.com",
  uber: "uber.com",
  flipkart: "flipkart.com",
  swiggy: "swiggy.com",
  zomato: "zomato.com",
  eternal: "eternal.com",
  phonepe: "phonepe.com",
  razorpay: "razorpay.com",
  atlassian: "atlassian.com",
  meesho: "meesho.com",
  freshworks: "freshworks.com",
  rippling: "rippling.com",
  "goldman sachs": "goldmansachs.com",
  "goldman-sachs": "goldmansachs.com",
  "linux foundation": "linuxfoundation.org",
  "girlscript foundation": "girlscript.tech",
  "major league hacking": "mlh.io",
  "software freedom conservancy": "outreachy.org",
  outreachy: "outreachy.org",
  meta: "meta.com",
  netflix: "netflix.com",
};

const LOGODEV_TOKEN = process.env.NEXT_PUBLIC_LOGODEV_TOKEN || "";

function domainFor(key?: string): string | undefined {
  if (!key) return undefined;
  return DOMAINS[key.toLowerCase().trim()];
}

export function resolveLogoCandidates(opts: {
  logoUrl?: string;
  slug?: string;
  name?: string;
}): string[] {
  const out: string[] = [];
  if (opts.logoUrl) out.push(opts.logoUrl);

  if (opts.slug) out.push(`/companies/${opts.slug}.png`);

  const nameSlug = opts.name ? slugify(opts.name) : "";
  if (nameSlug && nameSlug !== opts.slug) {
    out.push(`/companies/${nameSlug}.png`);
  }

  const domain = domainFor(opts.slug) || domainFor(opts.name);
  if (domain) {
    out.push(`https://logo.clearbit.com/${domain}`);
    if (LOGODEV_TOKEN) {
      out.push(
        `https://img.logo.dev/${domain}?token=${LOGODEV_TOKEN}&size=128&format=png&retina=true`
      );
    }
  }
  return out;
}
