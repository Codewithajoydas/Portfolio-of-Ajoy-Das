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
      priority: 0.8,
    },
    {
      url: absoluteUrl("/experience"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/skills"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/lab"),
      lastModified: generatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
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
    {
      url: absoluteUrl("/services"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/open-source"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/stack"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
  const labProjects = [
    "01-palindrome-checker",
    "02-random-quote-generator",
    "03-digital-clock",
    "04-todo-list-app",
    "05-form-validation",
    "06-typewriter-effect",
    "07-stopwatch-app",
    "08-rock-paper-scissors",
    "09-image-slider",
    "10-theme-toggle",
    "11-weather-app",
    "12-sticky-notes",
    "13-keyboard-events-game",
    "14-character-counter",
    "15-password-generator",
    "16-qr-code-generator",
    "17-drawing-app",
    "18-meme-generator",
    "19-currency-converter",
    "20-drag-drop-upload",
    "21-speech-to-text",
    "22-pomodoro-timer",
    "23-infinite-scroll",
    "24-clipboard-manager",
    "25-text-to-speech",
  ];
  const labUrls: MetadataRoute.Sitemap = labProjects.map((project, index) => ({
    url: absoluteUrl(`/projects/${project}/index.html`),
    lastModified: generatedAt,
    changeFrequency: "monthly",
    priority: index === 0 ? 0.8 : 0.6,
  }));
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
        : generatedAt,
      changeFrequency: "monthly",
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
        : generatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  return [
    ...staticPages,
    ...labUrls,
    ...projectUrls,
    ...articleUrls,
  ];
}
