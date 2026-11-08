
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  X,
  ArrowUpRight,
  Copy,
  Check,
  Code2,
  Braces,
  Palette,
  FileCode2,
  Database,
  LockKeyhole,
  Wrench,
  Sparkles,
  Terminal,
  Globe,
  Regex,
  Hash,
  Clock,
  Star,
  Filter,
  ChevronDown,
  Command,
  Zap,
  RotateCcw,
} from "lucide-react";

import { Pacifico } from "next/font/google";
import Footer from "@/components/Footer";
import PageTransition from "@/components/page-transition";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

const categories = [
  "All Tools",
  "JSON",
  "JavaScript",
  "CSS",
  "HTML",
  "Encoding",
  "Generators",
  "Utilities",
];

const tools = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description:
      "Format and beautify JSON data with proper indentation and readable structure.",
    category: "JSON",
    icon: Braces,
    tags: ["JSON", "Formatter", "Developer"],
    featured: true,
    updated: "Recently updated",
    example: '{"name":"Ajoy Das","role":"Developer"}',
  },
  {
    id: "json-validator",
    name: "JSON Validator",
    description:
      "Validate JSON syntax and quickly identify formatting errors.",
    category: "JSON",
    icon: Check,
    tags: ["JSON", "Validation", "Debugging"],
    featured: true,
    updated: "Recently updated",
    example: '{"valid":true,"message":"JSON is valid"}',
  },
  {
    id: "json-to-typescript",
    name: "JSON to TypeScript",
    description:
      "Convert JSON objects into TypeScript interfaces and types.",
    category: "JSON",
    icon: FileCode2,
    tags: ["JSON", "TypeScript", "Conversion"],
    featured: false,
    updated: "Recently updated",
    example: "interface User { name: string; age: number; }",
  },
  {
    id: "js-minifier",
    name: "JavaScript Minifier",
    description:
      "Minify JavaScript code by removing unnecessary spaces and comments.",
    category: "JavaScript",
    icon: Code2,
    tags: ["JavaScript", "Minifier", "Optimization"],
    featured: true,
    updated: "Recently updated",
    example: "const add=(a,b)=>a+b;",
  },
  {
    id: "js-playground",
    name: "JavaScript Playground",
    description:
      "Experiment with JavaScript snippets and test small pieces of code.",
    category: "JavaScript",
    icon: Terminal,
    tags: ["JavaScript", "Playground", "Testing"],
    featured: true,
    updated: "Recently updated",
    example: "console.log('Hello, Developer!');",
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description:
      "Test regular expressions against sample strings and understand matching patterns.",
    category: "JavaScript",
    icon: Regex,
    tags: ["Regex", "JavaScript", "Testing"],
    featured: false,
    updated: "Recently updated",
    example: "/^[a-zA-Z0-9]+$/",
  },
  {
    id: "css-gradient",
    name: "CSS Gradient Generator",
    description:
      "Create beautiful CSS linear and radial gradients for your projects.",
    category: "CSS",
    icon: Palette,
    tags: ["CSS", "Design", "Generator"],
    featured: true,
    updated: "Recently updated",
    example: "background: linear-gradient(135deg, #2563eb, #9333ea);",
  },
  {
    id: "box-shadow",
    name: "Box Shadow Generator",
    description:
      "Generate customizable CSS box shadows with ready-to-use code.",
    category: "CSS",
    icon: Sparkles,
    tags: ["CSS", "UI", "Generator"],
    featured: false,
    updated: "Recently updated",
    example: "box-shadow: 0 10px 30px rgba(0,0,0,.12);",
  },
  {
    id: "css-flexbox",
    name: "Flexbox Playground",
    description:
      "Experiment with CSS Flexbox properties and understand layout behavior.",
    category: "CSS",
    icon: Globe,
    tags: ["CSS", "Flexbox", "Layout"],
    featured: false,
    updated: "Recently updated",
    example: "display: flex; justify-content: center; align-items: center;",
  },
  {
    id: "html-formatter",
    name: "HTML Formatter",
    description:
      "Format HTML markup into clean, properly indented and readable code.",
    category: "HTML",
    icon: FileCode2,
    tags: ["HTML", "Formatter", "Markup"],
    featured: false,
    updated: "Recently updated",
    example: "<main><h1>Hello World</h1></main>",
  },
  {
    id: "base64",
    name: "Base64 Encoder / Decoder",
    description:
      "Encode and decode text using Base64 without external dependencies.",
    category: "Encoding",
    icon: LockKeyhole,
    tags: ["Base64", "Encoding", "Decoding"],
    featured: true,
    updated: "Recently updated",
    example: "SGVsbG8gV29ybGQ=",
  },
  {
    id: "url-encoder",
    name: "URL Encoder",
    description:
      "Encode and decode URL components for safe URL handling.",
    category: "Encoding",
    icon: Globe,
    tags: ["URL", "Encoding", "Web"],
    featured: false,
    updated: "Recently updated",
    example: "Hello%20World",
  },
  {
    id: "uuid",
    name: "UUID Generator",
    description:
      "Generate unique identifiers for applications, databases and APIs.",
    category: "Generators",
    icon: Hash,
    tags: ["UUID", "Generator", "Database"],
    featured: true,
    updated: "Recently updated",
    example: "550e8400-e29b-41d4-a716-446655440000",
  },
  {
    id: "password",
    name: "Password Generator",
    description:
      "Generate random passwords with configurable length and character sets.",
    category: "Generators",
    icon: LockKeyhole,
    tags: ["Password", "Security", "Generator"],
    featured: false,
    updated: "Recently updated",
    example: "StrongPassword@2026",
  },
  {
    id: "timestamp",
    name: "Timestamp Converter",
    description:
      "Convert Unix timestamps into human-readable date and time formats.",
    category: "Utilities",
    icon: Clock,
    tags: ["Timestamp", "Date", "Time"],
    featured: false,
    updated: "Recently updated",
    example: "1794076800",
  },
  {
    id: "color-converter",
    name: "Color Converter",
    description:
      "Convert colors between HEX, RGB and HSL formats.",
    category: "Utilities",
    icon: Palette,
    tags: ["Color", "HEX", "RGB", "HSL"],
    featured: true,
    updated: "Recently updated",
    example: "#2563eb",
  },
];

