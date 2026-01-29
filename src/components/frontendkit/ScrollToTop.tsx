"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // On affiche le bouton seulement après avoir scrollé un peu (ex: 300px)
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] p-4 rounded-full 
                     bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10
                     text-black dark:text-white shadow-2xl backdrop-blur-md
                     hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Retour en haut"
        >
          <IoIosArrowUp className="text-2xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
