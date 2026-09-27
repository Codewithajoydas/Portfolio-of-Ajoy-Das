import Footer from "@/components/Footer";
import {
  ArrowUpRight,
  Braces,
  Database,
  GitBranch,
  Globe,
  Layers3,
  Server,
  Wrench,
} from "lucide-react";
import { Pacifico } from "next/font/google";
import Link from "next/link";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

const skillGroups = [
  {
    number: "01",
    title: "Languages",
    description:
      "Languages I use to build applications and understand software at a deeper level.",
    icon: Braces,
    skills: [
      {
        name: "JavaScript",
        level: "Advanced",
        description:
          "Core language mechanics, asynchronous programming, DOM, browser APIs, functional programming, and modern JavaScript.",
      },
      {
        name: "TypeScript",
        level: "Working Knowledge",
        description:
          "Type-safe application development, interfaces, types, generics, and typed Node.js projects.",
      },
      {
        name: "HTML",
        level: "Advanced",
        description:
          "Semantic markup, accessibility, forms, document structure, and modern HTML APIs.",
      },
      {
        name: "CSS",
        level: "Advanced",
        description:
          "Responsive layouts, animations, positioning, modern CSS features, and utility-first workflows.",
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
    title: "Frontend",
    description:
      "Tools and technologies I use to build interactive and responsive user interfaces.",
    icon: Globe,
    skills: [
      {
        name: "React",
        level: "Advanced",
        description:
          "Component architecture, hooks, state management, composition, and reusable UI systems.",
      },
      {
        name: "Next.js",
        level: "Advanced",
        description:
          "Full-stack React applications, routing, server components, API routes, and production applications.",
      },
      {
        name: "Tailwind CSS",
        level: "Advanced",
        description:
          "Utility-first styling, responsive interfaces, design systems, and component-level UI development.",
      },
      {
        name: "Sass",
        level: "Working Knowledge",
        description:
          "Structured CSS, variables, nesting, reusable styles, and scalable styling approaches.",
      },
      {
        name: "React Native",
        level: "Working Knowledge",
        description:
          "Cross-platform mobile interfaces and application development.",
      },
    ],
  },

  {
    number: "03",
    title: "Backend",
    description:
      "Server-side technologies I use to build APIs, business logic, and application systems.",
    icon: Server,
    skills: [
      {
        name: "Node.js",
        level: "Advanced",
        description:
          "Server-side JavaScript, filesystem APIs, streams, processes, modules, and backend tooling.",
      },
      {
        name: "Express.js",
        level: "Advanced",
        description:
          "REST APIs, middleware, routing, authentication, validation, and backend application architecture.",
      },
      {
        name: "REST APIs",
        level: "Advanced",
        description:
          "API design, HTTP methods, request/response handling, authentication, validation, and error handling.",
      },
      {
        name: "Authentication",
        level: "Working Knowledge",
        description:
          "Authentication flows, sessions, JWT-based systems, authorization, and protected resources.",
      },
    ],
  },

  {
    number: "04",
    title: "Databases",
    description:
      "Database technologies and concepts I use for storing and working with application data.",
    icon: Database,
    skills: [
      {
        name: "MongoDB",
        level: "Advanced",
        description:
          "Document-oriented data modeling, queries, indexes, aggregation, and application integration.",
      },
      {
        name: "Mongoose",
        level: "Advanced",
        description:
          "MongoDB schemas, models, validation, relationships, middleware, and application-level data modeling.",
      },
      {
        name: "Database Design",
        level: "Working Knowledge",
        description:
          "Thinking about data relationships, structure, consistency, indexing, and application requirements.",
      },
    ],
  },

  {
    number: "05",
    title: "Developer Tooling",
    description:
      "Tools and systems I use to build, automate, test, package, and improve development workflows.",
    icon: Wrench,
    skills: [
      {
        name: "Git",
        level: "Advanced",
        description:
          "Version control, branching, commits, merges, remotes, history, and collaborative workflows.",
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
          "Fast JavaScript and TypeScript bundling and build tooling.",
      },
      {
        name: "npm",
        level: "Advanced",
        description:
          "Package management, scripts, publishing, dependencies, and Node.js project workflows.",
      },
      {
        name: "CLI Development",
        level: "Advanced",
        description:
          "Building command-line applications, prompts, validation, logging, and automation workflows.",
      },
    ],
  },

  {
    number: "06",
    title: "Architecture & Engineering",
    description:
      "Engineering concepts I use when thinking beyond individual components.",
    icon: Layers3,
    skills: [
      {
        name: "System Design",
        level: "Learning",
        description:
          "Exploring system architecture, components, communication, scalability, and trade-offs.",
      },
      {
        name: "Software Architecture",
        level: "Working Knowledge",
        description:
          "Separation of concerns, modularity, application structure, and maintainability.",
      },
      {
        name: "Web Performance",
        level: "Working Knowledge",
        description:
          "Lazy loading, code splitting, tree shaking, rendering performance, and optimization.",
      },
      {
        name: "Testing",
        level: "Working Knowledge",
        description:
          "Unit testing, test structure, assertions, mocking, and JavaScript testing workflows.",
      },
    ],
  },

  {
    number: "07",
    title: "Mobile & Platforms",
    description:
      "Technologies I use for building applications beyond traditional web interfaces.",
    icon: Layers3,
    skills: [
      {
        name: "Expo",
        level: "Working Knowledge",
        description:
          "React Native development, project configuration, native capabilities, and application workflows.",
      },
      {
        name: "React Native",
        level: "Working Knowledge",
        description:
          "Cross-platform mobile application development using React.",
      },
      {
        name: "Electron",
        level: "Learning",
        description:
          "Exploring desktop application development with web technologies.",
      },
    ],
  },

  {
    number: "08",
    title: "Version Control & Workflow",
    description:
      "Tools and practices that help me manage projects and development workflows.",
    icon: GitBranch,
    skills: [
      {
        name: "GitHub",
        level: "Advanced",
        description:
          "Repositories, branches, commits, pull requests, releases, and project collaboration.",
      },
      {
        name: "Git",
        level: "Advanced",
        description:
          "Version control and structured development workflows.",
      },
      {
        name: "CI/CD",
        level: "Learning",
        description:
          "Exploring automated build, testing, deployment, and delivery pipelines.",
      },
    ],
  },
];

const levelStyles = {
  Advanced: "bg-blue-50 text-blue-800 border-blue-100",
  "Working Knowledge": "bg-gray-50 text-gray-700 border-gray-200",
  Learning: "bg-white text-gray-500 border-gray-200",
};

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-white px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
            Skills & Technologies
          </p>

          <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
            Tools I use to{" "}
            <span className={`${pacifico.className} text-blue-800`}>
              build software.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl">
            A collection of languages, frameworks, tools, and engineering
            concepts I use or am actively learning while building software.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <span className="border border-blue-200 bg-white px-4 py-2 text-sm text-blue-800">
              Build
            </span>

            <span className="border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
              Learn
            </span>

            <span className="border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
              Experiment
            </span>

            <span className="border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
              Improve
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-100/40 blur-3xl" />
      </section>

      {/* =========================================================
          SKILL GROUPS
      ========================================================= */}
      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-24">
            {skillGroups.map((group) => {
              const Icon = group.icon;

              return (
                <section key={group.number}>
                  {/* Group Header */}
                  <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium tracking-[0.2em] text-gray-400">
                          {group.number}
                        </span>

                        <Icon
                          size={22}
                          strokeWidth={1.5}
                          className="text-gray-400 lg:hidden"
                        />
                      </div>

                      <div className="mt-5 hidden lg:block">
                        <Icon
                          size={34}
                          strokeWidth={1.3}
                          className="text-blue-800"
                        />
                      </div>

                      <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                        {group.title}
                      </h2>
                    </div>

                    <div>
                      <p className="max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                        {group.description}
                      </p>

                      {/* Skills */}
                      <div className="mt-10 border-t border-gray-200">
                        {group.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="group/skill grid gap-4 border-b border-gray-200 py-6 transition-colors duration-300 hover:bg-gray-50 sm:grid-cols-[220px_1fr_auto]"
                          >
                            <div className="flex items-center justify-between sm:block">
                              <h3 className="font-semibold text-gray-900">
                                {skill.name}
                              </h3>

                              <span
                                className={`sm:hidden border px-2 py-1 text-[10px] font-medium ${
                                  levelStyles[
                                    skill.level as keyof typeof levelStyles
                                  ]
                                }`}
                              >
                                {skill.level}
                              </span>
                            </div>

                            <p className="text-sm leading-6 text-gray-600">
                              {skill.description}
                            </p>

                            <span
                              className={`hidden h-fit whitespace-nowrap border px-3 py-1 text-[10px] font-medium sm:block ${
                                levelStyles[
                                  skill.level as keyof typeof levelStyles
                                ]
                              }`}
                            >
                              {skill.level}
                            </span>
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

      {/* =========================================================
          NOTE
      ========================================================= */}
      <section className="bg-gray-50 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="border-l-2 border-blue-800 pl-6">
            <p className="max-w-3xl text-base leading-7 text-gray-600">
              I don&apos;t treat this list as a collection of technologies I
              have simply touched. Some areas represent technologies I use
              regularly, while others represent areas I&apos;m actively
              learning and exploring.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-blue-900 px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-28">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-blue-700/40 blur-3xl" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-200">
              Want to see these skills in practice?
            </p>

            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Take a look at what I&apos;ve{" "}
              <span className={`${pacifico.className} text-blue-200`}>
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
  );
}