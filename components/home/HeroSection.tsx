'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-end">
      <div className="absolute inset-0 z-0 bg-brand-black">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90"
          alt="SS25 DROP 001 Collection"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      <div className="relative z-10 w-full mb-16 px-8 md:px-16">
        <p 
          className={`font-display text-brand-acid text-xs tracking-[0.4em] uppercase mb-4 ${
            mounted ? 'animate-fade-up opacity-100' : 'opacity-0'
          }`}
          style={{ animationDelay: '0ms' }}
        >
          SS25 DROP 001
        </p>

        <h1 
          className={`font-display font-black text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] tracking-tighter text-white max-w-5xl ${
            mounted ? 'animate-fade-up opacity-100' : 'opacity-0'
          }`}
          style={{ animationDelay: '100ms' }}
        >
          NEW SEASON<br />NEW <span className="text-brand-acid">DRIP</span>
        </h1>

        <div 
          className={`flex gap-4 flex-wrap mt-10 ${
            mounted ? 'animate-fade-up opacity-100' : 'opacity-0'
          }`}
          style={{ animationDelay: '300ms' }}
        >
          <Link href="/products" className="bg-brand-acid text-black font-display font-black text-sm px-8 py-4 rounded-full hover:bg-brand-acid-dark hover:scale-105 active:scale-95 transition-all">
            SHOP DROPS
          </Link>
          <Link href="/lookbook" className="border border-white/40 text-white font-display font-black text-sm px-8 py-4 rounded-full hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all">
            VIEW LOOKBOOK
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2">
        <span className="font-display font-black text-xs tracking-widest text-zinc-400 [writing-mode:vertical-lr] rotate-180">
          SCROLL
        </span>
        <div className="w-px h-12 bg-zinc-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-acid w-full h-full animate-[slide-down_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
