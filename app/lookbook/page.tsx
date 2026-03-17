import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SS25 Lookbook | HPX DRIPS',
  description: 'A visual exploration of urban decay and rebirth.',
};

export default function LookbookPage() {
  const shopTheLook = PRODUCTS.filter(p => p.featured).slice(0, 4);

  return (
    <div className="bg-brand-black">
      {/* Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=90"
            alt="Season 25 Lookbook"
            fill
            priority
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center px-4 mt-20">
          <span className="text-brand-acid font-display font-black text-xs tracking-[0.4em] uppercase mb-4 animate-[fade-up_1s_ease_forwards]" style={{opacity: 0, animationDelay: '0ms'}}>
            SS25 LOOKBOOK
          </span>
          <h1 className="font-display font-black text-[clamp(2.5rem,10vw,8rem)] leading-none text-white tracking-tighter uppercase mb-6 animate-[fade-up_1s_ease_forwards]" style={{opacity: 0, animationDelay: '200ms'}}>
            WEAR THE CULTURE
          </h1>
        </div>
      </section>

      {/* Editorial Grid */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
          <div className="flex flex-col group md:col-span-2 lg:col-span-1">
            <Link href="/category/hoodies" className="relative aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden hover:opacity-90 transition-opacity">
              <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Editorial 1" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </Link>
            <p className="font-display italic text-zinc-400 text-sm mt-3">Late night missions. Central Ward.</p>
          </div>

          <div className="flex flex-col group lg:row-span-2 lg:col-span-2">
            <Link href="/category/accessories" className="relative h-[60vh] lg:h-[800px] rounded-2xl overflow-hidden hover:opacity-90 transition-opacity block">
              <Image src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80" alt="Editorial 2" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </Link>
            <p className="font-display italic text-zinc-400 text-sm mt-3">Heavyweight essentials. Built for the concrete.</p>
          </div>

          <div className="flex flex-col group md:col-span-2 lg:col-span-1">
            <Link href="/category/cargo" className="relative aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden hover:opacity-90 transition-opacity">
              <Image src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80" alt="Editorial 3" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </Link>
            <p className="font-display italic text-zinc-400 text-sm mt-3">Tactical comfort. Uncompromised fit.</p>
          </div>
        </div>
      </section>

      {/* Shop The Look */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-24 border-t border-zinc-800">
        <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tighter uppercase mb-10 text-center">
          SHOP THE LOOK
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-3 md:gap-5">
          {shopTheLook.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
