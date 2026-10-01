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

/**
 * Generate static project routes.
 *
 * Defensive handling is used here so a malformed API response
 * does not cause the entire build to crash.
 */
export async function generateStaticParams() {
  try {
    const projects = await getProjects();

    if (!Array.isArray(projects)) {
      return [];
    }

    return projects
      .filter(
        (project) =>
          project &&
          typeof project.slug === "string" &&
          project.slug.trim().length > 0 &&
          project.published === true
      )
      .map((project) => ({
        slug: project.slug,
      }));
  } catch (error) {
    console.error(
      "Failed to generate project static params:",
      error
    );

    return [];
  }
}

/**
 * Generate SEO metadata for a project.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
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

    const projectName =
      typeof project.name === "string" && project.name.trim()
        ? project.name
        : "Project";

    const projectSlug =
      typeof project.slug === "string" && project.slug.trim()
        ? project.slug
        : slug;

    const title =
      typeof project.seoTitle === "string" &&
      project.seoTitle.trim()
        ? project.seoTitle
        : `${projectName} — Project`;

    const description =
      typeof project.seoDescription === "string" &&
      project.seoDescription.trim()
        ? project.seoDescription
        : typeof project.shortDescription === "string"
          ? project.shortDescription
          : `Learn more about ${projectName}.`;

    const image =
      typeof project.banner === "string" &&
      project.banner.trim()
        ? project.banner
        : typeof project.thumbnail === "string" &&
            project.thumbnail.trim()
          ? project.thumbnail
          : undefined;

    return {
      title,
      description,

      alternates: {
        canonical: absoluteUrl(
          `/projects/${projectSlug}`
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
          `/projects/${projectSlug}`
        ),

        siteName: "Ajoy Das",

        images: image
          ? [
              {
                url: image,
                width: 1200,
                height: 630,
                alt: projectName,
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
  } catch (error) {
    console.error(
      `Failed to generate metadata for project "${slug}":`,
      error
    );

    return {
      title: "Project",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function ProjectDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  let project;

  try {
    project = await getProjectBySlug(slug);
  } catch (error) {
    console.error(
      `Failed to load project "${slug}":`,
      error
    );

    notFound();
  }

  if (!project) {
    notFound();
  }

  /*
   * Defensive values.
   *
   * These prevent `.length` and `.map()` from crashing
   * when the API/database contains null or malformed values.
   */

  const projectName =
    typeof project.name === "string" &&
    project.name.trim()
      ? project.name
      : "Untitled Project";

  const projectSlug =
    typeof project.slug === "string" &&
    project.slug.trim()
      ? project.slug
      : slug;

  const category =
    typeof project.category === "string" &&
    project.category.trim()
      ? project.category
      : "Project";

  const description =
    typeof project.description === "string" &&
    project.description.trim()
      ? project.description
      : typeof project.shortDescription === "string" &&
          project.shortDescription.trim()
        ? project.shortDescription
        : "No description available.";

  const shortDescription =
    typeof project.shortDescription === "string"
      ? project.shortDescription
      : "";

  const seoDescription =
    typeof project.seoDescription === "string"
      ? project.seoDescription
      : "";

  const seoTitle =
    typeof project.seoTitle === "string"
      ? project.seoTitle
      : "";

  const githubUrl =
    typeof project.githubUrl === "string" &&
    project.githubUrl.trim()
      ? project.githubUrl
      : null;

  const liveUrl =
    typeof project.liveUrl === "string" &&
    project.liveUrl.trim()
      ? project.liveUrl
      : null;

  const image =
    typeof project.banner === "string" &&
    project.banner.trim()
      ? project.banner
      : typeof project.thumbnail === "string" &&
          project.thumbnail.trim()
        ? project.thumbnail
        : null;

  const techStack = Array.isArray(project.techStack)
    ? project.techStack.filter(
        (technology): technology is string =>
          typeof technology === "string" &&
          technology.trim().length > 0
      )
    : [];

  const features = Array.isArray(project.features)
    ? project.features.filter(
        (feature): feature is string =>
          typeof feature === "string" &&
          feature.trim().length > 0
      )
    : [];

  const screenshots = Array.isArray(project.screenshots)
    ? project.screenshots.filter(
        (screenshot): screenshot is string =>
          typeof screenshot === "string" &&
          screenshot.trim().length > 0
      )
    : [];

  const challenges =
    typeof project.challenges === "string" &&
    project.challenges.trim()
      ? project.challenges
      : null;

  const learnings =
    typeof project.learnings === "string" &&
    project.learnings.trim()
      ? project.learnings
      : null;

  const projectUrl = absoluteUrl(
    `/projects/${projectSlug}`
  );

  /**
   * Safe structured data.
   */
  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "CreativeWork",

        "@id": `${projectUrl}#project`,

        name: projectName,

        description,

        url: projectUrl,

        creator: {
          "@type": "Person",

          name: "Ajoy Das",

          url: absoluteUrl("/"),
        },

        ...(project.createdAt
          ? {
              dateCreated: project.createdAt,
            }
          : {}),

        ...(project.updatedAt
          ? {
              dateModified: project.updatedAt,
            }
          : {}),

        ...(image
          ? {
              image: [image],
            }
          : {}),

        ...(techStack.length > 0
          ? {
              keywords: techStack.join(", "),
            }
          : {}),

        ...(category
          ? {
              about: {
                "@type": "Thing",
                name: category,
              },
            }
          : {}),

        ...(githubUrl
          ? {
              codeRepository: githubUrl,
            }
          : {}),

        ...(liveUrl
          ? {
              sameAs: liveUrl,
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

            name: projectName,

            item: projectUrl,
          },
        ],
      },
    ],
  };

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
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} />

            All projects
          </Link>

          <span className="font-mono text-xs text-gray-400">
            PROJECT / {projectSlug}
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-gray-200 px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            {/* Project Information */}
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800">
                {category}
              </p>

              <h1 className="mt-5 text-6xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                {projectName}
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
                {description}
              </p>

              {/* Tech Stack */}
              {techStack.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {techStack.map(
                    (technology, index) => (
                      <span
                        key={`${technology}-${index}`}
                        className="border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600"
                      >
                        {technology}
                      </span>
                    )
                  )}
                </div>
              )}

              {/* Links */}
              {(githubUrl || liveUrl) && (
                <div className="mt-10 flex flex-wrap gap-3">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-blue-800"
                    >
                      <FaGithub size={17} />

                      View on GitHub

                      <ArrowUpRight size={15} />
                    </a>
                  )}

                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 hover:border-gray-900"
                    >
                      Live Demo

                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Project Image */}
            <div className="overflow-hidden border border-gray-200 bg-gray-100">
              {image ? (
                <img
                  src={image}
                  alt={projectName}
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

      {/* Content */}
      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          {/* Features */}
          {features.length > 0 && (
            <section>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-800">
                Features
              </p>

              <h2 className="mt-3 text-4xl font-semibold">
                What it does
              </h2>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {features.map(
                  (feature, index) => (
                    <li
                      key={`${feature}-${index}`}
                      className="border border-gray-200 p-5 text-gray-600"
                    >
                      {feature}
                    </li>
                  )
                )}
              </ul>
            </section>
          )}

          {/* Challenges */}
          {challenges && (
            <section className="mt-20">
              <h2 className="text-4xl font-semibold">
                Challenges
              </h2>

              <p className="mt-6 max-w-4xl whitespace-pre-line text-lg leading-8 text-gray-600">
                {challenges}
              </p>
            </section>
          )}

          {/* Learnings */}
          {learnings && (
            <section className="mt-20">
              <h2 className="text-4xl font-semibold">
                Learnings
              </h2>

              <p className="mt-6 max-w-4xl whitespace-pre-line text-lg leading-8 text-gray-600">
                {learnings}
              </p>
            </section>
          )}

          {/* Screenshots */}
          {screenshots.length > 0 && (
            <section className="mt-20">
              <h2 className="text-4xl font-semibold">
                Screenshots
              </h2>

              <div className="mt-8 grid gap-6">
                {screenshots.map(
                  (screenshot, index) => (
                    <img
                      key={`${screenshot}-${index}`}
                      src={screenshot}
                      alt={`${projectName} screenshot ${
                        index + 1
                      }`}
                      loading="lazy"
                      className="w-full border border-gray-200"
                    />
                  )
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