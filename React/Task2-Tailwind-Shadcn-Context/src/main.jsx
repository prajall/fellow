import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "@/components/ui/sonner";
import CartProvider from "./contexts/CartContext";
import UserProvider from "./contexts/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <CartProvider>
        <Toaster />
        <App />
      </CartProvider>
    </UserProvider>
  </StrictMode>
);
