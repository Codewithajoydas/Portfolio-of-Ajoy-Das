"use client";

import { useEffect, useState } from "react";
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

import { projectSchema } from "@/validators/projects.validator";

import {
  Pencil,
  Trash2,
  X,
  Plus,
  Loader2,
} from "lucide-react";

type ProjectInput = z.input<typeof projectSchema>;

type Project = ProjectInput & {
  id?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function ProjectPage() {
  const [openProjectCreationForm, setOpenProjectCreationForm] =
    useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(
    null
  );
  const [editingProjectId, setEditingProjectId] = useState<string | null>(
    null
  );

  const [projectToDelete, setProjectToDelete] =
    useState<Project | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectInput>({
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

  // eslint-disable-next-line react-hooks/incompatible-library
  const featured = watch("featured");
  const published = watch("published");
  const type = watch("type");
  const category = watch("category");
  const status = watch("status");
  const screenshots = watch("screenshots") ?? [];
  const techStack = watch("techStack") ?? [];
  const features = watch("features") ?? [];

  async function fetchProjects() {
    try {
      setLoadingProjects(true);

      const response = await fetch("/api/get-projects", {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Failed to fetch projects");
      }

      setProjects(result?.projects ?? result ?? []);
    } catch (error) {
      console.error("Fetch projects error:", error);

      toast.add({
        type: "error",
        title: "Failed to load projects",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong while loading projects.",
      });
    } finally {
      setLoadingProjects(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function onSubmit(data: ProjectInput) {
    try {
      const isEditing = Boolean(editingProjectId);

      const url = isEditing
        ? `/api/projects/${editingProjectId}`
        : "/api/create-project";

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
            `Failed to ${isEditing ? "update" : "create"} project`
        );
      }

      await fetchProjects();

      toast.add({
        type: "success",
        title: isEditing
          ? "Project updated"
          : "Project created",
        description: isEditing
          ? "The project has been updated successfully."
          : "The project has been created successfully.",
      });

      reset();
      setEditingProjectId(null);
      setOpenProjectCreationForm(false);
    } catch (error) {
      console.error(
        `${editingProjectId ? "Update" : "Create"} project error:`,
        error
      );

      toast.add({
        type: "error",
        title: editingProjectId
          ? "Failed to update project"
          : "Failed to create project",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      });
    }
  }

  function handleEditProject(project: Project) {
    const projectId = project.id ?? project._id;

    if (!projectId) {
      toast.add({
        type: "error",
        title: "Project ID missing",
        description: "Unable to edit this project.",
      });
      return;
    }

    setEditingProjectId(projectId);

    reset({
      name: project.name ?? "",
      slug: project.slug ?? "",
      type: project.type ?? "web-app",
      role: project.role ?? "",
      shortDescription: project.shortDescription ?? "",
      description: project.description ?? "",
      githubUrl: project.githubUrl ?? "",
      liveUrl: project.liveUrl ?? "",
      documentationUrl: project.documentationUrl ?? "",
      thumbnail: project.thumbnail ?? "",
      banner: project.banner ?? "",
      screenshots: project.screenshots ?? [],
      techStack: project.techStack ?? [],
      category: project.category ?? "nextjs",
      status: project.status ?? "development",
      year: project.year ?? new Date().getFullYear(),
      featured: project.featured ?? false,
      published: project.published ?? true,
      features: project.features ?? [],
      challenges: project.challenges ?? "",
      learnings: project.learnings ?? "",
      seoTitle: project.seoTitle ?? "",
      seoDescription: project.seoDescription ?? "",
    });

    setOpenProjectCreationForm(true);
  }

  function handleDeleteProject(project: Project) {
    const projectId = project.id ?? project._id;

    if (!projectId) {
      toast.add({
        type: "error",
        title: "Project ID missing",
        description: "Unable to delete this project.",
      });
      return;
    }

    setProjectToDelete(project);
  }

  async function confirmDeleteProject() {
    if (!projectToDelete) {
      return;
    }

    const projectId =
      projectToDelete.id ?? projectToDelete._id;

    if (!projectId) {
      return;
    }

    try {
      setDeletingProjectId(projectId);

      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || "Failed to delete project"
        );
      }

      setProjects((currentProjects) =>
        currentProjects.filter(
          (item) => (item.id ?? item._id) !== projectId
        )
      );

      if (editingProjectId === projectId) {
        reset();
        setEditingProjectId(null);
        setOpenProjectCreationForm(false);
      }

      setProjectToDelete(null);

      toast.add({
        type: "success",
        title: "Project deleted",
        description: "The project has been deleted successfully.",
      });
    } catch (error) {
      console.error("Delete project error:", error);

      toast.add({
        type: "error",
        title: "Failed to delete project",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      });
    } finally {
      setDeletingProjectId(null);
    }
  }

  function handleCloseForm() {
    reset();
    setEditingProjectId(null);
    setOpenProjectCreationForm(false);
  }

  function handleCreateProject() {
    reset();
    setEditingProjectId(null);
    setOpenProjectCreationForm(true);
  }

  return (
    <div className="relative min-h-screen w-full px-6 py-12">
      <AlertDialog
        open={Boolean(projectToDelete)}
        onOpenChange={(open) => {
          if (!open && !deletingProjectId) {
            setProjectToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete project?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                {projectToDelete?.name}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={Boolean(deletingProjectId)}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={confirmDeleteProject}
              disabled={Boolean(deletingProjectId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletingProjectId ? (
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

      {openProjectCreationForm && (
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
                {editingProjectId
                  ? "Edit project"
                  : "Project details"}
              </FieldLegend>

              <FieldDescription>
                {editingProjectId
                  ? "Update your project details."
                  : "These details will appear on your portfolio project page."}
              </FieldDescription>

              <FieldGroup>
                <FieldLegend>Basic information</FieldLegend>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                  <Field>
                    <FieldLabel>Project type</FieldLabel>

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
                    Keep this short. It will be used in project cards
                    and previews.
                  </FieldDescription>

                  {errors.shortDescription && (
                    <FieldDescription className="text-red-500">
                      {errors.shortDescription.message}
                    </FieldDescription>
                  )}
                </Field>

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

              <FieldGroup>
                <FieldLegend>Project links</FieldLegend>

                <FieldDescription>
                  Add the external resources associated with this
                  project.
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
                    Leave empty if the project does not have a live
                    deployment.
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

              <FieldGroup>
                <FieldLegend>Project media</FieldLegend>

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
                    value={screenshots.join("\n")}
                    onChange={(event) => {
                      const values = event.target.value
                        .split("\n")
                        .map((url) => url.trim())
                        .filter(Boolean);

                      setValue("screenshots", values, {
                        shouldValidate: true,
                      });
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

              <FieldGroup>
                <FieldLegend>Technology</FieldLegend>

                <FieldDescription>
                  Technologies and tools used to build this project.
                </FieldDescription>

                <Field>
                  <FieldLabel htmlFor="tech-stack">
                    Tech stack
                  </FieldLabel>

                  <Input
                    id="tech-stack"
                    placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL"
                    value={techStack.join(", ")}
                    onChange={(event) => {
                      const values = event.target.value
                        .split(",")
                        .map((technology) => technology.trim())
                        .filter(Boolean);

                      setValue("techStack", values, {
                        shouldValidate: true,
                      });
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

              <FieldGroup>
                <FieldLegend>Project status</FieldLegend>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field>
                    <FieldLabel>Status</FieldLabel>

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
                  <Field orientation="horizontal">
                    <Switch
                      checked={featured}
                      onCheckedChange={(checked) =>
                        setValue("featured", checked, {
                          shouldValidate: true,
                        })
                      }
                    />

                    <FieldContent>
                      <FieldTitle>
                        Featured project
                      </FieldTitle>

                      <FieldDescription>
                        Show this project prominently on the portfolio
                        homepage.
                      </FieldDescription>
                    </FieldContent>
                  </Field>

                  <Field orientation="horizontal">
                    <Switch
                      checked={published}
                      onCheckedChange={(checked) =>
                        setValue("published", checked, {
                          shouldValidate: true,
                        })
                      }
                    />

                    <FieldContent>
                      <FieldTitle>Published</FieldTitle>

                      <FieldDescription>
                        Make this project visible on your portfolio.
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                </div>
              </FieldGroup>

              <FieldSeparator />

              <FieldGroup>
                <FieldLegend>Project information</FieldLegend>

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
                    value={features.join("\n")}
                    onChange={(event) => {
                      const values = event.target.value
                        .split("\n")
                        .map((feature) => feature.trim())
                        .filter(Boolean);

                      setValue("features", values, {
                        shouldValidate: true,
                      });
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

              <FieldGroup>
                <FieldLegend>SEO</FieldLegend>

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

              <div className="mb-4 flex justify-end gap-3 pt-6">
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
                      {editingProjectId
                        ? "Updating..."
                        : "Creating..."}
                    </>
                  ) : editingProjectId ? (
                    "Update project"
                  ) : (
                    "Publish project"
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
              Projects
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage all projects in your portfolio.
            </p>
          </div>

          <Button onClick={()=>{
            reset();
            handleCreateProject();
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Add project
          </Button>
        </div>

        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loadingProjects ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Loading projects...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : projects.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <p className="text-muted-foreground">
                        No projects created yet.
                      </p>

                      <Button
                        size="sm"
                        onClick={handleCreateProject}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create your first project
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => {
                  const projectId =
                    project.id ?? project._id ?? "";

                  return (
                    <TableRow key={projectId}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {project.name}
                          </span>

                          <span className="text-xs text-muted-foreground">
                            /{project.slug}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span className="capitalize">
                          {project.type?.replace("-", " ")}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className="capitalize">
                          {project.category}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize">
                          {project.status?.replace("-", " ")}
                        </span>
                      </TableCell>

                      <TableCell>{project.year}</TableCell>

                      <TableCell>
                        <span
                          className={
                            project.published
                              ? "text-green-600"
                              : "text-muted-foreground"
                          }
                        >
                          {project.published ? "Yes" : "No"}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span
                          className={
                            project.featured
                              ? "text-blue-600"
                              : "text-muted-foreground"
                          }
                        >
                          {project.featured ? "Yes" : "No"}
                        </span>
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            title="Edit project"
                            onClick={() =>
                              handleEditProject(project)
                            }
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="destructive"
                            size="icon"
                            title="Delete project"
                            disabled={
                              deletingProjectId === projectId
                            }
                            onClick={() =>
                              handleDeleteProject(project)
                            }
                          >
                            {deletingProjectId === projectId ? (
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