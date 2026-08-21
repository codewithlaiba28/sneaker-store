import React from "react";
import ProductGrid from "@/components/ProductGrid";
import { Sparkles } from "lucide-react";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#020202]">
      
      {/* Shop Hero Banner */}
      <div className="relative h-[50vh] min-h-[450px] w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image with Cinematic Grading */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/snk11.jpg')] bg-cover bg-[center_30%] opacity-40 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/90 to-transparent" />
        </div>

        {/* Floating Particles (CSS handled in globals if any, or just rely on image) */}
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 mt-16 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4 text-white/50">
            <div className="w-8 h-[1px] bg-white/30" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">The Archive</span>
            <div className="w-8 h-[1px] bg-white/30" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white uppercase tracking-[0.2em] drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Full Collection
          </h1>
          
          <p className="text-white/60 tracking-[0.1em] font-light max-w-xl mx-auto text-xs md:text-sm mt-8 leading-relaxed">
            Explore the complete archive of LUMEN footwear. Engineered for the shadows, designed for the bold. Step into the void.
          </p>
        </div>
      </div>

      <div className="relative z-20 -mt-10">
        <ProductGrid hideTitle={true} />
      </div>
    </div>
  );
}
