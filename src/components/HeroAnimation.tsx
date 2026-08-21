"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroAnimation() {
  return (
    <div className="relative w-full h-full max-w-[400px] max-h-[400px] flex items-center justify-center">
      {/* Central Glowing Core */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute w-48 h-48 bg-brand-gold/30 rounded-full blur-[60px]"
      />

      {/* Outer Rotating Ring 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-[320px] h-[320px] rounded-full border border-brand-gold/20"
      >
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-brand-gold rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#c9a86a]" />
      </motion.div>

      {/* Inner Rotating Ring 2 (Dashed) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[260px] h-[260px] rounded-full border border-brand-gold/10 border-dashed"
      />

      {/* Inner Thin Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[180px] h-[180px] rounded-full border border-brand-gold/30"
      >
        <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-brand-gold/80 rounded-full -translate-x-1/2 translate-y-1/2" />
      </motion.div>

      {/* Center Monogram Emblem */}
      <div className="relative z-10 w-24 h-24 rounded-full border border-brand-gold/40 bg-brand-darker flex items-center justify-center shadow-[0_0_30px_rgba(201,168,106,0.15)] backdrop-blur-sm">
        <span className="font-serif text-4xl text-brand-gold font-light tracking-widest italic ml-1">L</span>
      </div>

      {/* Floating Dust Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            x: [0, (i % 2 === 0 ? 30 : -30), 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + (i % 5),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
          className="absolute w-[2px] h-[2px] bg-brand-gold/60 rounded-full"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
        />
      ))}
    </div>
  );
}
