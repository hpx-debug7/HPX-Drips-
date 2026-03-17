'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cart-store';
import { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
  compact?: boolean;
}

export function CartItem({ item, compact = false }: CartItemProps) {
  const { updateQty, removeItem } = useCart();
  const { product, size, quantity } = item;

  return (
    <div className={`flex gap-4 ${compact ? 'py-4' : 'py-6 border-b border-zinc-800'}`}>
      <div className={`${compact ? 'w-20' : 'w-24'} aspect-[3/4] rounded-xl relative overflow-hidden flex-shrink-0 bg-zinc-900 group`}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100px, 150px"
        />
      </div>
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-display font-bold text-white text-sm leading-snug">{product.name}</h3>
            <button 
              onClick={() => removeItem(product.id, size)}
              className="text-zinc-500 text-xs hover:text-brand-acid transition-colors"
              aria-label="Remove item"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </button>
          </div>
          <p className="text-zinc-500 text-[11px] uppercase tracking-wider mt-1">SIZE: {size}</p>
          <p className="font-display font-black text-brand-white text-sm mt-1">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-3">
          <div className="border border-zinc-700 rounded-full flex items-center justify-between px-3 py-1 text-white font-display font-bold w-24">
            <button 
              onClick={() => updateQty(product.id, size, quantity - 1)}
              className="text-zinc-400 hover:text-white px-1 active:scale-75 transition-transform"
              type="button"
            >
              −
            </button>
            <span className="text-xs">{quantity}</span>
            <button 
              onClick={() => updateQty(product.id, size, quantity + 1)}
              className="text-zinc-400 hover:text-white px-1 active:scale-75 transition-transform"
              type="button"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
