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
  techBold: "font-oswald font-semibold tracking-[0.02em] leading-[1.1]",
  orangeGreenGradient:
    "bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent",
  // Steel gradient adapté pour être visible sur blanc (zinc-800) et noir (zinc-300)
  steelGradient:
    "bg-gradient-to-b from-zinc-800 via-zinc-500 to-zinc-400 dark:from-white dark:via-zinc-300 dark:to-zinc-600 bg-clip-text text-transparent",
  machineLabel:
    "font-mono-tech uppercase tracking-[0.25em] text-[10px] text-zinc-500/80",
  narrative:
    "font-sans uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-normal text-xs md:text-sm",
};

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[#050505] flex items-center justify-center text-zinc-800 font-mono text-[10px] tracking-tighter">
        INITIALISATION FLUX...
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

  useEffect(() => {
    setMounted(true);
    const intervalId = setInterval(() => {
      setIndex((prev) => (prev + 1) % destinations.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [destinations.length]);

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

  if (!mounted)
    return <div className="min-h-screen bg-white dark:bg-[#050505]" />;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 selection:bg-emerald-500/30 overflow-x-hidden transition-colors duration-500">
      <NavbarFront />

      {/* SECTION 1 : HERO */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center pt-24 overflow-hidden border-b border-zinc-200 dark:border-white/5 bg-white dark:bg-[#050505]">
        <WarpBackground
          className="w-full h-full opacity-40"
          gridColor="rgba(34, 197, 94, 0.15)"
        >
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-14"
            >
              <div className="space-y-4">
                <span className={UI_THEME.machineLabel}>
                  État : Système Opérationnel
                </span>
                <h1 className={cn("text-5xl md:text-8xl", UI_THEME.techBold)}>
                  <span className={UI_THEME.steelGradient}>Nonnzytr</span>{" "}
                  <span className={UI_THEME.orangeGreenGradient}>opère</span>
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
                      "text-2xl md:text-4xl",
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
              </div>
              <div className="pt-4">
                <LogicBadge text="Logique Mesurable" />
              </div>
            </motion.div>
          </div>
        </WarpBackground>
      </section>

      {/* SECTION 2 : ANALYSE DES FLUX */}
      <section className="relative z-30 w-full py-24 px-6 bg-zinc-50 dark:bg-[#050505] border-b border-zinc-200 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <span className={UI_THEME.machineLabel}>Flux de Données</span>
            <h2 className={cn("text-3xl md:text-5xl", UI_THEME.techBold)}>
              <span className={UI_THEME.steelGradient}>Analyse des Flux</span>
            </h2>
            <p
              className={cn(
                "max-w-md border-l border-zinc-200 dark:border-zinc-800 pl-6 py-2",
                UI_THEME.narrative
              )}
            >
              Interconnexion sécurisée des nœuds stratégiques mondiaux depuis le
              hub d'Abidjan.
            </p>
          </div>
          <div className="flex justify-center md:justify-end min-h-[400px]">
            <CardStack items={dummyCards} offset={12} scaleFactor={0.06} />
          </div>
        </div>
      </section>

      {/* SECTION 3 : RÉSEAU MONDIAL (GLOBE) */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-white dark:bg-[#050505]">
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
                color: destinations[index].color,
              },
            ]}
          />
        </div>
        {/* Gradients de fondu adaptés au mode sombre/clair */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-[#050505] dark:via-transparent dark:to-[#050505] pointer-events-none transition-colors duration-500" />

        <div className="relative z-20 h-full flex flex-col items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={destinations[index].label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.6, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <span className={UI_THEME.machineLabel}>
                Transmission en cours...
              </span>
              <h2
                className={cn(
                  "text-3xl md:text-7xl mt-4",
                  UI_THEME.techBold,
                  UI_THEME.steelGradient
                )}
              >
                {destinations[index].label}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-16 text-center bg-zinc-50 dark:bg-[#050505] border-t border-zinc-200 dark:border-white/5">
        <p className={UI_THEME.machineLabel}>
          Architecture data driven // 2026
        </p>
      </footer>

      <ScrollToTop />
    </div>
  );
}
