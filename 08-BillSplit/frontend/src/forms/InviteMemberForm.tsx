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
  inviteMemberSchema,
  type InviteMemberFormData,
} from "./schemas/inviteMemberSchema";
import { apiRequest } from "../lib/api";
import toast from "react-hot-toast";

interface InviteMemberFormProps {
  groupId: number;
  isLoading?: boolean;
  onClose: () => void;
}

export function InviteMemberForm({
  groupId,
  isLoading = false,
  onClose,
}: InviteMemberFormProps) {
  const form = useForm<InviteMemberFormData>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: InviteMemberFormData) => {
    try {
      const response = await apiRequest.post(`/groups/${groupId}/invite/`, {
        group_id: groupId,
        email: data.email,
      });
      toast.success("Invitation sent");
      console.log("Invite Member Response", response);
      form.reset();
      onClose();
    } catch (error: any) {
      console.log("Error inviting member", error);
      if (error.response?.status === 404) {
        toast.error("User not found");
      } else if (error.response?.status === 400) {
        toast.error("User is already in group");
      } else {
        toast.error(error.response?.data?.detail || "Error inviting member");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Inviting..." : "Send Invitation"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
