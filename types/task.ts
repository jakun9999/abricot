import { Comment } from "@/types/comment";
import { TaskAssignee } from "@/types/task-assignee";

/**
 * Represent a single task linked to a project.
 */
export interface Task {
  /** Unique task ID (optional, ID can be obtained at task creation on backend side). */
  id?: string;

  /** Task title. */
  title: string;

  /** Task description (optional). */
  description?: string;

  /** Possible task status. */
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";

  /** Task priority level */
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";

  /** Task due date in ISO format (ex: "2026-08-20T07:24:38.904Z"). */
  dueDate: string;

  /** Task's project unique ID */
  projectId: string;

  /** User unique ID who created the task */
  creatorId: string;

  /** Users who are assigned to the task */
  assignees?: TaskAssignee[];

  /** Comments attached to the task */
  comments?: Comment[];

  /** Task creation date in ISO format (ex: "2026-08-20T07:24:38.904Z"). */
  createdAt?: string;

  /** Task update date in ISO format (ex: "2026-08-20T07:24:38.904Z"). */
  updatedAt?: string;
}
