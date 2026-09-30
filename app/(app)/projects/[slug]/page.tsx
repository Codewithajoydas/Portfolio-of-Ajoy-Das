import type { Metadata } from "next";

import Link from "next/link";

import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

import Footer from "@/components/Footer";

import {
  getProjectBySlug,
  getProjects,
} from "@/lib/content-api";

import {
  absoluteUrl,
  safeJsonLd,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects
    .filter((project) => project.published)
    .map((project) => ({
      slug: project.slug,
    }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    project.seoTitle ||
    `${project.name} — Project`;

  const description =
    project.seoDescription ||
    project.shortDescription;

  const image =
    project.banner ||
    project.thumbnail;

  return {
    title,

    description,

    alternates: {
      canonical: absoluteUrl(
        `/projects/${project.slug}`,
      ),
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
      type: "website",

      title,

      description,

      url: absoluteUrl(
        `/projects/${project.slug}`,
      ),

      siteName: "Ajoy Das",

      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: project.name,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: image ? [image] : undefined,
    },
  };
}

export default async function ProjectDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectUrl = absoluteUrl(
    `/projects/${project.slug}`,
  );

  const image =
    project.banner ||
    project.thumbnail;

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "CreativeWork",

        "@id": `${projectUrl}#project`,

        name: project.name,

        description:
          project.description ||
          project.shortDescription,

        url: projectUrl,

        creator: {
          "@type": "Person",

          name: "Ajoy Das",

          url: absoluteUrl("/"),
        },

        dateCreated: project.createdAt,

        dateModified: project.updatedAt,

        ...(image
          ? {
              image: [image],
            }
          : {}),

        ...(project.techStack.length > 0
          ? {
              keywords:
                project.techStack.join(", "),
            }
          : {}),

        about: {
          "@type": "Thing",

          name: project.category,
        },

        ...(project.githubUrl
          ? {
              codeRepository:
                project.githubUrl,
            }
          : {}),

        ...(project.liveUrl
          ? {
              sameAs: project.liveUrl,
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

            name: "Projects",

            item: absoluteUrl("/projects"),
          },

          {
            "@type": "ListItem",

            position: 3,

            name: project.name,

            item: projectUrl,
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
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} />

            All projects
          </Link>

          <span className="font-mono text-xs text-gray-400">
            PROJECT / {project.slug}
          </span>
        </div>
      </header>

      <section className="border-b border-gray-200 px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800">
                {project.category}
              </p>

              <h1 className="mt-5 text-6xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                {project.name}
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
                {project.description ||
                  project.shortDescription}
              </p>

              {project.techStack.length >
                0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.techStack.map(
                    (technology) => (
                      <span
                        key={technology}
                        className="border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600"
                      >
                        {technology}
                      </span>
                    ),
                  )}
                </div>
              )}

              <div className="mt-10 flex flex-wrap gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-blue-800"
                  >
                    <FaGithub
                      size={17}
                    />

                    View on GitHub

                    <ArrowUpRight
                      size={15}
                    />
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 hover:border-gray-900"
                  >
                    Live Demo

                    <ExternalLink
                      size={16}
                    />
                  </a>
                )}
              </div>
            </div>

            <div className="overflow-hidden border border-gray-200 bg-gray-100">
              {image ? (
                <img
                  src={image}
                  alt={project.name}
                  className="aspect-video w-full object-cover"
                />
              ) : (
                <div className="flex aspect-video items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          {project.features.length > 0 && (
            <section>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-800">
                Features
              </p>

              <h2 className="mt-3 text-4xl font-semibold">
                What it does
              </h2>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {project.features.map(
                  (feature) => (
                    <li
                      key={feature}
                      className="border border-gray-200 p-5 text-gray-600"
                    >
                      {feature}
                    </li>
                  ),
                )}
              </ul>
            </section>
          )}

          {project.challenges && (
            <section className="mt-20">
              <h2 className="text-4xl font-semibold">
                Challenges
              </h2>

              <p className="mt-6 max-w-4xl whitespace-pre-line text-lg leading-8 text-gray-600">
                {project.challenges}
              </p>
            </section>
          )}

          {project.learnings && (
            <section className="mt-20">
              <h2 className="text-4xl font-semibold">
                Learnings
              </h2>

              <p className="mt-6 max-w-4xl whitespace-pre-line text-lg leading-8 text-gray-600">
                {project.learnings}
              </p>
            </section>
          )}

          {project.screenshots.length > 0 && (
            <section className="mt-20">
              <h2 className="text-4xl font-semibold">
                Screenshots
              </h2>

              <div className="mt-8 grid gap-6">
                {project.screenshots.map(
                  (screenshot, index) => (
                    <img
                      key={`${screenshot}-${index}`}
                      src={screenshot}
                      alt={`${project.name} screenshot ${index + 1}`}
                      loading="lazy"
                      className="w-full border border-gray-200"
                    />
                  ),
                )}
              </div>
            </section>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}