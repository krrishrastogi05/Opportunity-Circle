"use client";

import { useState } from "react";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

type EventType = "oa" | "interview" | "internship" | "joining" | "event";

interface CalEvent {
  months: number[]; // 0=Jan … 11=Dec
  label: string;
  type: EventType;
}

interface Track {
  label: string;
  events: CalEvent[];
}

const typeStyle: Record<EventType, { bg: string; text: string; dot: string }> = {
  oa:         { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" },
  interview:  { bg: "#DBEAFE", text: "#1E3A8A", dot: "#3B82F6" },
  internship: { bg: "#D1FAE5", text: "#064E3B", dot: "#10B981" },
  joining:    { bg: "#FCE7F3", text: "#831843", dot: "#EC4899" },
  event:      { bg: "#EDE9FE", text: "#4C1D95", dot: "#8B5CF6" },
};

const tracks: Track[] = [
  {
    label: "2-Month Intern",
    events: [
      { months: [7,8,9,10,11], label: "OA & Campus drives", type: "oa" },
      { months: [10,11,0,1],   label: "Interviews",         type: "interview" },
      { months: [4,5,6],       label: "Internship",         type: "internship" },
    ],
  },
  {
    label: "6-Month Intern",
    events: [
      { months: [0,1,2],       label: "Portal applications", type: "oa" },
      { months: [2,3,4],       label: "Amazon HackOn (varies)", type: "event" },
      { months: [3,4],         label: "Interviews",           type: "interview" },
      { months: [5,6,7,8,9,10],label: "Internship period",   type: "internship" },
    ],
  },
  {
    label: "SDE-1 Fresher",
    events: [
      { months: [7,8,9,10],    label: "Campus OA drives",    type: "oa" },
      { months: [9,10,11,0,1], label: "Interviews & offers", type: "interview" },
      { months: [5,6,7],       label: "Joining window",      type: "joining" },
    ],
  },
];

// For a given track + month, return the highest-priority active event
const PRIORITY: EventType[] = ["internship","joining","interview","event","oa"];

function getEvent(track: Track, monthIdx: number): CalEvent | null {
  const matching = track.events.filter((e) => e.months.includes(monthIdx));
  if (!matching.length) return null;
  return matching.sort((a,b) => PRIORITY.indexOf(a.type) - PRIORITY.indexOf(b.type))[0];
}

export function HiringCalendar() {
  const [active, setActive] = useState<{track:number; month:number} | null>(null);

  const tooltipEvent =
    active !== null ? getEvent(tracks[active.track], active.month) : null;

  return (
    <div className="space-y-4">

      {/* Month header row */}
      <div className="flex">
        <div className="w-[120px] shrink-0" />
        <div className="flex-1 flex">
          {MONTHS.map((m) => (
            <div key={m} className="flex-1 text-center text-[10px] font-medium text-muted-foreground">
              {m}
            </div>
          ))}
        </div>
      </div>

      {/* Track rows */}
      {tracks.map((track, ti) => (
        <div key={track.label} className="flex items-center gap-0">
          {/* Label */}
          <div className="w-[120px] shrink-0 text-[11px] font-medium text-foreground pr-3 leading-tight">
            {track.label}
          </div>

          {/* Month cells */}
          <div className="flex-1 flex gap-0.5">
            {MONTHS.map((_, mi) => {
              const ev = getEvent(track, mi);
              const isActive = active?.track === ti && active?.month === mi;
              const style = ev ? typeStyle[ev.type] : null;

              return (
                <div
                  key={mi}
                  className="flex-1 h-9 rounded cursor-default relative"
                  style={{
                    backgroundColor: style ? style.bg : "hsl(var(--muted))",
                    outline: isActive ? `2px solid ${style?.dot ?? "#888"}` : "none",
                    outlineOffset: "1px",
                    transition: "outline 0.1s",
                  }}
                  onMouseEnter={() => ev && setActive({ track: ti, month: mi })}
                  onMouseLeave={() => setActive(null)}
                />
              );
            })}
          </div>
        </div>
      ))}

      {/* Inline tooltip / info bar */}
      <div
        className="min-h-[36px] rounded-lg border border-border px-4 py-2.5 text-sm flex items-center gap-3 transition-all duration-150"
        style={{
          backgroundColor: tooltipEvent ? typeStyle[tooltipEvent.type].bg : "hsl(var(--muted))",
          borderColor: tooltipEvent ? typeStyle[tooltipEvent.type].dot + "60" : undefined,
        }}
      >
        {tooltipEvent ? (
          <>
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: typeStyle[tooltipEvent.type].dot }}
            />
            <span style={{ color: typeStyle[tooltipEvent.type].text }} className="font-medium">
              {tracks[active!.track].label}:
            </span>
            <span style={{ color: typeStyle[tooltipEvent.type].text }}>
              {tooltipEvent.label}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground text-xs">Hover over a coloured month to see what&apos;s happening</span>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1">
        {(Object.entries(typeStyle) as [EventType, typeof typeStyle[EventType]][]).map(([type, s]) => (
          <div key={type} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s.bg, border: `1px solid ${s.dot}` }} />
            {type === "oa" ? "OA / Application" :
             type === "interview" ? "Interviews" :
             type === "internship" ? "Internship" :
             type === "joining" ? "Joining window" : "Special event"}
          </div>
        ))}
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="w-2.5 h-2.5 rounded-sm bg-muted border border-border" />
          No activity
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground/60 italic">
        Approximate patterns — exact months shift each year. Always verify with recent sources and your placement cell.
      </p>
    </div>
  );
}
