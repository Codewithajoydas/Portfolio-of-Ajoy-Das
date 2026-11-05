import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { ArrowUpRight } from "lucide-react";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { connectDB } from "@/lib/connectDb";
import ProjectModel from "@/models/project.model";
import { Project } from "@/types/content";
import { absoluteUrl, safeJsonLd } from "@/lib/seo";
import PageTransition from "@/components/page-transition";
import Script from "next/script";
export const revalidate = 0;
export const dynamic = "force-dynamic";
const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});
const thingsIBuild = [
  {
    number: "01",
    title: "Web Applications",
    description:
      "Full-stack applications with real workflows, authentication, databases, APIs, and responsive interfaces.",
  },
  {
    number: "02",
    title: "Developer Tools",
    description:
      "CLI tools, utilities, generators, and development systems built to make repetitive work simpler.",
  },
  {
    number: "03",
    title: "JavaScript Labs",
    description:
      "Focused experiments for understanding JavaScript, browser APIs, performance, and programming concepts.",
  },
  {
    number: "04",
    title: "Engineering Systems",
    description:
      "Backend systems, automation, architecture, and tooling designed with maintainability in mind.",
  },
];
const howIThink = [
  {
    number: "01",
    title: "Understand First",
    description:
      "I break problems down and understand the moving parts before jumping into implementation.",
  },
  {
    number: "02",
    title: "Build to Learn",
    description:
      "I turn concepts into working software because building exposes problems that theory alone cannot.",
  },
  {
    number: "03",
    title: "Fundamentals Matter",
    description:
      "Tools and frameworks change. Strong fundamentals make it easier to understand and adapt to them.",
  },
  {
    number: "04",
    title: "Improve Continuously",
    description:
      "Build, discover problems, refactor, simplify, and build again. Improvement is part of the process.",
  },
];
export default async function Home() {
  let projects: Project[] = [];
  try {
    await connectDB();
    const projectDocuments = await ProjectModel.find({
      published: true,
    })
      .lean()
      .exec();
    projects = projectDocuments as unknown as Project[];
  } catch (error) {
    console.error("Failed to load projects for homepage:", error);
    projects = [];
  }
  const featuredProjects = projects.filter(
    (project) => project.featured === true && project.published === true,
  );
  const siteUrl = absoluteUrl("/");
const heroImageUrl = new URL(
  "/images/Codewithajoydas_Hero-page.png",
  siteUrl,
).toString();
const aboutImageUrl = new URL(
  "/images/Codewithajoydas_About-page.png",
  siteUrl,
).toString();
  return (
    <>
<Script
  id="about-page-structured-data"
  type="application/ld+json"
  dangerouslySetInnerHTML={safeJsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}#person`,
        name: "Ajoy Das",
        url: siteUrl,
        jobTitle: "Software Developer",
        email: "codewithajoydas@gmail.com",
        image: {
          "@id": `${siteUrl}#hero-image`,
        },
        address: {
          "@type": "PostalAddress",
          addressRegion: "Assam",
          addressCountry: "IN",
        },
        sameAs: [
          "https://github.com/Codewithajoydas",
          "https://www.instagram.com/codewithajoydas",
          "https://www.facebook.com/profile.php?id=100090674957174",
          "https://www.youtube.com/@codewithajoydas",
        ],
        knowsAbout: [
          "Software Development",
          "Web Development",
          "JavaScript",
          "TypeScript",
          "React",
          "Next.js",
          "Node.js",
          "Frontend Development",
          "Backend Development",
          "Full Stack Development",
          "Database Design",
          "API Development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: "Ajoy Das",
        alternateName: "Codewithajoydas",
        publisher: {
          "@id": `${siteUrl}#person`,
        },
        creator: {
          "@id": `${siteUrl}#person`,
        },
        inLanguage: "en-IN",
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}#webpage`,
        url: siteUrl,
        name: "Ajoy Das | Software Developer",
        description:
          "Official portfolio of Ajoy Das, Software Developer. Explore software projects, developer tools, experiments, and engineering work.",
        isPartOf: {
          "@id": `${siteUrl}#website`,
        },
        about: {
          "@id": `${siteUrl}#person`,
        },
        mainEntity: {
          "@id": `${siteUrl}#person`,
        },
        primaryImageOfPage: {
          "@id": `${siteUrl}#hero-image`,
        },
        image: [
          {
            "@id": `${siteUrl}#hero-image`,
          },
          {
            "@id": `${siteUrl}#about-image`,
          },
        ],
        inLanguage: "en-IN",
      },
      {
        "@type": "ImageObject",
        "@id": `${siteUrl}#hero-image`,
        url: heroImageUrl,
        contentUrl: heroImageUrl,
        name: "Ajoy Das - Software Developer",
        caption: "Ajoy Das, Software Developer",
        representativeOfPage: true,
      },
      {
        "@type": "ImageObject",
        "@id": `${siteUrl}#about-image`,
        url: aboutImageUrl,
        contentUrl: aboutImageUrl,
        name: "Ajoy Das - Development Skills",
        caption: "Development and engineering skills",
      },
      ...(featuredProjects.length > 0
        ? [
            {
              "@type": "ItemList",
              "@id": `${siteUrl}#featured-projects`,
              name: "Featured Projects by Ajoy Das",
              description:
                "A collection of featured software projects, applications, and developer tools.",
              numberOfItems: featuredProjects.length,
              itemListElement: featuredProjects.map(
                (project, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@id": `${absoluteUrl(
                      `/projects/${project.slug}`,
                    )}#project`,
                  },
                }),
              ),
            },
            ...featuredProjects.flatMap((project) => {
              const projectUrl = absoluteUrl(
                `/projects/${project.slug}`,
              );
              const imageUrl = new URL(
                project.thumbnail ||
                  "/images/projects/project-placeholder.png",
                siteUrl,
              ).toString();
              const imageId =
                `${siteUrl}#project-image-${encodeURIComponent(
                  project.slug,
                )}`;
              return [
                {
                  "@type": "ImageObject",
                  "@id": imageId,
                  url: imageUrl,
                  contentUrl: imageUrl,
                  name: `${project.name} - Project Thumbnail`,
                  caption: `Preview of ${project.name}`,
                },
                {
                  "@type": "CreativeWork",
                  "@id": `${projectUrl}#project`,
                  name: project.name,
                  url: projectUrl,
                  image: {
                    "@id": imageId,
                  },
                  creator: {
                    "@id": `${siteUrl}#person`,
                  },
                  author: {
                    "@id": `${siteUrl}#person`,
                  },
                },
              ];
            }),
          ]
        : []),
    ],
  })}
