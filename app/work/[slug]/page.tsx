import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Chip } from "@/components/chip";
import { ProjectCover } from "@/components/covers";
import { ArrowRightIcon, ArrowUpRightIcon, GithubIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { revealDelay } from "@/components/reveal";
import { Morph, PageTransition } from "@/components/transitions";
import { getProject, projects } from "@/content/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

function Outbound({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2 rounded-full bg-bg py-1.5 pr-3.5 pl-3 text-ink shadow-media ring-1 ring-line transition-[transform,box-shadow] duration-300 ease-out-quint hover:-translate-y-0.5 hover:shadow-lift focus-visible:-translate-y-0.5"
    >
      {icon}
      {label}
      <ArrowUpRightIcon className="size-3.5 text-muted transition-transform duration-300 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <PageTransition>
      <main className="column py-[clamp(48px,10svh,112px)]">
        <PageHeader title={project.title} meta={project.year} backHref="/work" backLabel="back to work">
          {project.summary}
        </PageHeader>

        <dl className="reveal mt-7 grid gap-2" style={revealDelay(180)}>
          <div className="grid grid-cols-[72px_1fr] items-baseline gap-4">
            <dt className="text-muted">built with</dt>
            <dd className="text-pretty">{project.stack.join(", ")}</dd>
          </div>
          <div className="grid grid-cols-[72px_1fr] items-baseline gap-4">
            <dt className="text-muted">year</dt>
            <dd>{project.year}</dd>
          </div>
        </dl>

        <div className="reveal mt-6 flex flex-wrap gap-2" style={revealDelay(210)}>
          {project.links.live ? (
            <Outbound
              href={project.links.live}
              label="visit live site"
              icon={<span aria-hidden="true" className="live-dot" />}
            />
          ) : null}
          <Outbound href={project.links.repo} label="view source" icon={<GithubIcon className="size-3.5" />} />
        </div>

        <div className="reveal mt-10" style={revealDelay(240)}>
          <Morph name={`cover-${project.slug}`}>
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-surface max-sm:rounded-2xl">
              <ProjectCover slug={project.slug} />
            </div>
          </Morph>
        </div>

        {project.sections?.length ? (
          <div className="mt-12 grid gap-10">
            {project.sections.map((section, position) => (
              <section key={section.heading} className="reveal" style={revealDelay(300 + position * 60)}>
                <h2 className="font-medium">{section.heading}</h2>
                <div className="mt-3 grid gap-6">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-pretty">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : null}

        {next && next.slug !== project.slug ? (
          <footer className="mt-16 flex justify-end border-t border-line pt-6">
            <Chip href={`/work/${next.slug}`}>
              next: {next.title}
              <ArrowRightIcon className="ml-1 inline-block size-3.5 align-[-2px]" />
            </Chip>
          </footer>
        ) : null}
      </main>
    </PageTransition>
  );
}
