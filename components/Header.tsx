"use client";

import { SidebarContext } from "@/store/components/Sidebar";
import { Pacifico } from "next/font/google";
import Link from "next/link";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Image from "next/image";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Lab", href: "/lab" },
  { name: "Experience", href: "/experience" },
  { name: "Contact", href: "/contact" },
];

export default function HeaderComponent() {
  const { toggleSidebar } = useContext(SidebarContext);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between px-4 backdrop-blur-xl sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Codewithajoydas home"
            className="group flex items-center gap-0.5"
          >
            <Image src={"/icons/favicon-32x32.png"} alt="Codewithajoydas Logo" width={35} height={35}/>
            <span
              className={`
                ${pacifico.className}
                text-xl
                font-bold
                tracking-tight
                text-gray-900
                transition-colors
                duration-200
                group-hover:text-blue-800
              `}
            >
              Codewithajoydas
            </span>

            <span className="text-xl font-bold text-blue-800">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block" aria-label="Main navigation">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`
                        relative
                        inline-flex
                        items-center
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        transition-colors
                        duration-200

                        ${
                          active
                            ? "text-blue-800"
                            : "text-gray-500 hover:text-gray-900"
                        }
                      `}
                    >
                      {link.name}

                      {/* Active Indicator */}
                      <span
                        className={`
                          absolute
                          bottom-0.5
                          left-1/2
                          h-0.5
                          -translate-x-1/2
                          bg-blue-800
                          transition-all
                          duration-300

                          ${active ? "w-5 opacity-100" : "w-0 opacity-0"}
                        `}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Open navigation menu"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              border
              border-gray-200
              text-gray-700
              transition-all
              duration-200
              hover:border-gray-300
              hover:bg-gray-50
              hover:text-blue-800
              md:hidden
            "
          >
            <Menu size={21} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </header>
  );
}
