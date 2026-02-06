"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[var(--background)] transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Identité visuelle réactive */}
        <h1 className="text-2xl font-black italic tracking-[0.3em] uppercase text-[var(--foreground)]">
          Nonnzytr
        </h1>

        {/* Conteneur de barre de chargement */}
        <div className="w-40 h-[1px] bg-[var(--border-color)] overflow-hidden relative">
          <motion.div
            className="absolute inset-0 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "circInOut",
            }}
          />
        </div>

        {/* Texte de statut dynamique */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-[var(--foreground)]/40">
            Secure Connection
          </p>
          <span className="text-[8px] font-bold text-emerald-500/80 uppercase tracking-widest animate-pulse">
            Protocol: Active
          </span>
        </div>
      </motion.div>
    </div>
  );
}
