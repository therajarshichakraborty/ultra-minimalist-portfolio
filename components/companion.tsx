"use client";

import Link from "next/link";
import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { useBlink, useGaze } from "@/components/use-gaze";

export function CompanionLink({ href, children }: { href: string; children: ReactNode }) {
  const eyes = useRef<SVGGElement>(null);
  const face = useRef<HTMLSpanElement>(null);
  const last = useRef(0);
  const [swat, setSwat] = useState(false);
  useGaze(eyes, 3.5);
  useBlink(face);

  const enter = (event: PointerEvent<HTMLAnchorElement>) => {
    const node = face.current;
    if (!node || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (event.timeStamp - last.current < 1200) return;
    last.current = event.timeStamp;
    const box = node.getBoundingClientRect();
    const angle = Math.atan2(event.clientY - (box.top + box.height / 2), event.clientX - (box.left + box.width / 2));
    node.style.setProperty("--swat-angle", `${angle}rad`);
    setSwat(true);
    window.setTimeout(() => setSwat(false), 460);
  };

  return (
    <Link href={href} transitionTypes={["nav-forward"]} onPointerEnter={enter} className="chip companion pl-[30px]">
      <span ref={face} aria-hidden="true" data-swat={swat} className="companion-face">
        <span className="companion-react">
          <svg viewBox="34 25 56 56" focusable="false" className="companion-body">
            <circle cx="62" cy="53" r="28" fill="var(--ink)" />
            <g ref={eyes} className="companion-eyes" fill="var(--bg)">
              <rect className="guy-eye" x="47" y="43" width="11" height="16" rx="5.5" />
              <rect className="guy-eye" x="66" y="43" width="11" height="16" rx="5.5" />
            </g>
          </svg>
          <span className="companion-aim">
            <span className="companion-hand" />
          </span>
        </span>
      </span>
      {children}
    </Link>
  );
}
