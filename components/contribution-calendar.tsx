"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
} from "@/components/kibo-ui/contribution-graph";
import { ArrowUpRightIcon } from "@/components/icons";
import type { Calendar } from "@/lib/activity";

const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const number = new Intl.NumberFormat("en-US");

function pretty(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return `${months[month - 1]} ${day}, ${year}`;
}

type Tip = { x: number; y: number; date: string; count: number; align: "start" | "center" | "end" } | null;

type ContributionCalendarProps = {
  calendars: Calendar[];
  variant: "github" | "leetcode";
  unit: string;
  handle: string;
  href: string;
  icon?: ReactNode;
  title?: string;
};

export function ContributionCalendar({ calendars, variant, unit, handle, href, icon, title }: ContributionCalendarProps) {
  const [key, setKey] = useState(calendars[0]?.key ?? "current");
  const [tip, setTip] = useState<Tip>(null);
  const frame = useRef<HTMLDivElement>(null);
  const id = useId();
  const calendar = calendars.find((item) => item.key === key) ?? calendars[0];

  useEffect(() => {
    const scroller = frame.current?.querySelector<HTMLElement>(".overflow-x-auto");
    if (scroller) scroller.scrollLeft = scroller.scrollWidth;
  }, [key]);

  if (!calendar) return null;

  const period = calendar.key === "current" ? "in the past one year" : `in ${calendar.label}`;
  const plural = (count: number) => `${unit}${count === 1 ? "" : "s"}`;

  const hover = (event: PointerEvent<HTMLDivElement>) => {
    const target = event.target as Element;
    const box = frame.current?.getBoundingClientRect();
    if (!box || target.tagName !== "rect" || !target.getAttribute("data-date") || target.closest("[data-legend]")) {
      setTip(null);
      return;
    }
    const cell = target.getBoundingClientRect();
    const x = cell.left - box.left + cell.width / 2;
    setTip({
      x,
      align: x < 110 ? "start" : x > box.width - 110 ? "end" : "center",
      y: cell.top - box.top,
      date: target.getAttribute("data-date") ?? "",
      count: Number(target.getAttribute("data-count") ?? 0),
    });
  };

  const picker = calendars.length > 1 ? (
    <label className="relative inline-flex shrink-0 items-center">
      <span className="sr-only">choose a year</span>
      <select
        value={calendar.key}
        onChange={(event) => {
          setTip(null);
          setKey(event.target.value);
        }}
        className="appearance-none rounded-md bg-bg py-1 pr-7 pl-2.5 text-meta font-medium text-ink ring-1 ring-line transition-shadow duration-150 outline-none hover:ring-[color-mix(in_srgb,var(--ink)_20%,transparent)] focus-visible:ring-2 focus-visible:ring-ink"
      >
        {calendars.map((item) => (
          <option key={item.key} value={item.key}>
            {item.label}
          </option>
        ))}
      </select>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute right-2 size-3 text-muted" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  ) : null;

  const link = (
    <a href={href} target="_blank" rel="noreferrer" className="group inline-flex shrink-0 items-center gap-1 text-meta text-muted transition-colors hover:text-ink focus-visible:text-ink">
      {handle}
      <ArrowUpRightIcon className="size-3 transition-transform duration-200 ease-snap group-hover:-translate-y-px group-hover:translate-x-px" />
    </a>
  );

  return (
    <div className="contribution">
      {variant === "github" ? (
        <header className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <h2 className="flex items-center gap-2">
            {icon}
            <span className="font-medium">{title}</span>
            <span className="badge badge-green tabular-nums">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              {number.format(calendar.total)} {calendar.key === "current" ? "this year" : `in ${calendar.label}`}
            </span>
          </h2>
          <div className="flex items-center gap-3">
            {picker}
            {link}
          </div>
        </header>
      ) : (
        <header className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-meta text-muted tabular-nums">
            <span>
              <span className="font-medium text-ink">{number.format(calendar.total)}</span> {plural(calendar.total)} {period}
            </span>
            {calendar.activeDays !== undefined ? (
              <span className="inline-flex items-center gap-1">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3 text-[#8b5cf6]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <span className="font-medium text-ink">{calendar.activeDays}</span> active days
              </span>
            ) : null}
            {calendar.streak !== undefined ? (
              <span className="inline-flex items-center gap-1">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                </svg>
                max streak <span className="font-medium text-ink">{calendar.streak}</span>
              </span>
            ) : null}
          </p>
          <div className="flex items-center gap-3">
            {picker}
            {link}
          </div>
        </header>
      )}

      <div ref={frame} onPointerOver={hover} onPointerLeave={() => setTip(null)} className="relative">
        <ContributionGraph
          key={calendar.key}
          data={calendar.days}
          blockSize={11}
          blockMargin={3}
          blockRadius={2.5}
          fontSize={12}
          className="w-full max-w-none text-muted"
          labels={{ months, legend: { less: "less", more: "more" } }}
        >
          <ContributionGraphCalendar
            aria-describedby={`${id}-summary`}
            className="no-scrollbar [&>svg]:h-auto [&>svg]:w-full [&>svg]:min-w-[620px]"
          >
            {({ activity, dayIndex, weekIndex }) => (
              <ContributionGraphBlock
                activity={activity}
                dayIndex={dayIndex}
                weekIndex={weekIndex}
                className="contribution-cell"
                style={{ "--w": weekIndex } as CSSProperties}
              />
            )}
          </ContributionGraphCalendar>
          <ContributionGraphFooter className="mt-1 items-center justify-between text-meta">
            {variant === "github" ? (
              <span className="text-muted tabular-nums">
                {number.format(calendar.total)} {plural(calendar.total)} {period}
              </span>
            ) : (
              <span className="flex items-center gap-2 text-muted">
                total
                <span className="rounded-full bg-bg px-2.5 py-0.5 font-medium text-ink ring-1 ring-line tabular-nums">
                  {number.format(calendar.total)} {plural(calendar.total)}
                </span>
              </span>
            )}
            <ContributionGraphLegend data-legend="" className="text-muted" />
          </ContributionGraphFooter>
        </ContributionGraph>
        <p id={`${id}-summary`} className="sr-only">
          {number.format(calendar.total)} {plural(calendar.total)} {period}.
        </p>
        <span
          role="tooltip"
          aria-hidden={!tip}
          data-show={Boolean(tip)}
          data-align={tip?.align ?? "center"}
          style={tip ? { left: tip.x, top: tip.y } : undefined}
          className="contribution-tip pointer-events-none absolute z-10 rounded-md bg-ink px-2 py-1 text-meta whitespace-nowrap text-bg shadow-lift"
        >
          {tip ? (
            <>
              <span className="font-medium">{tip.count === 0 ? "no" : number.format(tip.count)}</span> {plural(tip.count)} on {pretty(tip.date)}
            </>
          ) : null}
        </span>
      </div>
    </div>
  );
}
