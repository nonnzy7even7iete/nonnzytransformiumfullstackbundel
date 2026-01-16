// components/ThemeToggle.tsx
"use client"; // Indique que ce composant est côté client

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; // Installation nécessaire

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect runs only on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // ou un skeleton/spinner si vous préférez
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="
        relative flex items-center justify-center 
        w-10 h-10 rounded-full 
        bg-white/10 dark:bg-black/20 
        backdrop-blur-sm
        text-white transition-all duration-300
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black
      "
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-300 dark:text-yellow-400 rotate-0 scale-100 transition-all duration-300" />
      ) : (
        <Moon className="h-5 w-5 text-indigo-200 dark:text-indigo-300 rotate-90 scale-0 absolute transition-all duration-300" />
      )}
    </button>
  );
}
