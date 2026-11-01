"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="rounded-lg border px-3 py-1">
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}