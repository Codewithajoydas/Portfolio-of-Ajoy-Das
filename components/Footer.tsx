
import { Code2, Mail, ArrowUpRight } from "lucide-react";
import { Pacifico } from "next/font/google";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

const navigation = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Skills", href: "/skills" },
      { label: "Experience", href: "/experience" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "About Me", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Codewithajoydas",
    icon: FaGithub,
  },
  {
    label: "Email",
    href: "mailto:codewithajoydas@gmail.com",
    icon: Mail,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Website footer"
      className="border-t border-gray-200 bg-white text-gray-900 transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
    >
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16">

        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">

          {/* Brand */}
          <div className="max-w-md">

            <Link
              href="/"
              aria-label="Codewithajoydas homepage"
              className={`${pacifico.className} inline-block text-2xl text-blue-800 transition-colors hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300`}
            >
              Codewithajoydas
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-600 dark:text-zinc-400">
              Software developer focused on building meaningful
              applications, developer tools, and practical digital
              experiences through continuous learning and experimentation.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex size-10 items-center justify-center border border-gray-200 text-gray-600 transition-all duration-200 hover:border-blue-800 hover:bg-blue-800 hover:text-white dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-blue-500 dark:hover:bg-blue-500 dark:hover:text-white"
                >
                  <Icon size={17} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {navigation.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500">
                {group.title}
              </h3>

              <ul className="mt-6 space-y-4">
                {group.links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-sm text-gray-600 transition-colors duration-200 hover:text-blue-800 dark:text-zinc-400 dark:hover:text-blue-400"
                    >
                      {item.label}
                      <ArrowUpRight
                        size={13}
                        className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500">
              Get in touch
            </h3>

            <p className="mt-6 text-sm leading-7 text-gray-600 dark:text-zinc-400">
              Have an idea, a project, or an opportunity to discuss?
              Feel free to reach out.
            </p>

            <a
              href="mailto:codewithajoydas@gmail.com?subject=Let's%20Connect"
              className="mt-5 inline-flex items-center gap-2 border-b border-blue-800 pb-1 text-sm font-medium text-blue-800 transition-colors hover:text-blue-600 dark:border-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Let&apos;s talk
              <ArrowUpRight size={15} />
            </a>

            <p className="mt-5 break-all text-xs text-gray-400 dark:text-zinc-500">
              codewithajoydas@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col gap-5 border-t border-gray-200 pt-7 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs leading-6 text-gray-500 dark:text-zinc-500">
            © {currentYear} Codewithajoydas. All rights reserved.
          </p>

          

          <Link
            href="/"
            className="w-fit text-xs text-gray-500 transition-colors hover:text-blue-800 dark:text-zinc-500 dark:hover:text-blue-400"
          >
            Back to home ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
