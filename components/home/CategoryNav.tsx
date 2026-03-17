'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function CategoryNav() {
  const pathname = usePathname();

  const categories = [
    { name: 'All', path: '/products' },
    { name: 'New Drops', path: '/products' },
    { name: 'Tees', path: '/category/tees' },
    { name: 'Hoodies', path: '/category/hoodies' },
    { name: 'Cargo', path: '/category/cargo' },
    { name: 'Footwear', path: '/category/footwear' },
    { name: 'Accessories', path: '/category/accessories' },
    { name: 'Collabs', path: '/products' },
  ];

  return (
    <div className="sticky top-[73px] md:top-20 z-30 bg-brand-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 py-4">
      <div className="max-w-[1440px] mx-auto px-4 overflow-x-auto scrollbar-none">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat, idx) => {
            const isActive = pathname === cat.path && 
              (cat.name !== 'New Drops' && cat.name !== 'Collabs' || idx === 0 && pathname === '/products');
            
            return (
              <Link
                key={idx}
                href={cat.path}
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
      </div>
    </div>
  );
}
