import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name must not exceed 100 characters"),

  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers and hyphens"
    ),

  type: z.enum([
    "web-app",
    "mobile-app",
    "desktop-app",
    "cli",
    "library",
    "website",
    "experiment",
    "open-source",
  ]),

  role: z
    .string()
    .max(100, "Role must not exceed 100 characters")
    .optional(),

  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters")
    .max(200, "Short description must not exceed 200 characters"),

  description: z
    .string()
    .max(10000, "Description is too long")
    .optional(),

  // Links
  githubUrl: z
    .url("Invalid GitHub URL")
    .optional()
    .or(z.literal("")),

  liveUrl: z
    .url("Invalid live URL")
    .optional()
    .or(z.literal("")),

  documentationUrl: z
    .url("Invalid documentation URL")
    .optional()
    .or(z.literal("")),

  // Media
  thumbnail: z
    .url("Invalid thumbnail URL")
    .optional()
    .or(z.literal("")),

  banner: z
    .url("Invalid banner URL")
    .optional()
    .or(z.literal("")),

  screenshots: z
    .array(z.url("Invalid screenshot URL"))
    .optional()
    .default([]),

  // Technology
  techStack: z
    .array(
      z.string().min(1, "Technology name cannot be empty")
    )
    .default([]),

  category: z.enum([
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "nodejs",
    "electron",
    "other",
  ]),

  // Status
  status: z.enum([
    "planning",
    "development",
    "completed",
    "maintenance",
    "archived",
  ]),

  year: z
    .number()
    .int("Year must be an integer")
    .min(2000, "Year must be 2000 or later")
    .max(2100, "Year must be 2100 or earlier"),

  featured: z.boolean().default(false),

  published: z.boolean().default(true),

  // Project information
  features: z
    .array(
      z.string().min(1, "Feature cannot be empty")
    )
    .default([]),

  challenges: z
    .string()
    .max(10000, "Challenges description is too long")
    .optional(),

  learnings: z
    .string()
    .max(10000, "Learnings description is too long")
    .optional(),

  // SEO
  seoTitle: z
    .string()
    .max(60, "SEO title must not exceed 60 characters")
    .optional(),

  seoDescription: z
    .string()
    .max(160, "SEO description must not exceed 160 characters")
    .optional(),
});

export type ProjectInput = z.infer<typeof projectSchema>;