import { ViewTransition, type ReactNode } from "react";

const directions = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "nav-fade",
};

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={directions} exit={directions} default="none">
      {children}
    </ViewTransition>
  );
}

export function Morph({ name, children }: { name: string; children: ReactNode }) {
  return (
    <ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
