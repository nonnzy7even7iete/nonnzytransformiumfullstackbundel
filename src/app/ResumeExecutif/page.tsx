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

// Import dynamique du World pour Three.js
const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center font-mono text-xs text-emerald-500">
        BOOTING_SYSTEM...
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

  // --- LOGIQUE DYNAMIQUE : LE CŒUR DU FICHIER ---
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % destinations.length);
    }, 5000); // Change de destination toutes les 5 secondes
    return () => clearInterval(interval);
  }, [destinations.length]);

  if (!mounted) return null;

  const currentDest = destinations[index];

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-950 dark:text-zinc-50 transition-colors duration-500 selection:bg-emerald-500/30">
      <NavbarFront />

      {/* SECTION 1 : HERO */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center border-b border-zinc-200 dark:border-white/5 overflow-hidden">
        <WarpBackground
          className="opacity-100"
          gridColor="rgba(16, 185, 129, 0.1)"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center px-6"
          >
            <div className="mb-8 flex justify-center">
              <LogicBadge text="Node_01 // Operational" />
            </div>
            <h1 className={cn("text-7xl md:text-[10rem]", UI_THEME.techBold)}>
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

      {/* SECTION 2 : ANALYSE (CARDSTACK) */}
      <section className="relative z-20 py-32 px-6 bg-zinc-50 dark:bg-[#070707] border-b border-zinc-200 dark:border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
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
            <div className="h-1.5 w-20 bg-emerald-500" />
            <p className={cn("max-w-md", UI_THEME.narrative)}>
              Interconnexion sécurisée des nœuds mondiaux. Zéro latence,
              intégrité absolue.
            </p>
          </div>
          <div className="flex justify-center">
            <CardStack
              items={[
                {
                  id: 1,
                  name: "FLUX ALPHA",
                  designation: "LIVE",
                  content: "Analyse des signaux entrants.",
                },
                {
                  id: 2,
                  name: "FLUX BETA",
                  designation: "SYNC",
                  content: "Vérification de l'intégrité Hub.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* SECTION 3 : GLOBE DYNAMIQUE ET HUD */}
      <section className="relative h-[85vh] w-full bg-white dark:bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] opacity-30 pointer-events-none" />

        {/* Le Globe qui reçoit les datas dynamiques */}
        <div className="absolute inset-0 z-0 scale-110">
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

        {/* HUD UI DYNAMIQUE : Réagit au changement de destination */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDest.label}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-center"
            >
              <span className={UI_THEME.machineLabel}>
                Transmission en cours...
              </span>
              <h2
                className={cn(
                  "text-6xl md:text-[12rem] mt-2",
                  UI_THEME.techBold,
                  UI_THEME.steelGradient
                )}
              >
                {currentDest.label}
              </h2>
              <div className="mt-4 flex items-center justify-center gap-4 bg-zinc-950/5 dark:bg-white/5 backdrop-blur-md px-6 py-2 border border-zinc-200 dark:border-white/10">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-mono text-[10px] tracking-widest uppercase">
                  Sync_Active
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Coordonnées techniques fixes mais dynamiques en valeur */}
        <div className="absolute bottom-10 right-10 z-20 font-mono text-[9px] text-zinc-400 hidden md:block uppercase tracking-[0.2em] bg-white/50 dark:bg-black/20 p-2 backdrop-blur-sm">
          TARGET_COORD: {currentDest.lat.toFixed(2)}N /{" "}
          {currentDest.lng.toFixed(2)}E <br />
          SIGNAL_STRENGTH: 98.4%
        </div>
      </section>

      <footer className="py-20 border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#050505] text-center">
        <p className={UI_THEME.machineLabel}>Abidjan Data Center // 2026</p>
      </footer>
      <ScrollToTop />
    </div>
  );
}
