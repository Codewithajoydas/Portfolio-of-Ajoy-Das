import type { Article, Project } from "@/types/content";

type ProjectsResponse =
  | Project[]
  | {
      projects: Project[];
    };

type ArticlesResponse =
  | Article[]
  | {
      articles: Article[];
    };

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${endpoint}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export async function getProjects(): Promise<Project[]> {
  const data = await fetchApi<ProjectsResponse>(
    "/api/get-projects",
  );

  if (Array.isArray(data)) {
    return data;
  }

  return data.projects;
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | null> {
  const projects = await getProjects();

  return (
    projects.find(
      (project) =>
        project.slug === slug &&
        project.published === true,
    ) ?? null
  );
}

export async function getArticles(): Promise<Article[]> {
  const data = await fetchApi<ArticlesResponse>(
    "/api/get-articles",
  );

  if (Array.isArray(data)) {
    return data;
  }

  return data.articles;
}

export async function getArticleBySlug(
  slug: string,
): Promise<Article | null> {
  const articles = await getArticles();

  return (
    articles.find(
      (article) =>
        article.slug === slug &&
        article.published === true,
    ) ?? null
  );
}