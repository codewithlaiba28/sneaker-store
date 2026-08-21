import React from "react";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CategoryShowcase from "@/components/CategoryShowcase";
import TrustSection from "@/components/TrustSection";
import FindMyFit from "@/components/FindMyFit";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid limit={4} />
      
      {/* Divider with corner flourishes (abstracted to a simple styled break for now) */}
      <div className="w-full flex justify-center py-12 relative">
        <div className="w-px h-24 bg-gradient-to-b from-brand-gold/0 via-brand-gold/50 to-brand-gold/0" />
      </div>

      <CategoryShowcase />
      <TrustSection />

      <div className="w-full flex justify-center py-12 relative">
        <div className="w-px h-24 bg-gradient-to-b from-brand-gold/0 via-brand-gold/50 to-brand-gold/0" />
      </div>

      <FindMyFit />
    </>
  );
}
