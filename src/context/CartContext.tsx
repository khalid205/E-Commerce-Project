import { createContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Product { id: number; title: string; price: number; image: string; category: string; }

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);

  const addToCart = (product: Product) => {
    const id = toast.loading("جاري الإضافة...");
    setTimeout(() => {
      setCart((prev) => [...prev, product]);
      toast.update(id, { render: "تمت الإضافة بنجاح!", type: "success", isLoading: false, autoClose: 2000 });
    }, 800);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.info("تم الحذف");
  };

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>{children}</CartContext.Provider>;
};