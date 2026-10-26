import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeftIcon } from "@/components/icons";
import { revealDelay } from "@/components/reveal";

type BackLinkProps = {
  href?: string;
  label?: string;
};

export function BackLink({ href = "/", label = "Back home" }: BackLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      transitionTypes={["nav-back"]}
      className="relative inline-grid size-6 place-items-center rounded bg-chip text-ink transition-[background-color,transform] duration-150 ease-snap before:absolute before:-inset-2.5 before:content-[''] hover:bg-chip-hover focus-visible:bg-chip-hover active:scale-[0.94] active:bg-chip-press"
    >
      <ArrowLeftIcon className="size-4" />
    </Link>
  );
}

type PageHeaderProps = {
  title: ReactNode;
  meta?: ReactNode;
  backHref?: string;
  backLabel?: string;
  children?: ReactNode;
};

export function PageHeader({ title, meta, backHref = "/", backLabel, children }: PageHeaderProps) {
  return (
    <header className="relative">
      <div className="reveal absolute top-px left-0 sm:right-[calc(100%+20px)] sm:left-auto" style={revealDelay(0)}>
        <BackLink href={backHref} label={backLabel} />
      </div>
      <div className="reveal flex items-baseline justify-between gap-4 pl-10 sm:pl-0" style={revealDelay(60)}>
        <h1 className="font-medium">{title}</h1>
        {meta ? <span className="shrink-0 text-meta text-muted tabular-nums">{meta}</span> : null}
      </div>
      {children ? (
        <div className="reveal mt-4 text-pretty sm:mt-6" style={revealDelay(120)}>
          {children}
        </div>
      ) : null}
    </header>
  );
}
