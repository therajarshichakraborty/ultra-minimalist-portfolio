"use client";

import { ChipIcon } from "@/components/chip";
import { ArrowUpIcon } from "@/components/icons";

export function BackToTop() {
  const top = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button type="button" onClick={top} className="chip">
      <ChipIcon>
        <ArrowUpIcon />
      </ChipIcon>
      Back to top
    </button>
  );
}
