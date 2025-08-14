"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Card } from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Expense } from "../lib/types";

interface ExpenseDetailDialogProps {
  expense: Expense;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExpenseDetailDialog({
  expense,
  open,
  onOpenChange,
}: ExpenseDetailDialogProps) {
  // const { data: expense } = useExpense(expenseId);

  if (!expense) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{expense.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="p-4 flex flex-row justify-between ">
            <p className="">Total Amount</p>
            <p className="">Rs {expense.total_amount.toFixed(2)}</p>
          </Card>

          <div className="space-y-3">
            <p className="">Participants:</p>
            {expense.participants.map((participant) => (
              <div
                key={participant.user_id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      {participant.user_name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {participant.user_name || `User ${participant.user_id}`}
                    </p>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p className="">
                    Allocated: ${participant.allocated_amount.toFixed(2)}
                  </p>
                  <p className="text-sm ">
                    Paid: ${participant.paid_amount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
