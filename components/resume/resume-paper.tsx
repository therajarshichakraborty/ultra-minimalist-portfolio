import type { ReactNode } from "react";
import { domain, education, experience, projects, publications, resume, site } from "@/content/site";
import { cn } from "@/lib/utils";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-3 border-t border-line pt-5 sm:grid-cols-[112px_1fr] sm:gap-6 print:break-inside-avoid">
      <h3 className="text-meta font-medium tracking-[0.04em] text-muted uppercase">{title}</h3>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

function Row({
  title,
  meta,
  detail,
  children,
}: {
  title: ReactNode;
  meta?: ReactNode;
  detail?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="min-w-0 font-medium text-pretty">{title}</p>
        {meta ? <p className="shrink-0 text-meta whitespace-nowrap text-muted tabular-nums">{meta}</p> : null}
      </div>
      {children ? <p className="text-pretty text-muted">{children}</p> : null}
      {detail ? <p className="mt-0.5 text-meta text-pretty text-faint">{detail}</p> : null}
    </div>
  );
}

export function ResumePaper({ className }: { className?: string }) {
  return (
    <article className={cn("grid gap-5 text-ink", className)}>
      <header className="grid gap-0.5 pb-1">
        <p aria-hidden="true" className="resume-signature w-fit -rotate-3 font-script text-[60px] leading-none">
          {site.signature}
        </p>
        <h2 className="mt-4">
          <span className="font-medium">{site.name}</span>
          <span className="text-muted"> · {site.role}</span>
        </h2>
        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-meta text-muted">
          <span>{site.location}</span>
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
            {site.email}
          </a>
          <a href={site.url} className="transition-colors hover:text-ink">
            {domain()}
          </a>
        </p>
      </header>
      <Section title="Summary">
        <p className="text-pretty">{resume.summary}</p>
      </Section>
      <Section title="Experience">
        {experience.map((item) => (
          <Row key={`${item.company}-${item.period}`} title={`${item.role}, ${item.company}`} meta={item.period}>
            {item.summary}
          </Row>
        ))}
      </Section>
      <Section title="Selected work">
        {projects.map((project) => (
          <Row key={project.slug} title={project.title} meta={project.year} detail={project.stack.join(", ")}>
            {project.tagline}
          </Row>
        ))}
      </Section>
      <Section title="Research">
        {publications.map((publication) => (
          <Row key={publication.title} title={publication.title} meta={publication.date}>
            {publication.venue.name}, {publication.venue.full}
            {publication.venue.note ? ` (${publication.venue.note})` : null}
          </Row>
        ))}
      </Section>
      <Section title="Skills">
        {resume.skills.map((skill) => (
          <Row key={skill.group} title={skill.group}>
            {skill.items}
          </Row>
        ))}
      </Section>
      <Section title="Education">
        {education.map((item) => (
          <Row key={item.degree} title={item.school} meta={item.period}>
            {item.degree}, {item.grades.join(", ")}
          </Row>
        ))}
      </Section>
    </article>
  );
}
