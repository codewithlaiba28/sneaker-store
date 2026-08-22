"use client";

import React, { useState } from 'react';
import { MessageSquare, X, Sparkles } from 'lucide-react';
import ChatInterface from './ChatInterface';

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[60] bg-black/80 backdrop-blur-md border border-white/20 text-white h-14 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:border-white/40 hover:bg-white/10 hover:scale-105 transition-all duration-500 flex items-center px-4 overflow-hidden group cursor-pointer ${
          isOpen ? 'translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
        <span className="max-w-0 opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:ml-3 transition-all duration-500 whitespace-nowrap font-serif uppercase tracking-widest text-xs font-bold text-white/90">
          Chat AI
        </span>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[70] w-[calc(100vw-2rem)] sm:w-[420px] h-[650px] max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-8 fade-in duration-300 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="bg-black/95 backdrop-blur-xl border border-white/10 border-b-0 rounded-t-xl flex justify-between items-center p-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
            <h3 className="font-serif tracking-[0.3em] text-sm text-white font-bold flex items-center gap-2 relative z-10">
              <Sparkles className="w-4 h-4 text-white/70" /> LUMEN
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white transition-colors relative z-10 p-1 hover:bg-white/10 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <ChatInterface className="flex-1 rounded-t-none rounded-b-xl border border-white/10 border-t-0" />
        </div>
      )}
    </>
  );
}
