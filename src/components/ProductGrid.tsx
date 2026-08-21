"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sneaker, mockSneakers } from '@/lib/data';
import { useCart } from './CartProvider';

export default function ProductGrid({ limit, hideTitle }: { limit?: number, hideTitle?: boolean }) {
  const displaySneakers = limit ? mockSneakers.slice(0, limit) : mockSneakers;

  return (
    <section id="shop" className="py-32 px-6 max-w-7xl mx-auto">
      {!hideTitle && (
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-white tracking-[0.2em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            {limit ? 'Featured Silhouettes' : 'The Archive'}
          </h2>
          <div className="w-24 h-[1px] bg-white/30 mx-auto mt-6" />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {displaySneakers.map((sneaker, idx) => (
          <ProductCard key={sneaker.id} sneaker={sneaker} index={idx} />
        ))}
      </div>
      
      {limit && (
        <div className="mt-16 text-center">
          <Link href="/shop" className="inline-block border-b border-white text-white pb-1 tracking-[0.2em] uppercase text-xs hover:text-white/70 hover:border-white/70 transition-colors">
            View Complete Collection
          </Link>
        </div>
      )}
    </section>
  );
}

function ProductCard({ sneaker, index }: { sneaker: Sneaker, index: number }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(sneaker.sizes[0]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col bg-[#020202] border border-white/5 hover:border-white/30 transition-colors duration-500 rounded-sm overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative h-80 w-full overflow-hidden bg-[#030303] flex items-center justify-center p-8">
        {/* Glow behind image on hover */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 z-10 pointer-events-none" />
        
        {/* Default Image */}
        <Image 
          src={sneaker.imageUrl} 
          alt={sneaker.name}
          fill
          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out filter contrast-110"
        />
        
        {/* Category Badge */}
        <span className="absolute top-4 left-4 z-20 text-[9px] uppercase tracking-[0.2em] text-white border border-white/20 px-3 py-1 bg-[#050505]/80 backdrop-blur-sm font-bold">
          {sneaker.category}
        </span>
      </div>

      {/* Details */}
      <div className="p-6 flex-1 flex flex-col relative z-20 bg-[#020202]">
        {/* Animated Gold Line */}
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-white/0 via-white/0 to-white/0 group-hover:via-white/40 transition-all duration-700" />
        
        <div className="flex justify-between items-start mb-2 mt-2">
          <h3 className="font-serif text-xl text-white group-hover:text-white transition-colors duration-500 drop-shadow-sm">{sneaker.name}</h3>
          <span className="font-serif text-white/80 group-hover:text-white transition-colors duration-500">${sneaker.price}</span>
        </div>
        
        <p className="text-brand-light/50 text-sm mb-6 flex-1 truncate font-light">
          {sneaker.description}
        </p>

        {/* Interactive Add to Cart Area */}
        <div className="pt-4 mt-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 relative">
              <select 
                value={selectedSize}
                onChange={(e) => setSelectedSize(Number(e.target.value))}
                className="w-full bg-[#050505] border border-white/10 text-white/70 text-xs tracking-widest uppercase px-3 py-3 outline-none focus:border-white hover:border-white/30 transition-colors appearance-none cursor-pointer"
              >
                {sneaker.sizes.map(size => (
                  <option key={size} value={size}>Size {size}</option>
                ))}
              </select>
              {/* Custom arrow for select */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 text-[10px]">▼</div>
            </div>
            
            <button 
              onClick={() => addItem(sneaker, selectedSize)}
              className="flex-1 text-[10px] font-bold tracking-[0.2em] uppercase text-white border border-white/30 hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] px-4 py-3 transition-all duration-500 rounded-sm text-center"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
