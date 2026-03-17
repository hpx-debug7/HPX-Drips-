# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HPX Drips is a streetwear/hype-culture e-commerce storefront built for Gen-Z audiences. It features a modern dark-mode aesthetic with electric lime accents.

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode, no `any` allowed)
- **Styling**: Tailwind CSS with custom design system
- **Fonts**: Space Grotesk (display), Inter (body)
- **Icons**: Inline SVGs only (no external icon libraries)

## Build Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata
│   ├── page.tsx            # Home page (Server Component)
│   └── globals.css         # Tailwind imports + custom CSS
├── components/
│   ├── layout/             # Navbar, Footer
│   └── home/               # HeroSection, FeaturedDrops, ProductCard
├── types/
│   └── index.ts            # Product interface, MOCK_PRODUCTS
├── public/
│   └── hero-bg.mp4         # Hero background video
├── tailwind.config.ts      # Custom theme, colors, animations
└── next.config.js
```

## Architecture Conventions

### Component Types
- **Server Components**: Default for pages and static layouts
- **Client Components**: Only when using `useState`, `useEffect`, or event handlers - mark with `"use client"`

### Styling Patterns
- Dark mode only (`darkMode: 'class'` in Tailwind config)
- Brand colors via `bg-brand-*` and `text-brand-*` prefixes
- Custom fonts via `font-display` (Space Grotesk) and `font-sans` (Inter)
- Animations use custom keyframes: `fade-up`, `slide-in-left`, `slide-in-right`, `shimmer`

### Animation System
- No external animation libraries (Framer Motion, GSAP prohibited)
- Use Tailwind custom keyframes + CSS transitions only
- Scroll-triggered: Use `IntersectionObserver` in `useEffect`
- Mount animations: Use `useState` to toggle animation classes with staggered delays
- Hover effects: Use `group-hover:` and `transition-*` utilities

### Image Handling
- Use `next/image` with `fill` prop and `object-cover`
- Product images: 3:4 aspect ratio (`aspect-[3/4]`)
- Hover zoom effect: `group-hover:scale-105 transition-transform duration-500`

### Pricing Format
- Currency: Indian Rupees (₹)
- Format: `toLocaleString('en-IN')`
- Price range: ₹1,299 - ₹5,999

### Type Safety
- All files must be fully typed
- `any` type is prohibited
- Product category union type: `'Tees' | 'Hoodies' | 'Cargo' | 'Accessories'`

## Key Implementation Details

### Navbar
- Sticky with `backdrop-blur-md`
- Scroll detection at 80px adds `border-b border-zinc-800`
- "HPX" wordmark with "D" in acid green
- Mobile: Hamburger triggers full-screen overlay

### Hero Section
- Full viewport height (`min-h-screen`)
- Background video with poster fallback + dark overlay (`bg-black/60`)
- Staggered entrance: eyebrow (0ms) → headline (100ms) → CTAs (200ms)
- Bouncing chevron at bottom

### Product Card
- Hover reveals quick-add bar with size pills and add button
- Badges positioned top-left (NEW/HOT)
- Original price shown with strikethrough when discounted
- Animation triggered by IntersectionObserver with index-based stagger

### Responsive Breakpoints
- Mobile-first design
- Minimum supported width: 320px (no horizontal scroll above this)
- Grid collapses: 2 cols → 3 cols at `md:` breakpoint

## File Locations

- Tailwind config: `./tailwind.config.ts`
- Types: `./types/index.ts`
- Layout components: `./components/layout/`
- Home sections: `./components/home/`
- Global styles: `./app/globals.css`
