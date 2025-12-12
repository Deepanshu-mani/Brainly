export type ContentType = "youtube" | "twitter" | "note" | "website";

export const CONTENT_TYPES: ContentType[] = [
  "youtube",
  "twitter",
  "note",
  "website",
];

export type ProcessingStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed";

export interface WebsiteMetadata {
  title?: string;
  description: string;
  favicon: string;
  domain: string;
  screenshot: string;
}

export interface BaseContent {
  _id: string;
  type: ContentType;
  userId: string;
  tags: string[];
  content?: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
  // AI-enhanced fields
  summary?: string;
  keywords?: string[];
  embedding?: number[];
  // Processing status
  processingStatus?: ProcessingStatus;
  processingError?: string;
  score?: number;
}

export interface LinkContent extends BaseContent {
  type: "youtube" | "twitter";
  link: string;
}

export interface NoteContent extends BaseContent {
  type: "note";
  title: string;
  content: string;
}

export interface WebsiteContent extends BaseContent {
  type: "website";
  link: string;
  websiteMetadata: WebsiteMetadata;
}

export type Content = LinkContent | NoteContent | WebsiteContent;

export interface SearchResult {
  content: Content;
  similarity: number;
}

export interface SearchFilters {
  query?: string;
  type?: ContentType;
  tags?: string[];
  limit?: number;
}
