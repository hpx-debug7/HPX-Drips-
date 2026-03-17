'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from '../product/ProductCard';

interface FeaturedDropsProps {
  products: Product[];
}

export function FeaturedDrops({ products }: FeaturedDropsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'tees' | 'hoodies' | 'footwear'>('all');
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter(p => 
    p.featured && (activeTab === 'all' || p.category === activeTab)
  ).slice(0, 6);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -80px 0px' }
    );

    const cards = gridRef.current?.querySelectorAll('.feature-card-wrapper');
    cards?.forEach(card => observer.observe(card));

    return () => {
      cards?.forEach(card => observer.unobserve(card));
      observer.disconnect();
    };
  }, [filteredProducts]);

  return (
    <section className="bg-brand-black py-24 px-4 md:px-8 max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white tracking-tighter uppercase">LATEST DROPS</h2>
          
          <div className="flex gap-4 mt-6">
            {(['all', 'tees', 'hoodies', 'footwear'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-display font-bold text-xs tracking-widest uppercase pb-1 border-b-2 transition-colors ${
                  activeTab === tab ? 'border-brand-acid text-white' : 'border-transparent text-zinc-600 hover:text-zinc-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <Link href="/products" className="text-brand-acid text-sm font-bold tracking-widest uppercase hover:text-white transition-colors">
          VIEW ALL →
        </Link>
      </div>

      <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-10">
        {filteredProducts.map((product, index) => (
          <div 
            key={product.id} 
            className="feature-card-wrapper opacity-0 translate-y-6"
            style={{ 
              '--i': index,
              animationDelay: 'calc(var(--i) * 80ms)'
            } as React.CSSProperties}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <style jsx global>{`
        .is-visible {
          animation: fade-up 0.6s ease forwards;
        }
      `}</style>
    </section>
  );
}
