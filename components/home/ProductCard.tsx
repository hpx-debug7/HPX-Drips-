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

  // Generate a consistent gradient based on product id
  const gradients = [
    'from-zinc-700 via-zinc-800 to-zinc-900',
    'from-zinc-800 via-zinc-700 to-zinc-900',
    'from-zinc-900 via-zinc-800 to-zinc-700',
    'from-zinc-800 via-zinc-900 to-zinc-800',
    'from-zinc-700 via-zinc-900 to-zinc-800',
    'from-zinc-900 via-zinc-700 to-zinc-800',
  ];
  const gradientIndex = parseInt(product.id, 10) % gradients.length;
  const gradient = gradients[gradientIndex];

  return (
    <div
      className={`group relative bg-zinc-900 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Image Container */}
      <div className={`relative aspect-[3/4] overflow-hidden bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-105`}>
        {/* Product Placeholder Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-600"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        </div>

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
