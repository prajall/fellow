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
  createGroupSchema,
  type CreateGroupFormData,
} from "./schemas/createGroupSchema";

interface CreateGroupFormProps {
  onSubmit: (data: CreateGroupFormData) => void;
  isLoading?: boolean;
  onCancel?: () => void;
}

export function CreateGroupForm({
  onSubmit,
  isLoading = false,
  onCancel,
}: CreateGroupFormProps) {
  const form = useForm<CreateGroupFormData>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = (data: CreateGroupFormData) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Group Name</FormLabel> */}
              <FormControl>
                <Input placeholder="Group Name" {...field} />
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
            {isLoading ? "Creating..." : "Create Group"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
