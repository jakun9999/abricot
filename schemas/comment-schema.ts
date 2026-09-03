import { z } from "zod";
import { UserSchema } from "@/schemas/user-schema";

/** Commentaire de tâche, avec auteur dénormalisé. */
export const CommentSchema = z.object({
  id: z.string().optional(),
  content: z.string(),
  taskId: z.string().optional(),
  authorId: z.string(),
  author: UserSchema,
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type Comment = z.infer<typeof CommentSchema>;
