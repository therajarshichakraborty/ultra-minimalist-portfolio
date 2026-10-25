"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChipIcon } from "@/components/chip";
import { CheckIcon, MailIcon } from "@/components/icons";

type State = "idle" | "copied" | "failed";

const labels: Record<State, string> = {
  idle: "copy",
  copied: "copied",
  failed: "retry",
};

async function write(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const done = document.execCommand("copy");
    area.remove();
    return done;
  }
}

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<State>("idle");
  const [width, setWidth] = useState<number>();
  const refs = useRef<Record<State, HTMLSpanElement | null>>({ idle: null, copied: null, failed: null });
  const timer = useRef(0);

  useLayoutEffect(() => {
    setWidth(refs.current[state]?.offsetWidth);
  }, [state]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    window.clearTimeout(timer.current);
    const ok = await write(email);
    setState(ok ? "copied" : "failed");
    timer.current = window.setTimeout(() => setState("idle"), ok ? 1600 : 2400);
  };

  return (
    <>
      <button type="button" onClick={copy} title={`copy ${email}`} data-state={state} className="copy-email chip">
        <ChipIcon name="email">
          <span className="copy-glyphs">
            <MailIcon data-glyph="mail" />
            <CheckIcon data-glyph="check" />
          </span>
        </ChipIcon>
        <span className="copy-labels" style={width ? { width } : undefined}>
          {(Object.keys(labels) as State[]).map((key) => (
            <span
              key={key}
              ref={(node) => {
                refs.current[key] = node;
              }}
              data-visible={key === state}
            >
              {labels[key]}
            </span>
          ))}
        </span>{" "}
        my email
      </button>
      <span role="status" className="sr-only">
        {state === "copied" ? "email copied to clipboard" : state === "failed" ? "copy failed, try again" : ""}
      </span>
    </>
  );
}
