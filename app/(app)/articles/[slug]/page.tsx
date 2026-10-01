import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

import Footer from "@/components/Footer";

import {
  getArticleBySlug,
  getArticles,
} from "@/lib/content-api";

import {
  absoluteUrl,
  safeJsonLd,
} from "@/lib/seo";

import { FaGithub } from "react-icons/fa";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Safely convert a value to a non-empty string.
 */
function safeString(
  value: unknown,
  fallback = ""
): string {
  return typeof value === "string" &&
    value.trim().length > 0
    ? value
    : fallback;
}

/**
 * Safely validate an external URL.
 */
function safeUrl(value: unknown): string | null {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    return null;
  }

  try {
    const url = new URL(value);

    if (
      url.protocol !== "http:" &&
      url.protocol !== "https:"
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

/**
 * Safely format dates.
 */
function safeDate(
  value: unknown,
  fallback = "Unknown date"
): string {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    return fallback;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return fallback;
  }

  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Safely return an ISO-compatible date string.
 */
function safeDateTime(
  value: unknown
): string | undefined {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

/**
 * Safely parse comma-separated tags.
 */
function parseTags(
  value: unknown
): string[] {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    return [];
  }

  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

/**
 * Generate static article routes.
 *
 * A failed/malformed API response will not crash
 * this function.
 */
export async function generateStaticParams() {
  try {
    const articles = await getArticles();

    if (!Array.isArray(articles)) {
      return [];
    }

    return articles
      .filter(
        (article) =>
          article &&
          article.published === true &&
          typeof article.slug === "string" &&
          article.slug.trim().length > 0
      )
      .map((article) => ({
        slug: article.slug,
      }));
  } catch (error) {
    console.error(
      "Failed to generate article static params:",
      error
    );

    return [];
  }
}

/**
 * Generate SEO metadata.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article =
      await getArticleBySlug(slug);

    if (!article) {
      return {
        title: "Article Not Found",

        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const title =
      safeString(article.seoTitle) ||
      safeString(article.title, "Article");

    const description =
      safeString(article.seoDescription) ||
      safeString(
        article.excerpt,
        "Read this article by Ajoy Das."
      );

    const image =
      safeUrl(article.coverImage) ||
      safeUrl(article.thumbnail);

    const articleSlug =
      safeString(article.slug, slug);

    const canonicalFromArticle =
      safeUrl(article.canonicalUrl);

    const canonical =
      canonicalFromArticle ||
      absoluteUrl(
        `/articles/${articleSlug}`
      );

    const category =
      safeString(
        article.category,
        "Technology"
      );

    const tags = parseTags(article.tags);

    const publishedTime =
      safeDateTime(article.createdAt);

    const modifiedTime =
      safeDateTime(article.updatedAt);

    return {
      title,

      description,

      keywords:
        tags.length > 0
          ? tags
          : undefined,

      alternates: {
        canonical,
      },

      robots: {
        index: true,
        follow: true,

        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },

      openGraph: {
        type: "article",

        title,

        description,

        url: canonical,

        siteName: "Ajoy Das",

        ...(publishedTime
          ? {
              publishedTime,
            }
          : {}),

        ...(modifiedTime
          ? {
              modifiedTime,
            }
          : {}),

        authors: ["Ajoy Das"],

        section: category,

        ...(tags.length > 0
          ? {
              tags,
            }
          : {}),

        images: image
          ? [
              {
                url: image,
                width: 1200,
                height: 630,
                alt: title,
              },
            ]
          : undefined,
      },

      twitter: {
        card: "summary_large_image",

        title,

        description,

        images: image
          ? [image]
          : undefined,
      },
    };
  } catch (error) {
    console.error(
      `Failed to generate metadata for article "${slug}":`,
      error
    );

    return {
      title: "Article",

      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function ArticleDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  let article;

  try {
    article =
      await getArticleBySlug(slug);
  } catch (error) {
    console.error(
      `Failed to load article "${slug}":`,
      error
    );

    notFound();
  }

  if (!article) {
    notFound();
  }

  /*
   * Defensive article values.
   */

  const articleTitle =
    safeString(
      article.title,
      "Untitled Article"
    );

  const articleSlug =
    safeString(
      article.slug,
      slug
    );

  const category =
    safeString(
      article.category,
      "Technology"
    );

  const excerpt =
    safeString(
      article.excerpt,
      "No description available."
    );

  const content =
    safeString(
      article.content,
      "Content is not available."
    );

  const image =
    safeUrl(article.coverImage) ||
    safeUrl(article.thumbnail);

  const githubUrl =
    safeUrl(article.githubUrl);

  const sourceUrl =
    safeUrl(article.sourceUrl);

  const demoUrl =
    safeUrl(article.demoUrl);

  const tags =
    parseTags(article.tags);

  const createdAt =
    safeString(article.createdAt);

  const updatedAt =
    safeString(article.updatedAt);

  const readingTime =
    typeof article.readingTime === "number" &&
    Number.isFinite(article.readingTime) &&
    article.readingTime > 0
      ? Math.floor(article.readingTime)
      : null;

  const articleUrl = absoluteUrl(
    `/articles/${articleSlug}`
  );

  const publishedTime =
    safeDateTime(createdAt);

  const modifiedTime =
    safeDateTime(updatedAt);

  /*
   * Structured data.
   */
  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "BlogPosting",

        "@id": `${articleUrl}#article`,

        headline: articleTitle,

        description: excerpt,

        url: articleUrl,

        ...(publishedTime
          ? {
              datePublished:
                publishedTime,
            }
          : {}),

        ...(modifiedTime
          ? {
              dateModified:
                modifiedTime,
            }
          : {}),

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

        ...(image
          ? {
              image: [image],
            }
          : {}),

        articleSection: category,

        ...(tags.length > 0
          ? {
              keywords:
                tags.join(", "),
            }
          : {}),

        ...(readingTime
          ? {
              timeRequired:
                `PT${readingTime}M`,
            }
          : {}),
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

            item: absoluteUrl(
              "/articles"
            ),
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

  const createdDate =
    safeDate(
      createdAt,
      ""
    );

  const updatedDate =
    safeDate(
      updatedAt,
      ""
    );

  const hasUpdatedDate =
    Boolean(
      updatedDate &&
        createdDate &&
        updatedDate !== createdDate
    );

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={safeJsonLd(
          structuredData
        )}
      />

      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-5 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} />

            All articles
          </Link>
        </div>
      </header>

      <article>
        {/* Article Header */}
        <header className="border-b border-gray-200 px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-4xl">
            {/* Category / Reading Time */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium uppercase tracking-[0.15em] text-blue-800">
              <span>
                {category}
              </span>

              {readingTime && (
                <span className="text-gray-400">
                  {readingTime} min read
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {articleTitle}
            </h1>

            {/* Excerpt */}
            <p className="mt-8 max-w-3xl text-xl leading-8 text-gray-600">
              {excerpt}
            </p>

            {/* Dates */}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {createdDate && (
                <time
                  dateTime={
                    publishedTime ||
                    undefined
                  }
                >
                  {createdDate}
                </time>
              )}

              {hasUpdatedDate && (
                <>
                  <span>·</span>

                  <span>
                    Updated{" "}
                    {updatedDate}
                  </span>
                </>
              )}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map(
                  (tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            )}

            {/* Cover Image */}
            {image && (
              <div className="mt-12 overflow-hidden border border-gray-200">
                <img
                  src={image}
                  alt={articleTitle}
                  className="w-full object-cover"
                  fetchPriority="high"
                />
              </div>
            )}
          </div>
        </header>

        {/* Article Content */}
        <section className="px-6 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[
                  remarkGfm,
                ]}
                components={{
                  h1: ({
                    children,
                  }) => (
                    <h2 className="mb-6 mt-12 text-4xl font-semibold tracking-tight">
                      {children}
                    </h2>
                  ),

                  h2: ({
                    children,
                  }) => (
                    <h2 className="mb-5 mt-12 text-3xl font-semibold tracking-tight">
                      {children}
                    </h2>
                  ),

                  h3: ({
                    children,
                  }) => (
                    <h3 className="mb-4 mt-10 text-2xl font-semibold tracking-tight">
                      {children}
                    </h3>
                  ),

                  h4: ({
                    children,
                  }) => (
                    <h4 className="mb-3 mt-8 text-xl font-semibold">
                      {children}
                    </h4>
                  ),

                  p: ({
                    children,
                  }) => (
                    <p className="mb-6 text-lg leading-8 text-gray-700">
                      {children}
                    </p>
                  ),

                  a: ({
                    href,
                    children,
                  }) => {
                    const validHref =
                      safeUrl(href);

                    if (!validHref) {
                      return (
                        <span className="font-medium text-blue-800">
                          {children}
                        </span>
                      );
                    }

                    return (
                      <a
                        href={validHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-800 underline underline-offset-4"
                      >
                        {children}
                      </a>
                    );
                  },

                  ul: ({
                    children,
                  }) => (
                    <ul className="mb-6 ml-6 list-disc space-y-2 text-gray-700">
                      {children}
                    </ul>
                  ),

                  ol: ({
                    children,
                  }) => (
                    <ol className="mb-6 ml-6 list-decimal space-y-2 text-gray-700">
                      {children}
                    </ol>
                  ),

                  li: ({
                    children,
                  }) => (
                    <li className="pl-1 leading-8">
                      {children}
                    </li>
                  ),

                  blockquote: ({
                    children,
                  }) => (
                    <blockquote className="my-8 border-l-4 border-blue-800 bg-gray-50 px-6 py-5 text-gray-600">
                      {children}
                    </blockquote>
                  ),

                  code: ({
                    children,
                    className,
                  }) => {
                    const isBlock =
                      className?.includes(
                        "language-"
                      );

                    if (!isBlock) {
                      return (
                        <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-blue-800">
                          {children}
                        </code>
                      );
                    }

                    return (
                      <code className="font-mono text-sm leading-7 text-gray-100">
                        {children}
                      </code>
                    );
                  },

                  pre: ({
                    children,
                  }) => (
                    <pre className="my-8 overflow-x-auto border border-gray-800 bg-gray-950 p-6 shadow-[6px_6px_0px_#193cb8]">
                      {children}
                    </pre>
                  ),

                  img: ({
                    src,
                    alt,
                  }) => {
                    const validSrc =
                      safeUrl(src);

                    if (!validSrc) {
                      return null;
                    }

                    return (
                      <img
                        src={validSrc}
                        alt={alt || ""}
                        loading="lazy"
                        className="my-8 max-w-full border border-gray-200"
                      />
                    );
                  },

                  table: ({
                    children,
                  }) => (
                    <div className="my-8 overflow-x-auto border border-gray-200">
                      <table className="w-full border-collapse text-left text-sm">
                        {children}
                      </table>
                    </div>
                  ),

                  th: ({
                    children,
                  }) => (
                    <th className="border-b border-gray-200 bg-gray-50 px-4 py-3 font-semibold">
                      {children}
                    </th>
                  ),

                  td: ({
                    children,
                  }) => (
                    <td className="border-b border-gray-100 px-4 py-3 text-gray-600">
                      {children}
                    </td>
                  ),

                  hr: () => (
                    <hr className="my-12 border-gray-200" />
                  ),

                  strong: ({
                    children,
                  }) => (
                    <strong className="font-semibold text-gray-900">
                      {children}
                    </strong>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>

            {/* External Links */}
            {(githubUrl ||
              sourceUrl ||
              demoUrl) && (
              <div className="mt-16 flex flex-wrap gap-3 border-t border-gray-200 pt-8">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-900 px-5 py-3 text-sm font-medium text-white"
                  >
                    <FaGithub
                      size={16}
                    />

                    GitHub
                  </a>
                )}

                {sourceUrl && (
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-gray-300 px-5 py-3 text-sm font-medium"
                  >
                    Source

                    <ExternalLink
                      size={15}
                    />
                  </a>
                )}

                {demoUrl && (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-gray-300 px-5 py-3 text-sm font-medium"
                  >
                    Demo

                    <ExternalLink
                      size={15}
                    />
                  </a>
                )}
              </div>
            )}
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}