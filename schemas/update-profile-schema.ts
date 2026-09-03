import { z } from "zod";
import { PasswordComplexitySchema } from "./password-complexity-schema";

/** Champs du formulaire compte. `newPassword` vide = ne pas changer le mot de passe. */
export const UpdateProfileSchema = z.object({
  name: z.string().min(2),
  email: z.email("Email format is incorrect"),
  newPassword: PasswordComplexitySchema.optional().or(z.literal("")),
});

/**
 * Payload `POST /api/profile`. `currentPassword` n’est exigé que si
 * `newPassword` est renseigné (`refine`).
 */
export const UpdateProfilePayloadSchema = UpdateProfileSchema.extend({
  currentPassword: z.string().optional(),
}).refine((data) => !data.newPassword || Boolean(data.currentPassword), {
  message: "Le mot de passe actuel est requis pour changer de mot de passe",
  path: ["currentPassword"],
});

export type ProfileFormData = z.infer<typeof UpdateProfileSchema>;
export type UpdateProfilePayload = z.infer<typeof UpdateProfilePayloadSchema>;
