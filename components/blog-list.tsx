"use client";

import { motion, MotionConfig } from "motion/react";
import { useState } from "react";
import { HoverList } from "@/components/hover-list";
import { ArrowUpRightIcon } from "@/components/icons";
import type { Post } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const pageSize = 12;
const everything = "All";

export function BlogList({ posts, series }: { posts: Post[]; series: string[] }) {
  const [active, setActive] = useState(everything);
  const [limit, setLimit] = useState(pageSize);

  const tabs = [everything, ...series.filter((name) => posts.some((post) => post.series === name))];
  const filtered = active === everything ? posts : posts.filter((post) => post.series === active);
  const shown = filtered.slice(0, limit);
  const remaining = filtered.length - shown.length;

  const select = (tab: string) => {
    setActive(tab);
    setLimit(pageSize);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex items-end justify-between gap-6 border-b border-line">
        <div aria-label="Filter by series" className="-mb-px no-scrollbar flex gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              aria-pressed={tab === active}
              onClick={() => select(tab)}
              className={cn(
                "relative shrink-0 pt-1 pb-3 whitespace-nowrap transition-colors duration-150",
                tab === active ? "text-ink" : "text-muted hover:text-ink",
              )}
            >
              {tab}
              {tab === active ? (
                <motion.span
                  layoutId="blog-tab"
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              ) : null}
            </button>
          ))}
        </div>
        <span className="shrink-0 pb-3 text-meta text-muted tabular-nums max-sm:hidden">
          {filtered.length} {filtered.length === 1 ? "post" : "posts"}
        </span>
      </div>

      <HoverList className="-mx-3 mt-6 grid gap-1">
        {shown.map((post, index) => (
          <a
            key={post.url}
            href={post.url}
            target="_blank"
            rel="noreferrer"
            className="group grid grid-cols-[40px_1fr] gap-x-3 rounded-xl px-3 py-4 sm:grid-cols-[56px_1fr]"
          >
            <span className="pt-1 font-mono text-meta tracking-normal text-faint tabular-nums transition-colors group-hover:text-ink">
              {String(index + 1).padStart(2, "0")}.
            </span>
            <span className="min-w-0">
              <span className="block text-[17px] leading-snug font-medium tracking-[-0.02em] text-pretty">
                {post.title}
                <ArrowUpRightIcon className="ml-1 inline-block size-3.5 align-[-1px] text-muted opacity-0 transition-[opacity,transform] duration-200 ease-snap group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:opacity-100" />
              </span>
              {post.description ? (
                <span className="mt-1.5 line-clamp-2 block text-pretty text-muted">{post.description}</span>
              ) : null}
              <span className="mt-2 flex flex-wrap items-center gap-x-2 text-meta text-muted tabular-nums">
                <time dateTime={post.date}>{formatDate(post.date.slice(0, 10))}</time>
                <span aria-hidden="true">·</span>
                <span>{post.series}</span>
              </span>
            </span>
          </a>
        ))}
      </HoverList>

      {remaining > 0 ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setLimit((value) => value + pageSize)}
            className="inline-flex items-center gap-2 rounded-full bg-bg py-2 pr-4 pl-4 text-ink ring-1 ring-line transition-[transform,box-shadow] duration-200 ease-snap hover:-translate-y-0.5 hover:shadow-media active:scale-[0.97]"
          >
            Show more
            <span className="text-meta text-muted tabular-nums">{remaining} left</span>
          </button>
        </div>
      ) : null}
    </MotionConfig>
  );
}
