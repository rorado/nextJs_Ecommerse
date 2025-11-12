'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { mockProducts } from '@/app/utils/mockData';
import { Icon } from '@iconify/react';

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', ...Array.from(new Set(mockProducts.map(p => p.category)))];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[color:var(--color-elevated)]">
      {/* Header */}
      <section className="bg-[color:var(--color-surface)] border-b border-[color:var(--color-border)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-light text-[color:var(--color-text)] mb-4">Our Collection</h1>
            <p className="text-[color:var(--color-text-muted)] max-w-2xl mx-auto">
              Discover our carefully curated selection of premium apparel and accessories
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Icon 
              icon="material-symbols:search" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[color:var(--color-text-muted)]" 
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[color:var(--color-border)] rounded-lg bg-[color:var(--color-surface)] text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] focus:border-[color:var(--color-primary)]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-[color:var(--color-border)] rounded-lg bg-[color:var(--color-surface)] text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] focus:border-[color:var(--color-primary)]"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-[color:var(--color-border)] rounded-lg bg-[color:var(--color-surface)] text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] focus:border-[color:var(--color-primary)]"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-[color:var(--color-border)] rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-[color:var(--color-primary)] text-[color:var(--color-primary-contrast)]' : 'bg-[color:var(--color-surface)] text-[color:var(--color-text-muted)]'}`}
              >
                <Icon icon="material-symbols:grid-view" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-[color:var(--color-primary)] text-[color:var(--color-primary-contrast)]' : 'bg-[color:var(--color-surface)] text-[color:var(--color-text-muted)]'}`}
              >
                <Icon icon="material-symbols:list" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <p className="text-[color:var(--color-text-muted)] text-sm">
            Showing {filteredAndSortedProducts.length} of {mockProducts.length} products
          </p>
        </motion.div>

        {/* Products Grid/List */}
        <AnimatePresence mode="wait">
          {filteredAndSortedProducts.length > 0 ? (
            <motion.div
              key={`${viewMode}-${selectedCategory}-${sortBy}-${searchQuery}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-6'
              }
            >
              {filteredAndSortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={viewMode === 'list' ? 'w-full' : ''}
                >
                  {viewMode === 'grid' ? (
                    <ProductCard {...product} />
                  ) : (
                    // List view layout
                    <div className="bg-[color:var(--color-surface)] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-48 h-48 sm:h-32 flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            <h3 className="font-medium text-[color:var(--color-text)] mb-2">{product.name}</h3>
                            <p className="text-[color:var(--color-text-muted)] text-sm mb-3 line-clamp-2">{product.description}</p>
                            <div className="flex items-center space-x-1 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Icon
                                  key={i}
                                  icon="material-symbols:star"
                                  className={`text-sm ${i < product.rating ? 'text-yellow-400' : 'text-[color:var(--color-border)]'}`}
                                />
                              ))}
                              <span className="text-sm text-[color:var(--color-text-muted)]">({product.ratingCount})</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-medium text-[color:var(--color-text)]">${product.price.toFixed(2)}</span>
                            <div className="flex items-center space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-[color:var(--color-primary)] text-[color:var(--color-primary-contrast)] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[color:var(--color-primary-dark)] transition-colors"
                              >
                                Add to Cart
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Icon icon="material-symbols:search-off" className="text-6xl text-[color:var(--color-border)] mb-4 mx-auto" />
              <h3 className="text-xl font-medium text-[color:var(--color-text)] mb-2">No products found</h3>
              <p className="text-[color:var(--color-text-muted)] mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSortBy('name');
                }}
                className="bg-[color:var(--color-primary)] text-[color:var(--color-primary-contrast)] px-6 py-2 rounded-lg text-sm font-medium hover:bg-[color:var(--color-primary-dark)] transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}