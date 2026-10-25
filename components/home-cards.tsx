import Link from "next/link";
import type { ReactNode } from "react";
import { ProjectCover } from "@/components/covers";
import { LittleGuy, littleGuySurface } from "@/components/little-guy";
import { revealDelay } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import { Morph } from "@/components/transitions";
import { projects } from "@/content/site";
import { cn } from "@/lib/utils";

type TileProps = {
  href: string;
  label: string;
  morph: string;
  surface: string;
  delay: number;
  children: ReactNode;
};

function Tile({ href, label, morph, surface, delay, children }: TileProps) {
  return (
    <div className="reveal group relative pb-[30px]" style={revealDelay(delay)}>
      <Morph name={morph}>
        <div>
          <TiltCard className="rounded-3xl max-sm:rounded-2xl">
            <Link
              href={href}
              aria-label={`explore ${label}`}
              transitionTypes={["nav-forward"]}
              className={cn("relative block aspect-square overflow-hidden rounded-3xl max-sm:rounded-2xl", surface)}
            >
              {children}
            </Link>
          </TiltCard>
        </div>
      </Morph>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[calc(100%-20px)] left-0 leading-[1.5] tracking-[-0.015em] text-faint transition-colors duration-150 group-hover:text-ink group-has-[:focus-visible]:text-ink"
      >
        {label}
      </span>
    </div>
  );
}

export function HomeCards() {
  const featured = projects[0];

  return (
    <div className="mt-10 grid grid-cols-2 gap-4 max-sm:gap-3">
      <Tile href="/interactions" label="interactions" morph="cover-interactions" surface={littleGuySurface} delay={520}>
        <LittleGuy />
      </Tile>
      {featured ? (
        <Tile href="/work" label="work" morph={`cover-${featured.slug}`} surface="bg-surface" delay={600}>
          <ProjectCover slug={featured.slug} />
        </Tile>
      ) : null}
    </div>
  );
}
