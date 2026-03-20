"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Empêche l'erreur d'hydratation (Next.js)
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <div className="relative group">
      {/* Halo discret au hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="
          relative flex items-center justify-center 
          w-10 h-10 rounded-full 
          bg-[var(--card-bg)] border border-[var(--border-color)]
          backdrop-blur-md
          hover:border-emerald-500/40 transition-all duration-300
          /* Suppression radicale des bordures de focus au clic */
          outline-none focus:outline-none focus:ring-0 focus-visible:outline-none
          active:scale-90
        "
        aria-label="Toggle Theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ y: 10, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -10, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Moon className="h-5 w-5 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Sun className="h-5 w-5 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};
