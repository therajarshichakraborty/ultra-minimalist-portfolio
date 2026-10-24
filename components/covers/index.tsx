import { cn } from "@/lib/utils";

type ProjectCoverProps = {
  slug: string;
  className?: string;
};

export function ProjectCover({ slug, className }: ProjectCoverProps) {
  return (
    <div className={cn("absolute inset-0 grid place-items-center text-meta text-muted", className)}>{slug}</div>
  );
}
