import Footer from "@/components/Footer";
import PageTransition from "@/components/page-transition";
import SkillLevelChip, {
  type SkillLevel,
} from "@/components/SkillLevelChip";
import {
  ArrowUpRight,
  Braces,
  Database,
  GitBranch,
  Globe,
  Layers3,
  Server,
  Wrench,
  Smartphone,
} from "lucide-react";
import { Pacifico } from "next/font/google";
import Link from "next/link";
import { createSeoMetadata } from "@/lib/seo";
import type { ElementType } from "react";
const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});
export const metadata = createSeoMetadata({
  title: "Skills",
  description:
    "Explore Ajoy Das&apos;s software development skills across JavaScript, TypeScript, React, Next.js, backend systems, mobile development, and developer tools.",
  path: "/skills",
});
interface Skill {
  name: string;
  level: SkillLevel;
  description: string;
}
interface SkillGroup {
  number: string;
  title: string;
  description: string;
  icon: ElementType;
  skills: Skill[];
}
const skillGroups: SkillGroup[] = [
  {
    number: "01",
    title: "Languages",
    description:
      "Programming and markup languages I use to build applications and understand software at a deeper level.",
    icon: Braces,
    skills: [
      {
        name: "JavaScript",
        level: "Advanced",
        description:
          "Core language mechanics, execution contexts, closures, prototypes, asynchronous programming, promises, DOM, browser APIs, functional programming, and modern JavaScript.",
      },
      {
        name: "TypeScript",
        level: "Proficient",
        description:
          "Type-safe application development, interfaces, type aliases, generics, utility types, type narrowing, and typed application architecture.",
      },
      {
        name: "HTML",
        level: "Advanced",
        description:
          "Semantic markup, accessibility, forms, document structure, metadata, and modern HTML APIs.",
      },
      {
        name: "CSS",
        level: "Advanced",
        description:
          "Responsive layouts, Flexbox, Grid, animations, positioning, modern CSS features, and utility-first styling workflows.",
      },
      {
        name: "SQL",
        level: "Learning",
        description:
          "Relational data modeling, queries, joins, filtering, aggregation, and database fundamentals.",
      },
    ],
  },
  {
    number: "02",
    title: "Frontend Development",
    description:
      "Frameworks and technologies I use to build interactive, accessible, responsive, and maintainable user interfaces.",
    icon: Globe,
    skills: [
      {
        name: "React",
        level: "Advanced",
        description:
          "Component architecture, hooks, state management, composition, reusable components, rendering behavior, and application structure.",
      },
      {
        name: "Next.js",
        level: "Advanced",
        description:
          "Full-stack React applications, App Router, Server Components, Client Components, routing, metadata, SEO, rendering strategies, and API routes.",
      },
      {
        name: "Tailwind CSS",
        level: "Advanced",
        description:
          "Utility-first styling, responsive interfaces, dark mode, design systems, component-level UI development, and custom configurations.",
      },
      {
        name: "Sass",
        level: "Working Knowledge",
        description:
          "Structured CSS, variables, nesting, mixins, reusable styles, and scalable styling approaches.",
      },
    ],
  },
  {
    number: "03",
    title: "Backend Development",
    description:
      "Server-side technologies I use to build APIs, business logic, authentication systems, and application services.",
    icon: Server,
    skills: [
      {
        name: "Node.js",
        level: "Advanced",
        description:
          "Server-side JavaScript, filesystem APIs, streams, processes, modules, asynchronous operations, and backend tooling.",
      },
      {
        name: "Express.js",
        level: "Advanced",
        description:
          "REST APIs, middleware, routing, authentication, validation, error handling, and backend application architecture.",
      },
      {
        name: "REST APIs",
        level: "Advanced",
        description:
          "API design, HTTP methods, status codes, request and response handling, authentication, validation, and error handling.",
      },
      {
        name: "Authentication",
        level: "Working Knowledge",
        description:
          "Authentication flows, sessions, JWT-based systems, authorization, protected resources, and access control.",
      },
    ],
  },
  {
    number: "04",
    title: "Databases",
    description:
      "Database technologies and concepts I use for storing, managing, querying, and organizing application data.",
    icon: Database,
    skills: [
      {
        name: "MongoDB",
        level: "Advanced",
        description:
          "Document-oriented data modeling, queries, indexes, aggregation pipelines, and application integration.",
      },
      {
        name: "Mongoose",
        level: "Advanced",
        description:
          "MongoDB schemas, models, validation, relationships, middleware, queries, and application-level data modeling.",
      },
      {
        name: "Database Design",
        level: "Working Knowledge",
        description:
          "Data relationships, schema structure, consistency, indexing, normalization concepts, and application requirements.",
      },
    ],
  },
  {
    number: "05",
    title: "Developer Tooling",
    description:
      "Tools and systems I explore to build, automate, test, bundle, package, and improve development workflows.",
    icon: Wrench,
    skills: [
      {
        name: "Git",
        level: "Advanced",
        description:
          "Version control, branching, commits, merges, remotes, history, and structured development workflows.",
      },
      {
        name: "GitHub",
        level: "Proficient",
        description:
          "Repositories, branches, commits, pull requests, releases, project management, and collaboration workflows.",
      },
      {
        name: "Webpack",
        level: "Working Knowledge",
        description:
          "Bundling, loaders, plugins, configuration, optimization, and module processing.",
      },
      {
        name: "esbuild",
        level: "Working Knowledge",
        description:
          "JavaScript and TypeScript bundling, build configuration, plugins, and fast development tooling.",
      },
      {
        name: "npm",
        level: "Advanced",
        description:
          "Package management, scripts, dependencies, package configuration, and Node.js project workflows.",
      },
      {
        name: "CLI Development",
        level: "Working Knowledge",
        description:
          "Command-line application development, arguments, prompts, validation, logging, and automation workflows.",
      },
    ],
  },
  {
    number: "06",
    title: "Architecture & Engineering",
    description:
      "Engineering concepts I explore when designing applications and thinking beyond individual components.",
    icon: Layers3,
    skills: [
      {
        name: "System Design",
        level: "Learning",
        description:
          "Exploring system architecture, components, communication, scalability, reliability, and engineering trade-offs.",
      },
      {
        name: "Software Architecture",
        level: "Working Knowledge",
        description:
          "Separation of concerns, modularity, application structure, reusable abstractions, and maintainability.",
      },
      {
        name: "Web Performance",
        level: "Working Knowledge",
        description:
          "Lazy loading, code splitting, tree shaking, rendering performance, caching, and optimization techniques.",
      },
      {
        name: "Testing",
        level: "Working Knowledge",
        description:
          "Unit testing, test structure, assertions, mocking, Jest, and JavaScript testing workflows.",
      },
    ],
  },
  {
    number: "07",
    title: "Mobile & Desktop Development",
    description:
      "Technologies I use to explore application development beyond traditional web interfaces.",
    icon: Smartphone,
    skills: [
      {
        name: "React Native",
        level: "Working Knowledge",
        description:
          "Cross-platform mobile application development, native components, layouts, and application workflows.",
      },
      {
        name: "Expo",
        level: "Working Knowledge",
        description:
          "React Native development, Expo Router, project configuration, native capabilities, and application lifecycle.",
      },
      {
        name: "Electron",
        level: "Learning",
        description:
          "Exploring desktop application development using web technologies and Node.js.",
      },
    ],
  },
  {
    number: "08",
    title: "Development Workflows",
    description:
      "Practices and engineering workflows that help me organize projects and improve development productivity.",
    icon: GitBranch,
    skills: [
      {
        name: "Monorepos",
        level: "Working Knowledge",
        description:
          "Organizing multiple applications and shared packages within a single repository.",
      },
      {
        name: "CI/CD",
        level: "Learning",
        description:
          "Exploring automated builds, testing, deployment, and continuous delivery pipelines.",
      },
      {
        name: "Debugging",
        level: "Proficient",
        description:
          "Identifying problems, inspecting application behavior, understanding errors, and finding practical solutions.",
      },
    ],
  },
];
const levelLegend: SkillLevel[] = [
  "Advanced",
  "Proficient",
  "Working Knowledge",
  "Learning",
];
type SkillsPageProps = {
  searchParams: Promise<{ level?: string }>;
};
export default async function SkillsPage({ searchParams }: SkillsPageProps) {
  const { level: requestedLevel } = await searchParams;
  const activeLevel: SkillLevel | "All" =
    levelLegend.includes(requestedLevel as SkillLevel)
      ? (requestedLevel as SkillLevel)
      : "All";
  const filteredSkillGroups = skillGroups
    .map((group) => ({
      ...group,
      skills:
        activeLevel === "All"
          ? group.skills
          : group.skills.filter((skill) => skill.level === activeLevel),
    }))
    .filter((group) => group.skills.length > 0);
  const totalSkills = skillGroups.reduce(
    (total, group) => total + group.skills.length,
    0
  );
  const visibleSkills = filteredSkillGroups.reduce(
    (total, group) => total + group.skills.length,
    0
  );
  return (
    <PageTransition>
      <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-white px-6 py-24 transition-colors duration-500 dark:from-blue-950 dark:via-zinc-950 dark:to-zinc-950 sm:px-10 lg:px-16 lg:py-32">
          <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-600 dark:text-zinc-400">
              Skills & Technologies
            </p>
            <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight text-gray-900 dark:text-zinc-100 sm:text-6xl lg:text-7xl">
              Tools I use to
              <br />
              <span
                className={`${pacifico.className} text-blue-800 dark:text-blue-300`}
              >
                build software.
              </span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-600 dark:text-zinc-400 sm:text-xl">
              A collection of languages, frameworks, tools, and
              engineering concepts I use or am actively learning
              while building software.
            </p>
    
            </div>
            {/* HERO DEVELOPMENT OVERVIEW */}
            <div className="relative">
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40  bg-blue-400/20 blur-3xl" />
              <div className="relative  border border-blue-200/70 bg-white/80 p-6 shadow-xl shadow-blue-900/5 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80 dark:shadow-black/20 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-gray-900 dark:text-zinc-100">Development overview</p>
                  
                </div>
                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className=" bg-blue-50 p-4 dark:bg-blue-400/10">
                    <p className="text-3xl font-bold text-blue-800 dark:text-blue-300">{skillGroups.length.toString().padStart(2, "0")}</p>
                    <p className="mt-1 text-xs text-gray-600 dark:text-zinc-400">Skill categories</p>
                  </div>
                  <div className=" bg-gray-100 p-4 dark:bg-zinc-800">
                    <p className="text-3xl font-bold text-gray-900 dark:text-zinc-100">{totalSkills.toString().padStart(2, "0")}</p>
                    <p className="mt-1 text-xs text-gray-600 dark:text-zinc-400">Technologies & concepts</p>
                  </div>
                </div>
                <div className="mt-8">
                  <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-zinc-500">Development stack</p>
                  <div className="space-y-4">
                    {skillGroups.slice(0, 6).map((group) => {
                      const Icon = group.icon;
                      return (
                        <div key={group.number} className="flex items-center gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center  border border-gray-200 bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800">
                            <Icon size={19} strokeWidth={1.6} className="text-blue-800 dark:text-blue-300" aria-hidden="true" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-gray-900 dark:text-zinc-100">{group.title}</p>
                            <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-zinc-400">{group.skills.slice(0, 3).map((skill) => skill.name).join(" · ")}</p>
                          </div>
                          <span className="text-xs text-gray-400 dark:text-zinc-500">{group.skills.length.toString().padStart(2, "0")}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-5 dark:border-zinc-800">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-gray-500 dark:text-zinc-400">My development philosophy</p>
                    <p className="text-xs font-semibold text-blue-800 dark:text-blue-300">Learn. Build. Improve.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* SKILL GROUPS */}
        <section
          id="skills-content"
         className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
          <div className="mx-auto max-w-7xl">
            {/* SECTION HEADER */}
            <div className="mb-12 flex flex-col gap-5 border-b border-gray-200 pb-8 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
                  Technical Expertise
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  My technical skills
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 dark:text-zinc-400">
                  Technologies, tools, and concepts across my
                  software development journey.
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                {visibleSkills} of {totalSkills} skills across {filteredSkillGroups.length} categories
              </p>
            </div>
            {/* INTERACTIVE SKILL FILTER */}
<div className="mb-14">
  <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-gray-500 dark:text-zinc-400">
    Filter by proficiency
  </p>

  <div className="flex flex-wrap gap-2.5">
    {(["All", ...levelLegend] as const).map((level) => {
      const isActive = activeLevel === level;

      const href =
        level === "All"
          ? "/skills#skills-content"
          : `/skills?level=${encodeURIComponent(level)}#skills-content`;

      return (
        <a
          key={level}
          href={href}
          aria-current={isActive ? "page" : undefined}
          className={`border px-4 py-2 text-sm font-medium transition-all duration-200 ${
            isActive
              ? "border-blue-700 bg-blue-700 text-white shadow-sm dark:border-blue-400 dark:bg-blue-400 dark:text-zinc-950"
              : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-blue-400/50 dark:hover:text-blue-300"
          }`}
        >
          {level}

          {level === "All" && (
            <span className="ml-2 opacity-70">{totalSkills}</span>
          )}
        </a>
      );
    })}
  </div>

  <p
    className="mt-4 text-sm text-gray-500 dark:text-zinc-400"
    aria-live="polite"
  >
    Showing <strong>{visibleSkills}</strong> skills
    {activeLevel !== "All" && ` with ${activeLevel} proficiency`}
  </p>
</div>
            {/* SKILL CATEGORIES */}
            <div className="space-y-24">
              {filteredSkillGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <section key={group.number}>
                    <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
                      {/* GROUP HEADER */}
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium tracking-[0.2em] text-gray-400 dark:text-zinc-500">
                            {group.number}
                          </span>
                          <Icon
                            size={22}
                            strokeWidth={1.5}
                            aria-hidden="true"
                            className="text-gray-400 dark:text-zinc-500 lg:hidden"
                          />
                        </div>
                        <div className="mt-5 hidden lg:block">
                          <Icon
                            size={34}
                            strokeWidth={1.3}
                            aria-hidden="true"
                            className="text-blue-800 dark:text-blue-300"
                          />
                        </div>
                        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-gray-900 dark:text-zinc-100 sm:text-4xl">
                          {group.title}
                        </h2>
                        <p className="mt-4 max-w-md text-sm leading-7 text-gray-600 dark:text-zinc-400 sm:text-base">
                          {group.description}
                        </p>
                        <p className="mt-5 text-xs text-gray-400 dark:text-zinc-500">
                          {group.skills.length} technologies / concepts
                        </p>
                      </div>
                      {/* SKILLS */}
                      <div>
                        <div className="border-t border-gray-200 dark:border-zinc-800">
                          {group.skills.map((skill) => (
                            <div
                              key={skill.name}
                              className="group/skill grid gap-3 border-b border-gray-200 py-6 transition-colors duration-300 hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-900/70 sm:grid-cols-[190px_1fr] sm:gap-6 sm:px-4 lg:grid-cols-[190px_1fr_auto] lg:items-center"
                            >
                              {/* SKILL NAME */}
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <h3 className="font-semibold text-gray-900 transition-colors group-hover/skill:text-blue-800 dark:text-zinc-100 dark:group-hover/skill:text-blue-300">
                                  {skill.name}
                                </h3>
                                {/* MOBILE CHIP */}
                                <div className="lg:hidden">
                                  <SkillLevelChip
                                    level={skill.level}
                                  />
                                </div>
                              </div>
                              {/* DESCRIPTION */}
                              <p className="text-sm leading-6 text-gray-600 dark:text-zinc-400">
                                {skill.description}
                              </p>
                              {/* DESKTOP CHIP */}
                              <div className="hidden lg:block">
                                <SkillLevelChip
                                  level={skill.level}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </section>
        {/* NOTE */}
        <section className="border-y border-gray-200 bg-gray-50 px-6 py-20 dark:border-zinc-800 dark:bg-zinc-900/60 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="border-l-2 border-blue-800 pl-6 dark:border-blue-400">
              <p className="max-w-3xl text-base leading-7 text-gray-600 dark:text-zinc-400">
                I don&apos;t treat this list as a collection of
                technologies I have simply touched. These levels
                represent my current understanding and practical
                experience. Some technologies are part of my
                regular development workflow, while others are
                areas I am actively exploring and improving.
              </p>
            </div>
          </div>
        </section>
        {/* CTA */}
        <section className="relative isolate overflow-hidden bg-blue-900 px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-28">
          <div className="pointer-events-none absolute -right-32 -top-32 -z-0 h-[400px] w-[400px]  bg-blue-700/40 blur-3xl" />
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-200">
                Want to see these skills in practice?
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Take a look at what I&apos;ve{" "}
                <span
                  className={`${pacifico.className} text-blue-200`}
                >
                  built.
                </span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 bg-white px-6 py-3 text-sm font-semibold text-blue-900 transition-colors hover:bg-blue-50"
              >
                View projects
                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/experience"
                className="inline-flex items-center border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                View experience
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </PageTransition>
  );
}
