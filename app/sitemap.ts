import type { MetadataRoute } from "next";
import { projects, site } from "@/content/site";
import { getNotes } from "@/lib/notes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notes = await getNotes();
  const pages = [
    "",
    "/interactions",
    "/work",
    "/blog",
    "/notes",
    "/resume",
    "/about",
    "/experience",
    "/activity",
    "/education",
    "/contact",
    "/colophon",
  ];

  return [
    ...pages.map((path) => ({ url: `${site.url}${path}` })),
    ...projects.map((project) => ({ url: `${site.url}/work/${project.slug}` })),
    ...notes.map((note) => ({ url: `${site.url}/notes/${note.slug}`, lastModified: note.date })),
  ];
}
