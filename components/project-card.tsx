import Link from "next/link";
import { ProjectCover } from "@/components/covers";
import { TiltCard } from "@/components/tilt-card";
import { Morph } from "@/components/transitions";
import type { Project } from "@/content/site";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article data-card="" className="w-(--media)">
      <Morph name={`cover-${project.slug}`}>
        <div>
          <TiltCard max={4} className="rounded-3xl max-sm:rounded-2xl">
            <Link
              href={`/work/${project.slug}`}
              aria-label={`${project.title} case study`}
              transitionTypes={["nav-forward"]}
              className="relative block aspect-square overflow-hidden rounded-3xl max-sm:rounded-2xl bg-surface"
            >
              <ProjectCover slug={project.slug} />
            </Link>
          </TiltCard>
        </div>
      </Morph>
      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-medium">{project.title}</h2>
          <span className="text-meta text-muted tabular-nums">{project.year}</span>
        </div>
        <p className="mt-1 text-pretty">{project.tagline}</p>
        <p className="mt-1 text-meta text-muted">{project.stack.join(", ")}</p>
      </div>
    </article>
  );
}
