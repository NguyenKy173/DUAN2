import { createContext, useContext } from "react";
import { useCart } from "./cartContact";

const CartContext = createContext<ReturnType<typeof useCart> | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const cartData = useCart();
  return <CartContext.Provider value={cartData}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within CartProvider");
  }
  return context;
};
