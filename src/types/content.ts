export type ContentType = "youtube" | "twitter" | "note" | "reminder";

export interface BaseContent {
  _id: string;
  type: ContentType;
  title: string;
  userId: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LinkContent extends BaseContent {
  type: "youtube" | "twitter";
  link: string;
}

export interface NoteContent extends BaseContent {
  type: "note";
  content: string;
}

export interface ReminderContent extends BaseContent {
  type: "reminder";
  content: string;
  dueDate: string; // ISO date string
  isCompleted: boolean;
}

export type Content = LinkContent | NoteContent | ReminderContent;
