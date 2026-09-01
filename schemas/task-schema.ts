// @/schemas/task.ts
import { z } from "zod";
import { TaskAssigneeSchema } from "@/schemas/task-assignee-schema";
import { CommentSchema } from "@/schemas/comment-schema";

export const TaskSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE", "CANCELLED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  dueDate: z.iso.datetime(),
  projectId: z.string(),
  creatorId: z.string(),
  assignees: z.array(TaskAssigneeSchema).optional(),
  comments: z.array(CommentSchema).optional(),
  createdAt: z.iso.datetime().optional(),
  updatedAt: z.iso.datetime().optional(),
});

export type Task = z.infer<typeof TaskSchema>;
