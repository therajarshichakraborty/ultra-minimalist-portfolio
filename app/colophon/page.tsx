import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { BrandIcon } from "@/components/brand-icon";
import { PageHeader } from "@/components/page-header";
import { revealDelay } from "@/components/reveal";
import { PageTransition } from "@/components/transitions";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "colophon",
  description: `how ${site.name}'s site is made: type, color, motion, and the stack behind it.`,
};

const swatches = [
  { name: "ink", value: "var(--ink)" },
  { name: "muted", value: "var(--muted)" },
  { name: "faint", value: "var(--faint)" },
  { name: "chip", value: "var(--chip)" },
  { name: "surface", value: "var(--surface)" },
  { name: "paper", value: "var(--bg)" },
];

const curves = [
  { name: "ease out quint", detail: "enters, 320ms", curve: "var(--ease-out-quint)" },
  { name: "ease snap", detail: "presses, 200ms", curve: "var(--ease-snap)" },
  { name: "linear", detail: "progress, 1200ms", curve: "linear" },
];

const stack = [
  { name: "next.js 16", slug: "nextdotjs" },
  { name: "react 19", slug: "react" },
  { name: "typescript", slug: "typescript" },
  { name: "tailwind css 4", slug: "tailwindcss" },
  { name: "motion", slug: "framer" },
  { name: "mdx", slug: "mdx" },
  { name: "kibo ui", slug: "shadcnui" },
  { name: "simple icons", slug: "simpleicons" },
  { name: "pnpm", slug: "pnpm" },
];

const principles = [
  "one column, fifteen pixels, nothing extra.",
  "color only where data lives.",
  "motion should explain something.",
];

function Tile({ label, className, delay, children }: { label: string; className?: string; delay: number; children: ReactNode }) {
  return (
    <section
      aria-label={label}
      className={cn("bento reveal relative overflow-hidden rounded-3xl bg-bg p-5 shadow-media ring-1 ring-line max-sm:rounded-2xl", className)}
      style={revealDelay(delay)}
    >
      <p className="text-meta text-muted">{label}</p>
      {children}
    </section>
  );
}

export default function ColophonPage() {
  return (
    <PageTransition>
      <main className="mx-auto w-[min(760px,calc(100%-2*var(--gutter)))] py-[clamp(48px,10svh,112px)] sm:w-[min(760px,calc(100%-128px))]">
        <PageHeader title="colophon" meta="how this site is made">
          <span className="block max-w-[520px]">every detail here is deliberate. this is what the site is made of, and the few rules it follows.</span>
        </PageHeader>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-6">
          <Tile label="typeface" className="sm:col-span-4" delay={140}>
            <div className="mt-4 flex items-end gap-6 max-sm:flex-col max-sm:items-start max-sm:gap-3">
              <span aria-hidden="true" className="text-[88px] leading-[0.8] font-medium tracking-[-0.06em]">
                Aa
              </span>
              <div className="min-w-0 pb-1">
                <p className="font-medium">inter</p>
                <p className="mt-1 flex gap-3 text-muted">
                  <span className="font-normal">regular</span>
                  <span className="font-medium text-ink">medium</span>
                  <span className="font-semibold">semibold</span>
                </p>
                <p className="mt-1 text-pretty text-muted">set at 15px with a 1.65 line height and a touch of negative tracking.</p>
              </div>
            </div>
          </Tile>

          <Tile label="signature" className="flex flex-col sm:col-span-2" delay={180}>
            <p aria-hidden="true" className="my-auto -rotate-6 py-4 text-center font-script text-[52px] leading-none">
              {site.signature}
            </p>
            <p className="text-meta text-muted">mrs saint delafield, written on hover</p>
          </Tile>

          <Tile label="mono" className="sm:col-span-2" delay={220}>
            <p className="mt-4 font-mono text-[22px] tracking-normal tabular-nums">0123456789</p>
            <p className="mt-2 font-mono text-meta tracking-normal text-muted">geist mono, for numbers that line up</p>
          </Tile>

          <Tile label="color" className="sm:col-span-4" delay={260}>
            <ul className="mt-4 grid grid-cols-6 gap-2 max-sm:grid-cols-3 max-sm:gap-y-4">
              {swatches.map((swatch) => (
                <li key={swatch.name} className="flex flex-col items-center gap-2">
                  <span aria-hidden="true" className="size-9 rounded-full ring-1 ring-line" style={{ background: swatch.value }} />
                  <span className="text-meta text-muted">{swatch.name}</span>
                </li>
              ))}
            </ul>
            <div aria-hidden="true" className="mt-5 flex h-2.5 gap-0.5 overflow-hidden rounded-full">
              {[0, 1, 2, 3, 4].map((level) => (
                <span key={level} className="h-full flex-1" style={{ background: `var(--heat-${level})` }} />
              ))}
            </div>
            <p className="mt-2 text-meta text-muted">violet is reserved for activity data. everything else is ink on paper.</p>
          </Tile>

          <Tile label="motion" className="flex flex-col sm:col-span-3" delay={300}>
            <ul className="mt-4 grid flex-1 content-around gap-4">
              {curves.map((item) => (
                <li key={item.name}>
                  <div className="flex items-baseline justify-between gap-3 text-meta">
                    <span>{item.name}</span>
                    <span className="text-muted">{item.detail}</span>
                  </div>
                  <span aria-hidden="true" className="curve-track mt-2 block">
                    <span className="curve-dot" style={{ "--curve": item.curve } as CSSProperties} />
                  </span>
                </li>
              ))}
            </ul>
          </Tile>

          <Tile label="stack" className="sm:col-span-3" delay={340}>
            <ul className="mt-4 grid grid-cols-3 gap-x-3 gap-y-4">
              {stack.map((item) => (
                <li key={item.name} className="flex flex-col items-start gap-2">
                  <span className="grid size-9 place-items-center rounded-xl bg-surface ring-1 ring-line">
                    <BrandIcon slug={item.slug} className="size-4" />
                  </span>
                  <span className="text-meta">{item.name}</span>
                </li>
              ))}
            </ul>
          </Tile>

          <Tile label="principles" className="sm:col-span-6" delay={380}>
            <ol className="mt-4 grid gap-4 sm:grid-cols-3 sm:gap-6">
              {principles.map((principle, index) => (
                <li key={principle} className="flex gap-3">
                  <span className="font-mono text-meta tracking-normal text-muted tabular-nums">0{index + 1}</span>
                  <span className="text-pretty">{principle}</span>
                </li>
              ))}
            </ol>
          </Tile>
        </div>

        <p className="reveal mt-10 text-center text-meta text-muted" style={revealDelay(420)}>
          designed and built by {site.name} in {site.location}.
        </p>
      </main>
    </PageTransition>
  );
}
