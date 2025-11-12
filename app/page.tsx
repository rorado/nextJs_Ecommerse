'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { getFeaturedProducts } from '@/app/utils/mockData';
import { Icon } from '@iconify/react';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 bg-[color:var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-[color:var(--color-text)] mb-4">Why Choose EliteShop?</h2>
            <p className="text-[color:var(--color-text-muted)] max-w-2xl mx-auto">
              We&apos;re committed to providing exceptional quality and service in everything we do.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "material-symbols:local-shipping-outline",
                title: "Free Shipping",
                description: "Free delivery on orders over $50 worldwide"
              },
              {
                icon: "material-symbols:verified-user-outline",
                title: "Secure Payment",
                description: "Your payment information is safe with us"
              },
              {
                icon: "material-symbols:support-agent",
                title: "24/7 Support",
                description: "Get help whenever you need it, day or night"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-12 h-12 bg-[color:var(--color-elevated)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon={feature.icon} className="text-[color:var(--color-primary)] text-xl" />
                </div>
                <h3 className="font-medium text-[color:var(--color-text)] mb-2">{feature.title}</h3>
                <p className="text-sm text-[color:var(--color-text-muted)]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-[color:var(--color-elevated)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl font-light text-[color:var(--color-text)] mb-4">Featured Products</h2>
              <p className="text-[color:var(--color-text-muted)]">Discover our handpicked selection of premium items</p>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center space-x-2 text-[color:var(--color-primary)] hover:text-[color:var(--color-primary-dark)] font-medium text-sm transition-colors"
            >
              <span>View All</span>
              <Icon icon="material-symbols:arrow-right-alt" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center sm:hidden">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 text-[color:var(--color-primary)] hover:text-[color:var(--color-primary-dark)] font-medium text-sm transition-colors"
            >
              <span>View All Products</span>
              <Icon icon="material-symbols:arrow-right-alt" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-primary-dark)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-light text-[color:var(--color-primary-contrast)] mb-4">Stay in the Loop</h2>
            <p className="text-[color:var(--color-primary-contrast)]/80 mb-8 max-w-2xl mx-auto">
              Be the first to know about new arrivals, exclusive offers, and styling tips.
            </p>

            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 text-[color:var(--color-text)] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary-contrast)]/20 border-2 border-[color:var(--color-primary-contrast)]"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[color:var(--color-primary-contrast)] text-[color:var(--color-primary)] px-6 py-3 rounded-r-lg font-medium hover:opacity-90 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-[color:var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-[color:var(--color-text)] mb-4">Shop by Category</h2>
            <p className="text-[color:var(--color-text-muted)]">Find exactly what you&apos;re looking for</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Apparel', count: '150+ items', image: 'https://images.unsplash.com/photo-1589886704088-e702adc08e3c?auto=format&fit=crop&w=800&q=80' },
              { name: 'Sportswear', count: '80+ items', image: 'https://images.unsplash.com/photo-1587382667677-aa1304be4776?auto=format&fit=crop&w=800&q=80' },
              { name: 'Outerwear', count: '120+ items', image: 'https://images.unsplash.com/photo-1586999082716-202e0f2f8c12?auto=format&fit=crop&w=800&q=80' }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative group cursor-pointer"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[color:var(--color-elevated)]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div>
                      <h3 className="text-2xl font-medium text-white mb-2">{category.name}</h3>
                      <p className="text-white/80 text-sm">{category.count}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}