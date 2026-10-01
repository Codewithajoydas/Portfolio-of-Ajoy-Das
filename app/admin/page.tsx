"use client";

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileEdit,
  FileText,
  FolderKanban,
  Loader2,
  Plus,
  Settings2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type {
  DashboardResponse,
  RecentActivityItem,
  RecentContentItem,
} from "@/types/dashboard";

const quickActions = [
  {
    title: "New Project",
    description: "Create a new portfolio project",
    icon: Plus,
    link: "/admin/projects",
  },
  {
    title: "New Article",
    description: "Write and publish an article",
    icon: FileText,
    link: "/admin/articles",
  },
  {
    title: "Manage Projects",
    description: "View and manage your projects",
    icon: FolderKanban,
    link: "/admin/projects",
  },
  {
    title: "Manage Articles",
    description: "View and manage your articles",
    icon: Settings2,
    link: "/admin/articles",
  },
];

const emptyDashboard: DashboardResponse["data"] = {
  stats: {
    projects: 0,
    articles: 0,
    published: 0,
    drafts: 0,
  },
  contentOverview: {
    projects: {
      total: 0,
      published: 0,
      drafts: 0,
    },
    articles: {
      total: 0,
      published: 0,
      drafts: 0,
    },
  },
  recentContent: [],
  recentActivity: [],
};

function formatStatusText(status: RecentContentItem["status"]) {
  return status === "published" ? "Published" : "Draft";
}

function formatTypeText(type: RecentContentItem["type"]) {
  return type === "project" ? "Project" : "Article";
}

function getActivityIcon(type: RecentActivityItem["type"]) {
  return type === "project" ? FolderKanban : FileText;
}

