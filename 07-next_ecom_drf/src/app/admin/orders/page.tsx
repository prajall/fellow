"use client";
import { useOrder } from "@/hooks/useOrder";
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, Edit } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FullScreenWrapper from "@/components/FullScreenWrapper";
import FormModal from "../components/FormModal";
import ProductObject from "./ProductObject";
import { PaginationComponent } from "../components/TableComponent";

const page = () => {
  const { orders, metaData } = useOrder();

  console.log("Orders", orders);

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

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 ">
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
                <div className="flex gap-1">
                  <p className="text-sm font-medium">Customer:</p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer.name} ({order.customer.email})
                  </p>
                </div>
                <div className="flex gap-1">
                  <p className="text-sm font-medium">Total Price:</p>
                  <p className="text-sm text-muted-foreground">
                    ${order.total_price}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex gap-1">
                    <p className="text-sm font-medium">Items:</p>
                  </div>
                  {order.items.map((item: any) => (
                    <ProductObject key={item.id} item={item} />
                  ))}
                </div>

                {/* <div className="flex gap-2 pt-2 justify-end ">
                  <Button variant="ghost" size="sm">
                    Cancel Order
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/orders/${order.id}/edit`}>
                      <Edit className="h-4 w-4" /> Edit
                    </Link>
                  </Button>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
        <PaginationComponent metaData={metaData} />
      </div>
    </FullScreenWrapper>
  );
};

export default page;
