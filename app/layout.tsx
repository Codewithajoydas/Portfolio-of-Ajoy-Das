import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans, Geist } from "next/font/google";
import { SidebarProvider } from "@/store/components/Sidebar";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/seo";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const OpenSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  alternates: {
    canonical: SITE_URL,
  },

  title: {
    default: "Ajoy Das — Software Developer",
    template: "%s | Ajoy Das",
  },

  description:
    "Ajoy Das is a software developer building web applications, developer tools, open-source projects, and technical experiments.",

  applicationName: "Ajoy Das Portfolio",
  category: "technology",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/icons/site.webmanifest",

  authors: [
    {
      name: "Ajoy Das",
    },
  ],

  creator: "Ajoy Das",

  publisher: "Ajoy Das",
  keywords: [
    "Ajoy Das",
    "software developer",
    "web development",
    "developer tools",
    "JavaScript",
    "TypeScript",
    "Next.js",
  ],
  other: {
    "geo.region": "IN-AS",
    "geo.placename": "Assam, India",
  },

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
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ajoy Das — Software Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Ajoy Das — Software Developer",

    description:
      "Software development projects, articles, tutorials, and experiments by Ajoy Das.",

    images: ["/opengraph-image"],
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
