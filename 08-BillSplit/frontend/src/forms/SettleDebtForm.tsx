"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
  settleDebtSchema,
  type SettleDebtFormData,
} from "./schemas/settleDebtSchema";

interface SettleDebtFormProps {
  onSubmit: (data: SettleDebtFormData) => void;
  isLoading?: boolean;
  onCancel?: () => void;
  maxAmount?: number;
  defaultAmount?: number;
}

export function SettleDebtForm({
  onSubmit,
  isLoading = false,
  onCancel,
  maxAmount,
  defaultAmount,
}: SettleDebtFormProps) {
  const form = useForm<SettleDebtFormData>({
    defaultValues: {
      amount: defaultAmount || 0,
    },
  });

  const handleSubmit = (data: SettleDebtFormData) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Settlement Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  max={maxAmount}
                  placeholder="Enter amount to settle"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number.parseFloat(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Settling..." : "Settle Debt"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
