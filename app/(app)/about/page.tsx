import Footer from "@/components/Footer";
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Database,
  ExternalLink,
  GraduationCap,
  Layers3,
  Lightbulb,
  MapPin,
  Rocket,
  Terminal,
  Wrench,
} from "lucide-react";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

const principles = [
  {
    number: "01",
    title: "Understand the fundamentals",
    description:
      "I prefer understanding what happens underneath an abstraction instead of only learning how to use a tool.",
    icon: Code2,
  },
  {
    number: "02",
    title: "Learn by building",
    description:
      "Ideas become clearer when they are turned into working software. Projects are a major part of how I learn.",
    icon: Terminal,
  },
  {
    number: "03",
    title: "Keep things maintainable",
    description:
      "I care about readable code, clear responsibilities, predictable behavior, and systems that can evolve.",
    icon: Layers3,
  },
  {
    number: "04",
    title: "Stay curious",
    description:
      "There is always another layer to understand. I enjoy exploring unfamiliar concepts and turning them into experiments.",
    icon: Lightbulb,
  },
];

const journey = [
  {
    number: "01",
    title: "Started with the web",
    description:
      "HTML, CSS, and JavaScript created the foundation for understanding interfaces, browsers, and the web.",
  },
  {
    number: "02",
    title: "Started building",
    description:
      "Small experiments gradually became interfaces, utilities, mobile applications, backend systems, and complete projects.",
  },
  {
    number: "03",
    title: "Went deeper into JavaScript",
    description:
      "The focus expanded beyond syntax into asynchronous programming, promises, closures, prototypes, modules, functional programming, browser APIs, testing, performance, and tooling.",
  },
  {
    number: "04",
    title: "Moved toward full-stack engineering",
    description:
      "Node.js, Express.js, React, Next.js, databases, APIs, authentication, application architecture, and developer tooling became part of the journey.",
  },
  {
    number: "05",
    title: "Thinking about systems",
    description:
      "The goal is increasingly about understanding how complete software systems are designed, connected, maintained, and improved.",
  },
];

const technicalSkills = [
  {
    title: "Frontend",
    icon: Code2,
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    title: "Backend",
    icon: Terminal,
    items: ["Node.js", "Express.js", "REST APIs", "Server-side JavaScript"],
  },
  {
    title: "Mobile",
    icon: Layers3,
    items: ["React Native", "Mobile UI", "Application workflows"],
  },
  {
    title: "Data & Office",
    icon: Database,
    items: [
      "MS Excel",
      "MS Word",
      "Data Management",
      "Reporting",
      "Data Verification",
      "Record Maintenance",
    ],
  },
  {
    title: "Engineering",
    icon: Wrench,
    items: [
      "Problem Solving",
      "Analytical Thinking",
      "Automation",
      "Performance",
      "Developer Tooling",
      "System Design",
    ],
  },
];

const projects = [
  {
    number: "01",
    name: "Assign Meter",
    type: "Workforce Automation & Meter Management System",
    description:
      "A mobile application and management portal created to solve manual meter-assignment workflow problems inside the company.",
    details: [
      "Automates collecting and assigning large numbers of meter IDs.",
      "Uses camera-based meter-box scanning to extract meter numbers.",
      "Sends scanned meter information directly to the management system.",
      "Provides a backend portal for assignment management and pending-meter monitoring.",
      "Supports downloading assignment reports.",
      "Designed to reduce manual work, improve operational speed, and minimize human errors.",
    ],
    stack: ["React Native", "Node.js", "Express.js", "JavaScript"],
    href: "https://play.google.com/store/apps/details?id=com.ajoy974.assignMeter",
  },
  {
    number: "02",
    name: "PhotoMart",
    type: "Mobile Application",
    description:
      "A mobile application focused on photo-related services, user interaction, responsive interfaces, and application workflows.",
    details: [
      "Designed mobile-friendly interfaces.",
      "Worked on frontend development.",
      "Implemented application workflows and management features.",
    ],
    stack: ["React Native", "JavaScript"],
    href: "https://play.google.com/store/apps/details?id=com.ajoy974.Photo_Mart",
  },
  {
    number: "03",
    name: "Kodhra",
    type: "Code Management System",
    description:
      "A code-management and organization platform focused on development workflows and structured handling of code-related information.",
    details: [
      "Worked across frontend and backend integration.",
      "Focused on structured data handling.",
      "Worked toward efficient application architecture.",
      "Built features for organized code and workflow management.",
    ],
    stack: ["JavaScript", "Frontend", "Backend", "Data Management"],
    href: "/projects",
  },
];

