"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[var(--background)]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Logo Projet */}
            <h1 className="text-2xl font-black italic tracking-[0.4em] uppercase text-[var(--foreground)]">
              Nonnzytr
            </h1>

            {/* Barre de chargement plus lente et plus fluide */}
            <div className="w-48 h-[1px] bg-[var(--border-color)] overflow-hidden relative">
              <motion.div
                className="absolute inset-0 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5, // Augmenté pour un aspect plus "calculé"
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Texte de statut avec délai d'apparition */}
            <div className="flex flex-col items-center gap-2">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[9px] font-mono uppercase tracking-[0.4em] text-[var(--foreground)]/40"
              >
                Establishing Secure Link
              </motion.p>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em] animate-pulse"
              >
                Terminal Hub Anyama : Online
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
