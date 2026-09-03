import z from "zod";
import { UserSchema } from "@/schemas/user-schema";
import { ProjectMemberSchema } from "@/schemas/project-member-schema";

/** Projet avec propriétaire et membres. `id` optionnel à la création. */
export const ProjectSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  ownerId: z.string(),
  owner: UserSchema,
  members: z.array(ProjectMemberSchema),
  createdAt: z.iso.datetime().optional(),
  updatedAt: z.iso.datetime().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
