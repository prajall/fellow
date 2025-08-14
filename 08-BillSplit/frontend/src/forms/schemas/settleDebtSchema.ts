import { z } from "zod";

export const settleDebtSchema = z.object({
  amount: z.coerce
    .number()
    .min(0.01, "Settlement amount must be greater than 0"),
});

export type SettleDebtFormData = z.infer<typeof settleDebtSchema>;
