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

// ── Registration / lifecycle status ──────────────────────────────
export type RegStatus =
  | "upcoming"
  | "registration_open"
  | "registration_closed"
  | "ongoing"
  | "ended";

export interface LifecycleOpportunity {
  opensAt?: string | null;
  closesAt?: string | null; // registration deadline
  endsAt?: string | null; // final/event end
  eventDate?: string | null;
  statusOverride?: string;
  recurringMonth?: string;
}

const VALID_OVERRIDES: RegStatus[] = [
  "upcoming",
  "registration_open",
  "registration_closed",
  "ongoing",
  "ended",
];

export function getRegStatus(o: LifecycleOpportunity): RegStatus {
  if (o.statusOverride && VALID_OVERRIDES.includes(o.statusOverride as RegStatus)) {
    return o.statusOverride as RegStatus;
  }
  const now = Date.now();
  const opens = o.opensAt ? new Date(o.opensAt).getTime() : null;
  const closes = o.closesAt ? new Date(o.closesAt).getTime() : null;
  const ends = o.endsAt
    ? new Date(o.endsAt).getTime()
    : o.eventDate
      ? new Date(o.eventDate).getTime()
      : null;

  if (ends && now > ends) return "ended";
  if (opens && now < opens) return "upcoming";
  if (closes && now <= closes) return "registration_open";
  if (closes && now > closes) {
    // registration over, but event may still be running
    if (ends && now <= ends) return "ongoing";
    return "registration_closed";
  }
  // no closes date — rolling/ongoing if it has any opens date, else open
  return opens ? "ongoing" : "registration_open";
}

export const REG_STATUS_LABEL: Record<RegStatus, string> = {
  upcoming: "Opening soon",
  registration_open: "Registration open",
  registration_closed: "Registration closed",
  ongoing: "Ongoing",
  ended: "Ended",
};

export const REG_STATUS_CLASS: Record<RegStatus, string> = {
  upcoming:
    "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  registration_open:
    "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  registration_closed:
    "bg-muted text-muted-foreground border-border",
  ongoing:
    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  ended: "bg-muted text-muted-foreground/60 border-border",
};

export interface BadgeOpportunity extends LifecycleOpportunity {
  isPPIOffering?: boolean;
  isDiversity?: boolean;
  isFemaleOnly?: boolean;
  isInternational?: boolean;
}

export interface Badge {
  label: string;
  className: string;
}

/** Non-status badges (PPI, diversity, women-only). */
export function getBadges(o: BadgeOpportunity): Badge[] {
  const badges: Badge[] = [];
  if (o.isPPIOffering)
    badges.push({
      label: "PPI",
      className: "bg-foreground text-background",
    });
  if (o.isFemaleOnly)
    badges.push({
      label: "Women only",
      className:
        "bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20",
    });
  if (o.isDiversity)
    badges.push({
      label: "Diversity",
      className:
        "bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20",
    });
  if (o.isInternational)
    badges.push({
      label: "International",
      className:
        "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20",
    });
  return badges;
}

/** Whether to hide the deadline counter (only show while registration open/upcoming). */
export function showRegistrationCountdown(o: LifecycleOpportunity): boolean {
  const s = getRegStatus(o);
  return s === "registration_open" || s === "upcoming";
}
