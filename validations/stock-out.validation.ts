import { z } from "zod";

export const stockOutSchema = z.object({
  spare_part_id: z.coerce.number().min(1, "Please select a spare part"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unit_price: z.coerce.number().min(0, "Unit price cannot be negative"),
  reason: z.string().min(1, "Reason is required"),
});

// export type StockOutFormValues = z.infer<typeof stockOutSchema>;
// Change z.infer to z.input
export type StockOutFormValues = z.input<typeof stockOutSchema>;
// type StockOutInput = z.input<typeof stockOutSchema>;
export type StockOutOutput = z.infer<typeof stockOutSchema>;
