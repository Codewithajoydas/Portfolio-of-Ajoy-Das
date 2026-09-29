"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { projectSchema } from "@/validators/projects.validator";

// The schema has several `.default()` fields (screenshots, techStack,
// features, featured, published). For those, Zod's INPUT type (before
// parsing) has the field optional, while the OUTPUT type (after
// parsing/defaults are applied) has it required. zodResolver expects
// TFieldValues = z.input<Schema> and produces TTransformedValues =
// z.output<Schema> for the submit handler. Using only `z.infer` (which
// is the output type) for useForm's generic caused a mismatch that made
// TypeScript fall back to the loose built-in `FieldValues` type — that's
// what triggered the "not assignable to SubmitHandler" error.
type ProjectFormInput = z.input<typeof projectSchema>;
type ProjectFormOutput = z.output<typeof projectSchema>;

// Re-exported for convenience if other files import this name.
export type ProjectInput = ProjectFormOutput;

export default function ProjectPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormInput, unknown, ProjectFormOutput>({
    resolver: zodResolver(projectSchema),

    defaultValues: {
      name: "",
      slug: "",
      type: "web-app",
      role: "",
      shortDescription: "",
      description: "",

      githubUrl: "",
      liveUrl: "",
      documentationUrl: "",

      thumbnail: "",
      banner: "",
      screenshots: [],

      techStack: [],
      category: "nextjs",

      status: "development",
      year: new Date().getFullYear(),

      featured: false,
      published: true,

      features: [],
      challenges: "",
      learnings: "",

      seoTitle: "",
      seoDescription: "",
    },
  });

  const featured = watch("featured");
  const published = watch("published");
  const type = watch("type");
  const category = watch("category");
  const status = watch("status");

  async function onSubmit(data: ProjectInput) {
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/create-project", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error?.formErrors?.[0] ||
            result?.error ||
            "Failed to create project"
        );
      }

      setSuccess("Project created successfully.");

      console.log("Created project:", result.project);

      reset();
    } catch (error) {
      console.error("Create project error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center px-6 py-12">
      <div className="w-full max-w-4xl">

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>

            <FieldLegend>
              Project details
            </FieldLegend>

            <FieldDescription>
              These details will appear on your portfolio
              project page.
            </FieldDescription>

            {/* ========================= */}
            {/* BASIC INFORMATION */}
            {/* ========================= */}

            <FieldGroup>
              <FieldLegend>
                Basic information
              </FieldLegend>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {/* NAME */}

                <Field>
                  <FieldLabel htmlFor="project-name">
                    Project name
                  </FieldLabel>

                  <Input
                    id="project-name"
                    placeholder="Assign Meter"
                    autoComplete="off"
                    {...register("name")}
                  />

                  {errors.name && (
                    <FieldDescription className="text-red-500">
                      {errors.name.message}
                    </FieldDescription>
                  )}
                </Field>

                {/* SLUG */}

                <Field>
                  <FieldLabel htmlFor="project-slug">
                    Project slug
                  </FieldLabel>

                  <Input
                    id="project-slug"
                    placeholder="assign-meter"
                    autoComplete="off"
                    {...register("slug")}
                  />

                  <FieldDescription>
                    Used for the project URL.
                  </FieldDescription>

                  {errors.slug && (
                    <FieldDescription className="text-red-500">
                      {errors.slug.message}
                    </FieldDescription>
                  )}
                </Field>

              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {/* TYPE */}

                <Field>
                  <FieldLabel>
                    Project type
                  </FieldLabel>

                  <Select
                    value={type}
                    onValueChange={(value) =>
                      setValue(
                        "type",
                        value as ProjectInput["type"],
                        {
                          shouldValidate: true,
                        }
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="web-app">
                        Web Application
                      </SelectItem>

                      <SelectItem value="mobile-app">
                        Mobile Application
                      </SelectItem>

                      <SelectItem value="desktop-app">
                        Desktop Application
                      </SelectItem>

                      <SelectItem value="cli">
                        CLI Tool
                      </SelectItem>

                      <SelectItem value="library">
                        Library / Package
                      </SelectItem>

                      <SelectItem value="website">
                        Website
                      </SelectItem>

                      <SelectItem value="experiment">
                        Experiment
                      </SelectItem>

                      <SelectItem value="open-source">
                        Open Source
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {errors.type && (
                    <FieldDescription className="text-red-500">
                      {errors.type.message}
                    </FieldDescription>
                  )}
                </Field>

                {/* ROLE */}

                <Field>
                  <FieldLabel htmlFor="project-role">
                    Your role
                  </FieldLabel>

                  <Input
                    id="project-role"
                    placeholder="Full-Stack Developer"
                    {...register("role")}
                  />

                  {errors.role && (
                    <FieldDescription className="text-red-500">
                      {errors.role.message}
                    </FieldDescription>
                  )}
                </Field>

              </div>

              {/* SHORT DESCRIPTION */}

              <Field>
                <FieldLabel htmlFor="short-description">
                  Short description
                </FieldLabel>

                <Textarea
                  id="short-description"
                  placeholder="A short description of what this project does..."
                  maxLength={200}
                  rows={3}
                  {...register("shortDescription")}
                />

                <FieldDescription>
                  Keep this short. It will be used in project
                  cards and previews.
                </FieldDescription>

                {errors.shortDescription && (
                  <FieldDescription className="text-red-500">
                    {errors.shortDescription.message}
                  </FieldDescription>
                )}
              </Field>

              {/* DESCRIPTION */}

              <Field>
                <FieldLabel htmlFor="description">
                  Full description
                </FieldLabel>

                <Textarea
                  id="description"
                  placeholder="Explain the project, its purpose, the problem it solves, and how it works..."
                  rows={8}
                  {...register("description")}
                />

                {errors.description && (
                  <FieldDescription className="text-red-500">
                    {errors.description.message}
                  </FieldDescription>
                )}
              </Field>

            </FieldGroup>

            <FieldSeparator />

            {/* ========================= */}
            {/* LINKS */}
            {/* ========================= */}

            <FieldGroup>
              <FieldLegend>
                Project links
              </FieldLegend>

              <FieldDescription>
                Add the external resources associated with
                this project.
              </FieldDescription>

              <Field>
                <FieldLabel htmlFor="github-url">
                  GitHub repository
                </FieldLabel>

                <Input
                  id="github-url"
                  type="url"
                  placeholder="https://github.com/username/project"
                  {...register("githubUrl")}
                />

                {errors.githubUrl && (
                  <FieldDescription className="text-red-500">
                    {errors.githubUrl.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="live-url">
                  Live URL
                </FieldLabel>

                <Input
                  id="live-url"
                  type="url"
                  placeholder="https://example.com"
                  {...register("liveUrl")}
                />

                <FieldDescription>
                  Leave empty if the project does not have
                  a live deployment.
                </FieldDescription>

                {errors.liveUrl && (
                  <FieldDescription className="text-red-500">
                    {errors.liveUrl.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="documentation-url">
                  Documentation URL
                </FieldLabel>

                <Input
                  id="documentation-url"
                  type="url"
                  placeholder="https://docs.example.com"
                  {...register("documentationUrl")}
                />

                {errors.documentationUrl && (
                  <FieldDescription className="text-red-500">
                    {errors.documentationUrl.message}
                  </FieldDescription>
                )}
              </Field>

            </FieldGroup>

            <FieldSeparator />

            {/* ========================= */}
            {/* MEDIA */}
            {/* ========================= */}

            <FieldGroup>

              <FieldLegend>
                Project media
              </FieldLegend>

              <FieldDescription>
                Images used to showcase the project.
              </FieldDescription>

              <Field>
                <FieldLabel htmlFor="thumbnail">
                  Thumbnail image
                </FieldLabel>

                <Input
                  id="thumbnail"
                  type="url"
                  placeholder="https://images.example.com/project.png"
                  {...register("thumbnail")}
                />

                <FieldDescription>
                  Recommended aspect ratio: 16:9.
                </FieldDescription>

                {errors.thumbnail && (
                  <FieldDescription className="text-red-500">
                    {errors.thumbnail.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="banner">
                  Banner / hero image
                </FieldLabel>

                <Input
                  id="banner"
                  type="url"
                  placeholder="https://images.example.com/project-banner.png"
                  {...register("banner")}
                />

                {errors.banner && (
                  <FieldDescription className="text-red-500">
                    {errors.banner.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="screenshots">
                  Screenshots
                </FieldLabel>

                <Textarea
                  id="screenshots"
                  placeholder={`https://example.com/screenshot-1.png
https://example.com/screenshot-2.png
https://example.com/screenshot-3.png`}
                  rows={5}
                  onChange={(event) => {
                    const screenshots = event.target.value
                      .split("\n")
                      .map((url) => url.trim())
                      .filter(Boolean);

                    setValue(
                      "screenshots",
                      screenshots,
                      {
                        shouldValidate: true,
                      }
                    );
                  }}
                />

                <FieldDescription>
                  Add one image URL per line.
                </FieldDescription>

                {errors.screenshots && (
                  <FieldDescription className="text-red-500">
                    {errors.screenshots.message}
                  </FieldDescription>
                )}
              </Field>

            </FieldGroup>

            <FieldSeparator />

            {/* ========================= */}
            {/* TECHNOLOGY */}
            {/* ========================= */}

            <FieldGroup>

              <FieldLegend>
                Technology
              </FieldLegend>

              <FieldDescription>
                Technologies and tools used to build this
                project.
              </FieldDescription>

              <Field>
                <FieldLabel htmlFor="tech-stack">
                  Tech stack
                </FieldLabel>

                <Input
                  id="tech-stack"
                  placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL"
                  onChange={(event) => {
                    const techStack = event.target.value
                      .split(",")
                      .map((technology) => technology.trim())
                      .filter(Boolean);

                    setValue(
                      "techStack",
                      techStack,
                      {
                        shouldValidate: true,
                      }
                    );
                  }}
                />

                <FieldDescription>
                  Separate technologies with commas.
                </FieldDescription>

                {errors.techStack && (
                  <FieldDescription className="text-red-500">
                    {errors.techStack.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel>
                  Primary technology
                </FieldLabel>

                <Select
                  value={category}
                  onValueChange={(value) =>
                    setValue(
                      "category",
                      value as ProjectInput["category"],
                      {
                        shouldValidate: true,
                      }
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary technology" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="javascript">
                      JavaScript
                    </SelectItem>

                    <SelectItem value="typescript">
                      TypeScript
                    </SelectItem>

                    <SelectItem value="react">
                      React
                    </SelectItem>

                    <SelectItem value="nextjs">
                      Next.js
                    </SelectItem>

                    <SelectItem value="nodejs">
                      Node.js
                    </SelectItem>

                    <SelectItem value="electron">
                      Electron
                    </SelectItem>

                    <SelectItem value="other">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>

                {errors.category && (
                  <FieldDescription className="text-red-500">
                    {errors.category.message}
                  </FieldDescription>
                )}
              </Field>

            </FieldGroup>

            <FieldSeparator />

            {/* ========================= */}
            {/* STATUS */}
            {/* ========================= */}

            <FieldGroup>

              <FieldLegend>
                Project status
              </FieldLegend>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                <Field>
                  <FieldLabel>
                    Status
                  </FieldLabel>

                  <Select
                    value={status}
                    onValueChange={(value) =>
                      setValue(
                        "status",
                        value as ProjectInput["status"],
                        {
                          shouldValidate: true,
                        }
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="planning">
                        Planning
                      </SelectItem>

                      <SelectItem value="development">
                        In Development
                      </SelectItem>

                      <SelectItem value="completed">
                        Completed
                      </SelectItem>

                      <SelectItem value="maintenance">
                        Maintained
                      </SelectItem>

                      <SelectItem value="archived">
                        Archived
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {errors.status && (
                    <FieldDescription className="text-red-500">
                      {errors.status.message}
                    </FieldDescription>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="year">
                    Project year
                  </FieldLabel>

                  <Input
                    id="year"
                    type="number"
                    min="2000"
                    max="2100"
                    {...register("year", {
                      valueAsNumber: true,
                    })}
                  />

                  {errors.year && (
                    <FieldDescription className="text-red-500">
                      {errors.year.message}
                    </FieldDescription>
                  )}
                </Field>

              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {/* FEATURED */}

                <Field orientation="horizontal">

                  <Switch
                    checked={featured ?? false}
                    onCheckedChange={(checked) =>
                      setValue(
                        "featured",
                        checked,
                        {
                          shouldValidate: true,
                        }
                      )
                    }
                  />

                  <FieldContent>
                    <FieldTitle>
                      Featured project
                    </FieldTitle>

                    <FieldDescription>
                      Show this project prominently on the
                      portfolio homepage.
                    </FieldDescription>
                  </FieldContent>

                </Field>

                {/* PUBLISHED */}

                <Field orientation="horizontal">

                  <Switch
                    checked={published ?? true}
                    onCheckedChange={(checked) =>
                      setValue(
                        "published",
                        checked,
                        {
                          shouldValidate: true,
                        }
                      )
                    }
                  />

                  <FieldContent>
                    <FieldTitle>
                      Published
                    </FieldTitle>

                    <FieldDescription>
                      Make this project visible on your
                      portfolio.
                    </FieldDescription>
                  </FieldContent>

                </Field>

              </div>

            </FieldGroup>

            <FieldSeparator />

            {/* ========================= */}
            {/* PROJECT INFORMATION */}
            {/* ========================= */}

            <FieldGroup>

              <FieldLegend>
                Project information
              </FieldLegend>

              <Field>
                <FieldLabel htmlFor="features">
                  Key features
                </FieldLabel>

                <Textarea
                  id="features"
                  placeholder={`Authentication
Dashboard
Real-time notifications
Role-based access
Responsive design`}
                  rows={6}
                  onChange={(event) => {
                    const features = event.target.value
                      .split("\n")
                      .map((feature) => feature.trim())
                      .filter(Boolean);

                    setValue(
                      "features",
                      features,
                      {
                        shouldValidate: true,
                      }
                    );
                  }}
                />

                <FieldDescription>
                  Add one feature per line.
                </FieldDescription>

                {errors.features && (
                  <FieldDescription className="text-red-500">
                    {errors.features.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="challenges">
                  Challenges
                </FieldLabel>

                <Textarea
                  id="challenges"
                  rows={6}
                  placeholder="What technical or product challenges did you face?"
                  {...register("challenges")}
                />

                {errors.challenges && (
                  <FieldDescription className="text-red-500">
                    {errors.challenges.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="learnings">
                  What you learned
                </FieldLabel>

                <Textarea
                  id="learnings"
                  rows={6}
                  placeholder="What did you learn while building this project?"
                  {...register("learnings")}
                />

                {errors.learnings && (
                  <FieldDescription className="text-red-500">
                    {errors.learnings.message}
                  </FieldDescription>
                )}
              </Field>

            </FieldGroup>

            <FieldSeparator />

            {/* ========================= */}
            {/* SEO */}
            {/* ========================= */}

            <FieldGroup>

              <FieldLegend>
                SEO
              </FieldLegend>

              <FieldDescription>
                Search-engine metadata for the project page.
              </FieldDescription>

              <Field>
                <FieldLabel htmlFor="seo-title">
                  SEO title
                </FieldLabel>

                <Input
                  id="seo-title"
                  placeholder="Assign Meter — Attendance Management System"
                  maxLength={60}
                  {...register("seoTitle")}
                />

                {errors.seoTitle && (
                  <FieldDescription className="text-red-500">
                    {errors.seoTitle.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="seo-description">
                  SEO description
                </FieldLabel>

                <Textarea
                  id="seo-description"
                  placeholder="Describe this project for search engines..."
                  maxLength={160}
                  rows={3}
                  {...register("seoDescription")}
                />

                {errors.seoDescription && (
                  <FieldDescription className="text-red-500">
                    {errors.seoDescription.message}
                  </FieldDescription>
                )}
              </Field>

            </FieldGroup>

            {/* ========================= */}
            {/* RESPONSE */}
            {/* ========================= */}

            {error && (
              <p className="mt-4 text-sm text-red-500">
                {error}
              </p>
            )}

            {success && (
              <p className="mt-4 text-sm text-green-600">
                {success}
              </p>
            )}

            {/* ========================= */}
            {/* ACTIONS */}
            {/* ========================= */}

            <div className="flex justify-end gap-3 pt-6">

              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
              >
                Save as draft
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Creating..."
                  : "Publish project"}
              </Button>

            </div>

          </FieldSet>
        </form>

      </div>
    </div>
  );
}