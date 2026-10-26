import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { revealDelay } from "@/components/reveal";
import { TracingBeam } from "@/components/tracing-beam";
import { PageTransition } from "@/components/transitions";
import { formatDate } from "@/lib/format";
import { getAdjacentNotes, getNote, getNotes } from "@/lib/notes";

export async function generateStaticParams() {
  const notes = await getNotes();
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: PageProps<"/notes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.summary,
    openGraph: { type: "article", title: note.title, description: note.summary, publishedTime: note.date },
  };
}

export default async function NotePage({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) notFound();
  const { older } = await getAdjacentNotes(slug);
  const { Content } = note;

  return (
    <PageTransition>
      <main className="column py-[clamp(48px,10svh,112px)]">
        <PageHeader title={note.title} meta={formatDate(note.date)} backHref="/notes" backLabel="Back to notes" />
        <TracingBeam>
          <article className="reveal mt-8 leading-[1.75]" style={revealDelay(180)}>
            <Content />
          </article>
        </TracingBeam>
        {older ? (
          <footer className="mt-16 flex items-baseline justify-between gap-4 border-t border-line pt-6">
            <span className="text-meta text-muted">Older</span>
            <Link
              href={`/notes/${older.slug}`}
              transitionTypes={["nav-forward"]}
              className="rounded bg-chip px-1 py-px leading-[18px] transition-colors duration-150 hover:bg-chip-hover focus-visible:bg-chip-hover"
            >
              {older.title}
            </Link>
          </footer>
        ) : null}
      </main>
    </PageTransition>
  );
}
