import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { Pacifico } from "next/font/google";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaGithub } from "react-icons/fa";
import Footer from "@/components/Footer";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live: string;
  slug: string;
};

type ProjectsData = {
  projects: Project[];
};

async function getProjects(): Promise<Project[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/projects.json`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to load projects.json");
  }

  const data: ProjectsData = await response.json();

  return data.projects;
}

async function getProject(slug: string) {
  const projects = await getProjects();

  return projects.find((project) => project.slug === slug);
}

/**
 * Convert:
 *
 * https://github.com/Codewithajoydas/WiggleNote
 *
 * into:
 *
 * {
 *   owner: "Codewithajoydas",
 *   repo: "WiggleNote"
 * }
 */
function getGitHubRepo(githubUrl: string) {
  try {
    const url = new URL(githubUrl);

    if (url.hostname !== "github.com") {
      return null;
    }

    const parts = url.pathname.split("/").filter(Boolean);

    if (parts.length < 2) {
      return null;
    }

    return {
      owner: parts[0],
      repo: parts[1],
    };
  } catch {
    return null;
  }
}

/**
 * Fetch README directly from GitHub.
 *
 * GitHub API gives us the correct README regardless
 * of whether the repository uses README.md, README.MD,
 * readme.md, etc.
 */
async function getGitHubReadme(githubUrl: string) {
  const repository = getGitHubRepo(githubUrl);

  if (!repository) {
    return null;
  }

  const response = await fetch(
    `https://api.github.com/repos/${repository.owner}/${repository.repo}/readme`,
    {
      headers: {
        Accept: "application/vnd.github.raw+json",
        "User-Agent": "Ajoy-Das-Portfolio",
      },
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  const markdown = await response.text();

  return {
    markdown,
    owner: repository.owner,
    repo: repository.repo,
  };
}

/**
 * README images commonly look like:
 *
 * ![Screenshot](./assets/image.png)
 *
 * GitHub Markdown understands that path,
 * but our website does not.
 *
 * This converts relative GitHub README assets
 * into raw.githubusercontent.com URLs.
 */
function resolveGitHubAssetUrl(
  url: string | undefined,
  owner: string,
  repo: string,
) {
  if (!url) {
    return "";
  }

  // Absolute URL
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:")
  ) {
    return url;
  }

  // GitHub anchor
  if (url.startsWith("#")) {
    return url;
  }

  // Remove query/hash
  const cleanUrl = url.split("#")[0].split("?")[0];

  // Remove ./ or /
  const cleanPath = cleanUrl.replace(/^\.\/+/, "").replace(/^\/+/, "");

  return `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${cleanPath}`;
}

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Ajoy Das`,
    description: project.description,
  };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="text-center">
          <p className="font-mono text-sm text-blue-800">
            404 / PROJECT_NOT_FOUND
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Project not found.
          </h1>

          <Link
            href="/projects"
            className="mt-8 inline-flex items-center gap-2 bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-blue-800"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
        </div>
      </main>
    );
  }

  const readme = await getGitHubReadme(project.github);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* =========================================
          HEADER
      ========================================== */}

      <header className="border-b border-gray-200 px-6 py-5 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={16} />
            All projects
          </Link>

          <span className="font-mono text-xs text-gray-400">
            PROJECT / {project.id}
          </span>
        </div>
      </header>

      {/* =========================================
          HERO
      ========================================== */}

      <section className="border-b border-gray-200 px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            {/* Text */}

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800">
                {project.category}
              </p>

              <h1 className="mt-5 text-6xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                {project.title}
              </h1>

              <p
                className={`${pacifico.className} mt-5 text-3xl text-blue-800`}
              >
                Something I built.
              </p>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
                {project.description}
              </p>

              {/* Technologies */}

              {project.technologies.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}

              <div className="mt-10 flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-800"
                  >
                    <FaGithub size={17} />
                    View on GitHub
                    <ArrowUpRight size={15} />
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition-colors hover:border-gray-900"
                  >
                    Live Demo
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Project Image */}

            <div className="overflow-hidden border border-gray-200 bg-gray-100">
              <div className="relative aspect-video">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="border-t border-gray-200 bg-white px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">
                    {project.slug}
                  </span>

                  <span className="font-mono text-xs text-gray-400">
                    #{project.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          README
      ========================================== */}

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end justify-between border-b border-gray-200 pb-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-800">
                Documentation
              </p>

              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                Project Overview
              </h2>
            </div>

            {readme && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 sm:flex"
              >
                GitHub
                <ArrowUpRight size={15} />
              </a>
            )}
          </div>

          {readme ? (
            <article className="github-readme">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="mb-6 mt-12 border-b border-gray-200 pb-4 text-4xl font-semibold tracking-tight first:mt-0">
                      {children}
                    </h1>
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
                    <p className="mb-5 max-w-4xl text-base leading-8 text-gray-600">
                      {children}
                    </p>
                  ),

                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-800 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-800"
                    >
                      {children}
                    </a>
                  ),

                  ul: ({ children }) => (
                    <ul className="mb-6 ml-6 list-disc space-y-2 text-gray-600">
                      {children}
                    </ul>
                  ),

                  ol: ({ children }) => (
                    <ol className="mb-6 ml-6 list-decimal space-y-2 text-gray-600">
                      {children}
                    </ol>
                  ),

                  li: ({ children }) => (
                    <li className="pl-1 leading-7">{children}</li>
                  ),

                  blockquote: ({ children }) => (
                    <blockquote className="my-8 border-l-4 border-blue-800 bg-gray-50 px-6 py-4 text-gray-600">
                      {children}
                    </blockquote>
                  ),

                  code: ({ children, className }) => {
                    const isBlock = className?.includes("language-");

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

                  pre: ({ children }) => (
                    <pre className="my-8 overflow-x-auto border border-gray-800 bg-gray-950 p-6 shadow-[6px_6px_0px_#193cb8]">
                      {children}
                    </pre>
                  ),

                  img: ({ src, alt }) => {
                    const resolvedSrc = resolveGitHubAssetUrl(
                      src as string,
                      readme.owner,
                      readme.repo,
                    );

                    return (
                      <img
                        src={resolvedSrc}
                        alt={alt ?? ""}
                        className="my-8 max-w-full border border-gray-200"
                        loading="lazy"
                      />
                    );
                  },

                  table: ({ children }) => (
                    <div className="my-8 overflow-x-auto border border-gray-200">
                      <table className="w-full border-collapse text-left text-sm">
                        {children}
                      </table>
                    </div>
                  ),

                  th: ({ children }) => (
                    <th className="border-b border-gray-200 bg-gray-50 px-4 py-3 font-semibold">
                      {children}
                    </th>
                  ),

                  td: ({ children }) => (
                    <td className="border-b border-gray-100 px-4 py-3 text-gray-600">
                      {children}
                    </td>
                  ),

                  hr: () => <hr className="my-12 border-gray-200" />,

                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900">
                      {children}
                    </strong>
                  ),
                }}
              >
                {readme.markdown}
              </ReactMarkdown>
            </article>
          ) : (
            <div className="border border-gray-200 bg-gray-50 p-10 text-center">
              <p className="font-mono text-sm text-gray-500">
                README_UNAVAILABLE
              </p>

              <p className="mt-3 text-gray-600">
                The GitHub repository does not currently expose a README that
                could be loaded.
              </p>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-blue-800"
              >
                Open GitHub
                <ArrowUpRight size={16} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* =========================================
          BOTTOM NAVIGATION
      ========================================== */}

      <section className="border-t border-gray-200 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={16} />
              Back to all projects
            </Link>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-blue-800"
              >
                Explore source code
                <FaGithub size={16} />
              </a>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
