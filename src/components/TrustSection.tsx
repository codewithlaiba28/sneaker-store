"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeftRight, Star } from 'lucide-react';

const reviews = [
  { name: 'Elias V.', text: 'The Aethelgard is a masterpiece. Wearing it feels like walking in a nocturnal gallery.', rating: 5 },
  { name: 'Sarah M.', text: 'Finally, a luxury sneaker that doesn\'t compromise on actual running performance.', rating: 5 },
  { name: 'Kael T.', text: 'Impeccable craftsmanship. The silver thread details catch the light beautifully.', rating: 5 }
];

export default function TrustSection() {
  return (
    <section className="py-24 px-6 bg-brand-darker border-y border-brand-gold/10 relative">
      
      {/* Corner Flourishes */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-brand-gold/40 m-4" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-brand-gold/40 m-4" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-brand-gold/40 m-4" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-brand-gold/40 m-4" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        
        {/* Badges / Guarantees */}
        <div className="flex-1 space-y-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-start gap-6"
          >
            <div className="w-14 h-14 rounded-sm bg-brand-gold/10 flex items-center justify-center shrink-0 border border-brand-gold/30 text-brand-gold glow-gold">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-brand-light tracking-wide">Bespoke Fit Guarantee</h3>
              <p className="text-brand-light/60 mt-2 text-sm leading-relaxed">
                If the silhouette does not align perfectly with your anatomy, our tailors offer an immediate complimentary exchange.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-6"
          >
            <div className="w-14 h-14 rounded-sm bg-brand-gold/10 flex items-center justify-center shrink-0 border border-brand-gold/30 text-brand-gold glow-gold">
              <ArrowLeftRight className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-brand-light tracking-wide">Seamless Returns</h3>
              <p className="text-brand-light/60 mt-2 text-sm leading-relaxed">
                A 30-day window for untethered returns. We respect the drifter's right to change their path.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Reviews Carousel */}
        <div className="flex-1 w-full bg-brand-dark p-10 border border-brand-light/10 relative">
          <h3 className="text-brand-gold text-xs uppercase tracking-widest font-bold mb-8">Client Transmissions</h3>
          
          <div className="flex flex-col gap-8">
            {reviews.map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="border-l border-brand-gold/30 pl-6"
              >
                <div className="flex text-brand-gold mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-brand-light/80 italic text-sm mb-2">&quot;{review.text}&quot;</p>
                <p className="text-brand-light/40 text-xs uppercase tracking-wider">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
