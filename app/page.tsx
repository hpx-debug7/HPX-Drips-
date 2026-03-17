import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustBar } from '@/components/home/TrustBar';
import { CategoryNav } from '@/components/home/CategoryNav';
import { FeaturedDrops } from '@/components/home/FeaturedDrops';
import { LookbookTeaser } from '@/components/home/LookbookTeaser';
import { PRODUCTS } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1">
      <HeroSection />
      <TrustBar />
      <CategoryNav />
      <FeaturedDrops products={PRODUCTS} />
      <LookbookTeaser />
    </div>
  );
}
