"use client";
import FullScreenWrapper from "@/components/FullScreenWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useOrder } from "@/hooks/useOrder";
import { ChevronDown } from "lucide-react";
import { PaginationComponent } from "../components/TableComponent";
import ProductObject from "./components/ProductObject";

import { cn } from "@/lib/utils";
import Status from "./components/Status";

const page = () => {
  const { orders, metaData } = useOrder();

  console.log("Orders", orders);

  return (
    <FullScreenWrapper notop>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Order Management</h2>
        </div>

        <div className="w-full flex gap-2">
          <Input placeholder="Search" />
          <Button>Filter</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3 ">
          {orders?.map((order: any) => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>Order #{order.id}</span>
                  <Status status={order.status} orderId={order.id} />
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
