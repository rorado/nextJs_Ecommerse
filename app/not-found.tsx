"use client";

import { motion } from "framer-motion";
import TextPressure from "@/components/ui/shadcn-io/text-pressure";
import Link from "next/link";

export default function TextPressureDemo() {
  return (
    <div className="h-[calc(100vh-12rem)] relative flex flex-col items-center justify-center w-full bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-secondary)]/10 blur-3xl" />
      <motion.div
        className="absolute w-72 bg-[var(--color-primary)]/20 rounded-full blur-3xl"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* TextPressure Animated Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center text-center"
      >
        <TextPressure
          text="404"
          flex={true}
          alpha={false}
          stroke={false}
          width={false}
          weight={true}
          italic={false}
          textColor="var(--color-primary)"
          minFontSize={80}
          className="text-[10vw] font-extrabold drop-shadow-[0_0_20px_rgba(14,165,164,0.4)]"
        />
        <p className="mt-2 text-lg sm:text-xl text-[color:var(--color-text-muted)]">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        {/* Return Home Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8"
        >
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-contrast)] font-semibold shadow-[0_4px_20px_rgba(14,165,164,0.3)] hover:bg-[var(--color-primary-dark)] transition-all"
          >
            Go Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
