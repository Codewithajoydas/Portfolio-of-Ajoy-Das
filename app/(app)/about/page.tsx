import Footer from "@/components/Footer";
import PageTransition from "@/components/page-transition";
import { createSeoMetadata } from "@/lib/seo";
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  ExternalLink,
  GraduationCap,
  Rocket,
  Terminal,
  Layers3,
  Lightbulb,
  Workflow,
  Server,
  Smartphone,
  Braces,
  Wrench,
  Database,
  MapPin,
} from "lucide-react";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { FaGithub } from "react-icons/fa";
const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});
const principles = [
  {
    number: "01",
    title: "Understand how things work",
    description:
      "I believe in understanding the fundamentals behind abstractions. Whether it is JavaScript internals, browser APIs, Node.js, or application architecture, I prefer knowing why something works instead of just knowing how to use it.",
    icon: Code2,
  },
  {
    number: "02",
    title: "Learn through building",
    description:
      "I turn concepts into practical applications. Building real projects helps me understand technical challenges, explore solutions, and develop the ability to turn ideas into working software.",
    icon: Terminal,
  },
  {
    number: "03",
    title: "Write maintainable software",
    description:
      "I value readable code, meaningful abstractions, separation of concerns, reusable components, predictable behavior, and architectures that remain manageable as applications grow.",
    icon: Layers3,
  },
  {
    number: "04",
    title: "Think beyond the interface",
    description:
      "I enjoy understanding the complete lifecycle of software, from user interfaces and application logic to APIs, databases, infrastructure, performance, and deployment.",
    icon: Workflow,
  },
  {
    number: "05",
    title: "Stay curious and keep improving",
    description:
      "Technology continuously evolves, and there is always something deeper to understand. I enjoy exploring unfamiliar technologies, experimenting with new ideas, and continuously improving my engineering skills.",
    icon: Lightbulb,
  },
];
const journey = [
  {
    number: "01",
    title: "Discovered web development",
    description:
      "Started with HTML, CSS, and JavaScript, learning how websites are structured, styled, and made interactive. This created my foundation in frontend development and browser fundamentals.",
  },
  {
    number: "02",
    title: "Built a strong JavaScript foundation",
    description:
      "Moved beyond basic syntax into closures, prototypes, execution contexts, the event loop, promises, asynchronous programming, modules, functional programming, DOM APIs, and JavaScript engine concepts.",
  },
  {
    number: "03",
    title: "Explored frontend engineering",
    description:
      "Started building more structured applications using React, TypeScript, and Next.js, exploring component architecture, server-side rendering, SEO, metadata, animations, responsive design, and performance optimization.",
  },
  {
    number: "04",
    title: "Expanded into backend development",
    description:
      "Explored Node.js, Express.js, REST APIs, MongoDB, Mongoose, authentication, database operations, backend architecture, file handling, and server-side application development.",
  },
  {
    number: "05",
    title: "Moved into mobile application development",
    description:
      "Started exploring React Native and Expo, learning mobile navigation, native device capabilities, camera integration, gestures, responsive layouts, application lifecycle, and background execution.",
  },
  {
    number: "06",
    title: "Explored developer tooling and desktop applications",
    description:
      "Became interested in how development tools work internally, exploring Webpack, esbuild, monorepos, CLI development, Electron, project generators, build systems, and developer productivity tools.",
  },
  {
    number: "07",
    title: "Started thinking in complete systems",
    description:
      "Gradually shifted my focus from individual features toward complete software systems, including architecture, scalability, data flow, maintainability, performance, security, and the interaction between different application layers.",
  },
];
const technicalSkills = [
  {
    title: "Frontend Development",
    icon: Code2,
    items: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Responsive Design",
      "SEO",
      "Web Animations",
    ],
  },
  {
    title: "Backend Development",
    icon: Server,
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "MongoDB",
      "Mongoose",
      "Authentication",
      "Database Design",
      "Server-side JavaScript",
    ],
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    items: [
      "React Native",
      "Expo",
      "Expo Router",
      "Native Device APIs",
      "Camera Integration",
      "Gesture Handling",
      "Mobile UI",
      "Application Lifecycle",
    ],
  },
  {
    title: "JavaScript Engineering",
    icon: Braces,
    items: [
      "Closures",
      "Prototypes",
      "ES6+",
      "Promises",
      "Async/Await",
      "Event Loop",
      "Functional Programming",
      "Design Patterns",
      "DOM & Browser APIs",
    ],
  },
  {
    title: "Developer Tooling",
    icon: Wrench,
    items: [
      "Webpack",
      "esbuild",
      "npm",
      "Monorepos",
      "CLI Development",
      "Build Systems",
      "Jest",
      "Testing",
      "Electron",
    ],
  },
  {
    title: "Software Engineering",
    icon: Workflow,
    items: [
      "System Design",
      "Application Architecture",
      "Performance Optimization",
      "Code Reusability",
      "Separation of Concerns",
      "Debugging",
      "Problem Solving",
      "Maintainable Code",
    ],
  },
  {
    title: "Data & Office Operations",
    icon: Database,
    items: [
      "Microsoft Excel",
      "Microsoft Word",
      "Data Management",
      "Data Verification",
      "Record Maintenance",
      "Operational Reporting",
      "Workflow Coordination",
    ],
  },
];
const projects = [
  {
    number: "01",
    name: "Assign Meter",
    type: "Workforce Automation & Meter Management System",
    description:
      "A real-world workforce automation solution consisting of a mobile application and management portal, designed to simplify meter assignment operations and reduce repetitive manual work.",
    details: [
      "Developed a mobile application for collecting and assigning large numbers of meter IDs.",
      "Implemented camera-based meter-box scanning to extract meter identification numbers.",
      "Integrated mobile application workflows with backend APIs.",
      "Built a management portal for assignment management and pending-meter monitoring.",
      "Implemented report generation and downloading capabilities.",
      "Focused on reducing manual effort, improving operational efficiency, and minimizing data-entry errors.",
    ],
    stack: [
      "React Native",
      "Expo",
      "Node.js",
      "Express.js",
      "JavaScript",
      "MongoDB",
    ],
    href: "https://play.google.com/store/apps/details?id=com.ajoy974.assignMeter",
  },
  {
    number: "02",
    name: "PhotoMart",
    type: "Mobile Application",
    description:
      "A mobile application focused on photo-related services, user interactions, and mobile application workflows.",
    details: [
      "Worked on mobile application interface development.",
      "Focused on responsive and user-friendly mobile layouts.",
      "Implemented application workflows and frontend functionality.",
      "Explored practical mobile application development.",
    ],
    stack: ["React Native", "JavaScript"],
    href: "https://play.google.com/store/apps/details?id=com.ajoy974.Photo_Mart",
  },
  {
    number: "03",
    name: "Kodhra",
    type: "Code Management & Organization Platform",
    description:
      "A development-focused platform intended to organize code-related information and improve developer workflows.",
    details: [
      "Worked on frontend and backend integration.",
      "Explored structured code and data management.",
      "Focused on application organization and maintainability.",
      "Developed features around organized development workflows.",
    ],
    stack: ["JavaScript", "Frontend", "Backend", "Data Management"],
    href: "/projects",
  },
];
const learningAreas = [
  "Advanced JavaScript & Engine Internals",
  "Advanced TypeScript",
  "Node.js Core Modules",
  "Advanced React & Next.js",
  "Expo & Native Mobile Development",
  "Background Tasks & Native Integrations",
  "Database Architecture",
  "Advanced API Design",
  "Authentication & Security",
  "Web & Mobile Performance",
  "Testing & Automation",
  "Webpack & Build Tool Internals",
  "Monorepo Architecture",
  "Electron Development",
  "CLI & Developer Tool Development",
  "System Design & Scalability",
  "Software Architecture",
  "Application Security",
];
const strengths = [
  "Analytical Thinking",
  "Problem Solving",
  "Self-directed Learning",
  "Technical Curiosity",
  "Logical Reasoning",
  "Attention to Detail",
  "Technical Adaptability",
  "Independent Project Development",
  "Workflow Optimization",
  "Continuous Improvement",
];
export const metadata = createSeoMetadata({
  title: "About",
  description:
    "Ajoy Das is a software developer building web applications, developer tools, open-source projects, and technical experiments.",
  path: "/about",
});

