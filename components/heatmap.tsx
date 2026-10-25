import type { CSSProperties } from "react";
import type { Day } from "@/lib/activity";

const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function weekday(date: string) {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

function label(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return `${months[month - 1]} ${day}, ${year}`;
}

function levels(days: Day[]) {
  const sorted = days.map((day) => day.count).filter((count) => count > 0).sort((a, b) => a - b);
  const at = (q: number) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * q))] ?? 1;
  const steps = [at(0.25), at(0.5), at(0.75)];
  return (count: number) => {
    if (count <= 0) return 0;
    if (count <= steps[0]) return 1;
    if (count <= steps[1]) return 2;
    if (count <= steps[2]) return 3;
    return 4;
  };
}

type HeatmapProps = {
  days: Day[];
  unit: string;
  label: string;
};

export function Heatmap({ days, unit, label: name }: HeatmapProps) {
  if (!days.length) return null;
  const level = levels(days);
  const offset = weekday(days[0].date);
  const weeks = Math.ceil((offset + days.length) / 7);
  const marks: { column: number; month: string }[] = [];
  days.forEach((day, index) => {
    const column = Math.floor((offset + index) / 7);
    const month = months[Number(day.date.slice(5, 7)) - 1];
    if ((day.date.endsWith("-01") || index === 0) && column <= weeks - 3) {
      if (!marks.length || column - marks[marks.length - 1].column >= 3) marks.push({ column, month });
    }
  });

  return (
    <figure className="overflow-x-auto no-scrollbar">
      <div className="min-w-[560px]" style={{ "--weeks": weeks } as CSSProperties}>
        <div aria-hidden="true" className="grid grid-cols-[repeat(var(--weeks),minmax(0,1fr))] gap-[3px] pb-1.5 text-meta text-muted">
          {marks.map((mark) => (
            <span key={`${mark.month}-${mark.column}`} style={{ gridColumnStart: mark.column + 1 }} className="col-span-3">
              {mark.month}
            </span>
          ))}
        </div>
        <div
          role="img"
          aria-label={name}
          className="heatmap grid grid-flow-col grid-cols-[repeat(var(--weeks),minmax(0,1fr))] grid-rows-7 gap-[3px]"
        >
          {Array.from({ length: offset }, (_, index) => (
            <span key={`pad-${index}`} />
          ))}
          {days.map((day, index) => (
            <span
              key={day.date}
              data-level={level(day.count)}
              title={`${day.count === 0 ? "no" : day.count} ${unit}${day.count === 1 ? "" : "s"} on ${label(day.date)}`}
              style={{ "--i": Math.floor((offset + index) / 7) } as CSSProperties}
              className="heat-cell aspect-square rounded-[2px]"
            />
          ))}
        </div>
      </div>
    </figure>
  );
}

export function HeatLegend() {
  return (
    <span aria-hidden="true" className="flex items-center gap-1.5 text-meta text-muted">
      less
      {[0, 1, 2, 3, 4].map((step) => (
        <span key={step} data-level={step} className="heat-cell size-2.5 rounded-[2px]" />
      ))}
      more
    </span>
  );
}
