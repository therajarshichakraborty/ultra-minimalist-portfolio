"use client";

import { useSyncExternalStore } from "react";

const clock = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" });

function subscribe(update: () => void) {
  const timer = window.setInterval(update, 10_000);
  return () => window.clearInterval(timer);
}

export function LocalTime() {
  const time = useSyncExternalStore(
    subscribe,
    () => clock.format(Date.now()),
    () => null,
  );

  return <span className="tabular-nums">{time ? `${time} IST` : "IST"}</span>;
}