const learningAreas = [
  "Advanced JavaScript",
  "TypeScript",
  "Node.js",
  "React",
  "Next.js",
  "MongoDB",
  "APIs",
  "Authentication",
  "Web Performance",
  "Testing",
  "Bundlers & Tooling",
  "System Design",
  "CLI Development",
  "Developer Tools",
];

const strengths = [
  "Problem Solving",
  "Fast Learner",
  "Analytical Thinking",
  "Team Coordination",
  "Technical Adaptability",
  "Attention to Detail",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-white px-6 py-24 sm:px-10 lg:flex lg:items-center lg:px-16 lg:py-32">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} />
                Nagaon, Assam
              </span>
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              <span>Software Developer</span>
            </div>

            <p className="mt-8 text-sm font-medium uppercase tracking-[0.28em] text-gray-500">
              About Ajoy Das
            </p>

            <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
              I&apos;m interested in{" "}
              <span className={`${pacifico.className} text-blue-800`}>
                how software works.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
              I&apos;m Ajoy Das, a developer who enjoys turning ideas into
              working software while understanding the engineering underneath
              it.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-500">
              My work sits at the intersection of web development, mobile
              applications, backend systems, automation, data workflows, and
              developer tooling. I learn by building, experimenting, breaking
              things apart, and understanding why they work.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 bg-blue-800 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg"
              >
                Explore my work
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200"
              >
                Get in touch
              </Link>
            </div>

            <div className="mt-14 grid max-w-2xl grid-cols-2 gap-px border border-gray-200 bg-gray-200 sm:grid-cols-4">
              {[
                ["2023", "Started professional role"],
                ["3+", "Featured projects"],
                ["JS", "Primary ecosystem"],
                ["Full", "Stack direction"],
              ].map(([value, label]) => (
                <div key={label} className="bg-white p-5">
                  <p className="text-2xl font-bold tracking-tight">{value}</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <Image
                src="/images/Codewithajoydas_Skills-page.png"
                alt="Ajoy Das"
                fill
                priority
                sizes="(max-width: 1024px) 85vw, 40vw"
                className="object-contain"
              />
            </div>

            <div className="absolute -bottom-5 -right-5 -z-10 h-full w-full border border-blue-200" />

            <div className="absolute -left-6 bottom-10 hidden border border-gray-200 bg-white p-5 shadow-xl sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                Currently
              </p>
              <p className="mt-2 max-w-[180px] text-sm font-semibold leading-6">
                Going deeper into full-stack engineering and system design.
              </p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-blue-100/50 blur-3xl" />
      </section>

      {/* QUICK PROFILE */}
      <section className="border-y border-gray-100 bg-white px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
              At a glance
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              A developer profile built around{" "}
              <span className={`${pacifico.className} text-blue-800`}>
                curiosity.
              </span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Professional role", "MIS Executive — Genus Power Infrastructures"],
              ["Core ecosystem", "JavaScript, Node.js, React, React Native"],
              ["Languages", "English, Hindi, Assamese"],
            ].map(([label, value]) => (
              <div key={label} className="border border-gray-200 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  {label}
                </p>
                <p className="mt-3 text-sm leading-7 text-gray-700">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-28">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
                My story
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                I don&apos;t want to just{" "}
                <span className={`${pacifico.className} text-blue-800`}>
                  use software.
                </span>
              </h2>
            </div>

            <div className="space-y-7 text-base leading-8 text-gray-600">
              <p>
                My professional background combines operational data work with
                software development. As an MIS Executive at Genus Power
                Infrastructures, my responsibilities include preparing and
                maintaining MIS reports, managing Excel sheets and operational
                records, performing data verification, organizing project
                records, and coordinating with teams.
              </p>

              <p>
                That environment also exposed me to real workflow problems:
                repetitive operations, manual data handling, reporting needs,
                and opportunities for automation. Building software to solve
                those problems became a natural extension of my technical
                interests.
              </p>

              <p>
                Outside day-to-day work, I spend a significant amount of time
                learning the JavaScript ecosystem and building applications.
                I have explored frontend development, backend development,
                mobile development, APIs, databases, testing, performance,
                tooling, and system design.
              </p>

              <p>
                The direction is simple: become the kind of engineer who can
                understand a problem, design a solution, build it, debug it,
                and keep improving it instead of stopping at the first working
                version.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="bg-gray-50 px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-28">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
                Professional experience
              </p>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Work that connects{" "}
                <span className={`${pacifico.className} text-blue-800`}>
                  data and software.
                </span>
              </h2>
            </div>

            <div className="border-t border-gray-200">
              <div className="border-b border-gray-200 py-9">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <BriefcaseBusiness size={20} className="text-blue-800" />
                      <h3 className="text-2xl font-semibold">
                        MIS Executive
                      </h3>
                    </div>
                    <p className="mt-2 text-gray-600">
                      Genus Power Infrastructures
                    </p>
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    July 2023 — Present
                  </span>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    "Preparing and maintaining MIS reports",
                    "Managing Excel sheets and operational records",
                    "Data entry and verification",
                    "Maintaining and organizing project records",
                    "Coordinating with teams for data management and reporting",
                    "Supporting reporting workflows and operational tracking",
                    "Improving operational efficiency through automation solutions",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 border border-gray-200 bg-white p-4"
                    >
                      <Check size={17} className="mt-1 shrink-0 text-blue-800" />
                      <span className="text-sm leading-6 text-gray-600">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-4xl">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
                Selected projects
              </p>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                I learn by{" "}
                <span className={`${pacifico.className} text-blue-800`}>
                  building real things.
                </span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                These projects represent the transition from learning isolated
                technologies to solving actual workflow and application
                problems.
              </p>
            </div>

            <Link
              href="/projects"
              className="group inline-flex w-fit items-center gap-2 border-b border-gray-900 pb-1 text-sm font-semibold"
            >
              See all projects
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-16 border-t border-gray-200">
            {projects.map((project) => (
              <article
                key={project.number}
                className="grid gap-8 border-b border-gray-200 py-12 lg:grid-cols-[80px_0.8fr_1.2fr]"
              >
                <span className="text-xs font-semibold tracking-[0.2em] text-gray-400">
                  {project.number}
                </span>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue-800">
                    {project.type}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-tight">
                    {project.name}
                  </h3>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="border border-gray-200 px-3 py-1.5 text-xs text-gray-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-base leading-8 text-gray-600">
                    {project.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {project.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex gap-3 text-sm leading-6 text-gray-600"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-800" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gray-900"
                  >
                    View project
                    <ExternalLink
                      size={15}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      

      {/* SKILLS */}
      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
              Technical profile
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              A growing{" "}
              <span className={`${pacifico.className} text-blue-800`}>
                engineering toolkit.
              </span>
            </h2>
          </div>

          <div className="mt-16 grid border-t border-gray-200 sm:grid-cols-2 lg:grid-cols-3">
            {technicalSkills.map((group) => {
              const Icon = group.icon;

              return (
                <div
                  key={group.title}
                  className="border-b border-gray-200 p-8 transition-colors hover:bg-gray-50 sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(3n+1)]:border-r lg:[&:nth-child(3n+2)]:border-r"
                >
                  <Icon size={22} className="text-blue-800" />
                  <h3 className="mt-8 text-xl font-semibold">{group.title}</h3>

                  <div className="mt-5 space-y-2">
                    {group.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 text-sm text-gray-600"
                      >
                        <span className="h-1 w-1 rounded-full bg-gray-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEARNING JOURNEY */}
      <section className="bg-gray-50 px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
                Learning journey
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                From learning to{" "}
                <span className={`${pacifico.className} text-blue-800`}>
                  building.
                </span>
              </h2>
              <p className="mt-7 max-w-lg text-lg leading-8 text-gray-600">
                The journey has never been about collecting technology names.
                It has been about progressively understanding more layers of
                software.
              </p>
            </div>

            <div className="border-t border-gray-200">
              {journey.map((item) => (
                <div
                  key={item.number}
                  className="grid gap-5 border-b border-gray-200 py-9 sm:grid-cols-[60px_220px_1fr]"
                >
                  <span className="text-xs font-semibold tracking-[0.2em] text-gray-400">
                    {item.number}
                  </span>

                  <h3 className="text-lg font-semibold">{item.title}</h3>

                  <p className="text-sm leading-7 text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CURRENT FOCUS */}
      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-28">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
                Current focus
              </p>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Going deeper instead of{" "}
                <span className={`${pacifico.className} text-blue-800`}>
                  wider.
                </span>
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-lg leading-8 text-gray-600">
                My current learning direction is focused on turning individual
                JavaScript knowledge into stronger engineering ability:
                architecture, backend systems, databases, performance,
                testing, tooling, and system design.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                {learningAreas.map((item) => (
                  <span
                    key={item}
                    className="border border-gray-200 bg-white px-5 py-3 text-sm text-gray-700 transition-colors hover:border-blue-800 hover:text-blue-800"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <Link
                href="/skills"
                className="group mt-10 inline-flex items-center gap-2 border-b border-gray-900 pb-1 text-sm font-semibold"
              >
                Explore the skills page
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="bg-gray-50 px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
              Engineering principles
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              How I approach{" "}
              <span className={`${pacifico.className} text-blue-800`}>
                development.
              </span>
            </h2>
          </div>

          <div className="mt-16 grid border-t border-gray-200 sm:grid-cols-2">
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="group border-b border-gray-200 p-8 transition-colors duration-300 hover:bg-white sm:[&:nth-child(odd)]:border-r lg:p-10"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-medium tracking-[0.2em] text-gray-400">
                      {item.number}
                    </span>

                    <Icon
                      size={22}
                      strokeWidth={1.5}
                      className="text-gray-400 transition-colors group-hover:text-blue-800"
                    />
                  </div>

                  <h3 className="mt-12 text-xl font-semibold">{item.title}</h3>

                  <p className="mt-3 max-w-lg text-sm leading-7 text-gray-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STRENGTHS */}
      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
                Strengths
              </p>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                The qualities I bring to{" "}
                <span className={`${pacifico.className} text-blue-800`}>
                  the work.
                </span>
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {strengths.map((strength, index) => (
                <div
                  key={strength}
                  className="flex items-center gap-4 border border-gray-200 p-6"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-blue-50 text-xs font-semibold text-blue-800">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-medium">{strength}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PERSONAL STATEMENT */}
      <section className="relative overflow-hidden bg-blue-900 px-6 py-28 text-white sm:px-10 lg:px-16 lg:py-40">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-200">
            The way I see development
          </p>

          <blockquote className="mt-8 text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-6xl">
            &ldquo;The goal isn&apos;t to know every tool.{" "}
            <span className={`${pacifico.className} text-blue-200`}>
              It&apos;s to understand enough
            </span>{" "}
            to build something useful with whatever tool the problem
            requires.&rdquo;
          </blockquote>
        </div>

        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-blue-700/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-950/50 blur-3xl" />
      </section>

      {/* CONTACT / LINKS */}
      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
                Let&apos;s connect
              </p>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                There&apos;s more to{" "}
                <span className={`${pacifico.className} text-blue-800`}>
                  explore.
                </span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                Explore the projects, skills, and experiments behind the
                portfolio — or get in touch if you want to talk about software,
                development, or a project.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="https://github.com/codewithajoydas"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border border-gray-200 p-6 transition-colors hover:border-gray-900"
              >
                <span className="flex items-center gap-3 text-sm font-semibold">
                  <FaGithub size={19} />
                  GitHub
                </span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              <Link
                href="/projects"
                className="group flex items-center justify-between border border-gray-200 p-6 transition-colors hover:border-gray-900"
              >
                <span className="flex items-center gap-3 text-sm font-semibold">
                  <Rocket size={19} />
                  Projects
                </span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/skills"
                className="group flex items-center justify-between border border-gray-200 p-6 transition-colors hover:border-gray-900"
              >
                <span className="flex items-center gap-3 text-sm font-semibold">
                  <Wrench size={19} />
                  Skills
                </span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/contact"
                className="group flex items-center justify-between border border-gray-200 p-6 transition-colors hover:border-gray-900"
              >
                <span className="flex items-center gap-3 text-sm font-semibold">
                  <ArrowUpRight size={19} />
                  Contact
                </span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          
        </div>
      </section>

      <Footer />
    </main>
  );
}
