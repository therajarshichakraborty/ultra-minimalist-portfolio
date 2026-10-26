import type { ReactNode } from "react";
import { ArrowUpRightIcon, BookOpenIcon, CalendarIcon, EyeIcon, UsersIcon } from "@/components/icons";
import type { Publication } from "@/content/site";

function Detail({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[16px_1fr] gap-3">
      <span aria-hidden="true" className="mt-[3px] text-muted [&>svg]:size-4">
        {icon}
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function PublicationCard({ publication }: { publication: Publication }) {
  const { status, paperId, date, title, authors, venue, abstract, identifiers, links } = publication;

  return (
    <article className="relative rounded-3xl bg-bg/80 p-6 shadow-media ring-1 ring-line backdrop-blur-sm max-sm:rounded-2xl max-sm:p-5">
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-meta text-muted tabular-nums">
        <span className="contact-accent font-semibold">{status}</span>
        <span aria-hidden="true">·</span>
        <span>Paper ID {paperId}</span>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1">
          <CalendarIcon className="size-3.5" />
          {date}
        </span>
      </p>

      <h3 className="mt-3 text-[19px] leading-snug font-medium tracking-[-0.02em] text-balance">
        <a href={links.publisher} target="_blank" rel="noreferrer" className="callout group">
          <span className="callout-text">{title}</span>
          <ArrowUpRightIcon className="ml-1 inline-block size-4 align-[-2px] text-muted transition-transform duration-200 ease-snap group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
        </a>
      </h3>

      <div className="mt-5 grid gap-4">
        <Detail icon={<UsersIcon />}>
          <ul className="grid gap-2">
            {authors.map((author) => (
              <li key={author.name} className="leading-snug">
                <span className={author.self ? "font-medium underline decoration-line underline-offset-4" : undefined}>
                  {author.name}
                </span>
                {author.self ? (
                  <span className="text-muted" title="Corresponding author">
                    *
                  </span>
                ) : null}
                <span className="block text-meta text-muted">{author.affiliation}</span>
              </li>
            ))}
          </ul>
        </Detail>
        <Detail icon={<BookOpenIcon />}>
          <p className="text-pretty text-muted">
            Published in <span className="font-medium text-ink">{venue.name}</span>, {venue.full} ({venue.note})
          </p>
        </Detail>
      </div>

      <p className="mt-5 border-t border-line pt-5 text-pretty">{abstract}</p>

      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-meta">
        {identifiers.map((item) => (
          <div key={item.label} className="flex gap-1.5">
            <dt className="font-medium">{item.label}</dt>
            <dd className="text-muted tabular-nums">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href={links.paper}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ink py-2 pr-4 pl-3.5 font-medium text-bg shadow-lift transition-transform duration-200 ease-snap hover:-translate-y-0.5 active:scale-[0.97]"
        >
          <EyeIcon className="size-4" />
          View paper
        </a>
        <a
          href={links.publisher}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-bg py-2 pr-3.5 pl-4 font-medium text-ink ring-1 ring-line transition-[transform,box-shadow] duration-200 ease-snap hover:-translate-y-0.5 hover:shadow-media active:scale-[0.97]"
        >
          IEEE Xplore
          <ArrowUpRightIcon className="size-3.5 text-muted transition-transform duration-200 ease-snap group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
        </a>
      </div>
    </article>
  );
}
