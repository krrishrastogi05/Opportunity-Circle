export type OpportunityStatus =
  | "closing-soon"
  | "live"
  | "rolling"
  | "upcoming"
  | "ended";

export interface DatedOpportunity {
  opensAt?: string | null;
  closesAt?: string | null;
}

export function getStatus(e: DatedOpportunity): OpportunityStatus {
  const now = Date.now();
  if (!e.opensAt && !e.closesAt) return "rolling";
  const opens = e.opensAt ? new Date(e.opensAt).getTime() : null;
  const closes = e.closesAt ? new Date(e.closesAt).getTime() : null;
  if (closes && now > closes) return "ended";
  if (opens && now < opens) return "upcoming";
  if (closes) {
    const days = (closes - now) / 86_400_000;
    return days <= 7 ? "closing-soon" : "live";
  }
  return "live";
}

export function getCountdownParts(dateStr: string) {
  const diff = Math.max(0, new Date(dateStr).getTime() - Date.now());
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { d, h, m, s };
}

export function fmtDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const STATUS_ORDER: Record<OpportunityStatus, number> = {
  "closing-soon": 0,
  live: 1,
  rolling: 2,
  upcoming: 3,
  ended: 4,
};

/** Org → brand colour + short mark, shared across cards/feeds. */
export const ORG_COLORS: Record<string, string> = {
  Amazon: "#FF9900",
  "Goldman Sachs": "#1A6CF4",
  "Linux Foundation": "#003399",
  Google: "#4285F4",
  Flipkart: "#2874F0",
  "GirlScript Foundation": "#F97316",
  "Major League Hacking": "#E31337",
  "Software Freedom Conservancy": "#6E40C9",
  Microsoft: "#00A4EF",
  Uber: "#000000",
};

export const ORG_MARKS: Record<string, string> = {
  Amazon: "a",
  "Goldman Sachs": "GS",
  "Linux Foundation": "LF",
  Google: "G",
  Flipkart: "F",
  "GirlScript Foundation": "GS",
  "Major League Hacking": "MLH",
  "Software Freedom Conservancy": "O",
  Microsoft: "MS",
  Uber: "U",
};

export function orgColor(organizer?: string): string {
  return (organizer && ORG_COLORS[organizer]) || "#666";
}

export function orgMark(organizer?: string): string {
  return (organizer && ORG_MARKS[organizer]) || organizer?.[0]?.toUpperCase() || "?";
}
