"use client";

import { useEffect, type RefObject } from "react";

export function useGaze(ref: RefObject<HTMLElement | SVGElement | null>, reach: number, range = 240) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      const box = node.getBoundingClientRect();
      const dx = x - (box.left + box.width / 2);
      const dy = y - (box.top + box.height / 2);
      const distance = Math.hypot(dx, dy) || 1;
      const strength = Math.min(distance / range, 1);
      node.style.setProperty("--gx", `${((dx / distance) * reach * strength).toFixed(2)}px`);
      node.style.setProperty("--gy", `${((dy / distance) * reach * strength).toFixed(2)}px`);
    };

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, [ref, reach, range]);
}

export function useBlink(ref: RefObject<HTMLElement | SVGElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(
        () => {
          node.dataset.blink = "true";
          window.setTimeout(() => {
            node.dataset.blink = "false";
          }, 180);
          schedule();
        },
        2800 + Math.random() * 3200,
      );
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [ref]);
}
