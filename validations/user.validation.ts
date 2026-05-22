import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  password: z.string().min(6, "Password is required"),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;