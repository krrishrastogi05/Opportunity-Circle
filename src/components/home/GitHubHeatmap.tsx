"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Contribution {
  date: string; // "YYYY-MM-DD"
  count: number;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function getContributionLevel(count: number): 0 | 1 | 2 | 3 {
  if (count === 0) return 0;
  if (count <= 3)  return 1;
  if (count <= 8)  return 2;
  return 3;
}

const LEVEL_CLASSES: Record<number, string> = {
  0: "text-muted-foreground/70 hover:bg-accent",
  1: "bg-green-900/70 text-green-300 hover:bg-green-900",
  2: "bg-green-700 text-white hover:bg-green-600",
  3: "bg-green-500 text-white font-semibold hover:bg-green-400",
};

export function GitHubHeatmap({ contributions }: { contributions: Contribution[] }) {
  const today = new Date();
  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  // Build a lookup map: "YYYY-MM-DD" -> count
  const countMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const c of contributions) m[c.date] = c.count;
    return m;
  }, [contributions]);

  // Navigate months
  function prev() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function next() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  // Build grid: always 6 rows × 7 cols
  const cells = useMemo(() => {
    const firstDow    = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevDays    = new Date(year, month, 0).getDate();

    const grid: { day: number; iso: string; current: boolean }[] = [];

    // Trailing days from prev month
    for (let i = firstDow - 1; i >= 0; i--) {
      const d  = prevDays - i;
      const m2 = month === 0 ? 12 : month;
      const y2 = month === 0 ? year - 1 : year;
      grid.push({ day: d, iso: `${y2}-${String(m2).padStart(2,"0")}-${String(d).padStart(2,"0")}`, current: false });
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      grid.push({
        day: d,
        iso: `${year}-${String(month + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`,
        current: true,
      });
    }

    // Leading days of next month
    const remaining = 42 - grid.length;
    for (let d = 1; d <= remaining; d++) {
      const m2 = month === 11 ? 1 : month + 2;
      const y2 = month === 11 ? year + 1 : year;
      grid.push({ day: d, iso: `${y2}-${String(m2).padStart(2,"0")}-${String(d).padStart(2,"0")}`, current: false });
    }

    return grid;
  }, [year, month]);

  const todayIso = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;

  return (
    <div className="w-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-0.5">
        <span className="text-xs font-bold">{MONTHS[month]} {year}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            className="h-6 w-6 rounded-md border border-border bg-card hover:bg-accent transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="h-3 w-3" />
          </button>
          <button
            onClick={next}
            className="h-6 w-6 rounded-md border border-border bg-card hover:bg-accent transition-colors flex items-center justify-center"
          >
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-0.5">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[0.65rem] text-muted-foreground font-normal py-0.5">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map(({ day, iso, current }, i) => {
          const count = countMap[iso] ?? 0;
          const level = current ? getContributionLevel(count) : 0;
          const isToday = iso === todayIso;

          return (
            <div
              key={i}
              className={cn(
                "h-8 w-full rounded-md flex items-center justify-center text-[0.7rem] transition-colors cursor-default",
                current ? LEVEL_CLASSES[level] : "text-muted-foreground/25",
                isToday && "ring-2 ring-primary ring-offset-1 ring-offset-card"
              )}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
