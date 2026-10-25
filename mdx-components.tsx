import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { ArrowUpRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const block = "mt-6 first:mt-0";
const heading = "mt-8 font-medium first:mt-0";

const link =
  "rounded bg-chip px-1 py-px text-ink box-decoration-clone transition-colors duration-160 hover:bg-chip-hover focus-visible:bg-chip-hover focus-visible:transition-none active:bg-chip-press";

function Anchor({ href = "", title, children }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} title={title} transitionTypes={["nav-forward"]} className={link}>
        {children}
      </Link>
    );
  }

  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} title={title} target="_blank" rel="noreferrer" className={link}>
        {children}
        <ArrowUpRightIcon className="ml-px inline-block size-3 align-[-1px] text-muted" />
        <span className="sr-only">, opens in a new tab</span>
      </a>
    );
  }

  return (
    <a href={href} title={title} className={link}>
      {children}
    </a>
  );
}

function Code({ children }: ComponentPropsWithoutRef<"code">) {
  return (
    <code className="rounded bg-chip box-decoration-clone px-1 py-px font-mono text-[13px] tracking-normal">
      {children}
    </code>
  );
}

function Pre({ children }: ComponentPropsWithoutRef<"pre">) {
  return (
    <pre
      className={cn(
        block,
        "overflow-x-auto rounded bg-chip p-3 font-mono text-[13px] leading-[1.6] tracking-normal [&>code]:rounded-none [&>code]:bg-transparent [&>code]:p-0",
      )}
    >
      {children}
    </pre>
  );
}

function NoteImage({ src, alt = "", title }: ComponentPropsWithoutRef<"img">) {
  if (typeof src !== "string" || !src) return null;
  return (
    <Image
      src={src}
      alt={alt}
      title={title}
      width={1040}
      height={650}
      sizes="(min-width: 600px) 520px, 100vw"
      unoptimized={/^https?:\/\//.test(src)}
      className={cn(block, "block h-auto w-full rounded")}
    />
  );
}

const components: MDXComponents = {
  p: ({ children }) => <p className={cn(block, "text-pretty")}>{children}</p>,
  h1: ({ children }) => <h2 className={heading}>{children}</h2>,
  h2: ({ children }) => <h2 className={heading}>{children}</h2>,
  h3: ({ children }) => <h3 className={heading}>{children}</h3>,
  h4: ({ children }) => <h4 className={heading}>{children}</h4>,
  a: Anchor,
  ul: ({ children }) => <ul className={cn(block, "list-disc pl-5 marker:text-muted")}>{children}</ul>,
  ol: ({ children }) => (
    <ol className={cn(block, "list-decimal pl-5 marker:text-muted marker:tabular-nums")}>{children}</ol>
  ),
  li: ({ children }) => <li className="mt-2 pl-1 first:mt-0">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className={cn(block, "border-l border-line pl-4 text-muted")}>{children}</blockquote>
  ),
  code: Code,
  pre: Pre,
  hr: () => <hr className="mt-8 border-line" />,
  img: NoteImage,
  strong: ({ children }) => <strong className="font-medium">{children}</strong>,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
