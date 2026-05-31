export const OPPORTUNITY_CATEGORIES = [
  "hiring_challenge",
  "hackathon",
  "internship",
  "open_source",
  "other",
] as const;

export type OpportunityCategory = (typeof OPPORTUNITY_CATEGORIES)[number];

export interface CategoryMeta {
  key: OpportunityCategory;
  label: string;
  routeSegment: string;
  blurb: string;
  /** lucide-react icon name */
  icon: string;
}

export const CATEGORY_META: Record<OpportunityCategory, CategoryMeta> = {
  hiring_challenge: {
    key: "hiring_challenge",
    label: "Hiring Challenges",
    routeSegment: "hiring-challenges",
    blurb:
      "Hackathons and challenges that fast-track you into interviews or a PPI — bypass the standard OA.",
    icon: "Zap",
  },
  hackathon: {
    key: "hackathon",
    label: "Hackathons",
    routeSegment: "hackathons",
    blurb:
      "General hackathons to build, win prizes, and grow your portfolio — DevPost, MLH and more.",
    icon: "Code2",
  },
  internship: {
    key: "internship",
    label: "Internships & Programs",
    routeSegment: "internships",
    blurb:
      "Structured early-career programs and internships like Google STEP, Microsoft Engage, and fellowships.",
    icon: "GraduationCap",
  },
  open_source: {
    key: "open_source",
    label: "Open Source",
    routeSegment: "open-source",
    blurb:
      "Paid mentorships and contribution programs — GSoC, LFX, Outreachy, and GSSoC.",
    icon: "GitMerge",
  },
  other: {
    key: "other",
    label: "Other",
    routeSegment: "other",
    blurb: "Everything else worth knowing about.",
    icon: "Sparkles",
  },
};

/** Order categories are shown in on the hub. */
export const CATEGORY_ORDER: OpportunityCategory[] = [
  "hiring_challenge",
  "hackathon",
  "internship",
  "open_source",
  "other",
];

export const ROUTE_SEGMENTS = OPPORTUNITY_CATEGORIES.map(
  (c) => CATEGORY_META[c].routeSegment
);

export function categoryFromRoute(
  segment: string
): OpportunityCategory | null {
  const match = OPPORTUNITY_CATEGORIES.find(
    (c) => CATEGORY_META[c].routeSegment === segment
  );
  return match ?? null;
}

export function routeFromCategory(category: string): string {
  const meta = CATEGORY_META[category as OpportunityCategory];
  return meta ? meta.routeSegment : "other";
}

export function categoryLabel(category: string): string {
  const meta = CATEGORY_META[category as OpportunityCategory];
  return meta ? meta.label : category;
}
