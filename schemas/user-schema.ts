import { z } from "zod";

/** Utilisateur exposé par l’API (jamais de mot de passe). */
export const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  createdAt: z.iso.datetime().optional(),
  updatedAt: z.iso.datetime().optional(),
});

export type User = z.infer<typeof UserSchema>;
