import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Code2, ArrowUpRight, Flame } from "lucide-react";
import { GitHubHeatmap } from "./GitHubHeatmap";
import { LeetCodeHeatmap } from "./LeetCodeHeatmap";

interface Contribution {
  date: string;
  count: number;
  level: number;
}

const githubUsername   = process.env.NEXT_PUBLIC_GITHUB_USERNAME  || "replace-me";
const leetcodeUsername = "godsownsoldier";

async function fetchGitHubContributions(): Promise<Contribution[]> {
  const token = process.env.GITHUB_TOKEN;

  // --- Strategy 1: GitHub GraphQL API (requires GITHUB_TOKEN) ---
  if (token) {
    try {
      const to   = new Date().toISOString();
      const from = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `query($username: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $username) {
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }`,
          variables: { username: githubUsername, from, to },
        }),
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const json = await res.json();
        const weeks =
          json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
        const contributions: Contribution[] = [];
        for (const week of weeks) {
          for (const day of week.contributionDays) {
            contributions.push({ date: day.date, count: day.contributionCount, level: 0 });
          }
        }
        if (contributions.length > 0) return contributions;
      }
    } catch {
      // fall through to strategy 2
    }
  }

  // --- Strategy 2: jogruber public API (no token needed, may be rate-limited) ---
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.contributions ?? [];
  } catch {
    return [];
  }
}

async function fetchLeetCodeData(): Promise<{
  streak: number;
  totalSolved: number;
  rating: number | null;
  submissionCalendar: string;
} | null> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query userCalendar($username: String!) {
            matchedUser(username: $username) {
              userCalendar {
                streak
                submissionCalendar
              }
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
            userContestRanking(username: $username) {
              rating
            }
          }
        `,
        variables: { username: leetcodeUsername },
      }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const user = json?.data?.matchedUser;
    if (!user) return null;
    return {
      streak: user.userCalendar?.streak ?? 0,
      submissionCalendar: user.userCalendar?.submissionCalendar ?? "{}",
      totalSolved: user.submitStats?.acSubmissionNum?.find(
        (x: { difficulty: string }) => x.difficulty === "All"
      )?.count ?? 0,
      rating: json?.data?.userContestRanking?.rating
        ? Math.round(json.data.userContestRanking.rating)
        : null,
    };
  } catch {
    return null;
  }
}

export async function GitHubBento() {
  const [contributions, leetcode] = await Promise.all([
    fetchGitHubContributions(),
    fetchLeetCodeData(),
  ]);

  return (
    <section className="py-8 px-4 max-w-3xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

        {/* Blog card with character image — col-span-2 */}
        <Link
          href="/blogs"
          className="col-span-2 rounded-2xl border border-border overflow-hidden relative group hover:border-foreground/20 transition-colors min-h-[200px] bg-neutral-900"
        >
          <Image
            src="/placeholder/gidd.gif"
            alt="writer"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">writing</p>
            <span className="text-white font-semibold text-base flex items-center gap-1.5">
              My Blogs
              <ArrowUpRight className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
            </span>
            <p className="text-white/50 text-xs mt-0.5">thoughts, tutorials & more</p>
          </div>
        </Link>

        {/* GitHub heatmap — col-span-2 */}
        <div className="col-span-2 rounded-2xl border border-border bg-card p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <span className="text-sm font-medium">Contributions</span>
            </div>
            <Link
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              @{githubUsername}
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <GitHubHeatmap contributions={contributions} />
        </div>

        {/* LeetCode activity heatmap — full width, right under blog+github */}
        <div className="col-span-2 md:col-span-4 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-medium">LeetCode Activity</span>
              {leetcode?.rating && (
                <span className="text-xs font-semibold text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full border border-orange-400/20">
                  Rating: {leetcode.rating}
                </span>
              )}
            </div>
            <Link
              href={`https://leetcode.com/${leetcodeUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              @{leetcodeUsername}
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <LeetCodeHeatmap
            submissionCalendar={leetcode?.submissionCalendar ?? "{}"}
            weeks={26}
          />
        </div>

        {/* LeetCode streak */}
        <div className="col-span-1 rounded-2xl border border-border bg-card p-4 flex flex-col items-center justify-center gap-1 text-center">
          <Flame className="h-5 w-5 text-orange-400 mb-1" />
          <span className="text-2xl font-bold">
            {leetcode ? leetcode.streak : "—"}
          </span>
          <span className="text-xs text-muted-foreground leading-tight">day streak</span>
          <span className="text-[10px] text-muted-foreground/60 mt-0.5">
            {leetcode ? `${leetcode.totalSolved} solved` : "leetcode"}
          </span>
        </div>

        {/* Twitter/X */}
        <Link
          href="https://twitter.com/krrishrastogi"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 rounded-2xl border border-border bg-blue-500/10 hover:bg-blue-500/20 transition-colors p-4 flex flex-col items-center justify-center gap-2 group"
        >
          <Twitter className="h-7 w-7 text-[#1DA1F2]" />
          <span className="text-xs text-muted-foreground text-center">thoughts 🗿</span>
        </Link>

        {/* LinkedIn */}
        <Link
          href="https://linkedin.com/in/krrishrastogi"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 rounded-2xl border border-border bg-[#0077B5]/10 hover:bg-[#0077B5]/20 transition-colors p-4 flex flex-col items-center justify-center gap-2 group"
        >
          <Linkedin className="h-7 w-7 text-[#0077B5]" />
          <span className="text-xs text-muted-foreground text-center">connect ;)</span>
        </Link>

        {/* WakaTime */}
        <Link
          href="https://wakatime.com"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 rounded-2xl border border-border bg-card hover:border-foreground/30 transition-colors p-4 flex flex-col items-center justify-center gap-1 text-center"
        >
          <Code2 className="h-5 w-5 text-muted-foreground mb-1" />
          <span className="text-2xl font-bold">95h</span>
          <span className="text-xs text-muted-foreground">coding stats</span>
          <span className="text-[10px] text-muted-foreground/60">wakatime</span>
        </Link>

      </div>
    </section>
  );
}