const siteUrl = "https://www.codewithajoydas.in";
const profileUrl = `${siteUrl}/about`;

const personSchema = {
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Ajoy Das",
  alternateName: ["Codewithajoydas", "ajoydas"],
  url: siteUrl,
  image: `${siteUrl}/images/Codewithajoydas_Skills-page.png`,
  jobTitle: "Software Developer",
  description:
    "A software developer and MIS Executive with experience in web development, mobile applications, backend systems, operational data management, and workflow automation.",
  email: "ajoydas@codewithajoydas.in",
  telephone: "+91-6900611920",

  address: {
    "@type": "PostalAddress",
    addressLocality: "Nagaon",
    addressRegion: "Assam",
    addressCountry: "IN",
  },

  worksFor: {
    "@type": "Organization",
    name: "Codewithajoydas",
  },

  sameAs: [
    "https://github.com/Codewithajoydas",
    "https://www.instagram.com/codewithajoydas",
    "https://www.facebook.com/profile.php?id=100090674957174",
    "https://www.youtube.com/@codewithajoydas",
  ],

  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "HTML5",
    "CSS3",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "REST API Development",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Full-Stack Development",
    "Mobile Application Development",
    "React Native",
    "Developer Tools",
    "Webpack",
    "esbuild",
    "Software Architecture",
    "Workflow Automation",
  ],
};

