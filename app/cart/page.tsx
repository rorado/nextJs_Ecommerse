'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useCart } from '@/app/contexts/CartContext';
import { useCosmicPayments } from 'cosmic-payments/client';
import Footer from '@/app/components/Footer';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems, clearCart } = useCart();
  const { checkout, loading } = useCosmicPayments();

  const handleCheckout = async () => {
    if (loading || items.length === 0) return;
    
    try {
      // For multiple items, we'll checkout the first item for demo purposes
      // In a real implementation, you'd need to handle multiple items differently
      const firstItem = items[0];
      await checkout({
        productId: firstItem.id,
        priceId: `price_${firstItem.id}`,
        quantity: totalItems,
      });
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  const shippingCost = totalPrice > 50 ? 0 : 9.99;
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + shippingCost + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[color:var(--color-elevated)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <Icon icon="material-symbols:shopping-cart-outline" className="text-6xl text-[color:var(--color-border)] mb-6 mx-auto" />
            <h1 className="text-3xl font-light text-[color:var(--color-text)] mb-4">Your Cart is Empty</h1>
            <p className="text-[color:var(--color-text-muted)] mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added anything to your cart yet. Start exploring our products!
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center bg-[color:var(--color-primary)] text-[color:var(--color-primary-contrast)] px-8 py-3 rounded-lg font-medium hover:bg-[color:var(--color-primary-dark)] transition-colors"
            >
              <Icon icon="material-symbols:arrow-back" className="mr-2" />
              Continue Shopping
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--color-elevated)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-light text-[color:var(--color-text)]">Shopping Cart</h1>
            <p className="text-[color:var(--color-text-muted)] mt-1">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          <button
            onClick={clearCart}
            className="text-[color:var(--color-danger)] hover:opacity-90 text-sm font-medium flex items-center space-x-1"
          >
            <Icon icon="material-symbols:delete-outline" />
            <span>Clear Cart</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[color:var(--color-surface)] rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-[color:var(--color-elevated)]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.id}`}>
                        <h3 className="font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-text)]/90 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      
                      <div className="mt-1 text-sm text-[color:var(--color-text-muted)]">
                        {item.selectedSize && (
                          <span>Size: {item.selectedSize}</span>
                        )}
                        {item.selectedSize && item.selectedColor && (
                          <span className="mx-2">•</span>
                        )}
                        {item.selectedColor && (
                          <span>Color: {item.selectedColor}</span>
                        )}
                      </div>

                      <p className="text-lg font-medium text-[color:var(--color-text)] mt-2">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-[color:var(--color-border)] rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-[color:var(--color-elevated)] rounded-l-lg"
                        >
                          <Icon icon="material-symbols:remove" className="text-sm" />
                        </button>
                        <span className="px-4 py-2 text-center min-w-[3rem]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-[color:var(--color-elevated)] rounded-r-lg"
                        >
                          <Icon icon="material-symbols:add" className="text-sm" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-[color:var(--color-danger)] hover:bg-[color:var(--color-danger)]/10 rounded-lg transition-colors"
                      >
                        <Icon icon="material-symbols:delete-outline" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="mt-4 pt-4 border-t border-[color:var(--color-border)] flex justify-between items-center">
                    <span className="text-sm text-[color:var(--color-text-muted)]">Subtotal</span>
                    <span className="font-medium text-[color:var(--color-text)]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[color:var(--color-surface)] rounded-2xl p-6 shadow-sm sticky top-24"
            >
              <h2 className="text-xl font-medium text-[color:var(--color-text)] mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[color:var(--color-text-muted)]">Subtotal ({totalItems} items)</span>
                  <span className="text-[color:var(--color-text)]">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-[color:var(--color-text-muted)]">Shipping</span>
                  <span className="text-[color:var(--color-text)]">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-[color:var(--color-text-muted)]">Tax</span>
                  <span className="text-[color:var(--color-text)]">${tax.toFixed(2)}</span>
                </div>
                
                <div className="pt-3 border-t border-[color:var(--color-border)]">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-[color:var(--color-text)]">Total</span>
                    <span className="text-lg font-medium text-[color:var(--color-text)]">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {totalPrice < 50 && (
                <div className="mb-4 p-3 bg-[color:var(--color-elevated)] rounded-lg text-sm text-[color:var(--color-text)]">
                  <Icon icon="material-symbols:info-outline" className="inline mr-2" />
                  Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                </div>
              )}

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-[color:var(--color-primary)] text-[color:var(--color-primary-contrast)] py-3 px-6 rounded-lg font-medium hover:bg-[color:var(--color-primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Proceed to Checkout'}
                </motion.button>
                
                <Link
                  href="/shop"
                  className="block w-full text-center border border-[color:var(--color-border)] text-[color:var(--color-text)] py-3 px-6 rounded-lg font-medium hover:bg-[color:var(--color-elevated)] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-[color:var(--color-border)] text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-[color:var(--color-text-muted)]">
                  <Icon icon="material-symbols:security" />
                  <span>Secure checkout powered by Stripe</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}