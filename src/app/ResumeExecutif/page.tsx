"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Tes composants frontendkit
import NavbarFront from "@/components/frontendkit/NavbarFront";
import { CardStack } from "@/components/frontendkit/CardStack";
import { ScrollToTop } from "@/components/frontendkit/ScrollToTop";
import { WarpBackground } from "@/components/frontendkit/WarpBackground";
import { LogicBadge } from "@/components/frontendkit/LogicBadge";

// Magic UI
import { WordRotate } from "@/components/frontendkit/word-rotate";
import { cn } from "@/lib/utils";

// --- THEME LOGIC : Couleurs basées sur ta config CSS ---
const UI_THEME = {
  techBold: "font-oswald font-black uppercase tracking-tighter leading-[0.9]",
  machineLabel:
    "font-mono-tech uppercase tracking-[0.3em] text-[9px] text-zinc-500 dark:text-green-500/60",
  narrative:
    "font-sans text-zinc-600 dark:text-zinc-400 font-medium tracking-tight",
};

const LOG_CARDS_DATA = [
  {
    id: 0,
    name: "BACKBONE_ENGINE",
    designation: "NODE: ABIDJAN",
    content: (
      <p className="text-xs">Analyse des flux critiques en temps réel.</p>
    ),
  },
  {
    id: 1,
    name: "SECURITY_MESH",
    designation: "SHIELD: ACTIVE",
    content: <p className="text-xs">Chiffrement AES-256 haute performance.</p>,
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

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(
      () => setIndex((p) => (p + 1) % destinations.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  const destinations = useMemo(
    () => [
      { label: "NORTH AMERICA", lat: 39.82, lng: -98.57 },
      { label: "EUROPEAN NODES", lat: 50.11, lng: 14.42 },
      { label: "ABIDJAN HUB", lat: 5.33, lng: -4.03 },
    ],
    []
  );

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020408] text-zinc-900 dark:text-zinc-50 transition-colors duration-500">
      <NavbarFront />

      {/* --- SECTION 1 : HERO (Taille Réduite) --- */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center pt-24 overflow-hidden border-b border-zinc-100 dark:border-white/5">
        <WarpBackground
          className="w-full h-full opacity-60 dark:opacity-30"
          gridColor="rgba(34, 197, 94, 0.2)"
        >
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              <div className="space-y-3">
                <span className={UI_THEME.machineLabel}>
                  Protocol v2.0.26 // Active
                </span>
                <h1
                  className={cn(
                    "text-4xl md:text-6xl text-zinc-950 dark:text-white",
                    UI_THEME.techBold
                  )}
                >
                  NONNZYTR{" "}
                  <span className="text-green-600 dark:text-green-500">
                    OPERATE
                  </span>
                </h1>
              </div>

              <div className="flex flex-col items-center gap-4">
                <p
                  className={cn(
                    "text-sm md:text-base max-w-lg mx-auto italic opacity-70",
                    UI_THEME.narrative
                  )}
                >
                  Architecture de résilience pour environnements instables.
                </p>
                <div className="h-12 flex items-center justify-center">
                  <WordRotate
                    className={cn(
                      "text-xl md:text-3xl text-zinc-800 dark:text-green-400",
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

              <div className="pt-4">
                <LogicBadge text="LOGIQUE MESURABLE" />
              </div>
            </motion.div>
          </div>
        </WarpBackground>
      </section>

      {/* --- SECTION 2 : LOGS & CARDSTACK --- */}
      <section className="relative z-30 w-full py-20 px-6 bg-zinc-50/50 dark:bg-transparent">
        <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className={UI_THEME.machineLabel}>Network Backbone</span>
            <h2
              className={cn(
                "text-2xl md:text-4xl text-zinc-950 dark:text-zinc-50",
                UI_THEME.techBold
              )}
            >
              Analyse des{" "}
              <span className="text-green-600 dark:text-green-500">Flux</span>
            </h2>
            <p
              className={cn(
                "text-sm max-w-xs border-l border-zinc-200 dark:border-green-500/30 pl-4",
                UI_THEME.narrative
              )}
            >
              Traitement temps réel sur les nœuds stratégiques.
            </p>
          </div>
          <div className="flex justify-center md:justify-end min-h-[300px]">
            <CardStack items={LOG_CARDS_DATA} offset={8} scaleFactor={0.05} />
          </div>
        </div>
      </section>

      {/* --- SECTION 3 : GLOBE (Couleurs Adaptatives) --- */}
      <section className="relative h-[70vh] w-full overflow-hidden border-t border-zinc-100 dark:border-white/5">
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
              globeColor: "#f4f4f5", // Light: Zinc-100
              atmosphereColor: "#22c55e",
              autoRotate: true,
              autoRotateSpeed: 0.5,
            }}
          />
        </div>

        {/* Masque adaptatif */}
        <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-[#020408] via-transparent to-white dark:to-[#020408] pointer-events-none" />

        <div className="relative z-10 h-full flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.h2
              key={destinations[index].label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.15, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "text-3xl md:text-5xl text-zinc-950 dark:text-white",
                UI_THEME.techBold
              )}
            >
              {destinations[index].label}
            </motion.h2>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-12 text-center bg-zinc-50 dark:bg-black border-t border-zinc-100 dark:border-white/5">
        <p className={UI_THEME.machineLabel}>
          IVORY COAST DIGITAL BACKBONE © 2026
        </p>
      </footer>

      <ScrollToTop />
    </div>
  );
}
