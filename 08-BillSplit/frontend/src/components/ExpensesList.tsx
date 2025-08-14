"use client";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { useEffect, useState } from "react";
import { Expense } from "../lib/types";
import { ExpenseDetailDialog } from "./ExpenseDetailDialog";

interface ExpensesListProps {
  groupId: number;
  expenses: Expense[];
}

export function ExpensesList({ groupId, expenses }: ExpensesListProps) {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  // const { data: expenses = [] } = useExpenses(groupId);
  console.log("expenses in expenses list", expenses);

  useEffect(() => {
    console.log("selectedExpense", selectedExpense);
  }, [selectedExpense]);

  return (
    <div className="space-y-4">
      {expenses && expenses.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No expenses yet. Create your first expense to get started!</p>
        </div>
      ) : (
        expenses.map((expense) => (
          <Card
            key={expense.id}
            className="p-2 flex items-center justify-between gap-3"
          >
            <CardContent className="p-2 flex justify-between items-center w-full">
              <div className="flex gap-2 items-center">
                <div className="flex flex-col items-center justify-center bg-blue-50 rounded-lg p-2 w-20">
                  <span className="text-xs uppercase text-muted-foreground">
                    {new Date(expense.created_at).toLocaleString("default", {
                      month: "short",
                    })}
                  </span>
                  <span className="text-xl font-semibold text-blue-600">
                    {new Date(expense.created_at).getDate()}
                  </span>
                </div>
                <div className="w-full">
                  <CardTitle className="mb-2">{expense.title}</CardTitle>
                  <span className="text-muted-foreground text-sm">
                    Rs {expense.total_amount.toFixed(2)}
                  </span>
                </div>
              </div>
              <div>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setSelectedExpense(expense)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {selectedExpense && (
        <ExpenseDetailDialog
          expense={selectedExpense}
          open={!!selectedExpense}
          onOpenChange={(open) => !open && setSelectedExpense(null)}
        />
      )}
    </div>
  );
}
