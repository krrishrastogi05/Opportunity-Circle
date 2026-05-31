export const OPPORTUNITY_CATEGORIES = [
  "hackathon",
  "open_source",
  "internship",
  "competition",
  "fellowship",
  "other",
] as const;

export type OpportunityCategory = (typeof OPPORTUNITY_CATEGORIES)[number];
