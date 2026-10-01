// import type { Article, Project } from "@/types/content";

// const SITE_URL =
//   process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
//   "http://localhost:3000";

// type ProjectsResponse =
//   | Project[]
//   | {
//       projects: Project[];
//     };

// type ArticlesResponse =
//   | Article[]
//   | {
//       articles: Article[];
//     };

// async function fetchApi<T>(endpoint: string): Promise<T> {
//   const url = `${SITE_URL}${endpoint}`;

//   try {
//     const response = await fetch(url, {
//       next: {
//         revalidate: 60,
//       },
//     });

//     const contentType = response.headers.get("content-type") ?? "";

//     if (!response.ok) {
//       const errorText = await response.text().catch(() => "");

//       throw new Error(
//         `API request failed: ${response.status} ${response.statusText}${
//           errorText ? ` - ${errorText.slice(0, 300)}` : ""
//         }`,
//       );
//     }

//     if (!contentType.includes("application/json")) {
//       const responseText = await response.text().catch(() => "");

//       throw new Error(
//         `Expected JSON from ${url}, but received ${
//           contentType || "unknown content type"
//         }${responseText ? ` - ${responseText.slice(0, 300)}` : ""}`,
//       );
//     }

//     return (await response.json()) as T;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(
//         `Failed to fetch ${endpoint}: ${error.message}`,
//         {
//           cause: error,
//         },
//       );
//     }

//     throw new Error(`Failed to fetch ${endpoint}`);
//   }
// }

// export async function getProjects(): Promise<Project[]> {
//   const data = await fetchApi<ProjectsResponse>(
//     "/api/get-projects",
//   );

//   if (Array.isArray(data)) {
//     return data;
//   }

//   if (data && Array.isArray(data.projects)) {
//     return data.projects;
//   }

//   return [];
// }

// export async function getProjectBySlug(
//   slug: string,
// ): Promise<Project | null> {
//   try {
//     const projects = await getProjects();

//     return (
//       projects.find(
//         (project) =>
//           project.slug === slug &&
//           project.published === true,
//       ) ?? null
//     );
//   } catch (error) {
//     console.error(
//       `Failed to get project "${slug}":`,
//       error,
//     );

//     return null;
//   }
// }

// export async function getArticles(): Promise<Article[]> {
//   const data = await fetchApi<ArticlesResponse>(
//     "/api/get-articles",
//   );

//   if (Array.isArray(data)) {
//     return data;
//   }

//   if (data && Array.isArray(data.articles)) {
//     return data.articles;
//   }

//   return [];
// }

// export async function getArticleBySlug(
//   slug: string,
// ): Promise<Article | null> {
//   try {
//     const response = await fetch("/api/get-articles", {
//   method: "GET",
//   credentials: "include",
//   cache: "no-store",
// });

// const data = await response.json();

// const articles = Array.isArray(data)
//   ? data
//   : data?.articles ?? [];

// const article = articles.find(
//   (item) =>
//     item?.slug === slug &&
//     item?.published === true
// );

//     return (
//       articles.find(
//         (article) =>
//           article.slug === slug &&
//           article.published === true,
//       ) ?? null
//     );
//   } catch (error) {
//     console.error(
//       `Failed to get article "${slug}":`,
//       error,
//     );

//     return null;
//   }
// }
