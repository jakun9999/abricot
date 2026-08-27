import { z } from "zod";

// What is awaited when sending login data
// to our /api/login route.
export const LoginSchema = z.object({
  email: z.email("Email format is incorrect"),
  password: z
    .string()
    .min(1, "Password is mandatory")
    .max(100, "Password is too long"),
});
