"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { CheckIcon } from "@/components/icons";

type State = "idle" | "holding" | "done";

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4">
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export function HoldDemo() {
  const [state, setState] = useState<State>("idle");
  const timer = useRef(0);
  const reset = useRef(0);

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
      window.clearTimeout(reset.current);
    },
    [],
  );

  const start = () => {
    if (state === "done") return;
    setState("holding");
    timer.current = window.setTimeout(() => {
      setState("done");
      reset.current = window.setTimeout(() => setState("idle"), 1600);
    }, 1200);
  };

  const stop = () => {
    window.clearTimeout(timer.current);
    setState((current) => (current === "holding" ? "idle" : current));
  };

  const keyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === " " || event.key === "Enter") && !event.repeat) {
      event.preventDefault();
      start();
    }
  };

  const keyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === " " || event.key === "Enter") stop();
  };

  return (
    <div className="absolute inset-0 grid place-items-center">
      <button
        type="button"
        data-state={state}
        onPointerDown={start}
        onPointerUp={stop}
        onPointerLeave={stop}
        onPointerCancel={stop}
        onKeyDown={keyDown}
        onKeyUp={keyUp}
        onContextMenu={(event) => event.preventDefault()}
        className="hold relative isolate overflow-hidden rounded-full bg-chip px-4 py-2 text-ink select-none [-webkit-touch-callout:none]"
      >
        <span aria-hidden="true" className="hold-fill" />
        <span className="hold-label relative flex items-center gap-2">
          {state === "done" ? <CheckIcon className="size-4" /> : <TrashIcon />}
          {state === "done" ? "deleted" : "hold to delete"}
        </span>
      </button>
      <span role="status" className="sr-only">
        {state === "done" ? "deleted" : ""}
      </span>
    </div>
  );
}
