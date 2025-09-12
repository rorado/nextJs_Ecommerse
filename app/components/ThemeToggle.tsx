"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { ThemeMode, useTheme } from "@/app/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, mode, setMode, toggle } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Toggle theme"
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        onClick={toggle}
        className="p-2 rounded-lg hover:bg-[color:var(--color-hover)] text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] transition-colors cursor-pointer"
      >
        <Icon
          icon={theme === "dark" ? "solar:sun-linear" : "line-md:moon"}
          className="text-lg"
        />
      </button>
      <select
        aria-label="Theme mode"
        className="hidden sm:block text-xs px-2 py-1 rounded-md bg-[color:var(--color-surface)] border border-[color:var(--color-border)] text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"
        value={mode}
        onChange={(e) => setMode(e.target.value as ThemeMode)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
}
