"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { useDebts } from "@/src/hooks/useDebt";
import { SettleDebtForm } from "@/src/forms/SettleDebtForm";
import type { Debt } from "@/src/lib/types";

interface SettleDebtDialogProps {
  debt: Debt;
  groupId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettleDebtDialog({
  debt,
  groupId,
  open,
  onOpenChange,
}: SettleDebtDialogProps) {
  const { settleDebt } = useDebts(groupId);

  const handleSubmit = (data: any) => {
    settleDebt(
      {
        group_id: groupId,
        user_a: debt.user_a.id,
        user_b: debt.user_b.id,
        amount: data.amount,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settle Debt</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4 p-4 bg-muted rounded-lg">
            <Avatar>
              <AvatarImage
                src={debt.user_a.profile_image || "/placeholder.svg"}
              />
              <AvatarFallback>{debt.user_a.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">owes</p>
              <p className="font-medium">${Number(debt.amount).toFixed(2)}</p>
            </div>
            <Avatar>
              <AvatarImage
                src={debt.user_b.profile_image || "/placeholder.svg"}
              />
              <AvatarFallback>{debt.user_b.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          <SettleDebtForm
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
            maxAmount={debt.amount}
            defaultAmount={debt.amount}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
