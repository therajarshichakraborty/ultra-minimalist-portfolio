"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=?";
const duration = 900;

export function ScrambleDemo() {
  const text = site.name;
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const box = useRef<HTMLDivElement>(null);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const settled = Math.floor(progress * text.length);
      setDisplay(
        text
          .split("")
          .map((char, index) =>
            char === " " || index < settled ? char : glyphs[Math.floor(Math.random() * glyphs.length)],
          )
          .join(""),
      );
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => {
    const node = box.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) run();
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [run]);

  return (
    <div ref={box} className="absolute inset-0 flex flex-col items-center justify-center gap-5">
      <div onPointerEnter={run} className="text-center">
        <p aria-label={text} className="font-mono text-[20px] tracking-normal text-ink">
          <span aria-hidden="true">{display}</span>
        </p>
        <p className="mt-1 text-muted">{site.role}</p>
      </div>
      <button type="button" onClick={run} onFocus={run} className="chip">
        replay
      </button>
    </div>
  );
}
