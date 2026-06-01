"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarPlus, ChevronDown } from "lucide-react";
import {
  googleCalendarUrl,
  icsDataUri,
  type CalendarEventInput,
} from "@/lib/calendar";

export function AddToCalendar({ event }: { event: CalendarEventInput }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!event.date) return null;

  const gcal = googleCalendarUrl(event);
  const ics = icsDataUri(event);
  const fileName = `${event.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.ics`;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <CalendarPlus className="w-3.5 h-3.5" />
        Add to calendar
        <ChevronDown className="w-3 h-3" />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-52 rounded-xl border border-border bg-card shadow-lg z-20 overflow-hidden">
          <a
            href={gcal}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
          >
            Google Calendar
          </a>
          <a
            href={ics}
            download={fileName}
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors border-t border-border"
          >
            Apple / Outlook (.ics)
          </a>
        </div>
      )}
    </div>
  );
}
