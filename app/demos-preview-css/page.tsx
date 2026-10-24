import { CopyDemo } from "@/components/demos/copy";
import { HoldDemo } from "@/components/demos/hold";
import { ScrambleDemo } from "@/components/demos/scramble";
import { SpotlightDemo } from "@/components/demos/spotlight";

const demos = [
  { name: "hold", Demo: HoldDemo },
  { name: "copy", Demo: CopyDemo },
  { name: "scramble", Demo: ScrambleDemo },
  { name: "spotlight", Demo: SpotlightDemo },
];

export default function DemosPreviewCss() {
  return (
    <main className="mx-auto grid w-fit grid-cols-1 gap-10 px-5 py-12 min-[900px]:grid-cols-2">
      {demos.map(({ name, Demo }) => (
        <section key={name} className="w-[min(400px,calc(100vw-40px))]">
          <div data-demo={name} className="relative aspect-square w-full overflow-hidden rounded bg-surface">
            <Demo />
          </div>
          <p className="mt-2 text-meta text-muted">{name}</p>
        </section>
      ))}
    </main>
  );
}
