import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { FaGithub } from "react-icons/fa";
import Footer from "@/components/Footer";
import {
  buildArticleStructuredData,
  getArticleBySlug,
  getArticlePageMeta,
  safeString,
  safeUrl,
} from "@/lib/article-detail";
import { createSeoMetadata, safeJsonLd } from "@/lib/seo";
import type { Article } from "@/types/article/Article";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const articleSlug = safeString(slug);

  if (!articleSlug) {
    return {
      ...createSeoMetadata({
        title: "Article",
        description: "Read articles and tutorials by Ajoy Das.",
        path: "/articles",
      }),
      robots: { index: false, follow: true },
    };
  }

  try {
    const article = await getArticleBySlug(articleSlug);

    if (!article) {
      return {
        ...createSeoMetadata({
          title: "Article",
          description: "Read articles and tutorials by Ajoy Das.",
          path: `/articles/${articleSlug}`,
        }),
        robots: { index: false, follow: true },
      };
    }

    const meta = getArticlePageMeta(article, articleSlug);

    return createSeoMetadata({
      title: meta.articleTitle,
      description: meta.excerpt,
      path: meta.articleUrl,
      image: meta.image ?? undefined,
      type: "article",
      publishedTime: meta.publishedTime,
      modifiedTime: meta.modifiedTime,
    });
  } catch {
    return {
      ...createSeoMetadata({
        title: "Article",
        description: "Read articles and tutorials by Ajoy Das.",
        path: `/articles/${articleSlug}`,
      }),
      robots: { index: false, follow: true },
    };
  }
}

export default async function ArticleDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const articleSlug = safeString(slug);

  if (!articleSlug) notFound();

  let article: Article | null = null;

  try {
    article = await getArticleBySlug(articleSlug);
  } catch (error) {
    console.error("Failed to load article:", error);
    notFound();
  }

  if (!article) notFound();

  const meta = getArticlePageMeta(article, articleSlug);
  const structuredData = buildArticleStructuredData(article, meta);

  const {
    articleTitle,
    category,
    excerpt,
    content,
    image,
    githubUrl,
    sourceUrl,
    demoUrl,
    tags,
    readingTime,
    createdDate,
    updatedDate,
    hasUpdatedDate,
    publishedTime,
  } = meta;

  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={safeJsonLd(structuredData)}
      />


      <article>
        <header className="border-b border-gray-200 bg-gradient-to-br from-blue-50 via-white to-white px-6 py-16 transition-colors duration-300 dark:border-zinc-800 dark:from-blue-950 dark:via-zinc-950 dark:to-zinc-950 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium uppercase tracking-[0.15em] text-blue-800 dark:text-blue-800">
              <span>{category}</span>
              {readingTime !== null && (
                <span className="text-gray-400 dark:text-zinc-500">
                  {readingTime} min read
                </span>
              )}
            </div>

            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {articleTitle}
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-8 text-gray-600 dark:text-zinc-400">
              {excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-zinc-400">
              {createdDate && (
                <time dateTime={publishedTime || undefined}>
                  {createdDate}
                </time>
              )}
              {hasUpdatedDate && (
                <>
                  <span className="text-gray-300 dark:text-zinc-700">·</span>
                  <span>Updated {updatedDate}</span>
                </>
              )}
            </div>

            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="border border-gray-200 bg-white/70 px-3 py-1.5 text-xs text-gray-600 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {image && (
              <div className="mt-12 overflow-hidden border border-gray-200 dark:border-zinc-800">
                <Image
                  src={image}
                  alt={articleTitle}
                  width={1600}
                  height={900}
                  priority
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            )}
          </div>
        </header>

        <section className="px-6 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h2 className="mb-6 mt-12 text-4xl font-semibold tracking-tight text-gray-900 dark:text-zinc-100">
                      {children}
                    </h2>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mb-5 mt-12 text-3xl font-semibold tracking-tight text-gray-900 dark:text-zinc-100">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mb-4 mt-10 text-2xl font-semibold tracking-tight text-gray-900 dark:text-zinc-100">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="mb-3 mt-8 text-xl font-semibold text-gray-900 dark:text-zinc-100">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="mb-6 text-lg leading-8 text-gray-700 dark:text-zinc-300">
                      {children}
                    </p>
                  ),
                  a: ({ href, children }) => {
                    const validHref = safeUrl(href);
                    if (!validHref) {
                      return (
                        <span className="font-medium text-blue-800 dark:text-blue-800">
                          {children}
                        </span>
                      );
                    }
                    return (
                      <a
                        href={validHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-800 underline underline-offset-4 dark:text-blue-800"
                      >
                        {children}
                      </a>
                    );
                  },
                  ul: ({ children }) => (
                    <ul className="mb-6 ml-6 list-disc space-y-2 text-gray-700 dark:text-zinc-300">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-6 ml-6 list-decimal space-y-2 text-gray-700 dark:text-zinc-300">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="pl-1 leading-8">{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-8 border-l-4 border-blue-800 bg-gray-50 px-6 py-5 text-gray-600 dark:border-blue-400 dark:bg-zinc-900/70 dark:text-zinc-300">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children, className }) => {
                    const isBlock = className?.includes("language-");
                    if (!isBlock) {
                      return (
                        <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-blue-800 dark:bg-zinc-800 dark:text-blue-800">
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
                  pre: ({ children }) => (
                    <pre className="my-8 overflow-x-auto border border-gray-800 bg-gray-950 p-6 text-gray-100 shadow-[6px_6px_0px_#193cb8] dark:border-zinc-700 dark:shadow-[6px_6px_0px_#1e40af]">
                      {children}
                    </pre>
                  ),
                  img: ({ src, alt }) => {
                    const validSrc = safeUrl(src);
                    if (!validSrc) return null;
                    return (
                      <div className="my-8">
                        <Image
                          src={validSrc}
                          alt={alt || ""}
                          width={1200}
                          height={800}
                          unoptimized
                          loading="lazy"
                          className="max-w-full border border-gray-200 dark:border-zinc-800"
                          sizes="(max-width: 768px) 100vw, 1200px"
                        />
                      </div>
                    );
                  },
                  table: ({ children }) => (
                    <div className="my-8 overflow-x-auto border border-gray-200 dark:border-zinc-800">
                      <table className="w-full border-collapse text-left text-sm">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border-b border-gray-200 bg-gray-50 px-4 py-3 font-semibold text-gray-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border-b border-gray-100 px-4 py-3 text-gray-600 dark:border-zinc-800 dark:text-zinc-300">
                      {children}
                    </td>
                  ),
                  hr: () => (
                    <hr className="my-12 border-gray-200 dark:border-zinc-800" />
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900 dark:text-zinc-100">
                      {children}
                    </strong>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>

            {(githubUrl || sourceUrl || demoUrl) && (
              <div className="mt-16 flex flex-wrap gap-3 border-t border-gray-200 pt-8 dark:border-zinc-800">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
                  >
                    <FaGithub size={16} />
                    GitHub
                  </a>
                )}
                {sourceUrl && (
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition-colors hover:border-gray-900 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-400"
                  >
                    Source
                    <ExternalLink size={15} />
                  </a>
                )}
                {demoUrl && (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition-colors hover:border-gray-900 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-400"
                  >
                    Demo
                    <ExternalLink size={15} />
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
