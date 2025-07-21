"use client";
import { useOrder } from "@/hooks/useOrder";
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, Edit } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FullScreenWrapper from "@/components/FullScreenWrapper";

const page = () => {
  const { orders } = useOrder();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-100 text-black";
    }
  };

  return (
    <FullScreenWrapper notop>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Order Management</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders?.map((order: any) => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>Order #{order.id}</span>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{order.product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ({order.product.category.name})
                  </p>
                </div>

                <div className="flex gap-1">
                  <p className="text-sm font-medium">Customer:</p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer.name} ({order.customer.email})
                  </p>
                </div>

                <div className="">
                  <span className="text-sm">
                    Quantity: <span className="">{order.quantity}</span>
                  </span>
                </div>
                <div>
                  <span className="text-sm">
                    Price: <span className="">{order.price}</span>
                  </span>
                </div>

                <div className="flex gap-2 pt-2 justify-end text-blue-500">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/orders/${order.id}`}>
                      <Eye className="h-4 w-4" /> View
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/orders/${order.id}/edit`}>
                      <Edit className="h-4 w-4" /> Edit
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </FullScreenWrapper>
  );
};

export default page;
