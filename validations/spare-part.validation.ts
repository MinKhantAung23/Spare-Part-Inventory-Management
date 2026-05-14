// validations/spare-part.validation.ts
import { z } from "zod";

export const createSparePartSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0),
  spare_category_id: z.coerce.number().min(1),
  model_id: z.coerce.number().min(1),
  specifications: z.array(
    z.object({
      key: z.string().min(1, "Key required"),
      value: z.string().min(1, "Value required"),
    })
  ),
});

export type SparePartFormValues = z.infer<typeof createSparePartSchema>;