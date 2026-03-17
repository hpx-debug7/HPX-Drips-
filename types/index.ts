export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'tees' | 'hoodies' | 'cargo' | 'footwear' | 'accessories';
  price: number;
  originalPrice?: number;
  badge?: 'NEW' | 'HOT' | 'SOLD OUT' | 'COLLAB';
  images: string[];
  sizes: string[];
  description: string;
  details: string[];
  inStock: boolean;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}
