"use client";

import { useRef, type PointerEvent } from "react";

export function SpotlightDemo() {
  const card = useRef<HTMLDivElement>(null);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const node = card.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    node.style.setProperty("--sx", `${event.clientX - box.left}px`);
    node.style.setProperty("--sy", `${event.clientY - box.top}px`);
    node.dataset.lit = "true";
  };

  const leave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && card.current) card.current.dataset.lit = "false";
  };

  return (
    <div
      onPointerMove={move}
      onPointerDown={move}
      onPointerLeave={leave}
      className="absolute inset-0 grid place-items-center"
    >
      <div ref={card} data-lit="false" className="spotlight relative w-[72%] rounded-xl bg-bg p-5 ring-1 ring-line">
        <span aria-hidden="true" className="spotlight-glow" />
        <span aria-hidden="true" className="spotlight-edge" />
        <p className="relative font-medium">Spotlight</p>
        <p className="relative mt-1 text-pretty text-muted">
          The border follows your pointer, like a flashlight along the edge.
        </p>
      </div>
    </div>
  );
}
