# ultra minimalist portfolio

A calm, single column portfolio for designers and engineers, built with Next.js 16, React 19, Tailwind CSS 4 and Motion, with Aceternity style details layered on top of a quiet editorial layout.

## Features

- One narrow column of 15px text with inline grey chips and brand tinted hovers
- A handwritten signature that writes itself when you hover your name
- A companion character whose eyes follow the cursor and swat at it
- Copy email button with in place feedback, plus an animated résumé dialog and a printable résumé page
- Aceternity style touches: dot grid with a cursor spotlight, word by word text reveal, 3D tilt cards with glare, focus cards, tracing beam on notes, floating dock, magnetic button, encrypted text, glowing border
- View transition morphs: the home cards grow into the pages they open
- Live interaction demos, coded project covers, MDX notes
- Open Graph image, icons, sitemap, robots, manifest and JSON-LD generated from your content
- Pages for about, experience, education, activity (live github and leetcode data, refreshed hourly), contact and a colophon
- Static by default, light only, accessible, reduced motion aware, no comments

## Quick start

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

| command          | what it does                            |
| ---------------- | --------------------------------------- |
| `pnpm dev`       | start the dev server                    |
| `pnpm build`     | production build                        |
| `pnpm start`     | serve the production build              |
| `pnpm lint`      | run ESLint                              |
| `pnpm typecheck` | generate route types and run TypeScript |

## Make it yours

Almost everything lives in one file: `content/site.ts`.

| what                                        | where                                       |
| ------------------------------------------- | ------------------------------------------- |
| name, signature, role, location, email, url | `site` in `content/site.ts`                 |
| social links                                | `site.links`                                |
| home sentence and chip labels               | `site.home`                                 |
| page intros                                 | `site.pages`                                |
| projects, screenshots in `public/work`      | `projects`                                  |
| interaction demos list                      | `interactions`                              |
| experience                                  | `experience` and `experienceIntro`          |
| education                                   | `education`                                 |
| about page                                  | `about`                                     |
| contact page                                | `contact`                                   |
| github and leetcode usernames               | `site.profiles`                             |
| résumé summary and skills                   | `resume`                                    |
| notes                                       | one `.mdx` file per note in `content/notes` |
| favicon                                     | `app/icon.svg`                              |

Each note starts with its metadata:

```mdx
export const meta = {
  title: "a new note",
  date: "2026-11-01",
  summary: "one line for the list and for search results.",
};

the body is plain markdown.
```

New notes appear in the list, the sitemap and the static build automatically.

### Interaction demos

Each entry in `interactions` maps to a component in `components/demos/index.tsx` by its slug. Remove an entry to hide a demo, or add your own component and register it there.

## Structure

```
app/          routes, metadata routes and global styles
components/   ui, demos and covers
content/      site.ts and notes
lib/          small helpers
public/       static files
```

There is no `src` directory.

## Deploy

Push to GitHub and import the repository on Vercel, or run `pnpm build && pnpm start` on any Node 20.9+ host. Update `site.url` first so canonical links, the sitemap and the Open Graph image point at your domain.

## Notes on Next.js 16

The project uses Cache Components and Partial Prefetching, so every page is prerendered and previously visited pages keep their state when you come back. Avoid `Date.now()`, argless `new Date()` and `Math.random()` in server components, and keep at least one entry in any list that drives `generateStaticParams`.
