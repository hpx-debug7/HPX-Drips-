'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { Badge } from '../ui/Badge';
import { useCart } from '@/lib/cart-store';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const { addItem, toggleDrawer } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    addItem(product, selectedSize);
    setShowToast(true);
    
    setTimeout(() => {
      setShowToast(false);
      toggleDrawer();
    }, 1500);
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <Link href={`/products/${product.slug}`} className="group relative bg-brand-zinc-900 rounded-2xl overflow-hidden block">
      <div className="aspect-[3/4] relative overflow-hidden bg-zinc-900">
        <Image 
          src={product.images[0]} 
          alt={product.name}
          fill
          priority={priority}
          className="object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 50vw, 33vw"
          quality={80}
        />
        
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge>{product.badge}</Badge>
          </div>
        )}

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-black/85 backdrop-blur-md px-4 py-3">
          {showToast ? (
            <div className="w-full bg-brand-acid text-black font-display font-black text-xs tracking-widest uppercase py-2.5 rounded-xl text-center">
              Added to cart ✓
            </div>
          ) : (
            <>
              <div className="flex gap-1.5 flex-wrap mb-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedSize(size);
                    }}
                    className={`border text-[10px] font-display font-bold px-2 py-1 rounded-md transition-colors ${
                      selectedSize === size 
                        ? 'border-brand-acid text-brand-acid bg-brand-acid/10' 
                        : 'border-zinc-600 text-zinc-300 hover:border-brand-acid hover:text-brand-acid'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-brand-acid text-black font-display font-black text-xs tracking-widest uppercase py-2.5 rounded-xl hover:bg-brand-acid-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!product.inStock ? 'SOLD OUT' : selectedSize ? 'ADD TO CART' : 'SELECT SIZE'}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="px-3 pt-3 pb-4 flex flex-col h-full">
        <h3 className="font-display font-bold text-brand-white text-sm leading-snug truncate">{product.name}</h3>
        <p className="text-zinc-500 text-[11px] uppercase tracking-wider mt-0.5">{product.category}</p>
        
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-display font-black text-brand-white text-base">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-zinc-600 text-sm line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-brand-acid text-xs font-bold">
                ({discount}% OFF)
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
