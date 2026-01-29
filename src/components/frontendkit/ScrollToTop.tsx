"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          /* --- LOGIQUE GLASSMORPHISME ADAPTATIVE --- */
          className="fixed bottom-8 right-8 z-[100] p-4 rounded-full 
                     /* Effets de verre */
                     backdrop-blur-xl saturate-150
                     
                     /* Mode Clair : Blanc givré avec ombre douce */
                     bg-white/40 border border-white/40 text-black/70 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]
                     
                     /* Mode Sombre : Anthracite translucide avec bordure subtile */
                     dark:bg-black/40 dark:border-white/10 dark:text-white/70 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]
                     
                     /* Hover & Animation */
                     hover:scale-110 hover:bg-white/60 dark:hover:bg-black/60 transition-all duration-300 active:scale-95"
          aria-label="Retour en haut"
        >
          <IoIosArrowUp className="text-2xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
