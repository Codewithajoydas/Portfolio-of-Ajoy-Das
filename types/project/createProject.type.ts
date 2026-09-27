export type ProjectStatus =
  | "planning"
  | "in-progress"
  | "completed"
  | "archived";

export type ProjectType =
  | "personal"
  | "client"
  | "open-source"
  | "practice";

export interface CreateProjectInput {
  name: string;
  description: string;

  thumbnail?: string;
  link?: string;
  github?: string;

  tags: string[];
  technologies: string[];

  status: ProjectStatus;
  type: ProjectType;

  startDate: string;
}