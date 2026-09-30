import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

export const SITE_NAME = "Ajoy Das";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return new URL(path, SITE_URL).toString();
}

export function createImageUrl(
  image?: string,
): string {
  if (!image) {
    return absoluteUrl("/og-image.jpg");
  }

  return absoluteUrl(image);
}

export function createSeoMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = createImageUrl(image);

  return {
    title,

    description,

    metadataBase: new URL(SITE_URL),

    alternates: {
      canonical,
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
      type,

      url: canonical,

      title,

      description,

      siteName: SITE_NAME,

      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],

      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: [imageUrl],
    },
  };
}

export function safeJsonLd(
  data: Record<string, unknown>,
) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}