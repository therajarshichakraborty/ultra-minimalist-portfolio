import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { BrandIcon } from "@/components/brand-icon";
import { Chip } from "@/components/chip";
import { PageHeader } from "@/components/page-header";
import { revealDelay } from "@/components/reveal";
import { PageTransition } from "@/components/transitions";
import { experience, experienceIntro } from "@/content/site";

export const metadata: Metadata = {
  title: "Experience",
  description: `${experienceIntro.heading} ${experienceIntro.text}`,
};

const logos: Record<string, string> = {
  TypeScript: "typescript",
  "Next.js": "nextdotjs",
  "React Native": "react",
  Expo: "expo",
  "Node.js": "nodedotjs",
  Express: "express",
  PostgreSQL: "postgresql",
  Docker: "docker",
  Kubernetes: "kubernetes",
  Git: "git",
  Python: "python",
  PyTorch: "pytorch",
  NumPy: "numpy",
  Pandas: "pandas",
  "Scikit-Learn": "scikitlearn",
};

const figure = /(\d[\d,.]*\+?%?)/g;

function Emphasis({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(figure)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    parts.push(
      <span key={index} className="font-medium text-ink tabular-nums">
        {match[0]}
      </span>,
    );
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

function Stack({ skills }: { skills: string[] }) {
  const tools = skills.filter((skill) => logos[skill]);
  if (!tools.length) return null;

  return (
    <ul className="tool-row mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
      {tools.map((skill, index) => (
        <li
          key={skill}
          role="img"
          aria-label={skill}
          tabIndex={0}
          data-name={skill}
          className="tool"
          style={{ "--i": index } as CSSProperties}
        >
          <BrandIcon slug={logos[skill]} className="tool-icon size-[18px]" />
        </li>
      ))}
    </ul>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="inline-block size-3.5 align-[-2px]"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function ExperiencePage() {
  return (
    <PageTransition>
      <main className="column py-[clamp(48px,10svh,112px)]">
        <PageHeader title="Experience" meta={`${experience.length} roles`}>
          <span className="block text-[28px] leading-[1.15] font-medium tracking-[-0.03em] text-balance sm:text-[34px]">
            {experienceIntro.heading}
          </span>
          <span className="mt-4 block text-pretty text-muted">{experienceIntro.text}</span>
        </PageHeader>

        <ol className="mt-12">
          {experience.map((item, index) => (
            <li
              key={`${item.company}-${item.role}`}
              className="reveal timeline relative grid grid-cols-[32px_1fr] gap-x-4 pb-14 last:pb-0"
              style={revealDelay(180 + index * 80)}
            >
              <span
                aria-hidden="true"
                className="timeline-mark relative z-1 grid size-8 place-items-center rounded-full bg-bg font-medium ring-1 ring-line"
              >
                {item.company.charAt(0).toUpperCase()}
              </span>
              <article className="min-w-0 pt-1">
                <header>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <h2 className="font-medium text-pretty">{item.role}</h2>
                    <span className="flex items-center gap-1.5 text-meta text-muted tabular-nums">
                      {item.current ? (
                        <>
                          <span className="live-dot" aria-hidden="true" />
                          <span className="sr-only">Current role, </span>
                        </>
                      ) : null}
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-0.5 text-muted">
                    <span className="text-ink">{item.company}</span>
                    <span className="mx-1.5" aria-hidden="true">
                      ·
                    </span>
                    <PinIcon /> {item.location}
                  </p>
                </header>

                <p className="mt-3 text-pretty">{item.summary}</p>

                <ul className="mt-3 grid gap-2">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-muted">
                      <span aria-hidden="true" className="mt-[10px] h-px w-2.5 shrink-0 bg-faint" />
                      <span className="text-pretty">
                        <Emphasis text={highlight} />
                      </span>
                    </li>
                  ))}
                </ul>

                <Stack skills={item.skills} />
              </article>
            </li>
          ))}
        </ol>

        <footer className="reveal mt-16 border-t border-line pt-8" style={revealDelay(520)}>
          <p className="text-pretty">
            Looking for the academic side? See my{" "}
            <span className="whitespace-nowrap">
              <Chip href="/education">education</Chip>,
            </span>{" "}
            or <Chip href="/contact">get in touch</Chip> about what we could build next.
          </p>
        </footer>
      </main>
    </PageTransition>
  );
}
