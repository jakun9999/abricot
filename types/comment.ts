import { User } from "@/schemas/user";

/**
 * Represent a comment, always attached to a task.
 */
export interface Comment {
  /** Comment unique ID (optional, can be provided by backend at creation) */
  id?: string;

  /** Comment text content. */
  content: string;

  /** Task above the comment. */
  taskId?: string;

  /** User unique ID who created the comment */
  authorId: string;

  /** Author details in a User object */
  author: User;

  /** Comment creation date in ISO format (ex: "2026-08-20T07:24:38.904Z"). */
  createdAt?: string;

  /** Comment update date in ISO format (ex: "2026-08-20T07:24:38.904Z"). */
  updatedAt?: string;
}
