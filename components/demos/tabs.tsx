"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent } from "react";

const data = {
  day: { total: "1,204", bars: [32, 48, 40, 62, 54, 70, 46, 58, 66, 52] },
  week: { total: "8,930", bars: [58, 64, 50, 72, 80, 66, 74, 88, 70, 76] },
  month: { total: "36,412", bars: [40, 56, 68, 60, 78, 84, 72, 92, 86, 96] },
};

type Tab = keyof typeof data;
const tabs = Object.keys(data) as Tab[];

export function TabsDemo() {
  const [active, setActive] = useState<Tab>("week");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.indexOf(active);
    const moves: Record<string, number> = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = moves[event.key];
    setActive(tabs[next]);
    refs.current[next]?.focus();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8">
        <div role="tablist" aria-label="range" onKeyDown={onKeyDown} className="relative flex rounded-md bg-chip p-0.5">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              ref={(node) => {
                refs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${id}-${tab}`}
              aria-selected={active === tab}
              aria-controls={`${id}-panel`}
              tabIndex={active === tab ? 0 : -1}
              onClick={() => setActive(tab)}
              className="relative px-3.5 py-1 text-ink outline-offset-1"
            >
              {active === tab ? (
                <motion.span
                  layoutId={`${id}-indicator`}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded bg-bg shadow-[0_1px_2px_rgb(0_0_0/0.08),0_0_0_1px_var(--line)]"
                />
              ) : null}
              <span className="relative">{tab}</span>
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${active}`} className="w-full max-w-[240px]">
          <div className="flex items-baseline justify-between">
            <span className="text-meta text-muted">visits</span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={active}
                initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6, filter: "blur(3px)" }}
                transition={{ duration: 0.22 }}
                className="font-medium tabular-nums"
              >
                {data[active].total}
              </motion.span>
            </AnimatePresence>
          </div>
          <div aria-hidden="true" className="mt-3 flex h-24 items-end gap-1.5">
            {data[active].bars.map((height, index) => (
              <motion.span
                key={index}
                animate={{ height: `${height}%` }}
                transition={{ type: "spring", stiffness: 260, damping: 26, delay: index * 0.015 }}
                className="flex-1 rounded-sm bg-ink"
                style={{ opacity: 0.25 + (index / data[active].bars.length) * 0.75 }}
              />
            ))}
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
