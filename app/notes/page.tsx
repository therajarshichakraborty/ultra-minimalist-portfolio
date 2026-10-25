import type { Metadata } from "next";
import Link from "next/link";
import { HoverList } from "@/components/hover-list";
import { PageHeader } from "@/components/page-header";
import { revealDelay } from "@/components/reveal";
import { PageTransition } from "@/components/transitions";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { getNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "notes",
  description: `notes by ${site.name}: ${site.pages.notes}`,
};

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <PageTransition>
      <main className="column flex min-h-svh flex-col justify-center py-[clamp(48px,6svh,56px)]">
        <PageHeader title="notes" meta={notes.length}>
          {site.pages.notes}
        </PageHeader>
        <div className="reveal mt-8" style={revealDelay(180)}>
          <HoverList className="-mx-2 grid gap-1">
            {notes.map((note) => (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}`}
                transitionTypes={["nav-forward"]}
                className="group grid min-h-11 items-baseline gap-x-6 gap-y-0.5 rounded-lg px-2 py-2 sm:grid-cols-[minmax(0,1fr)_auto]"
              >
                <span className="min-w-0">
                  <span className="rounded bg-chip box-decoration-clone px-1 py-px leading-[18px] transition-colors duration-150 group-hover:bg-chip-hover group-focus-visible:bg-chip-hover group-active:bg-chip-press">
                    {note.title}
                  </span>
                </span>
                <time dateTime={note.date} className="text-meta whitespace-nowrap text-muted tabular-nums">
                  {formatDate(note.date)}
                </time>
              </Link>
            ))}
          </HoverList>
        </div>
      </main>
    </PageTransition>
  );
}
