export interface Product {
  id: string;
  name: string;
  category: 'Tees' | 'Hoodies' | 'Cargo' | 'Accessories';
  price: number;
  originalPrice?: number;
  badge?: 'NEW' | 'HOT' | 'SOLD OUT';
  imageUrl: string;
  sizes: string[];
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Shadow Box Logo Tee',
    category: 'Tees',
    price: 1299,
    originalPrice: 2499,
    badge: 'NEW',
    imageUrl: '/product-1.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '2',
    name: 'Acid Wash Oversized Hoodie',
    category: 'Hoodies',
    price: 3999,
    originalPrice: 5999,
    badge: 'HOT',
    imageUrl: '/product-2.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '3',
    name: 'Tech Cargo Pants V2',
    category: 'Cargo',
    price: 4599,
    imageUrl: '/product-3.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '4',
    name: 'Street Logo Dad Cap',
    category: 'Accessories',
    price: 1499,
    originalPrice: 2299,
    badge: 'NEW',
    imageUrl: '/product-4.jpg',
    sizes: ['OS'],
  },
  {
    id: '5',
    name: 'Minimalist Essential Tee',
    category: 'Tees',
    price: 1199,
    originalPrice: 1999,
    imageUrl: '/product-5.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '6',
    name: 'Utility Crossbody Bag',
    category: 'Accessories',
    price: 2499,
    badge: 'HOT',
    imageUrl: '/product-6.jpg',
    sizes: ['OS'],
  },
];
