import z from "zod";
import { UserSchema } from "@/schemas/user-schema";

/** Membre d’un projet. `OWNER` / `ADMIN` peuvent modifier le projet. */
export const ProjectMemberSchema = z.object({
  id: z.string().optional(),
  role: z.enum(["OWNER", "ADMIN", "CONTRIBUTOR"]),
  user: UserSchema,
  joinedAt: z.iso.datetime(),
});

export type ProjectMember = z.infer<typeof ProjectMemberSchema>;
