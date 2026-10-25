import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ActivityChart } from "@/components/activity-chart";
import { ContributionCalendar } from "@/components/contribution-calendar";
import { ArrowUpRightIcon, GithubIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { ScrollEnd } from "@/components/scroll-end";
import { revealDelay } from "@/components/reveal";
import { PageTransition } from "@/components/transitions";
import { site } from "@/content/site";
import { getGithubActivity, getLeetcodeActivity } from "@/lib/activity";

export const metadata: Metadata = {
  title: "activity",
  description: `github contributions and leetcode practice of ${site.name}, updated every hour.`,
};

const number = new Intl.NumberFormat("en-US");

function Block({ delay, children }: { delay: number; children: ReactNode }) {
  return (
    <section className="reveal mt-16 first-of-type:mt-12" style={revealDelay(delay)}>
      {children}
    </section>
  );
}

function Unavailable({ what }: { what: string }) {
  return (
    <p className="rounded-lg bg-surface px-4 py-8 text-center text-muted ring-1 ring-line">
      {what} is taking a break right now. it will be back on the next refresh.
    </p>
  );
}

function Stat({ icon, value, label, detail }: { icon: ReactNode; value: string; label: string; detail: string }) {
  return (
    <div className="stat flex items-start gap-3.5 rounded-lg px-3 py-3">
      <span className="mt-1.5 shrink-0">{icon}</span>
      <span>
        <span className="block text-[26px] leading-tight font-semibold tracking-[-0.03em] tabular-nums">{value}</span>
        <span className="block font-medium">{label}</span>
        <span className="block text-meta text-muted">{detail}</span>
      </span>
    </div>
  );
}

const stroke = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;

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
      <main className="mx-auto w-[min(760px,calc(100%-2*var(--gutter)))] py-[clamp(48px,10svh,112px)]">
        <div className="max-w-[520px]">
          <PageHeader title="activity" meta="updated hourly">
            {site.pages.activity}
          </PageHeader>
        </div>

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
            <header className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <h2 className="flex items-center gap-2">
                <svg {...stroke} aria-hidden="true" className="size-4 text-[#f43f5e]">
                  <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
                </svg>
                <span className="font-medium">activity graph</span>
                <span className="badge badge-pink">last 31 days</span>
              </h2>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1 text-meta text-muted tabular-nums transition-colors hover:text-ink focus-visible:text-ink"
              >
                {number.format(recent)} contributions
                <ArrowUpRightIcon className="size-3 transition-transform duration-200 ease-snap group-hover:-translate-y-px group-hover:translate-x-px" />
              </a>
            </header>
            <ScrollEnd>
              <ActivityChart days={current.days} />
            </ScrollEnd>
          </Block>
        ) : null}

        {github ? (
          <div className="reveal mt-10 grid grid-cols-1 gap-2 sm:grid-cols-3" style={revealDelay(260)}>
            <Stat
              icon={
                <svg {...stroke} aria-hidden="true" className="size-6 text-[#f97316]">
                  <circle cx="18" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                  <path d="M6 9v12" />
                </svg>
              }
              value={number.format(github.total)}
              label="total contributions"
              detail="in the last 12 months"
            />
            <Stat
              icon={
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 text-ink" fill="currentColor">
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z" />
                </svg>
              }
              value={github.stars === null ? "n/a" : number.format(github.stars)}
              label="total stars"
              detail="github stars"
            />
            <Stat
              icon={
                <svg {...stroke} aria-hidden="true" className="size-6 text-[#3b82f6]">
                  <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                  <circle cx="12" cy="13" r="2" />
                  <path d="M14 13h3M7 13h3" />
                </svg>
              }
              value={github.repos === null ? "n/a" : number.format(github.repos)}
              label="total repos"
              detail="repositories"
            />
          </div>
        ) : null}

        <Block delay={300}>
          <header className="mb-5 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 text-[#ffa116]" fill="currentColor">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
            <h2 className="font-medium">leetcode</h2>
            {leetcode?.ranking ? <span className="badge badge-violet tabular-nums">rank {number.format(leetcode.ranking)}</span> : null}
          </header>
          {leetcode?.calendars.length ? (
            <>
              <ContributionCalendar
                calendars={leetcode.calendars}
                variant="leetcode"
                unit="submission"
                handle={`@${site.profiles.leetcode}`}
                href={leetcodeUrl}
              />
              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
                {leetcode.solved.map((item) => (
                  <div key={item.difficulty}>
                    <p className="flex items-center gap-1.5 text-meta text-muted">
                      <span aria-hidden="true" data-difficulty={item.difficulty} className="difficulty-dot size-1.5 rounded-full" />
                      {item.difficulty === "all" ? "solved" : item.difficulty}
                    </p>
                    <p className="mt-1 text-[22px] leading-tight font-semibold tracking-[-0.02em] tabular-nums">
                      {number.format(item.count)}
                      {item.total ? <span className="text-meta font-normal tracking-normal text-muted"> / {number.format(item.total)}</span> : null}
                    </p>
                    <span aria-hidden="true" className="mt-2.5 block h-0.5 overflow-hidden rounded-full bg-chip">
                      <span
                        data-difficulty={item.difficulty}
                        className="difficulty-bar block h-full rounded-full"
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
