import { z } from "zod";

export const expenseParticipantSchema = z.object({
  user_id: z.number(),
  allocated_amount: z.number().min(0, "Allocated amount must be positive"),
  paid_amount: z.number().min(0, "Paid amount must be positive"),
});

export const createExpenseSchema = z
  .object({
    title: z
      .string()
      .min(1, "Expense title is required")
      .max(200, "Title must be less than 200 characters"),
    total_amount: z.number().min(0.01, "Total amount must be greater than 0"),
    participants: z
      .array(expenseParticipantSchema)
      .min(1, "At least one participant is required"),
  })
  .refine(
    (data) => {
      const totalAllocated = data.participants.reduce(
        (sum, p) => sum + p.allocated_amount,
        0
      );
      return Math.abs(totalAllocated - data.total_amount) < 0.01;
    },
    {
      message: "Total allocated amount must equal the total expense amount",
      path: ["participants"],
    }
  );

export type CreateExpenseFormData = z.infer<typeof createExpenseSchema>;
export type ExpenseParticipantFormData = z.infer<
  typeof expenseParticipantSchema
>;
