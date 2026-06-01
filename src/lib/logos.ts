// Logo resolution with graceful fallback chain:
//   1. explicit logoUrl on the record
//   2. a local file we ship in /public/companies/<slug>.png
//   3. free discovery via Clearbit (no API key)
//   4. logo.dev (needs NEXT_PUBLIC_LOGODEV_TOKEN)
//   5. (component falls back to a coloured initials tile)

// Slugs we ship a local logo for under /public/companies/<slug>.png
export const LOCAL_LOGOS = new Set(["amazon", "rippling"]);

// Map organizer / company name (and slug) → primary web domain.
const DOMAINS: Record<string, string> = {
  amazon: "amazon.com",
  google: "google.com",
  microsoft: "microsoft.com",
  uber: "uber.com",
  flipkart: "flipkart.com",
  swiggy: "swiggy.com",
  zomato: "zomato.com",
  phonepe: "phonepe.com",
  razorpay: "razorpay.com",
  atlassian: "atlassian.com",
  meesho: "meesho.com",
  freshworks: "freshworks.com",
  rippling: "rippling.com",
  "goldman sachs": "goldmansachs.com",
  "linux foundation": "linuxfoundation.org",
  "girlscript foundation": "girlscript.tech",
  "major league hacking": "mlh.io",
  "software freedom conservancy": "outreachy.org",
  meta: "meta.com",
  netflix: "netflix.com",
};

const LOGODEV_TOKEN = process.env.NEXT_PUBLIC_LOGODEV_TOKEN || "";

function domainFor(key?: string): string | undefined {
  if (!key) return undefined;
  return DOMAINS[key.toLowerCase().trim()];
}

/**
 * Ordered list of candidate image URLs. A <CompanyLogo> tries each in turn,
 * falling back to an initials tile if all fail.
 */
export function resolveLogoCandidates(opts: {
  logoUrl?: string;
  slug?: string;
  name?: string;
}): string[] {
  const out: string[] = [];
  if (opts.logoUrl) out.push(opts.logoUrl);

  if (opts.slug && LOCAL_LOGOS.has(opts.slug)) {
    out.push(`/companies/${opts.slug}.png`);
  }

  const domain = domainFor(opts.slug) || domainFor(opts.name);
  if (domain) {
    out.push(`https://logo.clearbit.com/${domain}`);
    if (LOGODEV_TOKEN) {
      out.push(`https://img.logo.dev/${domain}?token=${LOGODEV_TOKEN}`);
    }
  }
  return out;
}
