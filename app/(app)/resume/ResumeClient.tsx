"use client";
import React from "react";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Code2,
  ExternalLink,
  FileText,
  GraduationCap,
  Globe,
  Layers3,
  Mail,
  MapPin,
  Phone,
  Terminal,
  Wrench,
  Database,
  Workflow,
  Cpu,
  Building2,
  GitBranch,
  Lightbulb,
} from "lucide-react";

import Footer from "@/components/Footer";
import PageTransition from "@/components/page-transition";

/* =========================================================
   PERSONAL & PROFESSIONAL INFORMATION
========================================================= */

const personalInfo = {
  name: "Ajoy Das",
  designation: "Software Developer",
  secondaryDesignation: "MIS Executive",
  location: "Nagaon, Assam, India",
  email: "ajoydas0572@gmail.com",
  phone: "6900611920",
  website: "https://codewithajoydas.live",
  github: "https://github.com/Codewithajoydas",

  summary:
    "Software Developer and MIS Executive with practical experience in both software development and business operations. Builds web applications, mobile applications, backend services, REST APIs, and developer tools using modern JavaScript technologies. Professional experience in operational reporting, data management, process coordination, and information systems provides an understanding of how technology can address real business problems. Interested in engineering maintainable applications, designing structured systems, and transforming repetitive workflows into practical software solutions.",

  professionalHeadline:
    "Engineering practical software solutions for real-world problems.",

  careerObjective:
    "To contribute to software engineering teams where application development, backend engineering, problem-solving, and system design are valued. Interested in building reliable applications, improving existing systems, and developing software that creates practical value.",
};

/* =========================================================
   PROFESSIONAL EXPERIENCE
========================================================= */

const experience = [
  {
    number: "01",
    role: "MIS Executive",
    company: "Genus Power Infrastructures",
    duration: "July 2023 – Present",
    location: "India",
    employmentType: "Professional Experience",

    overview:
      "Working with management information systems, operational reporting, project records, and cross-functional coordination. The role involves maintaining reliable operational information, monitoring case progress, and supporting teams through structured reporting and data management.",

    responsibilities: [
      {
        title: "MIS Reporting & Data Management",
        description:
          "Prepare, organize, and maintain MIS reports and operational records to support project monitoring and management visibility.",
      },
      {
        title: "Operational Monitoring",
        description:
          "Monitor pending cases, on-hold records, and operational progress to help identify outstanding activities requiring attention.",
      },
      {
        title: "Data Verification",
        description:
          "Maintain Excel-based records, verify operational information, and organize project data with attention to accuracy and consistency.",
      },
      {
        title: "Cross-functional Coordination",
        description:
          "Coordinate with supervisors, subdivision validators, and other teams regarding pending validation activities and case resolution.",
      },
      {
        title: "Process Management",
        description:
          "Maintain structured reporting workflows and support the flow of operational information between relevant teams.",
      },
      {
        title: "Process Improvement",
        description:
          "Identify repetitive reporting and data-management activities where better organization or automation could improve efficiency.",
      },
    ],

    capabilities: [
      "MIS Reporting",
      "Advanced Excel Workflows",
      "Data Verification",
      "Operational Tracking",
      "Team Coordination",
      "Process Management",
    ],
  },
];

/* =========================================================
   ENGINEERING CAPABILITIES
========================================================= */

