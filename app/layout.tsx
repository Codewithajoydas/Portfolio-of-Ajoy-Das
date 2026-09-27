import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import { SidebarProvider } from "@/store/components/Sidebar";

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
        className={`${OpenSans.className} h-full bg-white antialiased`}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </SidebarProvider>
  );
}
