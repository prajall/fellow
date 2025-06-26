import { Children, createContext, useContext, useState } from "react";
export const CartContext = createContext([]);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => {
  const context = useContext(CartContext);

  return context;
};
