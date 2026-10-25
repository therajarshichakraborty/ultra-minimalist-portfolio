import { cacheLife } from "next/cache";

export type Day = {
  date: string;
  count: number;
  level: number;
};

export type Calendar = {
  key: string;
  label: string;
  days: Day[];
  total: number;
  activeDays?: number;
  streak?: number;
};

export type GithubActivity = {
  username: string;
  calendars: Calendar[];
  total: number;
  stars: number | null;
  repos: number | null;
  followers: number | null;
  languages: { name: string; count: number }[];
};

export type LeetcodeActivity = {
  username: string;
  calendars: Calendar[];
  ranking: number | null;
  solved: { difficulty: "all" | "easy" | "medium" | "hard"; count: number; total: number }[];
};

const agent = "Mozilla/5.0 (compatible; portfolio-activity/1.0)";
const maxYears = 4;

function iso(date: Date) {
  return date.toISOString().slice(0, 10);
}

function range(start: Date, end: Date) {
  const days: string[] = [];
  const cursor = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
  const last = iso(end);
  while (iso(cursor) <= last) {
    days.push(iso(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
}

function span(year: number | undefined, now: Date) {
  if (!year) {
    const start = new Date(now);
    start.setUTCDate(start.getUTCDate() - 364);
    return range(start, now);
  }
  const end = new Date(Date.UTC(year, 11, 31));
  return range(new Date(Date.UTC(year, 0, 1)), end < now ? end : now);
}

function leveler(counts: number[]) {
  const sorted = counts.filter((count) => count > 0).sort((a, b) => a - b);
  const at = (q: number) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * q))] ?? 1;
  const steps = [at(0.25), at(0.5), at(0.75)];
  return (count: number) => (count <= 0 ? 0 : count <= steps[0] ? 1 : count <= steps[1] ? 2 : count <= steps[2] ? 3 : 4);
}

function summarize(key: string, label: string, days: Day[], extra?: Partial<Calendar>): Calendar {
  return { key, label, days, total: days.reduce((sum, day) => sum + day.count, 0), ...extra };
}

async function request(url: string, init?: RequestInit, attempts = 2): Promise<Response | null> {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, { ...init, signal: AbortSignal.timeout(12000) });
      if (response.ok) return response;
      if (response.status < 500 && response.status !== 429) return null;
    } catch {
      if (attempt === attempts) return null;
    }
    if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, 600 * attempt));
  }
  return null;
}

async function json<T>(url: string, init?: RequestInit): Promise<T | null> {
  const response = await request(url, init);
  if (!response) return null;
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function attribute(tag: string, name: string) {
  return new RegExp(`${name}="([^"]*)"`).exec(tag)?.[1];
}

async function githubCalendar(username: string, year?: number): Promise<Day[]> {
  const query = year ? `?from=${year}-01-01&to=${year}-12-31` : "";
  const response = await request(`https://github.com/users/${username}/contributions${query}`, {
    headers: { "User-Agent": agent, Accept: "text/html" },
  });
  if (!response) return [];
  const html = await response.text();

  const counts = new Map<string, number>();
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([^<]*)<\/tool-tip>/g)) {
    const target = attribute(match[1], "for");
    const amount = /^(\d[\d,]*) contribution/.exec(match[2].trim());
    if (target) counts.set(target, amount ? Number(amount[1].replace(/,/g, "")) : 0);
  }

  const days: Day[] = [];
  for (const match of html.matchAll(/<td\b[^>]*data-date="[^"]*"[^>]*>/g)) {
    const date = attribute(match[0], "data-date");
    const id = attribute(match[0], "id");
    if (!date) continue;
    days.push({
      date,
      count: id ? (counts.get(id) ?? 0) : 0,
      level: Math.min(4, Math.max(0, Number(attribute(match[0], "data-level") ?? 0))),
    });
  }
  return days.sort((a, b) => a.date.localeCompare(b.date));
}

