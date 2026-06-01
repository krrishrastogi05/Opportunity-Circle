// Build "Add to calendar" targets without any backend, OAuth, or scopes:
//  - a Google Calendar template URL (opens prefilled, user hits Save)
//  - an .ics file (Apple Calendar, Outlook, everything else)
// Works for logged-out visitors too.

export interface CalendarEventInput {
  title: string;
  /** ISO date string — the moment the reminder/event should sit at. */
  date: string;
  /** Optional end ISO; defaults to start + 30 min. */
  endDate?: string;
  description?: string;
  url?: string;
  /** If true, the summary is framed as a registration deadline. */
  isDeadline?: boolean;
}

function toICSStamp(d: Date): string {
  // YYYYMMDDTHHMMSSZ (UTC)
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function resolveRange(input: CalendarEventInput): { start: Date; end: Date } {
  const start = new Date(input.date);
  const end = input.endDate
    ? new Date(input.endDate)
    : new Date(start.getTime() + 30 * 60 * 1000);
  return { start, end };
}

function summaryFor(input: CalendarEventInput): string {
  return input.isDeadline ? `Deadline: ${input.title}` : input.title;
}

function detailsFor(input: CalendarEventInput): string {
  const lines = [input.description?.trim()].filter(Boolean) as string[];
  if (input.url) lines.push(`Apply / details: ${input.url}`);
  lines.push("Saved from OpportunitySignal");
  return lines.join("\n\n");
}

export function googleCalendarUrl(input: CalendarEventInput): string {
  const { start, end } = resolveRange(input);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: summaryFor(input),
    dates: `${toICSStamp(start)}/${toICSStamp(end)}`,
    details: detailsFor(input),
  });
  if (input.url) params.set("location", input.url);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildICS(input: CalendarEventInput): string {
  const { start, end } = resolveRange(input);
  const uid = `${toICSStamp(start)}-${Math.random().toString(36).slice(2)}@opportunitysignal`;
  const esc = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//OpportunitySignal//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toICSStamp(new Date())}`,
    `DTSTART:${toICSStamp(start)}`,
    `DTEND:${toICSStamp(end)}`,
    `SUMMARY:${esc(summaryFor(input))}`,
    `DESCRIPTION:${esc(detailsFor(input))}`,
    ...(input.url ? [`URL:${esc(input.url)}`] : []),
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${esc(summaryFor(input))}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function icsDataUri(input: CalendarEventInput): string {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(buildICS(input))}`;
}
