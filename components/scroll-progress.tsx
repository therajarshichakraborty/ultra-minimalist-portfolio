"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = bar.current;
    if (!node) return;
    let frame = 0;
    const paint = () => {
      frame = 0;
      const room = document.documentElement.scrollHeight - window.innerHeight;
      const progress = room > 160 ? Math.min(1, Math.max(0, window.scrollY / room)) : 0;
      node.style.transform = `scaleX(${progress})`;
      node.dataset.visible = progress > 0.002 ? "true" : "false";
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  return <div ref={bar} aria-hidden="true" data-visible="false" className="scroll-progress print:hidden" />;
}
