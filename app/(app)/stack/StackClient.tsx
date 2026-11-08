"use client";
import React, { useMemo, useState } from "react";
import {
  Search,
  X,
  ArrowUpRight,
  Code2,
  Database,
  Server,
  Palette,
  Wrench,
  Globe,
  Layers,
  Terminal,
  Cpu,
  GitBranch,
  Cloud,
  Sparkles,
  Filter,
  Star,
  Zap,
  BookOpen,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import { Pacifico } from "next/font/google";
import Footer from "@/components/Footer";
import PageTransition from "@/components/page-transition";
import Link from "next/link";
const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});
type Technology = {
  name: string;
  category: string;
  description: string;
  icon: React.ElementType;
  color: string;
  level: string;
  experience: string;
  featured?: boolean;
  tags: string[];
};
const categories = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "DevOps",
  "Design",
];
const technologies: Technology[] = [
  // LANGUAGES
  {
    name: "JavaScript",
    category: "Languages",
    description:
      "My primary language for building interactive web applications, backend systems and developer utilities.",
    icon: Code2,
    color: "#EAB308",
    level: "Advanced",
    experience: "Core language",
    featured: true,
    tags: ["ES6+", "DOM", "Async", "Node.js"],
  },
  {
    name: "TypeScript",
    category: "Languages",
    description:
      "Adding static typing, better maintainability and reliable development workflows to JavaScript applications.",
    icon: Code2,
    color: "#3178C6",
    level: "Advanced",
    experience: "Application development",
    featured: true,
    tags: ["Types", "Interfaces", "Generics"],
  },
  {
    name: "HTML5",
    category: "Languages",
    description:
      "Building semantic, accessible and well-structured web documents.",
    icon: Code2,
    color: "#E34F26",
    level: "Advanced",
    experience: "Web fundamentals",
    tags: ["Semantic HTML", "Accessibility", "SEO"],
  },
  {
    name: "CSS3",
    category: "Languages",
    description:
      "Creating responsive interfaces, animations and polished visual experiences.",
    icon: Palette,
    color: "#1572B6",
    level: "Advanced",
    experience: "UI development",
    tags: ["Flexbox", "Grid", "Animations"],
  },
  {
    name: "SQL",
    category: "Languages",
    description:
      "Working with relational data, queries, joins and database operations.",
    icon: Database,
    color: "#64748B",
    level: "Intermediate",
    experience: "Database querying",
    tags: ["Queries", "Joins", "Relationships"],
  },
  // FRONTEND
  {
    name: "React",
    category: "Frontend",
    description:
      "Building reusable components and interactive user interfaces using modern React patterns.",
    icon: Layers,
    color: "#61DAFB",
    level: "Advanced",
    experience: "Component architecture",
    featured: true,
    tags: ["Hooks", "Components", "Context API"],
  },
  {
    name: "Next.js",
    category: "Frontend",
    description:
      "Developing full-stack React applications with routing, server rendering and optimized performance.",
    icon: Globe,
    color: "#64748B",
    level: "Advanced",
    experience: "Full-stack framework",
    featured: true,
    tags: ["App Router", "SSR", "SEO"],
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    description:
      "Building consistent and responsive interfaces using utility-first CSS.",
    icon: Palette,
    color: "#06B6D4",
    level: "Advanced",
    experience: "Styling",
    tags: ["Responsive", "Dark Mode", "Utilities"],
  },
  {
    name: "Framer Motion",
    category: "Frontend",
    description:
      "Creating smooth UI animations and transitions for modern web applications.",
    icon: Sparkles,
    color: "#8B5CF6",
    level: "Intermediate",
    experience: "Animation",
    tags: ["Motion", "Transitions", "Gestures"],
  },
  {
    name: "Three.js",
    category: "Frontend",
    description:
      "Exploring interactive 3D graphics and immersive web experiences.",
    icon: Cpu,
    color: "#64748B",
    level: "Intermediate",
    experience: "3D development",
    tags: ["WebGL", "3D", "Graphics"],
  },
  {
    name: "GSAP",
    category: "Frontend",
    description:
      "Creating advanced timeline-based animations and interactive visual experiences.",
    icon: Zap,
    color: "#88CE02",
    level: "Intermediate",
    experience: "Animation",
    tags: ["Timeline", "ScrollTrigger", "Motion"],
  },
  // BACKEND
  {
    name: "Node.js",
    category: "Backend",
    description:
      "Building server-side applications, APIs, command-line utilities and asynchronous systems.",
    icon: Server,
    color: "#5FA04E",
    level: "Advanced",
    experience: "Runtime environment",
    featured: true,
    tags: ["Events", "Streams", "Modules"],
  },
  {
    name: "Express.js",
    category: "Backend",
    description:
      "Creating REST APIs, middleware systems and backend application architectures.",
    icon: Server,
    color: "#64748B",
    level: "Advanced",
    experience: "Backend framework",
    tags: ["REST API", "Middleware", "Routing"],
  },
  {
    name: "NestJS",
    category: "Backend",
    description:
      "Exploring structured and scalable server-side application architecture.",
    icon: Layers,
    color: "#E0234E",
    level: "Learning",
    experience: "Backend framework",
    tags: ["Modules", "Dependency Injection", "APIs"],
  },
  {
    name: "Socket.IO",
    category: "Backend",
    description:
      "Building real-time communication features using bidirectional event-based communication.",
    icon: Globe,
    color: "#64748B",
    level: "Intermediate",
    experience: "Real-time systems",
    tags: ["WebSockets", "Events", "Real-time"],
  },
  // DATABASE
  {
    name: "MongoDB",
    category: "Database",
    description:
      "Working with document-oriented databases and flexible data models.",
    icon: Database,
    color: "#47A248",
    level: "Advanced",
    experience: "NoSQL database",
    featured: true,
    tags: ["Documents", "Aggregation", "Indexes"],
  },
  {
    name: "PostgreSQL",
    category: "Database",
    description:
      "Working with relational databases, structured schemas and SQL queries.",
    icon: Database,
    color: "#4169E1",
    level: "Intermediate",
    experience: "Relational database",
    tags: ["SQL", "Relations", "Indexes"],
  },
  {
    name: "Redis",
    category: "Database",
    description:
      "Exploring in-memory data storage, caching and fast data access patterns.",
    icon: Database,
    color: "#DC382D",
    level: "Learning",
    experience: "Caching",
    tags: ["Cache", "Key Value", "Performance"],
  },
  // TOOLS
  {
    name: "Git",
    category: "Tools",
    description:
      "Managing source code, version history and collaborative development workflows.",
    icon: GitBranch,
    color: "#F05032",
    level: "Advanced",
    experience: "Version control",
    featured: true,
    tags: ["Branches", "Merge", "Rebase"],
  },
  {
    name: "GitHub",
    category: "Tools",
    description:
      "Hosting repositories, managing source code and collaborating on software projects.",
    icon: Globe,
    color: "#64748B",
    level: "Advanced",
    experience: "Code collaboration",
    tags: ["Repositories", "Pull Requests", "Issues"],
  },
  {
    name: "Webpack",
    category: "Tools",
    description:
      "Understanding module bundling, asset management and production build optimization.",
    icon: Layers,
    color: "#8DD6F9",
    level: "Intermediate",
    experience: "Bundling",
    featured: true,
    tags: ["Loaders", "Plugins", "Optimization"],
  },
  {
    name: "Vite",
    category: "Tools",
    description:
      "Using modern frontend tooling for fast development and optimized production builds.",
    icon: Zap,
    color: "#646CFF",
    level: "Intermediate",
    experience: "Build tooling",
    tags: ["HMR", "ES Modules", "Build"],
  },
  {
    name: "Postman",
    category: "Tools",
    description:
      "Testing APIs, managing requests and debugging backend integrations.",
    icon: Globe,
    color: "#FF6C37",
    level: "Advanced",
    experience: "API testing",
    tags: ["REST", "Collections", "Testing"],
  },
  {
    name: "Electron",
    category: "Tools",
    description:
      "Building desktop applications using web technologies and Node.js.",
    icon: Terminal,
    color: "#47848F",
    level: "Intermediate",
    experience: "Desktop development",
    tags: ["Desktop", "IPC", "Native APIs"],
  },
  // DEVOPS
  {
    name: "Docker",
    category: "DevOps",
    description:
      "Learning containerization and reproducible application environments.",
    icon: Layers,
    color: "#2496ED",
    level: "Intermediate",
    experience: "Containerization",
    tags: ["Containers", "Images", "Compose"],
  },
  {
    name: "Linux",
    category: "DevOps",
    description:
      "Working with command-line environments, system utilities and development servers.",
    icon: Terminal,
    color: "#FCC624",
    level: "Intermediate",
    experience: "Operating system",
    tags: ["CLI", "Shell", "Processes"],
  },
  {
    name: "Vercel",
    category: "DevOps",
    description:
      "Deploying modern web applications and managing frontend hosting workflows.",
    icon: Cloud,
    color: "#64748B",
    level: "Intermediate",
    experience: "Deployment",
    tags: ["Hosting", "Deployments", "Domains"],
  },
  {
    name: "GitHub Actions",
    category: "DevOps",
    description:
      "Exploring automated testing, build pipelines and continuous integration.",
    icon: GitBranch,
    color: "#2088FF",
    level: "Learning",
    experience: "CI/CD",
    tags: ["Workflows", "Automation", "CI"],
  },
  // DESIGN
  {
    name: "Figma",
    category: "Design",
    description:
      "Planning interfaces, exploring layouts and working with design systems.",
    icon: Palette,
    color: "#F24E1E",
    level: "Intermediate",
    experience: "UI design",
    tags: ["Components", "Prototypes", "Design Systems"],
  },
];
const learningTechnologies = [
  {
    name: "System Design",
    description:
      "Designing scalable systems, architecture and distributed applications.",
    icon: Layers,
    category: "Architecture",
  },
  {
    name: "Advanced Node.js",
    description:
      "Exploring Node.js internals, streams, performance and runtime architecture.",
    icon: Server,
    category: "Backend",
  },
  {
    name: "DevOps & CI/CD",
    description:
      "Improving deployment workflows, automation and infrastructure knowledge.",
    icon: Cloud,
    category: "Infrastructure",
  },
  {
    name: "WebGL & 3D",
    description:
      "Building more immersive interfaces and advanced interactive experiences.",
    icon: Cpu,
    category: "Frontend",
  },
];
const levelStyles: Record<string, string> = {
  Advanced:
    "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400",
  Intermediate:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-400",
  Learning:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-400",
};
export default function StackClient() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showFeatured, setShowFeatured] = useState(false);
  const filteredTechnologies = useMemo(() => {
    let result = [...technologies];
    if (activeCategory !== "All") {
      result = result.filter(
        (tech) => tech.category === activeCategory
      );
    }
    if (showFeatured) {
      result = result.filter((tech) => tech.featured);
    }
    if (search.trim()) {
      const query = search.toLowerCase().trim();
      result = result.filter((tech) =>
        [
          tech.name,
          tech.category,
          tech.description,
          tech.level,
          tech.experience,
          ...tech.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }
    if (sortBy === "name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    if (sortBy === "category") {
      result.sort((a, b) =>
        a.category.localeCompare(b.category)
      );
    }
    if (sortBy === "level") {
      const order: Record<string, number> = {
        Advanced: 1,
        Intermediate: 2,
        Learning: 3,
      };
      result.sort(
        (a, b) => order[a.level] - order[b.level]
      );
    }
    if (sortBy === "featured") {
      result.sort(
        (a, b) =>
          Number(Boolean(b.featured)) -
          Number(Boolean(a.featured))
      );
    }
    return result;
  }, [search, activeCategory, sortBy, showFeatured]);
  const categoryCount = (category: string) => {
    if (category === "All") return technologies.length;
    return technologies.filter(
      (tech) => tech.category === category
    ).length;
  };
  const resetFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setSortBy("featured");
    setShowFeatured(false);
  };
  const featuredCount = technologies.filter(
    (tech) => tech.featured
  ).length;
  const advancedCount = technologies.filter(
    (tech) => tech.level === "Advanced"
  ).length;
  const learningCount = technologies.filter(
    (tech) => tech.level === "Learning"
  ).length;
  return (
    <PageTransition>
      <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-blue-50 via-white to-white px-6 pb-20 pt-32 dark:border-zinc-800 dark:from-blue-950 dark:via-zinc-950 dark:to-zinc-950 sm:px-10 lg:px-16">
          <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-900/20" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-sky-100/50 blur-3xl dark:bg-sky-900/10" />
          <div className="relative mx-auto max-w-6xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
              Technologies & Expertise
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              My technology
              <br />
              <span
                className={`${pacifico.className} font-normal text-blue-800 dark:text-blue-300`}
              >
                stack.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600 dark:text-zinc-400">
              The technologies, frameworks and tools I use
              to design, develop and build modern software
              applications. A collection of tools I work
              with and technologies I&apos;m continuously exploring.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#technologies"
                className="inline-flex items-center gap-2 bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                Explore my stack
                <ArrowUpRight size={17} />
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 transition-all hover:border-gray-900 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-400"
              >
                View my projects
                <ArrowUpRight size={17} />
              </Link>
            </div>
            {/* STATS */}
            <div className="mt-16 grid max-w-2xl grid-cols-2 gap-6 border-t border-gray-200 pt-8 dark:border-zinc-800 sm:grid-cols-4">
              {[
                {
                  value: technologies.length,
                  label: "Technologies",
                },
                {
                  value: categories.length - 1,
                  label: "Categories",
                },
                {
                  value: advancedCount,
                  label: "Advanced",
                },
                {
                  value: learningCount,
                  label: "Currently learning",
                },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-semibold tabular-nums">
                    {stat.value}+
                  </p>
                  <p className="mt-2 text-xs text-gray-500 dark:text-zinc-400 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* TECHNOLOGY OVERVIEW */}
        <section className="border-b border-gray-200 px-6 py-16 dark:border-zinc-800 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
                Technology Overview
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                What I work with.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-gray-600 dark:text-zinc-400">
                An overview of the different areas of software
                development covered by my technology stack.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                {
                  name: "Frontend",
                  count: categoryCount("Frontend"),
                  icon: Palette,
                  description: "Interfaces & experiences",
                },
                {
                  name: "Backend",
                  count: categoryCount("Backend"),
                  icon: Server,
                  description: "APIs & server systems",
                },
                {
                  name: "Database",
                  count: categoryCount("Database"),
                  icon: Database,
                  description: "Data & storage",
                },
                {
                  name: "Developer Tools",
                  count: categoryCount("Tools"),
                  icon: Wrench,
                  description: "Development workflow",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setActiveCategory(item.name === "Developer Tools" ? "Tools" : item.name);
                      document
                        .getElementById("technologies")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group border border-gray-200 bg-white p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[5px_5px_0px_#193cb8] dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:shadow-[5px_5px_0px_#2563eb]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
                        <Icon size={20} />
                      </div>
                      <ArrowUpRight
                        size={17}
                        className="text-gray-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-800"
                      />
                    </div>
                    <p className="mt-6 text-2xl font-semibold">
                      {item.count}
                    </p>
                    <h3 className="mt-1 font-medium">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-xs text-gray-500 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
        {/* ALL TECHNOLOGIES */}
        <section
          id="technologies"
          className="px-6 py-20 sm:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-10">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
                My Toolkit
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Explore my technologies.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-gray-600 dark:text-zinc-400">
                Explore the technologies I use across different
                areas of software development. Search, filter
                and discover my development toolkit.
              </p>
            </div>
            {/* SEARCH */}
            <div className="relative mb-6">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search technologies, frameworks or skills..."
                aria-label="Search technologies"
                className="h-16 w-full border border-gray-200 bg-white pl-14 pr-14 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100 dark:focus:border-blue-500"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <X size={19} />
                </button>
              )}
            </div>
            {/* CATEGORY FILTER */}
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`border px-4 py-2.5 text-xs font-medium transition-all sm:text-sm ${
                      activeCategory === category
                        ? "border-blue-800 bg-blue-800 text-white dark:border-blue-600 dark:bg-blue-600"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-zinc-600"
                    }`}
                  >
                    {category}
                    <span className="ml-2 opacity-70">
                      {categoryCount(category)}
                    </span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowFeatured(!showFeatured)}
                aria-pressed={showFeatured}
                className={`inline-flex items-center gap-2 border px-4 py-2.5 text-sm transition-all ${
                  showFeatured
                    ? "border-blue-600 bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
                    : "border-gray-200 text-gray-600 dark:border-zinc-800 dark:text-zinc-400"
                }`}
              >
                <Star size={15} />
                Featured
              </button>
            </div>
            {/* RESULTS AND SORT */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-gray-100 py-4 dark:border-zinc-800">
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {filteredTechnologies.length}
                </span>{" "}
                of {technologies.length} technologies
              </p>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="stack-sort"
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400"
                >
                  <Filter size={15} />
                  Sort by
                </label>
                <select
                  id="stack-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                >
                  <option value="featured">Featured</option>
                  <option value="name">Name A-Z</option>
                  <option value="category">Category</option>
                  <option value="level">Experience level</option>
                </select>
              </div>
            </div>
            {/* TECHNOLOGY CARDS */}
            {filteredTechnologies.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTechnologies.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <article
                      key={tech.name}
                      className="group flex flex-col border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[5px_5px_0px_#193cb8] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700 dark:hover:shadow-[5px_5px_0px_#2563eb]"
                    >
                      <div className="flex items-start justify-between">
                        <div
                          className="flex h-12 w-12 items-center justify-center border border-gray-200 bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800"
                          style={{ color: tech.color }}
                        >
                          <Icon size={23} />
                        </div>
                        {tech.featured && (
                          <span className="inline-flex items-center gap-1.5 border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
                            <Star size={11} />
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="mt-7 flex items-center justify-between gap-3">
                        <h3 className="text-xl font-semibold tracking-tight">
                          {tech.name}
                        </h3>
                        <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                          {tech.category}
                        </span>
                      </div>
                      <p className="mt-3 min-h-[84px] text-sm leading-6 text-gray-500 dark:text-zinc-400">
                        {tech.description}
                      </p>
                      {/* EXPERIENCE */}
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs text-gray-500 dark:text-zinc-400">
                          {tech.experience}
                        </span>
                        <span
                          className={`border px-2.5 py-1 text-[10px] font-semibold ${levelStyles[tech.level]}`}
                        >
                          {tech.level}
                        </span>
                      </div>
                      {/* TAGS */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {tech.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-gray-100 bg-gray-50 px-2.5 py-1 text-[11px] text-gray-500 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5 dark:border-zinc-800">
                        <span className="text-xs text-gray-400 dark:text-zinc-500">
                          {tech.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-800 dark:text-blue-300">
                          <CheckCircle2 size={14} />
                          In my toolkit
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="border border-dashed border-gray-300 px-6 py-20 text-center dark:border-zinc-700">
                <div className="mx-auto flex h-16 w-16 items-center justify-center border border-gray-200 bg-gray-50 text-gray-400 dark:border-zinc-800 dark:bg-zinc-900">
                  <Search size={26} />
                </div>
                <h3 className="mt-6 text-xl font-semibold">
                  No technologies found.
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-zinc-400">
                  We couldn&apos;t find any matching technologies.
                  Try another keyword or reset your filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-7 bg-blue-800 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
        {/* CURRENTLY LEARNING */}
        <section className="border-y border-gray-200 bg-gray-50 px-6 py-20 dark:border-zinc-800 dark:bg-zinc-900/40 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
                Continuous Learning
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Currently exploring.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-gray-600 dark:text-zinc-400">
                Technology never stands still. These are some
                of the areas I&apos;m currently exploring to improve
                my software engineering skills.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {learningTechnologies.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className="flex gap-5 border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[5px_5px_0px_#193cb8] dark:border-zinc-800 dark:bg-zinc-950/70 dark:hover:shadow-[5px_5px_0px_#2563eb]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
                      <Icon size={22} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">
                          {tech.name}
                        </h3>
                        <span className="border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-400">
                          Exploring
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-zinc-400">
                        {tech.description}
                      </p>
                      <p className="mt-4 font-mono text-xs text-blue-800 dark:text-blue-300">
                        {String(index + 1).padStart(2, "0")} / {tech.category}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* DEVELOPMENT WORKFLOW */}
        <section className="px-6 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
                Development Workflow
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Beyond programming languages.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-gray-600 dark:text-zinc-400">
                A development workflow involves much more than
                writing code. These are the areas that support
                my everyday software development process.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: Terminal,
                  title: "Development",
                  items: [
                    "VS Code",
                    "Windows & Linux",
                    "npm & pnpm",
                    "Webpack & Vite",
                  ],
                },
                {
                  icon: GitBranch,
                  title: "Collaboration",
                  items: [
                    "Git & GitHub",
                    "Pull Requests",
                    "Issue Tracking",
                    "Code Reviews",
                  ],
                },
                {
                  icon: Cloud,
                  title: "Deployment",
                  items: [
                    "Vercel",
                    "Environment Variables",
                    "Build Optimization",
                    "CI/CD Fundamentals",
                  ],
                },
              ].map((group) => {
                const Icon = group.icon;
                return (
                  <div
                    key={group.title}
                    className="border border-gray-200 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-[5px_5px_0px_#193cb8] dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:shadow-[5px_5px_0px_#2563eb]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-7 text-xl font-semibold">
                      {group.title}
                    </h3>
                    <div className="mt-6 space-y-4">
                      {group.items.map((item, index) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0 dark:border-zinc-800"
                        >
                          <span className="font-mono text-xs text-blue-800 dark:text-blue-300">
                            0{index + 1}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-zinc-300">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* CTA */}
        <section className="border-y border-gray-200 bg-gray-50 px-6 py-20 dark:border-zinc-800 dark:bg-zinc-900/40 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
                What&apos;s Next?
              </p>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Always learning. Always building.
              </h2>
              <p className="mt-6 max-w-xl leading-7 text-gray-600 dark:text-zinc-400">
                I&apos;m continuously exploring new technologies
                and improving my development skills. Have an
                interesting project or technology to discuss?
                Let&apos;s connect.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  Explore my projects
                  <ArrowUpRight size={17} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 transition-all hover:border-gray-900 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-400"
                >
                  Get in touch
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
            <div className="border border-gray-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950/70">
              <div className="flex h-12 w-12 items-center justify-center bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
                <GraduationCap size={24} />
              </div>
              <h3 className="mt-7 text-xl font-semibold">
                Growth is a continuous process.
              </h3>
              <p className="mt-4 text-sm leading-7 text-gray-500 dark:text-zinc-400">
                Every new technology is an opportunity to
                understand something deeper, solve a different
                problem and build better software.
              </p>
              <div className="mt-7 border-t border-gray-100 pt-6 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <BookOpen
                    size={18}
                    className="text-blue-800 dark:text-blue-300"
                  />
                  <span className="text-sm font-medium">
                    Learn. Build. Improve. Repeat.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* FOOTER */}
        <Footer />
      </main>
    </PageTransition>
  );
}
