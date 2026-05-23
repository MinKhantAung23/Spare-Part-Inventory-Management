import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.enum(["admin", "staff"], {
    required_error: "Role is required",
    invalid_type_error: "Role must be admin or staff",
  }),
  // Empty string = no change (update mode); enforced ≥6 only when a value is given
  password: z
    .string()
    .refine((v) => v === "" || v.length >= 6, {
      message: "Password must be at least 6 characters",
    }),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;