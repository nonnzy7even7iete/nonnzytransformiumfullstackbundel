"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <div className="relative group">
      {/* Effet de halo lumineux derrière le bouton */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-20 transition duration-500"></div>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="
          relative flex items-center justify-center 
          w-10 h-10 rounded-full 
          bg-glass-dual border border-border-dual
          backdrop-blur-md
          hover:border-emerald-500/50 transition-all duration-300
          overflow-hidden
        "
      >
        <AnimatePresence mode="wait">
          {theme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="h-5 w-5 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="h-5 w-5 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};
