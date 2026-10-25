import type { Metadata } from "next";
import { ArrowUpRightIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { revealDelay } from "@/components/reveal";
import { PageTransition } from "@/components/transitions";
import { education, site } from "@/content/site";

export const metadata: Metadata = {
  title: "education",
  description: `education of ${site.name}: ${site.pages.education}`,
};

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

export default function EducationPage() {
  return (
    <PageTransition>
      <main className="column py-[clamp(48px,10svh,112px)]">
        <PageHeader title="education" meta={`${education.length} chapters`}>
          {site.pages.education}
        </PageHeader>
        <ol className="mt-10">
          {education.map((item, index) => (
            <li
              key={item.degree}
              className="reveal timeline relative grid grid-cols-[32px_1fr] gap-x-4 pb-12 last:pb-0"
              style={revealDelay(180 + index * 90)}
            >
              <span
                aria-hidden="true"
                className="timeline-mark relative z-1 grid size-8 place-items-center rounded-full bg-bg font-medium ring-1 ring-line"
              >
                {item.mark}
              </span>
              <div className="min-w-0 pt-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                  <h2 className="font-medium text-pretty">{item.degree}</h2>
                  <span className="text-meta text-muted tabular-nums">{item.period}</span>
                </div>
                <p className="mt-0.5 text-muted">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group text-ink transition-colors hover:text-muted"
                    >
                      {item.school}
                      <ArrowUpRightIcon className="ml-0.5 inline-block size-3 align-[-1px] transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px" />
                    </a>
                  ) : (
                    <span className="text-ink">{item.school}</span>
                  )}
                  <span className="mx-1.5" aria-hidden="true">
                    ·
                  </span>
                  <PinIcon /> {item.location}
                </p>
                <p className="mt-3 flex flex-wrap gap-1.5">
                  {item.grades.map((grade) => (
                    <span key={grade} className="chip tabular-nums">
                      {grade}
                    </span>
                  ))}
                </p>
                <p className="mt-3 text-pretty">{item.highlight}</p>
                <p className="mt-3 text-pretty text-muted">
                  <span className="text-ink">coursework </span>
                  {item.coursework.join(" · ")}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </main>
    </PageTransition>
  );
}
