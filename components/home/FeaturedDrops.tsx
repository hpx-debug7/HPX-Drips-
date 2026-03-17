'use client';

import { useState, useEffect, useRef } from 'react';
import { Product, MOCK_PRODUCTS } from '@/types';
import ProductCard from './ProductCard';

type Category = 'All' | 'Tees' | 'Hoodies' | 'Cargo' | 'Accessories';

export default function FeaturedDrops(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = ['All', 'Tees', 'Hoodies', 'Cargo', 'Accessories'];

  const filteredProducts = activeCategory === 'All'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter((product) => product.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setVisibleCards((prev) => new Set(Array.from(prev).concat(index)));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-index]');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredProducts]);

  return (
    <section ref={sectionRef} className="bg-brand-off-black pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <h2 className="font-display font-black text-4xl sm:text-5xl tracking-tighter text-white">
            LATEST DROPS
          </h2>
          <a
            href="/shop"
            className="text-brand-acid text-sm font-bold tracking-widest hover:underline"
          >
            VIEW ALL →
          </a>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === category
                  ? 'bg-brand-acid text-black'
                  : 'border border-zinc-700 text-zinc-400 hover:border-zinc-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filteredProducts.map((product: Product, index: number) => (
            <div key={product.id} data-index={index}>
              <ProductCard
                product={product}
                index={index}
                isVisible={visibleCards.has(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
