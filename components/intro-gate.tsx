"use client";

import { useEffect } from "react";

export function IntroGate() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      document.documentElement.removeAttribute("data-intro");
    }, 2600);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
