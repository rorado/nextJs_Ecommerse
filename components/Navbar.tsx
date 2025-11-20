"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useCart } from "@/app/contexts/CartContext";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

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
    { name: "Profile", href: "/profile" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 bg-(--color-surface)/80 backdrop-blur-lg border-b border-border/60 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 bg-linear-to-br from-primary to-(--color-primary-dark) rounded-lg flex items-center justify-center shadow-sm"
            >
              <span className="text-(--color-primary-contrast) font-medium text-sm">
                E
              </span>
            </motion.div>
            <span className="font-medium text-foreground">
              EliteShop
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
            // Only render the Profile link if session.user exists
            if (item.href === "/profile" && !session?.user) return null;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm transition-colors font-medium hover:text-foreground hover:underline"
                style={{
                  color:
                    pathname === item.href
                      ? "var(--color-primary-dark)"
                      : "var(--color-text-muted)",
                }}
              >
                {item.name}
              </Link>
            );
          })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
           
            {status === "loading" ? (
              <div className="h-5 w-14 rounded bg-gray-200 animate-pulse opacity-5"/>
            ) : status === "authenticated" ? (
              <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <img
                        src={session.user.image || "/default-avatar.png"}
                        alt={session.user.name || "Profile"}
                        className="w-10 h-10 rounded-full shadow-md object-cover cursor-pointer"
                      />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56 bg-background" align="start">
                      <DropdownMenuItem>
                        <Link href="/profile">My Account</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                  {session.user.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            ) : (
              <Link href="/login">
                <button className="px-2 py-1 border-primary border-2 rounded-lg text-(--color-text-muted) hover:text-foreground hover:bg-(--color-hover) transition-colors cursor-pointer">
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
              className="relative p-2 rounded-lg text-(--color-text-muted) hover:text-foreground hover:bg-(--color-hover) transition-colors"
            >
              <Icon
                icon="material-symbols:shopping-cart-outline"
                className="text-lg"
              />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-(--color-primary-contrast) text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-(--color-text-muted) hover:text-foreground hover:bg-(--color-hover) transition-colors cursor-pointer"
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
            className="md:hidden bg-(--color-surface)/95 backdrop-blur-lg border-t border-border/60"
          >
            <div className="px-4 py-4 space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-sm text-(--color-text-muted) hover:text-foreground transition-colors font-medium py-2"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border/60">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
