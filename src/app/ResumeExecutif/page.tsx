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
  techBold: "font-oswald font-black uppercase tracking-tighter leading-[0.95]",
  machineLabel:
    "font-mono-tech uppercase tracking-[0.2em] text-[11px] text-zinc-500 dark:text-green-500/80",
  narrative:
    "font-sans text-zinc-600 dark:text-zinc-300 font-medium text-base md:text-lg",
};

const LOG_CARDS_DATA = [
  {
    id: 0,
    name: "BACKBONE_ENGINE",
    designation: "NODE: ABIDJAN",
    content: <p className="text-sm">Flux critiques traités en temps réel.</p>,
  },
  {
    id: 1,
    name: "SECURITY_MESH",
    designation: "SHIELD: ACTIVE",
    content: <p className="text-sm">Chiffrement AES-256 haute performance.</p>,
  },
];

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-white dark:bg-black" />,
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
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 transition-colors duration-500">
      <NavbarFront />

      {/* --- HERO : PLUS CLAIR ET MOINS VOILÉ --- */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center pt-24 overflow-hidden border-b border-zinc-100 dark:border-white/10">
        {/* Suppression de l'opacité basse pour plus de clarté */}
        <WarpBackground
          className="w-full h-full opacity-100 dark:opacity-80"
          gridColor="rgba(34, 197, 94, 0.15)"
        >
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <span className={UI_THEME.machineLabel}>
                  System Integrity: Verified
                </span>
                <h1
                  className={cn(
                    "text-5xl md:text-8xl text-zinc-950 dark:text-white drop-shadow-sm",
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
                    "max-w-2xl mx-auto text-zinc-500 dark:text-zinc-300",
                    UI_THEME.narrative
                  )}
                >
                  Architecture de résilience décisionnelle. Garantissez
                  l'intégrité de vos opérations en environnement instable.
                </p>
                <div className="h-20 flex items-center justify-center">
                  <WordRotate
                    className={cn(
                      "text-3xl md:text-5xl text-zinc-900 dark:text-green-400",
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

      {/* --- LOGS : FOND ÉPURÉ --- */}
      <section className="relative z-30 w-full py-24 px-6 bg-white dark:bg-transparent">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <span className={UI_THEME.machineLabel}>Infrastructure Data</span>
            <h2
              className={cn(
                "text-3xl md:text-6xl text-zinc-950 dark:text-zinc-50",
                UI_THEME.techBold
              )}
            >
              Analyse des{" "}
              <span className="text-green-600 dark:text-green-500">Flux</span>
            </h2>
            <p
              className={cn(
                "max-w-md border-l-2 border-green-500/50 pl-6 py-2",
                UI_THEME.narrative
              )}
            >
              Monitoring stratégique sans voile. La donnée brute au service de
              la décision.
            </p>
          </div>
          <div className="flex justify-center md:justify-end min-h-[400px]">
            <CardStack items={LOG_CARDS_DATA} offset={12} scaleFactor={0.06} />
          </div>
        </div>
      </section>

      {/* --- GLOBE : VISIBILITÉ TOTALE --- */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-zinc-50 dark:bg-[#050505]">
        {/* Hub central plus lumineux */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-100"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]"></span>
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
                color: "#22c55e",
              },
            ]}
            globeConfig={{
              pointSize: 4,
              globeColor: "#18181b", // Globe gris foncé pour voir les terres en Dark
              atmosphereColor: "#22c55e",
              autoRotate: true,
              autoRotateSpeed: 0.6,
            }}
          />
        </div>

        {/* Masque allégé : On réduit l'opacité du gradient de 100% à 60% */}
        <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-[#050505] via-transparent to-white dark:to-[#050505] opacity-60 pointer-events-none" />

        <div className="relative z-20 h-full flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.h2
              key={destinations[index].label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 0.6, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className={cn(
                "text-4xl md:text-8xl text-zinc-950 dark:text-white drop-shadow-2xl",
                UI_THEME.techBold
              )}
            >
              {destinations[index].label}
            </motion.h2>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-16 text-center bg-zinc-50 dark:bg-black">
        <p className={UI_THEME.machineLabel}>NETWORK ARCHITECTURE // 2026</p>
      </footer>

      <ScrollToTop />
    </div>
  );
}
