"use client";

import Footer from "@/components/Footer";
import { projects } from "@/project-paths";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Pacifico } from "next/font/google";
import { useState } from "react";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

const LabPage = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  const projectPath = `/projects/${selectedProject.trim()}/index.html`;

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="border-b border-gray-200 px-6 pb-12 pt-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
            JavaScript Lab
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Small projects.
            <br />
            <span className={`${pacifico.className} text-blue-800`}>
              Real experiments.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            A collection of small JavaScript projects, browser experiments, UI
            interactions, and programming exercises built while learning and
            experimenting.
          </p>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid overflow-hidden border border-gray-200 bg-white lg:grid-cols-[280px_1fr]">
            <aside className="border-b border-gray-200 bg-gray-50 lg:border-b-0 lg:border-r h-full">
              <div className="border-b border-gray-200 px-5 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                      Experiments
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {projects.length} Projects
                    </p>
                  </div>

                  <span className="flex h-8 w-8 items-center justify-center border border-gray-200 bg-white text-xs font-medium text-gray-500">
                    {String(projects.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <nav className="max-h-[600px] overflow-y-auto p-3">
                <ul className="space-y-1">
                  {projects.map((project, index) => {
                    const isActive = selectedProject === project;

                    return (
                      <li key={project}>
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className={`group flex w-full items-center gap-3 px-3 py-3 text-left transition-all duration-200 ${
                            isActive
                              ? "bg-blue-800 text-white"
                              : "text-gray-600 hover:bg-white hover:text-gray-900"
                          }`}
                        >
                          <span
                            className={`w-7 shrink-0 text-xs font-medium ${
                              isActive ? "text-blue-200" : "text-gray-400"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="min-w-0 flex-1 truncate text-sm font-medium" title={project}>
                            {project.toUpperCase().replace(/^\d+-/, "").replace(/-/g, " ")}
                          </span>

                          <ArrowUpRight
                            size={14}
                            className={`shrink-0 transition-transform duration-200 ${
                              isActive
                                ? "rotate-45"
                                : "opacity-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                            }`}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            <div className="min-w-0">
              {/* Preview Header */}
              <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                    Current Project
                  </p>

                  <h2 className="mt-1 truncate text-lg font-semibold capitalize text-gray-900">
                    {selectedProject.replace(/^\d+-/, "").replace(/-/g, " ")}
                  </h2>
                </div>

                <a
                  href={projectPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit shrink-0 items-center gap-2 border-b border-gray-900 pb-1 text-sm font-semibold text-gray-900"
                >
                  Open separately
                  <ExternalLink
                    size={15}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>

              {/* Browser-like Preview */}
              <div className="bg-gray-100 p-3 sm:p-5 max-h-[600px]">
                <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
                  {/* Browser Bar */}
                  <div className="flex h-11 items-center gap-2 border-b border-gray-200 bg-gray-50 px-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-600" />

                    <div className="ml-3 flex-1 truncate border border-gray-200 bg-white px-3 py-1 text-xs text-gray-400">
                      {projectPath}
                    </div>
                  </div>

                  {/* Project iframe */}
                  <iframe
                    key={projectPath}
                    src={projectPath}
                    title={`${selectedProject} preview`}
                    className="block h-[650px] w-full border-0 bg-white"
                  >
                   
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default LabPage;
