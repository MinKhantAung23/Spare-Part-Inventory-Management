import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.enum(["admin", "staff"], { error: "Role is required" }),
  // role: z.enum(["admin", "staff"], {
  //   message: "Role is required",
  //   error: "Role must be admin or staff",
  // }),
  password: z
    .string()
    .refine((v) => v === "" || v.length >= 6, {
      message: "Password must be at least 6 characters",
    }),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;