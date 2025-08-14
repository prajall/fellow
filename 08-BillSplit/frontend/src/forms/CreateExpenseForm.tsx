"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Minus } from "lucide-react";
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
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  createExpenseSchema,
  type CreateExpenseFormData,
} from "./schemas/createExpenseSchema";
import type { User } from "@/src/lib/types";
import { useExpenses } from "../hooks/useExpense";
import toast from "react-hot-toast";

interface CreateExpenseFormProps {
  isLoading?: boolean;
  onClose: () => void;
  groupId: number;
  groupMembers: User[];
}

export function CreateExpenseForm({
  isLoading = false,
  onClose,
  groupId,
  groupMembers,
}: CreateExpenseFormProps) {
  const { createExpense } = useExpenses();

  const form = useForm<CreateExpenseFormData>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      title: "",
      total_amount: 0,
      participants: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "participants",
  });

  const watchedTotalAmount = form.watch("total_amount");
  const watchedParticipants = form.watch("participants");

  const selectedUserIds = fields
    .map((field, index) => watchedParticipants[index]?.user_id)
    .filter(Boolean);
  const availableMembers = groupMembers.filter(
    (member) => !selectedUserIds.includes(member.id)
  );

  const addParticipant = (user: User) => {
    const currentParticipants = form.getValues("participants");
    const equalShare = watchedTotalAmount / (currentParticipants.length + 1);

    currentParticipants.forEach((_, index) => {
      form.setValue(`participants.${index}.allocated_amount`, equalShare);
    });

    append({
      user_id: user.id,
      allocated_amount: equalShare,
      paid_amount: 0,
    });
  };

  const removeParticipant = (index: number) => {
    remove(index);
    const remainingParticipants = form.getValues("participants");
    const equalShare =
      remainingParticipants.length > 0
        ? watchedTotalAmount / remainingParticipants.length
        : 0;

    remainingParticipants.forEach((_, idx) => {
      form.setValue(`participants.${idx}.allocated_amount`, equalShare);
    });
  };

  const handleTotalAmountChange = (value: number) => {
    const currentParticipants = form.getValues("participants");
    const equalShare =
      currentParticipants.length > 0 ? value / currentParticipants.length : 0;

    currentParticipants.forEach((_, index) => {
      form.setValue(`participants.${index}.allocated_amount`, equalShare);
    });
  };

  const handleSubmit = async (data: CreateExpenseFormData) => {
    const expenseData = {
      ...data,
      group_id: groupId,
    };
    try {
      const response = await createExpense(expenseData);
      console.log("Create Expense Response", response);
      form.reset();
      onClose();
    } catch (error: any) {
      console.log("Error creating expense in form:", error);

      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach((key) => {
          form.setError(key as keyof CreateExpenseFormData, {
            message: error.response.data[key],
          });
        });
      }
    }
  };

  const totalAllocated = watchedParticipants.reduce(
    (sum, p) => sum + (p?.allocated_amount || 0),
    0
  );
  const totalPaid = watchedParticipants.reduce(
    (sum, p) => sum + (p?.paid_amount || 0),
    0
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expense Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter expense title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="total_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => {
                      const value = Number.parseFloat(e.target.value) || 0;
                      field.onChange(value);
                      handleTotalAmountChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {fields.length > 0 && (
          <div className="rounded-lg">
            <FormLabel className="text-base font-medium">
              Participants ({fields.length})
            </FormLabel>
            <div className="mt-2 space-y-3">
              {fields.map((field, index) => {
                const participant = watchedParticipants[index];
                const member = groupMembers.find(
                  (m) => m.id === participant?.user_id
                );
                if (!member) return null;

                return (
                  <Card key={field.id} className="p-0">
                    <CardContent className="p-4 ">
                      <div className="flex items-center justify-between ">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={member.profile_image || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{member.name}</span>
                        </div>
                        <div className="flex items-center gap-3 ">
                          <div className="flex w-fit gap-3">
                            <FormField
                              control={form.control}
                              name={`participants.${index}.allocated_amount`}
                              render={({ field }) => (
                                <FormItem className="flex">
                                  <FormLabel className="text-xs text-muted-foreground">
                                    Allocated
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="0"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          Number.parseFloat(e.target.value) || 0
                                        )
                                      }
                                      className="w-24"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`participants.${index}.paid_amount`}
                              render={({ field }) => (
                                <FormItem className="flex">
                                  <FormLabel className="text-xs text-muted-foreground">
                                    Paid
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="0"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          Number.parseFloat(e.target.value) || 0
                                        )
                                      }
                                      className="w-24"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => removeParticipant(index)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {availableMembers.length > 0 && (
          <div>
            <FormLabel className="text-base font-medium">
              Add Participants
            </FormLabel>
            <div className="mt-2 space-y-2">
              {availableMembers.map((member) => (
                <Card
                  key={member.id}
                  className="hover:bg-accent cursor-pointer transition-colors  p-0"
                >
                  <CardContent className="p-3 ">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={member.profile_image || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.name}</span>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => addParticipant(member)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Card className="mt-4 p-0 bg-muted">
          <CardContent className="p-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-md">Rs {watchedTotalAmount.toFixed(2)}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Total Allocated</p>
                <p
                  className={`text-md ${
                    totalAllocated != watchedTotalAmount
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  Rs {totalAllocated.toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-md">Rs {totalPaid.toFixed(2)}</p>
              </div>
            </div>

            {/* {totalAllocated != watchedTotalAmount && (
              <p className="text-sm text-red-600 text-center mt-2">
                Warning: Allocated amount doesn’t match total amount
              </p>
            )} */}
          </CardContent>
        </Card>

        {form.formState.errors.participants && (
          <div className="text-sm text-red-600 text-center">
            {form.formState.errors.participants.message}
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Expense"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
