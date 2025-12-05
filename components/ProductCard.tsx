"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useCosmicPayments } from "cosmic-payments/client";
import { useCart } from "@/app/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  rating?: number;
  ratingCount?: number;
  className?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  description,
  rating = 5,
  ratingCount = 0,
  className = "",
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { checkout, loading } = useCosmicPayments();
  const { addToCart } = useCart();

  const handleQuickPurchase = async () => {
    if (loading) return;

    try {
      await checkout({
        // Note: These would be real product/price IDs from Cosmic Dashboard
        productId: id,
        priceId: `price_${id}`, // Mock price ID
      });
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  const handleAddToCart = () => {
    const product = {
      id,
      name,
      price,
      image,
      description: description || "",
      category: "Apparel", // Default category
      rating,
      ratingCount,
      inStock: true,
    };
    addToCart(product, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`group relative bg-(--color-surface)/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-(--color-elevated)">
        <motion.img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />  

        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-(--color-elevated) animate-pulse flex items-center justify-center">
            <Icon
              icon="material-symbols:image-outline"
              className="text-(--color-text-muted) text-2xl"
            />
          </div>
        )}

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 w-8 h-8 bg-(--color-surface)/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <Icon
            icon={
              isWishlisted
                ? "material-symbols:favorite"
                : "material-symbols:favorite-outline"
            }
            className={`text-sm transition-colors ${
              isWishlisted
                ? "text-(--color-danger)"
                : "text-(--color-text-muted)"
            }`}
          />
        </motion.button>

        {/* Quick Actions - Show on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 space-y-2"
        >
          <button
            onClick={handleQuickPurchase}
            disabled={loading}
            className="w-full bg-primary text-(--color-primary-contrast) cursor-pointer
              text-xs py-2 px-3 rounded-lg hover:bg-(--color-primary-dark) transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Quick Buy"}
          </button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/product/${id}`}>
          <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-1 hover:text-(--color-text)/90 transition-colors">
            {name}
          </h3>
        </Link>

        {description && (
          <p className="text-xs text-(--color-text-muted) mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                icon="material-symbols:star"
                className={`text-xs ${
                  i < rating
                    ? "text-yellow-400"
                    : "text-border"
                }`}
              />
            ))}
          </div>
          {ratingCount > 0 && (
            <span className="text-xs text-(--color-text-muted)">
              ({ratingCount})
            </span>
          )}
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground">
            ${price.toFixed(2)}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="p-2 bg-(--color-elevated) hover:bg-primary hover:text-(--color-primary-contrast) rounded-lg transition-all cursor-pointer"
            title="Add to Cart"
          >
            <Icon
              icon="material-symbols:add-shopping-cart"
              className="text-sm"
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
