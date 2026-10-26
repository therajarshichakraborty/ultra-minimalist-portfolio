"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

const command = "pnpm add motion";

export function CopyDemo() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      return;
    }
    window.clearTimeout(timer.current);
    setCopied(true);
    timer.current = window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="flex items-center gap-1 rounded-lg bg-bg py-1 pr-1 pl-3.5 shadow-media ring-1 ring-line">
        <code className="font-mono text-[13px] tracking-normal text-ink">
          <span className="text-muted select-none">$ </span>
          {command}
        </code>
        <span className="relative ml-2">
          <span
            aria-hidden="true"
            data-show={copied}
            className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 translate-y-1 rounded bg-ink px-1.5 py-0.5 text-meta text-bg opacity-0 transition-[opacity,translate] duration-200 ease-snap data-[show=true]:translate-y-0 data-[show=true]:opacity-100"
          >
            Copied
          </span>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy command"}
            data-copied={copied}
            className="copy-swap relative grid size-7 place-items-center rounded-md text-ink transition-colors duration-150 hover:bg-chip focus-visible:bg-chip active:scale-[0.94]"
          >
            <CopyIcon data-glyph="copy" className="size-3.5" />
            <CheckIcon data-glyph="check" className="size-3.5" />
          </button>
        </span>
      </div>
      <span role="status" className="sr-only">
        {copied ? "Command copied" : ""}
      </span>
    </div>
  );
}
