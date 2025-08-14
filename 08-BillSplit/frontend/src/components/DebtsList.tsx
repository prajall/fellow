"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { useDebts } from "@/src/hooks/useDebt";
import { SettleDebtDialog } from "./SettleDebtDialog";
import type { Debt } from "@/src/lib/types";

interface DebtsListProps {
  groupId: number;
}

export function DebtsList({ groupId }: DebtsListProps) {
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null);
  const { debts = [] } = useDebts(groupId);

  return (
    <div className="space-y-4">
      {debts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No debts to settle. All expenses are balanced!</p>
        </div>
      ) : (
        debts.map((debt, index) => (
          <Card key={index} className="p-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={debt.user_a.profile_image || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {debt.user_a.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <ArrowRight className="h-4 w-4 text-muted-foreground" />

                  <Avatar>
                    <AvatarImage
                      src={debt.user_b.profile_image || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {debt.user_b.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">{debt.user_a.name}</span>{" "}
                      owes{" "}
                      <span className="font-medium">{debt.user_b.name}</span>
                    </p>
                    <p className="text-lg font-bold">
                      Rs {Number(debt.amount).toFixed(2)}
                    </p>
                  </div>
                </div>

                <Button variant="outline" onClick={() => setSelectedDebt(debt)}>
                  Settle
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {selectedDebt && (
        <SettleDebtDialog
          debt={selectedDebt}
          groupId={groupId}
          open={!!selectedDebt}
          onOpenChange={(open) => !open && setSelectedDebt(null)}
        />
      )}
    </div>
  );
}
