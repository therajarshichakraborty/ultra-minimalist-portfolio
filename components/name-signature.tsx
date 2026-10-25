"use client";

import { useId, useState } from "react";

export function NameSignature({ name, signature }: { name: string; signature: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <button
      type="button"
      aria-label={name}
      aria-expanded={open}
      aria-controls={id}
      data-open={open}
      onPointerEnter={(event) => event.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setOpen(false)}
      onFocus={(event) => event.currentTarget.matches(":focus-visible") && setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={(event) => {
        if (event.detail === 0 || !window.matchMedia("(hover: hover)").matches) setOpen((value) => !value);
      }}
      className="signature-trigger relative inline-block rounded font-[550] whitespace-nowrap"
    >
      {name}
      <span id={id} aria-hidden="true" className="signature">
        <span className="signature-ink font-script">{signature}</span>
      </span>
    </button>
  );
}
