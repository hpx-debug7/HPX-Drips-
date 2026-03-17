import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-brand-zinc-900 border-t border-zinc-800 pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
        <div className="space-y-4 flex flex-col items-start">
          <Link href="/" className="font-display font-black text-4xl tracking-tighter text-white inline-block">
            HPX <span className="text-brand-acid">DRIPS</span>
          </Link>
          <p className="text-zinc-400 font-display italic tracking-wide">Wear the culture.</p>
        </div>

        <div className="flex flex-col space-y-4">
          <h4 className="font-display font-bold text-white tracking-widest uppercase mb-2">Shop</h4>
          <Link href="/products" className="text-zinc-400 hover:text-brand-acid text-sm transition-colors">All Drops</Link>
          <Link href="/category/tees" className="text-zinc-400 hover:text-brand-acid text-sm transition-colors">Tees & Tops</Link>
          <Link href="/category/hoodies" className="text-zinc-400 hover:text-brand-acid text-sm transition-colors">Hoodies</Link>
          <Link href="/category/cargo" className="text-zinc-400 hover:text-brand-acid text-sm transition-colors">Cargo Pants</Link>
          <Link href="/lookbook" className="text-zinc-400 hover:text-brand-acid text-sm transition-colors">Lookbook</Link>
        </div>

        <div className="flex flex-col space-y-4">
          <h4 className="font-display font-bold text-white tracking-widest uppercase mb-2">Support</h4>
          <Link href="#" className="text-zinc-400 hover:text-brand-acid text-sm transition-colors">Shipping Policy</Link>
          <Link href="#" className="text-zinc-400 hover:text-brand-acid text-sm transition-colors">Returns & Exchanges</Link>
          <Link href="#" className="text-zinc-400 hover:text-brand-acid text-sm transition-colors">Size Guide</Link>
          <Link href="#" className="text-zinc-400 hover:text-brand-acid text-sm transition-colors">Contact Us</Link>
          <Link href="#" className="text-zinc-400 hover:text-brand-acid text-sm transition-colors">FAQs</Link>
        </div>

        <div className="flex flex-col space-y-4">
          <h4 className="font-display font-bold text-brand-acid tracking-widest uppercase mb-2">@HPXDRIPS</h4>
          <div className="flex gap-4 mb-4">
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors" aria-label="X (Twitter)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
            </Link>
          </div>
          <div className="flex bg-brand-black rounded-lg overflow-hidden border border-zinc-700 p-1">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="bg-transparent border-none outline-none text-white text-xs px-3 w-full font-display placeholder:text-zinc-600"
            />
            <button className="bg-brand-acid text-black text-[10px] font-display font-black tracking-widest px-4 py-2 rounded uppercase hover:bg-brand-acid-dark transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto border-t border-zinc-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-600 font-display">© {new Date().getFullYear()} HPX DRIPS ALL RIGHTS RESERVED.</p>
        <div className="flex gap-2 flex-wrap justify-center">
          {['VISA', 'MASTERCARD', 'UPI', 'COD', 'EMI'].map(method => (
            <span key={method} className="border border-zinc-700 text-zinc-500 text-[10px] font-display font-bold px-2.5 py-1 rounded tracking-wider bg-brand-black">
              {method}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
