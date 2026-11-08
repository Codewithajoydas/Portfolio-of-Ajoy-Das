
import React from "react";
import {
  ArrowUpRight,
  Code2,
  Monitor,
  Smartphone,
  Server,
  Database,
  Terminal,
  Wrench,
  Layers3,
  Workflow,
  ShieldCheck,
  Rocket,
  Check,
  MessageSquare,
  Globe,
  Blocks,
} from "lucide-react";

import Link from "next/link";
import Footer from "@/components/Footer";
import { Pacifico } from "next/font/google";
import PageTransition from "@/components/page-transition";
import { absoluteUrl, createSeoMetadata } from "@/lib/seo";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = createSeoMetadata({
  title: "Services",
  description:
    "Explore software development services by Ajoy Das, including web application development, backend development, desktop applications, APIs, and developer tools.",
  path: "/services",
});

const services = [
  {
    number: "01",
    title: "Web Application Development",
    description:
      "I build modern, responsive, and scalable web applications tailored to your business requirements, from simple websites to complex full-stack platforms.",
    icon: Globe,
    features: [
      "Custom web application development",
      "Frontend and backend integration",
      "Responsive UI development",
      "Dashboard and admin panels",
      "Third-party API integration",
    ],
    technologies: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"],
  },
  {
    number: "02",
    title: "Application Development",
    description:
      "Custom software applications designed to solve specific problems, automate workflows, and improve everyday productivity.",
    icon: Blocks,
    features: [
      "Custom business applications",
      "Productivity software",
      "Application architecture",
      "Feature development",
      "Cross-platform solutions",
    ],
    technologies: ["React", "Node.js", "Electron", "TypeScript"],
  },
  {
    number: "03",
    title: "Backend Development",
    description:
      "Reliable backend systems with structured APIs, authentication, database integration, and server-side business logic.",
    icon: Server,
    features: [
      "REST API development",
      "Authentication systems",
      "Backend architecture",
      "Business logic implementation",
      "API integration",
    ],
    technologies: ["Node.js", "Express.js", "MongoDB", "JWT"],
  },
  {
    number: "04",
    title: "Desktop Application Development",
    description:
      "Desktop applications built to deliver powerful local software experiences with practical interfaces and system-level capabilities.",
    icon: Monitor,
    features: [
      "Windows desktop applications",
      "Cross-platform desktop software",
      "Local data management",
      "File system integration",
      "Application packaging",
    ],
    technologies: ["Electron", "JavaScript", "Node.js", "React"],
  },
  {
    number: "05",
    title: "Database Design & Integration",
    description:
      "Well-structured database solutions that help applications store, organize, retrieve, and manage information efficiently.",
    icon: Database,
    features: [
      "Database schema design",
      "Data modeling",
      "CRUD operations",
      "Database integration",
      "Query optimization",
    ],
    technologies: ["MongoDB", "Mongoose", "SQL"],
  },
  {
    number: "06",
    title: "CLI & Developer Tools",
    description:
      "Custom command-line tools and development utilities that automate repetitive tasks and improve developer workflows.",
    icon: Terminal,
    features: [
      "CLI application development",
      "Project generators",
      "Developer utilities",
      "Workflow automation",
      "Interactive command-line interfaces",
    ],
    technologies: ["Node.js", "TypeScript", "Commander", "Inquirer"],
  },
  {
    number: "07",
    title: "Website Development",
    description:
      "Professional websites designed with a focus on performance, responsive layouts, accessibility, and search engine optimization.",
    icon: Code2,
    features: [
      "Business websites",
      "Personal portfolio websites",
      "Landing pages",
      "SEO-friendly implementation",
      "Performance optimization",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Next.js"],
  },
  {
    number: "08",
    title: "API Development & Integration",
    description:
      "Designing and integrating APIs that allow different applications and services to communicate and exchange information.",
    icon: Workflow,
    features: [
      "REST API development",
      "External API integration",
      "Request validation",
      "Error handling",
      "API documentation",
    ],
    technologies: ["Node.js", "Express.js", "REST", "Zod"],
  },
  {
    number: "09",
    title: "Maintenance & Optimization",
    description:
      "Improving existing applications through debugging, refactoring, performance improvements, and ongoing technical maintenance.",
    icon: Wrench,
    features: [
      "Bug fixing",
      "Code refactoring",
      "Performance improvements",
      "Feature enhancements",
      "Technical maintenance",
    ],
    technologies: ["JavaScript", "TypeScript", "React", "Node.js"],
  },
];

const process = [
  {
    number: "01",
    title: "Understanding",
    description:
      "Understand your requirements, goals, users, and the actual problem that needs to be solved.",
  },
  {
    number: "02",
    title: "Planning",
    description:
      "Define the scope, select technologies, plan architecture, and establish the development roadmap.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "Build the solution with clean code, reusable components, and practical development practices.",
  },
  {
    number: "04",
    title: "Testing",
    description:
      "Test functionality, identify issues, debug problems, and improve the overall experience.",
  },
  {
    number: "05",
    title: "Delivery",
    description:
      "Prepare the application for deployment and provide the completed deliverables.",
  },
  {
    number: "06",
    title: "Improvement",
    description:
      "Continue improving the application through maintenance, updates, and additional features.",
  },
];

const advantages = [
  {
    title: "Custom-built solutions",
    description:
      "Solutions designed around your actual requirements rather than unnecessary features.",
    icon: Layers3,
  },
  {
    title: "Modern technologies",
    description:
      "Using suitable modern tools and technologies to develop reliable applications.",
    icon: Rocket,
  },
  {
    title: "Maintainable code",
    description:
      "Organized implementation with a focus on readability and future improvements.",
    icon: Code2,
  },
  {
    title: "Security-conscious development",
    description:
      "Considering authentication, validation, and secure development practices.",
    icon: ShieldCheck,
  },
];

export default function ServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl("/services#webpage"),
        name: "Software Development Services | Codewithajoydas",
        url: absoluteUrl("/services"),
        description:
          "Software development services offered by Ajoy Das.",
        inLanguage: "en-IN",
      },
      {
        "@type": "ItemList",
        name: "Software Development Services",
        numberOfItems: services.length,
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: {
              "@type": "Person",
              name: "Ajoy Das",
              url: absoluteUrl("/about"),
            },
            url: absoluteUrl("/services"),
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        id="services-page-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <PageTransition>
        <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">

          {/* HERO */}
          <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-b from-blue-50 via-white to-white px-6 pb-24 pt-32 dark:border-zinc-800 dark:from-blue-950 dark:via-zinc-950 dark:to-zinc-950 sm:px-10 lg:px-16">
            <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-900/20" />

            <div className="relative mx-auto max-w-6xl">
              <div className="grid gap-14 lg:grid-cols-[1fr_0.65fr] lg:items-end">
                <div>
                  <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-400">
                    What I offer
                  </p>

                  <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                    Turning ideas into
                    <br />
                    <span className={`text-blue-800 dark:text-blue-400 ${pacifico.className}`}>
                      working software.
                    </span>
                  </h1>
                </div>

                <div>
                  <p className="max-w-xl text-lg leading-8 text-gray-600 dark:text-zinc-400">
                    I provide software development services focused on
                    building practical, scalable, and user-friendly digital
                    solutions. From websites and web applications to backend
                    systems and custom software.
                  </p>

                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center gap-3 bg-blue-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-900"
                  >
                    Discuss your project
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </div>

              <div className="mt-16 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 dark:border-zinc-800 dark:bg-zinc-800 sm:grid-cols-3">
                <div className="bg-white p-7 dark:bg-zinc-950">
                  <p className="text-3xl font-semibold">09</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-zinc-500">
                    Service categories
                  </p>
                </div>
                <div className="bg-white p-7 dark:bg-zinc-950">
                  <p className="text-3xl font-semibold">Full-stack</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-zinc-500">
                    Development capabilities
                  </p>
                </div>
                <div className="bg-white p-7 dark:bg-zinc-950">
                  <p className="text-3xl font-semibold">Custom</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-zinc-500">
                    Project-focused solutions
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* INTRODUCTION */}
          <section className="px-6 py-24 sm:px-10 lg:px-16">
            <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.75fr_1fr]">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-400">
                  My approach
                </p>

                <h2 className="mt-5 max-w-md text-4xl font-semibold leading-tight tracking-tight">
                  More than just writing code.
                </h2>
              </div>

              <div className="max-w-2xl">
                <p className="text-lg leading-8 text-gray-600 dark:text-zinc-400">
                  Every software project begins with a problem. My goal is
                  to understand that problem and develop a solution that
                  actually serves its purpose.
                </p>

                <p className="mt-6 leading-7 text-gray-600 dark:text-zinc-400">
                  I focus on the complete development process, including
                  planning, architecture, implementation, testing, and
                  continuous improvement. The result should not simply work
                  today; it should also be understandable and maintainable
                  tomorrow.
                </p>
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section className="border-y border-gray-200 bg-gray-50 px-6 py-24 dark:border-zinc-800 dark:bg-zinc-900/60 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
              <div className="max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-400">
                  Services
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                  Development solutions for different needs.
                </h2>

                <p className="mt-5 leading-7 text-gray-600 dark:text-zinc-400">
                  Explore the development services I offer, covering
                  different parts of the modern software development
                  lifecycle.
                </p>
              </div>

              <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => {
                  const Icon = service.icon;

                  return (
                    <article
                      key={service.number}
                      className="group flex flex-col border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[5px_5px_0px_#193cb8] dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center border border-gray-200 bg-gray-50 text-blue-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-blue-400">
                          <Icon size={21} />
                        </div>

                        <span className="font-mono text-xs text-gray-400 dark:text-zinc-500">
                          {service.number}
                        </span>
                      </div>

                      <h3 className="mt-8 text-xl font-semibold tracking-tight">
                        {service.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-zinc-400">
                        {service.description}
                      </p>

                      <div className="mt-7 border-t border-gray-200 pt-6 dark:border-zinc-800">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-500">
                          What&apos;s included
                        </p>

                        <ul className="mt-5 space-y-3">
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-3 text-sm text-gray-600 dark:text-zinc-400"
                            >
                              <Check
                                size={15}
                                className="mt-0.5 shrink-0 text-blue-800 dark:text-blue-400"
                              />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto pt-7">
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <Link
                          href={`/contact?service=${encodeURIComponent(service.title)}`}
                          className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-blue-800 transition hover:gap-3 dark:text-blue-400"
                        >
                          Discuss this service
                          <ArrowUpRight size={16} />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* WHY WORK WITH ME */}
          <section className="px-6 py-24 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
              <div className="max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-400">
                  Why work with me
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                  What goes into every project.
                </h2>
              </div>

              <div className="mt-14 grid gap-5 md:grid-cols-2">
                {advantages.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className="flex gap-6 border border-gray-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400">
                        <Icon size={21} />
                      </div>

                      <div>
                        <span className="font-mono text-xs text-gray-400 dark:text-zinc-500">
                          0{index + 1}
                        </span>

                        <h3 className="mt-3 text-xl font-semibold">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-zinc-400">
                          {item.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* PROCESS */}
          <section className="border-y border-gray-200 bg-gray-50 px-6 py-24 dark:border-zinc-800 dark:bg-zinc-900/60 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-14 lg:grid-cols-[0.7fr_1fr]">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-400">
                    Development process
                  </p>

                  <h2 className="mt-5 max-w-md text-4xl font-semibold tracking-tight">
                    From the first conversation to the final delivery.
                  </h2>

                  <p className="mt-6 max-w-md leading-7 text-gray-600 dark:text-zinc-400">
                    A structured process helps maintain clarity,
                    reduce unnecessary complexity, and deliver
                    software that meets the intended requirements.
                  </p>
                </div>

                <div className="grid gap-px overflow-hidden border border-gray-200 bg-gray-200 dark:border-zinc-800 dark:bg-zinc-800 sm:grid-cols-2">
                  {process.map((item) => (
                    <article
                      key={item.number}
                      className="bg-white p-7 dark:bg-zinc-950"
                    >
                      <span className="font-mono text-xs text-blue-800 dark:text-blue-400">
                        {item.number}
                      </span>

                      <h3 className="mt-6 text-xl font-semibold">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-zinc-400">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-6 py-24 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
              <div className="relative overflow-hidden bg-gray-900 px-8 py-16 text-white dark:bg-zinc-900 sm:px-14 sm:py-20">
                <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-700/20 blur-3xl" />

                <div className="relative max-w-3xl">
                  <div className="flex h-12 w-12 items-center justify-center bg-white/10 text-blue-300">
                    <MessageSquare size={22} />
                  </div>

                  <h2 className="mt-8 text-4xl font-semibold tracking-tight sm:text-6xl">
                    Have a project in mind?
                    <br />
                    <span className={`text-blue-300 ${pacifico.className}`}>
                      Let&apos;s build it.
                    </span>
                  </h2>

                  <p className="mt-6 max-w-xl leading-8 text-gray-400">
                    Tell me about your idea, requirements, or business
                    problem. Let&apos;s discuss how software can help you
                    achieve your goals.
                  </p>

                  <Link
                    href="/contact"
                    className="mt-9 inline-flex items-center gap-3 bg-blue-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    Start a conversation
                    <ArrowUpRight size={17} />
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