const skillGroups = [
  {
    number: "01",
    title: "Programming & Core Technologies",
    subtitle: "Building blocks of software development",
    icon: Code2,
    description:
      "Working with programming languages and browser technologies to develop application logic, interfaces, and structured solutions.",
    skills: [
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "SQL",
    ],
  },
  {
    number: "02",
    title: "Frontend Engineering",
    subtitle: "Interfaces and application experiences",
    icon: Layers3,
    description:
      "Developing component-based interfaces, reusable application structures, responsive layouts, and interactive web experiences.",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "DOM APIs",
      "Responsive Design",
    ],
  },
  {
    number: "03",
    title: "Backend Engineering",
    subtitle: "Application logic and server-side systems",
    icon: Terminal,
    description:
      "Building server-side application functionality, integrating APIs, handling requests, and organizing backend workflows.",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Authentication",
      "API Integration",
    ],
  },
  {
    number: "04",
    title: "Database & Data Management",
    subtitle: "Structured information and persistence",
    icon: Database,
    description:
      "Working with structured data, database models, application persistence, and data organization.",
    skills: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Mongoose",
      "Structured Data",
    ],
  },
  {
    number: "05",
    title: "Development Infrastructure",
    subtitle: "Tooling and development workflows",
    icon: Wrench,
    description:
      "Working with version control, package management, bundling, and testing tools used in modern JavaScript development.",
    skills: [
      "Git",
      "GitHub",
      "Webpack",
      "esbuild",
      "Jest",
      "npm",
    ],
  },
  {
    number: "06",
    title: "Application & Interactive Development",
    subtitle: "Beyond traditional web interfaces",
    icon: Cpu,
    description:
      "Exploring application development across mobile, desktop, and interactive browser-based environments.",
    skills: [
      "React Native",
      "Electron",
      "Three.js",
      "GSAP",
    ],
  },
];

/* =========================================================
   FEATURED ENGINEERING PROJECTS
========================================================= */

const projects = [
  {
    number: "01",
    name: "Assign Meter",
    category: "Workforce & Operational Automation",
    status: "Developed",
    featured: true,

    overview:
      "A mobile application and management portal developed to improve meter assignment workflows. The solution connects mobile-based meter information collection with backend assignment management and centralized operational monitoring.",

    problem:
      "Manual meter-number entry and assignment-related record management involve repetitive operational activities. These workflows can make information collection and tracking more demanding.",

    solution:
      "Developed a mobile-based workflow with camera-assisted meter-number extraction, backend assignment functionality, and a management portal for monitoring records and pending meters.",

    contributions: [
      "Developed a React Native mobile application for meter assignment workflows.",
      "Implemented camera-based meter box scanning to extract meter numbers.",
      "Developed backend functionality for managing assignment information.",
      "Integrated application workflows with Node.js and Express.js services.",
      "Created a management portal for monitoring pending meter records.",
      "Implemented functionality for viewing and downloading reports.",
    ],

    technologies: [
      "React Native",
      "JavaScript",
      "Node.js",
      "Express.js",
    ],

    links: [
      {
        label: "View on Google Play",
        href: "https://play.google.com/store/apps/details?id=com.ajoy974.assignMeter",
      },
    ],
  },

  {
    number: "02",
    name: "PhotoMart",
    category: "Mobile Application Development",
    status: "Developed",

    overview:
      "A mobile application focused on photo-related services and user interaction, involving application interface development and mobile workflow implementation.",

    problem:
      "The application required a mobile interface that could organize photo-related services and provide an accessible user experience.",

    solution:
      "Worked on mobile application interfaces, frontend functionality, and application workflows using React Native.",

    contributions: [
      "Developed mobile application interfaces.",
      "Worked on frontend implementation and application workflows.",
      "Focused on responsive mobile experiences.",
    ],

    technologies: [
      "React Native",
      "JavaScript",
    ],

    links: [
      {
        label: "View on Google Play",
        href: "https://play.google.com/store/apps/details?id=com.ajoy974.Photo_Mart",
      },
    ],
  },

  {
    number: "03",
    name: "Kodhra",
    category: "Code Management System",
    status: "Developed",

    overview:
      "A software project focused on code organization, structured information handling, and development workflow management.",

    problem:
      "Software development requires organized code structures and well-defined workflows to maintain application consistency.",

    solution:
      "Worked on application development and frontend/backend integration while exploring structured data handling and software organization.",

    contributions: [
      "Worked on frontend and backend integration.",
      "Focused on structured application data.",
      "Explored application architecture and code organization.",
    ],

    technologies: [
      "JavaScript",
      "Frontend Development",
      "Backend Development",
    ],

    links: [],
  },

  {
    number: "04",
    name: "Codewithajoydas",
    category: "Personal Developer Platform",
    status: "Ongoing",

    overview:
      "A personal developer platform designed to bring software projects, technical knowledge, articles, and development work together through a structured web application.",

    problem:
      "A developer platform needs more than a static profile. It requires organized content, reusable interfaces, dynamic pages, and maintainable application architecture.",

    solution:
      "Building a multi-page platform using Next.js and React with structured content, reusable components, database integration, and dedicated sections for development work.",

    contributions: [
      "Developing a multi-page Next.js application.",
      "Building reusable React components and page structures.",
      "Implementing dynamic content and project presentation.",
      "Working on backend functionality and database integration.",
      "Developing structured article, service, and project sections.",
      "Focusing on SEO, responsive design, and maintainability.",
    ],

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
    ],

    links: [
      {
        label: "Visit Live Website",
        href: "https://codewithajoydas.live",
      },
      {
        label: "GitHub Repository",
        href: "https://github.com/Codewithajoydas/Portfolio-of-Ajoy-Das",
      },
    ],
  },

  {
    number: "05",
    name: "CWAD Lab Scaffolder",
    category: "Developer Tooling & Automation",
    status: "In Progress",

    overview:
      "A CLI-based project generator focused on simplifying the initial setup of software projects through reusable project structures and automated scaffolding.",

    problem:
      "Starting projects repeatedly involves creating similar folders, files, configurations, and initial structures.",

    solution:
      "Exploring a command-line tool that can automate project initialization and provide reusable development structures.",

    contributions: [
      "Exploring automated project scaffolding.",
      "Designing reusable project structures and templates.",
      "Working on command-line development workflows.",
      "Focusing on developer productivity and setup automation.",
    ],

    technologies: [
      "JavaScript",
      "Node.js",
      "CLI Development",
    ],

    links: [],
  },
];

