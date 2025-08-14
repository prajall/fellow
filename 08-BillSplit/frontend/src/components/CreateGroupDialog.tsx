"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog";
import { useCreateGroup } from "@/src/hooks/useGroup";
import { CreateGroupForm } from "@/src/forms/create-group-form";
import type { CreateGroupFormData } from "@/src/forms/schemas/createGroupSchema";

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateGroupDialog({
  open,
  onOpenChange,
}: CreateGroupDialogProps) {
  const createGroup = useCreateGroup();

  const handleSubmit = (data: CreateGroupFormData) => {
    createGroup.mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
          <DialogDescription>
            Create a new group to start splitting expenses.
          </DialogDescription>
        </DialogHeader>
        <CreateGroupForm
          onSubmit={handleSubmit}
          isLoading={createGroup.isPending}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
