"use client";

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

export default function ProjectPage() {
  return (
    <div className="w-full min-h-screen flex justify-center px-6 py-12">
      <div className="w-full max-w-4xl">
        <FieldSet>
          <FieldLegend>Project details</FieldLegend>

          <FieldDescription>
            These details will appear on your portfolio project page.
          </FieldDescription>

          {/* -------------------------------- */}
          {/* BASIC INFORMATION */}
          {/* -------------------------------- */}

          <FieldGroup>
            <FieldLegend>Basic information</FieldLegend>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="project-name">
                  Project name
                </FieldLabel>

                <Input
                  id="project-name"
                  name="name"
                  placeholder="Assign Meter"
                  autoComplete="off"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="project-slug">
                  Project slug
                </FieldLabel>

                <Input
                  id="project-slug"
                  name="slug"
                  placeholder="assign-meter"
                  autoComplete="off"
                  required
                />

                <FieldDescription>
                  Used for the project URL.
                </FieldDescription>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="project-type">
                  Project type
                </FieldLabel>

                <Select>
                  <SelectTrigger id="project-type">
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
              </Field>

              <Field>
                <FieldLabel htmlFor="project-role">
                  Your role
                </FieldLabel>

                <Input
                  id="project-role"
                  name="role"
                  placeholder="Full-Stack Developer"
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="short-description">
                Short description
              </FieldLabel>

              <Textarea
                id="short-description"
                name="shortDescription"
                placeholder="A short description of what this project does..."
                maxLength={200}
                rows={3}
                required
              />

              <FieldDescription>
                Keep this short. It will be used in project cards and previews.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="description">
                Full description
              </FieldLabel>

              <Textarea
                id="description"
                name="description"
                placeholder="Explain the project, its purpose, the problem it solves, and how it works..."
                rows={8}
              />
            </Field>
          </FieldGroup>

          <FieldSeparator />

          {/* -------------------------------- */}
          {/* LINKS */}
          {/* -------------------------------- */}

          <FieldGroup>
            <FieldLegend>Project links</FieldLegend>

            <FieldDescription>
              Add the external resources associated with this project.
            </FieldDescription>

            <Field>
              <FieldLabel htmlFor="github-url">
                GitHub repository
              </FieldLabel>

              <Input
                id="github-url"
                name="githubUrl"
                type="url"
                placeholder="https://github.com/username/project"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="live-url">
                Live URL
              </FieldLabel>

              <Input
                id="live-url"
                name="liveUrl"
                type="url"
                placeholder="https://example.com"
              />

              <FieldDescription>
                Leave empty if the project does not have a live deployment.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="documentation-url">
                Documentation URL
              </FieldLabel>

              <Input
                id="documentation-url"
                name="documentationUrl"
                type="url"
                placeholder="https://docs.example.com"
              />
            </Field>
          </FieldGroup>

          <FieldSeparator />

          {/* -------------------------------- */}
          {/* MEDIA */}
          {/* -------------------------------- */}

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
                name="thumbnail"
                type="url"
                placeholder="https://images.example.com/project.png"
              />

              <FieldDescription>
                Recommended aspect ratio: 16:9.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="banner">
                Banner / hero image
              </FieldLabel>

              <Input
                id="banner"
                name="banner"
                type="url"
                placeholder="https://images.example.com/project-banner.png"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="screenshots">
                Screenshots
              </FieldLabel>

              <Textarea
                id="screenshots"
                name="screenshots"
                placeholder={`https://example.com/screenshot-1.png
https://example.com/screenshot-2.png
https://example.com/screenshot-3.png`}
                rows={5}
              />

              <FieldDescription>
                Add one image URL per line.
              </FieldDescription>
            </Field>
          </FieldGroup>

          <FieldSeparator />

          {/* -------------------------------- */}
          {/* TECHNOLOGY */}
          {/* -------------------------------- */}

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
                name="techStack"
                placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL"
              />

              <FieldDescription>
                Separate technologies with commas.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="category">
                Primary technology
              </FieldLabel>

              <Select>
                <SelectTrigger id="category">
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
            </Field>
          </FieldGroup>

          <FieldSeparator />

          {/* -------------------------------- */}
          {/* STATUS */}
          {/* -------------------------------- */}

          <FieldGroup>
            <FieldLegend>Project status</FieldLegend>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="status">
                  Status
                </FieldLabel>

                <Select>
                  <SelectTrigger id="status">
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
              </Field>

              <Field>
                <FieldLabel htmlFor="year">
                  Project year
                </FieldLabel>

                <Input
                  id="year"
                  name="year"
                  type="number"
                  placeholder="2026"
                  min="2000"
                  max="2100"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field orientation="horizontal">
                <Switch id="featured" />

                <FieldContent>
                  <FieldTitle>Featured project</FieldTitle>

                  <FieldDescription>
                    Show this project prominently on the portfolio homepage.
                  </FieldDescription>
                </FieldContent>
              </Field>

              <Field orientation="horizontal">
                <Switch id="published" defaultChecked />

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

          {/* -------------------------------- */}
          {/* PROJECT CONTENT */}
          {/* -------------------------------- */}

          <FieldGroup>
            <FieldLegend>Project information</FieldLegend>

            <Field>
              <FieldLabel htmlFor="features">
                Key features
              </FieldLabel>

              <Textarea
                id="features"
                name="features"
                placeholder={`Authentication
Dashboard
Real-time notifications
Role-based access
Responsive design`}
                rows={6}
              />

              <FieldDescription>
                Add one feature per line.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="challenges">
                Challenges
              </FieldLabel>

              <Textarea
                id="challenges"
                name="challenges"
                placeholder="What technical or product challenges did you face?"
                rows={6}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="learnings">
                What you learned
              </FieldLabel>

              <Textarea
                id="learnings"
                name="learnings"
                placeholder="What did you learn while building this project?"
                rows={6}
              />
            </Field>
          </FieldGroup>

          <FieldSeparator />

          {/* -------------------------------- */}
          {/* SEO */}
          {/* -------------------------------- */}

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
                name="seoTitle"
                placeholder="Assign Meter — Attendance Management System"
                maxLength={60}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="seo-description">
                SEO description
              </FieldLabel>

              <Textarea
                id="seo-description"
                name="seoDescription"
                placeholder="Describe this project for search engines..."
                maxLength={160}
                rows={3}
              />
            </Field>
          </FieldGroup>

          {/* -------------------------------- */}
          {/* ACTIONS */}
          {/* -------------------------------- */}

          <div className="flex justify-end gap-3 pt-6">
            <Button type="button" variant="outline">
              Save as draft
            </Button>

            <Button type="submit">
              Publish project
            </Button>
          </div>
        </FieldSet>
      </div>
    </div>
  );
}