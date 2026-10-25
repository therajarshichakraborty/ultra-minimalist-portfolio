import type { Metadata } from "next";
import Link from "next/link";
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
        <ul className="reveal mt-8 grid gap-1" style={revealDelay(180)}>
          {notes.map((note) => (
            <li key={note.slug}>
              <Link
                href={`/notes/${note.slug}`}
                transitionTypes={["nav-forward"]}
                className="group grid min-h-11 items-baseline gap-x-6 gap-y-0.5 py-2 sm:grid-cols-[minmax(0,1fr)_auto]"
              >
                <span className="min-w-0">
                  <span className="rounded bg-chip px-1 py-px leading-[18px] box-decoration-clone transition-colors duration-150 group-hover:bg-chip-hover group-focus-visible:bg-chip-hover group-active:bg-chip-press">
                    {note.title}
                  </span>
                </span>
                <time dateTime={note.date} className="text-meta whitespace-nowrap text-muted tabular-nums">
                  {formatDate(note.date)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </PageTransition>
  );
}
