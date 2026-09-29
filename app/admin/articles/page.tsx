"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import {
  articleSchema,
  type ArticleFormData,
} from "@/validators/article.validator"

export default function ArticlePage() {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),

    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",

      coverImage: "",
      thumbnail: "",

      category: "other",
      readingTime: undefined,
      tags: "",

      published: false,
      featured: false,
      comments: true,

      sourceUrl: "",
      githubUrl: "",
      demoUrl: "",

      seoTitle: "",
      seoDescription: "",
      canonicalUrl: "",
    },
  });

  async function onSubmit(data: ArticleFormData) {
    setServerError("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/create-article", {
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
          result?.error || "Failed to create article",
        );
      }

      console.log("Article created:", result);

      setSuccessMessage("Article created successfully.");

      reset();
    } catch (error) {
      console.error("Create article error:", error);

      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong",
      );
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center px-6 py-12">
      <div className="w-full max-w-4xl">

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>

            <FieldLegend>
              Article details
            </FieldLegend>

            <FieldDescription>
              Create and manage an article for your portfolio blog.
            </FieldDescription>

            {/* ============================= */}
            {/* BASIC INFORMATION */}
            {/* ============================= */}

            <FieldGroup>
              <FieldLegend>
                Basic information
              </FieldLegend>

              {/* TITLE */}
              <Field>
                <FieldLabel htmlFor="article-title">
                  Article title
                </FieldLabel>

                <Input
                  id="article-title"
                  placeholder="Understanding JavaScript Closures"
                  maxLength={120}
                  {...register("title")}
                />

                {errors.title && (
                  <FieldDescription className="text-red-500">
                    {errors.title.message}
                  </FieldDescription>
                )}
              </Field>

              {/* SLUG */}
              <Field>
                <FieldLabel htmlFor="article-slug">
                  Slug
                </FieldLabel>

                <Input
                  id="article-slug"
                  placeholder="understanding-javascript-closures"
                  {...register("slug")}
                />

                <FieldDescription>
                  This will be used in the article URL.
                </FieldDescription>

                {errors.slug && (
                  <FieldDescription className="text-red-500">
                    {errors.slug.message}
                  </FieldDescription>
                )}
              </Field>

              {/* EXCERPT */}
              <Field>
                <FieldLabel htmlFor="article-excerpt">
                  Excerpt
                </FieldLabel>

                <Textarea
                  id="article-excerpt"
                  placeholder="A practical guide to understanding JavaScript closures..."
                  maxLength={250}
                  rows={3}
                  {...register("excerpt")}
                />

                <FieldDescription>
                  A short summary shown on article cards and previews.
                </FieldDescription>

                {errors.excerpt && (
                  <FieldDescription className="text-red-500">
                    {errors.excerpt.message}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>

            <FieldSeparator />

            {/* ============================= */}
            {/* ARTICLE CONTENT */}
            {/* ============================= */}

            <FieldGroup>
              <FieldLegend>
                Article content
              </FieldLegend>

              <FieldDescription>
                Write the actual content of your article.
              </FieldDescription>

              <Field>
                <FieldLabel htmlFor="article-content">
                  Content
                </FieldLabel>

                <Textarea
                  id="article-content"
                  placeholder="Start writing your article..."
                  rows={20}
                  className="min-h-[500px]"
                  {...register("content")}
                />

                <FieldDescription>
                  You can later replace this textarea with a Markdown or
                  rich text editor.
                </FieldDescription>

                {errors.content && (
                  <FieldDescription className="text-red-500">
                    {errors.content.message}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>

            <FieldSeparator />

            {/* ============================= */}
            {/* MEDIA */}
            {/* ============================= */}

            <FieldGroup>
              <FieldLegend>
                Article media
              </FieldLegend>

              <FieldDescription>
                Images used when displaying your article.
              </FieldDescription>

              {/* COVER IMAGE */}
              <Field>
                <FieldLabel htmlFor="cover-image">
                  Cover image
                </FieldLabel>

                <Input
                  id="cover-image"
                  type="url"
                  placeholder="https://example.com/article-cover.png"
                  {...register("coverImage")}
                />

                <FieldDescription>
                  Recommended aspect ratio: 16:9.
                </FieldDescription>

                {errors.coverImage && (
                  <FieldDescription className="text-red-500">
                    {errors.coverImage.message}
                  </FieldDescription>
                )}
              </Field>

              {/* THUMBNAIL */}
              <Field>
                <FieldLabel htmlFor="thumbnail">
                  Thumbnail
                </FieldLabel>

                <Input
                  id="thumbnail"
                  type="url"
                  placeholder="https://example.com/article-thumbnail.png"
                  {...register("thumbnail")}
                />

                {errors.thumbnail && (
                  <FieldDescription className="text-red-500">
                    {errors.thumbnail.message}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>

            <FieldSeparator />

            {/* ============================= */}
            {/* CLASSIFICATION */}
            {/* ============================= */}

            <FieldGroup>
              <FieldLegend>
                Classification
              </FieldLegend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* CATEGORY */}
                <Field>
                  <FieldLabel htmlFor="category">
                    Category
                  </FieldLabel>

                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
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

                          <SelectItem value="css">
                            CSS
                          </SelectItem>

                          <SelectItem value="web-development">
                            Web Development
                          </SelectItem>

                          <SelectItem value="career">
                            Career
                          </SelectItem>

                          <SelectItem value="tutorial">
                            Tutorial
                          </SelectItem>

                          <SelectItem value="other">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.category && (
                    <FieldDescription className="text-red-500">
                      {errors.category.message}
                    </FieldDescription>
                  )}
                </Field>

                {/* READING TIME */}
                <Field>
                  <FieldLabel htmlFor="reading-time">
                    Reading time
                  </FieldLabel>

                  <Input
                    id="reading-time"
                    type="number"
                    min={1}
                    placeholder="8"
                    {...register("readingTime", {
                      valueAsNumber: true,
                    })}
                  />

                  <FieldDescription>
                    Estimated reading time in minutes.
                  </FieldDescription>

                  {errors.readingTime && (
                    <FieldDescription className="text-red-500">
                      {errors.readingTime.message}
                    </FieldDescription>
                  )}
                </Field>
              </div>

              {/* TAGS */}
              <Field>
                <FieldLabel htmlFor="tags">
                  Tags
                </FieldLabel>

                <Input
                  id="tags"
                  placeholder="javascript, closures, functions, fundamentals"
                  {...register("tags")}
                />

                <FieldDescription>
                  Separate tags with commas.
                </FieldDescription>

                {errors.tags && (
                  <FieldDescription className="text-red-500">
                    {errors.tags.message}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>

            <FieldSeparator />

            {/* ============================= */}
            {/* ARTICLE SETTINGS */}
            {/* ============================= */}

            <FieldGroup>
              <FieldLegend>
                Article settings
              </FieldLegend>

              {/* PUBLISHED */}
              <Field orientation="horizontal">
                <Controller
                  name="published"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="published"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />

                <FieldContent>
                  <FieldTitle>
                    Published
                  </FieldTitle>

                  <FieldDescription>
                    Make this article visible on your public portfolio.
                  </FieldDescription>
                </FieldContent>
              </Field>

              {/* FEATURED */}
              <Field orientation="horizontal">
                <Controller
                  name="featured"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="featured"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />

                <FieldContent>
                  <FieldTitle>
                    Featured article
                  </FieldTitle>

                  <FieldDescription>
                    Display this article prominently on your blog page.
                  </FieldDescription>
                </FieldContent>
              </Field>

              {/* COMMENTS */}
              <Field orientation="horizontal">
                <Controller
                  name="comments"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="comments"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />

                <FieldContent>
                  <FieldTitle>
                    Enable comments
                  </FieldTitle>

                  <FieldDescription>
                    Allow readers to comment on this article.
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldGroup>

            <FieldSeparator />

            {/* ============================= */}
            {/* REFERENCES */}
            {/* ============================= */}

            <FieldGroup>
              <FieldLegend>
                References and links
              </FieldLegend>

              {/* SOURCE URL */}
              <Field>
                <FieldLabel htmlFor="source-url">
                  Source / reference URL
                </FieldLabel>

                <Input
                  id="source-url"
                  type="url"
                  placeholder="https://developer.mozilla.org/..."
                  {...register("sourceUrl")}
                />

                {errors.sourceUrl && (
                  <FieldDescription className="text-red-500">
                    {errors.sourceUrl.message}
                  </FieldDescription>
                )}
              </Field>

              {/* GITHUB URL */}
              <Field>
                <FieldLabel htmlFor="github-url">
                  GitHub URL
                </FieldLabel>

                <Input
                  id="github-url"
                  type="url"
                  placeholder="https://github.com/username/repository"
                  {...register("githubUrl")}
                />

                <FieldDescription>
                  Useful when the article contains a project or code example.
                </FieldDescription>

                {errors.githubUrl && (
                  <FieldDescription className="text-red-500">
                    {errors.githubUrl.message}
                  </FieldDescription>
                )}
              </Field>

              {/* DEMO URL */}
              <Field>
                <FieldLabel htmlFor="demo-url">
                  Demo URL
                </FieldLabel>

                <Input
                  id="demo-url"
                  type="url"
                  placeholder="https://example.com"
                  {...register("demoUrl")}
                />

                {errors.demoUrl && (
                  <FieldDescription className="text-red-500">
                    {errors.demoUrl.message}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>

            <FieldSeparator />

            {/* ============================= */}
            {/* SEO */}
            {/* ============================= */}

            <FieldGroup>
              <FieldLegend>
                SEO
              </FieldLegend>

              <FieldDescription>
                Search engine metadata for this article.
              </FieldDescription>

              {/* SEO TITLE */}
              <Field>
                <FieldLabel htmlFor="seo-title">
                  SEO title
                </FieldLabel>

                <Input
                  id="seo-title"
                  placeholder="JavaScript Closures Explained | Ajoy Das"
                  maxLength={60}
                  {...register("seoTitle")}
                />

                <FieldDescription>
                  Keep it concise and descriptive.
                </FieldDescription>

                {errors.seoTitle && (
                  <FieldDescription className="text-red-500">
                    {errors.seoTitle.message}
                  </FieldDescription>
                )}
              </Field>

              {/* SEO DESCRIPTION */}
              <Field>
                <FieldLabel htmlFor="seo-description">
                  SEO description
                </FieldLabel>

                <Textarea
                  id="seo-description"
                  placeholder="Learn how JavaScript closures work with practical examples..."
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

              {/* CANONICAL URL */}
              <Field>
                <FieldLabel htmlFor="canonical-url">
                  Canonical URL
                </FieldLabel>

                <Input
                  id="canonical-url"
                  type="url"
                  placeholder="https://codewithajoydas.live/blog/..."
                  {...register("canonicalUrl")}
                />

                {errors.canonicalUrl && (
                  <FieldDescription className="text-red-500">
                    {errors.canonicalUrl.message}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>

            <FieldSeparator />

            {/* ============================= */}
            {/* SERVER MESSAGE */}
            {/* ============================= */}

            {serverError && (
              <p className="text-sm text-red-500">
                {serverError}
              </p>
            )}

            {successMessage && (
              <p className="text-sm text-green-600">
                {successMessage}
              </p>
            )}

            {/* ============================= */}
            {/* ACTIONS */}
            {/* ============================= */}

            <div className="flex justify-end gap-3 pt-6">

              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
              >
                Save draft
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Creating article..."
                  : "Publish article"}
              </Button>

            </div>

          </FieldSet>
        </form>
      </div>
    </div>
  );
}