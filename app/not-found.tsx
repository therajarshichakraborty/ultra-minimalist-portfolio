import { Chip } from "@/components/chip";
import { ArrowLeftIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { PageTransition } from "@/components/transitions";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <PageTransition>
      <main className="column flex min-h-svh flex-col justify-center py-[clamp(48px,6svh,56px)]">
        <p className="font-medium">
          <Reveal>{site.name}</Reveal>
        </p>
        <p className="mt-8 text-meta text-muted">
          <Reveal delay={60}>404</Reveal>
        </p>
        <h1 className="mt-1">
          <Reveal delay={100}>This page wandered off.</Reveal>
        </h1>
        <p className="text-muted">
          <Reveal delay={160}>It may have moved, or it never existed.</Reveal>
        </p>
        <p className="mt-6 flex flex-wrap gap-3">
          <Reveal delay={240}>
            <Chip href="/" direction="back">
              <ArrowLeftIcon className="mr-1 inline-block size-3.5 align-[-2px]" />
              Back home
            </Chip>{" "}
            <Chip href="/work">See the work</Chip>
          </Reveal>
        </p>
      </main>
    </PageTransition>
  );
}
