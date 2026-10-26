import type { Metadata } from "next";
import { BlogList } from "@/components/blog-list";
import { Chip } from "@/components/chip";
import { ArrowUpRightIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { revealDelay } from "@/components/reveal";
import { PageTransition } from "@/components/transitions";
import { blog, site } from "@/content/site";
import { getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: `Hands-on articles by ${site.name} on ${blog.topics}.`,
};

function Scribble() {
  return (
    <svg
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="scribble pointer-events-none absolute -bottom-[0.22em] left-0 h-[0.32em] w-full overflow-visible"
    >
      <defs>
        <linearGradient id="scribble-ink" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#f43f5e" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <path d="M4 9 C 70 3, 170 3, 296 8" pathLength={1} />
      <path d="M40 19 C 120 13, 210 13, 262 17" pathLength={1} />
    </svg>
  );
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <PageTransition>
      <main className="mx-auto w-[min(760px,calc(100%-2*var(--gutter)))] py-[clamp(48px,10svh,112px)] sm:w-[min(760px,calc(100%-128px))]">
        <PageHeader
          title="Blog"
          meta={
            <a
              href={blog.profile}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 transition-colors hover:text-ink"
            >
              On Hashnode
              <ArrowUpRightIcon className="size-3 transition-transform duration-200 ease-snap group-hover:translate-x-px group-hover:-translate-y-px" />
            </a>
          }
        />

        <section className="reveal mt-14 text-center" style={revealDelay(120)}>
          <h2 className="text-[clamp(36px,7.4vw,64px)] leading-[1.04] font-semibold tracking-[-0.045em] text-balance">
            {blog.heading}{" "}
            <span className="relative inline-block whitespace-nowrap text-[#3f3f46]">
              {blog.accent}
              <Scribble />
            </span>
          </h2>
          <p className="mx-auto mt-7 max-w-115 text-[16px] leading-relaxed text-pretty text-muted">
            {posts.length} posts on {blog.topics}, written the way I wish someone had explained them to me.
          </p>
        </section>

        <div className="reveal mt-16" style={revealDelay(200)}>
          <BlogList posts={posts} series={blog.series.map((item) => item.name)} />
        </div>

        <p className="reveal mt-14 border-t border-line pt-8 text-center text-pretty" style={revealDelay(260)}>
          Shorter thoughts on building interfaces live in my <Chip href="/notes">notes</Chip>.
        </p>
      </main>
    </PageTransition>
  );
}
