import React from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import { ProductsPageClient } from '@/app/products/ProductsPageClient';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: { slug: string };
}

const CATEGORY_MAP: Record<string, { name: string; image: string }> = {
  tees: {
    name: 'TEES & TOPS',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1920&q=90',
  },
  hoodies: {
    name: 'HOODIES & OUTERWEAR',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1920&q=90',
  },
  cargo: {
    name: 'CARGO PANTS',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1920&q=90',
  },
  footwear: {
    name: 'FOOTWEAR',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&q=90',
  },
  accessories: {
    name: 'ACCESSORIES',
    image: 'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=1920&q=90',
  },
};

export function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map(slug => ({ slug }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = CATEGORY_MAP[params.slug];
  if (!category) return { title: 'Category Not Found | HPX DRIPS' };
  
  return {
    title: `${category.name} | HPX DRIPS`,
    description: `Shop the latest ${category.name.toLowerCase()} drops.`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryData = CATEGORY_MAP[params.slug];

  if (!categoryData) {
    notFound();
  }

  const navCategories = [
    { name: 'All Drops', slug: 'all' },
    { name: 'Tees', slug: 'tees' },
    { name: 'Hoodies', slug: 'hoodies' },
    { name: 'Cargo', slug: 'cargo' },
    { name: 'Footwear', slug: 'footwear' },
    { name: 'Accessories', slug: 'accessories' },
  ];

  return (
    <ProductsPageClient 
      initialProducts={PRODUCTS.filter(p => p.category === params.slug)}
      categories={navCategories}
      title={categoryData.name}
      currentCategory={params.slug}
      headerImage={categoryData.image}
    />
  );
}
