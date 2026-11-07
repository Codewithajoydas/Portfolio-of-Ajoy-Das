import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Footer from "@/components/Footer";
import { connectDB } from "@/lib/connectDb";
import ArticleModel from "@/models/article.model";
import { createSeoMetadata, safeJsonLd } from "@/lib/seo";
import type { Article } from "@/types/content";
import { Pacifico } from "next/font/google";
import PageTransition from "@/components/page-transition";
export const revalidate = 0;
export const dynamic = "force-dynamic";
const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});
export const metadata = createSeoMetadata({
  title: "Articles",
  description:
    "Technical articles, tutorials, guides, and notes about JavaScript, TypeScript, React, Next.js, Node.js, CSS, and web development.",
  path: "/articles",
});
export default async function ArticlesPage() {
  await connectDB();
  const articles = await ArticleModel.find({
    published: true,
  })
    .lean()
    .sort({ createdAt: -1 })
    .exec();
  const publishedArticles = articles as unknown as Article[];
  //   const websiteId = absoluteUrl("/#website");
  // const personId = absoluteUrl("/about#person");
  // const webpageId = absoluteUrl("/articles#webpage");
  // const breadcrumbId = absoluteUrl("/articles#breadcrumb");
  // const itemListId = absoluteUrl("/articles#article-list");
  // const structuredData = {
  //   "@context": "https://schema.org",
  //   "@graph": [
  //     // 1. Author / Person
  //     {
  //       "@type": "Person",
  //       "@id": personId,
  //       name: "Ajoy Das",
  //       url: absoluteUrl("/about"),
  //       jobTitle: "Software Developer",
  //       description:
  //         "A software developer writing technical articles, tutorials, and practical guides about modern web development and software engineering.",
  //       email: "ajoydas@codewithajoydas.in",
  //       sameAs: [
  //         "https://github.com/Codewithajoydas",
  //         "https://www.instagram.com/codewithajoydas",
  //         "https://www.facebook.com/profile.php?id=100090674957174",
  //         "https://www.youtube.com/@codewithajoydas"
  //       ],
  //       knowsAbout: [
  //         "JavaScript",
  //         "TypeScript",
  //         "React",
  //         "Next.js",
  //         "Node.js",
  //         "Express.js",
  //         "CSS",
  //         "HTML",
  //         "MongoDB",
  //         "Web Development",
  //         "Software Engineering",
  //         "Backend Development",
  //         "Frontend Development"
  //       ]
  //     },
  //     // 2. Website
  //     {
  //       "@type": "WebSite",
  //       "@id": websiteId,
  //       url: absoluteUrl("/"),
  //       name: "Codewithajoydas",
  //       description:
  //         "Personal portfolio and technical publication of Ajoy Das, featuring software projects, development tutorials, and technical articles.",
  //       publisher: {
  //         "@id": personId
  //       },
  //       inLanguage: "en-IN"
  //     },
  //     // 3. Breadcrumb navigation
  //     {
  //       "@type": "BreadcrumbList",
  //       "@id": breadcrumbId,
  //       itemListElement: [
  //         {
  //           "@type": "ListItem",
  //           position: 1,
  //           name: "Home",
  //           item: absoluteUrl("/")
  //         },
  //         {
  //           "@type": "ListItem",
  //           position: 2,
  //           name: "Articles",
  //           item: absoluteUrl("/articles")
  //         }
  //       ]
  //     },
  //     // 4. Articles listing page
  //     {
  //       "@type": "CollectionPage",
  //       "@id": webpageId,
  //       url: absoluteUrl("/articles"),
  //       name: "Articles | Codewithajoydas",
  //       description:
  //         "Technical articles, tutorials, guides, and notes about JavaScript, TypeScript, React, Next.js, Node.js, CSS, and web development.",
  //       isPartOf: {
  //         "@id": websiteId
  //       },
  //       about: {
  //         "@id": personId
  //       },
  //       author: {
  //         "@id": personId
  //       },
  //       breadcrumb: {
  //         "@id": breadcrumbId
  //       },
  //       mainEntity: {
  //         "@id": itemListId
  //       },
  //       inLanguage: "en-IN"
  //     },
  //     // 5. Dynamic article collection
  //     {
  //       "@type": "ItemList",
  //       "@id": itemListId,
  //       name: "Technical Articles by Ajoy Das",
  //       description:
  //         "A collection of technical articles, programming tutorials, development guides, and software engineering notes.",
  //       numberOfItems: publishedArticles.length,
  //       itemListElement: publishedArticles.map(
  //         (article: Article, index: number) => {
  //           const articleUrl = absoluteUrl(
  //             `/articles/${article.slug}`
  //           );
  //           const tags = article.tags
  //             ? article.tags
  //                 .split(",")
  //                 .map((tag) => tag.trim())
  //                 .filter(Boolean)
  //             : [];
  //           return {
  //             "@type": "ListItem",
  //             position: index + 1,
  //             item: {
  //               "@type": "BlogPosting",
  //               "@id": `${articleUrl}#article`,
  //               headline: article.title,
  //               description: article.excerpt,
  //               url: articleUrl,
  //               mainEntityOfPage: {
  //                 "@type": "WebPage",
  //                 "@id": articleUrl
  //               },
  //               author: {
  //                 "@id": personId
  //               },
  //               publisher: {
  //                 "@id": personId
  //               },
  //               articleSection: article.category,
  //               ...(tags.length > 0 && {
  //                 keywords: tags
  //               }),
  //               inLanguage: "en-IN"
  //             }
  //           };
  //         }
  //       )
  //     }
  //   ]
  // };

  return (
    <>
      {publishedArticles.length > 0 &&
        publishedArticles.map((article: Article, index: number) => {
          const articleSchema = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: article.title,
            image: article.coverImage,
            datePublished: new Date(article.createdAt).toISOString(),
            dateModified: new Date(article.updatedAt).toISOString(),
            author: [
              {
                "@type": "Person",
                name: "Ajoy Das",
                url: "https://www.codewithajoydas.in/about",
              },
            ],
          };
          return (
            <script
              key={index + 1}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
              }}
            />
          );
        })}
      <PageTransition>
        <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
          {/* Hero */}
          <section className="border-b border-gray-200 bg-gradient-to-b from-blue-50 via-white to-white px-6 pb-20 pt-32 transition-colors duration-300 dark:border-zinc-800 dark:from-blue-950 dark:via-zinc-950 dark:to-zinc-950 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-800">
                Articles
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-900 dark:text-zinc-100 sm:text-6xl lg:text-7xl">
                Things I&apos;ve
                <br />
                <span
                  className={`${pacifico.className} text-blue-800 dark:text-blue-800`}
                >
                  learned and written.
                </span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600 dark:text-zinc-400">
                Technical articles, tutorials, experiments, and practical notes
                about software development.
              </p>
            </div>
          </section>
          {/* Articles */}
          <section className="px-6 py-20 transition-colors duration-300 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-4xl">
              <div className="divide-y divide-gray-200 dark:divide-zinc-800">
                {publishedArticles.map((article: Article) => (
                  <article
                    key={article._id ?? article.slug}
                    className="py-10 first:pt-0"
                  >
                    <div className="flex flex-wrap gap-3 text-xs font-medium uppercase tracking-[0.15em] text-blue-800 dark:text-blue-800">
                      <span>{article.category}</span>
                      {article.readingTime && (
                        <span className="text-gray-400 dark:text-zinc-500">
                          {article.readingTime} min read
                        </span>
                      )}
                    </div>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 transition-colors dark:text-zinc-100 sm:text-4xl">
                      <Link
                        href={`/articles/${article.slug}`}
                        className="transition-colors hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        {article.title}
                      </Link>
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-zinc-400">
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
                              className="border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600 transition-colors dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400"
                            >
                              {cleanTag}
                            </span>
                          );
                        })}
                      </div>
                    )}
                    <Link
                      href={`/articles/${article.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-900 transition-colors hover:text-blue-800 dark:text-zinc-100 dark:hover:text-blue-300"
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
      </PageTransition>
    </>
  );
}
