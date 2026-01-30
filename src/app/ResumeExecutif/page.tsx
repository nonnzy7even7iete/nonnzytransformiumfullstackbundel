"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import NavbarFront from "@/components/frontendkit/NavbarFront";
import { CardStack } from "@/components/frontendkit/CardStack";
import { ScrollToTop } from "@/components/frontendkit/ScrollToTop";
import { WarpBackground } from "@/components/frontendkit/WarpBackground";
// IMPORT DU NOUVEAU COMPOSANT
import { WordRotate } from "@/components/magicui/word-rotate";

// ... (Garder le reste de tes imports et LOG_CARDS_DATA identiques)

export default function ResumeExecutifPage() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const ABIDJAN = { lat: 5.33, lng: -4.03 };

  // ... (Garder tes destinations et ton useEffect identiques)

  if (!mounted)
    return <div className="min-h-screen bg-white dark:bg-[#020408]" />;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020408] selection:bg-green-500/30">
      <NavbarFront />

      {/* --- SECTION HERO : INTÉGRATION WORD ROTATE --- */}
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden border-b border-black/5 dark:border-white/5">
        <WarpBackground
          className="w-full h-full"
          gridColor="rgba(34, 197, 94, 0.2)"
        >
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Titre Principal */}
              <div className="space-y-2">
                <h1 className="text-4xl md:text-7xl font-black tracking-[0.15em] uppercase italic text-slate-900 dark:text-white leading-none">
                  Nonnzytr{" "}
                  <span className="text-green-500 font-light">Engine</span>
                </h1>
                <p className="text-[10px] md:text-xs font-mono text-green-600 dark:text-green-400 uppercase tracking-[0.5em] font-bold">
                  Decision Logic Protocol v2.0.26
                </p>
              </div>

              {/* BLOC WORD ROTATE : Le cœur de ton message */}
              <div className="flex flex-col items-center gap-4 py-8">
                <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 font-medium">
                  Opère là où la décision devient instable.
                </p>

                <div className="flex flex-col items-center">
                  <span className="text-xs font-mono uppercase opacity-50 mb-2">
                    Condition critique :
                  </span>
                  <WordRotate
                    className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white italic tracking-tight"
                    duration={3500}
                    words={[
                      "Lorsque les signaux sont contradictoires,",
                      "Lorsque les données sont incomplètes,",
                      "Lorsque l’intuition devient dangereuse,",
                    ]}
                  />
                </div>
              </div>

              {/* Conclusion fixe */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="pt-4 border-t border-green-500/20"
              >
                <p className="text-xl md:text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
                  Zy introduis une{" "}
                  <span className="text-green-500 underline decoration-2 underline-offset-8">
                    logique mesurable.
                  </span>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </WarpBackground>
      </section>

      {/* ... (Le reste de tes sections LOGS et GLOBE reste inchangé) */}

      <footer className="py-12 border-t border-border/5 text-center opacity-20">
        <p className="text-[9px] uppercase tracking-[0.5em]">
          Ivory Coast Digital Architecture © 2026
        </p>
      </footer>

      <ScrollToTop />
    </div>
  );
}
