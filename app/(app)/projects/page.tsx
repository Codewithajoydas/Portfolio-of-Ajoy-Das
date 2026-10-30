import Link from "next/link";
import { ArrowUpRight, ExternalLink, Layers3 } from "lucide-react";
import Footer from "@/components/Footer";
import { absoluteUrl, createSeoMetadata, safeJsonLd } from "@/lib/seo";
import { connectDB } from "@/lib/connectDb";
import ProjectModel from "@/models/project.model";
import { Pacifico } from "next/font/google";
import type { Project } from "@/types/content";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = createSeoMetadata({
  title: "Projects",
  description:
    "Explore software projects, applications, developer tools, open-source projects, and experiments built by Ajoy Das.",
  path: "/projects",
});

export default async function ProjectsPage() {
  let publishedProjects: Project[] = [];

  try {
    await connectDB();

    publishedProjects = await ProjectModel.find({
      published: true,
    })
      .lean()
      .exec();
  } catch (error) {
    console.error("Failed to load projects:", error);
    publishedProjects = [];
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects",
    description: "Software projects built by Ajoy Das.",
    url: absoluteUrl("/projects"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: publishedProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.name,
        url: absoluteUrl(`/projects/${project.slug}`),
      })),
    },
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={safeJsonLd(structuredData)}
      />

      {/* Hero */}
      <section className="border-b border-gray-200 px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:px-12 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-blue-800" />
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-800 sm:text-sm">
                  Projects & Experiments
                </p>
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Things I&apos;ve
                <br />
                <span className={`text-blue-800 ${pacifico.className}`}>
                  actually built.
                </span>
              </h1>
            </div>

            <div className="max-w-lg lg:justify-self-end lg:pb-2">
              <p className="text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                A collection of applications, developer tools, experiments,
                and systems built while learning and solving real problems.
              </p>

              <div className="mt-7 flex items-center gap-3 border-t border-gray-200 pt-5">
                <span className="text-3xl font-semibold tracking-tight text-gray-900">
                  {publishedProjects.length.toString().padStart(2, "0")}
                </span>

                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Published projects
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Built with curiosity and purpose
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 border-b border-gray-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-800">
                The collection
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Selected work
              </h2>
            </div>

            <p className="text-sm text-gray-500">
              Explore the projects and their details.
            </p>
          </div>

          {publishedProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
              {publishedProjects.map((project) => (
                <article
                  key={project._id?.toString() ?? project.slug}
                  className="group flex h-full min-w-0 flex-col overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[6px_6px_0px_#193cb8]"
                >
                  {/* Image */}
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={`View ${project.name} project details`}
                    className="relative block aspect-[16/9] overflow-hidden bg-gray-100"
                  >
                   <div className="relative aspect-[16/9] overflow-hidden bg-gray-50">
  {project.banner || project.thumbnail ? (
    <img
      src={project.banner || project.thumbnail}
      alt={project.name || "Project"}
      loading="lazy"
      className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-[1.02]"
    />
  ) : (
    <div className="flex h-full items-center justify-center text-sm text-gray-400">
      No image available
    </div>
  )}
</div>

                    <span className="absolute left-4 top-4 border border-gray-200 bg-white px-3 py-1.5 font-mono text-xs text-gray-700 shadow-sm">
                      {project.year}
                    </span>

                    <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center border border-gray-200 bg-white text-gray-900 transition-colors group-hover:bg-blue-800 group-hover:text-white">
                      <ArrowUpRight size={19} aria-hidden="true" />
                    </span>
                  </Link>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-800">
                        {project.category}
                      </span>

                      <Layers3
                        size={17}
                        aria-hidden="true"
                        className="shrink-0 text-gray-400"
                      />
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="transition-colors hover:text-blue-800"
                      >
                        {project.name}
                      </Link>
                    </h2>

                    <p
                      className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7"
                      title={project.shortDescription}
                    >
                      {project.shortDescription}
                    </p>

                    {/* Technology stack */}
                    {Array.isArray(project.techStack) &&
                      project.techStack.length > 0 && (
                        <div className="mt-6">
                          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                            Built with
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.techStack.slice(0, 6).map(
                              (technology: string) => (
                                <span
                                  key={technology}
                                  className="border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600"
                                >
                                  {technology}
                                </span>
                              ),
                            )}

                            {project.techStack.length > 6 && (
                              <span className="border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500">
                                +{project.techStack.length - 6} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                    {/* Actions */}
                    <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-gray-100 pt-6 mt-7">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-800"
                      >
                        View details
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </Link>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.name} on GitHub`}
                          className="inline-flex items-center gap-2 border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900"
                        >
                          GitHub
                          <ExternalLink size={14} aria-hidden="true" />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open live ${project.name} project`}
                          className="inline-flex items-center gap-1.5 px-2 py-3 text-sm font-medium text-gray-600 transition-colors hover:text-blue-800"
                        >
                          Live demo
                          <ExternalLink size={14} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center border border-dashed border-gray-300 px-5 text-center">
              <Layers3
                size={28}
                aria-hidden="true"
                className="text-gray-400"
              />
              <h2 className="mt-4 text-lg font-semibold">
                No projects available
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Published projects will appear here.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}