"use client";
import { SidebarContext } from "@/store/components/Sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { MoreHorizontal, X, ChevronDown, Command } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { p_links, s_links } from "@/navigation";
import { Pacifico } from "next/font/google";
const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});
type NavLink = {
  name: string;
  href: string;
  icon: LucideIcon | React.ElementType;
};
export default function SidebarComponent() {
  const { sidebarOpen, toggleSidebar } = useContext(SidebarContext);
  const pathname = usePathname();
  const hasActiveMoreLink = s_links.some(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`),
  );
  const [moreOpen, setMoreOpen] = useState(hasActiveMoreLink);
  useEffect(() => {
    if (hasActiveMoreLink) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMoreOpen(true);
    }
  }, [hasActiveMoreLink]);
  useEffect(() => {
    if (!sidebarOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sidebarOpen, toggleSidebar]);
  useEffect(() => {
    if (!sidebarOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [sidebarOpen]);
  const closeSidebar = () => {
    if (sidebarOpen) {
      toggleSidebar();
    }
  };
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  const renderNavLink = (link: NavLink) => {
    const active = isActive(link.href);
    const Icon = link.icon;
    return (
      <li key={link.href}>
        <Link
          href={link.href}
          onClick={closeSidebar}
          aria-current={active ? "page" : undefined}
          className={`
            group relative flex items-center gap-3
             px-3.5 py-3
            text-[14px] font-medium
            transition-all duration-200
            ${
              active
                ? "font-bold text-zinc-900 dark:text-zinc-100"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
            }
          `}
        >
          {active && (
            <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-blue-600 dark:bg-blue-400" />
          )}
          <Icon
            size={18}
            strokeWidth={active ? 2.2 : 1.8}
            className={`shrink-0 transition-transform duration-200 ${
              active
                ? "text-blue-600 dark:text-blue-400"
                : "text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
            }`}
          />
          <span className="flex-1">{link.name}</span>
        </Link>
      </li>
    );
  };
  return (
    <>
      {/* Background overlay */}
      <button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={sidebarOpen ? 0 : -1}
        onClick={closeSidebar}
        className={`
          fixed inset-0 z-40
          bg-black/40 backdrop-blur-[3px]
          transition-opacity duration-300
          ${
            sidebarOpen
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0"
          }
        `}
      />
      {/* Sidebar drawer */}
      <aside
        aria-label="Main navigation"
        aria-hidden={!sidebarOpen}
        inert={!sidebarOpen}
        className={`
          fixed left-0 top-0 z-[1000]
          flex h-dvh w-[300px] max-w-[85vw]
          flex-col
          border-r border-zinc-200
          bg-white
          shadow-2xl shadow-black/10
          transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          dark:border-zinc-800
          dark:bg-zinc-950
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-zinc-100 px-5 dark:border-zinc-800">
          <Link
            href="/"
            onClick={closeSidebar}
            aria-label="Codewithajoydas homepage"
            className="group flex min-w-0 items-center gap-2.5"
          >
            <Image
              src="/icons/favicon-32x32.png"
              alt="Codewithajoydas"
              width={36}
              height={36}
              priority
              className="h-9 w-9  object-contain"
            />
            <div className="min-w-0">
              <p
                className={`truncate text-[15px] font-bold tracking-tight text-zinc-900 dark:text-white ${pacifico.className}`}
              >
                Codewithajoydas
                <span className="text-blue-600 dark:text-blue-400">.</span>
              </p>
            </div>
          </Link>
          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
               border border-zinc-200
              text-zinc-500 transition-colors
              hover:bg-zinc-100 hover:text-zinc-900
              dark:border-zinc-800 dark:text-zinc-400
              dark:hover:bg-zinc-900 dark:hover:text-white
            "
          >
            <X size={18} />
          </button>
        </div>
        {/* Navigation content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 [scrollbar-width:thin]">
          {/* Main navigation */}
          <div>
            <div className="mb-3 flex items-center justify-between px-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
                Navigation
              </p>
              <Command size={13} className="text-zinc-300 dark:text-zinc-600" />
            </div>
            <nav aria-label="Primary navigation">
              <ul className="space-y-1">{p_links.map(renderNavLink)}</ul>
            </nav>
          </div>
          {/* More navigation */}
          <div className="mt-7">
            <button
              type="button"
              onClick={() => setMoreOpen((previous) => !previous)}
              aria-expanded={moreOpen}
              aria-controls="sidebar-more-links"
              className="
                flex w-full items-center gap-3
                 px-3.5 py-3
                text-[13px] font-semibold
                text-zinc-500 transition-colors
                hover:bg-zinc-100 hover:text-zinc-900
                dark:text-zinc-400
                dark:hover:bg-zinc-900 dark:hover:text-white
              "
            >
              <MoreHorizontal size={18} />
              <span className="flex-1 text-left">Explore More</span>
              {hasActiveMoreLink && (
                <span className="h-1.5 w-1.5  bg-blue-600 dark:bg-blue-400" />
              )}
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div id="sidebar-more-links" hidden={!moreOpen} className="mt-1">
              <nav aria-label="Additional navigation">
                <ul className="space-y-1 pl-2">
                  {s_links.map((link) => renderNavLink(link))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="shrink-0 border-t border-zinc-100 p-4 dark:border-zinc-800">
          <div className="flex items-center justify-between px-1">
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
              © {new Date().getFullYear()} Codewithajoydas
            </p>
           
          </div>
        </div>
      </aside>
    </>
  );
}
