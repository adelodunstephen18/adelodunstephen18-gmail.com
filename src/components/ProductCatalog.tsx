import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
  onViewDetails,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'consoles', label: 'Consoles' },
    { id: 'games', label: 'Games & Discs' },
    { id: 'controllers', label: 'Controllers' },
    { id: 'accessories', label: 'Accessories & Spares' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesBrand = selectedBrand === 'all' || p.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesBrand && matchesSearch;
    });
  }, [products, activeCategory, selectedBrand, searchQuery]);

  return (
    <section id="store" className="py-16 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dugbe Showroom & Online Store</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Buy Authentic Consoles, Games & Gear
            </h2>
            <p className="text-sm text-neutral-400 mt-1.5 max-w-xl">
              Every item is physically verified at our Shop 32 Zion Samsung Building store in Dugbe, Ibadan. Available for instant walk-in collection or doorstep dispatch.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PS5, Xbox, FC 25..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Filter Segmented Controls (Interactive buttons conforming to anti-slop guidelines) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-850">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-amber-400 text-neutral-950 font-semibold'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-850 border border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-400 shrink-0">
            <span className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Platform:</span>
            </span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
            >
              <option value="all">All Platforms</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Xbox">Xbox</option>
              <option value="Nintendo">Nintendo</option>
              <option value="Universal">Universal Accessories</option>
            </select>

            <span className="text-neutral-500">|</span>
            <span className="font-mono tabular-nums text-neutral-300">
              {filteredProducts.length} items
            </span>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-xl border border-dashed border-neutral-800 bg-neutral-900/30">
            <p className="text-neutral-300 font-medium">No gaming items match your query.</p>
            <p className="text-xs text-neutral-500 mt-1">
              Looking for something custom or specific? Chat directly with CEO Stephen on WhatsApp.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedBrand('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
