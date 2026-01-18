"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="
        relative flex items-center justify-center 
        w-10 h-10 rounded-full 
        bg-glass-dual border border-border-dual /* 🪄 Utilise tes nouvelles classes */
        backdrop-blur-sm
        text-foreground transition-all duration-300
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-primary
      "
      aria-label="Toggle theme"
    >
      {/* Icône Soleil : Visible uniquement en DARK */}
      <Sun
        className={`h-5 w-5 text-yellow-400 transition-all duration-300 
        ${
          theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90 absolute"
        }`}
      />

      {/* Icône Lune : Visible uniquement en LIGHT */}
      <Moon
        className={`h-5 w-5 text-indigo-600 transition-all duration-300 
        ${
          theme === "light"
            ? "scale-100 rotate-0"
            : "scale-0 -rotate-90 absolute"
        }`}
      />
    </button>
  );
}
