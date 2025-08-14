"use client";

import type { CreateExpenseData, Expense } from "@/src/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiRequest } from "../lib/api";

const fetchExpenses = async (groupId: number): Promise<Expense[]> => {
  const response = await apiRequest.get(`/expenses/?group_id=${groupId}`);
  console.log("response", response);
  return response.data;
};

const createExpense = async (
  expenseData: CreateExpenseData
): Promise<Expense> => {
  const response = await apiRequest.post(`/expenses/`, expenseData);
  return response.data;
};

export const useExpenses = (groupId?: number) => {
  const queryClient = useQueryClient();

  const { data, error, isPending } = useQuery({
    queryKey: ["expenses", groupId],
    queryFn: () => fetchExpenses(groupId!),
    staleTime: 10 * 1000,
    enabled: !!groupId,
  });

  const createExpenseMutation = useMutation({
    mutationKey: ["expenses"],
    mutationFn: createExpense,
    onMutate: async () => {
      toast.loading("Creating expense...", { id: "expense-create" });
    },
    onSuccess: () => {
      toast.success("Expense created successfully", { id: "expense-create" });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    },
    onError: (err: any) => {
      console.log("Error creating expense:", err);
      if (err.response.data?.detail) {
        toast.error(err.response.data?.detail, { id: "expense-create" });
      } else {
        toast.error("Failed to create expense", { id: "expense-create" });
      }
    },
  });

  return {
    expenses: data || [],

    isLoading: isPending,
    isCreating: createExpenseMutation.isPending,

    error,

    createExpense: createExpenseMutation.mutateAsync,
  };
};

export const useCreateExpense = () => {
  const { createExpense, isCreating } = useExpenses();
  return {
    mutate: createExpense,
    mutateAsync: createExpense,
    isPending: isCreating,
  };
};
