
import React from "react";
import {
  Quote,
  Star,
  MessageSquareQuote,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Pacifico } from "next/font/google";
import PageTransition from "@/components/page-transition";
import {
  absoluteUrl,
  createSeoMetadata,
} from "@/lib/seo";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = createSeoMetadata({
  title: "Testimonials",
  description:
    "Feedback and testimonials from people who have worked with Ajoy Das.",
  path: "/testimonials",
});

// Replace these examples with genuine client feedback.
const testimonials = [
  {
    number: "01",
    name: "Client Name",
    role: "Project Client",
    company: "Company Name",
    message:
      "Working with Ajoy was a great experience. The application was developed with attention to detail, usability, and performance.",
    rating: 5,
    initials: "CN",
  },
  {
    number: "02",
    name: "Client Name",
    role: "Business Owner",
    company: "Company Name",
    message:
      "Ajoy understood the requirements clearly and delivered a solution that matched the project&apos;s goals. Communication was smooth throughout.",
    rating: 5,
    initials: "CN",
  },
  {
    number: "03",
    name: "Dipankar Borthakur",
    role: "Developer",
    company: "",
    message:
      "The development process was organized and professional. I appreciated the focus on clean implementation and solving practical problems.",
    rating: 5,
    initials: "CN",
  },
];

const principles = [
  {
    number: "01",
    title: "Clear communication",
    description:
      "Understanding requirements and keeping everyone informed throughout development.",
  },
  {
    number: "02",
    title: "Quality first",
    description:
      "Building maintainable, reliable, and user-friendly software solutions.",
  },
  {
    number: "03",
    title: "Continuous improvement",
    description:
      "Listening to feedback and improving the final product through iteration.",
  },
];

