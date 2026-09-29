import mongoose, { Document, Model, Schema } from "mongoose";

export interface IArticle extends Document {
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

  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    // Basic information

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 150,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250,
    },

    // Article content

    content: {
      type: String,
      required: true,
    },

    // Media

    coverImage: {
      type: String,
      trim: true,
    },

    thumbnail: {
      type: String,
      trim: true,
    },

    // Classification

    category: {
      type: String,
      required: true,
      enum: [
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
      ],
    },

    readingTime: {
      type: Number,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "Reading time must be a whole number",
      },
    },

    tags: {
      type: String,
      trim: true,
    },

    // Article settings

    published: {
      type: Boolean,
      required: true,
      default: false,
    },

    featured: {
      type: Boolean,
      required: true,
      default: false,
    },

    comments: {
      type: Boolean,
      required: true,
      default: true,
    },

    // References

    sourceUrl: {
      type: String,
      trim: true,
    },

    githubUrl: {
      type: String,
      trim: true,
    },

    demoUrl: {
      type: String,
      trim: true,
    },

    // SEO

    seoTitle: {
      type: String,
      trim: true,
      maxlength: 60,
    },

    seoDescription: {
      type: String,
      trim: true,
      maxlength: 160,
    },

    canonicalUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Article: Model<IArticle> =
  mongoose.models.Article ||
  mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;