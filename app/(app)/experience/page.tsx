import React from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Database,
  GitBranch,
  Layers3,
  Rocket,
  Terminal,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

const journey = [
  {
    number: "01",
    title: "Learning the fundamentals",
    period: "Foundation",
    description:
      "My development journey started with understanding the fundamentals rather than immediately depending on frameworks. JavaScript, HTML, CSS, programming concepts, browser APIs, asynchronous programming, and the mechanics behind the web became the foundation for everything that followed.",
    points: [
      "JavaScript fundamentals and advanced language mechanics",
      "DOM and browser APIs",
      "Asynchronous JavaScript and Promises",
      "Object-oriented and functional programming",
      "HTML and CSS fundamentals",
      "Understanding how web applications work",
    ],
  },
  {
    number: "02",
    title: "Moving from learning to building",
    period: "Projects",
    description:
      "After learning individual concepts, I started connecting them through practical projects. Instead of treating learning as an isolated activity, projects became a way to discover where concepts actually matter.",
    points: [
      "Building complete applications",
      "Working with frontend and backend code",
      "Connecting applications to databases",
      "Designing APIs and application workflows",
      "Learning through debugging real problems",
      "Improving projects after the first working version",
    ],
  },
  {
    number: "03",
    title: "Building my own software",
    period: "Independent Development",
    description:
      "My focus gradually moved toward building software that solves actual problems. This includes developer tools, full-stack applications, backend systems, and utilities designed around real workflows.",
    points: [
      "Building independent software products",
      "Creating developer tooling",
      "Working with authentication and databases",
      "Designing reusable application architecture",
      "Building CLI applications",
      "Exploring full-stack product development",
    ],
  },
  {
    number: "04",
    title: "Going deeper into engineering",
    period: "Engineering",
    description:
      "Building larger applications naturally introduced questions beyond simply making something work. Architecture, scalability, maintainability, performance, testing, deployment, and system design became increasingly important.",
    points: [
      "System design",
      "Software architecture",
      "Backend architecture",
      "Performance optimization",
      "Testing and reliability",
      "CI/CD and deployment workflows",
    ],
  },
];

