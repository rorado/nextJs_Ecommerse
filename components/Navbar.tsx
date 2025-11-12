"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useCart } from "@/app/contexts/CartContext";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 bg-[color:var(--color-surface)]/80 backdrop-blur-lg border-b border-[color:var(--color-border)]/60 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 bg-gradient-to-br from-[color:var(--color-primary)] to-[color:var(--color-primary-dark)] rounded-lg flex items-center justify-center shadow-sm"
            >
              <span className="text-[color:var(--color-primary-contrast)] font-medium text-sm">
                E
              </span>
            </motion.div>
            <span className="font-medium text-[color:var(--color-text)]">
              EliteShop
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm transition-colors font-medium ${
                  pathname == item.href
                    ? "text-[color:var(--color-primary-dark)]"
                    : "text-[color:var(--color-text-muted)]"
                } hover:text-[color:var(--color-text)]`}
              >
                {item.name}
              </Link>
            ))} 
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
           
            {status === "loading" ? (
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : status === "authenticated" ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <span className="cursor-pointer">{session?.user?.name}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuItem>My Account</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            ) : (
              <Link href="/login">
                <button className="px-2 py-1 border-[var(--color-primary)] border-2 rounded-lg text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] hover:bg-[color:var(--color-hover)] transition-colors cursor-pointer">
                  LOGIN
                </button>
              </Link>
            )}


            
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-lg text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] hover:bg-[color:var(--color-hover)] transition-colors"
            >
              <Icon
                icon="material-symbols:shopping-cart-outline"
                className="text-lg"
              />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[color:var(--color-primary)] text-[color:var(--color-primary-contrast)] text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] hover:bg-[color:var(--color-hover)] transition-colors cursor-pointer"
            >
              <Icon
                icon={
                  isMenuOpen
                    ? "material-symbols:close"
                    : "material-symbols:menu"
                }
                className="text-lg"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[color:var(--color-surface)]/95 backdrop-blur-lg border-t border-[color:var(--color-border)]/60"
          >
            <div className="px-4 py-4 space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-sm text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] transition-colors font-medium py-2"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-[color:var(--color-border)]/60">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