function formatRelativeTime(value?: string) {
  if (!value) {
    return "Recently";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const diffMs = date.getTime() - Date.now();
  const diffMinutes = Math.round(Math.abs(diffMs) / 60000);

  if (diffMinutes < 1) {
    return "Just now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);

  if (Math.abs(diffHours) < 24) {
    return `${diffHours} hour${Math.abs(diffHours) === 1 ? "" : "s"} ago`;
  }

  const diffDays = Math.round(diffHours / 24);

  return `${diffDays} day${Math.abs(diffDays) === 1 ? "" : "s"} ago`;
}

function normalizeDashboard(data?: Partial<DashboardResponse["data"]> | null): DashboardResponse["data"] {
  const source = data ?? emptyDashboard;

  return {
    stats: {
      projects: Number(source.stats?.projects ?? 0),
      articles: Number(source.stats?.articles ?? 0),
      published: Number(source.stats?.published ?? 0),
      drafts: Number(source.stats?.drafts ?? 0),
    },
    contentOverview: {
      projects: {
        total: Number(source.contentOverview?.projects?.total ?? 0),
        published: Number(source.contentOverview?.projects?.published ?? 0),
        drafts: Number(source.contentOverview?.projects?.drafts ?? 0),
      },
      articles: {
        total: Number(source.contentOverview?.articles?.total ?? 0),
        published: Number(source.contentOverview?.articles?.published ?? 0),
        drafts: Number(source.contentOverview?.articles?.drafts ?? 0),
      },
    },
    recentContent: Array.isArray(source.recentContent) ? source.recentContent : [],
    recentActivity: Array.isArray(source.recentActivity) ? source.recentActivity : [],
  };
}

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardResponse["data"]>(emptyDashboard);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/dashboard", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const payload = (await response.json()) as Partial<DashboardResponse>;

      if (!payload?.success || !payload.data) {
        throw new Error("Invalid dashboard payload");
      }

      setDashboard(normalizeDashboard(payload.data));
    } catch {
      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchDashboard();
  }, []);

  const stats = useMemo(
    () => [
      {
        title: "Projects",
        value: dashboard.stats.projects,
        description: "Total projects",
        icon: FolderKanban,
      },
      {
        title: "Articles",
        value: dashboard.stats.articles,
        description: "Total articles",
        icon: FileText,
      },
      {
        title: "Published",
        value: dashboard.stats.published,
        description: "Published content",
        icon: CheckCircle2,
      },
      {
        title: "Drafts",
        value: dashboard.stats.drafts,
        description: "Content in draft",
        icon: FileEdit,
      },
    ],
    [dashboard.stats]
  );

  const contentOverview = useMemo(
    () => [
      {
        type: "Projects",
        published: dashboard.contentOverview.projects.published,
        drafts: dashboard.contentOverview.projects.drafts,
        total: dashboard.contentOverview.projects.total,
      },
      {
        type: "Articles",
        published: dashboard.contentOverview.articles.published,
        drafts: dashboard.contentOverview.articles.drafts,
        total: dashboard.contentOverview.articles.total,
      },
    ],
    [dashboard.contentOverview]
  );

  const lastUpdated =
    dashboard.recentContent[0]?.updatedAt ??
    dashboard.recentActivity[0]?.timestamp ??
    undefined;

  return (
    <main className="min-h-screen bg-background p-6 md:p-8">
      <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your portfolio, projects, articles, and content.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm">
          <Clock3 className="size-4 text-muted-foreground" />

          <div>
            <p className="text-xs text-muted-foreground">Last updated</p>

            <p className="font-medium">
              {loading ? "Loading..." : formatRelativeTime(lastUpdated)}
            </p>
          </div>
        </div>
      </header>

      {loading ? (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-xl border bg-card p-5">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 animate-pulse rounded-lg bg-muted" />
              </div>

              <div className="mt-5 space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="h-8 w-20 animate-pulse rounded bg-muted" />
                <div className="h-3 w-28 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </section>
      ) : error ? (
        <div className="rounded-xl border border-destructive/30 bg-card p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-5" />
          </div>

          <h2 className="text-lg font-semibold">Unable to load dashboard data.</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            There was a problem retrieving your content summary.
          </p>

          <button
            type="button"
            onClick={() => void fetchDashboard()}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            <Loader2 className="size-4 animate-spin" />
            Retry
          </button>
        </div>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div key={stat.title} className="rounded-xl border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <div className="rounded-lg bg-muted p-2">
                      <Icon className="size-5" />
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>

                    <h2 className="mt-1 text-3xl font-bold tracking-tight">{stat.value}</h2>

                    <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                </div>
              );
            })}
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="rounded-xl border bg-card p-6">
              <div className="mb-6">
                <h2 className="font-semibold">Content Overview</h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Overview of your published and draft content.
                </p>
              </div>

              <div className="space-y-7">
                {contentOverview.map((content) => {
                  const publishedPercentage = content.total > 0 ? (content.published / content.total) * 100 : 0;

                  return (
                    <div key={content.type}>
                      <div className="mb-3 flex items-center justify-between">
                        <span className="font-medium">{content.type}</span>

                        <span className="text-sm text-muted-foreground">{content.total} total</span>
                      </div>

                      <div className="mb-3">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Published</span>

                          <span className="font-medium">{content.published}</span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${publishedPercentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Drafts</span>

                        <span className="font-medium">{content.drafts}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <div className="mb-6">
                <h2 className="font-semibold">Quick Actions</h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Quickly manage your portfolio content.
                </p>
              </div>

              <div className="grid gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <button
                      key={action.title}
                      type="button"
                      onClick={() => {
                        window.location.href = action.link;
                      }}
                      className="group flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted"
                    >
                      <div className="rounded-lg bg-muted p-2 group-hover:bg-background">
                        <Icon className="size-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{action.title}</p>

                        <p className="truncate text-xs text-muted-foreground">{action.description}</p>
                      </div>

                      <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="rounded-xl border bg-card p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">Recent Content</h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Recently created or updated content.
                  </p>
                </div>

                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium hover:underline"
                >
                  View all
                  <ArrowRight className="size-4" />
                </button>
              </div>

              {dashboard.recentContent.length === 0 ? (
                <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                  No recent content yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {dashboard.recentContent.map((content) => (
                    <div
                      key={content.id}
                      className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="rounded-lg bg-muted p-2">
                          {content.type === "project" ? (
                            <FolderKanban className="size-4" />
                          ) : (
                            <FileText className="size-4" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{content.title}</p>

                          <p className="mt-1 text-xs text-muted-foreground">{formatTypeText(content.type)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:justify-end">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            content.status === "published"
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {formatStatusText(content.status)}
                        </span>

                        <span className="text-xs text-muted-foreground">
                          {formatRelativeTime(content.updatedAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-xl border bg-card p-6">
              <div className="mb-6">
                <h2 className="font-semibold">Recent Activity</h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Latest changes across your portfolio.
                </p>
              </div>

              {dashboard.recentActivity.length === 0 ? (
                <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                  No recent activity yet.
                </div>
              ) : (
                <div className="space-y-6">
                  {dashboard.recentActivity.map((activity) => {
                    const Icon = getActivityIcon(activity.type);

                    return (
                      <div key={activity.id} className="flex gap-3">
                        <div className="mt-0.5 rounded-lg bg-muted p-2">
                          <Icon className="size-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium">{activity.title}</p>

                          <p className="mt-1 text-xs text-muted-foreground">{activity.description}</p>

                          <p className="mt-1.5 text-[11px] text-muted-foreground">
                            {formatRelativeTime(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
