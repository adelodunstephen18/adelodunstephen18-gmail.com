import React, { useEffect } from 'react';
import { X, Check, ShieldCheck, MapPin, ShoppingBag, MessageSquare } from 'lucide-react';
import { Product } from '../types';
import { formatNaira } from '../utils/formatters';
import { COMPANY_INFO } from '../data/mockData';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const directWhatsAppUrl = `${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(
    `Hello CEO Stephen! I am interested in purchasing "${product.name}" (${formatNaira(
      product.price
    )}) from Adelod Game World. Is it currently ready for pickup at Shop 32 Zion Samsung Building, Dugbe, Ibadan?`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Header Close Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900">
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
            <span className="uppercase tracking-wider">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400">{product.condition}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto">
          {/* Image & Location Badge */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/60 text-xs">
              <div className="flex items-center gap-2 text-neutral-300 font-medium mb-1">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Available for Dugbe Store Pickup</span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Shop No. 32 Zion Samsung Building, Ekotedo, Dugbe, Ibadan. Immediate testing on purchase.
              </p>
            </div>
          </div>

          {/* Details & Specs */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-white leading-snug">
                {product.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-white font-mono tabular-nums">
                  {formatNaira(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-500 line-through font-mono tabular-nums">
                    {formatNaira(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Warranty Guarantee */}
              <div className="mt-3 flex items-center gap-2 text-xs text-neutral-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{product.warranty}</span>
              </div>

              <p className="mt-4 text-xs text-neutral-300 leading-relaxed">
                {product.description}
              </p>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-2">
                    Key Highlights
                  </h4>
                  <ul className="space-y-1.5">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technical Specs */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="mt-4 pt-3 border-t border-neutral-800">
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Specifications
                  </h4>
                  <dl className="space-y-1 text-xs">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-0.5 border-b border-neutral-800/50">
                        <dt className="text-neutral-400">{key}</dt>
                        <dd className="text-neutral-200 font-mono font-medium">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-sm font-semibold transition-colors shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart ({formatNaira(product.price)})</span>
              </button>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