export async function getGithubActivity(username: string): Promise<GithubActivity | null> {
  "use cache";

  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    "User-Agent": agent,
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const [current, user, repos] = await Promise.all([
    githubCalendar(username),
    json<{ public_repos: number; followers: number; created_at: string }>(`https://api.github.com/users/${username}`, { headers }),
    json<{ language: string | null; stargazers_count: number; fork: boolean }[]>(
      `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=pushed`,
      { headers },
    ),
  ]);

  if (!current.length && !user) {
    cacheLife("minutes");
    return null;
  }

  const thisYear = new Date(Date.now()).getUTCFullYear();
  const firstYear = Math.max(Number(user?.created_at?.slice(0, 4)) || thisYear - maxYears + 1, thisYear - maxYears + 1);
  const years = Array.from({ length: thisYear - firstYear + 1 }, (_, index) => thisYear - index);
  const past = await Promise.all(years.map((year) => githubCalendar(username, year)));

  const calendars = [
    summarize("current", "current", current),
    ...years.map((year, index) => summarize(String(year), String(year), past[index])).filter((calendar) => calendar.days.length),
  ].filter((calendar) => calendar.days.length);

  if (current.length && user && repos) {
    cacheLife("hours");
  } else {
    cacheLife("minutes");
  }

  const own = repos?.filter((repo) => !repo.fork) ?? [];
  const counts = new Map<string, number>();
  for (const repo of own) {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }

  return {
    username,
    calendars,
    total: calendars[0]?.total ?? 0,
    stars: repos ? repos.filter((repo) => !repo.fork).reduce((sum, repo) => sum + repo.stargazers_count, 0) : null,
    repos: user?.public_repos ?? null,
    followers: user?.followers ?? null,
    languages: [...counts].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
  };
}

type LeetcodeUser = {
  profile: { ranking: number | null } | null;
  submitStatsGlobal: { acSubmissionNum: { difficulty: string; count: number }[] };
  userCalendar: { activeYears: number[]; streak: number; totalActiveDays: number; submissionCalendar: string } | null;
};

type LeetcodeResponse = {
  data?: {
    matchedUser: LeetcodeUser | null;
    allQuestionsCount?: { difficulty: string; count: number }[];
  };
};

const profileQuery = `query profile($username: String!) {
  matchedUser(username: $username) {
    profile { ranking }
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    userCalendar { activeYears streak totalActiveDays submissionCalendar }
  }
  allQuestionsCount { difficulty count }
}`;

const yearQuery = `query calendar($username: String!, $year: Int) {
  matchedUser(username: $username) {
    userCalendar(year: $year) { activeYears streak totalActiveDays submissionCalendar }
  }
}`;

function leetcode(username: string, query: string, variables: Record<string, unknown>) {
  return json<LeetcodeResponse>("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: `https://leetcode.com/u/${username}/`,
      "User-Agent": agent,
    },
    body: JSON.stringify({ query, variables: { username, ...variables } }),
  });
}

function leetcodeDays(raw: string | undefined, dates: string[]): Day[] {
  let calendar: Record<string, number> = {};
  try {
    calendar = JSON.parse(raw ?? "{}") as Record<string, number>;
  } catch {
    calendar = {};
  }
  const perDay = new Map<string, number>();
  for (const [stamp, count] of Object.entries(calendar)) {
    const date = iso(new Date(Number(stamp) * 1000));
    perDay.set(date, (perDay.get(date) ?? 0) + count);
  }
  const counts = dates.map((date) => perDay.get(date) ?? 0);
  const level = leveler(counts);
  return dates.map((date, index) => ({ date, count: counts[index], level: level(counts[index]) }));
}

export async function getLeetcodeActivity(username: string): Promise<LeetcodeActivity | null> {
  "use cache";

  const result = await leetcode(username, profileQuery, {});
  const user = result?.data?.matchedUser;
  if (!user) {
    cacheLife("minutes");
    return null;
  }

  const now = new Date(Date.now());
  const years = [...(user.userCalendar?.activeYears ?? [])].sort((a, b) => b - a).slice(0, maxYears);
  const yearly = await Promise.all(years.map((year) => leetcode(username, yearQuery, { year })));

  const calendars: Calendar[] = [
    summarize("current", "current", leetcodeDays(user.userCalendar?.submissionCalendar, span(undefined, now)), {
      activeDays: user.userCalendar?.totalActiveDays,
      streak: user.userCalendar?.streak,
    }),
    ...years.flatMap((year, index) => {
      const calendar = yearly[index]?.data?.matchedUser?.userCalendar;
      if (!calendar) return [];
      return [
        summarize(String(year), String(year), leetcodeDays(calendar.submissionCalendar, span(year, now)), {
          activeDays: calendar.totalActiveDays,
          streak: calendar.streak,
        }),
      ];
    }),
  ];

  if (yearly.every(Boolean)) {
    cacheLife("hours");
  } else {
    cacheLife("minutes");
  }

  const totals = new Map(result?.data?.allQuestionsCount?.map((item) => [item.difficulty.toLowerCase(), item.count]) ?? []);
  const solved = new Map(user.submitStatsGlobal.acSubmissionNum.map((item) => [item.difficulty.toLowerCase(), item.count]));

  return {
    username,
    calendars,
    ranking: user.profile?.ranking ?? null,
    solved: (["all", "easy", "medium", "hard"] as const).map((difficulty) => ({
      difficulty,
      count: solved.get(difficulty) ?? 0,
      total: totals.get(difficulty) ?? 0,
    })),
  };
}
