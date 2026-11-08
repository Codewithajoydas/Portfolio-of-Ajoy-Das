"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Star,
  GitFork,
  Search,
  ArrowUpRight,
  Code2,
  GitPullRequest,
  Users,
  BookOpen,
  ExternalLink,
  CalendarDays,
  GitBranch,
  X,
  Loader2,
  AlertCircle,
  RefreshCw,
  Globe,
  Terminal,
  Sparkles,
  FolderGit2,
  Activity,
  ChevronDown,
} from "lucide-react";
import { Pacifico } from "next/font/google";
import Footer from "@/components/Footer";
import PageTransition from "@/components/page-transition";
import { FaGithub } from "react-icons/fa";
const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});
const GITHUB_USERNAME = "Codewithajoydas";
const GITHUB_PROFILE_URL =
  `https://github.com/${GITHUB_USERNAME}`;
const CONTRIBUTION_GRAPH_URL =
  `https://ghchart.rshah.org/2563eb/${GITHUB_USERNAME}`;
type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
};
type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  fork: boolean;
  archived: boolean;
  updated_at: string;
  created_at: string;
  license: {
    name: string;
    spdx_id: string;
  } | null;
};
const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Java: "#b07219",
  PHP: "#4F5D95",
  Shell: "#89e051",
  Go: "#00ADD8",
  Rust: "#dea584",
  "C++": "#f34b7d",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};
