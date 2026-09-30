import type { MetadataRoute } from "next";

import {
  getArticles,
  getProjects,
} from "@/lib/content-api";

import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, articles] =
    await Promise.all([
      getProjects(),
      getArticles(),
    ]);

  const projectUrls = projects
    .filter((project) => project.published)
    .map((project) => ({
      url: absoluteUrl(
        `/projects/${project.slug}`,
      ),

      lastModified: new Date(
        project.updatedAt,
      ),

      changeFrequency:
        "monthly" as const,

      priority: 0.7,
    }));

  const articleUrls = articles
    .filter((article) => article.published)
    .map((article) => ({
      url: absoluteUrl(
        `/articles/${article.slug}`,
      ),

      lastModified: new Date(
        article.updatedAt,
      ),

      changeFrequency:
        "weekly" as const,

      priority: 0.8,
    }));

  return [
    {
      url: absoluteUrl("/"),

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 1,
    },

    {
      url: absoluteUrl("/projects"),

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 0.8,
    },

    {
      url: absoluteUrl("/articles"),

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 0.9,
    },

    ...projectUrls,

    ...articleUrls,
  ];
}