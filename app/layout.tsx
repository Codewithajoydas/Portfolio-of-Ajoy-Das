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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Ajoy Das — Software Developer",
    template: "%s | Ajoy Das",
  },

  description:
    "Ajoy Das is a software developer building web applications, developer tools, open-source projects, and technical experiments.",

  applicationName: "Ajoy Das Portfolio",

  authors: [
    {
      name: "Ajoy Das",
    },
  ],

  creator: "Ajoy Das",

  publisher: "Ajoy Das",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    siteName: "Ajoy Das",

    title: "Ajoy Das — Software Developer",

    description:
      "Software development projects, articles, tutorials, and experiments by Ajoy Das.",

    url: SITE_URL,

    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Ajoy Das Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Ajoy Das — Software Developer",

    description:
      "Software development projects, articles, tutorials, and experiments by Ajoy Das.",

    images: [`${SITE_URL}/og-image.jpg`],
  },
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
