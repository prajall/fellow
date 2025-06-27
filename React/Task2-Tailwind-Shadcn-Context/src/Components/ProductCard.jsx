import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useCartStore } from "@/store";

const ProductCard = ({ product }) => {
  const { cartItems, setCartItems } = useCart();
  const addtoCartAction = useCartStore((state) => state.addToCart);
  const cartItemsZ = useCartStore((state) => state.cartItems);

  const handleCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (!existingItem) {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
      toast.success("Product added to cart");
    } else {
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
      toast.info("Item already exist. Added Quantity +1");
    }
    addtoCartAction(product);
    console.log("cartItemsZ", cartItemsZ);
  };

  return (
    <div className="border max-w-[450px] mx-auto w-full ">
      <Card className="rounded-none shadow-none border-none px-0 h-full group cursor-pointer">
        <CardContent className="relative h-full overflow-hidden mx-6 px-0 border">
          <img
            className="w-full h-full object-cover group-hover:scale-105 group-hover:blur-sm duration-300"
            src={product?.image}
            alt=""
          />
          <Button
            variant="outline"
            onClick={handleCart}
            className="py-2 absolute z-50 hidden group-hover:flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent hover:bg-black/70 hover:text-white group-hover:bg-black/40 border-white text-white duration-300  "
          >
            Add to Cart
          </Button>
        </CardContent>
        <CardHeader>
          <CardTitle className="truncate">{product.title}</CardTitle>
          <CardDescription className="text-clip">
            $ {product.price}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ProductCard;
