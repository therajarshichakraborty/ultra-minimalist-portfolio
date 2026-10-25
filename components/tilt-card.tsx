"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  max?: number;
};

function enabled() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function TiltCard({ children, className, max = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse" || !enabled()) return;
    const box = node.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    node.dataset.tilt = "true";
    node.style.setProperty("--rx", `${((0.5 - y) * max * 2).toFixed(2)}deg`);
    node.style.setProperty("--ry", `${((x - 0.5) * max * 2).toFixed(2)}deg`);
    node.style.setProperty("--px", `${(x * 100).toFixed(1)}%`);
    node.style.setProperty("--py", `${(y * 100).toFixed(1)}%`);
  };

  const reset = () => {
    const node = ref.current;
    if (!node) return;
    node.dataset.tilt = "false";
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      data-tilt="false"
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerDown={reset}
      className={cn("tilt relative", className)}
    >
      {children}
      <span aria-hidden="true" className="tilt-glare" />
    </div>
  );
}
