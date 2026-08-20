import { User } from "@/types/user";

/** Represent a assigned user for a specific task */
export interface TaskAssignee {
  /** TaskAssignee unique ID (optional, can be provided by backend at creation) */
  id?: string;

  /** Unique user ID assigned to the task */
  userId: string;

  /** Unique Task ID attached to the assignee */
  taskId: string;

  /** User details in a User object */
  user: User;

  /** Assignation date in ISO format (ex: "2026-08-20T07:24:38.904Z"). */
  assignedAt: string;
}
