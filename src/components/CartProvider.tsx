"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Sneaker } from '@/lib/data';

interface CartItem {
  sneaker: Sneaker;
  size: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (sneaker: Sneaker, size: number) => void;
  removeItem: (sneakerId: string, size: number) => void;
  updateQuantity: (sneakerId: string, size: number, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('lumen-cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('lumen-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (sneaker: Sneaker, size: number) => {
    setItems(prev => {
      const existing = prev.find(item => item.sneaker.id === sneaker.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          (item.sneaker.id === sneaker.id && item.size === size) 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { sneaker, size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (sneakerId: string, size: number) => {
    setItems(prev => prev.filter(item => !(item.sneaker.id === sneakerId && item.size === size)));
  };

  const updateQuantity = (sneakerId: string, size: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(sneakerId, size);
      return;
    }
    setItems(prev => prev.map(item => 
      (item.sneaker.id === sneakerId && item.size === size) 
        ? { ...item, quantity }
        : item
    ));
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + (item.sneaker.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, totalItems, totalPrice, isCartOpen, setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
