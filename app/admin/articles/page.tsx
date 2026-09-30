"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { toast } from "@/components/ui/toast";

import {
  Pencil,
  Plus,
  Trash2,
  X,
  Loader2,
} from "lucide-react";

import {
  articleSchema,
  type ArticleFormData,
} from "@/validators/article.validator";

type Article = ArticleFormData & {
  id?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function ArticlePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  const [openArticleForm, setOpenArticleForm] = useState(false);

  const [editingArticleId, setEditingArticleId] = useState<string | null>(
    null
  );

  const [articleToDelete, setArticleToDelete] =
    useState<Article | null>(null);

  const [deletingArticleId, setDeletingArticleId] =
    useState<string | null>(null);

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

  async function fetchArticles() {
    try {
      setLoadingArticles(true);

      const response = await fetch("/api/get-articles", {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || "Failed to fetch articles"
        );
      }

      setArticles(result?.articles ?? result ?? []);
    } catch (error) {
      console.error("Fetch articles error:", error);

      toast.add({
        type: "error",
        title: "Failed to load articles",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong while loading articles.",
      });
    } finally {
      setLoadingArticles(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchArticles();
  }, []);

  async function onSubmit(data: ArticleFormData) {
    try {
      const isEditing = Boolean(editingArticleId);

      const url = isEditing
        ? `/api/articles/${editingArticleId}`
        : "/api/create-article";

      const method = isEditing ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
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
            `Failed to ${
              isEditing ? "update" : "create"
            } article`
        );
      }

      await fetchArticles();

      toast.add({
        type: "success",
        title: isEditing
          ? "Article updated"
          : "Article created",
        description: isEditing
          ? "The article has been updated successfully."
          : "The article has been created successfully.",
      });

      reset();

      setEditingArticleId(null);
      setOpenArticleForm(false);
    } catch (error) {
      console.error(
        `${editingArticleId ? "Update" : "Create"} article error:`,
        error
      );

      toast.add({
        type: "error",
        title: editingArticleId
          ? "Failed to update article"
          : "Failed to create article",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      });
    }
  }

  function handleCreateArticle() {
    reset();

    setEditingArticleId(null);
    setOpenArticleForm(true);
  }

  function handleCloseForm() {
    reset();

    setEditingArticleId(null);
    setOpenArticleForm(false);
  }

  function handleEditArticle(article: Article) {
    const articleId = article.id ?? article._id;

    if (!articleId) {
      toast.add({
        type: "error",
        title: "Article ID missing",
        description: "Unable to edit this article.",
      });

      return;
    }

    setEditingArticleId(articleId);

    reset({
      title: article.title ?? "",
      slug: article.slug ?? "",
      excerpt: article.excerpt ?? "",
      content: article.content ?? "",

      coverImage: article.coverImage ?? "",
      thumbnail: article.thumbnail ?? "",

      category: article.category ?? "other",
      readingTime: article.readingTime,
      tags: article.tags ?? "",

      published: article.published ?? false,
      featured: article.featured ?? false,
      comments: article.comments ?? true,

      sourceUrl: article.sourceUrl ?? "",
      githubUrl: article.githubUrl ?? "",
      demoUrl: article.demoUrl ?? "",

      seoTitle: article.seoTitle ?? "",
      seoDescription: article.seoDescription ?? "",
      canonicalUrl: article.canonicalUrl ?? "",
    });

    setOpenArticleForm(true);
  }

  function handleDeleteArticle(article: Article) {
    const articleId = article.id ?? article._id;

    if (!articleId) {
      toast.add({
        type: "error",
        title: "Article ID missing",
        description: "Unable to delete this article.",
      });

      return;
    }

    setArticleToDelete(article);
  }

  async function confirmDeleteArticle() {
    if (!articleToDelete) {
      return;
    }

    const articleId =
      articleToDelete.id ?? articleToDelete._id;

    if (!articleId) {
      return;
    }

    try {
      setDeletingArticleId(articleId);

      const response = await fetch(
        `/api/articles/${articleId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || "Failed to delete article"
        );
      }

      setArticles((currentArticles) =>
        currentArticles.filter(
          (article) =>
            (article.id ?? article._id) !== articleId
        )
      );

      if (editingArticleId === articleId) {
        reset();

        setEditingArticleId(null);
        setOpenArticleForm(false);
      }

      setArticleToDelete(null);

      toast.add({
        type: "success",
        title: "Article deleted",
        description:
          "The article has been deleted successfully.",
      });
    } catch (error) {
      console.error("Delete article error:", error);

      toast.add({
        type: "error",
        title: "Failed to delete article",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      });
    } finally {
      setDeletingArticleId(null);
    }
  }

  return (
    <div className="relative min-h-screen w-full px-6 py-12">
      <AlertDialog
        open={Boolean(articleToDelete)}
        onOpenChange={(open) => {
          if (!open && !deletingArticleId) {
            setArticleToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete article?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                {articleToDelete?.title}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={Boolean(deletingArticleId)}
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={confirmDeleteArticle}
              disabled={Boolean(deletingArticleId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletingArticleId ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {openArticleForm && (
        <div className="absolute inset-0 z-50 mx-auto w-full max-w-4xl overflow-y-auto bg-white p-10">
          <Button
            variant="outline"
            onClick={handleCloseForm}
            className="absolute right-5 top-5"
            type="button"
          >
            <X />
          </Button>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet>
              <FieldLegend>
                {editingArticleId
                  ? "Edit article"
                  : "Article details"}
              </FieldLegend>

              <FieldDescription>
                {editingArticleId
                  ? "Update your article details."
                  : "Create an article for your portfolio blog."}
              </FieldDescription>

              <FieldGroup>
                <FieldLegend>
                  Basic information
                </FieldLegend>

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
                    A short summary shown on article cards
                    and previews.
                  </FieldDescription>

                  {errors.excerpt && (
                    <FieldDescription className="text-red-500">
                      {errors.excerpt.message}
                    </FieldDescription>
                  )}
                </Field>
              </FieldGroup>

              <FieldSeparator />

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
                    You can later replace this textarea with a
                    Markdown or rich text editor.
                  </FieldDescription>

                  {errors.content && (
                    <FieldDescription className="text-red-500">
                      {errors.content.message}
                    </FieldDescription>
                  )}
                </Field>
              </FieldGroup>

              <FieldSeparator />

              <FieldGroup>
                <FieldLegend>
                  Article media
                </FieldLegend>

                <FieldDescription>
                  Images used when displaying your article.
                </FieldDescription>

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

              <FieldGroup>
                <FieldLegend>
                  Classification
                </FieldLegend>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field>
                    <FieldLabel>
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
                          <SelectTrigger>
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

              <FieldGroup>
                <FieldLegend>
                  Article settings
                </FieldLegend>

                <Controller
                  name="published"
                  control={control}
                  render={({ field }) => (
                    <Field orientation="horizontal">
                      <Switch
                        id="published"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />

                      <FieldContent>
                        <FieldTitle>
                          Published
                        </FieldTitle>

                        <FieldDescription>
                          Make this article visible on your
                          public portfolio.
                        </FieldDescription>
                      </FieldContent>
                    </Field>
                  )}
                />

                <Controller
                  name="featured"
                  control={control}
                  render={({ field }) => (
                    <Field orientation="horizontal">
                      <Switch
                        id="featured"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />

                      <FieldContent>
                        <FieldTitle>
                          Featured article
                        </FieldTitle>

                        <FieldDescription>
                          Display this article prominently on
                          your blog page.
                        </FieldDescription>
                      </FieldContent>
                    </Field>
                  )}
                />

                <Controller
                  name="comments"
                  control={control}
                  render={({ field }) => (
                    <Field orientation="horizontal">
                      <Switch
                        id="comments"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />

                      <FieldContent>
                        <FieldTitle>
                          Enable comments
                        </FieldTitle>

                        <FieldDescription>
                          Allow readers to comment on this
                          article.
                        </FieldDescription>
                      </FieldContent>
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldSeparator />

              <FieldGroup>
                <FieldLegend>
                  References and links
                </FieldLegend>

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
                    Useful when the article contains a project
                    or code example.
                  </FieldDescription>

                  {errors.githubUrl && (
                    <FieldDescription className="text-red-500">
                      {errors.githubUrl.message}
                    </FieldDescription>
                  )}
                </Field>

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

              <FieldGroup>
                <FieldLegend>
                  SEO
                </FieldLegend>

                <FieldDescription>
                  Search engine metadata for this article.
                </FieldDescription>

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

              <div className="flex justify-end gap-3 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={handleCloseForm}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editingArticleId
                        ? "Updating..."
                        : "Creating..."}
                    </>
                  ) : editingArticleId ? (
                    "Update article"
                  ) : (
                    "Publish article"
                  )}
                </Button>
              </div>
            </FieldSet>
          </form>
        </div>
      )}

      <div className="flex min-h-screen flex-col gap-6">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white py-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Articles
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage all articles in your portfolio.
            </p>
          </div>

          <Button onClick={handleCreateArticle}>
            <Plus className="mr-2 h-4 w-4" />
            Add article
          </Button>
        </div>

        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Article</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Reading Time</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loadingArticles ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>
                        Loading articles...
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : articles.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <p className="text-muted-foreground">
                        No articles created yet.
                      </p>

                      <Button
                        size="sm"
                        onClick={handleCreateArticle}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create your first article
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                articles.map((article) => {
                  const articleId =
                    article.id ??
                    article._id ??
                    "";

                  return (
                    <TableRow key={articleId}>
                      <TableCell>
                        <div className="flex max-w-[320px] flex-col">
                          <span className="truncate font-medium">
                            {article.title}
                          </span>

                          <span className="truncate text-xs text-muted-foreground">
                            /{article.slug}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span className="capitalize">
                          {article.category?.replace(
                            "-",
                            " "
                          )}
                        </span>
                      </TableCell>

                      <TableCell>
                        {article.readingTime
                          ? `${article.readingTime} min`
                          : "-"}
                      </TableCell>

                      <TableCell>
                        <span
                          className={
                            article.published
                              ? "text-green-600"
                              : "text-muted-foreground"
                          }
                        >
                          {article.published
                            ? "Yes"
                            : "No"}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span
                          className={
                            article.featured
                              ? "text-blue-600"
                              : "text-muted-foreground"
                          }
                        >
                          {article.featured
                            ? "Yes"
                            : "No"}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span
                          className={
                            article.comments
                              ? "text-green-600"
                              : "text-muted-foreground"
                          }
                        >
                          {article.comments
                            ? "Enabled"
                            : "Disabled"}
                        </span>
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            title="Edit article"
                            onClick={() =>
                              handleEditArticle(article)
                            }
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="destructive"
                            size="icon"
                            title="Delete article"
                            disabled={
                              deletingArticleId ===
                              articleId
                            }
                            onClick={() =>
                              handleDeleteArticle(article)
                            }
                          >
                            {deletingArticleId ===
                            articleId ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}