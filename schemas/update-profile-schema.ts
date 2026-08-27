import { z } from "zod";
import { PasswordComplexitySchema } from "./password-complexity-schema";

// Schéma du formulaire (name, email, newPassword) — utilisé avec zodResolver dans AccountForm
export const UpdateProfileSchema = z.object({
  name: z.string().min(2),
  email: z.email("Email format is incorrect"),
  newPassword: PasswordComplexitySchema.optional().or(z.literal("")),
});

// Schéma du payload complet envoyé à /api/profile — inclut currentPassword,
// requis uniquement si newPassword est renseigné
export const UpdateProfilePayloadSchema = UpdateProfileSchema.extend({
  currentPassword: z.string().optional(),
}).refine((data) => !data.newPassword || Boolean(data.currentPassword), {
  message: "Le mot de passe actuel est requis pour changer de mot de passe",
  path: ["currentPassword"],
});

export type ProfileFormData = z.infer<typeof UpdateProfileSchema>;
export type UpdateProfilePayload = z.infer<typeof UpdateProfilePayloadSchema>;
