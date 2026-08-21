"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  { name: 'Running', image: '/images/cat1.jpg', colSpan: 'md:col-span-2' },
  { name: 'Casual', image: '/images/cat2.jpg', colSpan: 'md:col-span-1' },
  { name: 'Basketball', image: '/images/cat3.jpg', colSpan: 'md:col-span-1' },
  { name: 'Limited Edition', image: '/images/cat4.jpg', colSpan: 'md:col-span-2' }
];

export default function CategoryShowcase() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16 relative">
        <h2 className="text-3xl font-serif text-brand-gold tracking-widest uppercase">Explore Silhouettes</h2>
        <div className="w-24 h-[1px] bg-brand-gold/30 mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat, idx) => (
          <Link href="/shop" key={cat.name} className={`relative block h-64 md:h-80 overflow-hidden group cursor-pointer ${cat.colSpan}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="absolute inset-0 w-full h-full"
            >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 filter contrast-125 saturate-50 group-hover:saturate-100"
              style={{ backgroundImage: `url(${cat.image})` }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-brand-dark/70 group-hover:bg-brand-dark/40 transition-colors duration-500" />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h3 className="font-serif text-3xl md:text-4xl text-brand-light uppercase tracking-widest border border-brand-light/30 px-8 py-4 backdrop-blur-sm group-hover:border-brand-gold group-hover:text-brand-gold transition-all duration-500">
                {cat.name}
              </h3>
            </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
