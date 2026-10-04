import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Footer from "@/components/Footer";

import { connectDB } from "@/lib/connectDb";
import ArticleModel from "@/models/article.model";

import { absoluteUrl, safeJsonLd } from "@/lib/seo";

import type { Article } from "@/types/content";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Technical articles, tutorials, guides, and notes about JavaScript, TypeScript, React, Next.js, Node.js, CSS, and web development.",
  alternates: {
    canonical: absoluteUrl("/articles"),
  },
  openGraph: {
    type: "website",
    title: "Articles | Ajoy Das",
    description:
      "Technical articles, tutorials, guides, and notes about modern web development.",
    url: absoluteUrl("/articles"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles | Ajoy Das",
    description:
      "Technical articles, tutorials, guides, and notes about modern web development.",
  },
};

export default async function ArticlesPage() {
  await connectDB();

  const articles = await ArticleModel.find({
    published: true,
  })
    .lean()
    .exec();

  const publishedArticles = articles as unknown as Article[];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Articles",
    description: "Technical articles and tutorials by Ajoy Das.",
    url: absoluteUrl("/articles"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: publishedArticles.map(
        (article: Article, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: article.title,
          url: absoluteUrl(`/articles/${article.slug}`),
        }),
      ),
    },
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={safeJsonLd(structuredData)}
      />

      <section className="border-b border-gray-200 px-6 pb-20 pt-32 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800">
            Articles
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Things I&apos;ve
            <br />
            <span className="text-blue-800">
              learned and written.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
            Technical articles, tutorials, experiments, and practical notes
            about software development.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <div className="divide-y divide-gray-200">
            {publishedArticles.map((article: Article) => (
              <article
                key={article._id ?? article.slug}
                className="py-10 first:pt-0"
              >
                <div className="flex flex-wrap gap-3 text-xs font-medium uppercase tracking-[0.15em] text-blue-800">
                  <span>{article.category}</span>

                  {article.readingTime && (
                    <span className="text-gray-400">
                      {article.readingTime} min read
                    </span>
                  )}
                </div>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="hover:text-blue-800"
                  >
                    {article.title}
                  </Link>
                </h2>

                <p className="mt-4 text-lg leading-8 text-gray-600">
                  {article.excerpt}
                </p>

                {article.tags && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {article.tags.split(",").map((tag) => {
                      const cleanTag = tag.trim();

                      if (!cleanTag) {
                        return null;
                      }

                      return (
                        <span
                          key={cleanTag}
                          className="border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600"
                        >
                          {cleanTag}
                        </span>
                      );
                    })}
                  </div>
                )}

                <Link
                  href={`/articles/${article.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-blue-800"
                >
                  Read article
                  <ArrowUpRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}