"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Eye,
  FileText,
  FolderKanban,
  Globe2,
  Monitor,
  Smartphone,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Total Visitors",
    value: "12,842",
    change: "+18.2%",
    positive: true,
    icon: Users,
  },
  {
    title: "Page Views",
    value: "34,291",
    change: "+12.4%",
    positive: true,
    icon: Eye,
  },
  {
    title: "Projects",
    value: "14",
    change: "+2",
    positive: true,
    icon: FolderKanban,
  },
  {
    title: "Articles",
    value: "27",
    change: "+5",
    positive: true,
    icon: FileText,
  },
];

const topPages = [
  { page: "/", views: 8421 },
  { page: "/projects", views: 5234 },
  { page: "/projects/assign-meter", views: 3182 },
  { page: "/about", views: 2418 },
  { page: "/skills", views: 1892 },
];

const sources = [
  { name: "Google", value: "48.2%" },
  { name: "Direct", value: "27.6%" },
  { name: "GitHub", value: "13.4%" },
  { name: "LinkedIn", value: "6.1%" },
  { name: "Other", value: "4.7%" },
];

const recentActivity = [
  {
    title: "Project updated",
    description: "Assign Meter was updated",
    time: "12 min ago",
  },
  {
    title: "Article published",
    description: "Understanding JavaScript Closures",
    time: "2 hours ago",
  },
  {
    title: "Project created",
    description: "CLI Project Generator",
    time: "Yesterday",
  },
  {
    title: "Article updated",
    description: "Node.js File System Guide",
    time: "2 days ago",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor your portfolio performance and content.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm">
          <Globe2 className="size-4 text-muted-foreground" />
          <span>Last 30 days</span>
        </div>
      </div>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>

                <div className="rounded-lg bg-muted p-2">
                  <Icon className="size-4" />
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <h2 className="text-2xl font-bold tracking-tight">
                  {stat.value}
                </h2>

                <span
                  className={`flex items-center gap-1 text-xs font-medium ${
                    stat.positive
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.positive ? (
                    <ArrowUpRight className="size-3" />
                  ) : (
                    <ArrowDownRight className="size-3" />
                  )}

                  {stat.change}
                </span>
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                Compared with previous period
              </p>
            </div>
          );
        })}
      </section>

      {/* Analytics */}
      <section className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        {/* Visitor Chart */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">
                Visitors
              </h2>

              <p className="text-sm text-muted-foreground">
                Portfolio traffic over the last 30 days
              </p>
            </div>

            <span className="text-sm font-medium">
              12,842 visitors
            </span>
          </div>

          {/* Demo chart */}
          <div className="mt-8 flex h-64 items-end gap-2 border-b border-l px-4 pb-0">
            {[
              32, 45, 38, 52, 48, 61, 55, 72, 64, 78,
              69, 82, 74, 91, 83, 96, 88, 76, 84, 92,
              80, 87, 95, 89, 100, 93, 86, 98, 91, 100,
            ].map((height, index) => (
              <div
                key={index}
                className="group relative flex h-full flex-1 items-end"
              >
                <div
                  className="w-full rounded-t-sm bg-primary/80 transition-colors group-hover:bg-primary"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-between text-xs text-muted-foreground">
            <span>Aug 30</span>
            <span>Sep 07</span>
            <span>Sep 14</span>
            <span>Sep 21</span>
            <span>Sep 28</span>
          </div>
        </div>

        {/* Devices */}
        <div className="rounded-xl border bg-card p-6">
          <div>
            <h2 className="font-semibold">
              Devices
            </h2>

            <p className="text-sm text-muted-foreground">
              Visitors by device
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Monitor className="size-4" />
                  <span className="text-sm">Desktop</span>
                </div>

                <span className="text-sm font-medium">
                  64%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[64%] rounded-full bg-primary" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="size-4" />
                  <span className="text-sm">Mobile</span>
                </div>

                <span className="text-sm font-medium">
                  31%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[31%] rounded-full bg-primary" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Monitor className="size-4" />
                  <span className="text-sm">Tablet</span>
                </div>

                <span className="text-sm font-medium">
                  5%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[5%] rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Top Pages */}
        <div className="rounded-xl border bg-card p-6">
          <div className="mb-5">
            <h2 className="font-semibold">
              Top Pages
            </h2>

            <p className="text-sm text-muted-foreground">
              Most visited pages
            </p>
          </div>

          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div
                key={page.page}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-medium">
                    {index + 1}
                  </span>

                  <span className="truncate text-sm font-medium">
                    {page.page}
                  </span>
                </div>

                <span className="shrink-0 text-xs text-muted-foreground">
                  {page.views.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="rounded-xl border bg-card p-6">
          <div className="mb-5">
            <h2 className="font-semibold">
              Traffic Sources
            </h2>

            <p className="text-sm text-muted-foreground">
              Where your visitors come from
            </p>
          </div>

          <div className="space-y-4">
            {sources.map((source) => (
              <div
                key={source.name}
                className="flex items-center justify-between"
              >
                <span className="text-sm">
                  {source.name}
                </span>

                <span className="text-sm font-semibold">
                  {source.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border bg-card p-6">
          <div className="mb-5">
            <h2 className="font-semibold">
              Recent Activity
            </h2>

            <p className="text-sm text-muted-foreground">
              Latest changes
            </p>
          </div>

          <div className="space-y-5">
            {recentActivity.map((activity) => (
              <div
                key={`${activity.title}-${activity.time}`}
                className="flex gap-3"
              >
                <div className="mt-1 size-2 shrink-0 rounded-full bg-primary" />

                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    {activity.title}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    {activity.description}
                  </p>

                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}