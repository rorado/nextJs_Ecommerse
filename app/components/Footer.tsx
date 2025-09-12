'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

export default function Footer() {
  const footerLinks = {
    Shop: [
      { name: 'All Products', href: '/shop' },
      { name: 'New Arrivals', href: '/shop?filter=new' },
      { name: 'Sale Items', href: '/shop?filter=sale' },
      { name: 'Featured', href: '/shop?filter=featured' }
    ],
    Support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' }
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' }
    ]
  };

  const socialLinks = [
    { name: 'Instagram', icon: 'mdi:instagram', href: '#' },
    { name: 'Twitter', icon: 'mdi:twitter', href: '#' },
    { name: 'Facebook', icon: 'mdi:facebook', href: '#' },
    { name: 'YouTube', icon: 'mdi:youtube', href: '#' }
  ];

  return (
    <footer className="bg-[color:var(--color-elevated)] border-t border-[color:var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[color:var(--color-primary)] to-[color:var(--color-primary-dark)] rounded-lg flex items-center justify-center">
                <span className="text-[color:var(--color-primary-contrast)] font-medium text-sm">E</span>
              </div>
              <span className="font-medium text-[color:var(--color-text)]">EliteShop</span>
            </Link>
            <p className="text-[color:var(--color-text-muted)] text-sm mb-4 max-w-xs">
              Premium quality apparel and accessories for the modern lifestyle. 
              Discover your perfect style with us.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-8 h-8 bg-[color:var(--color-surface)] rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"
                >
                  <Icon icon={social.icon} className="text-sm" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-medium text-[color:var(--color-text)] mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-[color:var(--color-border)] pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-medium text-[color:var(--color-text)] mb-2">Stay Updated</h3>
            <p className="text-[color:var(--color-text-muted)] text-sm mb-4">
              Get the latest updates on new products and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 text-sm border border-[color:var(--color-border)] rounded-l-lg bg-[color:var(--color-surface)] text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] focus:border-[color:var(--color-primary)]"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[color:var(--color-primary)] text-[color:var(--color-primary-contrast)] px-6 py-2 text-sm rounded-r-lg hover:bg-[color:var(--color-primary-dark)] transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[color:var(--color-border)] pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-[color:var(--color-text-muted)] text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} EliteShop. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] text-sm transition-colors">
              Terms of Service
            </Link>
            <div className="flex items-center space-x-2 text-[color:var(--color-text-muted)]">
              <Icon icon="material-symbols:security" className="text-sm" />
              <span className="text-sm">Secure Shopping</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}