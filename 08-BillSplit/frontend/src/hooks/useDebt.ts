"use client";

import type { Debt, SettleDebtData } from "@/src/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiRequest } from "../lib/api";

const fetchDebts = async (groupId: number): Promise<Debt[]> => {
  const response = await apiRequest.get(`/debts/?group_id=${groupId}`);

  return response.data;
};

const settleDebt = async (
  debtData: SettleDebtData
): Promise<{ success: boolean }> => {
  await apiRequest.post(`/debts/settle/`, debtData);
  return { success: true };
};

const getBalance = async (groupId: number): Promise<number> => {
  const response = await apiRequest.get(
    `/debts/get-balance/?group_id=${groupId}`
  );
  return response.data?.balance;
};

export const useDebts = (groupId: number) => {
  const queryClient = useQueryClient();

  const { data: balance, isLoading: isBalanceLoading } = useQuery({
    queryKey: ["balance", groupId],
    queryFn: () => getBalance(groupId),
    staleTime: 10 * 1000,
    enabled: !!groupId,
  });

  const { data, error, isPending } = useQuery<Debt[]>({
    queryKey: ["debts", groupId],
    queryFn: () => fetchDebts(groupId),
    staleTime: 10 * 1000,
    enabled: !!groupId,
  });

  const settleDebtMutation = useMutation({
    mutationKey: ["debts"],
    mutationFn: settleDebt,
    onMutate: async () => {
      toast.loading("Settling debt...", { id: "debt-settle" });
    },
    onSuccess: () => {
      toast.success("Debt settled successfully", { id: "debt-settle" });
      queryClient.invalidateQueries({ queryKey: ["debts"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    },
    onError: (err) => {
      console.log("Error settling debt:", err);
      toast.error("Failed to settle debt", { id: "debt-settle" });
    },
  });

  return {
    debts: data || [],
    balance,
    isBalanceLoading,

    isLoading: isPending,
    isSettling: settleDebtMutation.isPending,

    error,

    settleDebt: settleDebtMutation.mutateAsync,
  };
};
