import Image from "next/image";
import type { ComponentType } from "react";
import { KitCover } from "@/components/covers/kit";
import { RelayCover } from "@/components/covers/relay";
import { TideCover } from "@/components/covers/tide";
import { getProject } from "@/content/site";
import { cn } from "@/lib/utils";

const covers: Record<string, ComponentType> = {
  relay: RelayCover,
  kit: KitCover,
  tide: TideCover,
};

type ProjectCoverProps = {
  slug: string;
  className?: string;
};

export function ProjectCover({ slug, className }: ProjectCoverProps) {
  const project = getProject(slug);

  if (project?.image) {
    return (
      <Image
        src={project.image.src}
        alt={project.image.alt}
        fill
        sizes="(max-width: 600px) 100vw, 520px"
        className={cn("object-cover", className)}
      />
    );
  }

  const Cover = covers[slug];

  return (
    <div aria-hidden="true" className={cn("absolute inset-0", className)}>
      {Cover ? (
        <Cover />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-meta text-muted">{project?.title ?? slug}</div>
      )}
    </div>
  );
}
