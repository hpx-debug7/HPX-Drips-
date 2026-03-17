import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index: number;
  isVisible: boolean;
}

export default function ProductCard({ product, index, isVisible }: ProductCardProps): JSX.Element {
  const formatPrice = (price: number): string => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div
      className={`group relative bg-zinc-900 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-800">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-brand-acid text-black text-[10px] font-black tracking-widest px-2 py-1 rounded">
            {product.badge}
          </div>
        )}

        {/* Quick Add Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm py-3 px-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                className="text-xs border border-zinc-600 text-zinc-300 px-2 py-1 rounded hover:border-brand-acid hover:text-brand-acid transition-colors"
              >
                {size}
              </button>
            ))}
          </div>
          <button className="bg-brand-acid text-black text-xs font-bold px-3 py-1.5 rounded-full hover:scale-105 transition-transform">
            Add
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-display font-bold text-white text-sm truncate">{product.name}</h3>
        <p className="text-zinc-500 text-xs mt-1">{product.category}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-display font-black text-white text-base">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-zinc-600 text-sm line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
