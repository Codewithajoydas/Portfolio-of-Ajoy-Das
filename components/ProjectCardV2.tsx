import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Layers3, ExternalLink } from 'lucide-react';

export interface Project {
  _id?: { toString(): string } | string;
  slug: string;
  name: string;
  banner?: string;
  thumbnail?: string;
  year?: string | number;
  category: string;
  shortDescription?: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardKey = project._id?.toString() ?? project.slug;
  const imageSrc = project.banner || project.thumbnail;

  return (
    <article 
      key={cardKey} 
      className="group relative flex h-full flex-col overflow-hidden rounded-none border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:shadow-[4px_4px_0px_#193cb8] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-500 dark:hover:shadow-[4px_4px_0px_#193cb8]"
    >
      {/* 1. Strictly Confined Image Wrapper Frame */}
      <div className="relative block aspect-[16/9] w-full overflow-hidden bg-gray-50 dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-800/50">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={project.name || "Project preview"} 
              loading="lazy" 
              // object-cover forces the image to span and scale uniformly without distorting the layout container
              className="object-cover object-top select-none pointer-events-none transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="text-[10px] font-bold tracking-widest text-gray-400 dark:text-zinc-500 uppercase">
              No Preview
            </div>
          )}
        </div>

        {/* Floating Badges */}
        {project.year && (
          <span className="absolute left-3 top-3 z-10 rounded-none bg-white/90 border border-gray-200/80 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-gray-800 shadow-sm dark:bg-zinc-900/90 dark:border-zinc-700 dark:text-zinc-300">
            {project.year}
          </span>
        )}
      </div>

      {/* Tighter Content Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category & Title */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-400">
            {project.category}
          </span>
          <h3 className="text-base font-bold tracking-tight text-gray-900 dark:text-zinc-100">
            <Link 
              href={`/projects/${project.slug}`} 
              className="focus:outline-none after:absolute after:inset-0 after:rounded-none"
            >
              <span className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200">
                {project.name}
              </span>
            </Link>
          </h3>
        </div>

        {/* Shorter Description */}
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500 dark:text-zinc-400" title={project.shortDescription}>
          {project.shortDescription}
        </p>

        {/* Tech Stack - Inline Micro Tags */}
        {Array.isArray(project.techStack) && project.techStack.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-1">
              {project.techStack.slice(0, 3).map((tech: string) => (
                <span 
                  key={tech} 
                  className="rounded-none border border-gray-100 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:border-zinc-800/80 dark:bg-zinc-800/40 dark:text-zinc-400"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-[10px] font-medium text-gray-400 self-center pl-1 dark:text-zinc-500">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions Area */}
        <div className="relative z-10 mt-auto pt-4 flex items-center justify-between border-t border-gray-100 dark:border-zinc-800/60">
          <Link 
            href={`/projects/${project.slug}`} 
            className="inline-flex items-center gap-1 text-xs font-bold text-gray-900 hover:text-blue-700 dark:text-zinc-100 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Details
            <ArrowUpRight size={13} />
          </Link>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`View ${project.name} on GitHub`} 
                className="rounded-none p-1 text-gray-400 hover:text-gray-900 dark:text-zinc-500 dark:hover:text-zinc-200"
              >
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            )}
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`Open live ${project.name} demo`} 
                className="rounded-none border border-gray-900 bg-gray-900 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm transition-all hover:bg-transparent hover:text-gray-900 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-transparent dark:hover:text-zinc-100"
              >
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
