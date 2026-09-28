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

export default function ArticlePage() {
  return (
    <div className="w-full min-h-screen flex justify-center px-6 py-12">
      <div className="w-full max-w-4xl">
        <FieldSet>
          <FieldLegend>Article details</FieldLegend>

          <FieldDescription>
            Create and manage an article for your portfolio blog.
          </FieldDescription>

          {/* ============================= */}
          {/* BASIC INFORMATION */}
          {/* ============================= */}

          <FieldGroup>
            <FieldLegend>Basic information</FieldLegend>

            <Field>
              <FieldLabel htmlFor="article-title">
                Article title
              </FieldLabel>

              <Input
                id="article-title"
                name="title"
                placeholder="Understanding JavaScript Closures"
                maxLength={120}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="article-slug">
                Slug
              </FieldLabel>

              <Input
                id="article-slug"
                name="slug"
                placeholder="understanding-javascript-closures"
                required
              />

              <FieldDescription>
                This will be used in the article URL.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="article-excerpt">
                Excerpt
              </FieldLabel>

              <Textarea
                id="article-excerpt"
                name="excerpt"
                placeholder="A practical guide to understanding JavaScript closures..."
                maxLength={250}
                rows={3}
                required
              />

              <FieldDescription>
                A short summary shown on article cards and previews.
              </FieldDescription>
            </Field>
          </FieldGroup>

          <FieldSeparator />

          {/* ============================= */}
          {/* ARTICLE CONTENT */}
          {/* ============================= */}

          <FieldGroup>
            <FieldLegend>Article content</FieldLegend>

            <FieldDescription>
              Write the actual content of your article.
            </FieldDescription>

            <Field>
              <FieldLabel htmlFor="article-content">
                Content
              </FieldLabel>

              <Textarea
                id="article-content"
                name="content"
                placeholder="Start writing your article..."
                rows={20}
                required
                className="min-h-[500px]"
              />

              <FieldDescription>
                You can later replace this textarea with a Markdown or rich
                text editor.
              </FieldDescription>
            </Field>
          </FieldGroup>

          <FieldSeparator />

          {/* ============================= */}
          {/* MEDIA */}
          {/* ============================= */}

          <FieldGroup>
            <FieldLegend>Article media</FieldLegend>

            <FieldDescription>
              Images used when displaying your article.
            </FieldDescription>

            <Field>
              <FieldLabel htmlFor="cover-image">
                Cover image
              </FieldLabel>

              <Input
                id="cover-image"
                name="coverImage"
                type="url"
                placeholder="https://example.com/article-cover.png"
              />

              <FieldDescription>
                Recommended aspect ratio: 16:9.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="thumbnail">
                Thumbnail
              </FieldLabel>

              <Input
                id="thumbnail"
                name="thumbnail"
                type="url"
                placeholder="https://example.com/article-thumbnail.png"
              />
            </Field>
          </FieldGroup>

          <FieldSeparator />

          {/* ============================= */}
          {/* CLASSIFICATION */}
          {/* ============================= */}

          <FieldGroup>
            <FieldLegend>Classification</FieldLegend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="category">
                  Category
                </FieldLabel>

                <Select>
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
              </Field>

              <Field>
                <FieldLabel htmlFor="reading-time">
                  Reading time
                </FieldLabel>

                <Input
                  id="reading-time"
                  name="readingTime"
                  type="number"
                  min={1}
                  placeholder="8"
                />

                <FieldDescription>
                  Estimated reading time in minutes.
                </FieldDescription>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="tags">
                Tags
              </FieldLabel>

              <Input
                id="tags"
                name="tags"
                placeholder="javascript, closures, functions, fundamentals"
              />

              <FieldDescription>
                Separate tags with commas.
              </FieldDescription>
            </Field>
          </FieldGroup>

          <FieldSeparator />

          {/* ============================= */}
          {/* ARTICLE SETTINGS */}
          {/* ============================= */}

          <FieldGroup>
            <FieldLegend>Article settings</FieldLegend>

            <Field orientation="horizontal">
              <Switch
                id="published"
                name="published"
              />

              <FieldContent>
                <FieldTitle>Published</FieldTitle>

                <FieldDescription>
                  Make this article visible on your public portfolio.
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field orientation="horizontal">
              <Switch
                id="featured"
                name="featured"
              />

              <FieldContent>
                <FieldTitle>Featured article</FieldTitle>

                <FieldDescription>
                  Display this article prominently on your blog page.
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field orientation="horizontal">
              <Switch
                id="comments"
                name="comments"
              />

              <FieldContent>
                <FieldTitle>Enable comments</FieldTitle>

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
            <FieldLegend>References and links</FieldLegend>

            <Field>
              <FieldLabel htmlFor="source-url">
                Source / reference URL
              </FieldLabel>

              <Input
                id="source-url"
                name="sourceUrl"
                type="url"
                placeholder="https://developer.mozilla.org/..."
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="github-url">
                GitHub URL
              </FieldLabel>

              <Input
                id="github-url"
                name="githubUrl"
                type="url"
                placeholder="https://github.com/username/repository"
              />

              <FieldDescription>
                Useful when the article contains a project or code example.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="demo-url">
                Demo URL
              </FieldLabel>

              <Input
                id="demo-url"
                name="demoUrl"
                type="url"
                placeholder="https://example.com"
              />
            </Field>
          </FieldGroup>

          <FieldSeparator />

          {/* ============================= */}
          {/* SEO */}
          {/* ============================= */}

          <FieldGroup>
            <FieldLegend>SEO</FieldLegend>

            <FieldDescription>
              Search engine metadata for this article.
            </FieldDescription>

            <Field>
              <FieldLabel htmlFor="seo-title">
                SEO title
              </FieldLabel>

              <Input
                id="seo-title"
                name="seoTitle"
                placeholder="JavaScript Closures Explained | Ajoy Das"
                maxLength={60}
              />

              <FieldDescription>
                Keep it concise and descriptive.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="seo-description">
                SEO description
              </FieldLabel>

              <Textarea
                id="seo-description"
                name="seoDescription"
                placeholder="Learn how JavaScript closures work with practical examples..."
                maxLength={160}
                rows={3}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="canonical-url">
                Canonical URL
              </FieldLabel>

              <Input
                id="canonical-url"
                name="canonicalUrl"
                type="url"
                placeholder="https://codewithajoydas.live/blog/..."
              />
            </Field>
          </FieldGroup>

          <FieldSeparator />

          {/* ============================= */}
          {/* ACTIONS */}
          {/* ============================= */}

          <div className="flex justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
            >
              Save draft
            </Button>

            <Button type="submit">
              Publish article
            </Button>
          </div>
        </FieldSet>
      </div>
    </div>
  );
}