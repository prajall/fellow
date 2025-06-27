import { create } from "zustand";

export const useCartStore = create((set) => ({
  cartItems: [],
  addToCart: (newItem) =>
    set((state) => {
      const currentItems = state.cartItems;
      console.log("CurrentItems", currentItems);
      const existingItem = currentItems.find((item) => item.id === newItem.id);
      console.log("Existing Item:", existingItem);
      if (!existingItem) {
        const newCartItems = [...currentItems, { ...newItem, quantity: 1 }];
        console.log(newCartItems);
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
        return { cartItems: newCartItems };
      }
    }),
  emptyCart: () => set(() => ({ cartItems: [] })),
  addQuantity: (id) =>
    set((state) => {
      const targetItem = state.cartItems.find((item) => item.id == id);
      const updatedCart = state.cartItems.map((item) =>
        item.id === targetItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { cartItems: updatedCart };
    }),
  subQuantity: (id) =>
    set((state) => {
      const targetItem = state.cartItems.find((item) => item.id == id);
      //   console.log("Tar", targetItem);
      if (targetItem.quantity === 0) {
        return { cartItems: state.cartItems };
      }
      const updatedCart = state.cartItems.map((item) =>
        item.id === targetItem.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return { cartItems: updatedCart };
    }),

  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id != id),
    })),
}));
