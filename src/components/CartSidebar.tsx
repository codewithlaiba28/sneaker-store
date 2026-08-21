"use client";

import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from './CartProvider';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-darker border-l border-brand-gold/10 z-[80] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-brand-gold/10">
              <h2 className="text-xl font-serif text-brand-gold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Your Cart
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-brand-light/70 hover:text-brand-light transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-brand-light/50 space-y-4">
                  <ShoppingBag className="w-12 h-12 opacity-20" />
                  <p>Your cart is empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-brand-gold underline underline-offset-4 hover:text-brand-light transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.sneaker.id}-${item.size}`} className="flex gap-4 group">
                    <div className="relative w-24 h-24 rounded-md overflow-hidden bg-brand-dark flex-shrink-0">
                      <Image 
                        src={item.sneaker.imageUrl} 
                        alt={item.sneaker.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-brand-light">{item.sneaker.name}</h3>
                          <button 
                            onClick={() => removeItem(item.sneaker.id, item.size)}
                            className="text-brand-light/40 hover:text-red-400 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-brand-light/60 mt-1">Size: {item.size}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3 border border-brand-gold/20 rounded px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.sneaker.id, item.size, item.quantity - 1)}
                            className="text-brand-light/60 hover:text-brand-gold transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.sneaker.id, item.size, item.quantity + 1)}
                            className="text-brand-light/60 hover:text-brand-gold transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-brand-gold font-serif">${item.sneaker.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-brand-gold/10 bg-brand-dark">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-brand-light/70 uppercase tracking-wider text-sm">Subtotal</span>
                  <span className="font-serif text-2xl text-brand-light">${totalPrice}</span>
                </div>
                <button className="w-full bg-brand-gold text-brand-darker py-4 font-bold tracking-widest uppercase hover:bg-brand-light transition-all duration-300 glow-gold rounded-sm">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
