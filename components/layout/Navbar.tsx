'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart-store';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, toggleDrawer } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-brand-zinc-900/95 backdrop-blur-md border-b border-zinc-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-white mt-1" 
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <Link href="/" className="font-display font-black text-2xl tracking-tighter text-white">
              HPX <span className="text-brand-acid">DRIPS</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-zinc-400 hover:text-white text-xs font-display font-bold tracking-widest uppercase transition-colors">DROPS</Link>
            <Link href="/category/hoodies" className="text-zinc-400 hover:text-white text-xs font-display font-bold tracking-widest uppercase transition-colors">HOODIES</Link>
            <Link href="/lookbook" className="text-zinc-400 hover:text-white text-xs font-display font-bold tracking-widest uppercase transition-colors">LOOKBOOK</Link>
            <Link href="/products" className="text-zinc-400 hover:text-white text-xs font-display font-bold tracking-widest uppercase transition-colors">COLLABS</Link>
          </div>

          <div className="flex items-center gap-5 md:gap-6">
            <Link href="/search" className="text-white hover:text-brand-acid transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </Link>
            <button 
              className="text-white hover:text-brand-acid transition-colors relative"
              onClick={toggleDrawer}
              aria-label="Cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-acid text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Link href="#" className="hidden md:block border border-brand-acid text-brand-acid hover:bg-brand-acid hover:text-black font-display font-black text-xs tracking-widest px-5 py-2 rounded-full transition-all">
              JOIN
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-brand-black flex flex-col px-8 pt-24 animate-fade-in">
          <button 
            className="absolute top-6 right-8 text-white hover:text-brand-acid transition-colors"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="flex flex-col space-y-8 font-display font-black text-5xl text-white leading-none mt-8">
            <Link href="/" className="hover:text-brand-acid transition-colors animate-fade-up" style={{ animationDelay: '0ms' }}>HOME</Link>
            <Link href="/products" className="hover:text-brand-acid transition-colors animate-fade-up" style={{ animationDelay: '50ms' }}>DROPS</Link>
            <Link href="/category/hoodies" className="hover:text-brand-acid transition-colors animate-fade-up" style={{ animationDelay: '100ms' }}>HOODIES</Link>
            <Link href="/lookbook" className="hover:text-brand-acid transition-colors animate-fade-up" style={{ animationDelay: '150ms' }}>LOOKBOOK</Link>
            <Link href="/products" className="hover:text-brand-acid transition-colors animate-fade-up" style={{ animationDelay: '200ms' }}>COLLABS</Link>
          </div>

          <div className="mt-auto pb-12 animate-fade-up" style={{ animationDelay: '300ms' }}>
            <Link href="#" className="inline-block border border-brand-acid text-brand-acid hover:bg-brand-acid hover:text-black font-display font-black text-lg tracking-widest px-8 py-3 rounded-full transition-all">
              JOIN DRIPS
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
