import { z } from "zod";

export const createModelSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand_id: z.coerce.number().min(1),
});

export type CreateModelFormValues = z.infer<typeof createModelSchema>;