"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function TracingBeam({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const paint = () => {
      frame = 0;
      const box = node.getBoundingClientRect();
      const start = window.innerHeight * 0.6;
      const progress = Math.min(Math.max((start - box.top) / Math.max(box.height, 1), 0), 1);
      node.style.setProperty("--beam", progress.toFixed(4));
      node.dataset.reading = progress > 0.01 ? "true" : "false";
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={ref} data-reading="false" className="beam relative">
      <span aria-hidden="true" className="beam-track" />
      <span aria-hidden="true" className="beam-dot" />
      {children}
    </div>
  );
}
