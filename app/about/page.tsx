import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { Chip } from "@/components/chip";
import { PageHeader } from "@/components/page-header";
import { ResumeChip } from "@/components/resume/resume-chip";
import { revealDelay } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import { PageTransition } from "@/components/transitions";
import { about, site } from "@/content/site";
import { getGithubActivity } from "@/lib/activity";

export const metadata: Metadata = {
  title: "about",
  description: `${about.greeting} ${about.story[0]}`,
};

const colors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  "Jupyter Notebook": "#da5b0b",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#663399",
  Go: "#00add8",
  Rust: "#dea584",
  "C++": "#f34b7d",
  C: "#555555",
  Shell: "#89e051",
  Kotlin: "#a97bff",
  Swift: "#f05138",
  Dart: "#00b4ab",
};

const color = (language: string | null) => (language ? (colors[language] ?? "#8b5cf6") : "#8b5cf6");

function Section({ title, aside, delay, children }: { title: string; aside?: ReactNode; delay: number; children: ReactNode }) {
  return (
    <section className="reveal mt-14" style={revealDelay(delay)}>
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="font-medium">{title}</h2>
        {aside ? <span className="text-meta text-muted">{aside}</span> : null}
      </div>
      {children}
    </section>
  );
}

export default async function AboutPage() {
  const github = await getGithubActivity(site.profiles.github);
  const languages = github?.languages ?? [];
  const total = languages.reduce((sum, language) => sum + language.count, 0);

  return (
    <PageTransition>
      <main className="column py-[clamp(48px,10svh,112px)]">
        <PageHeader title="about" meta={site.location}>
          {site.pages.about}
        </PageHeader>

        <section className="reveal mt-10 flex items-center gap-5" style={revealDelay(140)}>
          <div className="group shrink-0">
            <TiltCard max={10} className="rounded-2xl">
              <div className="relative size-[104px] overflow-hidden rounded-2xl bg-surface shadow-media ring-1 ring-line">
                <Image
                  src={about.photo}
                  alt={`portrait of ${site.name}`}
                  fill
                  sizes="104px"
                  priority
                  className="object-cover grayscale transition-[filter,transform] duration-700 ease-out-quint group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
            </TiltCard>
          </div>
          <div className="min-w-0">
            <p className="text-[22px] leading-tight font-medium tracking-[-0.02em]">{about.greeting}</p>
            <p className="mt-1 text-muted">
              {site.role} · {site.location}
            </p>
            <p aria-hidden="true" className="mt-1.5 -rotate-3 font-script text-[30px] leading-none">
              {site.signature}
            </p>
          </div>
        </section>

        <div className="reveal mt-10 grid gap-6" style={revealDelay(200)}>
          {about.story.map((paragraph) => (
            <p key={paragraph} className="text-pretty">
              {paragraph}
            </p>
          ))}
        </div>

        <Section
          title="now"
          delay={260}
          aside={
            <span className="inline-flex items-center gap-1.5">
              <span className="live-dot" aria-hidden="true" />
              currently
            </span>
          }
        >
          <ul className="grid gap-2.5">
            {about.now.map((item) => (
              <li key={item} className="flex items-baseline gap-3">
                <span aria-hidden="true" className="size-1 shrink-0 translate-y-[-3px] rounded-full bg-faint" />
                <span className="text-pretty">{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        {languages.length ? (
          <Section title="languages i ship in" aside={`across ${total} repositories`} delay={300}>
            <div aria-hidden="true" className="flex h-2 gap-0.5 overflow-hidden rounded-full">
              {languages.map((language) => (
                <span
                  key={language.name}
                  className="language-bar h-full first:rounded-l-full last:rounded-r-full"
                  style={{ width: `${(language.count / total) * 100}%`, background: color(language.name) }}
                />
              ))}
            </div>
            <ul className="mt-3.5 flex flex-wrap gap-x-5 gap-y-1.5 text-meta">
              {languages.map((language) => (
                <li key={language.name} className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="size-2 rounded-full" style={{ background: color(language.name) }} />
                  <span className="lowercase">{language.name}</span>
                  <span className="text-muted tabular-nums">{Math.round((language.count / total) * 100)}%</span>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <section className="reveal mt-16 border-t border-line pt-8" style={revealDelay(340)}>
          <p className="text-pretty">
            want to build something together? <Chip href="/contact">say hello</Chip>, read my <ResumeChip />, or see the{" "}
            <Chip href="/activity">code i ship</Chip>.
          </p>
        </section>
      </main>
    </PageTransition>
  );
}
