import type { ReactNode } from "react";
import { domain, education, experience, projects, resume, site } from "@/content/site";
import { cn } from "@/lib/utils";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-3 border-t border-line pt-5 sm:grid-cols-[104px_1fr] sm:gap-6">
      <h3 className="text-meta text-muted">{title}</h3>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

function Row({ title, meta, children }: { title: ReactNode; meta?: ReactNode; children?: ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p>{title}</p>
        {meta ? <p className="shrink-0 text-meta text-muted tabular-nums">{meta}</p> : null}
      </div>
      {children ? <p className="text-pretty text-muted">{children}</p> : null}
    </div>
  );
}

export function ResumePaper({ className }: { className?: string }) {
  return (
    <article className={cn("grid gap-5 bg-bg text-ink", className)}>
      <header className="grid gap-1 pb-1">
        <h2 className="font-medium">{site.name}</h2>
        <p>{site.role}</p>
        <p className="text-muted">
          {site.location} · {site.email} · {domain()}
        </p>
      </header>
      <Section title="summary">
        <p className="text-pretty">{resume.summary}</p>
      </Section>
      <Section title="selected work">
        {projects.map((project) => (
          <Row key={project.slug} title={project.title} meta={`${project.stack.join(", ")} · ${project.year}`}>
            {project.tagline}
          </Row>
        ))}
      </Section>
      <Section title="experience">
        {experience.map((item) => (
          <Row key={`${item.company}-${item.period}`} title={`${item.role}, ${item.company}`} meta={item.period}>
            {item.summary}
          </Row>
        ))}
      </Section>
      <Section title="skills">
        {resume.skills.map((skill) => (
          <Row key={skill.group} title={skill.group}>
            {skill.items}
          </Row>
        ))}
      </Section>
      <Section title="education">
        {education.map((item) => (
          <Row key={item.degree} title={item.school} meta={item.period}>
            {item.degree}, {item.grades.join(", ")}
          </Row>
        ))}
      </Section>
    </article>
  );
}
