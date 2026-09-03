import { z } from "zod";
import { TaskSchema } from "@/schemas/task-schema";

const taskPriority = TaskSchema.shape.priority;

/**
 * Sous-ensemble du schéma tâche utilisé pour la génération LLM.
 * Les champs d'identité (id, projectId, creatorId) et les relations
 * (assignees, comments, status) sont renseignés à la création.
 */
export const AiGeneratedTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().max(2000),
  priority: taskPriority,
  dueDate: z.string(),
});

export const AiGeneratedTasksResponseSchema = z.object({
  tasks: z.array(AiGeneratedTaskSchema).min(1).max(8),
});

export type AiGeneratedTask = z.infer<typeof AiGeneratedTaskSchema>;

/**
 * Normalise une échéance LLM (`YYYY-MM-DD` ou ISO) vers ISO UTC à midi.
 * Midi UTC évite le décalage d’un jour quand on parse une date « date-only » en Europe.
 *
 * @param value - Date brute renvoyée par le modèle.
 * @returns ISO string, ou `""` si invalide.
 */
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
