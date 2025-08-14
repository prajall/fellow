"use client";

import { useState } from "react";
import {
  Users,
  Plus,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Badge } from "@/src/components/ui/badge";
import { useGroups } from "@/src/hooks/useGroup";
import { useExpenses } from "@/src/hooks/useExpense";
import { ExpensesList } from "./ExpensesList";
import { DebtsList } from "./DebtsList";
import { CreateExpenseDialog } from "./CreateExpenseDialog";
import { InviteMemberDialog } from "./InviteMemberDialog";
import { useQuery } from "@tanstack/react-query";
import { useDebts } from "../hooks/useDebt";

export function GroupContent({ groupId }: { groupId: number }) {
  const [showCreateExpense, setShowCreateExpense] = useState(false);
  const [showInviteMember, setShowInviteMember] = useState(false);
  const { getGroupById } = useGroups();
  const { data: group } = useQuery(getGroupById(groupId));
  const { expenses = [] } = useExpenses(groupId);
  const { balance } = useDebts(groupId);

  if (!group) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Group Not Found</h2>
          <p>The selected group could not be found</p>
        </div>
      </div>
    );
  }

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.total_amount,
    0
  );

  console.log("expenses", expenses);

  return (
    <div className="flex flex-col max-h-screen overflow-y-auto hide-scrollbar">
      <div className="border-b border-border bg-card">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold mb-2">{group.name}</h1>
                <div className="flex items-center space-x-4 mt-1">
                  <Badge variant="secondary">
                    {group.total_members} members
                  </Badge>
                  <Badge variant="outline">{expenses.length} expenses</Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowInviteMember(true)}
              >
                <Users className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
              <Button onClick={() => setShowCreateExpense(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Expense
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Card className="gap-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                <CardTitle className="text-sm font-medium">
                  Your Balance
                </CardTitle>
                {balance && balance > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : balance && balance < 0 ? (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                ) : (
                  <DollarSign className="h-4 w-4 text-blue-600" />
                )}
              </CardHeader>
              <CardContent className="mt-0 ">
                {!!balance && (
                  <>
                    <div
                      className={`text-xl font-semibold ${
                        balance > 0
                          ? "text-green-600"
                          : balance < 0
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      Rs {balance}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {balance > 0
                        ? "You are owed"
                        : balance < 0
                        ? "You owe"
                        : "You're all settled"}
                    </p>
                  </>
                )}
                {!balance && (
                  <>
                    <div className={`text-2xl font-bold ${"text-blue-600"}`}>
                      Rs 0.00
                    </div>
                    <p className="text-xs text-muted-foreground">
                      You're all settled
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
            <Card className="gap-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Members
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-semibold">
                  {group.total_members}
                </div>
                <p className="text-xs text-muted-foreground">
                  Active participants
                </p>
              </CardContent>
            </Card>

            <Card className="gap-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Spent
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-semibold ">
                  Rs {totalExpenses.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  From {expenses.length} expenses
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 ">
        <Tabs defaultValue="expenses" className="h-full">
          <TabsList className="grid w-full grid-cols-2  ">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="debts">Debts</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="mt-6 ">
            <ExpensesList groupId={groupId} expenses={expenses} />
          </TabsContent>

          <TabsContent value="debts" className="mt-6">
            <DebtsList groupId={groupId} />
          </TabsContent>
        </Tabs>
      </div>

      <CreateExpenseDialog
        open={showCreateExpense}
        onOpenChange={setShowCreateExpense}
        groupId={groupId}
        groupMembers={group.members}
      />

      <InviteMemberDialog
        open={showInviteMember}
        onOpenChange={setShowInviteMember}
        groupId={groupId}
      />
    </div>
  );
}
