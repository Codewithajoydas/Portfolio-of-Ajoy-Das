
"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCardV2";
import type { Project } from "@/types/content";

interface ProjectFiltersProps {
  projects: Project[];
  technologies: string[];
}

export default function ProjectFilters({
  projects,
  technologies,
}: ProjectFiltersProps) {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

  const filteredProjects = useMemo(() => {
    if (selectedTechnologies.length === 0) {
      return projects;
    }

    return projects.filter((project) =>
      selectedTechnologies.every((technology) =>
        project.techStack.includes(technology)
      )
    );
  }, [projects, selectedTechnologies]);

  const toggleTechnology = (technology: string) => {
    setSelectedTechnologies((previous) =>
      previous.includes(technology)
        ? previous.filter((item) => item !== technology)
        : [...previous, technology]
    );
  };

  return (
    <>
      {/* Technology Filters */}
      <div className="mt-2 flex flex-nowrap gap-2 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedTechnologies([])}
          aria-pressed={selectedTechnologies.length === 0}
          className={`shrink-0 rounded px-3 py-1 text-xs font-medium transition-colors ${
            selectedTechnologies.length === 0
              ? "bg-blue-800 text-white dark:bg-blue-800"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          }`}
        >
          All
        </button>

        {technologies.map((technology) => {
          const isSelected = selectedTechnologies.includes(technology);

          return (
            <button
              key={technology}
              type="button"
              onClick={() => toggleTechnology(technology)}
              aria-pressed={isSelected}
              className={`shrink-0 rounded px-3 py-1 text-xs font-medium transition-colors ${
                isSelected
                  ? "bg-blue-800 text-white dark:bg-blue-800"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              }`}
            >
              {technology}
            </button>
          );
        })}
      </div>

      {/* Project Count */}
      <p className="mt-5 text-sm text-gray-500 dark:text-zinc-400">
        Showing {filteredProjects.length} of {projects.length} projects
      </p>

      {/* Filtered Projects */}
      {filteredProjects.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard project={project} key={project?._id?.toString()??project.slug} />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex min-h-64 flex-col items-center justify-center border border-dashed border-gray-300 px-5 text-center dark:border-zinc-700">
          <h2 className="text-lg font-semibold">
            No matching projects
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-500">
            Try selecting different technologies.
          </p>

          <button
            type="button"
            onClick={() => setSelectedTechnologies([])}
            className="mt-4 rounded bg-blue-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
