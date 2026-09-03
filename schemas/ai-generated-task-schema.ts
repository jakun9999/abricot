import { z } from "zod";
import { TaskSchema } from "@/schemas/task-schema";

const taskCreateFields = TaskSchema.pick({
  title: true,
  description: true,
  priority: true,
  dueDate: true,
});

/**
 * Sous-ensemble du schéma tâche utilisé pour la génération LLM.
 * Les champs d'identité (id, projectId, creatorId) et les relations
 * (assignees, comments, status) sont renseignés à la création.
 */
export const AiGeneratedTaskSchema = z.object({
  title: taskCreateFields.shape.title,
  description: z.string(),
  priority: taskCreateFields.shape.priority,
  dueDate: z.string(),
});

export const AiGeneratedTasksResponseSchema = z.object({
  tasks: z.array(AiGeneratedTaskSchema),
});

export type AiGeneratedTask = z.infer<typeof AiGeneratedTaskSchema>;

export function normalizeDueDate(value: string): string {
  if (!value?.trim()) return "";

  const trimmed = value.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [year, month, day] = trimmed.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day, 12, 0, 0)).toISOString();
  }

  const parsed = new Date(trimmed);
  return Number.isFinite(parsed.getTime()) ? parsed.toISOString() : "";
}
