import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const localCart = JSON.parse(localStorage.getItem("cart")) || [];

  const [cartItems, setCartItems] = useState(
    Array.isArray(localCart) ? localCart : [] || []
  );

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

  return context;
};
