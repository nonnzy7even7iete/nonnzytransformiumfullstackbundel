"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

import NavbarFront from "@/components/frontendkit/NavbarFront";
import { CardStack } from "@/components/frontendkit/CardStack";
import { ScrollToTop } from "@/components/frontendkit/ScrollToTop";
import { WarpBackground } from "@/components/frontendkit/WarpBackground";
import { LogicBadge } from "@/components/frontendkit/LogicBadge";
import { WordRotate } from "@/components/frontendkit/word-rotate";
import { cn } from "@/lib/utils";

// --- THEME ENGINE : SOFT & PRO ---
const UI_THEME = {
  techBold: "font-oswald font-semibold tracking-[0.02em] leading-[1.1]",
  orangeGreenGradient:
    "bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent",
  steelGradient:
    "bg-gradient-to-b from-zinc-800 via-zinc-500 to-zinc-400 dark:from-white dark:via-zinc-300 dark:to-zinc-600 bg-clip-text text-transparent",
  machineLabel:
    "font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-400/70",
  narrative:
    "font-sans uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 font-normal text-[10px] md:text-xs",
};

// Globe import avec priorité haute performance
const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-white dark:bg-[#050505] flex items-center justify-center font-mono text-[10px] text-zinc-300">
        SYSTEM_INIT...
      </div>
    ),
  }
);

export default function ResumeExecutifPage() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const ABIDJAN = { lat: 5.33, lng: -4.03 };

  const destinations = useMemo(
    () => [
      { label: "SÉNÉGAL", lat: 14.49, lng: -14.45, color: "#22c55e" },
      { label: "NIGÉRIA", lat: 9.08, lng: 8.67, color: "#22c55e" },
      { label: "MAROC", lat: 31.79, lng: -7.09, color: "#f97316" },
      { label: "CHINE", lat: 35.86, lng: 104.19, color: "#ef4444" },
      { label: "USA", lat: 37.09, lng: -95.71, color: "#3b82f6" },
      { label: "EUROPE", lat: 48.85, lng: 2.35, color: "#eab308" },
      { label: "MALI", lat: 17.57, lng: -3.99, color: "#22c55e" },
    ],
    []
  );

  const dummyCards = useMemo(
    () => [
      {
        id: 1,
        name: "FLUX ALPHA",
        designation: "OPÉRATIONNEL",
        content: "Analyse des signaux entrants en temps réel.",
      },
      {
        id: 2,
        name: "FLUX BETA",
        designation: "STABLE",
        content: "Intégrité des données vérifiée sur le hub Abidjan.",
      },
    ],
    []
  );

  useEffect(() => {
    setMounted(true);
    const intervalId = setInterval(() => {
      setIndex((prev) => (prev + 1) % destinations.length);
    }, 6000); // Ralenti pour plus de majesté
    return () => clearInterval(intervalId);
  }, [destinations.length]);

  if (!mounted) return null;

  const currentDest = destinations[index] || destinations[0];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 selection:bg-emerald-500/30 overflow-x-hidden transition-colors duration-700">
      <NavbarFront />

      {/* --- SECTION 1 : HERO (WARP) --- */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
        <WarpBackground
          className="w-full h-full opacity-30 dark:opacity-40"
          gridColor="rgba(34, 197, 94, 0.12)"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full"
          >
            <span className={UI_THEME.machineLabel}>
              Système Actif // Node_01
            </span>
            <h1
              className={cn(
                "text-6xl md:text-9xl mt-6 mb-12",
                UI_THEME.techBold
              )}
            >
              <span className={UI_THEME.steelGradient}>Nonnzytr</span>
              <br />
              <span className={UI_THEME.orangeGreenGradient}>opère</span>
            </h1>

            <div className="flex flex-col items-center gap-8">
              <p
                className={cn(
                  "max-w-xl mx-auto leading-relaxed opacity-70",
                  UI_THEME.narrative
                )}
              >
                Architecture de résilience décisionnelle. <br />
                Intégrité des opérations en environnement instable.
              </p>
              <div className="h-12 flex items-center justify-center">
                <WordRotate
                  className={cn(
                    "text-xl md:text-3xl",
                    UI_THEME.techBold,
                    UI_THEME.steelGradient
                  )}
                  words={[
                    "SIGNAUX CONTRADICTOIRES",
                    "DONNÉES INCOMPLÈTES",
                    "INTUITION DANGEREUSE",
                  ]}
                />
              </div>
              <LogicBadge text="Logique Mesurable" />
            </div>
          </motion.div>
        </WarpBackground>
      </section>

      {/* --- SECTION 2 : ANALYSE (FLUX) --- */}
      <section className="relative z-20 w-full py-32 px-6 bg-zinc-50 dark:bg-[#050505] border-y border-zinc-100 dark:border-white/5 transition-colors">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className={UI_THEME.machineLabel}>Data Stream Analysis</span>
            <h2 className={cn("text-4xl md:text-6xl", UI_THEME.techBold)}>
              <span className={UI_THEME.steelGradient}>Analyse des Flux</span>
            </h2>
            <div className="h-1 w-12 bg-emerald-500" />
            <p className={cn("max-w-md opacity-80", UI_THEME.narrative)}>
              Interconnexion sécurisée des nœuds stratégiques mondiaux depuis le
              hub d'Abidjan.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <CardStack items={dummyCards} offset={12} scaleFactor={0.06} />
          </div>
        </div>
      </section>

      {/* --- SECTION 3 : GLOBE (THE MASTERPIECE) --- */}
      <section className="relative h-[90vh] w-full overflow-hidden bg-white dark:bg-[#050505] flex items-center justify-center">
        {/* Globe Layer */}
        <div className="absolute inset-0 z-0">
          <World
            data={[
              {
                order: 1,
                startLat: ABIDJAN.lat,
                startLng: ABIDJAN.lng,
                endLat: currentDest.lat,
                endLng: currentDest.lng,
                arcAlt: 0.3,
                color: currentDest.color,
              },
            ]}
          />
        </div>

        {/* Masque Soft-Alpha : Élimine la brume et nettoie le Light Mode */}
        <div
          className="absolute inset-0 z-10 pointer-events-none 
          bg-[radial-gradient(circle_at_center,transparent_30%,white_90%)] 
          dark:bg-[radial-gradient(circle_at_center,transparent_30%,#050505_90%)]"
        />

        {/* HUD de Transmission */}
        <div className="relative z-20 text-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDest.label}
              initial={{ opacity: 0, filter: "blur(8px)", scale: 0.9 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(8px)", scale: 1.1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={UI_THEME.machineLabel}>
                Signal Transmission : Global
              </span>
              <h2
                className={cn(
                  "text-5xl md:text-9xl mt-4",
                  UI_THEME.techBold,
                  UI_THEME.steelGradient
                )}
              >
                {currentDest.label}
              </h2>
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.4em] text-emerald-500/80">
                  EN COURS
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-20 text-center bg-white dark:bg-[#050505] opacity-40">
        <p className={UI_THEME.machineLabel}>
          Architecture Data Driven // Abidjan 2026
        </p>
      </footer>

      <ScrollToTop />
    </div>
  );
}
