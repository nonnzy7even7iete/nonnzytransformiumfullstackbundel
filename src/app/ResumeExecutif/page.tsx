"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Tes composants frontendkit (Flux Imports à jour)
import NavbarFront from "@/components/frontendkit/NavbarFront";
import { CardStack } from "@/components/frontendkit/CardStack";
import { ScrollToTop } from "@/components/frontendkit/ScrollToTop";
import { WarpBackground } from "@/components/frontendkit/WarpBackground";
import { LogicBadge } from "@/components/frontendkit/LogicBadge";
import { WordRotate } from "@/components/frontendkit/word-rotate";
import { cn } from "@/lib/utils";

// --- THEME LOGIC : Polices Standards & Adaptatives ---
const UI_THEME = {
  techBold: "font-oswald font-black uppercase tracking-tighter leading-[0.95]",
  machineLabel:
    "font-mono-tech uppercase tracking-[0.2em] text-[11px] text-zinc-500 dark:text-green-500/70",
  narrative:
    "font-sans text-zinc-600 dark:text-zinc-400 font-medium tracking-normal text-base md:text-lg",
};

const LOG_CARDS_DATA = [
  {
    id: 0,
    name: "BACKBONE_ENGINE",
    designation: "NODE: ABIDJAN",
    content: (
      <p className="text-sm">
        Analyse des flux critiques en temps réel sur le backbone national.
      </p>
    ),
  },
  {
    id: 1,
    name: "SECURITY_MESH",
    designation: "SHIELD: ACTIVE",
    content: (
      <p className="text-sm">
        Chiffrement AES-256 haute performance et monitoring des menaces.
      </p>
    ),
  },
];

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950" />
    ),
  }
);

export default function ResumeExecutifPage() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const ABIDJAN = { lat: 5.33, lng: -4.03 };

  const destinations = useMemo(
    () => [
      { label: "NORTH AMERICA", lat: 39.82, lng: -98.57 },
      { label: "EUROPEAN NODES", lat: 50.11, lng: 14.42 },
      { label: "ABIDJAN HUB", lat: 5.33, lng: -4.03 },
    ],
    []
  );

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(
      () => setIndex((p) => (p + 1) % destinations.length),
      6000
    );
    return () => clearInterval(timer);
  }, [destinations.length]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020408] text-zinc-900 dark:text-zinc-50 transition-colors duration-500">
      <NavbarFront />

      {/* --- SECTION 1 : HERO (Tailles Standard Desktop/Mobile) --- */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-24 overflow-hidden border-b border-zinc-100 dark:border-white/5">
        <WarpBackground
          className="w-full h-full opacity-70 dark:opacity-30"
          gridColor="rgba(34, 197, 94, 0.25)"
        >
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <span className={UI_THEME.machineLabel}>
                  Protocol v2.0.26 // Active System
                </span>
                <h1
                  className={cn(
                    "text-5xl md:text-8xl text-zinc-950 dark:text-white",
                    UI_THEME.techBold
                  )}
                >
                  NONNZYTR{" "}
                  <span className="text-green-600 dark:text-green-500">
                    OPERATE
                  </span>
                </h1>
              </div>

              <div className="flex flex-col items-center gap-8">
                <p
                  className={cn(
                    "max-w-2xl mx-auto opacity-80 leading-relaxed",
                    UI_THEME.narrative
                  )}
                >
                  Déployez une architecture de résilience décisionnelle là où
                  l'incertitude domine. Garantissez l'intégrité de vos
                  opérations en environnement instable.
                </p>
                <div className="h-20 flex items-center justify-center">
                  <WordRotate
                    className={cn(
                      "text-3xl md:text-5xl text-zinc-800 dark:text-green-400 drop-shadow-sm",
                      UI_THEME.techBold
                    )}
                    words={[
                      "SIGNAUX CONTRADICTOIRES",
                      "DONNÉES INCOMPLÈTES",
                      "INTUITION DANGEREUSE",
                    ]}
                  />
                </div>
              </div>

              <div className="pt-6">
                <LogicBadge text="LOGIQUE MESURABLE" />
              </div>
            </motion.div>
          </div>
        </WarpBackground>
      </section>

      {/* --- SECTION 2 : INFRASTRUCTURE & CARDSTACK --- */}
      <section className="relative z-30 w-full py-28 px-6 bg-zinc-50/80 dark:bg-transparent">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <span className={UI_THEME.machineLabel}>
              Network Infrastructure
            </span>
            <h2
              className={cn(
                "text-3xl md:text-6xl text-zinc-950 dark:text-zinc-50",
                UI_THEME.techBold
              )}
            >
              Analyse des{" "}
              <span className="text-green-600 dark:text-green-500">
                Flux de Données
              </span>
            </h2>
            <p
              className={cn(
                "max-w-md border-l-2 border-zinc-300 dark:border-green-500/30 pl-6 py-2",
                UI_THEME.narrative
              )}
            >
              Monitoring stratégique des nœuds critiques. Traitement de la
              donnée à la source pour une réactivité maximale.
            </p>
          </div>
          <div className="flex justify-center md:justify-end min-h-[400px]">
            <CardStack items={LOG_CARDS_DATA} offset={12} scaleFactor={0.06} />
          </div>
        </div>
      </section>

      {/* --- SECTION 3 : GLOBE (Pulse Actif & Visualisation) --- */}
      <section className="relative h-[85vh] w-full overflow-hidden border-t border-zinc-100 dark:border-white/5">
        {/* Hub Central Pulse (Abidjan) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
          </div>
        </div>

        <div className="absolute inset-0 z-0">
          <World
            data={[
              {
                order: 1,
                startLat: ABIDJAN.lat,
                startLng: ABIDJAN.lng,
                endLat: destinations[index].lat,
                endLng: destinations[index].lng,
                arcAlt: 0.3,
                color: "#16a34a",
              },
            ]}
            globeConfig={{
              pointSize: 4,
              globeColor: "#f4f4f5", // S'ajuste au mode Light (Zinc-100)
              atmosphereColor: "#22c55e",
              autoRotate: true,
              autoRotateSpeed: 0.5,
            }}
          />
        </div>

        {/* Masque de transition adaptatif */}
        <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-[#020408] via-transparent to-white dark:to-[#020408] pointer-events-none" />

        <div className="relative z-20 h-full flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.h2
              key={destinations[index].label}
              initial={{ opacity: 0, letterSpacing: "0.4em", y: 20 }}
              animate={{ opacity: 0.3, letterSpacing: "0.15em", y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                "text-4xl md:text-8xl text-zinc-950 dark:text-white",
                UI_THEME.techBold
              )}
            >
              {destinations[index].label}
            </motion.h2>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-16 text-center bg-zinc-50 dark:bg-black border-t border-zinc-100 dark:border-white/5">
        <p className={UI_THEME.machineLabel}>
          IVORY COAST BACKBONE ARCHITECTURE © 2026
        </p>
      </footer>

      <ScrollToTop />
    </div>
  );
}
