'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-store';
import { CartItem } from './CartItem';
import { Button } from '../ui/Button';

export function CartDrawer() {
  const { state, toggleDrawer, cartCount, cartTotal } = useCart();
  const { isOpen, items } = state;

  if (!isOpen) return null;

  const maxShipping = 999;
  const progressRaw = (cartTotal / maxShipping) * 100;
  const progressPercent = Math.min(progressRaw, 100);
  const remainingForFree = Math.max(maxShipping - cartTotal, 0);

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={toggleDrawer}
        aria-label="Close cart drawer"
      />
      <div className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-brand-zinc-900 flex flex-col z-[51] animate-slide-left shadow-2xl">
        <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
          <h2 className="font-display font-black text-white tracking-widest uppercase">CART ({cartCount})</h2>
          <button onClick={toggleDrawer} className="text-zinc-400 hover:text-white transition-colors" aria-label="Close cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-none space-y-2">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40 space-y-4">
              <div className="text-6xl grayscale">🛒</div>
              <p className="font-display font-black text-xl text-white">YOUR CART IS EMPTY</p>
              <Link href="/products" onClick={toggleDrawer}>
                <Button variant="outline" className="mt-4">START SHOPPING</Button>
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <CartItem key={`${item.product.id}-${item.size}`} item={item} compact />
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-zinc-800 px-6 py-6 space-y-4 bg-brand-zinc-900 mt-auto">
            <div className="flex justify-between font-display font-black text-white text-xl">
              <span>SUBTOTAL</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="flex gap-4 pt-2">
              <Link href="/cart" onClick={toggleDrawer} className="flex-1">
                <Button variant="outline" fullWidth>VIEW CART</Button>
              </Link>
              <Link href="/cart" onClick={toggleDrawer} className="flex-1">
                <Button variant="acid-fill" fullWidth>CHECKOUT</Button>
              </Link>
            </div>

            <div className="pt-2">
              <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-3 overflow-hidden">
                <div 
                  className="bg-brand-acid h-full transition-all duration-500 ease-out" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-zinc-400 text-center mt-3 font-display font-bold">
                {remainingForFree > 0 
                  ? `Add ₹${remainingForFree.toLocaleString('en-IN')} more for free shipping` 
                  : "You've unlocked free shipping! 🎉"}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
