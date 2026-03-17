'use client';

import React from 'react';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
  inStock?: boolean;
}

export function SizeSelector({ sizes, selectedSize, onSizeSelect, inStock = true }: SizeSelectorProps) {
  return (
    <div>
      <div className="flex justify-between items-end mb-3">
        <span className="text-xs text-zinc-400 font-display font-bold tracking-widest uppercase">Size</span>
        <button className="text-xs text-brand-acid hover:underline font-display font-bold tracking-wide">
          SIZE GUIDE ↗
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              onClick={() => inStock && onSizeSelect(size)}
              disabled={!inStock}
              className={`font-display font-bold text-sm px-5 py-3 rounded-xl transition-all border ${
                !inStock 
                  ? 'opacity-30 cursor-not-allowed line-through border-zinc-700 text-white' 
                  : isSelected
                    ? 'border-brand-acid bg-brand-acid text-black'
                    : 'border-zinc-700 text-white hover:border-brand-acid hover:text-brand-acid cursor-pointer'
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