/* =========================================================
   EDUCATION
========================================================= */

const education = [
  {
    number: "01",
    qualification: "Diploma in Computer Applications",
    abbreviation: "DCA",
    year: "2024",
  },
  {
    number: "02",
    qualification: "Higher Secondary",
    abbreviation: "HS",
    year: "2023",
  },
  {
    number: "03",
    qualification: "High School Leaving Certificate",
    abbreviation: "HSLC",
    year: "2020",
  },
];

/* =========================================================
   ADDITIONAL INFORMATION
========================================================= */

const languages = [
  "English",
  "Hindi",
  "Assamese",
];

const professionalInterests = [
  "Full-Stack Engineering",
  "Backend Development",
  "System Architecture",
  "Application Development",
  "Developer Tooling",
  "Workflow Automation",
  "Database Management",
];

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function SectionHeading({
  number,
  eyebrow,
  title,
  highlight,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="mb-5 flex items-center gap-3">
        <span className="font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">
          {number}
        </span>

        <span className="h-px w-8 bg-blue-700 dark:bg-blue-400" />

        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500">
          {eyebrow}
        </span>
      </div>

      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}{" "}
        {highlight && (
          <span className="font-serif font-normal italic text-blue-700 dark:text-blue-400">
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p className="mt-5 max-w-2xl text-sm leading-8 text-gray-600 dark:text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon
        size={16}
        className="mt-1 shrink-0 text-blue-700 dark:text-blue-400"
      />

      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-gray-400">
          {label}
        </p>

        {href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="mt-1 block break-all text-xs font-medium transition hover:text-blue-700 dark:hover:text-blue-400"
          >
            {value}
          </a>
        ) : (
          <p className="mt-1 text-xs font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN RESUME PAGE
========================================================= */

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">

        {/* =================================================
            01. PROFESSIONAL HEADER
        ================================================= */}

        <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-blue-50 via-white to-white px-6 pb-20 pt-32 dark:border-zinc-800 dark:from-blue-950/30 dark:via-zinc-950 dark:to-zinc-950 sm:px-10 lg:px-16">

          <div className="pointer-events-none absolute -right-40 -top-40 h-[35rem] w-[35rem] rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-900/20" />

          <div className="pointer-events-none absolute -bottom-40 -left-40 h-[25rem] w-[25rem] rounded-full bg-sky-100/40 blur-3xl dark:bg-sky-900/10" />

          <div className="relative mx-auto max-w-7xl">

            <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border border-blue-800 font-serif text-xl text-blue-800 dark:border-blue-400 dark:text-blue-400">
                  A.
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em]">
                    Professional Resume
                  </p>

                  <p className="mt-1 text-[10px] text-gray-500 dark:text-zinc-500">
                    Software Development & Operations
                  </p>
                </div>
              </div>

              <span className="font-mono text-[10px] tracking-widest text-gray-400">
                CURRICULUM VITAE / 2026
              </span>
            </div>

            <div className="grid gap-14 lg:grid-cols-[1fr_340px] lg:items-end">

              <div>

                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-blue-800 dark:text-blue-400">
                  Software Developer / MIS Executive
                </p>

                <h1 className="text-6xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                  Ajoy
                  <br />
                  <span className="font-serif font-normal italic text-blue-800 dark:text-blue-400">
                    Das.
                  </span>
                </h1>

                <h2 className="mt-10 max-w-3xl text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                  {personalInfo.professionalHeadline}
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-gray-600 dark:text-zinc-400">
                  {personalInfo.summary}
                </p>

                <div className="mt-9 flex flex-wrap gap-3">

                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-3 bg-blue-800 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    <ArrowDownToLine size={17} />
                    Download Resume
                  </button>

                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 border border-gray-300 px-6 py-3.5 text-sm font-semibold transition hover:border-blue-700 hover:text-blue-800 dark:border-zinc-700 dark:hover:text-blue-400"
                  >
                    GitHub
                    <ArrowUpRight size={16} />
                  </a>

                </div>

              </div>

              {/* CONTACT INFORMATION */}

              <aside className="border border-gray-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950">

                <div className="mb-7 flex items-center gap-3 border-b border-gray-200 pb-5 dark:border-zinc-800">
                  <div className="flex h-11 w-11 items-center justify-center bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400">
                    <FileText size={21} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Contact Directory
                    </p>

                    <h3 className="mt-1 font-semibold">
                      Professional Details
                    </h3>
                  </div>
                </div>

                <div className="space-y-6">

                  <ContactItem
                    icon={MapPin}
                    label="Location"
                    value={personalInfo.location}
                  />

                  <ContactItem
                    icon={Mail}
                    label="Email"
                    value={personalInfo.email}
                    href={`mailto:${personalInfo.email}`}
                  />

                  <ContactItem
                    icon={Phone}
                    label="Phone"
                    value={personalInfo.phone}
                    href={`tel:${personalInfo.phone}`}
                  />

                  <ContactItem
                    icon={Globe}
                    label="Website"
                    value="codewithajoydas.live"
                    href={personalInfo.website}
                  />

                  <ContactItem
                    icon={Code2}
                    label="GitHub"
                    value="Codewithajoydas"
                    href={personalInfo.github}
                  />

                </div>
              </aside>

            </div>

            {/* CAREER SNAPSHOT */}

            <div className="mt-16 grid grid-cols-2 gap-px border border-gray-200 bg-gray-200 dark:border-zinc-800 dark:bg-zinc-800 sm:grid-cols-4">

              {[
                ["2023", "Professional Career Started"],
                ["01", "Current Professional Role"],
                ["05", "Featured Projects"],
                ["06", "Technical Skill Groups"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="bg-white p-6 dark:bg-zinc-950"
                >
                  <p className="text-3xl font-semibold tracking-tight">
                    {value}
                  </p>

                  <p className="mt-2 text-[10px] font-medium uppercase leading-5 tracking-wider text-gray-500 dark:text-zinc-500">
                    {label}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* =================================================
            02. PROFESSIONAL PROFILE
        ================================================= */}

        <section className="px-6 py-24 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.7fr_1.3fr]">

            <div>
              <SectionHeading
                number="01"
                eyebrow="Professional Profile"
                title="Engineering"
                highlight="Perspective"
              />
            </div>

            <div>

              <p className="text-xl font-medium leading-9 tracking-tight sm:text-2xl">
                A combination of software development experience and practical understanding of business operations.
              </p>

              <div className="mt-7 space-y-6 text-sm leading-8 text-gray-600 dark:text-zinc-400">

                <p>
                  My professional experience spans two interconnected areas:
                  managing operational information through MIS workflows
                  and developing software applications that address practical
                  requirements.
                </p>

                <p>
                  In my professional role, I work with operational records,
                  reporting, data verification, and coordination between
                  teams. This provides direct exposure to the challenges
                  involved in maintaining accurate information and managing
                  repetitive processes.
                </p>

                <p>
                  Alongside this work, I independently develop software
                  projects across web, mobile, and backend technologies.
                  My development work includes application interfaces,
                  server-side functionality, API integration, database
                  organization, and developer-oriented tooling.
                </p>

                <p>
                  My primary engineering interest is understanding problems
                  beyond their visible interface: how information flows,
                  how application components communicate, how data is
                  structured, and how repetitive tasks can be converted
                  into maintainable software workflows.
                </p>

              </div>

              <div className="mt-9 border-l-2 border-blue-700 pl-6 dark:border-blue-400">
                <p className="font-serif text-xl italic leading-8 text-gray-800 dark:text-zinc-200">
                  &quot;Understand the problem, design the system, and build a
                  practical solution.&quot;
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* =================================================
            03. PROFESSIONAL EXPERIENCE
        ================================================= */}

        <section className="border-y border-gray-200 bg-gray-50 px-6 py-24 dark:border-zinc-800 dark:bg-zinc-900/50 sm:px-10 lg:px-16">

          <div className="mx-auto max-w-7xl">

            <SectionHeading
              number="02"
              eyebrow="Employment History"
              title="Professional"
              highlight="Experience"
              description="Professional responsibilities, operational exposure, and contributions to information management and reporting workflows."
            />

            <div className="mt-14 grid gap-12 lg:grid-cols-[270px_1fr]">

              {/* EXPERIENCE SIDEBAR */}

              <aside>

                <div className="border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">

                  <Building2
                    size={23}
                    className="text-blue-800 dark:text-blue-400"
                  />

                  <h3 className="mt-5 text-xl font-semibold">
                    {experience[0].company}
                  </h3>

                  <p className="mt-2 text-sm text-blue-800 dark:text-blue-400">
                    {experience[0].role}
                  </p>

                  <div className="mt-7 space-y-4 border-t border-gray-200 pt-6 dark:border-zinc-800">

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                        Duration
                      </p>

                      <p className="mt-2 text-sm font-medium">
                        {experience[0].duration}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                        Location
                      </p>

                      <p className="mt-2 text-sm font-medium">
                        {experience[0].location}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                        Employment
                      </p>

                      <p className="mt-2 text-sm font-medium">
                        {experience[0].employmentType}
                      </p>
                    </div>

                  </div>
                </div>

              </aside>

              {/* EXPERIENCE DETAILS */}

              <div>

                <p className="text-base leading-8 text-gray-600 dark:text-zinc-400">
                  {experience[0].overview}
                </p>

                <h3 className="mt-10 text-xs font-bold uppercase tracking-[0.2em]">
                  Areas of Responsibility
                </h3>

                <div className="mt-6 grid gap-4 md:grid-cols-2">

                  {experience[0].responsibilities.map((item, index) => (
                    <article
                      key={item.title}
                      className="border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
                    >

                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-blue-800 dark:text-blue-400">
                          0{index + 1}
                        </span>

                        <Check
                          size={16}
                          className="text-blue-700 dark:text-blue-400"
                        />
                      </div>

                      <h4 className="mt-5 text-base font-semibold">
                        {item.title}
                      </h4>

                      <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-zinc-400">
                        {item.description}
                      </p>

                    </article>
                  ))}

                </div>

                <div className="mt-9 border-t border-gray-200 pt-7 dark:border-zinc-800">

                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    Relevant Professional Capabilities
                  </h4>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {experience[0].capabilities.map((item) => (
                      <span
                        key={item}
                        className="border border-gray-200 bg-white px-3 py-2 text-xs dark:border-zinc-800 dark:bg-zinc-950"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =================================================
            04. TECHNICAL EXPERTISE
        ================================================= */}

        <section className="px-6 py-24 sm:px-10 lg:px-16">

          <div className="mx-auto max-w-7xl">

            <SectionHeading
              number="03"
              eyebrow="Technical Competencies"
              title="Technical"
              highlight="Expertise"
              description="A categorized overview of programming technologies, frameworks, development tools, and application technologies used across software projects."
            />

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {skillGroups.map((group) => {
                const Icon = group.icon;

                return (
                  <article
                    key={group.number}
                    className="group border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[5px_5px_0px_#193cb8] dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex h-12 w-12 items-center justify-center bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400">
                        <Icon size={21} />
                      </div>

                      <span className="font-mono text-xs text-gray-400">
                        {group.number}
                      </span>

                    </div>

                    <p className="mt-7 text-[9px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-400">
                      {group.subtitle}
                    </p>

                    <h3 className="mt-3 text-xl font-semibold tracking-tight">
                      {group.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-zinc-400">
                      {group.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2">

                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                        >
                          {skill}
                        </span>
                      ))}

                    </div>

                  </article>
                );
              })}

            </div>
          </div>
        </section>

        {/* =================================================
            05. PROJECT EXPERIENCE
        ================================================= */}

        <section className="border-y border-gray-200 bg-gray-50 px-6 py-24 dark:border-zinc-800 dark:bg-zinc-900/50 sm:px-10 lg:px-16">

          <div className="mx-auto max-w-7xl">

            <SectionHeading
              number="04"
              eyebrow="Engineering Portfolio"
              title="Selected"
              highlight="Projects"
              description="Practical software development work across mobile applications, management systems, developer platforms, and development tooling."
            />

            <div className="mt-14 space-y-7">

              {projects.map((project) => (
                <article
                  key={project.number}
                  className={`border transition-all duration-300 ${
                    project.featured
                      ? "border-blue-900 bg-[#111a2c] text-white dark:border-blue-800"
                      : "border-gray-200 bg-white hover:border-blue-300 dark:border-zinc-800 dark:bg-zinc-950"
                  }`}
                >

                  {/* PROJECT HEADER */}

                  <div className="flex flex-col justify-between gap-5 p-7 sm:flex-row sm:items-start sm:p-9">

                    <div className="flex gap-5">

                      <span
                        className={`font-serif text-4xl italic ${
                          project.featured
                            ? "text-blue-300"
                            : "text-blue-800 dark:text-blue-400"
                        }`}
                      >
                        {project.number}
                      </span>

                      <div>

                        <p
                          className={`text-[10px] font-bold uppercase tracking-[0.18em] ${
                            project.featured
                              ? "text-blue-300"
                              : "text-blue-800 dark:text-blue-400"
                          }`}
                        >
                          {project.category}
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                          {project.name}
                        </h3>

                        <p
                          className={`mt-2 text-xs ${
                            project.featured
                              ? "text-white/50"
                              : "text-gray-500 dark:text-zinc-500"
                          }`}
                        >
                          {project.status}
                        </p>

                      </div>
                    </div>

                    <div
                      className={`flex h-11 w-11 items-center justify-center border ${
                        project.featured
                          ? "border-white/20 text-blue-300"
                          : "border-gray-200 text-blue-800 dark:border-zinc-800 dark:text-blue-400"
                      }`}
                    >
                      <Code2 size={20} />
                    </div>

                  </div>

                  {/* PROJECT CONTENT */}

                  <div
                    className={`grid gap-10 border-t p-7 sm:p-9 lg:grid-cols-[1fr_260px] ${
                      project.featured
                        ? "border-white/15"
                        : "border-gray-200 dark:border-zinc-800"
                    }`}
                  >

                    <div>

                      <div>
                        <h4
                          className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                            project.featured
                              ? "text-blue-300"
                              : "text-gray-400"
                          }`}
                        >
                          Project Overview
                        </h4>

                        <p
                          className={`mt-4 text-sm leading-8 ${
                            project.featured
                              ? "text-white/75"
                              : "text-gray-600 dark:text-zinc-400"
                          }`}
                        >
                          {project.overview}
                        </p>
                      </div>

                      <div className="mt-8 grid gap-7 sm:grid-cols-2">

                        <div>
                          <h4
                            className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                              project.featured
                                ? "text-blue-300"
                                : "text-gray-400"
                            }`}
                          >
                            Problem Context
                          </h4>

                          <p
                            className={`mt-3 text-sm leading-7 ${
                              project.featured
                                ? "text-white/65"
                                : "text-gray-600 dark:text-zinc-400"
                            }`}
                          >
                            {project.problem}
                          </p>
                        </div>

                        <div>
                          <h4
                            className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                              project.featured
                                ? "text-blue-300"
                                : "text-gray-400"
                            }`}
                          >
                            Solution
                          </h4>

                          <p
                            className={`mt-3 text-sm leading-7 ${
                              project.featured
                                ? "text-white/65"
                                : "text-gray-600 dark:text-zinc-400"
                            }`}
                          >
                            {project.solution}
                          </p>
                        </div>

                      </div>

                      <div className="mt-8 border-t border-gray-200 pt-7 dark:border-zinc-800"
                        style={
                          project.featured
                            ? { borderColor: "rgba(255,255,255,.15)" }
                            : undefined
                        }
                      >

                        <h4
                          className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                            project.featured
                              ? "text-blue-300"
                              : "text-gray-400"
                          }`}
                        >
                          Development Contributions
                        </h4>

                        <ul className="mt-5 grid gap-3 sm:grid-cols-2">

                          {project.contributions.map((item) => (
                            <li
                              key={item}
                              className={`flex items-start gap-3 text-xs leading-7 ${
                                project.featured
                                  ? "text-white/70"
                                  : "text-gray-600 dark:text-zinc-400"
                              }`}
                            >
                              <Check
                                size={14}
                                className="mt-1 shrink-0 text-blue-500"
                              />

                              {item}
                            </li>
                          ))}

                        </ul>
                      </div>

                    </div>

                    {/* PROJECT TECH STACK */}

                    <aside
                      className={`border-t pt-7 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0 ${
                        project.featured
                          ? "border-white/15"
                          : "border-gray-200 dark:border-zinc-800"
                      }`}
                    >

                      <h4
                        className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                          project.featured
                            ? "text-blue-300"
                            : "text-gray-400"
                        }`}
                      >
                        Technology Stack
                      </h4>

                      <div className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:items-start">

                        {project.technologies.map((technology) => (
                          <span
                            key={technology}
                            className={`px-3 py-2 text-xs ${
                              project.featured
                                ? "border border-white/15 bg-white/5 text-white/80"
                                : "border border-gray-200 bg-gray-50 text-gray-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                            }`}
                          >
                            {technology}
                          </span>
                        ))}

                      </div>

                      {project.links.length > 0 && (
                        <div className="mt-9 space-y-4">

                          {project.links.map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              className={`flex items-center justify-between gap-3 text-xs font-semibold transition hover:translate-x-1 ${
                                project.featured
                                  ? "text-blue-300"
                                  : "text-blue-800 dark:text-blue-400"
                              }`}
                            >
                              {link.label}
                              <ExternalLink size={14} />
                            </a>
                          ))}

                        </div>
                      )}

                    </aside>

                  </div>

                </article>
              ))}

            </div>
          </div>
        </section>

        {/* =================================================
            06. CAREER OBJECTIVE
        ================================================= */}

        <section className="px-6 py-20 sm:px-10 lg:px-16">

          <div className="mx-auto grid max-w-7xl gap-10 border border-gray-200 p-8 dark:border-zinc-800 sm:p-12 lg:grid-cols-[220px_1fr]">

            <div>
              <Lightbulb
                size={30}
                className="text-blue-800 dark:text-blue-400"
              />

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                Career Direction
              </p>
            </div>

            <div>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Professional Objective
              </h2>

              <p className="mt-5 max-w-3xl text-sm leading-8 text-gray-600 dark:text-zinc-400">
                {personalInfo.careerObjective}
              </p>

            </div>
          </div>
        </section>

        {/* =================================================
            07. EDUCATION
        ================================================= */}

        <section className="border-y border-gray-200 bg-gray-50 px-6 py-24 dark:border-zinc-800 dark:bg-zinc-900/50 sm:px-10 lg:px-16">

          <div className="mx-auto max-w-7xl">

            <SectionHeading
              number="05"
              eyebrow="Academic Background"
              title="Educational"
              highlight="Qualifications"
              description="Academic qualifications and educational background."
            />

            <div className="mt-12 grid gap-px border border-gray-200 bg-gray-200 dark:border-zinc-800 dark:bg-zinc-800 md:grid-cols-3">

              {education.map((item) => (
                <article
                  key={item.abbreviation}
                  className="bg-white p-8 dark:bg-zinc-950 sm:p-9"
                >

                  <div className="flex items-center justify-between">

                    <GraduationCap
                      size={24}
                      className="text-blue-800 dark:text-blue-400"
                    />

                    <span className="font-mono text-xs text-gray-400">
                      {item.number}
                    </span>

                  </div>

                  <p className="mt-10 font-mono text-sm text-blue-800 dark:text-blue-400">
                    {item.year}
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold">
                    {item.abbreviation}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-zinc-400">
                    {item.qualification}
                  </p>

                </article>
              ))}

            </div>
          </div>
        </section>

        {/* =================================================
            08. ADDITIONAL INFORMATION
        ================================================= */}

        <section className="px-6 py-20 sm:px-10 lg:px-16">

          <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-2">

            <div>

              <SectionHeading
                number="06"
                eyebrow="Language Proficiency"
                title="Languages"
                highlight="Known"
              />

              <div className="mt-8 border-t border-gray-200 dark:border-zinc-800">

                {languages.map((language, index) => (
                  <div
                    key={language}
                    className="flex items-center justify-between border-b border-gray-200 py-5 dark:border-zinc-800"
                  >
                    <span className="text-sm font-medium">
                      {language}
                    </span>

                    <span className="font-mono text-xs text-gray-400">
                      0{index + 1}
                    </span>
                  </div>
                ))}

              </div>
            </div>

            <div>

              <SectionHeading
                number="07"
                eyebrow="Areas of Interest"
                title="Engineering"
                highlight="Focus"
              />

              <p className="text-sm leading-8 text-gray-600 dark:text-zinc-400">
                Technical areas that align with ongoing development work
                and professional interests.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">

                {professionalInterests.map((interest) => (
                  <span
                    key={interest}
                    className="border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-medium dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    {interest}
                  </span>
                ))}

              </div>

            </div>
          </div>
        </section>

        {/* =================================================
            09. FINAL CONTACT SECTION
        ================================================= */}

        <section className="border-t border-gray-200 bg-[#111a2c] px-6 py-16 text-white dark:border-zinc-800 sm:px-10 lg:px-16">

          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:items-center">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-300">
                Professional Contact
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                Ajoy Das
              </h2>

              <p className="mt-3 text-sm text-white/55">
                Software Developer & MIS Executive
              </p>

              <a
                href={`mailto:${personalInfo.email}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-300 hover:text-white"
              >
                {personalInfo.email}
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="flex flex-wrap gap-4">

              <a
                href={personalInfo.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-xs font-semibold transition hover:bg-white/10"
              >
                Portfolio
                <ExternalLink size={14} />
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-xs font-semibold transition hover:bg-white/10"
              >
                GitHub
                <ExternalLink size={14} />
              </a>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 bg-blue-400 px-5 py-3 text-xs font-bold text-[#111a2c] transition hover:bg-white"
              >
                <ArrowDownToLine size={15} />
                Download PDF
              </button>

            </div>

          </div>

          <div className="mx-auto mt-14 max-w-7xl border-t border-white/15 pt-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
              Ajoy Das / Curriculum Vitae / 2026
            </p>
          </div>

        </section>

        <Footer />

        {/* =================================================
            PRINT STYLES
        ================================================= */}

        <style jsx global>{`
          @page {
            size: A4;
            margin: 12mm;
          }

          @media print {
            html,
            body {
              background: white !important;
              color: #171717 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            body * {
              visibility: hidden;
            }

            main,
            main * {
              visibility: visible;
            }

            main {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              overflow: visible !important;
              background: white !important;
              color: #171717 !important;
            }

            main > section {
              break-inside: auto;
            }

            main article {
              break-inside: avoid;
              box-shadow: none !important;
              transform: none !important;
            }

            main button,
            main a[href="/contact"],
            main + footer,
            footer {
              display: none !important;
            }

            main a {
              color: inherit !important;
              text-decoration: none !important;
            }

            main .dark {
              color: #171717 !important;
            }
          }
        `}</style>

      </main>
    </PageTransition>
  );
}
