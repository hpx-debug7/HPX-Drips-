import React from 'react';
import { PRODUCTS } from '@/lib/data';
import { ProductsPageClient } from './ProductsPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Drops | HPX DRIPS',
  description: 'Shop the latest streetwear and hype-culture drops from HPX DRIPS.',
};

export default function ProductsPage() {
  const categories = [
    { name: 'All', slug: 'all' },
    { name: 'Tees', slug: 'tees' },
    { name: 'Hoodies', slug: 'hoodies' },
    { name: 'Cargo', slug: 'cargo' },
    { name: 'Footwear', slug: 'footwear' },
    { name: 'Accessories', slug: 'accessories' },
  ];

  return (
    <ProductsPageClient 
      initialProducts={PRODUCTS}
      categories={categories}
      title="ALL DROPS"
      currentCategory="all"
    />
  );
}
