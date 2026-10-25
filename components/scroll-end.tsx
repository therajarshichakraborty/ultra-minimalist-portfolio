"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ScrollEnd({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (node) node.scrollLeft = node.scrollWidth;
  }, []);

  return (
    <div ref={ref} className={cn("no-scrollbar overflow-x-auto", className)}>
      {children}
    </div>
  );
}
