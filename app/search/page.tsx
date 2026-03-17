'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductCard } from '@/components/product/ProductCard';

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q')?.toLowerCase() || '';

  const results = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.category.toLowerCase().includes(q) || 
    p.description.toLowerCase().includes(q)
  );

  const exploreMore = PRODUCTS.slice().sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 md:px-8 max-w-[1440px] mx-auto w-full flex flex-col flex-1">
      <div className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="font-display font-black text-3xl md:text-5xl text-white tracking-tighter uppercase mb-2">
          RESULTS FOR &quot;{q}&quot;
        </h1>
        <p className="text-zinc-500 text-sm font-display font-bold tracking-widest uppercase">
          {results.length} STYLES FOUND
        </p>
      </div>

      {results.length > 0 ? (
        <ProductGrid products={results} />
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-6xl mb-6 opacity-20 grayscale">🔍</div>
          <h2 className="font-display font-black text-2xl text-white tracking-widest uppercase mb-4">
            NO DROPS FOUND FOR &quot;{q}&quot;
          </h2>
          <p className="text-zinc-400 font-display mb-8">Try searching for tees, hoodies, or other streetwear essentials.</p>
          
          <div className="w-full mt-16 text-left border-t border-zinc-800 pt-16">
            <h3 className="font-display font-black text-xl text-white tracking-widest uppercase mb-8">
              EXPLORE THESE INSTEAD
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-3 md:gap-5">
              {exploreMore.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 pb-24 flex justify-center bg-brand-black"><div className="w-8 h-8 rounded-full border-t-2 border-brand-acid animate-spin"></div></div>}>
      <SearchResults />
    </Suspense>
  );
}
