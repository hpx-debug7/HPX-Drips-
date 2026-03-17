'use client';

import { useState, useEffect } from 'react';

export default function Navbar(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Drops', 'Archive', 'Collabs', 'Lookbook'];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-brand-off-black/90 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'border-b border-zinc-800' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="font-display font-black text-2xl tracking-tighter text-white">
            HP<span className="text-brand-acid">X</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`/${link.toLowerCase()}`}
                className="text-xs font-medium tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <button className="text-zinc-400 hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            {/* Cart Icon */}
            <button className="relative text-zinc-400 hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-brand-acid text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </button>

            {/* JOIN CTA */}
            <a
              href="/join"
              className="hidden sm:block font-display text-sm font-bold px-4 py-2 border border-brand-acid text-brand-acid hover:bg-brand-acid hover:text-black transition-all rounded-full"
            >
              JOIN
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
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
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-brand-off-black z-40 md:hidden transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '64px' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase()}`}
              className="text-2xl font-display font-bold text-white hover:text-brand-acid transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="/join"
            className="mt-8 font-display text-lg font-bold px-8 py-3 border border-brand-acid text-brand-acid hover:bg-brand-acid hover:text-black transition-all rounded-full"
          >
            JOIN
          </a>
        </div>
      </div>
    </nav>
  );
}
