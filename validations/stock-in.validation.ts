import { z } from "zod";

export const stockInSchema = z.object({
  spare_part_id: z.coerce.number().min(1, "Please select a spare part"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  purchase_price: z.coerce.number().min(0, "Purchase price cannot be negative"),
  received_date: z.date().min(new Date(), "Received date cannot be in the future"),
});

export type StockInFormValues = z.infer<typeof stockInSchema>;
// export type StockInFormInput = z.input<typeof stockInSchema>;