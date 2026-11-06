import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";
import PageTransition from "@/components/page-transition";
import { projects } from "@/project-paths";
import { Pacifico } from "next/font/google";
import {
  absoluteUrl,
  createSeoMetadata,
  safeJsonLd,
} from "@/lib/seo";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

// Change this only when the actual route for this page is different.
const LAB_PAGE_PATH = "/lab";

const formatProjectName = (project: string) =>
  project
    .replace(/^\d+-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

const pageDescription =
  "A collection of small JavaScript projects, browser experiments, UI interactions, and programming exercises built while learning and experimenting.";

export const metadata = createSeoMetadata({
  title: "JavaScript Lab",
  description: pageDescription,
  path: LAB_PAGE_PATH,
});

type LabPageProps = {
  searchParams: Promise<{ project?: string | string[] }>;
};

export default async function LabPage({ searchParams }: LabPageProps) {
  // In the App Router (Next.js 15+), searchParams is asynchronous.
  const params = await searchParams;
  const requestedProject = Array.isArray(params.project)
    ? params.project[0]
    : params.project;

  // Accept only projects that exist in the trusted projects array.
  const selectedProject =
    projects.find((project) => project === requestedProject) ??
    projects[0] ??
    "";

  const projectPath = selectedProject
    ? `/projects/${encodeURIComponent(selectedProject.trim())}/index.html`
    : "";

  const websiteId = absoluteUrl("/#website");
  const personId = absoluteUrl("/about#person");
  const webpageId = absoluteUrl(`${LAB_PAGE_PATH}#webpage`);
  const breadcrumbId = absoluteUrl(`${LAB_PAGE_PATH}#breadcrumb`);
  const itemListId = absoluteUrl(`${LAB_PAGE_PATH}#experiment-list`);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Ajoy Das",
        url: absoluteUrl("/about"),
        jobTitle: "Software Developer",
        email: "ajoydas@codewithajoydas.in",
        sameAs: [
          "https://github.com/Codewithajoydas",
          "https://www.instagram.com/codewithajoydas",
          "https://www.facebook.com/profile.php?id=100090674957174",
          "https://www.youtube.com/@codewithajoydas",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: absoluteUrl("/"),
        name: "Codewithajoydas",
        publisher: {
          "@id": personId,
        },
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
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
            name: "JavaScript Lab",
            item: absoluteUrl(LAB_PAGE_PATH),
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": webpageId,
        url: absoluteUrl(LAB_PAGE_PATH),
        name: "JavaScript Lab | Codewithajoydas",
        description: pageDescription,
        isPartOf: {
          "@id": websiteId,
        },
        author: {
          "@id": personId,
        },
        breadcrumb: {
          "@id": breadcrumbId,
        },
        mainEntity: {
          "@id": itemListId,
        },
        inLanguage: "en-IN",
      },
      {
        "@type": "ItemList",
        "@id": itemListId,
        name: "JavaScript Projects and Experiments",
        description:
          "Small JavaScript projects, browser experiments, UI interactions, and programming exercises by Ajoy Das.",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: formatProjectName(project),
            url: absoluteUrl(
              `/projects/${encodeURIComponent(project.trim())}/index.html`,
            ),
            creator: {
              "@id": personId,
            },
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        id="javascript-lab-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={safeJsonLd(structuredData)}
      />

      <PageTransition>
        <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
          {/* Hero */}
          <section className="border-b border-gray-200 bg-gradient-to-b from-blue-50 via-white to-white px-6 pb-12 pt-24 transition-colors duration-300 dark:border-zinc-800 dark:from-blue-950 dark:via-zinc-950 dark:to-zinc-950 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500 dark:text-zinc-400">
                JavaScript Lab
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-900 dark:text-zinc-100 sm:text-6xl lg:text-7xl">
                Small projects.
                <br />
                <span className={`${pacifico.className} text-blue-800 dark:text-blue-800`}>
                  Real experiments.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-zinc-400">
                A collection of small JavaScript projects, browser experiments, UI
                interactions, and programming exercises built while learning and
                experimenting.
              </p>
            </div>
          </section>

          {/* Experiments */}
          <section className="px-6 py-10 transition-colors duration-300 sm:px-10 lg:px-16 lg:py-16">
            <div className="mx-auto max-w-7xl">
              <div className="grid overflow-hidden border border-gray-200 bg-white transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-950 lg:grid-cols-[280px_1fr]">
                <aside className="h-full border-b border-gray-200 bg-gray-50 transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900/60 lg:border-b-0 lg:border-r">
                  <div className="border-b border-gray-200 px-5 py-5 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500">
                          Experiments
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-zinc-100">
                          {projects.length} Projects
                        </p>
                      </div>

                      <span className="flex h-8 w-8 items-center justify-center border border-gray-200 bg-white text-xs font-medium text-gray-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400">
                        {String(projects.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <nav
                    aria-label="JavaScript experiments"
                    className="max-h-[600px] overflow-y-auto p-3"
                  >
                    <ul className="space-y-1">
                      {projects.map((project, index) => {
                        const isActive = selectedProject === project;

                        return (
                          <li key={project}>
                            <Link
                              href={`?project=${encodeURIComponent(project)}`}
                              scroll={false}
                              aria-current={isActive ? "page" : undefined}
                              className={`group flex w-full items-center gap-3 px-3 py-3 text-left transition-all duration-200 ${
                                isActive
                                  ? "bg-blue-800 text-white dark:bg-blue-700"
                                  : "text-gray-600 hover:bg-white hover:text-gray-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                              }`}
                            >
                              <span
                                className={`w-7 shrink-0 text-xs font-medium ${
                                  isActive
                                    ? "text-blue-200"
                                    : "text-gray-400 dark:text-zinc-500"
                                }`}
                              >
                                {String(index + 1).padStart(2, "0")}
                              </span>

                              <span
                                className="min-w-0 flex-1 truncate text-sm font-medium"
                                title={project}
                              >
                                {formatProjectName(project).toUpperCase()}
                              </span>

                              <ArrowUpRight
                                size={14}
                                className={`shrink-0 transition-transform duration-200 ${
                                  isActive
                                    ? "rotate-45"
                                    : "opacity-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                                }`}
                              />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </aside>

                <div className="min-w-0">
                  {/* Preview Header */}
                  <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-4 transition-colors duration-300 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500">
                        Current Project
                      </p>

                      <h2 className="mt-1 truncate text-lg font-semibold capitalize text-gray-900 dark:text-zinc-100">
                        {selectedProject
                          ? formatProjectName(selectedProject)
                          : "No project available"}
                      </h2>
                    </div>

                    {projectPath && (
                      <a
                        href={projectPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex w-fit shrink-0 items-center gap-2 border-b border-gray-900 pb-1 text-sm font-semibold text-gray-900 transition-colors hover:border-blue-800 hover:text-blue-800 dark:border-zinc-300 dark:text-zinc-100 dark:hover:border-blue-300 dark:hover:text-blue-300"
                      >
                        Open separately
                        <ExternalLink
                          size={15}
                          className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    )}
                  </div>

                  {/* Browser-like Preview */}
                  <div className="max-h-[600px] bg-gray-100 p-3 transition-colors duration-300 dark:bg-zinc-900/70 sm:p-5">
                    <div className="overflow-hidden border border-gray-200 bg-white shadow-sm transition-colors duration-300 dark:border-zinc-700 dark:bg-zinc-950">
                      {/* Browser Bar */}
                      <div className="flex h-11 items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 dark:border-zinc-800 dark:bg-zinc-900">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-600" />

                        <div className="ml-3 flex-1 truncate border border-gray-200 bg-white px-3 py-1 text-xs text-gray-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-500">
                          {projectPath || "No project selected"}
                        </div>
                      </div>

                      {/* Project iframe */}
                      {projectPath ? (
                        <iframe
                          key={projectPath}
                          src={projectPath}
                          title={`${selectedProject} preview`}
                          className="block h-[650px] w-full border-0 bg-white dark:bg-zinc-950"
                        />
                      ) : (
                        <div className="flex h-[650px] items-center justify-center text-sm text-gray-500 dark:text-zinc-400">
                          No JavaScript experiments are available yet.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </PageTransition>
    </>
  );
}
