export type LangCode = "en" | "es" | "fr" | "de" | "ja" | "pt";

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon string
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ExampleCase {
  input: string;
  output: string;
}

export interface Tool {
  id: string;
  name: string;
  category: string; // matches Category.id
  description: string;
  icon: string; // Lucide icon
  seoDescription: string;
  seoKeywords: string[];
  steps: string[];
  examples?: ExampleCase[];
  faqs?: FAQ[];
  isAi?: boolean;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  createdAt: string;
  readingTime: string;
}

export interface AdZone {
  id: string;
  name: string;
  code: string;
  enabled: boolean;
  device: "all" | "desktop" | "mobile";
}

export interface AffiliateLink {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  network: "amazon" | "impact" | "cj" | "shareasale" | "custom";
}

export interface UserRating {
  toolId: string;
  rating: number; // 1-5
  count: number;
}

export interface ToolComment {
  id: string;
  toolId: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export interface FeedbackSubmission {
  id: string;
  type: "feedback" | "bug" | "tool_request";
  email: string;
  message: string;
  timestamp: string;
}

export interface TrafficStat {
  date: string;
  visitors: number;
  devices: { desktop: number; mobile: number; tablet: number };
  countries: { code: string; count: number }[];
  pages: { path: string; count: number }[];
}