export default function ToolsClient() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Tools");
  const [sortBy, setSortBy] = useState("featured");
  const [showFeatured, setShowFeatured] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    let result = [...tools];

    if (activeCategory !== "All Tools") {
      result = result.filter(
        (tool) => tool.category === activeCategory
      );
    }

    if (showFeatured) {
      result = result.filter((tool) => tool.featured);
    }

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter((tool) =>
        [
          tool.name,
          tool.description,
          tool.category,
          ...tool.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "category") {
      result.sort((a, b) =>
        a.category.localeCompare(b.category)
      );
    }

    if (sortBy === "featured") {
      result.sort(
        (a, b) => Number(b.featured) - Number(a.featured)
      );
    }

    return result;
  }, [search, activeCategory, sortBy, showFeatured]);

  const copyExample = async (id: string, example: string) => {
    try {
      await navigator.clipboard.writeText(example);
      setCopiedId(id);

      window.setTimeout(() => {
        setCopiedId((current) =>
          current === id ? null : current
        );
      }, 2000);
    } catch {
      console.error("Unable to copy text.");
    }
  };

  const resetFilters = () => {
    setSearch("");
    setActiveCategory("All Tools");
    setShowFeatured(false);
    setSortBy("featured");
  };

  const getCategoryCount = (category: string) => {
    if (category === "All Tools") return tools.length;

    return tools.filter(
      (tool) => tool.category === category
    ).length;
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">

        {/* HERO SECTION */}

        <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-blue-50 via-white to-white px-6 pb-20 pt-32 transition-colors duration-300 dark:border-zinc-800 dark:from-blue-950 dark:via-zinc-950 dark:to-zinc-950 sm:px-10 lg:px-16">

          <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-900/20" />

          <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-sky-100/50 blur-3xl dark:bg-sky-900/10" />

          <div className="relative mx-auto max-w-6xl">

            <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
              Developer Resources
            </p>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Tools for
              <br />

              <span
                className={`${pacifico.className} font-normal text-blue-800 dark:text-blue-300`}
              >
                Developers.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600 dark:text-zinc-400">
              A collection of useful developer utilities designed
              to simplify everyday development tasks, improve
              productivity and make building software easier.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <a
                href="#explore-tools"
                className="inline-flex items-center gap-2 bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                Explore Tools
                <ArrowUpRight size={17} />
              </a>

              <a
                href="https://github.com/Codewithajoydas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 transition-all hover:border-gray-900 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-400"
              >
                View GitHub
                <ArrowUpRight size={17} />
              </a>

            </div>

            {/* HERO STATS */}

            <div className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-gray-200 pt-8 dark:border-zinc-800">

              <div>
                <p className="text-3xl font-semibold">
                  {tools.length}+
                </p>
                <p className="mt-2 text-xs text-gray-500 dark:text-zinc-400 sm:text-sm">
                  Developer tools
                </p>
              </div>

              <div>
                <p className="text-3xl font-semibold">
                  {categories.length - 1}
                </p>
                <p className="mt-2 text-xs text-gray-500 dark:text-zinc-400 sm:text-sm">
                  Categories
                </p>
              </div>

              <div>
                <p className="text-3xl font-semibold">
                  100%
                </p>
                <p className="mt-2 text-xs text-gray-500 dark:text-zinc-400 sm:text-sm">
                  Free to explore
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* TOOLS SECTION */}

        <section
          id="explore-tools"
          className="px-6 py-20 sm:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-6xl">

            {/* SECTION HEADING */}

            <div className="mb-10">

              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
                My Collection
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Explore developer tools.
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-gray-600 dark:text-zinc-400">
                Find the right utility for your development
                workflow. Search, filter and explore tools
                by category.
              </p>

            </div>

            {/* SEARCH BAR */}

            <div className="relative mb-6">

              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tools, categories or keywords..."
                aria-label="Search developer tools"
                className="h-16 w-full border border-gray-200 bg-white pl-14 pr-14 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100 dark:focus:border-blue-500"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
                >
                  <X size={19} />
                </button>
              )}

            </div>

            {/* FILTERS AND SORT */}

            <div className="mb-8 flex flex-col gap-5">

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div className="flex flex-wrap items-center gap-2">

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
                        {getCategoryCount(category)}
                      </span>
                    </button>
                  ))}

                </div>

                <button
                  type="button"
                  onClick={() => setShowFeatured(!showFeatured)}
                  aria-pressed={showFeatured}
                  className={`inline-flex shrink-0 items-center gap-2 border px-4 py-2.5 text-sm transition-all ${
                    showFeatured
                      ? "border-blue-600 bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
                      : "border-gray-200 text-gray-600 dark:border-zinc-800 dark:text-zinc-400"
                  }`}
                >
                  <Star size={15} />
                  Featured
                </button>

              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-y border-gray-100 py-4 dark:border-zinc-800">

                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  Showing{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {filteredTools.length}
                  </span>{" "}
                  of {tools.length} tools
                </p>

                <div className="flex items-center gap-3">

                  <label
                    htmlFor="sort-tools"
                    className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400"
                  >
                    <Filter size={15} />
                    Sort by
                  </label>

                  <div className="relative">
                    <select
                      id="sort-tools"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none border border-gray-200 bg-white py-2 pl-3 pr-9 text-sm outline-none focus:border-blue-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                    >
                      <option value="featured">Featured</option>
                      <option value="name">Name</option>
                      <option value="category">Category</option>
                    </select>

                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>

                </div>

              </div>

            </div>

            {/* TOOL CARDS */}

            {filteredTools.length > 0 ? (

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {filteredTools.map((tool) => {
                  const Icon = tool.icon;
                  const isCopied = copiedId === tool.id;

                  return (
                    <article
                      key={tool.id}
                      className="group flex flex-col border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[5px_5px_0px_#193cb8] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700 dark:hover:shadow-[5px_5px_0px_#2563eb]"
                    >

                      <div className="flex items-start justify-between">

                        <div className="flex h-12 w-12 items-center justify-center border border-gray-200 bg-gray-50 text-blue-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-blue-300">
                          <Icon size={21} />
                        </div>

                        {tool.featured && (
                          <span className="inline-flex items-center gap-1.5 border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
                            <Star size={11} />
                            Featured
                          </span>
                        )}

                      </div>

                      <div className="mt-7">

                        <div className="flex items-center justify-between gap-3">

                          <h3 className="text-lg font-semibold tracking-tight">
                            {tool.name}
                          </h3>

                          <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                            {tool.category}
                          </span>

                        </div>

                        <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-500 dark:text-zinc-400">
                          {tool.description}
                        </p>

                      </div>

                      {/* TAGS */}

                      <div className="mt-5 flex flex-wrap gap-2">

                        {tool.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-gray-100 bg-gray-50 px-2.5 py-1 text-[11px] text-gray-500 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}

                      </div>

                      {/* EXAMPLE CODE */}

                      <div className="mt-6 flex min-w-0 items-center justify-between gap-3 border border-gray-100 bg-gray-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">

                        <code className="min-w-0 truncate font-mono text-xs text-gray-600 dark:text-zinc-400">
                          {tool.example}
                        </code>

                        <button
                          type="button"
                          onClick={() =>
                            copyExample(tool.id, tool.example)
                          }
                          aria-label={`Copy ${tool.name} example`}
                          title="Copy example"
                          className="shrink-0 text-gray-400 transition-colors hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          {isCopied ? (
                            <Check size={16} className="text-green-500" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>

                      </div>

                      {/* CARD FOOTER */}

                      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5 dark:border-zinc-800">

                        <span className="text-xs text-gray-400 dark:text-zinc-500">
                          {tool.updated}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            copyExample(tool.id, tool.example)
                          }
                          className="inline-flex items-center gap-2 text-sm font-medium text-blue-800 transition-all hover:gap-3 dark:text-blue-300"
                        >
                          {isCopied ? "Copied!" : "Copy example"}
                          {isCopied ? (
                            <Check size={15} />
                          ) : (
                            <ArrowUpRight size={15} />
                          )}
                        </button>

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
                  No tools found.
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-zinc-400">
                  We couldn&apos;t find any tools matching your
                  search. Try another keyword or reset your filters.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-7 inline-flex items-center gap-2 bg-blue-800 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  <RotateCcw size={15} />
                  Reset Filters
                </button>

              </div>

            )}

          </div>
        </section>

        {/* CTA SECTION */}

        <section className="border-y border-gray-200 bg-gray-50 px-6 py-20 dark:border-zinc-800 dark:bg-zinc-900/40 sm:px-10 lg:px-16">

          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">

            <div>

              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
                Have an idea?
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Something missing from your developer toolkit?
              </h2>

              <p className="mt-6 max-w-xl leading-7 text-gray-600 dark:text-zinc-400">
                I&apos;m always interested in building useful
                utilities that solve real development problems.
                Have a suggestion for a tool? Let&apos;s build it.
              </p>

              <a
                href="mailto:ajoydas@codewithajoydas.in"
                className="mt-8 inline-flex items-center gap-2 bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                Suggest a Tool
                <ArrowUpRight size={17} />
              </a>

            </div>

            <div className="border border-gray-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950/70">

              <div className="flex items-center gap-4 border-b border-gray-100 pb-6 dark:border-zinc-800">

                <div className="flex h-12 w-12 items-center justify-center bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
                  <Zap size={22} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Built for developers
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
                    Simple, practical and useful.
                  </p>
                </div>

              </div>

              <div className="mt-6 space-y-5">

                {[
                  "Simple and intuitive interfaces",
                  "Useful everyday development utilities",
                  "Responsive across all devices",
                  "Continuously expanding collection",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >
                    <span className="font-mono text-xs text-blue-800 dark:text-blue-300">
                      0{index + 1}
                    </span>

                    <p className="text-sm text-gray-600 dark:text-zinc-300">
                      {item}
                    </p>
                  </div>
                ))}

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
