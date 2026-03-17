'use client';

import { useState, useEffect } from 'react';

export default function HeroSection(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-off-black">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Eyebrow Label */}
        <p
          className={`font-display text-xs tracking-[0.3em] uppercase text-brand-acid mb-6 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{ transitionDelay: '0ms' }}
        >
          New Season Drop
        </p>

        {/* Headline */}
        <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl leading-none tracking-tighter text-white">
          <span
            className={`block transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            BUILT FOR
          </span>
          <span
            className={`block transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            THE <span className="text-brand-acid">STREETS</span>
          </span>
        </h1>

        {/* CTAs */}
        <div
          className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <a
            href="/shop"
            className="bg-brand-acid text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300"
          >
            SHOP THE DROP
          </a>
          <a
            href="/lookbook"
            className="border border-white/30 text-white px-8 py-4 rounded-full hover:border-white transition-colors duration-300"
          >
            EXPLORE LOOKBOOK
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/60"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
