import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ActivityChart } from "@/components/activity-chart";
import { HeatLegend, Heatmap } from "@/components/heatmap";
import { ArrowUpRightIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { revealDelay } from "@/components/reveal";
import { PageTransition } from "@/components/transitions";
import { site } from "@/content/site";
import { getGithubActivity, getLeetcodeActivity } from "@/lib/activity";

export const metadata: Metadata = {
  title: "activity",
  description: `github contributions and leetcode practice of ${site.name}, updated every hour.`,
};

const number = new Intl.NumberFormat("en-US");

function Section({ title, href, handle, meta, delay, children }: { title: string; href: string; handle: string; meta?: ReactNode; delay: number; children: ReactNode }) {
  return (
    <section className="reveal mt-14 first:mt-10" style={revealDelay(delay)}>
      <header className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="flex items-baseline gap-2">
          <span className="font-medium">{title}</span>
          {meta ? <span className="text-meta text-muted tabular-nums">{meta}</span> : null}
        </h2>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1 text-meta text-muted transition-colors hover:text-ink focus-visible:text-ink"
        >
          {handle}
          <ArrowUpRightIcon className="size-3 transition-transform duration-200 ease-snap group-hover:-translate-y-px group-hover:translate-x-px" />
        </a>
      </header>
      {children}
    </section>
  );
}

function Stat({ value, label, detail }: { value: ReactNode; label: string; detail?: string }) {
  return (
    <div className="stat rounded-md bg-surface px-4 py-3.5 ring-1 ring-line">
      <p className="text-[22px] leading-tight font-medium tracking-[-0.02em] tabular-nums">{value}</p>
      <p className="mt-1">{label}</p>
      {detail ? <p className="text-meta text-muted">{detail}</p> : null}
    </div>
  );
}

function Unavailable({ what }: { what: string }) {
  return (
    <p className="rounded-md bg-surface px-4 py-6 text-center text-muted ring-1 ring-line">
      {what} is taking a break right now. it will be back on the next refresh.
    </p>
  );
}

export default async function ActivityPage() {
  const [github, leetcode] = await Promise.all([
    getGithubActivity(site.profiles.github),
    getLeetcodeActivity(site.profiles.leetcode),
  ]);

  const githubUrl = `https://github.com/${site.profiles.github}`;
  const leetcodeUrl = `https://leetcode.com/u/${site.profiles.leetcode}/`;
  const recent = github?.days.slice(-31).reduce((sum, day) => sum + day.count, 0) ?? 0;

  return (
    <PageTransition>
      <main className="column py-[clamp(48px,10svh,112px)]">
        <PageHeader title="activity" meta="updated hourly">
          {site.pages.activity}
        </PageHeader>

        <Section
          title="contribution calendar"
          meta={github ? `${number.format(github.total)} this year` : undefined}
          href={githubUrl}
          handle={`@${site.profiles.github}`}
          delay={160}
        >
          {github?.days.length ? (
            <>
              <Heatmap days={github.days} unit="contribution" label={`${github.total} github contributions in the last year`} />
              <div className="mt-3 flex items-center justify-between gap-4 text-meta text-muted">
                <span className="tabular-nums">{number.format(github.total)} contributions in the last year</span>
                <HeatLegend />
              </div>
            </>
          ) : (
            <Unavailable what="github" />
          )}
        </Section>

        {github?.days.length ? (
          <Section title="activity graph" meta="last 31 days" href={githubUrl} handle={`${number.format(recent)} contributions`} delay={220}>
            <ActivityChart days={github.days} />
          </Section>
        ) : null}

        {github ? (
          <div className="reveal mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3" style={revealDelay(260)}>
            <Stat value={number.format(github.total)} label="contributions" detail="in the last 12 months" />
            <Stat value={github.stars === null ? "n/a" : number.format(github.stars)} label="stars" detail="across my repositories" />
            <Stat value={github.repos === null ? "n/a" : number.format(github.repos)} label="repositories" detail="public on github" />
          </div>
        ) : null}

        <Section
          title="leetcode"
          meta={leetcode ? `${number.format(leetcode.submissions)} submissions this year` : undefined}
          href={leetcodeUrl}
          handle={`@${site.profiles.leetcode}`}
          delay={300}
        >
          {leetcode ? (
            <>
              <div className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-meta text-muted tabular-nums">
                <span>
                  <span className="text-ink">{leetcode.activeDays}</span> active days
                </span>
                <span>
                  <span className="text-ink">{leetcode.streak}</span> day max streak
                </span>
                {leetcode.ranking ? (
                  <span>
                    rank <span className="text-ink">{number.format(leetcode.ranking)}</span>
                  </span>
                ) : null}
              </div>
              <Heatmap days={leetcode.days} unit="submission" label={`${leetcode.submissions} leetcode submissions in the last year`} />
              <div className="mt-3 flex items-center justify-between gap-4 text-meta text-muted">
                <span className="tabular-nums">{number.format(leetcode.submissions)} submissions in the last year</span>
                <HeatLegend />
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-4">
                {leetcode.solved.map((item) => (
                  <div key={item.difficulty} className="stat rounded-md bg-surface px-4 py-3.5 ring-1 ring-line">
                    <p className="text-meta text-muted">{item.difficulty === "all" ? "solved" : item.difficulty}</p>
                    <p className="mt-0.5 text-[22px] leading-tight font-medium tracking-[-0.02em] tabular-nums">
                      {number.format(item.count)}
                      {item.total ? <span className="text-meta font-normal tracking-normal text-muted"> / {number.format(item.total)}</span> : null}
                    </p>
                    <span aria-hidden="true" className="mt-2.5 block h-1 overflow-hidden rounded-full bg-chip">
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
        </Section>
      </main>
    </PageTransition>
  );
}
