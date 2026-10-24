import type { ComponentType } from "react";
import { CopyDemo } from "@/components/demos/copy";
import { DockDemo } from "@/components/demos/dock";
import { HoldDemo } from "@/components/demos/hold";
import { LittleGuyDemo } from "@/components/demos/little-guy-demo";
import { MagneticDemo } from "@/components/demos/magnetic";
import { ScrambleDemo } from "@/components/demos/scramble";
import { SpotlightDemo } from "@/components/demos/spotlight";
import { StackDemo } from "@/components/demos/stack";
import { TabsDemo } from "@/components/demos/tabs";

const demos = {
  "little-guy": LittleGuyDemo,
  dock: DockDemo,
  magnetic: MagneticDemo,
  hold: HoldDemo,
  copy: CopyDemo,
  tabs: TabsDemo,
  stack: StackDemo,
  scramble: ScrambleDemo,
  spotlight: SpotlightDemo,
} satisfies Record<string, ComponentType>;

export type DemoSlug = keyof typeof demos;

export function isDemoSlug(slug: string): slug is DemoSlug {
  return Object.hasOwn(demos, slug);
}

export function getDemo(slug: string): ComponentType | undefined {
  return isDemoSlug(slug) ? demos[slug] : undefined;
}

export function Demo({ slug }: { slug: string }) {
  if (!isDemoSlug(slug)) return null;
  const Selected = demos[slug];
  return <Selected />;
}