const projects = [
  {
    number: "01",
    title: "Kodhra",
    type: "Developer Tool",
    description:
      "A code snippet management application built around the idea of keeping reusable code organized and accessible.",
    technologies: [
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "EJS",
    ],
    github: "https://github.com/Code-Snippet-Manager/Kodhra",
    image: "/images/projects/Kodhra.png",
  },
  {
    number: "02",
    title: "Assign Meter",
    type: "Full-stack Platform",
    description:
      "A larger software system involving web, mobile, and backend applications, providing practical experience across multiple parts of a product.",
    technologies: [
      "Next.js",
      "React",
      "React Native",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    github: "https://github.com/Assign-Meter",
    image: "/images/projects/Assign-Meter.png",
  },
  {
    number: "03",
    title: "CWAD Lab Scaffolder",
    type: "Developer Tool",
    description:
      "A CLI project generator created to automate project setup and provide reusable scaffolding for development workflows.",
    technologies: [
      "TypeScript",
      "Node.js",
      "Commander",
      "Inquirer",
      "Zod",
    ],
    github: "https://github.com/Codewithajoydas/cwad-lab-scaffolder",
    image: "/images/projects/CWAD-Lab-Scaffolder.png",
  },
  {
    number: "04",
    title: "WiggleNote",
    type: "Application",
    description:
      "An independent software project focused on creating a practical application experience while continuing to explore product development.",
    technologies: [],
    github: "https://github.com/Codewithajoydas/WiggleNote",
    image: "/images/projects/WiggleNote.png",
  },
];

const engineeringAreas = [
  {
    number: "01",
    title: "Frontend Engineering",
    description:
      "Building interfaces with React, Next.js, HTML, CSS, and modern frontend tooling while keeping usability and maintainability in mind.",
    icon: Code2,
  },
  {
    number: "02",
    title: "Backend Engineering",
    description:
      "Working with Node.js, Express.js, APIs, authentication, databases, server-side logic, and application workflows.",
    icon: Terminal,
  },
  {
    number: "03",
    title: "Database Engineering",
    description:
      "Working with MongoDB, Mongoose, data modeling, relationships, queries, and the role databases play inside application architecture.",
    icon: Database,
  },
  {
    number: "04",
    title: "Developer Tooling",
    description:
      "Building CLI tools, project generators, utilities, and development workflows that reduce repetitive work.",
    icon: Wrench,
  },
  {
    number: "05",
    title: "Architecture",
    description:
      "Learning how applications should be structured so individual components can evolve without making the entire system difficult to maintain.",
    icon: Layers3,
  },
  {
    number: "06",
    title: "Engineering Workflow",
    description:
      "Working with Git, GitHub, package management, bundlers, testing, CI/CD, and the broader software development workflow.",
    icon: GitBranch,
  },
];

const principles = [
  {
    number: "01",
    title: "Understand first",
    description:
      "I try to understand what is happening underneath a technology instead of treating it as a black box.",
  },
  {
    number: "02",
    title: "Build to learn",
    description:
      "Projects turn abstract concepts into practical engineering experience.",
  },
  {
    number: "03",
    title: "Keep fundamentals strong",
    description:
      "Framework knowledge is useful, but strong fundamentals make it easier to learn whatever comes next.",
  },
  {
    number: "04",
    title: "Solve real problems",
    description:
      "Building software around actual problems creates better constraints and better learning opportunities.",
  },
  {
    number: "05",
    title: "Improve the second version",
    description:
      "The first working implementation is rarely the final implementation. Refactoring and iteration are part of the process.",
  },
  {
    number: "06",
    title: "Think beyond the code",
    description:
      "A useful software system involves architecture, workflow, deployment, maintenance, and the people using it.",
  },
];

const currentFocus = [
  "Advanced JavaScript and TypeScript",
  "Node.js and backend engineering",
  "System design",
  "Software architecture",
  "Database design",
  "Web performance",
  "Testing",
  "CI/CD",
  "Developer tooling",
  "Full-stack application development",
];

const developmentStages = [
  {
    number: "01",
    title: "Learn",
    description:
      "Study the underlying concept and understand why it exists.",
  },
  {
    number: "02",
    title: "Experiment",
    description:
      "Create small implementations to understand how the concept behaves.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Apply the concept inside a larger project with real constraints.",
  },
  {
    number: "04",
    title: "Break",
    description:
      "Find edge cases, bugs, limitations, and architectural problems.",
  },
  {
    number: "05",
    title: "Improve",
    description:
      "Refactor the implementation and improve the surrounding system.",
  },
  {
    number: "06",
    title: "Understand",
    description:
      "Extract the deeper lesson and carry it into the next project.",
  },
];

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* ================================================================ */}
      {/* HERO */}
      {/* ================================================================ */}

      <section className="relative overflow-hidden border-b border-gray-200 px-6 pb-24 pt-32 sm:px-10 lg:px-16">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-blue-100/60 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-sky-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <div>
              <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-blue-800">
                Experience
              </p>

              <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                A journey from
                <br />
                <span className={`text-blue-800 ${pacifico.className}`}>learning to building.</span>
              </h1>
            </div>

            <div>
              <p className="max-w-xl text-lg leading-8 text-gray-600">
                I&apos;m an independent developer building my own software,
                exploring engineering concepts, and continuously turning what I
                learn into working systems.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 sm:grid-cols-3">
            <div className="bg-white p-7">
              <p className="text-3xl font-semibold">01</p>

              <p className="mt-2 text-sm text-gray-500">
                Independent developer
              </p>
            </div>

            <div className="bg-white p-7">
              <p className="text-3xl font-semibold">04+</p>

              <p className="mt-2 text-sm text-gray-500">
                Major software projects
              </p>
            </div>

            <div className="bg-white p-7">
              <p className="text-3xl font-semibold">∞</p>

              <p className="mt-2 text-sm text-gray-500">
                Things left to learn
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* INTRODUCTION */}
      {/* ================================================================ */}

      <section className="px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800">
              Not a traditional career timeline
            </p>

            <h2 className="mt-5 max-w-md text-4xl font-semibold leading-tight tracking-tight">
              I&apos;m building my career by building software.
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-lg leading-8 text-gray-600">
              My experience cannot be accurately represented by a list of
              companies and job titles. I work independently, build my own
              software, study engineering concepts, and use projects as a way
              to develop deeper technical ability.
            </p>

            <p className="mt-6 leading-7 text-gray-600">
              That means my journey is closely connected to the things I build.
              Each project introduces new problems, and each problem forces me
              to learn something that the previous project did not require.
            </p>

            <p className="mt-6 leading-7 text-gray-600">
              Over time, the focus has moved from simply making software work
              toward understanding how complete systems should be designed,
              structured, tested, maintained, and improved.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* JOURNEY */}
      {/* ================================================================ */}

      <section className="border-y border-gray-200 bg-gray-50 px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800">
              Development journey
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              How the journey evolved.
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Each stage built on the previous one. The goal was never to
              collect technologies. The goal was to become capable of building
              increasingly complete software.
            </p>
          </div>

          <div className="mt-16 space-y-6">
            {journey.map((stage) => (
              <article
                key={stage.number}
                className="grid gap-8 border border-gray-200 bg-white p-7 sm:p-9 lg:grid-cols-[120px_0.8fr_1fr]"
              >
                <div>
                  <span className="font-mono text-sm text-blue-800">
                    {stage.number}
                  </span>

                  <p className="mt-4 text-xs uppercase tracking-[0.15em] text-gray-400">
                    {stage.period}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {stage.title}
                  </h3>
                </div>

                <div>
                  <p className="leading-7 text-gray-600">
                    {stage.description}
                  </p>

                  <div className="mt-7 space-y-3">
                    {stage.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-800" />

                        <span className="text-sm leading-6 text-gray-600">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

   
      {/* ================================================================ */}
      {/* ENGINEERING AREAS */}
      {/* ================================================================ */}

      <section className="border-y border-gray-200 bg-gray-50 px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800">
              Engineering experience
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              What building has taught me to work with.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {engineeringAreas.map((area) => {
              const Icon = area.icon;

              return (
                <article
                  key={area.number}
                  className="group border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[5px_5px_0px_#193cb8]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center border border-gray-200 bg-gray-50">
                      <Icon size={20} />
                    </div>

                    <span className="font-mono text-xs text-gray-400">
                      {area.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-semibold">
                    {area.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {area.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* BUILDING PROCESS */}
      {/* ================================================================ */}

      <section className="px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800">
                My development loop
              </p>

              <h2 className="mt-5 max-w-md text-4xl font-semibold tracking-tight">
                How I turn a concept into experience.
              </h2>

              <p className="mt-6 max-w-md leading-7 text-gray-600">
                Building software is not a straight line. I repeatedly move
                between learning, experimenting, building, debugging, and
                improving.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border border-gray-200 bg-gray-200 sm:grid-cols-2">
              {developmentStages.map((stage) => (
                <article
                  key={stage.number}
                  className="bg-white p-7"
                >
                  <span className="font-mono text-xs text-blue-800">
                    {stage.number}
                  </span>

                  <h3 className="mt-6 text-xl font-semibold">
                    {stage.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {stage.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PRINCIPLES */}
      {/* ================================================================ */}

      <section className="border-y border-gray-200 bg-gray-900 px-6 py-24 text-white sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-300">
              Engineering principles
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              The principles behind the work.
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              These principles influence how I approach learning, projects,
              architecture, debugging, and continuous improvement.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => (
              <article
                key={principle.number}
                className="bg-gray-900 p-7"
              >
                <span className="font-mono text-xs text-blue-300">
                  {principle.number}
                </span>

                <h3 className="mt-7 text-xl font-semibold">
                  {principle.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CURRENT FOCUS */}
      {/* ================================================================ */}

      <section className="px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800">
                Right now
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight">
                What I&apos;m working toward.
              </h2>

              <p className="mt-6 max-w-md leading-7 text-gray-600">
                The goal is to move from knowing individual technologies toward
                being able to design and build complete, reliable software
                systems.
              </p>
            </div>

            <div className="border border-gray-200">
              {currentFocus.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-5 border-b border-gray-200 px-6 py-5 last:border-b-0"
                >
                  <span className="font-mono text-xs text-blue-800">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm font-medium text-gray-800">
                    {item}
                  </span>

                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* INDEPENDENT BUILDER */}
      {/* ================================================================ */}

      <section className="border-y border-gray-200 bg-gray-50 px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.75fr] lg:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center bg-blue-50 text-blue-800">
                <Rocket size={21} />
              </div>

              <h2 className="mt-7 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                I&apos;m not waiting for a job to build software.
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                Working independently gives me the freedom to choose what I
                build, what I study, and which engineering problems I want to
                explore next.
              </p>

              <p className="mt-5 max-w-2xl leading-7 text-gray-600">
                That also means taking responsibility for the entire process:
                understanding the problem, designing the solution, writing the
                code, debugging it, learning what I do not know, and improving
                the final system.
              </p>
            </div>

            <div className="border border-gray-200 bg-white p-8">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness size={19} />

                <p className="text-sm font-semibold">
                  Independent development
                </p>
              </div>

              <div className="mt-7 space-y-5">
                <div className="border-l-2 border-blue-800 pl-4">
                  <p className="text-sm leading-6 text-gray-600">
                    Define the problem
                  </p>
                </div>

                <div className="border-l-2 border-blue-800 pl-4">
                  <p className="text-sm leading-6 text-gray-600">
                    Design the solution
                  </p>
                </div>

                <div className="border-l-2 border-blue-800 pl-4">
                  <p className="text-sm leading-6 text-gray-600">
                    Build the software
                  </p>
                </div>

                <div className="border-l-2 border-blue-800 pl-4">
                  <p className="text-sm leading-6 text-gray-600">
                    Test and debug
                  </p>
                </div>

                <div className="border-l-2 border-blue-800 pl-4">
                  <p className="text-sm leading-6 text-gray-600">
                    Learn and improve
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* WHAT COMES NEXT */}
      {/* ================================================================ */}

      <section className="px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="border border-gray-200 p-8 sm:p-12">
            <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800">
                  Next chapter
                </p>

                <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  Build larger systems. Understand them more deeply.
                </h2>

                <p className="mt-6 max-w-2xl leading-7 text-gray-600">
                  The next stage is not about collecting more technologies for
                  the sake of having a longer skills list. It is about taking
                  the technologies I already know and combining them into more
                  complete, reliable, and thoughtfully designed software.
                </p>
              </div>

              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-800"
              >
                See what I&apos;m building
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* NAVIGATION */}
      {/* ================================================================ */}

      <section className="border-t border-gray-200 bg-gray-50 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          <Link
            href="/about"
            className="group border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[5px_5px_0px_#193cb8]"
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-blue-800">
              01
            </p>

            <h3 className="mt-6 text-xl font-semibold">
              About me
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Learn more about the person behind the software.
            </p>

            <ArrowUpRight
              size={18}
              className="mt-7 text-gray-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/skills"
            className="group border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[5px_5px_0px_#193cb8]"
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-blue-800">
              02
            </p>

            <h3 className="mt-6 text-xl font-semibold">
              Skills
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Explore the technologies and engineering areas I work with.
            </p>

            <ArrowUpRight
              size={18}
              className="mt-7 text-gray-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/projects"
            className="group border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[5px_5px_0px_#193cb8]"
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-blue-800">
              03
            </p>

            <h3 className="mt-6 text-xl font-semibold">
              Projects
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              See the software where this experience has been applied.
            </p>

            <ArrowUpRight
              size={18}
              className="mt-7 text-gray-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CONTACT CTA */}
      {/* ================================================================ */}

      <section className="border-t border-gray-200 px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800">
            Let&apos;s build
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Have an idea worth turning into software?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-7 text-gray-600">
            I&apos;m always interested in practical problems, interesting
            systems, and opportunities to build something useful.
          </p>

          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-2 bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-800"
          >
            Start a conversation
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FOOTER */}
      {/* ================================================================ */}

      <Footer />
    </main>
  );
}