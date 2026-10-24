"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const gutter = "max(var(--gutter), calc((100% - var(--column)) / 2))";

const track: CSSProperties = {
  paddingLeft: gutter,
  scrollPaddingInline: gutter,
};

type RailProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function Rail({ label, children, className }: RailProps) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [tail, setTail] = useState(0);

  const items = useCallback(() => {
    const el = scroller.current;
    return el ? Array.from(el.querySelectorAll<HTMLElement>(":scope > [data-slide]")) : [];
  }, []);

  const start = useCallback(() => {
    const el = scroller.current;
    return el ? parseFloat(getComputedStyle(el).paddingLeft) || 0 : 0;
  }, []);

  const sync = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const offset = start();
    let best = 0;
    let distance = Number.POSITIVE_INFINITY;
    items().forEach((item, i) => {
      const d = Math.abs(item.offsetLeft - offset - el.scrollLeft);
      if (d < distance) {
        distance = d;
        best = i;
      }
    });
    setIndex(best);
  }, [items, start]);

  const measure = useCallback(() => {
    const el = scroller.current;
    const list = items();
    const last = list[list.length - 1];
    if (!el || !last) return;
    const offset = start();
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    setTail(Math.max(offset - gap, el.clientWidth - offset - last.offsetWidth - gap));
  }, [items, start]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          sync();
        });
      }
    };
    const observer = new ResizeObserver(() => {
      measure();
      sync();
    });
    observer.observe(el);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      el.removeEventListener("scroll", onScroll);
    };
  }, [measure, sync]);

  const go = useCallback(
    (target: number) => {
      const el = scroller.current;
      const list = items();
      if (!el || !list.length) return;
      const item = list[Math.max(0, Math.min(list.length - 1, target))];
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollTo({ left: item.offsetLeft - start(), behavior: reduce ? "auto" : "smooth" });
    },
    [items, start],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: count - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    go(moves[event.key]);
  };

  return (
    <section aria-roledescription="carousel" aria-label={label} className={cn("relative", className)}>
      <div
        ref={scroller}
        tabIndex={0}
        onKeyDown={onKeyDown}
        style={track}
        className="no-scrollbar relative flex snap-x snap-mandatory items-start gap-5 overflow-x-auto overscroll-x-contain pt-1 pb-7 focus-visible:outline-offset-[-2px]"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            data-slide=""
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className="shrink-0 snap-start"
          >
            {slide}
          </div>
        ))}
        <div aria-hidden="true" className="shrink-0" style={{ width: tail }} />
      </div>
      <div className="column flex items-center justify-between">
        <p className="text-meta text-muted tabular-nums">
          {index + 1} of {count}
        </p>
        <div className="flex gap-2">
          <RailButton label="previous" disabled={index <= 0} onClick={() => go(index - 1)}>
            <ChevronLeftIcon className="size-4" />
          </RailButton>
          <RailButton label="next" disabled={index >= count - 1} onClick={() => go(index + 1)}>
            <ChevronRightIcon className="size-4" />
          </RailButton>
        </div>
      </div>
    </section>
  );
}

type RailButtonProps = {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
};

function RailButton({ label, disabled, onClick, children }: RailButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="relative grid size-6 place-items-center rounded bg-chip text-ink transition-[background-color,opacity,transform] duration-150 ease-snap before:absolute before:-inset-2 before:content-[''] hover:bg-chip-hover focus-visible:bg-chip-hover active:scale-[0.94] active:bg-chip-press disabled:opacity-30 disabled:active:scale-100"
    >
      {children}
    </button>
  );
}
