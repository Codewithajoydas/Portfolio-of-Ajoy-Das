import type { Metadata } from "next";

import Link from "next/link";

import {
  ArrowUpRight,
  ExternalLink,
  Layers3,
} from "lucide-react";

import Footer from "@/components/Footer";

import { absoluteUrl, safeJsonLd } from "@/lib/seo";

import { connectDB } from "@/lib/connectDb";
import ProjectModel from "@/models/project.model";

import { Pacifico } from "next/font/google";
import { Project } from "@/types/content";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Projects",

  description:
    "Explore software projects, applications, developer tools, open-source projects, and experiments built by Ajoy Das.",

  alternates: {
    canonical: absoluteUrl("/projects"),
  },

  openGraph: {
    type: "website",
    title: "Projects | Ajoy Das",

    description:
      "Explore software projects, applications, developer tools, open-source projects, and experiments built by Ajoy Das.",

    url: absoluteUrl("/projects"),
  },

  twitter: {
    card: "summary_large_image",

    title: "Projects | Ajoy Das",

    description:
      "Explore software projects, applications, developer tools, open-source projects, and experiments built by Ajoy Das.",
  },
};

export default async function ProjectsPage() {
  let publishedProjects: Project[] = [];

  try {
    /*
     * Connect directly to MongoDB.
     *
     * No API request.
     * No getProjects().
     */
    await connectDB();

    /*
     * Get published projects directly from MongoDB.
     *
     * lean() returns plain JavaScript objects,
     * which are safe to use in a Server Component.
     */
    publishedProjects = await ProjectModel.find({
      published: true,
    })
      .lean()
      .exec();
  } catch (error) {
    console.error(
      "Failed to load projects:",
      error,
    );

    /*
     * Keep the page renderable if the database
     * temporarily fails.
     */
    publishedProjects = [];
  }

  const structuredData = {
    "@context": "https://schema.org",

    "@type": "CollectionPage",

    name: "Projects",

    description:
      "Software projects built by Ajoy Das.",

    url: absoluteUrl("/projects"),

    mainEntity: {
      "@type": "ItemList",

      itemListElement: publishedProjects.map(
        (project, index) => ({
          "@type": "ListItem",

          position: index + 1,

          name: project.name,

          url: absoluteUrl(
            `/projects/${project.slug}`,
          ),
        }),
      ),
    },
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={safeJsonLd(
          structuredData,
        )}
      />

      {/* Hero */}
      <section className="border-b border-gray-200 px-6 pb-20 pt-32 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800">
            Projects
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Things I&apos;ve
                <br />

                <span
                  className={`text-blue-800 ${pacifico.className}`}
                >
                  actually built.
                </span>
              </h1>
            </div>

            <p className="max-w-xl text-base leading-7 text-gray-600 lg:pb-2">
              A collection of applications, developer
              tools, experiments, and systems built while
              learning and solving real problems.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          {publishedProjects.length > 0 ? (
            <div className="space-y-10">
              {publishedProjects.map(
                (project) => (
                  <article
                    key={
                      project._id?.toString() ??
                      project.slug
                    }
                    className="group grid overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-[6px_6px_0px_#193cb8] lg:grid-cols-[1.15fr_1fr]"
                  >
                    {/* Project Image */}
                    <div className="relative aspect-video overflow-hidden bg-gray-100 lg:aspect-auto lg:min-h-[360px]">
                      {project.banner ||
                      project.thumbnail ? (
                        <img
                          src={
                            project.banner ||
                            project.thumbnail
                          }
                          alt={
                            project.name ||
                            "Project"
                          }
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}

                      <div className="absolute left-5 top-5 bg-white px-3 py-1.5 font-mono text-xs text-gray-600">
                        {project.year}
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="flex flex-col justify-between p-7 sm:p-9">
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs font-medium uppercase tracking-[0.15em] text-blue-800">
                            {project.category}
                          </span>

                          <Layers3
                            size={18}
                            className="text-gray-400"
                          />
                        </div>

                        <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                          {project.name}
                        </h2>

                        <p className="mt-5 max-w-xl leading-7 text-gray-600">
                          {
                            project.shortDescription
                          }
                        </p>

                        {Array.isArray(
                          project.techStack,
                        ) &&
                          project.techStack
                            .length > 0 && (
                            <div className="mt-7 flex flex-wrap gap-2">
                              {project.techStack.map(
                                (
                                  technology: string,
                                ) => (
                                  <span
                                    key={
                                      technology
                                    }
                                    className="border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600"
                                  >
                                    {
                                      technology
                                    }
                                  </span>
                                ),
                              )}
                            </div>
                          )}
                      </div>

                      {/* Links */}
                      <div className="mt-10 flex flex-wrap gap-3">
                        {project.githubUrl && (
                          <a
                            href={
                              project.githubUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
                          >
                            GitHub

                            <ExternalLink
                              size={15}
                            />
                          </a>
                        )}

                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-2 border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-900 hover:border-gray-900"
                        >
                          View details

                          <ArrowUpRight
                            size={16}
                          />
                        </Link>

                        {project.liveUrl && (
                          <a
                            href={
                              project.liveUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900"
                          >
                            Live

                            <ExternalLink
                              size={15}
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ),
              )}
            </div>
          ) : (
            <div className="flex min-h-60 items-center justify-center border border-dashed border-gray-300">
              <p className="text-sm text-gray-500">
                No published projects available.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}