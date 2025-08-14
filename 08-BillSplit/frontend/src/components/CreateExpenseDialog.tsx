"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { CreateExpenseForm } from "@/src/forms/CreateExpenseForm";
import type { User } from "@/src/lib/types";

interface CreateExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupId: number;
  groupMembers: User[];
}

export function CreateExpenseDialog({
  open,
  onOpenChange,
  groupId,
  groupMembers,
}: CreateExpenseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] min-w-3xl">
        <DialogHeader className="mb-4">
          <DialogTitle>Create New Expense</DialogTitle>
        </DialogHeader>
        <CreateExpenseForm
          onClose={() => onOpenChange(false)}
          groupId={groupId}
          groupMembers={groupMembers}
        />
      </DialogContent>
    </Dialog>
  );
}