const profilePageSchema = {
  "@type": "ProfilePage",
  "@id": `${profileUrl}/#profilepage`,
  url: profileUrl,
  name: "Ajoy Das — Software Developer",
  description:
    "Official professional profile of Ajoy Das, a software developer building web applications, full-stack platforms, mobile applications, developer tools, and automation solutions.",

  mainEntity: {
    "@id": `${siteUrl}/#person`,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [personSchema, profilePageSchema],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <PageTransition>
        <main className="min-h-screen bg-white text-gray-900 dark:bg-zinc-950 dark:text-zinc-100">
          <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-white dark:from-blue-950/50 dark:via-zinc-950 dark:to-zinc-950 px-6 py-24 sm:px-10 lg:flex lg:items-center lg:px-16 lg:py-32">
            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-zinc-400">
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={15} />
                    Nagaon, Assam
                  </span>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span>Software Developer</span>
                </div>
                <p className="mt-8 text-sm font-medium uppercase tracking-[0.28em] text-gray-500 dark:text-zinc-400">
                  About Ajoy Das
                </p>
                <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                  I&apos;m passionate about{" "}
                  <span className={`${pacifico.className} text-blue-800`}>
                    building software.
                  </span>
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600 dark:text-zinc-400 sm:text-xl">
                  I&apos;m Ajoy Das, a developer who enjoys turning ideas into
                  working software while understanding the engineering
                  underneath it.
                </p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-gray-500 dark:text-zinc-400">
                  My work sits at the intersection of web development, mobile
                  applications, backend systems, automation, data workflows, and
                  developer tooling. I learn by building, experimenting,
                  breaking things apart, and understanding why they work.
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
                    className="inline-flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 px-6 py-3 text-sm font-semibold text-gray-900 dark:text-zinc-100 transition-colors hover:bg-gray-200 dark:hover:bg-zinc-700"
                  >
                    Get in touch
                  </Link>
                </div>
                <div className="mt-14 grid max-w-2xl grid-cols-2 gap-px border border-gray-200 dark:border-zinc-800 bg-gray-200 dark:bg-zinc-800 sm:grid-cols-4">
                  {[
                    ["2023", "Started professional role"],
                    ["3+", "Featured projects"],
                    ["JS", "Primary ecosystem"],
                    ["Full", "Stack direction"],
                  ].map(([value, label]) => (
                    <div key={label} className="bg-white dark:bg-zinc-900 p-5">
                      <p className="text-2xl font-bold tracking-tight">
                        {value}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-zinc-400">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-lg">
                <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-zinc-800">
                  <Image
                    src="/images/Codewithajoydas_Skills-page.png"
                    alt="Ajoy Das"
                    fill
                    priority
                    sizes="(max-width: 1024px) 85vw, 40vw"
                    className="object-contain"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 -z-10 h-full w-full border border-blue-200 dark:border-blue-800" />
                <div className="absolute -left-6 bottom-10 hidden border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xl sm:block">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500">
                    Currently
                  </p>
                  <p className="mt-2 max-w-[180px] text-sm font-semibold leading-6">
                    Going deeper into full-stack engineering and system design.
                  </p>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-blue-100/50 dark:bg-blue-900/20 blur-3xl" />
          </section>
          <section className="border-y border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400 dark:text-zinc-500">
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
                  [
                    "Professional role",
                    "MIS Executive — Genus Power Infrastructures",
                  ],
                  [
                    "Core ecosystem",
                    "JavaScript, Node.js, React, React Native",
                  ],
                  ["Languages", "English, Hindi, Assamese"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="border border-gray-200 dark:border-zinc-800 p-6"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-zinc-500">
                      {label}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-gray-700 dark:text-zinc-300">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-28">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400 dark:text-zinc-500">
                    My story
                  </p>
                  <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                    I don&apos;t want to just{" "}
                    <span className={`${pacifico.className} text-blue-800`}>
                      use software.
                    </span>
                  </h2>
                </div>
                <div className="space-y-7 text-base leading-8 text-gray-600 dark:text-zinc-400">
                  <p>
                    My professional background combines operational data work
                    with software development. As an MIS Executive at Genus
                    Power Infrastructures, my responsibilities include preparing
                    and maintaining MIS reports, managing Excel sheets and
                    operational records, performing data verification,
                    organizing project records, and coordinating with teams.
                  </p>
                  <p>
                    That environment also exposed me to real workflow problems:
                    repetitive operations, manual data handling, reporting
                    needs, and opportunities for automation. Building software
                    to solve those problems became a natural extension of my
                    technical interests.
                  </p>
                  <p>
                    Outside day-to-day work, I spend a significant amount of
                    time learning the JavaScript ecosystem and building
                    applications. I have explored frontend development, backend
                    development, mobile development, APIs, databases, testing,
                    performance, tooling, and system design.
                  </p>
                  <p>
                    The direction is simple: become the kind of engineer who can
                    understand a problem, design a solution, build it, debug it,
                    and keep improving it instead of stopping at the first
                    working version.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-gray-50 dark:bg-zinc-900/50 px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-28">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500 dark:text-zinc-400">
                    Professional experience
                  </p>
                  <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    Work that connects{" "}
                    <span className={`${pacifico.className} text-blue-800`}>
                      data and software.
                    </span>
                  </h2>
                </div>
                <div className="border-t border-gray-200 dark:border-zinc-800">
                  <div className="border-b border-gray-200 dark:border-zinc-800 py-9">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <div className="flex items-center gap-3">
                          <BriefcaseBusiness
                            size={20}
                            className="text-blue-800 dark:text-blue-400"
                          />
                          <h3 className="text-2xl font-semibold">
                            MIS Executive
                          </h3>
                        </div>
                        <p className="mt-2 text-gray-600 dark:text-zinc-400">
                          Genus Power Infrastructures
                        </p>
                      </div>
                      <span className="text-sm font-medium text-gray-500 dark:text-zinc-400">
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
                          className="flex gap-3 border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4"
                        >
                          <Check
                            size={17}
                            className="mt-1 shrink-0 text-blue-800 dark:text-blue-400"
                          />
                          <span className="text-sm leading-6 text-gray-600 dark:text-zinc-400">
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
          <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                <div className="max-w-4xl">
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400 dark:text-zinc-500">
                    Selected projects
                  </p>
                  <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    I learn by{" "}
                    <span className={`${pacifico.className} text-blue-800`}>
                      building real things.
                    </span>
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-zinc-400">
                    These projects represent the transition from learning
                    isolated technologies to solving actual workflow and
                    application problems.
                  </p>
                </div>
                <Link
                  href="/projects"
                  className="group inline-flex w-fit items-center gap-2 border-b border-gray-900 dark:border-zinc-300 pb-1 text-sm font-semibold"
                >
                  See all projects
                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>
              </div>
              <div className="mt-16 border-t border-gray-200 dark:border-zinc-800">
                {projects.map((project) => (
                  <article
                    key={project.number}
                    className="grid gap-8 border-b border-gray-200 dark:border-zinc-800 py-12 lg:grid-cols-[80px_0.8fr_1.2fr]"
                  >
                    <span className="text-xs font-semibold tracking-[0.2em] text-gray-400 dark:text-zinc-500">
                      {project.number}
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue-800 dark:text-blue-400">
                        {project.type}
                      </p>
                      <h3 className="mt-3 text-3xl font-semibold tracking-tight">
                        {project.name}
                      </h3>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="border border-gray-200 dark:border-zinc-800 px-3 py-1.5 text-xs text-gray-600 dark:text-zinc-400"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-base leading-8 text-gray-600 dark:text-zinc-400">
                        {project.description}
                      </p>
                      <ul className="mt-6 space-y-3">
                        {project.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex gap-3 text-sm leading-6 text-gray-600 dark:text-zinc-400"
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
                        className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-zinc-100"
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
          <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400 dark:text-zinc-500">
                  Technical profile
                </p>
                <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  A growing{" "}
                  <span className={`${pacifico.className} text-blue-800`}>
                    engineering toolkit.
                  </span>
                </h2>
              </div>
              <div className="mt-16 grid border-t border-gray-200 dark:border-zinc-800 sm:grid-cols-2 lg:grid-cols-3">
                {technicalSkills.map((group) => {
                  const Icon = group.icon;
                  return (
                    <div
                      key={group.title}
                      className="border-b border-gray-200 dark:border-zinc-800 p-8 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800 sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(3n+1)]:border-r lg:[&:nth-child(3n+2)]:border-r"
                    >
                      <Icon
                        size={22}
                        className="text-blue-800 dark:text-blue-400"
                      />
                      <h3 className="mt-8 text-xl font-semibold">
                        {group.title}
                      </h3>
                      <div className="mt-5 space-y-2">
                        {group.items.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 text-sm text-gray-600 dark:text-zinc-400"
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
          <section className="bg-gray-50 dark:bg-zinc-900/50 px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500 dark:text-zinc-400">
                    Learning journey
                  </p>
                  <h2 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                    From learning to{" "}
                    <span className={`${pacifico.className} text-blue-800`}>
                      building.
                    </span>
                  </h2>
                  <p className="mt-7 max-w-lg text-lg leading-8 text-gray-600 dark:text-zinc-400">
                    The journey has never been about collecting technology
                    names. It has been about progressively understanding more
                    layers of software.
                  </p>
                </div>
                <div className="border-t border-gray-200 dark:border-zinc-800">
                  {journey.map((item) => (
                    <div
                      key={item.number}
                      className="grid gap-5 border-b border-gray-200 dark:border-zinc-800 py-9 sm:grid-cols-[60px_220px_1fr]"
                    >
                      <span className="text-xs font-semibold tracking-[0.2em] text-gray-400 dark:text-zinc-500">
                        {item.number}
                      </span>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm leading-7 text-gray-600 dark:text-zinc-400">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-28">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400 dark:text-zinc-500">
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
                  <p className="max-w-2xl text-lg leading-8 text-gray-600 dark:text-zinc-400">
                    My current learning direction is focused on turning
                    individual JavaScript knowledge into stronger engineering
                    ability: architecture, backend systems, databases,
                    performance, testing, tooling, and system design.
                  </p>
                  <div className="mt-10 flex flex-wrap gap-3">
                    {learningAreas.map((item) => (
                      <span
                        key={item}
                        className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-3 text-sm text-gray-700 dark:text-zinc-300 transition-colors "
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/skills"
                    className="group mt-10 inline-flex items-center gap-2 border-b border-gray-900 dark:border-zinc-300 pb-1 text-sm font-semibold"
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
          <section className="bg-gray-50 dark:bg-zinc-900/50 px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500 dark:text-zinc-400">
                  Engineering principles
                </p>
                <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  How I approach{" "}
                  <span className={`${pacifico.className} text-blue-800`}>
                    development.
                  </span>
                </h2>
              </div>
              <div className="mt-16 grid border-t border-gray-200 dark:border-zinc-800 sm:grid-cols-2">
                {principles.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.number}
                      className="group border-b border-gray-200 dark:border-zinc-800 p-8 transition-colors duration-300 hover:bg-white dark:hover:bg-zinc-800 sm:[&:nth-child(odd)]:border-r lg:p-10"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-medium tracking-[0.2em] text-gray-400 dark:text-zinc-500">
                          {item.number}
                        </span>
                        <Icon
                          size={22}
                          strokeWidth={1.5}
                          className="text-gray-400 dark:text-zinc-500 transition-colors group-hover:text-blue-800 dark:hover:text-blue-400"
                        />
                      </div>
                      <h3 className="mt-12 text-xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-7 text-gray-600 dark:text-zinc-400">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400 dark:text-zinc-500">
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
                      className="flex items-center gap-4 border border-gray-200 dark:border-zinc-800 p-6"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-blue-50 dark:bg-blue-950/40 text-xs font-semibold text-blue-800 dark:text-blue-400">
                        0{index + 1}
                      </span>
                      <span className="text-sm font-medium">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="relative overflow-hidden bg-blue-900 px-6 py-28 text-white sm:px-10 lg:px-16 lg:py-40">
            <div className="relative z-10 mx-auto max-w-5xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-200">
                The way I see development
              </p>
              <blockquote className="mt-8 text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-6xl">
                “The goal isn&apos;t to know every tool.{" "}
                <span className={`${pacifico.className} text-blue-200`}>
                  It&apos;s to understand enough
                </span>{" "}
                to build something useful with whatever tool the problem
                requires.”
              </blockquote>
            </div>
            <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-blue-700/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-950/50 blur-3xl" />
          </section>
          <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400 dark:text-zinc-500">
                    Let&apos;s connect
                  </p>
                  <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    There&apos;s more to{" "}
                    <span className={`${pacifico.className} text-blue-800`}>
                      explore.
                    </span>
                  </h2>
                  <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-zinc-400">
                    Explore the projects, skills, and experiments behind the
                    portfolio — or get in touch if you want to talk about
                    software, development, or a project.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href="https://github.com/codewithajoydas"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between border border-gray-200 dark:border-zinc-800 p-6 transition-colors hover:border-gray-900 dark:hover:border-zinc-400 dark:border-zinc-300"
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
                    className="group flex items-center justify-between border border-gray-200 dark:border-zinc-800 p-6 transition-colors hover:border-gray-900 dark:hover:border-zinc-400 dark:border-zinc-300"
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
                    className="group flex items-center justify-between border border-gray-200 dark:border-zinc-800 p-6 transition-colors hover:border-gray-900 dark:hover:border-zinc-400 dark:border-zinc-300"
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
                    className="group flex items-center justify-between border border-gray-200 dark:border-zinc-800 p-6 transition-colors hover:border-gray-900 dark:hover:border-zinc-400 dark:border-zinc-300"
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
      </PageTransition>
    </>
  );
}
