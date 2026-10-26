"use client";

import { ArrowUpIcon } from "@/components/icons";

export function BackToTop() {
  const top = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={top}
      className="group inline-flex items-center gap-2 rounded-full bg-chip py-1.5 pr-4 pl-3.5 text-ink transition-[background-color,transform] duration-150 ease-snap hover:bg-chip-hover active:scale-[0.97] active:bg-chip-press"
    >
      <ArrowUpIcon className="size-3.5 transition-transform duration-300 ease-out-quint group-hover:-translate-y-0.5" />
      Back to top
    </button>
  );
}
