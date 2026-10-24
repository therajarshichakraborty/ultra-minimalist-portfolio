"use client";

import { useEffect, useRef } from "react";

export function DotField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = ref.current;
    if (!field) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      field.style.setProperty("--x", `${x}px`);
      field.style.setProperty("--y", `${y}px`);
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      field.dataset.active = "true";
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const leave = () => {
      field.dataset.active = "false";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-active="false"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden print:hidden"
    >
      <div className="dot-layer" data-layer="base" />
      <div className="dot-layer" data-layer="glow" />
    </div>
  );
}
