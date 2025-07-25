import { CartProps, useCart } from "@/contexts/CartContext";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useOrder } from "@/hooks/useOrder";

const ProductObject = ({ product }: { product: CartProps }) => {
  const { setCartItems } = useCart();

  const handleDelete = () => {
    setCartItems((prev) => prev.filter((item) => item.id != product.id));
  };
  const handleAddQuantity = () => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id != product.id) return item;
        else {
          return {
            ...item,
            quantity: item.quantity + 1 || 1,
          };
        }
      })
    );
  };
  const handleSubtractQuantity = () => {
    if (product.quantity == 1) {
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id != product.id) return item;
        else {
          return {
            ...item,
            quantity: item.quantity - 1 || 1,
          };
        }
      })
    );
  };
  return (
    <div>
      <Card className="p-0 border-none shadow-none">
        <CardContent className="p-2 flex gap-2 items-center ">
          <div>
            <img src={product.image || ""} alt="Image" className="w-14" />
          </div>
          <div className="px-2 truncate w-full">
            <p className="">{product.name}</p>
            <p className="text-sm text-muted-foreground">
              ${Number(product.price) * product.quantity}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <p>Quantity:</p>
              <button
                onClick={handleSubtractQuantity}
                className="p-2 border h-5 w-5 flex items-center justify-center rounded cursor-pointer hover:bg-neutral-100"
              >
                -
              </button>
              <p>{product.quantity}</p>
              <button
                onClick={handleAddQuantity}
                className="p-2 border h-5 w-5 flex items-center justify-center rounded cursor-pointer hover:bg-neutral-100"
              >
                +
              </button>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-500 h-full rounded-md"
          >
            <Trash />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const SidebarContent = () => {
  const { cartItems, setCartItems } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  const { createOrder } = useOrder();

  useEffect(() => {
    let total = 0;
    if (cartItems.length > 0)
      cartItems.forEach((item) => {
        console.log("hey");
        total += Number(item.price) * item.quantity || 0;
      });
    setTotalPrice(Number(total.toFixed(2)));
  }, [cartItems]);

  const handleCheckout = async () => {
    const newOrders = cartItems.map((item) => {
      return {
        product: item.id,
        quantity: item.quantity,
      };
    });
    console.log("newOrders", newOrders);
    createOrder(newOrders);
    setCartItems([]);
  };

  return (
    <div className="pt-0 h-full flex flex-col gap-2">
      {}
      <Button
        variant="link"
        onClick={() => {
          setCartItems([]);
          toast.success("All items cleared");
        }}
        className="w-fit ml-auto"
      >
        Clear All
      </Button>
      <div className="h-full overflow-y-auto flex flex-col gap-2 ">
        {cartItems.map((item) => {
          return <ProductObject product={item} key={item.id} />;
        })}
      </div>
      <div className="mt-auto">
        <Button className="w-full mt-auto" onClick={handleCheckout}>
          Checkout (${totalPrice})
        </Button>
      </div>
    </div>
  );
};

export default SidebarContent;
