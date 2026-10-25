import { cacheLife } from "next/cache";

export type Day = {
  date: string;
  count: number;
};

export type GithubActivity = {
  username: string;
  days: Day[];
  total: number;
  stars: number | null;
  repos: number | null;
  followers: number | null;
};

export type LeetcodeActivity = {
  username: string;
  days: Day[];
  submissions: number;
  activeDays: number;
  streak: number;
  ranking: number | null;
  solved: { difficulty: "all" | "easy" | "medium" | "hard"; count: number; total: number }[];
};

const agent = "Mozilla/5.0 (compatible; portfolio-activity/1.0)";

function iso(date: Date) {
  return date.toISOString().slice(0, 10);
}

function lastYear(end: Date) {
  const days: string[] = [];
  const cursor = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()));
  cursor.setUTCDate(cursor.getUTCDate() - 364);
  for (let i = 0; i < 365; i++) {
    days.push(iso(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
}

async function json<T>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(url, { ...init, signal: AbortSignal.timeout(8000) });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function githubCalendar(username: string): Promise<Day[]> {
  try {
    const response = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: { "User-Agent": agent, Accept: "text/html" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return [];
    const html = await response.text();
    const counts = new Map<string, number>();
    for (const match of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
      const amount = /^(\d[\d,]*) contribution/.exec(match[2].trim());
      counts.set(match[1], amount ? Number(amount[1].replace(/,/g, "")) : 0);
    }
    const days: Day[] = [];
    for (const match of html.matchAll(/<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="([^"]+)"[^>]*>/g)) {
      days.push({ date: match[1], count: counts.get(match[2]) ?? 0 });
    }
    return days.sort((a, b) => (a.date < b.date ? -1 : 1));
  } catch {
    return [];
  }
}

export async function getGithubActivity(username: string): Promise<GithubActivity | null> {
  "use cache";
  cacheLife("hours");

  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    "User-Agent": agent,
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const [days, user, repos] = await Promise.all([
    githubCalendar(username),
    json<{ public_repos: number; followers: number }>(`https://api.github.com/users/${username}`, { headers }),
    json<{ stargazers_count: number; fork: boolean }[]>(
      `https://api.github.com/users/${username}/repos?per_page=100&type=owner`,
      { headers },
    ),
  ]);

  if (!days.length && !user) return null;

  return {
    username,
    days,
    total: days.reduce((sum, day) => sum + day.count, 0),
    stars: repos ? repos.filter((repo) => !repo.fork).reduce((sum, repo) => sum + repo.stargazers_count, 0) : null,
    repos: user?.public_repos ?? null,
    followers: user?.followers ?? null,
  };
}

type LeetcodeResponse = {
  data?: {
    matchedUser: {
      profile: { ranking: number | null } | null;
      submitStatsGlobal: { acSubmissionNum: { difficulty: string; count: number }[] };
      userCalendar: { streak: number; totalActiveDays: number; submissionCalendar: string } | null;
    } | null;
    allQuestionsCount: { difficulty: string; count: number }[];
  };
};

const leetcodeQuery = `query activity($username: String!) {
  matchedUser(username: $username) {
    profile { ranking }
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    userCalendar { streak totalActiveDays submissionCalendar }
  }
  allQuestionsCount { difficulty count }
}`;

export async function getLeetcodeActivity(username: string): Promise<LeetcodeActivity | null> {
  "use cache";
  cacheLife("hours");

  const result = await json<LeetcodeResponse>("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: `https://leetcode.com/u/${username}/`,
      "User-Agent": agent,
    },
    body: JSON.stringify({ query: leetcodeQuery, variables: { username } }),
  });

  const user = result?.data?.matchedUser;
  if (!user) return null;

  let calendar: Record<string, number> = {};
  try {
    calendar = JSON.parse(user.userCalendar?.submissionCalendar ?? "{}") as Record<string, number>;
  } catch {
    calendar = {};
  }

  const perDay = new Map<string, number>();
  for (const [stamp, count] of Object.entries(calendar)) {
    const date = iso(new Date(Number(stamp) * 1000));
    perDay.set(date, (perDay.get(date) ?? 0) + count);
  }

  const days = lastYear(new Date(Date.now())).map((date) => ({ date, count: perDay.get(date) ?? 0 }));
  const totals = new Map(result?.data?.allQuestionsCount.map((item) => [item.difficulty.toLowerCase(), item.count]) ?? []);
  const order = ["all", "easy", "medium", "hard"] as const;
  const solvedMap = new Map(user.submitStatsGlobal.acSubmissionNum.map((item) => [item.difficulty.toLowerCase(), item.count]));

  return {
    username,
    days,
    submissions: days.reduce((sum, day) => sum + day.count, 0),
    activeDays: user.userCalendar?.totalActiveDays ?? days.filter((day) => day.count > 0).length,
    streak: user.userCalendar?.streak ?? 0,
    ranking: user.profile?.ranking ?? null,
    solved: order.map((difficulty) => ({
      difficulty,
      count: solvedMap.get(difficulty) ?? 0,
      total: totals.get(difficulty) ?? 0,
    })),
  };
}
