import Image from "next/image";
import { getProject } from "@/content/site";
import { cn } from "@/lib/utils";

type ProjectCoverProps = {
  slug: string;
  className?: string;
};

export function ProjectCover({ slug, className }: ProjectCoverProps) {
  const project = getProject(slug);
  if (!project) return null;

  return (
    <div className={cn("absolute inset-0 grid place-items-center", className)}>
      <div className="browser-cover w-[84%] overflow-hidden rounded-[10px] bg-bg shadow-lift ring-1 ring-line">
        <div aria-hidden="true" className="flex h-[7%] min-h-3 items-center gap-[1.2%] border-b border-line px-[3%]">
          <span className="aspect-square h-[34%] rounded-full bg-[#ff5f57]" />
          <span className="aspect-square h-[34%] rounded-full bg-[#febc2e]" />
          <span className="aspect-square h-[34%] rounded-full bg-[#28c840]" />
        </div>
        <div className="relative aspect-[16/10]">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(max-width: 600px) 90vw, 440px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
