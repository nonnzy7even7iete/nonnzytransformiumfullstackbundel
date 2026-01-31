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
  steelGradient:
    "bg-gradient-to-b from-zinc-950 to-zinc-600 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent",
  machineLabel:
    "font-mono text-[10px] uppercase tracking-[0.4em] text-emerald-600 dark:text-emerald-400 font-bold",
  narrative:
    "font-sans uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 text-[10px] leading-relaxed",
};

// Import dynamique sécurisé
const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

export default function ResumeExecutifPage() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const ABIDJAN = { lat: 5.33, lng: -4.03 };

  const destinations = useMemo(
    () => [
      { label: "SÉNÉGAL", lat: 14.49, lng: -14.45, color: "#10b981" },
      { label: "CENTRAFRIQUE", lat: 4.36, lng: 18.55, color: "#10b981" },
      { label: "NIGÉRIA", lat: 9.08, lng: 8.67, color: "#10b981" },
      { label: "MAROC", lat: 31.79, lng: -7.09, color: "#f97316" },
      { label: "CHINE", lat: 35.86, lng: 104.19, color: "#ef4444" },
      { label: "USA", lat: 37.09, lng: -95.71, color: "#3b82f6" },
      { label: "EUROPE", lat: 48.85, lng: 2.35, color: "#eab308" },
    ],
    []
  );

  const flowCards = [
    {
      id: 1,
      name: "FLUX ALPHA",
      designation: "LIVE",
      content: "Analyse des signaux entrants en temps réel via Node_01.",
    },
    {
      id: 2,
      name: "CORE_DATA",
      designation: "SYNC",
      content:
        "Intégrité des protocoles de coopération internationale vérifiée.",
    },
    {
      id: 3,
      name: "HUB_ABIDJAN",
      designation: "ACTIVE",
      content: "Point de sortie primaire vers les nœuds stratégiques mondiaux.",
    },
    {
      id: 4,
      name: "RESILIENCE",
      designation: "SECURE",
      content: "Architecture de protection des données à zéro latence.",
    },
  ];

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
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-950 dark:text-zinc-50 transition-colors duration-700">
      <NavbarFront />

      {/* SECTION 1 : HERO ÉPURÉE */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center border-b border-zinc-100 dark:border-white/5 overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] z-[1]" />
        <WarpBackground
          className="opacity-60"
          gridColor="rgba(0, 0, 0, 0.05)"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
        >
          <div className="mb-10">
            <LogicBadge text="Node_01 // Stable" />
          </div>
          <h1
            className={cn(
              "text-6xl md:text-8xl tracking-tighter",
              UI_THEME.techBold
            )}
          >
            <span className="text-zinc-900 dark:text-white uppercase">
              Nonnzytr
            </span>
            <br />
            <span className="text-zinc-400 font-light italic text-4xl md:text-5xl tracking-widest">
              OPERATIONS
            </span>
          </h1>
          <div className="mt-16 space-y-4">
            <p className={UI_THEME.narrative}>
              SYSTÈME DE RÉSILIENCE DÉCISIONNELLE
            </p>
            <WordRotate
              className="text-sm font-mono text-emerald-600 dark:text-emerald-400 tracking-[0.2em]"
              words={[
                "FLUX ANALYTIQUES",
                "DONNÉES SÉCURISÉES",
                "VÉLOCITÉ MAXIMALE",
              ]}
            />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2 : ANALYSE (4 CARTES) */}
      <section className="relative z-20 py-32 px-6 bg-zinc-50/50 dark:bg-[#070707] border-b border-zinc-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <span className={UI_THEME.machineLabel}>02 // Stream_Analysis</span>
            <h2
              className={cn(
                "text-4xl md:text-5xl uppercase",
                UI_THEME.techBold
              )}
            >
              Analyse des Flux
            </h2>
            <p className={cn("max-w-sm opacity-70", UI_THEME.narrative)}>
              Interconnexion sécurisée des nœuds mondiaux.
            </p>
          </div>
          <div className="flex justify-center h-[350px] items-center">
            <CardStack items={flowCards} offset={12} scaleFactor={0.06} />
          </div>
        </div>
      </section>

      {/* SECTION 3 : GLOBE ET SIGNAL INTERNATIONAL */}
      <section className="relative h-[90vh] w-full bg-white dark:bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

        <div className="absolute inset-0 z-0 scale-105">
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="text-center px-4"
            >
              <span className={UI_THEME.machineLabel}>Remote_Node</span>
              <h2
                className={cn(
                  "text-6xl md:text-[10rem] mt-2",
                  UI_THEME.techBold,
                  UI_THEME.steelGradient
                )}
              >
                {currentDest.label}
              </h2>

              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-3 bg-white/50 dark:bg-white/5 backdrop-blur-md px-5 py-2 border border-zinc-200 dark:border-white/10 rounded-full">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-emerald-600 font-bold">
                    Signal Actif
                  </span>
                </div>

                <p className="max-w-md font-mono text-[9px] leading-loose tracking-[0.15em] text-zinc-400 uppercase">
                  Signal de prédisposition à la coopération internationale{" "}
                  <br /> en provenance d'Abidjan
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-20 border-t border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-[#050505] text-center">
        <p className={UI_THEME.machineLabel}>Abidjan Data Center // 2026</p>
      </footer>
      <ScrollToTop />
    </div>
  );
}
