import { cacheLife } from "next/cache";
import { archive } from "@/content/posts";
import { blog } from "@/content/site";

export type Post = {
  title: string;
  description: string;
  url: string;
  date: string;
  image?: string;
  series: string;
};

const entities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", "#39": "'" };

function decode(value: string) {
  return value
    .replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, "$1")
    .replace(/&(#\d+|#x[\da-f]+|\w+);/gi, (match, code: string) => {
      if (code.startsWith("#x")) return String.fromCodePoint(parseInt(code.slice(2), 16));
      if (code.startsWith("#") && code !== "#39") return String.fromCodePoint(Number(code.slice(1)));
      return entities[code] ?? match;
    })
    .trim();
}

function tag(item: string, name: string) {
  const match = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`).exec(item);
  return match ? decode(match[1]) : "";
}

function seriesOf(url: string) {
  const host = url.replace(/^https?:\/\//, "").split("/")[0];
  return blog.series.find((item) => item.host === host)?.name ?? "Elsewhere";
}

async function feed(host: string): Promise<Omit<Post, "series">[]> {
  try {
    const response = await fetch(`https://${host}/rss.xml`, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return [];
    const xml = await response.text();
    return Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g), ([, item]) => {
      const published = new Date(tag(item, "pubDate"));
      return {
        title: tag(item, "title"),
        description: tag(item, "description"),
        url: tag(item, "link"),
        date: Number.isNaN(published.getTime()) ? "" : published.toISOString(),
        image: /<enclosure[^>]*url="([^"]+)"/.exec(item)?.[1],
      };
    }).filter((post) => post.title && post.url && post.date);
  } catch {
    return [];
  }
}

export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("hours");

  const fresh = (await Promise.all(blog.series.map((item) => feed(item.host)))).flat();
  const byUrl = new Map<string, Omit<Post, "series">>();
  for (const post of [...archive, ...fresh]) byUrl.set(post.url.replace(/\/$/, ""), post);

  return Array.from(byUrl.values(), (post) => ({ ...post, series: seriesOf(post.url) })).sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}
