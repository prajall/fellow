import { create } from "zustand";

const localCart = JSON.parse(localStorage.getItem("cart")) || [];

export const useCartStore = create((set) => ({
  cartItems: localCart || [],
  addToCart: (newItem) =>
    set((state) => {
      const currentItems = state.cartItems;
      console.log("CurrentItems", currentItems);
      const existingItem = currentItems.find((item) => item.id === newItem.id);
      console.log("Existing Item:", existingItem);
      if (!existingItem) {
        const newCartItems = [...currentItems, { ...newItem, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(newCartItems));
        return { cartItems: newCartItems };
      } else {
        const newCartItems = state.cartItems.map((item) => {
          if (item.id != newItem.id) return item;
          else {
            return {
              ...item,
              quantity: item.quantity + 1 || 1,
            };
          }
        });
        localStorage.setItem("cart", JSON.stringify(newCartItems));
        return { cartItems: newCartItems };
      }
    }),
  emptyCart: () =>
    set(() => {
      localStorage.removeItem("cart");
      return {
        cartItems: [],
      };
    }),
  addQuantity: (id) =>
    set((state) => {
      const targetItem = state.cartItems.find((item) => item.id == id);
      const updatedCart = state.cartItems.map((item) =>
        item.id === targetItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cartItems: updatedCart };
    }),
  subQuantity: (id) =>
    set((state) => {
      const targetItem = state.cartItems.find((item) => item.id == id);
      if (targetItem.quantity === 0) {
        return { cartItems: state.cartItems };
      }
      const updatedCart = state.cartItems.map((item) =>
        item.id === targetItem.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cartItems: updatedCart };
    }),

  removeItem: (id) =>
    set((state) => {
      const updatedCart = state.cartItems.filter((item) => item.id != id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cartItems: updatedCart };
    }),
}));
