import React from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Pacifico } from "next/font/google";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Footer from "@/components/Footer";
import { createSeoMetadata } from "@/lib/seo";
import PageTransition from "@/components/page-transition";
import ContactForm from "@/components/ContactForm";
import {
  absoluteUrl,
  safeJsonLd,
} from "@/lib/seo";
const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});
export const metadata = createSeoMetadata({
  title: "Contact",
  description:
    "Get in touch with Ajoy Das in Assam, India about software projects, developer tools, and collaboration.",
  path: "/contact",
});
const contactMethods = [
  {
    title: "Email",
    description: "For project ideas, collaboration, or just a conversation.",
    value: "codewithajoydas@gmail.com",
    href: "mailto:codewithajoydas@gmail.com",
    icon: Mail,
  },
  {
    title: "GitHub",
    description: "Explore the code, experiments, and projects I build.",
    value: "Codewithajoydas",
    href: "https://github.com/Codewithajoydas",
    icon: FaGithub,
  },
  {
    title: "LinkedIn",
    description: "Connect with me professionally and follow my journey.",
    value: "Codewithajoydas",
    href: "https://www.linkedin.com",
    icon: FaLinkedin,
  },
];
const interests = [
  "Full-stack applications",
  "Developer tools",
  "Backend systems",
  "Open-source projects",
  "Technical collaboration",
];
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": absoluteUrl("/about#person"),
      name: "Ajoy Das",
      url: absoluteUrl("/about"),
      jobTitle: "Software Developer",
      description:
        "A software developer interested in building practical software, developer tools, full-stack products, and backend systems.",
      email: "codewithajoydas@gmail.com",
      sameAs: [
        "https://github.com/Codewithajoydas",
        "https://www.instagram.com/codewithajoydas",
        "https://www.facebook.com/profile.php?id=100090674957174",
        "https://www.youtube.com/@codewithajoydas"
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType:
          "Project inquiries, collaboration, and general questions",
        email: "codewithajoydas@gmail.com"
      }
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: absoluteUrl("/"),
      name: "Codewithajoydas",
      description:
        "Official website and portfolio of Ajoy Das, featuring software projects, technical articles, and development work.",
      publisher: {
        "@id": absoluteUrl("/about#person")
      },
      inLanguage: "en-IN"
    },
    {
      "@type": "BreadcrumbList",
      "@id": absoluteUrl("/contact#breadcrumb"),
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/")
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: absoluteUrl("/contact")
        }
      ]
    },
    {
      "@type": "ContactPage",
      "@id": absoluteUrl("/contact#webpage"),
      url: absoluteUrl("/contact"),
      name: "Contact | Codewithajoydas",
      description:
        "Get in touch with Ajoy Das in Assam, India about software projects, developer tools, and collaboration.",
      isPartOf: {
        "@id": absoluteUrl("/#website")
      },
      about: {
        "@id": absoluteUrl("/about#person")
      },
      mainEntity: {
        "@id": absoluteUrl("/about#person")
      },
      breadcrumb: {
        "@id": absoluteUrl("/contact#breadcrumb")
      },
      inLanguage: "en-IN"
    }
  ]
};
export default function ContactPage() {
  return (
    <>
    <script
  id="contact-page-structured-data"
  type="application/ld+json"
  dangerouslySetInnerHTML={safeJsonLd(structuredData)}
/>
    <PageTransition>
      <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-blue-50 via-white to-white px-6 pb-20 pt-32 transition-colors duration-300 dark:border-zinc-800 dark:from-blue-950 dark:via-zinc-950 dark:to-zinc-950 sm:px-10 lg:px-16">
          <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-900/20" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-sky-100/50 blur-3xl dark:bg-sky-900/10" />
          <div className="relative mx-auto max-w-6xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-800">
              Get in touch
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Have an idea?
              <br />
              <span
                className={`${pacifico.className} font-normal text-blue-800 dark:text-blue-800`}
              >
                Let&apos;s talk.
              </span>
            </h1>
            <div className="mt-8 max-w-2xl">
              <p className="text-lg leading-8 text-gray-600 dark:text-zinc-400">
                Whether you have a project in mind, want to collaborate, or
                simply want to talk about software, feel free to reach out.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="mailto:codewithajoydas@gmail.com"
                className="inline-flex items-center gap-2 bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                Send me an email
                <ArrowUpRight size={17} />
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 transition-all hover:border-gray-900 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-400"
              >
                Explore my work
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </section>
        {/* Contact Methods */}
        <section className="px-6 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-800">
                Contact
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Choose your way to reach me.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <a
                    key={method.title}
                    href={method.href}
                    target={
                      method.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      method.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="
                      group
                      border border-gray-200
                      bg-white
                      p-6
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-gray-300
                      hover:shadow-[5px_5px_0px_#193cb8]
                      dark:border-zinc-800
                      dark:bg-zinc-900/60
                      dark:hover:border-zinc-700
                      dark:hover:shadow-[5px_5px_0px_#2563eb]
                    "
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center border border-gray-200 bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800">
                        <Icon size={20} />
                      </div>
                      <ArrowUpRight
                        size={19}
                        className="
                          text-gray-400
                          transition-all duration-300
                          group-hover:-translate-y-1
                          group-hover:translate-x-1
                          group-hover:text-blue-800
                          dark:text-zinc-500
                          dark:group-hover:text-blue-300
                        "
                      />
                    </div>
                    <h3 className="mt-8 text-xl font-semibold">
                      {method.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-zinc-400">
                      {method.description}
                    </p>
                    <p className="mt-6 text-sm font-medium text-gray-900 dark:text-zinc-100">
                      {method.value}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
        {/* Collaboration */}
        <section className="border-y border-gray-200 bg-gray-50 px-6 py-20 transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900/40 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-800">
                What I&apos;m open to
              </p>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Conversations that can turn into something useful.
              </h2>
              <p className="mt-6 max-w-xl leading-7 text-gray-600 dark:text-zinc-400">
                I&apos;m interested in working on practical software, developer
                tools, full-stack products, and systems where there is something
                meaningful to learn and build.
              </p>
            </div>
            <div className="border border-gray-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950/70">
              <div className="space-y-5">
                {interests.map((interest, index) => (
                  <div
                    key={interest}
                    className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-zinc-800"
                  >
                    <span className="font-mono text-xs text-blue-800 dark:text-blue-800">
                      0{index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-800 dark:text-zinc-200">
                      {interest}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Availability */}
        {/* <section className="px-6 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="border border-gray-200 p-8 dark:border-zinc-800 dark:bg-zinc-900/30 sm:p-10">
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-800">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">
                      Based in
                    </p>
                    <h3 className="mt-1 text-xl font-semibold">Assam, India</h3>
                    <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500 dark:text-zinc-400">
                      Working remotely and comfortable collaborating with
                      developers and teams from different places.
                    </p>
                  </div>
                </div>
                <a
                  href="mailto:codewithajoydas@gmail.com"
                  className="
                    inline-flex shrink-0 items-center justify-center gap-2
                    border border-gray-900 px-6 py-3 text-sm font-medium
                    transition-colors hover:bg-gray-900 hover:text-white
                    dark:border-zinc-600 dark:text-zinc-100
                    dark:hover:border-blue-500 dark:hover:bg-blue-600 dark:hover:text-white
                  "
                >
                  Start a conversation
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section> */}
        {/* DIRECT CONTACT FORM */}
        <section
          id="direct-contact"
          className="border-y border-gray-200 bg-white px-6 py-24 transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-950 sm:px-10 lg:px-16"
        >
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            {/* FORM INTRODUCTION */}
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">
                Direct message
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-zinc-100 sm:text-4xl">
                Let&apos;s start a
                <span
                  className={`${pacifico.className} ml-2 font-normal text-blue-800 dark:text-blue-300`}
                >
                  conversation.
                </span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-gray-600 dark:text-zinc-400">
                Have a project idea, collaboration opportunity, or something
                interesting to discuss? Send me a message directly using this
                form.
              </p>
              <div className="mt-10 border-t border-gray-200 pt-6 dark:border-zinc-800">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 dark:text-zinc-500">
                  Prefer email?
                </p>
                <a
                  href="mailto:codewithajoydas@gmail.com"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue-800 transition-colors hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200"
                >
                  codewithajoydas@gmail.com
                  <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="mt-10 flex items-center gap-3">
                <span className="h-2 w-2 bg-green-500" />
                <span className="text-sm text-gray-500 dark:text-zinc-400">
                  Open to meaningful conversations and collaboration
                </span>
              </div>
            </div>
            {/* CONTACT FORM */}
            <ContactForm/>
          </div>
        </section>
        {/* Footer */}
        <Footer />
      </main>
    </PageTransition>
    </>
  );
}
