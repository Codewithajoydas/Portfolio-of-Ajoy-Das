import { absoluteUrl } from "@/lib/seo";
import { connectDB } from "@/lib/connectDb";
import ArticleModel from "@/models/article.model";
import type { Article } from "@/types/article/Article";

export function safeString(value: unknown, fallback = ""): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    return fallback;
  }

  return value.trim();
}

export function safeUrl(value: unknown): string | null {
  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }

  try {
    const url = new URL(value.trim());

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

export function safeDate(value: unknown, fallback = ""): string {
  if (!value) {
    return fallback;
  }

  try {
    const date = new Date(value as string | number | Date);

    if (Number.isNaN(date.getTime())) {
      return fallback;
    }

    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return fallback;
  }
}

export function safeDateTime(value: unknown): string | undefined {
  if (!value) {
    return undefined;
  }

  try {
    const date = new Date(value as string | number | Date);

    if (Number.isNaN(date.getTime())) {
      return undefined;
    }

    return date.toISOString();
  } catch {
    return undefined;
  }
}

export function parseTags(value: unknown): string[] {
  if (typeof value !== "string" || value.trim().length === 0) {
    return [];
  }

  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  await connectDB();

  const articleDocument = await ArticleModel.findOne({
    slug,
    published: true,
  })
    .lean()
    .exec();

  return articleDocument ? (articleDocument as unknown as Article) : null;
}

export function getArticlePageMeta(article: Article, fallbackSlug: string) {
  const articleTitle = safeString(article.title, "Untitled Article");
  const finalSlug = safeString(article.slug, fallbackSlug);
  const category = safeString(article.category, "Technology");
  const excerpt = safeString(article.excerpt, "No description available.");
  const content = safeString(article.content, "Content is not available.");
  const image = safeUrl(article.coverImage) || safeUrl(article.thumbnail);
  const githubUrl = safeUrl(article.githubUrl);
  const sourceUrl = safeUrl(article.sourceUrl);
  const demoUrl = safeUrl(article.demoUrl);
  const tags = parseTags(article.tags);
  const readingTime =
    typeof article.readingTime === "number" &&
    Number.isFinite(article.readingTime) &&
    article.readingTime > 0
      ? Math.floor(article.readingTime)
      : null;

  const articleUrl = absoluteUrl(`/articles/${finalSlug}`);
  const publishedTime = safeDateTime(article.createdAt);
  const modifiedTime = safeDateTime(article.updatedAt);
  const createdDate = safeDate(article.createdAt, "");
  const updatedDate = safeDate(article.updatedAt, "");
  const hasUpdatedDate = Boolean(updatedDate && createdDate && updatedDate !== createdDate);

  return {
    articleTitle,
    finalSlug,
    category,
    excerpt,
    content,
    image,
    githubUrl,
    sourceUrl,
    demoUrl,
    tags,
    readingTime,
    articleUrl,
    publishedTime,
    modifiedTime,
    createdDate,
    updatedDate,
    hasUpdatedDate,
  };
}

export function buildArticleStructuredData(article: Article, meta: ReturnType<typeof getArticlePageMeta>) {
  const { articleTitle, articleUrl, category, excerpt, tags, readingTime, image, publishedTime, modifiedTime } = meta;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        headline: articleTitle,
        description: excerpt,
        url: articleUrl,
        ...(publishedTime ? { datePublished: publishedTime } : {}),
        ...(modifiedTime ? { dateModified: modifiedTime } : {}),
        author: {
          "@type": "Person",
          name: "Ajoy Das",
          url: absoluteUrl("/"),
        },
        publisher: {
          "@type": "Person",
          name: "Ajoy Das",
          url: absoluteUrl("/"),
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
        ...(image ? { image: [image] } : {}),
        articleSection: category,
        ...(tags.length > 0 ? { keywords: tags.join(", ") } : {}),
        ...(readingTime ? { timeRequired: `PT${readingTime}M` } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Articles",
            item: absoluteUrl("/articles"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: articleTitle,
            item: articleUrl,
          },
        ],
      },
    ],
  };
}
