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

// --- THEME LOGIC : Typographie raffinée ---
const UI_THEME = {
  // Oswald moins gras (semibold au lieu de black) et plus espacé
  techBold:
    "font-oswald font-semibold uppercase tracking-[0.05em] leading-[1.1]",
  // Textes non-gras en UPPERCASE standard
  machineLabel:
    "font-mono-tech uppercase tracking-[0.25em] text-[10px] text-zinc-500 dark:text-green-500/80",
  narrative:
    "font-sans uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-normal text-xs md:text-sm",
};

const LOG_CARDS_DATA = [
  {
    id: 0,
    name: "BACKBONE_ENGINE",
    designation: "NODE: ABIDJAN",
    content: (
      <p className="text-[10px] uppercase tracking-wider">
        Traitement des flux critiques en temps réel.
      </p>
    ),
  },
  {
    id: 1,
    name: "SECURITY_MESH",
    designation: "SHIELD: ACTIVE",
    content: (
      <p className="text-[10px] uppercase tracking-wider">
        Protocoles de chiffrement haute performance.
      </p>
    ),
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

      {/* --- SECTION 1 : HERO (Oswald adouci & Narrative Uppercase) --- */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center pt-24 overflow-hidden border-b border-zinc-100 dark:border-white/5">
        <WarpBackground
          className="w-full h-full opacity-100 dark:opacity-80"
          gridColor="rgba(34, 197, 94, 0.15)"
        >
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-14"
            >
              <div className="space-y-4">
                <span className={UI_THEME.machineLabel}>
                  Status: System Operational
                </span>
                <h1
                  className={cn(
                    "text-4xl md:text-7xl text-zinc-950 dark:text-white",
                    UI_THEME.techBold
                  )}
                >
                  NONNZYTR{" "}
                  <span className="text-green-600 dark:text-green-500">
                    OPERATE
                  </span>
                </h1>
              </div>

              <div className="flex flex-col items-center gap-10">
                <p
                  className={cn(
                    "max-w-xl mx-auto leading-loose",
                    UI_THEME.narrative
                  )}
                >
                  Architecture de résilience décisionnelle. <br />
                  Intégrité des opérations en environnement instable.
                </p>
                <div className="h-16 flex items-center justify-center">
                  <WordRotate
                    className={cn(
                      "text-2xl md:text-4xl text-zinc-800 dark:text-green-400",
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

      {/* --- SECTION 2 : DATA FLOW --- */}
      <section className="relative z-30 w-full py-24 px-6 bg-white dark:bg-transparent">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <span className={UI_THEME.machineLabel}>Infrastructure Node</span>
            <h2
              className={cn(
                "text-3xl md:text-5xl text-zinc-950 dark:text-zinc-50",
                UI_THEME.techBold
              )}
            >
              Analyse des{" "}
              <span className="text-green-600 dark:text-green-500">Flux</span>
            </h2>
            <p
              className={cn(
                "max-w-md border-l border-green-500/30 pl-6 py-2",
                UI_THEME.narrative
              )}
            >
              Monitoring stratégique des signaux critiques sur le backbone
              national.
            </p>
          </div>
          <div className="flex justify-center md:justify-end min-h-[400px]">
            <CardStack items={LOG_CARDS_DATA} offset={12} scaleFactor={0.06} />
          </div>
        </div>
      </section>

      {/* --- SECTION 3 : GLOBE --- */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-zinc-50 dark:bg-[#050505]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]"></span>
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
              globeColor: "#18181b",
              atmosphereColor: "#22c55e",
              autoRotate: true,
              autoRotateSpeed: 0.6,
            }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-[#050505] via-transparent to-white dark:to-[#050505] opacity-60 pointer-events-none" />

        <div className="relative z-20 h-full flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.h2
              key={destinations[index].label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.5, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                "text-3xl md:text-7xl text-zinc-950 dark:text-white",
                UI_THEME.techBold
              )}
            >
              {destinations[index].label}
            </motion.h2>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-16 text-center bg-zinc-50 dark:bg-black">
        <p className={UI_THEME.machineLabel}>Architecture Digitale // 2026</p>
      </footer>

      <ScrollToTop />
    </div>
  );
}
