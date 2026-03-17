'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ImageGallery } from './ImageGallery';
import { SizeSelector } from './SizeSelector';
import { Badge } from '../ui/Badge';
import { useCart } from '@/lib/cart-store';
import { ProductCard } from './ProductCard';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [accordionState, setAccordionState] = useState({
    description: true,
    details: false,
    shipping: false,
  });
  
  const { addItem, toggleDrawer } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize);
    toggleDrawer();
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const toggleAccordion = (key: keyof typeof accordionState) => {
    setAccordionState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-[1440px] mx-auto pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 p-4 lg:p-16">
        {/* Left Column - Gallery */}
        <div className="w-full">
          <ImageGallery images={product.images} alt={product.name} />
        </div>

        {/* Right Column - Details */}
        <div className="flex flex-col">
          <div className="text-xs text-zinc-500 font-display font-bold tracking-widest uppercase mb-4">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link> / <Link href="/products" className="hover:text-white transition-colors">PRODUCTS</Link> / <span className="text-white">{product.name}</span>
          </div>

          {product.badge && (
            <div className="mb-4">
              <Badge>{product.badge}</Badge>
            </div>
          )}

          <h1 className="font-display font-black text-3xl md:text-5xl text-white tracking-tighter leading-tight mt-2">
            {product.name}
          </h1>

          <div className="flex items-center mt-4">
            <span className="text-3xl font-display font-black text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-zinc-500 line-through ml-3 text-xl font-display">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-brand-acid text-sm font-bold ml-2 bg-brand-acid/10 px-2 py-0.5 rounded tracking-wider">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          <div className="border-t border-zinc-800 my-6" />

          <SizeSelector 
            sizes={product.sizes} 
            selectedSize={selectedSize} 
            onSizeSelect={setSelectedSize}
            inStock={product.inStock}
          />

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || (product.inStock && !selectedSize)}
            className="w-full bg-brand-acid text-black font-display font-black text-sm tracking-widest uppercase py-5 rounded-2xl mt-6 hover:bg-brand-acid-dark active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!product.inStock ? 'SOLD OUT' : selectedSize ? 'ADD TO CART' : 'SELECT A SIZE'}
          </button>

          <button className="border border-zinc-700 text-zinc-400 hover:border-white hover:text-white w-full py-4 rounded-2xl mt-3 font-display font-bold text-sm transition-all flex items-center justify-center gap-2 group">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:fill-white/20 transition-colors">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            ADD TO WISHLIST
          </button>

          {/* Accordion Details */}
          <div className="mt-8 space-y-2">
            {/* Description */}
            <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-brand-zinc-900">
              <button 
                onClick={() => toggleAccordion('description')}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
              >
                <span className="font-display font-bold text-xs tracking-widest uppercase text-white">PRODUCT DESCRIPTION</span>
                <span className="text-zinc-500">{accordionState.description ? '−' : '+'}</span>
              </button>
              <div 
                className="overflow-hidden transition-all duration-300 ease-in-out" 
                style={{ maxHeight: accordionState.description ? '500px' : '0' }}
              >
                <div className="px-6 pb-5 pt-0 text-zinc-400 text-sm leading-relaxed">
                  {product.description}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-brand-zinc-900">
              <button 
                onClick={() => toggleAccordion('details')}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
              >
                <span className="font-display font-bold text-xs tracking-widest uppercase text-white">DETAILS AND CARE</span>
                <span className="text-zinc-500">{accordionState.details ? '−' : '+'}</span>
              </button>
              <div 
                className="overflow-hidden transition-all duration-300 ease-in-out" 
                style={{ maxHeight: accordionState.details ? '500px' : '0' }}
              >
                <div className="px-6 pb-5 pt-0">
                  <ul className="list-disc pl-5 space-y-2 text-zinc-400 text-sm">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="pl-1 text-zinc-300"><span className="text-zinc-400">{detail}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-brand-zinc-900">
              <button 
                onClick={() => toggleAccordion('shipping')}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
              >
                <span className="font-display font-bold text-xs tracking-widest uppercase text-white">SHIPPING AND RETURNS</span>
                <span className="text-zinc-500">{accordionState.shipping ? '−' : '+'}</span>
              </button>
              <div 
                className="overflow-hidden transition-all duration-300 ease-in-out" 
                style={{ maxHeight: accordionState.shipping ? '500px' : '0' }}
              >
                <div className="px-6 pb-5 pt-0 text-zinc-400 text-sm leading-relaxed space-y-3">
                  <p><strong className="text-white">Free standard shipping</strong> on all orders over ₹999.</p>
                  <p>Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available at checkout for ₹150.</p>
                  <p>We offer a hassle-free <strong className="text-white">15-day return policy</strong>. Items must be unworn and unwashed with original tags attached.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 px-4 lg:px-16 overflow-hidden">
          <h2 className="font-display font-black text-2xl text-white tracking-widest uppercase mb-6 flex items-center gap-4">
            YOU MIGHT ALSO LIKE
            <div className="h-px bg-zinc-800 flex-1" />
          </h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-none pb-8 snap-x p-2 -m-2">
            {relatedProducts.map(p => (
              <div key={p.id} className="w-[280px] md:w-[320px] flex-shrink-0 snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
