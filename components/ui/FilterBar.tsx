'use client';

import React from 'react';
import Link from 'next/link';

interface FilterBarProps {
  categories: { name: string; slug: string }[];
  activeCategory: string;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function FilterBar({ categories, activeCategory, sortBy, onSortChange }: FilterBarProps) {
  return (
    <div className="bg-brand-zinc-900/95 backdrop-blur-sm sticky top-16 z-30 py-4 px-4 md:px-8 border-b border-zinc-800 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex gap-2 w-full overflow-x-auto scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <Link
              key={cat.slug}
              href={cat.slug === 'all' ? '/products' : `/category/${cat.slug}`}
              className={`font-display text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-brand-acid text-black'
                  : 'border border-zinc-700 text-zinc-400 hover:border-zinc-300 hover:text-white'
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>
      <div className="w-full md:w-auto flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 text-white text-xs font-display font-bold px-4 py-2 rounded-full appearance-none pr-8 relative cursor-pointer outline-none focus:border-brand-acid transition-colors"
          style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.7rem top 50%', backgroundSize: '0.65rem auto' }}
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price Low to High</option>
          <option value="price-desc">Price High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
}