const formatNumber = (value: number) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
export default function OpenSourceClient() {
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeLanguage, setActiveLanguage] = useState("All");
  const [sortBy, setSortBy] = useState("updated");
  const [showForks, setShowForks] = useState(false);
  // FETCH GITHUB DATA
  const fetchGitHubData = async () => {
    setLoading(true);
    setError("");
    try {
      const [profileResponse, reposResponse] =
        await Promise.all([
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}`,
            { cache: "no-store" }
          ),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
            { cache: "no-store" }
          ),
        ]);
      if (!profileResponse.ok || !reposResponse.ok) {
        throw new Error(
          "Unable to retrieve GitHub data. Please try again later."
        );
      }
      const profileData: GitHubUser =
        await profileResponse.json();
      const repoData: GitHubRepo[] =
        await reposResponse.json();
      setProfile(profileData);
      setRepositories(repoData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while fetching GitHub data."
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchGitHubData();
  }, []);
  // REPOSITORY STATISTICS
  const originalRepositories = useMemo(
    () => repositories.filter((repo) => !repo.fork),
    [repositories]
  );
  const totalStars = repositories.reduce(
    (total, repo) => total + repo.stargazers_count,
    0
  );
  const totalForks = repositories.reduce(
    (total, repo) => total + repo.forks_count,
    0
  );
  const totalIssues = repositories.reduce(
    (total, repo) => total + repo.open_issues_count,
    0
  );
  const languages = useMemo(() => {
    return [
      "All",
      ...new Set(
        repositories
          .map((repo) => repo.language)
          .filter((language): language is string =>
            Boolean(language)
          )
      ),
    ];
  }, [repositories]);
  // SEARCH, FILTER AND SORT
  const filteredRepositories = useMemo(() => {
    let result = repositories.filter(
      (repo) => showForks || !repo.fork
    );
    if (activeLanguage !== "All") {
      result = result.filter(
        (repo) => repo.language === activeLanguage
      );
    }
    if (search.trim()) {
      const query = search.toLowerCase().trim();
      result = result.filter((repo) =>
        [
          repo.name,
          repo.description || "",
          repo.language || "",
          ...repo.topics,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }
    if (sortBy === "stars") {
      result.sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count
      );
    }
    if (sortBy === "name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    if (sortBy === "updated") {
      result.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() -
          new Date(a.updated_at).getTime()
      );
    }
    if (sortBy === "forks") {
      result.sort(
        (a, b) => b.forks_count - a.forks_count
      );
    }
    return result;
  }, [
    repositories,
    search,
    activeLanguage,
    sortBy,
    showForks,
  ]);
  // FEATURED PROJECTS
  // Top three original repositories by stars.
  const featuredRepositories = useMemo(
    () =>
      [...originalRepositories]
        .sort(
          (a, b) =>
            b.stargazers_count - a.stargazers_count
        )
        .slice(0, 3),
    [originalRepositories]
  );
  const resetFilters = () => {
    setSearch("");
    setActiveLanguage("All");
    setSortBy("updated");
    setShowForks(false);
  };
  return (
    <PageTransition>
      <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
        {/* =========================================
            HERO SECTION
        ========================================= */}
        <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-blue-50 via-white to-white px-6 pb-20 pt-32 dark:border-zinc-800 dark:from-blue-950 dark:via-zinc-950 dark:to-zinc-950 sm:px-10 lg:px-16">
          <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-900/20" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-sky-100/50 blur-3xl dark:bg-sky-900/10" />
          <div className="relative mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-center">
              <div className="max-w-3xl">
                <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
                  Open Source & Community
                </p>
                <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                  Building in
                  <br />
                  <span
                    className={`${pacifico.className} font-normal text-blue-800 dark:text-blue-300`}
                  >
                    the open.
                  </span>
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600 dark:text-zinc-400">
                  Sharing ideas, building useful software,
                  experimenting with new technologies and
                  contributing to the developer community.
                  Explore my open-source journey.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#repositories"
                    className="inline-flex items-center gap-2 bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
                  >
                    Explore repositories
                    <ArrowUpRight size={17} />
                  </a>
                  <a
                    href={GITHUB_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 transition-all hover:border-gray-900 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-400"
                  >
                    <FaGithub size={17} />
                    Visit GitHub
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>
              {/* PROFILE CARD */}
              <div className="w-full max-w-sm border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                <div className="flex items-center gap-4">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="GitHub profile"
                      className="h-16 w-16 rounded-full border border-gray-200 dark:border-zinc-700"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800">
                      <FaGithub size={30} />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold">
                      {profile?.name || GITHUB_USERNAME}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
                      @{GITHUB_USERNAME}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Public GitHub profile
                    </span>
                  </div>
                </div>
                <div className="my-6 border-t border-gray-100 dark:border-zinc-800" />
                <p className="text-sm leading-6 text-gray-600 dark:text-zinc-400">
                  {profile?.bio ||
                    "Software developer building practical applications, tools and open-source experiments."}
                </p>
                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-between border border-gray-200 px-4 py-3 text-sm font-medium transition-colors hover:border-blue-600 hover:text-blue-800 dark:border-zinc-700 dark:hover:border-blue-500 dark:hover:text-blue-300"
                >
                  View GitHub Profile
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* =========================================
            GITHUB STATISTICS
        ========================================= */}
        <section className="border-b border-gray-200 px-6 py-12 dark:border-zinc-800 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
                  GitHub Overview
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  By the numbers.
                </h2>
              </div>
              <button
                type="button"
                onClick={fetchGitHubData}
                disabled={loading}
                aria-label="Refresh GitHub statistics"
                className="flex items-center gap-2 border border-gray-200 px-4 py-2.5 text-sm transition-colors hover:border-blue-600 dark:border-zinc-800 dark:hover:border-blue-500"
              >
                <RefreshCw
                  size={15}
                  className={loading ? "animate-spin" : ""}
                />
                <span className="hidden sm:inline">
                  Refresh
                </span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {[
                {
                  label: "Repositories",
                  value: profile?.public_repos,
                  icon: FolderGit2,
                },
                {
                  label: "Total Stars",
                  value: totalStars,
                  icon: Star,
                },
                {
                  label: "Total Forks",
                  value: totalForks,
                  icon: GitFork,
                },
                {
                  label: "Followers",
                  value: profile?.followers,
                  icon: Users,
                },
                {
                  label: "Following",
                  value: profile?.following,
                  icon: Globe,
                },
                {
                  label: "Open Issues",
                  value: totalIssues,
                  icon: GitPullRequest,
                },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="border border-gray-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-gray-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
                  >
                    <div className="flex h-9 w-9 items-center justify-center bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
                      <Icon size={18} />
                    </div>
                    <p className="mt-5 text-2xl font-semibold tabular-nums">
                      {loading
                        ? "..."
                        : formatNumber(stat.value ?? 0)}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
            {error && (
              <div className="mt-5 flex items-start gap-3 border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/20 dark:text-red-300">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">
                    GitHub data unavailable
                  </p>
                  <p className="mt-1">{error}</p>
                </div>
              </div>
            )}
          </div>
        </section>
        {/* =========================================
            FEATURED PROJECTS
        ========================================= */}
        <section className="px-6 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
                  Selected Work
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Featured repositories.
                </h2>
                <p className="mt-4 max-w-xl leading-7 text-gray-600 dark:text-zinc-400">
                  A selection of my original public repositories,
                  ordered by their GitHub star count.
                </p>
              </div>
              <a
                href="#repositories"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-800 hover:text-blue-600 dark:text-blue-300"
              >
                View all repositories
                <ArrowUpRight size={16} />
              </a>
            </div>
            {loading ? (
              <div className="grid gap-5 md:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-64 animate-pulse border border-gray-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900"
                  />
                ))}
              </div>
            ) : featuredRepositories.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-3">
                {featuredRepositories.map((repo, index) => (
                  <article
                    key={repo.id}
                    className="group flex flex-col border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[5px_5px_0px_#193cb8] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700 dark:hover:shadow-[5px_5px_0px_#2563eb]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center border border-gray-200 bg-gray-50 text-blue-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-blue-300">
                        <FolderGit2 size={20} />
                      </div>
                      <span className="font-mono text-xs text-blue-800 dark:text-blue-300">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-7 text-xl font-semibold">
                      {repo.name}
                    </h3>
                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-500 dark:text-zinc-400">
                      {repo.description ||
                        "An open-source project and development experiment."}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="border border-gray-100 bg-gray-50 px-2 py-1 text-[11px] text-gray-500 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-400"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-5 border-t border-gray-100 pt-5 text-xs text-gray-500 dark:border-zinc-800 dark:text-zinc-400">
                      {repo.language && (
                        <span className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{
                              backgroundColor:
                                languageColors[repo.language] ||
                                "#64748b",
                            }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Star size={14} />
                        {formatNumber(repo.stargazers_count)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <GitFork size={14} />
                        {formatNumber(repo.forks_count)}
                      </span>
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-between border border-gray-200 px-4 py-3 text-sm font-medium transition-colors hover:border-blue-600 hover:text-blue-800 dark:border-zinc-700 dark:hover:border-blue-500 dark:hover:text-blue-300"
                    >
                      Explore repository
                      <ArrowUpRight size={16} />
                    </a>
                  </article>
                ))}
              </div>
            ) : (
              <p className="border border-gray-200 p-8 text-center text-sm text-gray-500 dark:border-zinc-800 dark:text-zinc-400">
                No featured repositories available yet.
              </p>
            )}
          </div>
        </section>
        {/* =========================================
            ALL REPOSITORIES
        ========================================= */}
        <section
          id="repositories"
          className="border-y border-gray-200 bg-gray-50 px-6 py-20 dark:border-zinc-800 dark:bg-zinc-900/30 sm:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-10">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
                GitHub Collection
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                All repositories.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-gray-600 dark:text-zinc-400">
                Explore my public projects, experiments and
                development repositories. Find projects by
                name, technology or topic.
              </p>
            </div>
            {/* SEARCH */}
            <div className="relative mb-6">
              <Search
                size={19}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search repositories, languages or topics..."
                aria-label="Search repositories"
                className="h-16 w-full border border-gray-200 bg-white pl-14 pr-14 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-blue-500"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            {/* LANGUAGE FILTER */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {languages.map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => setActiveLanguage(language)}
                  className={`border px-4 py-2.5 text-xs font-medium transition-all ${
                    activeLanguage === language
                      ? "border-blue-800 bg-blue-800 text-white dark:border-blue-600 dark:bg-blue-600"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-600"
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
            {/* SORT AND OPTIONS */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-gray-200 py-4 dark:border-zinc-800">
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {loading ? "..." : filteredRepositories.length}
                </span>{" "}
                repositories
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-500 dark:text-zinc-400">
                  <input
                    type="checkbox"
                    checked={showForks}
                    onChange={(e) => setShowForks(e.target.checked)}
                    className="accent-blue-700"
                  />
                  Include forks
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort repositories"
                    className="appearance-none border border-gray-200 bg-white py-2.5 pl-3 pr-9 text-sm outline-none focus:border-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
                  >
                    <option value="updated">Recently updated</option>
                    <option value="stars">Most stars</option>
                    <option value="forks">Most forks</option>
                    <option value="name">Name A-Z</option>
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm text-blue-800 transition-colors hover:text-blue-600 dark:text-blue-300"
                >
                  Reset
                </button>
              </div>
            </div>
            {/* LOADING */}
            {loading ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="h-60 animate-pulse border border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
                  />
                ))}
              </div>
            ) : error ? (
              <div className="border border-gray-200 bg-white px-6 py-16 text-center dark:border-zinc-800 dark:bg-zinc-950">
                <AlertCircle
                  size={30}
                  className="mx-auto text-gray-400"
                />
                <h3 className="mt-5 text-xl font-semibold">
                  Unable to load repositories.
                </h3>
                <p className="mt-3 text-sm text-gray-500 dark:text-zinc-400">
                  Check your connection and try again.
                </p>
                <button
                  type="button"
                  onClick={fetchGitHubData}
                  className="mt-6 inline-flex items-center gap-2 bg-blue-800 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-600"
                >
                  <RefreshCw size={15} />
                  Try again
                </button>
              </div>
            ) : filteredRepositories.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredRepositories.map((repo) => (
                  <article
                    key={repo.id}
                    className="group flex flex-col border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[5px_5px_0px_#193cb8] dark:border-zinc-800 dark:bg-zinc-950/70 dark:hover:border-zinc-700 dark:hover:shadow-[5px_5px_0px_#2563eb]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <FolderGit2
                        size={22}
                        className="shrink-0 text-blue-800 dark:text-blue-300"
                      />
                      <div className="flex flex-wrap justify-end gap-2">
                        {repo.fork && (
                          <span className="border border-gray-200 px-2 py-1 text-[10px] uppercase tracking-wider text-gray-500 dark:border-zinc-700 dark:text-zinc-400">
                            Fork
                          </span>
                        )}
                        {repo.archived && (
                          <span className="border border-amber-200 bg-amber-50 px-2 py-1 text-[10px] uppercase tracking-wider text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-400">
                            Archived
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="mt-6 break-words text-lg font-semibold transition-colors group-hover:text-blue-800 dark:group-hover:text-blue-300">
                      {repo.name}
                    </h3>
                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-500 dark:text-zinc-400">
                      {repo.description ||
                        "No description provided for this repository."}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="border border-gray-100 bg-gray-50 px-2 py-1 text-[10px] text-gray-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-gray-100 pt-5 text-xs text-gray-500 dark:border-zinc-800 dark:text-zinc-400">
                      {repo.language && (
                        <span className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{
                              backgroundColor:
                                languageColors[repo.language] ||
                                "#64748b",
                            }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Star size={14} />
                        {formatNumber(repo.stargazers_count)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <GitFork size={14} />
                        {formatNumber(repo.forks_count)}
                      </span>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="text-[11px] text-gray-400 dark:text-zinc-500">
                        Updated {formatDate(repo.updated_at)}
                      </span>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${repo.name} on GitHub`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-800 transition-all hover:gap-2.5 dark:text-blue-300"
                      >
                        View repository
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4 text-xs text-gray-500 hover:text-blue-800 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-blue-300"
                      >
                        <Globe size={14} />
                        Live project demo
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-gray-300 px-6 py-20 text-center dark:border-zinc-700">
                <Search
                  size={28}
                  className="mx-auto text-gray-400"
                />
                <h3 className="mt-5 text-xl font-semibold">
                  No repositories found.
                </h3>
                <p className="mt-3 text-sm text-gray-500 dark:text-zinc-400">
                  Try searching with another keyword or changing
                  your language filter.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 bg-blue-800 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-600"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
        {/* =========================================
            CONTRIBUTION ACTIVITY
        ========================================= */}
        <section className="px-6 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
                Development Activity
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                My contribution journey.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-gray-600 dark:text-zinc-400">
                A visual overview of my GitHub activity,
                showing contributions and consistency over time.
              </p>
            </div>
            <div className="border border-gray-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Contribution calendar
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400">
                      GitHub public activity
                    </p>
                  </div>
                </div>
                <a
                  href={`${GITHUB_PROFILE_URL}?tab=overview`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-800 hover:text-blue-600 dark:text-blue-300"
                >
                  View activity
                  <ArrowUpRight size={15} />
                </a>
              </div>
              <div className="mt-8 overflow-x-auto">
                <img
                  src={CONTRIBUTION_GRAPH_URL}
                  alt={`GitHub contribution calendar for ${GITHUB_USERNAME}`}
                  className="mx-auto min-w-[650px] max-w-full"
                  loading="lazy"
                />
              </div>
              <p className="mt-5 text-xs leading-6 text-gray-400 dark:text-zinc-500">
                Contribution calendar provided by a third-party
                GitHub chart service. Visit GitHub for the
                authoritative contribution history.
              </p>
            </div>
          </div>
        </section>
        {/* =========================================
            OPEN SOURCE JOURNEY
        ========================================= */}
        <section className="border-y border-gray-200 bg-gray-50 px-6 py-20 dark:border-zinc-800 dark:bg-zinc-900/30 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
                My Approach
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Why I build in the open.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-gray-600 dark:text-zinc-400">
                Open source is more than publishing code.
                It is about learning, sharing knowledge,
                solving problems and building software together.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: Code2,
                  number: "01",
                  title: "Build & Experiment",
                  description:
                    "Create practical applications, developer utilities and experiments with modern technologies.",
                },
                {
                  icon: BookOpen,
                  number: "02",
                  title: "Learn & Share",
                  description:
                    "Explore new concepts, document useful discoveries and share knowledge with other developers.",
                },
                {
                  icon: GitPullRequest,
                  number: "03",
                  title: "Collaborate & Improve",
                  description:
                    "Contribute to useful projects, discuss ideas, fix issues and make software better together.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.number}
                    className="border border-gray-200 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-[5px_5px_0px_#193cb8] dark:border-zinc-800 dark:bg-zinc-950/70 dark:hover:shadow-[5px_5px_0px_#2563eb]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
                        <Icon size={22} />
                      </div>
                      <span className="font-mono text-xs text-blue-800 dark:text-blue-300">
                        {item.number}
                      </span>
                    </div>
                    <h3 className="mt-8 text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-gray-500 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* =========================================
            COLLABORATION CTA
        ========================================= */}
        <section className="px-6 py-24 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
                Let&apos;s Collaborate
              </p>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Great things happen when developers build together.
              </h2>
              <p className="mt-6 max-w-xl leading-7 text-gray-600 dark:text-zinc-400">
                Have an interesting open-source project?
                Found an issue in one of my repositories?
                Want to share an idea or collaborate?
                I&apos;d love to hear from you.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  <FaGithub size={17} />
                  Collaborate on GitHub
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 text-sm font-medium transition-colors hover:border-gray-900 dark:border-zinc-700 dark:hover:border-zinc-400"
                >
                  Get in touch
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
            <div className="border border-gray-200 bg-gray-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex h-12 w-12 items-center justify-center bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
                <Terminal size={23} />
              </div>
              <h3 className="mt-7 text-xl font-semibold">
                Open source starts with an idea.
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-zinc-400">
                Every contribution matters. Whether it&apos;s
                reporting a bug, improving documentation,
                suggesting a feature or writing code,
                your participation can make a difference.
              </p>
              <div className="mt-7 border-t border-gray-200 pt-6 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <Sparkles
                    size={18}
                    className="text-blue-800 dark:text-blue-300"
                  />
                  <p className="text-sm font-medium">
                    Let&apos;s make something useful.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* FOOTER */}
        <Footer />
      </main>
    </PageTransition>
  );
}
