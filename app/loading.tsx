"use client";

import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-(--color-surface) text-foreground z-50">
      <motion.div
        className="w-24 h-24 bg-linear-to-br from-primary to-(--color-primary-dark) rounded-full flex items-center justify-center shadow-lg mb-8"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-white font-bold text-2xl">E</span>
      </motion.div>

      <motion.div
        className="text-xl font-medium"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading EliteShop...
      </motion.div>

      <motion.div
        className="flex space-x-2 mt-4"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", staggerChildren: 0.2 }}
      >
        <motion.span className="w-3 h-3 bg-primary rounded-full" />
        <motion.span className="w-3 h-3 bg-primary rounded-full" />
        <motion.span className="w-3 h-3 bg-primary rounded-full" />
      </motion.div>
    </div>
  );
}
