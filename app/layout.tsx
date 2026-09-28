import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans, Geist } from "next/font/google";
import { SidebarProvider } from "@/store/components/Sidebar";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const OpenSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Codewithajoydas | Ajoy Das",
  description: "Portfolio of Ajoy Das",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <SidebarProvider>
      <html
        lang="en"
        className={cn("h-full", "bg-white", "antialiased", OpenSans.className, "font-sans", geist.variable)}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </SidebarProvider>
  );
}
