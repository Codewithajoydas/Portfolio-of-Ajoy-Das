import React from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Layers3,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FaGithub } from "react-icons/fa";
import { Pacifico } from "next/font/google";
import fs from "fs/promises";
import path from "path";

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

const fetchProjects = async (): Promise<Project[]> => {
  const filePath = path.join(process.cwd(), "public", "projects.json");

  const file = await fs.readFile(filePath, "utf-8");
  const data: ProjectsData = JSON.parse(file);

  return data.projects;
};

const categories = [
  "All",
  "Developer Tool",
  "Application",
  "Full-stack Platform",
];

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <main className="min-h-screen bg-white text-gray-900">
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
                  className={`${pacifico.className} text-blue-800`}
                >
                  actually built.
                </span>
              </h1>
            </div>

            <p className="max-w-xl text-base leading-7 text-gray-600 lg:pb-2">
              A collection of applications, developer tools, experiments,
              and systems I&apos;ve built while learning and solving real
              problems.
            </p>
          </div>
        </div>
      </section>

      {/* Project List */}
      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">

          {/* Filter */}
          <div className="mb-12 flex flex-wrap items-center gap-2">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`
                  border px-4 py-2 text-sm transition-colors
                  ${
                    index === 0
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-900 hover:text-gray-900"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects */}
          <div className="space-y-10">
            {projects.map((project) => (
              <article
                key={project.id}
                className="
                  group
                  grid
                  overflow-hidden
                  border
                  border-gray-200
                  bg-white
                  transition-all
                  duration-300
                  hover:border-gray-300
                  hover:shadow-[6px_6px_0px_#193cb8]
                  lg:grid-cols-[1.15fr_1fr]
                "
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-gray-100 lg:aspect-auto lg:min-h-[360px]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-[1.03]
                    "
                  />

                  <div className="absolute left-5 top-5 bg-white px-3 py-1.5 font-mono text-xs text-gray-600">
                    {project.id}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-7 sm:p-9">
                  <div>
                    {/* Category */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-medium uppercase tracking-[0.15em] text-blue-800">
                        {project.category}
                      </span>

                      <Layers3
                        size={18}
                        className="text-gray-400"
                      />
                    </div>

                    {/* Title */}
                    <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                      {project.title}
                    </h2>

                    {/* Description */}
                    <p className="mt-5 max-w-xl leading-7 text-gray-600">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies.length > 0 && (
                      <div className="mt-7 flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="
                              border
                              border-gray-200
                              bg-gray-50
                              px-3
                              py-1.5
                              text-xs
                              font-medium
                              text-gray-600
                            "
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Links */}
                  <div className="mt-10 flex flex-wrap gap-3">
                    {/* GitHub */}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          items-center
                          gap-2
                          bg-gray-900
                          px-5
                          py-2.5
                          text-sm
                          font-medium
                          text-white
                          transition-colors
                          hover:bg-blue-800
                        "
                      >
                        <FaGithub size={16} />
                        GitHub
                      </a>
                    )}

                    {/* Details */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        border
                        border-gray-300
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-gray-900
                        transition-colors
                        hover:border-gray-900
                      "
                    >
                      View details
                      <ArrowUpRight size={16} />
                    </Link>

                    {/* Live */}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-4
                          py-2.5
                          text-sm
                          font-medium
                          text-gray-600
                          transition-colors
                          hover:text-gray-900
                        "
                      >
                        Live
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-gray-200 px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800">
            Want to know more?
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Explore how I think, learn, and build.
          </h2>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/about"
              className="
                inline-flex
                items-center
                gap-2
                bg-gray-900
                px-6
                py-3
                text-sm
                font-medium
                text-white
                transition-colors
                hover:bg-blue-800
              "
            >
              About me
              <ArrowUpRight size={17} />
            </Link>

            <Link
              href="/skills"
              className="
                inline-flex
                items-center
                gap-2
                border
                border-gray-300
                px-6
                py-3
                text-sm
                font-medium
                text-gray-900
                transition-colors
                hover:border-gray-900
              "
            >
              My skills
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
