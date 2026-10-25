"use client";

import { useRef, useState } from "react";
import { useBlink, useGaze } from "@/components/use-gaze";
import { cn } from "@/lib/utils";

export const littleGuySurface = "bg-bg shadow-media ring-1 ring-line";

type LittleGuyProps = {
  className?: string;
  playful?: boolean;
};

function Figure({ jumping }: { jumping: boolean }) {
  const eyes = useRef<SVGGElement>(null);
  const root = useRef<SVGSVGElement>(null);
  useGaze(eyes, 7, 420);
  useBlink(root);

  return (
    <svg
      ref={root}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      data-jump={jumping}
      className="guy block size-full"
    >
      <path
        className="guy-bar"
        fill="var(--ink)"
        d="M86 36c0-7 6-12 14-12s14 5 14 12l-3 44c-.5 6-5 10-11 10s-10.5-4-11-10z"
      />
      <g className="guy-body">
        <circle cx="100" cy="138" r="38" fill="var(--ink)" />
        <g ref={eyes} className="guy-eyes">
          <g transform="rotate(-10 100 136)">
            <rect className="guy-eye" x="82" y="122" width="12" height="27" rx="6" fill="var(--bg)" />
            <rect className="guy-eye" x="105" y="122" width="12" height="27" rx="6" fill="var(--bg)" />
          </g>
        </g>
      </g>
    </svg>
  );
}

export function LittleGuy({ className, playful = false }: LittleGuyProps) {
  const [jumping, setJumping] = useState(false);
  const busy = useRef(false);

  const startle = () => {
    if (busy.current) return;
    busy.current = true;
    setJumping(true);
    window.setTimeout(() => {
      setJumping(false);
      busy.current = false;
    }, 680);
  };

  if (!playful) {
    return (
      <div aria-hidden="true" className={cn("pointer-events-none absolute inset-[14%]", className)}>
        <Figure jumping={false} />
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label="startle the little guy"
      onClick={startle}
      className={cn(
        "absolute inset-0 grid place-items-center outline-offset-[-6px] [-webkit-tap-highlight-color:transparent]",
        className,
      )}
    >
      <span className="block size-[72%]">
        <Figure jumping={jumping} />
      </span>
    </button>
  );
}
