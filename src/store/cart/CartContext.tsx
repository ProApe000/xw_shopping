import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import type { Dispatch, ReactNode } from "react";
import { cartReducer, restoreCart } from "./cart";
import type { CartItem, CartAction } from "./cart";
type CartContextValue = {
  items: CartItem[];
  dispatch: Dispatch<CartAction>;
  open: boolean;
  setOpen: (open: boolean) => void;
  storageWarning: boolean;
};
const CartContext = createContext<CartContextValue | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, () => {
    try {
      return restoreCart(localStorage.getItem("nest-nomad-cart-v1"));
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem("nest-nomad-cart-v1", JSON.stringify(items));
    } catch {
      setStorageWarning(true);
    }
  }, [items]);
  return (
    <CartContext.Provider
      value={{ items, dispatch, open, setOpen, storageWarning }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("CartProvider is required");
  return value;
}
