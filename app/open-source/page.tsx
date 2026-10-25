import type { Metadata } from "next";
import { ArrowUpRightIcon } from "@/components/icons";
import { HoverList } from "@/components/hover-list";
import { PageHeader } from "@/components/page-header";
import { revealDelay } from "@/components/reveal";
import { PageTransition } from "@/components/transitions";
import { contributionCount, openSource, site } from "@/content/site";

export const metadata: Metadata = {
  title: "open source",
  description: `open source contributions by ${site.name}: ${site.pages.openSource}`,
};

export default function OpenSourcePage() {
  return (
    <PageTransition>
      <main className="column py-[clamp(48px,10svh,112px)]">
        <PageHeader title="open source" meta={`${contributionCount} merged prs`}>
          {site.pages.openSource}
        </PageHeader>
        <div className="mt-10 grid gap-8">
          {openSource.map((project, position) => (
            <section key={project.repo} className="reveal" style={revealDelay(180 + position * 50)}>
              <h2 className="flex items-baseline justify-between gap-4 px-2">
                <span className="font-medium">{project.name}</span>
                <span className="text-meta text-muted">{project.repo}</span>
              </h2>
              <HoverList className="mt-1.5 grid gap-0.5">
                {project.contributions.map((item) => (
                    <a
                      key={item.number}
                      href={`https://github.com/${project.repo}/pull/${item.number}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group grid min-h-11 grid-cols-[52px_1fr_14px] items-baseline gap-x-2 rounded-lg px-2 py-2"
                    >
                      <span className="font-mono text-meta text-muted tabular-nums">#{item.number}</span>
                      <span>
                        <span className="block text-pretty">{item.title}</span>
                        <span className="block text-pretty text-muted">{item.summary}</span>
                      </span>
                      <ArrowUpRightIcon className="size-3.5 self-center text-muted opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100" />
                      <span className="sr-only">, opens pull request on github</span>
                    </a>
                ))}
              </HoverList>
            </section>
          ))}
        </div>
      </main>
    </PageTransition>
  );
}