/>
      <PageTransition>
        <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
          <section className="relative flex min-h-screen items-center overflow-hidden bg-linear-to-br from-blue-50 via-white to-white px-6 py-24 sm:px-10 lg:px-16 dark:bg-gradient-to-br dark:from-blue-950 dark:via-zinc-950 dark:to-zinc-950 transition-colors duration-500">
            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-12 lg:flex-row lg:gap-8">
              <div className="w-full flex-1 lg:max-w-3xl">
                <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-gray-600 dark:text-zinc-400">
                  Software Developer
                </p>
                <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                  Hi, I&apos;m{" "}
                  <span
                    className={`${pacifico.className} text-blue-800 dark:text-blue-800`}
                  >
                    Codewithajoydas
                  </span>
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl dark:text-zinc-300">
                  I&apos;m a software developer who enjoys turning ideas into
                  real, scalable products. I build, experiment, and learn across
                  the full stack — from interfaces and APIs to the systems
                  behind them.
                </p>
                <p className="mt-4 max-w-xl text-base leading-7 text-gray-500 dark:text-zinc-400">
                  This portfolio is my engineering playground — a collection of
                  projects, experiments, tools, and things I&apos;ve built while
                  becoming a better developer.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#projects"
                    className="group inline-flex items-center gap-2 bg-blue-800 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.01] hover:bg-blue-700 hover:shadow-lg"
                  >
                    Explore my work
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:rotate-45"
                    />
                  </a>
                  <Link
                    href="/about"
                    className="inline-flex items-center bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors duration-300 hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                  >
                    About me
                  </Link>
                </div>
              </div>
              <div className="relative flex w-full flex-1 justify-center lg:min-h-150 lg:justify-end">
                <div className="relative h-[85%] w-[70%] sm:h-125 sm:w-[75%] lg:h-150 lg:w-[80%]">
                  <Image
                    src="/images/Codewithajoydas_Hero-page.png"
                    alt="Ajoy Das — Software Developer"
                    fill
                    priority
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    className="object-contain object-bottom"
                  />
                  <div className="absolute bottom-0 h-25 w-full bg-linear-to-t from-gray-50 to-transparent dark:from-zinc-950" />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-32 top-1/2 h-125 w-125 -translate-y-1/2 rounded-full bg-blue-100/30 blur-3xl dark:bg-blue-500/10" />
          </section>
          <section
            id="what-i-build"
            className="bg-white px-6 py-24 sm:px-10 lg:px-16 lg:py-32 dark:bg-zinc-950"
          >
            <div className="mx-auto w-full max-w-7xl">
              <div className="grid items-center gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
                <div className="relative flex justify-center lg:justify-start">
                  <div className="relative w-full">
                    <Image
                      src="/images/Codewithajoydas_About-page.png"
                      alt="Codewithajoydas development skills"
                      width={500}
                      height={500}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div>
                  <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-gray-500 dark:text-zinc-400">
                    What I Build
                  </p>
                  <h2 className="max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-zinc-100">
                    From small experiments to{" "}
                    <span
                      className={`${pacifico.className} text-blue-800 dark:text-blue-800`}
                    >
                      complete software systems.
                    </span>
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-zinc-300">
                    I build full-stack applications, developer tools, automation
                    workflows, and JavaScript experiments — turning ideas into
                    software that is useful, maintainable, and built with a deep
                    understanding of how things work.
                  </p>
                  <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
                    {thingsIBuild.map((item) => (
                      <div
                        key={item.number}
                        className="group border-t border-gray-200 pt-5 dark:border-zinc-800"
                      >
                        <span className="text-xs font-medium tracking-[0.2em] text-gray-400 dark:text-zinc-500">
                          {item.number}
                        </span>
                        <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-zinc-100">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-zinc-400">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            id="projects"
            className="bg-gray-50 px-6 py-24 sm:px-10 lg:px-16 lg:py-32 dark:bg-zinc-900/60"
          >
            <div className="mx-auto w-full max-w-7xl">
              <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500 dark:text-zinc-400">
                    Featured Work
                  </p>
                  <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-zinc-100">
                    Things I&apos;ve{" "}
                    <span
                      className={`${pacifico.className} text-blue-800 dark:text-blue-800`}
                    >
                      actually built
                    </span>
                    .
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600 dark:text-zinc-300">
                    A selection of featured applications, developer tools, and
                    experiments from my journey of learning and building
                    software.
                  </p>
                </div>
                <Link
                  href="/projects"
                  className="group inline-flex w-fit items-center gap-2 border-b border-gray-900 pb-1 dark:border-zinc-300 text-sm font-semibold text-gray-900 dark:text-zinc-100"
                >
                  View all projects
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>
              </div>
              {featuredProjects.length > 0 ? (
                <div className="mt-14 flex flex-wrap items-center justify-center">
                  {featuredProjects.map((project: Project) => (
                    <ProjectCard
                      key={String(project._id)}
                      title={project.name}
                      link={`/projects/${project.slug}`}
                      image={
                        project.thumbnail ||
                        "/images/projects/project-placeholder.png"
                      }
                      type={project.type}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-14 flex min-h-40 items-center justify-center border border-dashed border-gray-300 dark:border-zinc-700">
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    No featured projects available.
                  </p>
                </div>
              )}
            </div>
          </section>
          <section
            id="how-i-think"
            className="bg-white px-6 py-24 sm:px-10 lg:px-16 lg:py-32 dark:bg-zinc-950"
          >
            <div className="mx-auto w-full max-w-7xl">
              <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500 dark:text-zinc-400">
                    How I Think
                  </p>
                  <h2 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-zinc-100">
                    I don&apos;t just want to{" "}
                    <span
                      className={`${pacifico.className} text-blue-800 dark:text-blue-800`}
                    >
                      build things.
                    </span>
                  </h2>
                  <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600 dark:text-zinc-300">
                    I want to understand how they work, why they work, and how
                    they can be made better.
                  </p>
                  <Link
                    href="/about"
                    className="group mt-8 inline-flex items-center gap-2 border-b border-gray-900 pb-1 dark:border-zinc-300 text-sm font-semibold text-gray-900 dark:text-zinc-100"
                  >
                    More about me
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
                <div className="border-t border-gray-200 dark:border-zinc-800">
                  {howIThink.map((item) => (
                    <div
                      key={item.number}
                      className="grid gap-4 border-b border-gray-200 py-8 sm:grid-cols-[70px_190px_1fr] dark:border-zinc-800"
                    >
                      <span className="text-xs font-medium tracking-[0.2em] text-gray-400 dark:text-zinc-500">
                        {item.number}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">
                        {item.title}
                      </h3>
                      <p className="max-w-xl text-sm leading-7 text-gray-600 dark:text-zinc-400">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section
            id="contact-cta"
            className="relative overflow-hidden bg-blue-900 px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32 dark:bg-blue-950"
          >
            <div className="pointer-events-none absolute -right-32 -top-32 h-100 w-100 rounded-full bg-blue-700/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-112.5 w-112.5 rounded-full bg-blue-800/50 blur-3xl" />
            <div className="relative z-10 mx-auto max-w-7xl">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-200">
                Let&apos;s Build
              </p>
              <h2 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
                Have an idea?
                <br />
                <span className={`${pacifico.className} text-blue-200`}>
                  Let&apos;s make it real.
                </span>
              </h2>
              <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xl text-base leading-7 text-blue-100 sm:text-lg">
                  Whether it&apos;s a product, an interesting technical problem,
                  or something worth experimenting with, I&apos;m always
                  interested in building useful software.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex w-fit shrink-0 items-center gap-3 bg-white px-7 py-4 text-sm font-semibold text-blue-900 transition-all duration-300 hover:bg-blue-50 hover:shadow-xl"
                >
                  Get in touch
                  <ArrowUpRight
                    size={19}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                </Link>
              </div>
            </div>
          </section>
          <Footer />
        </main>
      </PageTransition>
    </>
  );
}
