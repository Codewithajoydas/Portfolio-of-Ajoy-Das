export type DashboardContentStatus = "published" | "draft";
export type DashboardContentType = "project" | "article";

export type DashboardStats = {
  projects: number;
  articles: number;
  published: number;
  drafts: number;
};

export type ContentSummary = {
  total: number;
  published: number;
  drafts: number;
};

export type ContentOverview = {
  projects: ContentSummary;
  articles: ContentSummary;
};

export type RecentContentItem = {
  id: string;
  title: string;
  type: DashboardContentType;
  status: DashboardContentStatus;
  updatedAt: string;
  slug?: string;
};

export type RecentActivityItem = {
  id: string;
  title: string;
  description: string;
  type: DashboardContentType;
  timestamp: string;
};

export type DashboardResponse = {
  success: true;
  data: {
    stats: DashboardStats;
    contentOverview: ContentOverview;
    recentContent: RecentContentItem[];
    recentActivity: RecentActivityItem[];
  };
};
