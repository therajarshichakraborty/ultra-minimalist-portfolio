import { cn } from "@/lib/utils";

export const littleGuySurface = "bg-bg shadow-media ring-1 ring-line";

type LittleGuyProps = {
  className?: string;
  playful?: boolean;
};

export function LittleGuy({ className, playful = false }: LittleGuyProps) {
  return (
    <div className={cn("grid size-full place-items-center text-meta text-muted", className)} data-playful={playful}>
      little guy
    </div>
  );
}
