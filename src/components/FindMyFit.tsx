"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';
import ChatInterface from './ChatInterface';

export default function FindMyFit() {
  return (
    <section id="find-my-fit" className="py-24 px-6 max-w-5xl mx-auto relative">
      
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-10 w-[1px] h-32 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
      <div className="absolute bottom-0 right-10 w-[1px] h-32 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />

      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif text-white tracking-[0.2em] flex items-center justify-center gap-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] uppercase">
          <Sparkles className="w-6 h-6" /> FIND MY FIT
        </h2>
        <p className="text-brand-light/60 mt-4 tracking-wide">
          Consult with our AI concierge to discover the sneaker engineered for your exact needs.
        </p>
      </div>
      <ChatInterface className="max-h-[700px] min-h-[250px] shadow-[0_0_50px_rgba(255,255,255,0.05)] rounded-2xl" />
    </section>
  );
}
