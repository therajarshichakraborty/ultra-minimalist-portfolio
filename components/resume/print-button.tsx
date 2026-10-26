"use client";

import { useEffect } from "react";
import { PrinterIcon } from "@/components/icons";

export function PrintButton() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("print") !== "1") return;
    const timer = window.setTimeout(() => {
      window.history.replaceState(null, "", window.location.pathname);
      window.print();
    }, 500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <button type="button" onClick={() => window.print()} className="chip text-meta leading-[18px] text-ink">
      <PrinterIcon className="mr-1 inline-block size-3 align-[-1px]" />
      Print
    </button>
  );
}
