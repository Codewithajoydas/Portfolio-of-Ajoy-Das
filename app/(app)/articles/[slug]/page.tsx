import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import Footer from "@/components/Footer";

import {
  absoluteUrl,
  safeJsonLd,
} from "@/lib/seo";

import { connectDB } from "@/lib/connectDb";
import ArticleModel from "@/models/article.model";

type Article = {
  id?: string;
  _id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  thumbnail?: string;
  category?: string;
  readingTime?: number;
  tags?: string;
  published?: boolean;
  featured?: boolean;
  comments?: boolean;
  sourceUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

/**
 * Safely convert a value to a non-empty string.
 */
function safeString(
  value: unknown,
  fallback = "",
): string {
  return typeof value === "string" &&
    value.trim().length > 0
    ? value
    : fallback;
}

/**
 * Safely validate an external URL.
 */
function safeUrl(
  value: unknown,
): string | null {
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
  fallback = "",
): string {
  if (!value) {
    return fallback;
  }

  const date = new Date(
    value as string | number | Date,
  );

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
  value: unknown,
): string | undefined {
  if (!value) {
    return undefined;
  }

  const date = new Date(
    value as string | number | Date,
  );

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

/**
 * Safely parse comma-separated tags.
 */
function parseTags(
  value: unknown,
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

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticleDetailsPage({
  params,
}: PageProps) {
  /*
   * Get slug directly from the server-side route.
   *
   * Example:
   * /articles/my-first-article
   *
   * slug = "my-first-article"
   */
  const { slug } = await params;

  const articleSlug = safeString(slug);

  if (!articleSlug) {
    notFound();
  }

  /*
   * Connect directly to MongoDB.
   */
  await connectDB();

  /*
   * Fetch ONLY the requested published article.
   *
   * No API request.
   * No useEffect.
   * No client-side filtering.
   */
  const articleDocument = await ArticleModel.findOne({
    slug: articleSlug,
    published: true,
  }).lean();

  /*
   * If article doesn't exist, show Next.js 404 page.
   */
  if (!articleDocument) {
    notFound();
  }

  /*
   * Convert the MongoDB document into the shape
   * used by the component.
   */
  const article = articleDocument as unknown as Article;

  /*
   * Defensive article values.
   */
  const articleTitle = safeString(
    article.title,
    "Untitled Article",
  );

  const finalSlug = safeString(
    article.slug,
    articleSlug,
  );

  const category = safeString(
    article.category,
    "Technology",
  );

  const excerpt = safeString(
    article.excerpt,
    "No description available.",
  );

  const content = safeString(
    article.content,
    "Content is not available.",
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

  const tags = parseTags(article.tags);

  const createdAt =
    article.createdAt;

  const updatedAt =
    article.updatedAt;

  const readingTime =
    typeof article.readingTime === "number" &&
    Number.isFinite(article.readingTime) &&
    article.readingTime > 0
      ? Math.floor(article.readingTime)
      : null;

  const articleUrl = absoluteUrl(
    `/articles/${finalSlug}`,
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
              "/articles",
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

  const createdDate = safeDate(
    createdAt,
    "",
  );

  const updatedDate = safeDate(
    updatedAt,
    "",
  );

  const hasUpdatedDate =
    Boolean(
      updatedDate &&
        createdDate &&
        updatedDate !== createdDate,
    );

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={safeJsonLd(
          structuredData,
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
                  ),
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
                        "language-",
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