import { Code2, Mail } from "lucide-react";
import { Pacifico } from "next/font/google";
import Link from "next/link";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className={`${pacifico.className} text-2xl text-blue-800`}
            >
              Codewithajoydas
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Software developer building applications, developer tools,
              experiments, and systems while continuously learning.
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Explore
              </p>

              <div className="mt-4 flex flex-col gap-3 text-sm">
                <Link
                  href="/projects"
                  className="text-gray-600 transition-colors hover:text-blue-800"
                >
                  Projects
                </Link>

                <Link
                  href="/skills"
                  className="text-gray-600 transition-colors hover:text-blue-800"
                >
                  Skills
                </Link>

                <Link
                  href="/experience"
                  className="text-gray-600 transition-colors hover:text-blue-800"
                >
                  Experience
                </Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                About
              </p>

              <div className="mt-4 flex flex-col gap-3 text-sm">
                <Link
                  href="/about"
                  className="text-gray-600 transition-colors hover:text-blue-800"
                >
                  About Me
                </Link>

                <Link
                  href="/contact"
                  className="text-gray-600 transition-colors hover:text-blue-800"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Connect
              </p>

              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://github.com/Codewithajoydas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex size-9 items-center justify-center border border-gray-200 text-gray-600 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex size-9 items-center justify-center border border-gray-200 text-gray-600 transition-all hover:border-blue-800 hover:bg-blue-800 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                  </svg>
                </a>

                <a
                  href="mailto:hello@codewithajoydas.live"
                  aria-label="Email"
                  className="flex size-9 items-center justify-center border border-gray-200 text-gray-600 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                >
                  <Mail size={17} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-gray-200 pt-6 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Codewithajoydas. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <Code2 size={14} />
            <span>Built with Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
