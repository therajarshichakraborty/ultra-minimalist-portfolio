"use client";

import { AnimatePresence, motion } from "motion/react";
import { Children, useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type HoverListProps = {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
};

export function HoverList({ children, className, itemClassName }: HoverListProps) {
  const [active, setActive] = useState<number | null>(null);
  const id = useId();

  return (
    <ul className={className} onPointerLeave={() => setActive(null)}>
      {Children.toArray(children).map((child, index) => (
        <li
          key={index}
          onPointerEnter={(event) => event.pointerType === "mouse" && setActive(index)}
          onFocusCapture={() => setActive(index)}
          onBlurCapture={() => setActive(null)}
          className={cn("relative isolate", itemClassName)}
        >
          <AnimatePresence>
            {active === index ? (
              <motion.span
                aria-hidden="true"
                layoutId={`${id}-hover`}
                className="hover-pill absolute inset-0 -z-10 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            ) : null}
          </AnimatePresence>
          {child}
        </li>
      ))}
    </ul>
  );
}
