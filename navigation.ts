import {
  Home,
  User,
  Cpu,
  FolderGit2,
  FlaskConical,
  Briefcase,
  FileText,
  Mail,
  HeartHandshake,
  Wrench,
  Code2,
  Download,
  User2Icon,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
export const p_links = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Skills", href: "/skills", icon: Cpu },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Articles", href: "/articles", icon: FileText },
  { name: "Lab", href: "/lab", icon: FlaskConical },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "Contact", href: "/contact", icon: Mail },
];
export const s_links = [
  { name: "Services", href: "/services", icon: HeartHandshake },
  // { name: "Developer Tools", href: "/tools", icon: Wrench },
  { name: "Open Source", href: "/open-source", icon: FaGithub },
  { name: "Tech Stack", href: "/stack", icon: Code2 },
  // { name: "Playground", href: "/playground", icon: Terminal },
  // { name: "Changelog", href: "/changelog", icon: History },
  // { name: "Now", href: "/now", icon: Clock },
  // { name: "Guestbook", href: "/guestbook", icon: MessageSquare },
  // { name: "Statistics", href: "/stats", icon: BarChart3 },
  // { name: "Roadmap", href: "/roadmap", icon: Rocket },
  // { name: "Resume", href: "/resume", icon: Download },
  { name: "Admin Login", href: "/admin", icon: User2Icon },
];