export default function TestimonialsPage() {
  const pageId = absoluteUrl("/testimonials#webpage");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": pageId,
    name: "Testimonials | Codewithajoydas",
    description:
      "Feedback and testimonials from people who have worked with Ajoy Das.",
    url: absoluteUrl("/testimonials"),
    inLanguage: "en-IN",
  };

  return (
    <>
      <script
        id="testimonials-page-jsonld"
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
              <div className="grid gap-12 lg:grid-cols-[1fr_0.65fr] lg:items-end">
                <div>
                  <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-400">
                    Testimonials
                  </p>

                  <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                    Words from
                    <br />
                    <span className={`text-blue-800 dark:text-blue-400 ${pacifico.className}`}>
                      people I&apos;ve worked with.
                    </span>
                  </h1>
                </div>

                <div>
                  <p className="max-w-xl text-lg leading-8 text-gray-600 dark:text-zinc-400">
                    Every project is an opportunity to build something
                    meaningful. Here&apos;s a place to share the experiences,
                    feedback, and perspectives of people I&apos;ve worked with.
                  </p>
                </div>
              </div>

              {/* STATS */}
              <div className="mt-16 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 dark:border-zinc-800 dark:bg-zinc-800 sm:grid-cols-3">
                <div className="bg-white p-7 dark:bg-zinc-950">
                  <p className="text-3xl font-semibold">03</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-zinc-500">
                    Testimonial slots
                  </p>
                </div>

                <div className="bg-white p-7 dark:bg-zinc-950">
                  <p className="text-3xl font-semibold">01</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-zinc-500">
                    Development approach
                  </p>
                </div>

                <div className="bg-white p-7 dark:bg-zinc-950">
                  <p className="text-3xl font-semibold">∞</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-zinc-500">
                    Room to improve
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* INTRODUCTION */}
          <section className="px-6 py-24 sm:px-10 lg:px-16">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.75fr_1fr]">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-400">
                  The importance of feedback
                </p>
                <h2 className="mt-5 max-w-md text-4xl font-semibold leading-tight tracking-tight">
                  Good software starts with understanding people.
                </h2>
              </div>

              <div className="max-w-2xl">
                <p className="text-lg leading-8 text-gray-600 dark:text-zinc-400">
                  Software development is not just about writing code.
                  It&apos;s about understanding requirements, solving problems,
                  and creating experiences that people can rely on.
                </p>
                <p className="mt-6 leading-7 text-gray-600 dark:text-zinc-400">
                  Feedback helps identify what works, what needs improvement,
                  and how the final product can deliver more value.
                </p>
              </div>
            </div>
          </section>

          {/* TESTIMONIAL CARDS */}
          <section className="border-y border-gray-200 bg-gray-50 px-6 py-24 dark:border-zinc-800 dark:bg-zinc-900/60 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
              <div className="max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-400">
                  Client feedback
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                  Experiences that matter.
                </h2>

                <p className="mt-5 leading-7 text-gray-600 dark:text-zinc-400">
                  A collection of feedback about collaboration, development,
                  and the overall working experience.
                </p>
              </div>

              <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((item) => (
                  <article
                    key={item.number}
                    className="group flex flex-col border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[5px_5px_0px_#193cb8] dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400">
                        <Quote size={21} />
                      </div>

                      <span className="font-mono text-xs text-gray-400 dark:text-zinc-500">
                        {item.number}
                      </span>
                    </div>

                    <div className="mt-8 flex gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          className="fill-blue-700 text-blue-700 dark:fill-blue-400 dark:text-blue-400"
                        />
                      ))}
                    </div>

                    <blockquote className="mt-6 flex-1 text-base leading-8 text-gray-600 dark:text-zinc-400">
                      &quot;{item.message}&quot;
                    </blockquote>

                    <div className="mt-8 border-t border-gray-200 pt-6 dark:border-zinc-800">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-800 dark:bg-blue-950/40 dark:text-blue-400">
                          {item.initials}
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-xs text-gray-500 dark:text-zinc-500">
                            {item.role} · {item.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <p className="mt-8 text-center text-xs text-gray-400 dark:text-zinc-500">
                Replace the sample entries with verified client testimonials before publishing.
              </p>
            </div>
          </section>

          {/* WORKING PRINCIPLES */}
          <section className="px-6 py-24 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
              <div className="max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-800 dark:text-blue-400">
                  My approach
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                  What I bring to every collaboration.
                </h2>
              </div>

              <div className="mt-14 grid gap-5 md:grid-cols-3">
                {principles.map((item) => (
                  <article
                    key={item.number}
                    className="border border-gray-200 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-[5px_5px_0px_#193cb8] dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <span className="font-mono text-xs text-blue-800 dark:text-blue-400">
                      {item.number}
                    </span>

                    <h3 className="mt-7 text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="border-y border-gray-200 bg-gray-50 px-6 py-24 dark:border-zinc-800 dark:bg-zinc-900/60 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-center">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400">
                    <MessageSquareQuote size={21} />
                  </div>

                  <h2 className="mt-7 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                    Have we worked together?
                  </h2>

                  <p className="mt-6 max-w-xl leading-8 text-gray-600 dark:text-zinc-400">
                    Your feedback matters. If we&apos;ve worked together, I&apos;d
                    appreciate hearing about your experience and collaboration.
                  </p>

                  <Link
                    href="/contact"
                    className="mt-9 inline-flex items-center gap-3 bg-blue-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-900"
                  >
                    Share your feedback
                    <ArrowUpRight size={17} />
                  </Link>
                </div>

                <div className="border border-gray-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
                  <Sparkles size={22} className="text-blue-800 dark:text-blue-400" />

                  <h3 className="mt-6 text-xl font-semibold">
                    Let&apos;s build something meaningful.
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-zinc-400">
                    Have an idea, a project, or a problem that needs a
                    software solution? Let&apos;s discuss it.
                  </p>

                  <Link
                    href="/services"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-blue-800 hover:underline dark:text-blue-400"
                  >
                    Explore my services
                    <ArrowUpRight size={16} />
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
