import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { formatNaira } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
}) => {
  return (
    <article className="group flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-200 overflow-hidden">
      {/* Product Image Area */}
      <div
        onClick={() => onViewDetails(product)}
        className="relative aspect-4/3 w-full bg-neutral-950 overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Elegant CSS fallback
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-neutral-950/10 group-hover:bg-transparent transition-colors" />

        {/* Quiet condition indicator (Zero-pill discipline: subtle text badge or unboxed tag) */}
        <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-medium text-neutral-300 border border-neutral-800">
          {product.condition}
        </div>
      </div>

      {/* Product Meta & Actions */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Category in muted text with separator */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1.5 uppercase tracking-wider font-medium">
            <span>{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onViewDetails(product)}
            className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing and Button Action */}
        <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-bold text-white font-mono tabular-nums">
              {formatNaira(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-neutral-500 line-through font-mono tabular-nums">
                {formatNaira(product.originalPrice)}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onViewDetails(product)}
              title="Quick View Details"
              aria-label={`View details for ${product.name}`}
              className="p-2 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold transition-colors whitespace-nowrap shadow-sm"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
