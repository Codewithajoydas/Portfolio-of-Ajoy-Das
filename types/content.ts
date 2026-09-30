export interface Project {
  _id?: string;

  name: string;
  slug: string;

  type:
    | "web-app"
    | "mobile-app"
    | "desktop-app"
    | "cli"
    | "library"
    | "website"
    | "experiment"
    | "open-source";

  role?: string;

  shortDescription: string;
  description?: string;

  githubUrl?: string;
  liveUrl?: string;
  documentationUrl?: string;

  thumbnail?: string;
  banner?: string;
  screenshots: string[];

  techStack: string[];

  category:
    | "javascript"
    | "typescript"
    | "react"
    | "nextjs"
    | "nodejs"
    | "electron"
    | "other";

  status:
    | "planning"
    | "development"
    | "completed"
    | "maintenance"
    | "archived";

  year: number;

  featured: boolean;
  published: boolean;

  features: string[];

  challenges?: string;
  learnings?: string;

  seoTitle?: string;
  seoDescription?: string;

  createdAt: string;
  updatedAt: string;
}

export interface Article {
  _id?: string;

  title: string;
  slug: string;

  excerpt: string;
  content: string;

  coverImage?: string;
  thumbnail?: string;

  category:
    | "javascript"
    | "typescript"
    | "react"
    | "nextjs"
    | "nodejs"
    | "css"
    | "web-development"
    | "career"
    | "tutorial"
    | "other";

  readingTime?: number;

  tags?: string;

  published: boolean;
  featured: boolean;
  comments: boolean;

  sourceUrl?: string;
  githubUrl?: string;
  demoUrl?: string;

  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;

  createdAt: string;
  updatedAt: string;
}