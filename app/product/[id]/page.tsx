'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCosmicPayments } from 'cosmic-payments/client';
import { getProductById, mockProducts } from '@/app/utils/mockData';
import Footer from '@/app/components/Footer';
import ProductCard from '@/app/components/ProductCard';
import { useCart } from '@/app/contexts/CartContext';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const { checkout, loading } = useCosmicPayments();
  const { addToCart } = useCart();

  // Get related products (same category, excluding current product)
  const relatedProducts = mockProducts
    .filter(p => p.category === product?.category && p.id !== productId)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon icon="material-symbols:error-outline" className="text-6xl text-[color:var(--color-border)] mb-4 mx-auto" />
          <h1 className="text-2xl font-medium text-[color:var(--color-text)] mb-2">Product not found</h1>
          <p className="text-[color:var(--color-text-muted)] mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/shop"
            className="bg-[color:var(--color-primary)] text-[color:var(--color-primary-contrast)] px-6 py-3 rounded-lg font-medium hover:bg-[color:var(--color-primary-dark)] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

  const handlePurchase = async () => {
    if (loading) return;
    
    try {
      await checkout({
        // Note: These would be real product/price IDs from Cosmic Dashboard
        productId: product.id,
        priceId: `price_${product.id}`,
        quantity,
      });
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart(product, quantity, selectedSize || undefined, selectedColor || undefined);
  };

  return (
    <div className="min-h-screen bg-[color:var(--color-surface)]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-[color:var(--color-border)]">
        <nav className="flex items-center space-x-2 text-sm text-[color:var(--color-text-muted)]">
          <Link href="/" className="hover:text-[color:var(--color-text)]">Home</Link>
          <Icon icon="material-symbols:chevron-right" />
          <Link href="/shop" className="hover:text-[color:var(--color-text)]">Shop</Link>
          <Icon icon="material-symbols:chevron-right" />
          <span className="text-[color:var(--color-text)]">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="aspect-square rounded-2xl overflow-hidden bg-[color:var(--color-elevated)]"
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-[color:var(--color-primary)]' : 'border-[color:var(--color-border)]'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-3xl font-light text-[color:var(--color-text)] mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      icon="material-symbols:star"
                      className={`text-lg ${i < product.rating ? 'text-yellow-400' : 'text-[color:var(--color-border)]'}`}
                    />
                  ))}
                </div>
                <span className="text-[color:var(--color-text-muted)]">({product.ratingCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-medium text-[color:var(--color-text)] mb-6">
                ${product.price.toFixed(2)}
              </div>

              {/* Description */}
              <p className="text-[color:var(--color-text-muted)] mb-6 leading-relaxed">{product.description}</p>

              {/* Size Selection */}
              {product.sizes && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-[color:var(--color-text)] mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                          selectedSize === size
                            ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary)] text-[color:var(--color-primary-contrast)]'
                            : 'border-[color:var(--color-border)] text-[color:var(--color-text)] hover:border-[color:var(--color-text-muted)]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-[color:var(--color-text)] mb-3">Color</h3>
                  <div className="flex space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${
                          selectedColor === color.name
                            ? 'border-[color:var(--color-text)] scale-110'
                            : 'border-[color:var(--color-border)]'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[color:var(--color-text)] mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full border border-[color:var(--color-border)] flex items-center justify-center hover:bg-[color:var(--color-elevated)]"
                  >
                    <Icon icon="material-symbols:remove" className="text-sm" />
                  </button>
                  <span className="text-lg font-medium min-w-[2rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full border border-[color:var(--color-border)] flex items-center justify-center hover:bg-[color:var(--color-elevated)]"
                  >
                    <Icon icon="material-symbols:add" className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePurchase}
                  disabled={loading}
                  className="w-full bg-[color:var(--color-primary)] text-[color:var(--color-primary-contrast)] py-3 px-6 rounded-lg font-medium hover:bg-[color:var(--color-primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Buy Now'}
                </motion.button>
                
                <button 
                  onClick={handleAddToCart}
                  className="w-full border border-[color:var(--color-border)] text-[color:var(--color-text)] py-3 px-6 rounded-lg font-medium hover:bg-[color:var(--color-elevated)] transition-colors flex items-center justify-center space-x-2"
                >
                  <Icon icon="material-symbols:add-shopping-cart" />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Features */}
              <div className="border-t border-[color:var(--color-border)] pt-6 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-[color:var(--color-text-muted)]">
                  <Icon icon="material-symbols:local-shipping-outline" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-[color:var(--color-text-muted)]">
                  <Icon icon="material-symbols:refresh" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-[color:var(--color-text-muted)]">
                  <Icon icon="material-symbols:verified-user-outline" />
                  <span>2-year warranty included</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 border-t border-[color:var(--color-border)] pt-12"
        >
          <div className="flex space-x-8 mb-8">
            {['description', 'care', 'shipping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors capitalize ${
                  activeTab === tab
                    ? 'text-[color:var(--color-text)] border-[color:var(--color-text)]'
                    : 'text-[color:var(--color-text-muted)] border-transparent hover:text-[color:var(--color-text)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="prose prose-gray max-w-none text-[color:var(--color-text)]">
            {activeTab === 'description' && (
              <div>
                <h3>Product Description</h3>
                <p>{product.description}</p>
                <p>This premium quality item is designed with attention to detail and crafted for durability. Perfect for modern lifestyles, it combines style with functionality.</p>
              </div>
            )}
            
            {activeTab === 'care' && (
              <div>
                <h3>Care Instructions</h3>
                <ul>
                  <li>Machine wash cold with like colors</li>
                  <li>Use gentle cycle and mild detergent</li>
                  <li>Do not bleach or use fabric softener</li>
                  <li>Tumble dry low or hang dry</li>
                  <li>Iron on low heat if needed</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'shipping' && (
              <div>
                <h3>Shipping Information</h3>
                <p>We offer fast and reliable shipping options:</p>
                <ul>
                  <li><strong>Standard Shipping:</strong> 5-7 business days - Free on orders over $50</li>
                  <li><strong>Express Shipping:</strong> 2-3 business days - $9.99</li>
                  <li><strong>Overnight Shipping:</strong> 1 business day - $19.99</li>
                </ul>
                <p>All orders are processed within 1-2 business days.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 border-t border-[color:var(--color-border)] pt-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-[color:var(--color-text)]">Customer Reviews</h2>
            <button className="px-4 py-2 rounded-lg bg-[color:var(--color-elevated)] text-[color:var(--color-text)] border border-[color:var(--color-border)] text-sm hover:bg-[color:var(--color-surface)]">Write a review</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1,2,3].map((i) => (
              <div key={i} className="p-5 rounded-2xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)] shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <img src={`https://i.pravatar.cc/80?u=reviewer-${i}`} alt="Reviewer" className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="text-sm font-medium text-[color:var(--color-text)]">Reviewer {i}</div>
                    <div className="text-xs text-[color:var(--color-text-muted)]">Verified Buyer</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, idx) => (
                    <Icon key={idx} icon="material-symbols:star" className={`text-sm ${idx < 5 - (i === 3 ? 1 : 0) ? 'text-yellow-400' : 'text-[color:var(--color-border)]'}`} />
                  ))}
                </div>
                <p className="text-sm text-[color:var(--color-text)]">Love the quality and fit. The material feels premium and it holds up well after washing.</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 border-t border-[color:var(--color-border)] pt-12"
          >
            <h2 className="text-2xl font-light text-[color:var(--color-text)] mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} {...relatedProduct} />
              ))}
            </div>
          </motion.section>
        )}
      </div>

      <Footer />
    </div>
  );
}