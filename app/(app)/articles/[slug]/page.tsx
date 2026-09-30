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

export async function generateStaticParams() {
  const articles = await getArticles();

  return articles
    .filter((article) => article.published)
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

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
    article.seoTitle ||
    `${article.title}`;

  const description =
    article.seoDescription ||
    article.excerpt;

  const image =
    article.coverImage ||
    article.thumbnail;

  const canonical =
    article.canonicalUrl ||
    absoluteUrl(
      `/articles/${article.slug}`,
    );

  const tags = article.tags
    ? article.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : undefined;

  return {
    title,

    description,

    keywords: tags,

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

      publishedTime:
        article.createdAt,

      modifiedTime:
        article.updatedAt,

      authors: ["Ajoy Das"],

      section: article.category,

      tags,

      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: article.title,
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
}

export default async function ArticleDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const article =
    await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleUrl = absoluteUrl(
    `/articles/${article.slug}`,
  );

  const image =
    article.coverImage ||
    article.thumbnail;

  const tags = article.tags
    ? article.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "BlogPosting",

        "@id": `${articleUrl}#article`,

        headline: article.title,

        description: article.excerpt,

        url: articleUrl,

        datePublished:
          article.createdAt,

        dateModified:
          article.updatedAt,

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

        articleSection:
          article.category,

        ...(tags.length > 0
          ? {
              keywords:
                tags.join(", "),
            }
          : {}),

        ...(article.readingTime
          ? {
              timeRequired: `PT${article.readingTime}M`,
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

            item: absoluteUrl("/articles"),
          },

          {
            "@type": "ListItem",

            position: 3,

            name: article.title,

            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={safeJsonLd(
          structuredData,
        )}
      />

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
        <header className="border-b border-gray-200 px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium uppercase tracking-[0.15em] text-blue-800">
              <span>
                {article.category}
              </span>

              {article.readingTime && (
                <span className="text-gray-400">
                  {article.readingTime} min read
                </span>
              )}
            </div>

            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {article.title}
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-8 text-gray-600">
              {article.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <time
                dateTime={article.createdAt}
              >
                {new Date(
                  article.createdAt,
                ).toLocaleDateString(
                  "en-IN",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </time>

              {article.updatedAt !==
                article.createdAt && (
                <>
                  <span>·</span>

                  <span>
                    Updated{" "}
                    {new Date(
                      article.updatedAt,
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </span>
                </>
              )}
            </div>

            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {image && (
              <div className="mt-12 overflow-hidden border border-gray-200">
                <img
                  src={image}
                  alt={article.title}
                  className="w-full object-cover"
                  fetchPriority="high"
                />
              </div>
            )}
          </div>
        </header>

        <section className="px-6 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[
                  remarkGfm,
                ]}
                components={{
                  h1: ({ children }) => (
                    <h2 className="mb-6 mt-12 text-4xl font-semibold tracking-tight">
                      {children}
                    </h2>
                  ),

                  h2: ({ children }) => (
                    <h2 className="mb-5 mt-12 text-3xl font-semibold tracking-tight">
                      {children}
                    </h2>
                  ),

                  h3: ({ children }) => (
                    <h3 className="mb-4 mt-10 text-2xl font-semibold tracking-tight">
                      {children}
                    </h3>
                  ),

                  h4: ({ children }) => (
                    <h4 className="mb-3 mt-8 text-xl font-semibold">
                      {children}
                    </h4>
                  ),

                  p: ({ children }) => (
                    <p className="mb-6 text-lg leading-8 text-gray-700">
                      {children}
                    </p>
                  ),

                  a: ({
                    href,
                    children,
                  }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-800 underline underline-offset-4"
                    >
                      {children}
                    </a>
                  ),

                  ul: ({ children }) => (
                    <ul className="mb-6 ml-6 list-disc space-y-2 text-gray-700">
                      {children}
                    </ul>
                  ),

                  ol: ({ children }) => (
                    <ol className="mb-6 ml-6 list-decimal space-y-2 text-gray-700">
                      {children}
                    </ol>
                  ),

                  li: ({ children }) => (
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
                  }) => (
                    <img
                      src={src}
                      alt={alt || ""}
                      loading="lazy"
                      className="my-8 max-w-full border border-gray-200"
                    />
                  ),

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
                {article.content}
              </ReactMarkdown>
            </div>

            {(article.githubUrl ||
              article.sourceUrl ||
              article.demoUrl) && (
              <div className="mt-16 flex flex-wrap gap-3 border-t border-gray-200 pt-8">
                {article.githubUrl && (
                  <a
                    href={article.githubUrl}
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

                {article.sourceUrl && (
                  <a
                    href={article.sourceUrl}
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

                {article.demoUrl && (
                  <a
                    href={article.demoUrl}
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