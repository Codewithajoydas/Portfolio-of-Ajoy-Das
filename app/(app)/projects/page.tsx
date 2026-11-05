import Footer from "@/components/Footer";
import PageTransition from "@/components/page-transition";
import ProjectFilters from "@/components/ProjectFilters";
import {
  absoluteUrl,
  createSeoMetadata,
  safeJsonLd,
} from "@/lib/seo";
import { connectDB } from "@/lib/connectDb";
import ProjectModel from "@/models/project.model";
import { Pacifico } from "next/font/google";
import type { Project } from "@/types/content";
import type { SerializedProject } from "@/types/content";
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
      .sort({ featured: -1, createdAt: -1 })
      .lean()
      .exec();
  } catch (error) {
    console.error("Failed to load projects:", error);
  }
  // Convert MongoDB values into serializable JavaScript values.
  const serializedProjects: SerializedProject[] =
    publishedProjects.map((project) => ({
      ...project,
      _id: project?._id?.toString()??project.slug,
      createdAt: project.createdAt?.toString(),
      updatedAt: project.updatedAt?.toString(),
    }));
  // Extract unique technologies.
  const technologies = Array.from(
    new Set(
      serializedProjects.flatMap(
        (project) => project.techStack ?? []
      )
    )
  ).sort((a, b) => a.localeCompare(b));
  // Generate structured data.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects",
    description: "Software projects built by Ajoy Das.",
    url: absoluteUrl("/projects"),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: serializedProjects.length,
      itemListElement: serializedProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.name,
        url: absoluteUrl(`/projects/${project.slug}`),
      })),
    },
  };
  return (
    <PageTransition>
      <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={safeJsonLd(structuredData)}
        />
        {/* Hero Section */}
        <section className="border-b border-gray-200 bg-linear-to-b from-blue-50 via-white to-white px-5 pb-12 pt-28 transition-colors duration-300 dark:border-zinc-800 dark:from-blue-950 dark:via-zinc-950 dark:to-zinc-950 sm:px-8 sm:pb-16 sm:pt-32 lg:px-12 lg:pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <p className="text-xs uppercase tracking-[0.22em] text-gray-600 dark:text-zinc-400 sm:text-sm">
                    Projects & Experiments
                  </p>
                </div>
                <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                  Things I&apos;ve
                  <br />
                  <span
                    className={`text-blue-800 dark:text-blue-800 ${pacifico.className}`}
                  >
                    actually built.
                  </span>
                </h1>
              </div>
              <div className="max-w-lg lg:justify-self-end lg:pb-2">
                <p className="text-base leading-7 text-gray-600 dark:text-zinc-400 sm:text-lg sm:leading-8">
                  A collection of applications, developer tools,
                  experiments, and systems built while learning and
                  solving real problems.
                </p>
                <div className="mt-7 flex items-center gap-3 border-t border-gray-200 pt-5 dark:border-zinc-800">
                  <span className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-zinc-100">
                    {serializedProjects.length.toString().padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                      Published projects
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-zinc-500">
                      Built with curiosity and purpose
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Projects Section */}
        <section className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-3 border-b border-gray-200 pb-5 dark:border-zinc-800">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-800 dark:text-blue-800">
                  The collection
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Selected work
                </h2>
              </div>
              <ProjectFilters
                projects={serializedProjects}
                technologies={technologies}
              />
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </PageTransition>
  );
}
