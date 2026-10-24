import { readdirSync } from "node:fs";
import path from "node:path";
import type { MDXContent } from "mdx/types";

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

export type Note = NoteMeta & {
  Content: MDXContent;
};

const directory = path.join(process.cwd(), "content/notes");
const extension = ".mdx";

function readSlugs() {
  try {
    return readdirSync(directory)
      .filter((file) => file.endsWith(extension))
      .map((file) => file.slice(0, -extension.length));
  } catch {
    return [];
  }
}

function isText(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

async function load(slug: string): Promise<Note | null> {
  const mod = (await import(`@/content/notes/${slug}.mdx`)) as { default?: unknown; meta?: Record<string, unknown> };
  const meta = mod.meta ?? {};
  if (typeof mod.default !== "function" || !isText(meta.title) || !isIsoDate(meta.date)) return null;
  return {
    slug,
    title: meta.title,
    date: meta.date,
    summary: isText(meta.summary) ? meta.summary : "",
    Content: mod.default as MDXContent,
  };
}

function newestFirst(a: NoteMeta, b: NoteMeta) {
  if (a.date === b.date) return a.title.localeCompare(b.title);
  return a.date < b.date ? 1 : -1;
}

export async function getNotes(): Promise<NoteMeta[]> {
  const notes = await Promise.all(readSlugs().map(load));
  return notes
    .filter((note): note is Note => note !== null)
    .map(({ slug, title, date, summary }) => ({ slug, title, date, summary }))
    .sort(newestFirst);
}

export async function getNote(slug: string): Promise<Note | null> {
  if (!readSlugs().includes(slug)) return null;
  return load(slug);
}

export async function getAdjacentNotes(slug: string) {
  const notes = await getNotes();
  const index = notes.findIndex((note) => note.slug === slug);
  if (index === -1) return { newer: null, older: null };
  return {
    newer: notes[index - 1] ?? null,
    older: notes[index + 1] ?? null,
  };
}
