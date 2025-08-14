"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { InviteMemberForm } from "@/src/forms/InviteMemberForm";

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupId: number;
}

export function InviteMemberDialog({
  open,
  onOpenChange,
  groupId,
}: InviteMemberDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Member to Group</DialogTitle>
        </DialogHeader>
        <InviteMemberForm
          groupId={groupId}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
