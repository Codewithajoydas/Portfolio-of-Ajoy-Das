import { z } from "zod";
export const articleSchema = z.object({
  title: z
    .string()
    .min(1, "Article title is required")
    .max(120, "Article title must be 120 characters or less"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers, and hyphens",
    ),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .max(250, "Excerpt must be 250 characters or less"),
  content: z
    .string()
    .min(1, "Article content is required"),
  coverImage: z
    .url("Enter a valid cover image URL")
    .optional()
    .or(z.literal("")),
  thumbnail: z
    .url("Enter a valid thumbnail URL")
    .optional()
    .or(z.literal("")),
  category: z.enum([
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "nodejs",
    "css",
    "web-development",
    "career",
    "tutorial",
    "other",
  ]),
  readingTime: z
    .number()
    .int("Reading time must be a whole number")
    .min(1, "Reading time must be at least 1 minute")
    .optional(),
  tags: z
    .string()
    .optional(),
  published: z.boolean(),
  featured: z.boolean(),
  comments: z.boolean(),
  sourceUrl: z
    .url("Enter a valid source URL")
    .optional()
    .or(z.literal("")),
  githubUrl: z
    .url("Enter a valid GitHub URL")
    .optional()
    .or(z.literal("")),
  demoUrl: z
    .url("Enter a valid demo URL")
    .optional()
    .or(z.literal("")),
  seoTitle: z
    .string()
    .max(60, "SEO title must be 60 characters or less")
    .optional(),
  seoDescription: z
    .string()
    .max(160, "SEO description must be 160 characters or less")
    .optional(),
  canonicalUrl: z
    .url("Enter a valid canonical URL")
    .optional()
    .or(z.literal("")),
});
export type ArticleFormData = z.infer<typeof articleSchema>;