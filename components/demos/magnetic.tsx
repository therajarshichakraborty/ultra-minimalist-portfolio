"use client";

import { motion, MotionConfig, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type PointerEvent } from "react";

const spring = { stiffness: 220, damping: 16, mass: 0.4 };

export function MagneticDemo() {
  const button = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const lx = useTransform(sx, (value) => value * 0.45);
  const ly = useTransform(sy, (value) => value * 0.45);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const node = button.current;
    if (!node || event.pointerType !== "mouse") return;
    const box = node.getBoundingClientRect();
    const dx = event.clientX - (box.left + box.width / 2);
    const dy = event.clientY - (box.top + box.height / 2);
    const distance = Math.hypot(dx, dy);
    const pull = distance < 140 ? 1 - distance / 140 : 0;
    x.set(dx * 0.35 * pull + Math.sign(dx) * Math.min(Math.abs(dx), 18) * pull * 0.4);
    y.set(dy * 0.35 * pull + Math.sign(dy) * Math.min(Math.abs(dy), 18) * pull * 0.4);
  };

  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div onPointerMove={move} onPointerLeave={leave} className="absolute inset-0 grid place-items-center">
        <motion.button
          ref={button}
          type="button"
          style={{ x: sx, y: sy }}
          whileTap={{ scale: 0.96 }}
          className="rounded-full bg-ink px-5 py-2.5 text-bg shadow-lift"
        >
          <motion.span style={{ x: lx, y: ly }} className="block">
            <span className="hidden pointer-fine:inline">Hover me</span>
            <span className="pointer-fine:hidden">Tap me</span>
          </motion.span>
        </motion.button>
      </div>
    </MotionConfig>
  );
}
