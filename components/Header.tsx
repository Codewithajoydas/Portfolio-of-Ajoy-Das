"use client";

import { SidebarContext } from "@/store/components/Sidebar";
import { Pacifico } from "next/font/google";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  Home, 
  User, 
  Cpu, 
  FolderGit2, 
  FlaskConical, 
  Briefcase, 
  FileText, 
  Mail 
} from "lucide-react";
import Image from "next/image";
import { clsx } from "cn";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Skills", href: "/skills", icon: Cpu },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Lab", href: "/lab", icon: FlaskConical },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "Articles", href: "/articles", icon: FileText },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function HeaderComponent() {
  const { toggleSidebar } = useContext(SidebarContext);
  const [scrollDirection, setScrollDirection] = useState("top");
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let currentPosition = window.scrollY;
    
    const handleScroll = () => {
      const newPosition = window.scrollY;
      setScrollPosition(newPosition);
      
      if (Math.abs(newPosition - currentPosition) < 10) return;
      
      const direction = newPosition > currentPosition ? "down" : "up";
      setScrollDirection(direction);
      currentPosition = newPosition;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out",
        scrollPosition <= 10
              ? "bg-transparent border-transparent"
              : "border border-gray-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md shadow-sm"
      )}
      style={{
        transform: scrollDirection === "down" && scrollPosition > 100 ? "translateY(-100%)" : "translateY(0)",
        opacity: scrollDirection === "down" && scrollPosition > 100 ? 0 : 1,
        pointerEvents: scrollDirection === "down" && scrollPosition > 100 ? "none" : "auto",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div
          className={clsx(
            "flex h-16 items-center justify-between px-6 transition-all duration-300 rounded-xl",
            
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Codewithajoydas home"
            className="group flex items-center gap-2 transition-transform duration-200 active:scale-95"
          >
            <Image
              src="/icons/favicon-32x32.png"
              alt="Codewithajoydas Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span
              className={clsx(
                pacifico.className,
                "text-xl font-bold tracking-tight transition-colors duration-200",
                "text-gray-900 dark:text-white",
                "group-hover:text-blue-600 dark:group-hover:text-blue-400"
              )}
            >
              Codewithajoydas
              <span className="text-blue-600 dark:text-blue-400">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:block" aria-label="Main navigation">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={clsx(
                        "group relative inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                        active
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-600 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white"
                      )}
                    >
                      <Icon size={16} className="opacity-80 transition-transform duration-200 group-hover:scale-110" />
                      <span>{link.name}</span>
                      
                      {/* Active / Hover Indicator Line */}
                      <span
                        className={clsx(
                          "absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 bg-blue-600 dark:bg-blue-400 transition-all duration-300",
                          active 
                            ? "w-5 opacity-100" 
                            : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-70"
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile & Small Screen Menu Button */}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Open navigation menu"
            className={clsx(
              "flex h-10 w-10 items-center justify-center border transition-all duration-200 xl:hidden active:scale-95",
              "border-gray-200 text-gray-700 bg-white/50",
              "hover:border-gray-300 hover:bg-gray-50 hover:text-blue-600",
              "dark:border-zinc-800 dark:text-zinc-300 dark:bg-zinc-900/50",
              "dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-blue-400"
            )}
          >
            <Menu size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}
