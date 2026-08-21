"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#020202]">
      
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/snk3.jpg')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-[#020202]/40" />
      </div>

      {/* 1. Ultra-Fine Premium Grain Overlay (Optimized) */}
      <svg className="absolute inset-0 pointer-events-none w-full h-full opacity-[0.1] z-10">
        <filter id="luxury-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#luxury-grain)" />
      </svg>

      {/* 2. Abstract Luxury Gold/Silver Smoke & Light Orbs (Optimized) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        
        {/* Deep background slow rotating obsidian/gold mix */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute w-[150vw] h-[150vw] max-w-[2000px] max-h-[2000px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_rgba(212,175,55,0.02)_30%,_rgba(0,0,0,0)_60%)] rounded-full"
        />
        
        {/* Pulsing Core - subtle warm glow behind text */}
        <motion.div 
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_rgba(212,175,55,0.03)_40%,_transparent_60%)] rounded-full"
        />

        {/* Silky Drifting Mist Layer 1 */}
        <motion.div 
          animate={{ x: ["-5%", "5%", "-5%"], y: ["3%", "-3%", "3%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-20%] w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.04)_0%,_transparent_50%)]"
        />
        
        {/* Silky Drifting Mist Layer 2 (Warm hue) */}
        <motion.div 
          animate={{ x: ["5%", "-5%", "5%"], y: ["-3%", "3%", "-3%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-10%] w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_bottom_right,_rgba(212,175,55,0.03)_0%,_transparent_50%)]"
        />
      </div>

      {/* 3. Sophisticated Falling Gold/Silver Dust */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {mounted && [...Array(30)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            initial={{ 
              opacity: 0,
              y: Math.random() * window.innerHeight,
              x: Math.random() * window.innerWidth,
              scale: Math.random() * 0.4 + 0.3
            }}
            animate={{ 
              y: `calc(${Math.random() * window.innerHeight}px - 150px)`,
              opacity: [0, Math.random() * 0.5 + 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 12 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute w-[3px] h-[3px] rounded-full"
            style={{
              backgroundColor: Math.random() > 0.5 ? '#fff' : '#D4AF37'
            }}
          />
        ))}
      </div>

      {/* 4. Minimalist Premium Typography (Perfectly Centered) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4">
        
        {/* Delicate top line */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="font-serif text-[5rem] sm:text-[8rem] md:text-[12rem] leading-none text-white tracking-[0.15em] drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] select-none">
            LUMEN
          </h1>
          
          <h2 className="font-serif text-[10px] sm:text-xs md:text-sm text-white/60 tracking-[0.8em] mt-6 uppercase font-light select-none">
            Nocturnal Elegance
          </h2>
        </motion.div>
      </div>

      {/* 5. Bottom Anchored Elements (Line & Buttons) */}
      <div className="absolute bottom-16 z-30 flex flex-col items-center w-full px-4">
        {/* Elegant Animated Line Drop */}
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "60px", opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="w-[1px] bg-gradient-to-b from-white/30 via-white/10 to-transparent mb-8 pointer-events-none"
        />

        {/* Minimalist Ultra-Luxury Ghost Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center gap-8"
        >
          <Link 
            href="/shop" 
            className="group relative w-64 py-5 border-[1px] border-white/20 text-white uppercase tracking-[0.3em] text-[10px] font-medium hover:border-white/60 transition-all duration-700 text-center overflow-hidden"
          >
            <span className="relative z-10 transition-colors duration-700 group-hover:text-black">Enter The Vault</span>
            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </Link>
          <Link 
            href="/#find-my-fit" 
            className="group relative w-64 py-5 border-[1px] border-white/20 text-white uppercase tracking-[0.3em] text-[10px] font-medium hover:border-white/60 transition-all duration-700 text-center overflow-hidden"
          >
            <span className="relative z-10 transition-colors duration-700 group-hover:text-black">Bespoke Fitting</span>
            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </Link>
        </motion.div>
      </div>

      {/* 5. Seamless Gradient Vignette for perfect blending into page */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#020202] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#020202] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(2,2,2,0.8)_100%)] z-10" />

    </section>
  );
}
