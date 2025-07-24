"use client";
import FullScreenWrapper from "@/components/FullScreenWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useOrder } from "@/hooks/useOrder";
import Status, { getStatusColor } from "../admin/orders/components/Status";
import ProductObject from "../admin/orders/components/ProductObject";
import { PaginationComponent } from "../admin/components/TableComponent";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const CancelOrder = ({ orderId }: { orderId: string }) => {
  const [open, setOpen] = useState(false);
  const { updateStatusMutation } = useOrder();
  const updateStatus = updateStatusMutation(orderId);

  const cancelOrder = async () => {
    updateStatus.mutate({ status: "cancelled" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="px-2 py-1 cursor-pointer text-xs">
        Cancel Order
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm update status?</DialogTitle>
          <DialogDescription>
            Are you Sure you want to update status to
            <span className="font-semibold">"cancelled"</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"secondary"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-neutral-800" onClick={() => cancelOrder()}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ShowOrders = () => {
  const { orders, metaData } = useOrder();
  const { user } = useAuth();

  return (
    <FullScreenWrapper notop className={"py-4"}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {user?.role == "admin" ? "Order Management" : "My Orders"}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3 ">
          {orders?.map((order: any) => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>Order #{order.id}</span>
                  {user?.role == "admin" && (
                    <Status status={order.status} orderId={order.id} />
                  )}
                  {user?.role == "customer" && (
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  )}
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
              </CardContent>

              {user?.role == "admin" ||
                (user?.role == "customer" && order.status == "pending" && (
                  <CardFooter>
                    <CancelOrder orderId={order.id} />
                  </CardFooter>
                ))}
            </Card>
          ))}
        </div>
        <PaginationComponent metaData={metaData} />
      </div>
    </FullScreenWrapper>
  );
};

export default ShowOrders;
