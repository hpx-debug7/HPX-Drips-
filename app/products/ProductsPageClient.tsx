'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { ProductGrid } from '@/components/product/ProductGrid';
import { FilterBar } from '@/components/ui/FilterBar';

interface ProductsPageClientProps {
  initialProducts: Product[];
  categories: { name: string; slug: string }[];
  currentCategory?: string;
  title: string;
  headerImage?: string;
}

export function ProductsPageClient({ 
  initialProducts, 
  categories, 
  currentCategory = 'all',
  title,
  headerImage
}: ProductsPageClientProps) {
  const [activeCategory, setActiveCategory] = useState(currentCategory);
  const [sortBy, setSortBy] = useState('featured');

  let filtered = initialProducts;
  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'featured') return (a.featured === b.featured) ? 0 : a.featured ? -1 : 1;
    return 0; 
  });

  return (
    <div className="flex-1 flex flex-col">
      <div className={`relative pt-32 pb-12 px-4 md:px-8 border-b border-zinc-800 ${headerImage ? '' : 'bg-brand-black'}`}>
        {headerImage && (
          <>
            <div className="absolute inset-0 z-0">
              <Image src={headerImage} alt={title} fill priority className="object-cover" quality={90} />
            </div>
            <div className="absolute inset-0 z-0 bg-black/70 backdrop-blur-[2px]" />
          </>
        )}
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="text-xs text-zinc-400 tracking-widest uppercase mb-4 font-display font-bold">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link> / 
            {headerImage ? <Link href="/products" className="hover:text-white transition-colors"> PRODUCTS</Link> : null} 
            {headerImage ? ' / ' : ''}
            <span className="text-white">{title}</span>
          </div>
          <h1 className="font-display font-black text-5xl md:text-7xl text-white tracking-tighter uppercase">
            {title}
          </h1>
          <p className="text-brand-acid text-sm font-display mt-2 font-bold tracking-widest bg-brand-acid/10 inline-block px-3 py-1 rounded">
            {filtered.length} STYLES
          </p>
        </div>
      </div>

      <FilterBar 
        categories={categories}
        activeCategory={activeCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="p-4 md:p-8 max-w-[1440px] mx-auto w-full flex-1">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center h-full">
            <h3 className="font-display font-black text-2xl text-white mb-4 uppercase tracking-widest">NO DROPS IN THIS CATEGORY YET</h3>
            <button 
              onClick={() => { setActiveCategory('all'); setSortBy('featured'); }}
              className="border border-brand-acid text-brand-acid hover:bg-brand-acid hover:text-black font-display font-black text-xs tracking-widest px-6 py-3 rounded-full transition-all mt-4 uppercase"
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <ProductGrid products={filtered} />
        )}
      </div>
    </div>
  );
}
