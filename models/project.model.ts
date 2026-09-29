import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
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

  // Links
  githubUrl?: string;
  liveUrl?: string;
  documentationUrl?: string;

  // Media
  thumbnail?: string;
  banner?: string;
  screenshots: string[];

  // Technology
  techStack: string[];
  category:
    | "javascript"
    | "typescript"
    | "react"
    | "nextjs"
    | "nodejs"
    | "electron"
    | "other";

  // Status
  status:
    | "planning"
    | "development"
    | "completed"
    | "maintenance"
    | "archived";

  year: number;
  featured: boolean;
  published: boolean;

  // Project information
  features: string[];
  challenges?: string;
  learnings?: string;

  // SEO
  seoTitle?: string;
  seoDescription?: string;

  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
      lowercase: true,
      trim: true,
      unique: true,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    },

    type: {
      type: String,
      enum: [
        "web-app",
        "mobile-app",
        "desktop-app",
        "cli",
        "library",
        "website",
        "experiment",
        "open-source",
      ],
      required: true,
    },

    role: {
      type: String,
      maxlength: 100,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 200,
      trim: true,
    },

    description: {
      type: String,
      maxlength: 10000,
      trim: true,
    },

    // Links
    githubUrl: {
      type: String,
      trim: true,
    },

    liveUrl: {
      type: String,
      trim: true,
    },

    documentationUrl: {
      type: String,
      trim: true,
    },

    // Media
    thumbnail: {
      type: String,
      trim: true,
    },

    banner: {
      type: String,
      trim: true,
    },

    screenshots: {
      type: [String],
      default: [],
    },

    // Technology
    techStack: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      enum: [
        "javascript",
        "typescript",
        "react",
        "nextjs",
        "nodejs",
        "electron",
        "other",
      ],
      required: true,
    },

    // Status
    status: {
      type: String,
      enum: [
        "planning",
        "development",
        "completed",
        "maintenance",
        "archived",
      ],
      required: true,
    },

    year: {
      type: Number,
      required: true,
      min: 2000,
      max: 2100,
      validate: {
        validator: Number.isInteger,
        message: "Year must be an integer",
      },
    },

    featured: {
      type: Boolean,
      default: false,
    },

    published: {
      type: Boolean,
      default: true,
    },

    // Project information
    features: {
      type: [String],
      default: [],
    },

    challenges: {
      type: String,
      maxlength: 10000,
      trim: true,
    },

    learnings: {
      type: String,
      maxlength: 10000,
      trim: true,
    },

    // SEO
    seoTitle: {
      type: String,
      maxlength: 60,
      trim: true,
    },

    seoDescription: {
      type: String,
      maxlength: 160,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project =
  mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);

export default Project;