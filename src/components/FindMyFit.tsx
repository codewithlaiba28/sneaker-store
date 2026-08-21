"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Loader2, Mic, Square } from 'lucide-react';
import Image from 'next/image';
import { Sneaker } from '@/lib/data';
import { useCart } from './CartProvider';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  products?: Sneaker[];
}

export default function FindMyFit() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Welcome to LUMEN. Describe your style, fit needs, or the occasion, and I will find your perfect match.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { addItem } = useCart();

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  const toggleListen = () => {
    if (isListening) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setInput('');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      
      // Auto submit after a brief delay so the user sees the text
      setTimeout(() => {
        const form = document.getElementById('chat-form') as HTMLFormElement;
        form?.requestSubmit();
      }, 500);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Request cancelled.' }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      // Send chat history (excluding products payload) to API
      const apiMessages = messages.map(m => ({ role: m.role, content: m.content })).concat({ role: 'user', content: userMessage });
      const shownProductIds = messages.flatMap(m => m.products ? m.products.map(p => p.id) : []);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, shownProductIds }),
        signal: controller.signal
      });

      if (!response.ok) throw new Error('Failed to fetch recommendation');

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.message,
        products: data.products 
      }]);

    } catch (error: any) {
      if (error.name === 'AbortError') return; // Handled by handleStop
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Apologies, our bespoke recommendation service is currently experiencing high demand. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

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

      <div className="bg-[#030303] border border-white/20 rounded-sm shadow-[0_0_50px_rgba(255,255,255,0.05)] overflow-hidden max-h-[700px] flex flex-col relative group">
        
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

        {/* Corner Flourishes */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/50 pointer-events-none m-2" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/50 pointer-events-none m-2" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/50 pointer-events-none m-2 z-10" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/50 pointer-events-none m-2 z-10" />

        {/* Chat Messages */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-white/10 border border-white/30 text-white' : 'bg-[#050505] border border-white/10 text-white/90'} rounded-sm p-5`}>
                <p className="leading-relaxed whitespace-pre-wrap font-light text-sm md:text-base">
                  {msg.content}
                </p>
                
                {/* Product Mini Cards inline */}
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white font-bold">Curated Matches</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {msg.products.map(product => (
                        <div key={product.id} className="bg-[#020202] border border-white/10 p-3 flex gap-4 group">
                          <div className="relative w-16 h-16 bg-[#030303] rounded-sm overflow-hidden shrink-0">
                            <Image 
                              src={product.imageUrl} 
                              alt={product.name} 
                              fill 
                              className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-500 filter grayscale" 
                            />
                          </div>
                          <div className="flex flex-col justify-between">
                            <div>
                              <h4 className="font-serif text-sm text-white truncate">{product.name}</h4>
                              <p className="text-white/80 text-xs font-serif">${product.price}</p>
                            </div>
                            <button 
                              onClick={() => addItem(product, product.sizes[0])}
                              className="text-[10px] uppercase tracking-widest text-white/70 hover:text-white text-left transition-colors font-bold"
                            >
                              + Add to Cart
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#050505] border border-white/10 text-white/60 rounded-sm p-4 flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span className="text-sm italic">The concierge is thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-[#050505] border-t border-white/20">
          <form id="chat-form" onSubmit={handleSubmit} className="flex gap-4">
            <div className="relative flex-1">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening..." : "e.g. 'I need a wide-fit running shoe in black'"}
                className={`w-full bg-[#020202] border ${isListening ? 'border-brand-gold' : 'border-white/20'} text-white pl-6 pr-12 py-4 rounded-sm focus:outline-none focus:border-white transition-colors font-light placeholder:text-white/30`}
              />
              <button 
                type="button"
                onClick={toggleListen}
                className={`absolute right-4 top-1/2 -translate-y-1/2 ${isListening ? 'text-brand-gold animate-pulse' : 'text-white/40 hover:text-white'} transition-colors`}
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
            
            {isLoading ? (
              <button 
                type="button" 
                onClick={handleStop}
                className="bg-red-900/50 border border-red-500/50 text-white px-8 py-4 font-bold tracking-[0.2em] uppercase hover:bg-red-900 hover:shadow-[0_0_15px_rgba(255,0,0,0.4)] transition-all rounded-sm flex items-center gap-2"
              >
                Stop <Square className="w-4 h-4 fill-current" />
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={!input.trim()}
                className="bg-white text-black px-8 py-4 font-bold tracking-[0.2em] uppercase hover:bg-[#e0e0e0] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-sm flex items-center gap-2"
              >
                Send <Send className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
