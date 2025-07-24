"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useOrder } from "@/hooks/useOrder";
import { ProductProps } from "@/types";
import { CreditCard, Minus, Plus } from "lucide-react";
import React, { useState } from "react";

const BuyNowComponent = ({ product }: { product: ProductProps }) => {
  const [quantity, setQuantity] = React.useState(1);
  const [open, setOpen] = useState(false);
  const { createOrder } = useOrder();

  const handleAddQuantity = () => {
    if (quantity < (product.stock || 1)) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleSubtractQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const totalPrice = (Number(product.price) * quantity).toFixed(2);

  const handleCheckout = () => {
    const newOrders = [
      {
        product: product.id,
        quantity: quantity,
      },
    ];
    console.log("newOrders", newOrders);
    createOrder(newOrders);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" disabled={product.stock === 0 || !product.is_active}>
          <CreditCard className="h-5 w-5 mr-2" />
          Buy Now
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 max-w-3xl w-[95%]">
        <DialogTitle className="text-xl font-bold">
          Confirm Your Order
        </DialogTitle>
        <DialogDescription className="text-sm text-neutral-500">
          Review the product details before placing your order.
        </DialogDescription>

        <div className="flex items-start gap-4 mt-4">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-28 rounded-lg object-cover border aspect-[3/4]"
            />
          )}
          <div className="flex-1 space-y-2">
            <div>
              <p className="text-sm text-neutral-500">Product</p>
              <p className="font-medium text-base">{product.name}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Price</p>
              <p className="font-semibold text-neutral-900">${totalPrice}</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-sm text-neutral-500">Quantity:</p>
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={handleSubtractQuantity}
                  disabled={quantity === 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-2 text-sm font-medium">{quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={handleAddQuantity}
                  disabled={quantity >= (product.stock || 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button className="w-full" onClick={handleCheckout}>
            Place Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuyNowComponent;
