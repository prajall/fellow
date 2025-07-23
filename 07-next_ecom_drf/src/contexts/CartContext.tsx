"use client";

import { ProductProps } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

export interface CartProps extends ProductProps {
  quantity: number;
}

export interface CartContextProps {
  cartItems: CartProps[];
  setCartItems: React.Dispatch<React.SetStateAction<CartProps[]>>;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  let localCart: CartProps[] = [];

  const [cartItems, setCartItems] = useState<CartProps[]>([]);

  useEffect(() => {
    localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(localCart);
  }, []);
  useEffect(() => {
    console.log("Cart Items: ", cartItems);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
