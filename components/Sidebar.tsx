"use client";

import { SidebarContext } from "@/store/components/Sidebar";
import { X } from "lucide-react";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

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
  { name: "Articles", href: "/articles" },
  { name: "Contact", href: "/contact" },
];

export default function SidebarComponent() {
  const { sidebarOpen, toggleSidebar } = useContext(SidebarContext);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="
            fixed
            inset-0
            z-40
            bg-black/20
            backdrop-blur-[2px]
          "
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-dvh
          w-[300px]
          bg-white/95
          shadow-2xl
          backdrop-blur-xl
          transition-transform
          duration-300
          ease-out

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-hidden={!sidebarOpen}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
            <Link
              href="/"
              onClick={toggleSidebar}
              className={`${pacifico.className} text-lg font-semibold tracking-tight text-gray-900 flex gap-0.5 items-center`}
            >
              <Image
                src={"/icons/favicon-32x32.png"}
                alt="Codewithajoydas Logo"
                width={35}
                height={35}
              />
              Codewithajoydas
              <span className="text-blue-800">.</span>
            </Link>

            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="Close navigation menu"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-gray-200
                text-gray-700
                transition-all
                duration-200
                hover:border-gray-300
                hover:bg-gray-50
                hover:text-blue-800
              "
            >
              <X size={20} strokeWidth={1.8} />
            </button>
          </div>

          {/* Navigation */}
          <nav
            className="flex flex-1 items-center px-6"
            aria-label="Mobile navigation"
          >
            <ul className="w-full space-y-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={toggleSidebar}
                      aria-current={active ? "page" : undefined}
                      className={`
                        group
                        relative
                        flex
                        items-center
                        px-4
                        py-3
                        text-2xl
                        font-medium
                        transition-all
                        duration-200

                        ${
                          active
                            ? "translate-x-1 text-blue-800"
                            : "text-gray-700 hover:translate-x-1 hover:text-blue-800"
                        }
                      `}
                    >
                      {/* Active Indicator */}
                      <span
                        className={`
                          absolute
                          -left-2
                          h-7
                          w-1
                          rounded-full
                          bg-blue-800
                          transition-all
                          duration-200

                          ${
                            active
                              ? "scale-y-100 opacity-100"
                              : "scale-y-0 opacity-0"
                          }
                        `}
                      />

                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-gray-100 px-6 py-5">
            <p className="text-xs tracking-wide text-gray-400">
              © {new Date().getFullYear()} Codewithajoydas
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
