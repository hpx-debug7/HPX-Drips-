import React from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import { ProductDetail } from '@/components/product/ProductDetail';
import { Metadata } from 'next';

interface ProductPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  
  if (!product) {
    return { title: 'Product Not Found | HPX DRIPS' };
  }

  return {
    title: `${product.name} | HPX DRIPS`,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
