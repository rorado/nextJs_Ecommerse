'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Abstract Background using tokens */}
        <div className="absolute inset-0">
            <motion.div
                initial={{ opacity: 0, x: 90 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.6 }}
                className="absolute -top-24 -right-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-10"
                style={{
                background:
                    "radial-gradient(circle at 30% 30%, var(--color-primary), transparent 60%)",
                }}
            />
            <motion.div
                initial={{ opacity: 0, x: -90 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.6 }}
                className="absolute bottom-14 -left-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-10"
                style={{
                background:
                    "radial-gradient(circle at 70% 70%, var(--color-secondary), transparent 60%)",
                }}
            />
        </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center space-x-2 backdrop-blur-sm border border-[color:var(--color-border)]/60 px-4 py-2 text-sm text-[color:var(--color-text-muted)]">
            <span>New Collection Just Arrived</span>
            <Icon icon="material-symbols:arrow-right-alt" className="text-[color:var(--color-text-muted)]" />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-light text-[color:var(--color-text)] mb-6 leading-tight"
        >
          Discover Your
          <br />
          <span className="bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-primary-dark)] bg-clip-text text-transparent font-medium">
            Perfect Style
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg text-[color:var(--color-text-muted)] mb-10 max-w-2xl mx-auto font-light"
        >
          Premium quality apparel and accessories crafted for the modern lifestyle. 
          Discover pieces that blend comfort, style, and sustainability.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-[color:var(--color-primary)] text-[color:var(--color-primary-contrast)] px-8 py-3 rounded-full font-medium text-sm hover:bg-[color:var(--color-primary-dark)] transition-colors shadow-lg hover:shadow-xl"
            >
              Shop Collection
            </motion.button>
          </Link>

          <Link href="/about">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-[color:var(--color-surface)]/80 backdrop-blur-sm text-[color:var(--color-text)] px-8 py-3 rounded-full font-medium text-sm border border-[color:var(--color-border)]/60 hover:bg-[color:var(--color-surface)] transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Learn More</span>
              <Icon icon="material-symbols:arrow-right-alt" className="text-sm" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
        >
          <div className="text-center">
            <div className="text-2xl font-medium text-[color:var(--color-text)] mb-1">10K+</div>
            <div className="text-sm text-[color:var(--color-text-muted)]">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-[color:var(--color-text)] mb-1">500+</div>
            <div className="text-sm text-[color:var(--color-text-muted)]">Products</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-[color:var(--color-text)] mb-1">4.9★</div>
            <div className="text-sm text-[color:var(--color-text-muted)]">Rating</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-[color:var(--color-border)] rounded-full flex justify-center"
        >
          <motion.div 
            className="w-1 h-3 bg-[color:var(--color-text-muted)] rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}