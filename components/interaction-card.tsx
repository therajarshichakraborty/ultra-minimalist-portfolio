import { Demo } from "@/components/demos";
import { littleGuySurface } from "@/components/little-guy";
import { Morph } from "@/components/transitions";
import type { Interaction } from "@/content/interactions";
import { formatMonth } from "@/lib/format";
import { cn } from "@/lib/utils";

type InteractionCardProps = {
  interaction: Interaction;
  morph?: string;
};

export function InteractionCard({ interaction, morph }: InteractionCardProps) {
  const { slug, title, date, description } = interaction;

  const media = (
    <div
      className={cn(
        "relative isolate aspect-square w-full overflow-hidden rounded",
        slug === "little-guy" ? littleGuySurface : "bg-surface",
      )}
    >
      <Demo slug={slug} />
    </div>
  );

  return (
    <article aria-labelledby={`${slug}-title`} className="w-(--media)">
      {morph ? <Morph name={morph}>{media}</Morph> : media}
      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id={`${slug}-title`}>{title}</h2>
          <time dateTime={date} className="shrink-0 text-meta text-muted tabular-nums">
            {formatMonth(date)}
          </time>
        </div>
        <p className="mt-1 text-pretty text-muted">{description}</p>
      </div>
    </article>
  );
}
