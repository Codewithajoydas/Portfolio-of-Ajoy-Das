import type { MetadataRoute } from "next";

import { connectDB } from "@/lib/connectDb";
import { absoluteUrl } from "@/lib/seo";

import ArticleModel from "@/models/article.model";
import ProjectModel from "@/models/project.model";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();

  const generatedAt = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: generatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/experience"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/skills"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/lab"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: generatedAt,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: generatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/articles"),
      lastModified: generatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const [projects, articles] = await Promise.all([
    ProjectModel.find({ published: true })
      .select("slug updatedAt")
      .lean()
      .exec(),

    ArticleModel.find({ published: true })
      .select("slug updatedAt")
      .lean()
      .exec(),
  ]);

  const projectUrls: MetadataRoute.Sitemap = projects
    .filter(
      (project) =>
        typeof project.slug === "string" &&
        project.slug.trim().length > 0,
    )
    .map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: project.updatedAt
        ? new Date(project.updatedAt)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const articleUrls: MetadataRoute.Sitemap = articles
    .filter(
      (article) =>
        typeof article.slug === "string" &&
        article.slug.trim().length > 0,
    )
    .map((article) => ({
      url: absoluteUrl(`/articles/${article.slug}`),
      lastModified: article.updatedAt
        ? new Date(article.updatedAt)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [
    ...staticPages,
    ...projectUrls,
    ...articleUrls,
  ];
}