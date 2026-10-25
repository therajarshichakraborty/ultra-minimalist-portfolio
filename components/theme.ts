"use client";

import { useSyncExternalStore } from "react";
import { themeStorageKey } from "@/lib/theme-script";

export type Resolved = "light" | "dark";

function resolve(): Resolved {
  const theme = document.documentElement.dataset.theme;
  if (theme === "light" || theme === "dark") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

export function useResolvedTheme(fallback: Resolved) {
  return useSyncExternalStore(subscribe, resolve, () => fallback);
}

function persist(value: Resolved) {
  try {
    localStorage.setItem(themeStorageKey, value);
    return true;
  } catch {
    return false;
  }
}

export function switchTheme(origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const next: Resolved = resolve() === "dark" ? "light" : "dark";

  const apply = () => {
    root.dataset.theme = next;
    persist(next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#0a0a0a" : "#ffffff");
  };

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduce) {
    apply();
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  root.style.setProperty("--tx", `${x}px`);
  root.style.setProperty("--ty", `${y}px`);
  root.style.setProperty("--tr", `${Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))}px`);
  root.dataset.themeSwitch = "";
  const transition = document.startViewTransition(apply);
  transition.finished.finally(() => {
    delete root.dataset.themeSwitch;
  });
}
