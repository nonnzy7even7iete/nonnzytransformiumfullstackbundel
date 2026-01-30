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
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="
        relative flex items-center justify-center 
        w-10 h-10 rounded-full 
        bg-glass-dual border border-border-dual
        backdrop-blur-sm
        hover:scale-110 active:scale-95
        focus:outline-none overflow-hidden
      "
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="moon"
            /* L'icône arrive du BAS avec une rotation */
            initial={{ y: 30, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -30, opacity: 0, rotate: -90 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Moon className="h-5 w-5 text-blue-400 fill-blue-400/20" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            /* L'icône arrive du HAUT avec une rotation inverse */
            initial={{ y: -30, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 30, opacity: 0, rotate: 90 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Sun className="h-5 w-5 text-yellow-400 fill-yellow-400/20" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
