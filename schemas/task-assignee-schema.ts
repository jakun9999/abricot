// @/schemas/task-assignee.ts
import { z } from "zod";
import { UserSchema } from "@/schemas/user-schema";

export const TaskAssigneeSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  taskId: z.string(),
  user: UserSchema,
  assignedAt: z.iso.datetime(),
});

export type TaskAssignee = z.infer<typeof TaskAssigneeSchema>;
