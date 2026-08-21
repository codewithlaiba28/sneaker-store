import React from 'react';

export default function Footer() {
  return (
    <footer id="about" className="bg-[#050506] border-t border-brand-gold/10 pt-20 pb-10 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-brand-light/70 text-sm">
        
        {/* Brand */}
        <div className="md:col-span-1">
          <h2 className="text-3xl font-serif text-brand-light tracking-widest mb-6">LUMEN</h2>
          <p className="font-light leading-relaxed mb-6">
            Pioneering the intersection of steampunk aesthetics and modern performance engineering. 
            Luxury sneakers for those who walk the night.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-brand-gold transition-colors">Instagram</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Twitter</a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-brand-gold font-serif tracking-widest mb-6 uppercase text-xs">Explore</h4>
          <ul className="space-y-4">
            <li><a href="#shop" className="hover:text-brand-light transition-colors">The Collection</a></li>
            <li><a href="#new-drops" className="hover:text-brand-light transition-colors">Limited Releases</a></li>
            <li><a href="#find-my-fit" className="hover:text-brand-light transition-colors">AI Concierge</a></li>
            <li><a href="#" className="hover:text-brand-light transition-colors">Our Story</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-brand-gold font-serif tracking-widest mb-6 uppercase text-xs">Client Services</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-brand-light transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-brand-light transition-colors">Size Guide</a></li>
            <li><a href="#" className="hover:text-brand-light transition-colors">Care Instructions</a></li>
            <li><a href="#" className="hover:text-brand-light transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-brand-gold font-serif tracking-widest mb-6 uppercase text-xs">Newsletter</h4>
          <p className="font-light mb-4">Subscribe to receive encrypted transmissions regarding new drops.</p>
          <form className="flex border-b border-brand-light/20 pb-2 focus-within:border-brand-gold transition-colors">
            <input 
              type="email" 
              placeholder="Email address"
              className="bg-transparent border-none outline-none flex-1 text-brand-light placeholder:text-brand-light/30"
            />
            <button type="submit" className="text-brand-gold font-bold uppercase tracking-widest text-xs hover:text-brand-light transition-colors">
              Join
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-brand-light/10 text-center md:text-left flex flex-col md:flex-row justify-between text-xs text-brand-light/40">
        <p>&copy; {new Date().getFullYear()} LUMEN Footwear. All rights reserved.</p>
        <div className="space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-brand-light transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-light transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
