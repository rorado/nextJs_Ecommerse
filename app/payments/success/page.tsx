'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-[color:var(--color-elevated)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[color:var(--color-surface)]/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-[color:var(--color-border)]"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-[color:var(--color-elevated)] rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Icon icon="material-symbols:check-circle" className="text-[color:var(--color-success)] text-3xl" />
        </motion.div>
        
        <h1 className="text-2xl font-medium text-[color:var(--color-text)] mb-4">Payment Successful!</h1>
        <p className="text-[color:var(--color-text-muted)] mb-6 text-sm">Thank you for your purchase. Your order has been confirmed and will be processed shortly.</p>
        
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-[color:var(--color-primary)] text-[color:var(--color-primary-contrast)] py-3 px-6 rounded-lg font-medium hover:bg-[color:var(--color-primary-dark)] transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/shop"
            className="block w-full border border-[color:var(--color-border)] text-[color:var(--color-text)] py-3 px-6 rounded-lg font-medium hover:bg-[color:var(--color-elevated)] transition-colors"
          >
            View All Products
          </Link>
        </div>
      </motion.div>
    </div>
  );
}