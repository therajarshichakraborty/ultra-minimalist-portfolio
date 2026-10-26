import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Chip } from "@/components/chip";
import { ArrowRightIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { PublicationEntry } from "@/components/publication-entry";
import { ResumeChip } from "@/components/resume/resume-chip";
import { revealDelay } from "@/components/reveal";
import { SkillsMarquee } from "@/components/skills-marquee";
import { TiltCard } from "@/components/tilt-card";
import { PageTransition } from "@/components/transitions";
import { about, publications, research, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `${about.greeting} ${site.pages.about}`,
};

const link = /\[([^\]]+)\]\(([^)]+)\)/g;
const whole = /^\[([^\]]+)\]\(([^)]+)\)$/;

function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(link)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    parts.push(
      <Chip key={index} href={match[2]}>
        {match[1]}
      </Chip>,
    );
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

function Paragraph({ text }: { text: string }) {
  const callout = whole.exec(text);
  if (callout) {
    return (
      <p>
        <Link
          href={callout[2]}
          transitionTypes={["nav-forward"]}
          className="callout group inline-flex items-baseline gap-2 text-[17px] leading-snug font-medium tracking-[-0.015em] text-pretty"
        >
          <span className="callout-text">{callout[1]}</span>
          <ArrowRightIcon className="size-4 shrink-0 translate-y-0.5 transition-transform duration-300 ease-out-quint group-hover:translate-x-1" />
        </Link>
      </p>
    );
  }
  return (
    <p className="text-pretty">
      <Inline text={text} />
    </p>
  );
}

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="column py-[clamp(48px,10svh,112px)]">
        <PageHeader title="About" meta={site.location}>
          {site.pages.about}
        </PageHeader>

        <section className="reveal mt-10 flex items-center gap-5" style={revealDelay(140)}>
          <div className="group shrink-0">
            <TiltCard max={10} className="rounded-2xl">
              <div className="relative size-[104px] overflow-hidden rounded-2xl bg-surface shadow-media ring-1 ring-line max-sm:size-[88px]">
                <Image
                  src={about.photo}
                  alt={`Portrait of ${site.name}`}
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

        <div className="reveal story mt-10 grid gap-6" style={revealDelay(200)}>
          {about.story.map((paragraph) => (
            <Paragraph key={paragraph} text={paragraph} />
          ))}
        </div>

        <section className="reveal mt-14" style={revealDelay(260)}>
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 className="font-medium">Now</h2>
            <span className="inline-flex items-center gap-1.5 text-meta text-muted">
              <span className="live-dot" aria-hidden="true" />
              Currently
            </span>
          </div>
          <ul className="grid gap-2.5">
            {about.now.map((item) => (
              <li key={item} className="flex items-baseline gap-3">
                <span aria-hidden="true" className="size-1 shrink-0 translate-y-[-3px] rounded-full bg-faint" />
                <span className="text-pretty">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="research" className="reveal mt-20 scroll-mt-16" style={revealDelay(290)}>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-transparent to-line" />
            <span className="rounded-full bg-ink px-3 py-0.5 text-meta font-medium text-bg tabular-nums">
              {research.eyebrow}
              {publications.length > 1 ? ` · ${publications.length}` : null}
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-linear-to-l from-transparent to-line" />
          </div>
          <h2 className="mt-5 text-center text-[28px] leading-[1.15] font-medium tracking-[-0.03em] text-balance sm:text-[34px]">
            {research.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-110 text-center text-pretty text-muted">{research.intro}</p>
          <ol className="mt-10 divide-y divide-line">
            {publications.map((publication, index) => (
              <li key={publication.title} className="py-10 first:pt-0 last:pb-0">
                <PublicationEntry publication={publication} number={publications.length > 1 ? index + 1 : undefined} />
              </li>
            ))}
          </ol>
        </section>

        <section className="reveal mt-20" style={revealDelay(320)}>
          <h2 className="mb-5 text-center text-muted">{about.skillsTitle}</h2>
          <SkillsMarquee rows={about.skills} label={about.skillsTitle} />
        </section>

        <section className="reveal mt-16 border-t border-line pt-8" style={revealDelay(340)}>
          <p className="text-pretty">
            Want to build something together?{" "}
            <span className="whitespace-nowrap">
              <Chip href="/contact">say hello</Chip>,
            </span>{" "}
            read my{" "}
            <span className="whitespace-nowrap">
              <ResumeChip />,
            </span>{" "}
            or see the{" "}
            <span className="whitespace-nowrap">
              <Chip href="/activity">code I ship</Chip>.
            </span>
          </p>
          <p className="mt-3 text-meta text-muted">
            Curious how this site is made? Read the{" "}
            <span className="whitespace-nowrap">
              <Chip href="/colophon">colophon</Chip>.
            </span>
          </p>
        </section>
      </main>
    </PageTransition>
  );
}
