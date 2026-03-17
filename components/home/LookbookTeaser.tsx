import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';

export function LookbookTeaser() {
  return (
    <section className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden group">
      <div className="absolute inset-0 z-0 bg-brand-black">
        <Image
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=90"
          alt="Season 25 Lookbook"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto py-24">
        <span className="text-brand-acid font-display font-black text-xs tracking-[0.4em] uppercase mb-4">
          SEASON 25
        </span>
        <h2 className="font-display font-black text-6xl md:text-8xl text-white tracking-tighter uppercase leading-none mb-6">
          THE LOOKBOOK
        </h2>
        <p className="text-zinc-300 font-display italic text-lg md:text-xl mb-10 max-w-xl">
          A visual exploration of urban decay and rebirth. Shot in the midnight hours of Tokyo.
        </p>
        
        <Button 
          href="/lookbook" 
          variant="ghost" 
          className="border-white/20 hover:border-brand-acid hover:bg-brand-acid hover:text-black"
        >
          EXPLORE NOW →
        </Button>
      </div>
    </section>
  );
}
