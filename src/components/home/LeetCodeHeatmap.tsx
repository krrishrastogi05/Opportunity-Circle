"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface Props {
  submissionCalendar: string;
  weeks?: number;
}

function getLevel(count: number): 0 | 1 | 2 | 3 {
  if (count === 0) return 0;
  if (count <= 2)  return 1;
  if (count <= 6)  return 2;
  return 3;
}

const LEVEL_CLASSES: Record<number, string> = {
  0: "bg-muted/50",
  1: "bg-green-900",
  2: "bg-green-600",
  3: "bg-green-400",
};

export function LeetCodeHeatmap({ submissionCalendar, weeks = 26 }: Props) {
  const grid = useMemo(() => {
    let countMap: Record<string, number> = {};
    try { countMap = JSON.parse(submissionCalendar); } catch {}

    const dayMap: Record<string, number> = {};
    for (const [ts, count] of Object.entries(countMap)) {
      const d = new Date(Number(ts) * 1000);
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      dayMap[iso] = (dayMap[iso] ?? 0) + Number(count);
    }

    const today = new Date();
    const todayDow = today.getDay();

    // Start from the Sunday `weeks-1` weeks ago
    const startSunday = new Date(today);
    startSunday.setDate(today.getDate() - todayDow - (weeks - 1) * 7);

    const columns: { iso: string; count: number; future: boolean }[][] = [];
    const todayTime = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

    for (let w = 0; w < weeks; w++) {
      const col: { iso: string; count: number; future: boolean }[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(startSunday);
        date.setDate(startSunday.getDate() + w * 7 + d);
        const cellTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        col.push({ iso, count: dayMap[iso] ?? 0, future: cellTime > todayTime });
      }
      columns.push(col);
    }

    return columns;
  }, [submissionCalendar, weeks]);

  return (
    <div className="flex gap-[3px] w-full">
      {grid.map((col, wi) => (
        <div key={wi} className="flex flex-col gap-[3px] flex-1 min-w-0">
          {col.map(({ iso, count, future }, di) => (
            <div
              key={di}
              title={future ? "" : `${iso}: ${count} submission${count !== 1 ? "s" : ""}`}
              className={cn(
                "w-full aspect-square rounded-[3px]",
                future ? "opacity-0" : LEVEL_CLASSES[getLevel(count)]
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
