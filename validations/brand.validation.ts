// validations/spare-part.validation.ts
import { z } from "zod";

export const createBrandSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type CreateBrandFormValues = z.infer<typeof createBrandSchema>;