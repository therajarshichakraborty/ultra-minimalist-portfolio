import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ActivityChart } from "@/components/activity-chart";
import { ContributionCalendar } from "@/components/contribution-calendar";
import { ArrowUpRightIcon, GithubIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { revealDelay } from "@/components/reveal";
import { ScrollEnd } from "@/components/scroll-end";
import { PageTransition } from "@/components/transitions";
import { site } from "@/content/site";
import { getGithubActivity, getLeetcodeActivity } from "@/lib/activity";

export const metadata: Metadata = {
  title: "activity",
  description: `github contributions and leetcode practice of ${site.name}, updated every hour.`,
};

const number = new Intl.NumberFormat("en-US");

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function LeetcodeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

function Block({ delay, children }: { delay: number; children: ReactNode }) {
  return (
    <section className="reveal mt-16 first-of-type:mt-12 max-sm:mt-12" style={revealDelay(delay)}>
      {children}
    </section>
  );
}

function Heading({
  icon,
  title,
  pill,
  aside,
}: {
  icon: ReactNode;
  title: string;
  pill?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <h2 className="flex items-center gap-2">
        <span className="text-ink [&>svg]:size-4">{icon}</span>
        <span className="font-medium">{title}</span>
        {pill ? <span className="badge tabular-nums">{pill}</span> : null}
      </h2>
      {aside}
    </header>
  );
}

function Outbound({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-1 text-meta text-muted tabular-nums transition-colors hover:text-ink focus-visible:text-ink"
    >
      {children}
      <ArrowUpRightIcon className="size-3 transition-transform duration-200 ease-snap group-hover:translate-x-px group-hover:-translate-y-px" />
    </a>
  );
}

function Unavailable({ what }: { what: string }) {
  return (
    <p className="rounded-lg px-4 py-8 text-center text-muted ring-1 ring-line ring-inset">
      {what} is taking a break right now. it will be back in a minute.
    </p>
  );
}

function Figure({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="min-w-0">
      <p className="text-meta text-muted">{label}</p>
      <p className="mt-1 text-[24px] leading-none font-semibold tracking-[-0.03em] tabular-nums max-sm:text-[20px]">
        {value}
      </p>
      {detail ? <p className="mt-1.5 truncate text-meta text-muted">{detail}</p> : null}
    </div>
  );
}

export default async function ActivityPage() {
  const [github, leetcode] = await Promise.all([
    getGithubActivity(site.profiles.github),
    getLeetcodeActivity(site.profiles.leetcode),
  ]);

  const githubUrl = `https://github.com/${site.profiles.github}`;
  const leetcodeUrl = `https://leetcode.com/u/${site.profiles.leetcode}/`;
  const current = github?.calendars[0];
  const recent = current?.days.slice(-31).reduce((sum, day) => sum + day.count, 0) ?? 0;

  return (
    <PageTransition>
      <main className="mx-auto w-[min(760px,calc(100%-2*var(--gutter)))] py-[clamp(48px,10svh,112px)] sm:w-[min(760px,calc(100%-128px))]">
        <PageHeader title="activity" meta="updated hourly">
          <span className="block max-w-[520px]">{site.pages.activity}</span>
        </PageHeader>

        <Block delay={160}>
          {github?.calendars.length ? (
            <ContributionCalendar
              calendars={github.calendars}
              variant="github"
              unit="contribution"
              title="contribution calendar"
              icon={<GithubIcon className="size-4" />}
              handle={`@${site.profiles.github}`}
              href={githubUrl}
            />
          ) : (
            <Unavailable what="github" />
          )}
        </Block>

        {current?.days.length ? (
          <Block delay={220}>
            <Heading
              title="activity graph"
              pill="last 31 days"
              icon={
                <svg {...stroke} aria-hidden="true">
                  <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
                </svg>
              }
              aside={<Outbound href={githubUrl}>{number.format(recent)} contributions</Outbound>}
            />
            <ScrollEnd>
              <ActivityChart days={current.days} />
            </ScrollEnd>
          </Block>
        ) : null}

        {github ? (
          <div
            className="reveal mt-10 grid grid-cols-3 gap-6 border-y border-line py-6 max-sm:gap-4"
            style={revealDelay(260)}
          >
            <Figure label="contributions" value={number.format(github.total)} detail="last 12 months" />
            <Figure
              label="stars"
              value={github.stars === null ? "n/a" : number.format(github.stars)}
              detail="across repositories"
            />
            <Figure
              label="repositories"
              value={github.repos === null ? "n/a" : number.format(github.repos)}
              detail="public on github"
            />
          </div>
        ) : null}

        <Block delay={300}>
          <Heading
            title="leetcode"
            icon={<LeetcodeIcon />}
            pill={leetcode?.ranking ? `rank ${number.format(leetcode.ranking)}` : undefined}
          />
          {leetcode?.calendars.length ? (
            <>
              <ContributionCalendar
                calendars={leetcode.calendars}
                variant="leetcode"
                unit="submission"
                handle={`@${site.profiles.leetcode}`}
                href={leetcodeUrl}
              />
              <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-6 sm:grid-cols-4">
                {leetcode.solved.map((item) => (
                  <div key={item.difficulty}>
                    <p className="text-meta text-muted">{item.difficulty === "all" ? "solved" : item.difficulty}</p>
                    <p className="mt-1 text-[24px] leading-none font-semibold tracking-[-0.03em] tabular-nums max-sm:text-[20px]">
                      {number.format(item.count)}
                      {item.total ? (
                        <span className="text-meta font-normal tracking-normal text-muted">
                          {" "}
                          / {number.format(item.total)}
                        </span>
                      ) : null}
                    </p>
                    <span aria-hidden="true" className="mt-3 block h-0.5 overflow-hidden rounded-full bg-chip">
                      <span
                        className="difficulty-bar block h-full rounded-full bg-ink"
                        style={{ width: `${item.total ? Math.max(2, (item.count / item.total) * 100) : 0}%` }}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Unavailable what="leetcode" />
          )}
        </Block>
      </main>
    </PageTransition>
  );
}
