import { getAuthenticatedUser } from "@/lib/auth";
import { connectDB } from "@/lib/connectDb";
import Article from "@/models/article.model";
import Project from "@/models/project.model";
import { logger } from "@/utils/logger";
import { NextResponse } from "next/server";

import type {
  DashboardContentStatus,
  DashboardResponse,
  RecentActivityItem,
  RecentContentItem,
} from "@/types/dashboard";

export const runtime = "nodejs";

function toIsoString(value: unknown): string {
  if (!value) {
    return new Date(0).toISOString();
  }

  const date = new Date(value as string | Date);

  if (Number.isNaN(date.getTime())) {
    return new Date(0).toISOString();
  }

  return date.toISOString();
}

export async function GET() {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const [
      projectsTotal,
      articlesTotal,
      publishedProjects,
      publishedArticles,
      draftProjects,
      draftArticles,
      recentProjects,
      recentArticles,
    ] = await Promise.all([
      Project.countDocuments({}),
      Article.countDocuments({}),
      Project.countDocuments({ published: true }),
      Article.countDocuments({ published: true }),
      Project.countDocuments({ published: false }),
      Article.countDocuments({ published: false }),
      Project.find({})
        .select("name slug published updatedAt")
        .sort({ updatedAt: -1 })
        .limit(5)
        .lean(),
      Article.find({})
        .select("title slug published updatedAt")
        .sort({ updatedAt: -1 })
        .limit(5)
        .lean(),
    ]);

    const recentContent: RecentContentItem[] = [
      ...recentProjects.map((project) => {
        const status: DashboardContentStatus = project.published ? "published" : "draft";

        return {
          id: String(project._id),
          title: String(project.name || "Untitled project"),
          type: "project" as const,
          status,
          updatedAt: toIsoString(project.updatedAt),
          slug: String(project.slug || ""),
        };
      }),
      ...recentArticles.map((article) => {
        const status: DashboardContentStatus = article.published ? "published" : "draft";

        return {
          id: String(article._id),
          title: String(article.title || "Untitled article"),
          type: "article" as const,
          status,
          updatedAt: toIsoString(article.updatedAt),
          slug: String(article.slug || ""),
        };
      }),
    ]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);

    const recentActivity: RecentActivityItem[] = recentContent.map((item) => ({
      id: item.id,
      title: item.type === "project" ? "Project updated" : "Article updated",
      description:
        item.status === "published"
          ? `${item.title} was published`
          : `${item.title} was updated`,
      type: item.type,
      timestamp: item.updatedAt,
    }));

    const response: DashboardResponse = {
      success: true,
      data: {
        stats: {
          projects: projectsTotal,
          articles: articlesTotal,
          published: publishedProjects + publishedArticles,
          drafts: draftProjects + draftArticles,
        },
        contentOverview: {
          projects: {
            total: projectsTotal,
            published: publishedProjects,
            drafts: draftProjects,
          },
          articles: {
            total: articlesTotal,
            published: publishedArticles,
            drafts: draftArticles,
          },
        },
        recentContent,
        recentActivity,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    logger.error(`Failed to load dashboard data ${error}`);

    return NextResponse.json(
      { success: false, error: "Unable to load dashboard data." },
      { status: 500 }
    );
  }
}
