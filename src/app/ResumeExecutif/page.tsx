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

const UI_THEME = {
  techBold: "font-oswald font-bold tracking-tight leading-[0.95]",
  orangeGreenGradient:
    "bg-gradient-to-r from-orange-600 to-emerald-500 bg-clip-text text-transparent",
  steelGradient:
    "bg-gradient-to-b from-zinc-950 to-zinc-600 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent",
  machineLabel:
    "font-mono text-[10px] uppercase tracking-[0.4em] text-emerald-600 dark:text-emerald-400 font-bold",
  narrative:
    "font-sans uppercase tracking-[0.15em] text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed",
};

// Import dynamique du composant World (qui contient le GlobeClient)
const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="h-[85vh] flex items-center justify-center font-mono text-[10px] text-emerald-500 animate-pulse uppercase tracking-[0.3em]">
        System_Init...
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
      { label: "SÉNÉGAL", lat: 14.49, lng: -14.45, color: "#10b981" },
      { label: "NIGÉRIA", lat: 9.08, lng: 8.67, color: "#10b981" },
      { label: "MAROC", lat: 31.79, lng: -7.09, color: "#f97316" },
      { label: "CHINE", lat: 35.86, lng: 104.19, color: "#ef4444" },
      { label: "USA", lat: 37.09, lng: -95.71, color: "#3b82f6" },
      { label: "EUROPE", lat: 48.85, lng: 2.35, color: "#eab308" },
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
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % destinations.length),
      5000
    );
    return () => clearInterval(interval);
  }, [destinations.length]);

  if (!mounted) return null;
  const currentDest = destinations[index];

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-950 dark:text-zinc-50 transition-colors duration-700 selection:bg-emerald-500/30">
      <NavbarFront />

      {/* --- SECTION 1 : HERO --- */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center border-b border-zinc-200 dark:border-white/5 overflow-hidden">
        <WarpBackground
          className="opacity-100"
          gridColor="rgba(16, 185, 129, 0.15)"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center px-6"
          >
            <LogicBadge text="SYSTEM_ACTIVE // Node_01" />
            <h1
              className={cn("text-7xl md:text-[10rem] mt-8", UI_THEME.techBold)}
            >
              <span className={UI_THEME.steelGradient}>NONNZYTR</span>
              <br />
              <span className={UI_THEME.orangeGreenGradient}>OPÈRE</span>
            </h1>
            <div className="mt-12 space-y-6">
              <p className={UI_THEME.narrative}>
                Architecture de résilience décisionnelle • Hub Abidjan
              </p>
              <WordRotate
                className="text-xl font-mono text-emerald-600 dark:text-emerald-400"
                words={[
                  "FLUX ANALYTIQUES",
                  "DONNÉES SÉCURISÉES",
                  "VÉLOCITÉ MAXIMALE",
                ]}
              />
            </div>
          </motion.div>
        </WarpBackground>
      </section>

      {/* --- SECTION 2 : ANALYSE (RÉINTÉGRÉE) --- */}
      <section className="relative z-20 py-32 px-6 bg-zinc-50 dark:bg-[#080808] border-b border-zinc-200 dark:border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 text-center md:text-left">
            <span className={UI_THEME.machineLabel}>
              02 // Data Stream Analysis
            </span>
            <h2
              className={cn(
                "text-5xl md:text-7xl uppercase",
                UI_THEME.techBold
              )}
            >
              Analyse des Flux
            </h2>
            <div className="h-1.5 w-20 bg-emerald-500 mx-auto md:mx-0" />
            <p className={cn("max-w-md mx-auto md:mx-0", UI_THEME.narrative)}>
              Interconnexion sécurisée des nœuds stratégiques mondiaux. Zéro
              latence, intégrité absolue.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <CardStack items={dummyCards} offset={12} scaleFactor={0.06} />
          </div>
        </div>
      </section>

      {/* --- SECTION 3 : GLOBE (NETTOYÉ) --- */}
      <section className="relative h-[85vh] w-full bg-white dark:bg-[#050505] transition-colors duration-700 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="absolute inset-0 z-0 scale-110">
          <World
            data={[
              {
                startLat: ABIDJAN.lat,
                startLng: ABIDJAN.lng,
                endLat: currentDest.lat,
                endLng: currentDest.lng,
                color: currentDest.color,
              },
            ]}
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDest.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center"
            >
              <span className={UI_THEME.machineLabel}>Signal Transmission</span>
              <h2
                className={cn(
                  "text-6xl md:text-[11rem] mt-2",
                  UI_THEME.techBold,
                  UI_THEME.steelGradient
                )}
              >
                {currentDest.label}
              </h2>
              <div className="mt-4 inline-flex items-center gap-4 bg-white/10 dark:bg-black/20 backdrop-blur-md px-6 py-2 border border-zinc-200 dark:border-white/10">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-mono text-[10px] tracking-widest uppercase">
                  Sync_Active
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-20 border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#050505] text-center">
        <p className={UI_THEME.machineLabel}>Abidjan Data Center // 2026</p>
      </footer>
      <ScrollToTop />
    </div>
  );
}
