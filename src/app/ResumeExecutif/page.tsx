"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

import NavbarFront from "@/components/frontendkit/NavbarFront";
import { CardStack } from "@/components/frontendkit/CardStack";
import { ScrollToTop } from "@/components/frontendkit/ScrollToTop";
import { LogicBadge } from "@/components/frontendkit/LogicBadge";
import { WordRotate } from "@/components/frontendkit/word-rotate";
import { cn } from "@/lib/utils";
import { LampContainer } from "@/components/ui/lamp";

const UI_THEME = {
  techBold: "font-oswald font-bold tracking-tight leading-[0.95]",
  steelGradient:
    "bg-gradient-to-b from-zinc-950 to-zinc-600 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent",
  machineLabel:
    "font-mono text-[10px] uppercase tracking-[0.4em] text-emerald-600 dark:text-emerald-400 font-bold",
  narrative:
    "font-sans uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 text-[10px] leading-relaxed",
};

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

export default function ResumeExecutifPage() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const ABIDJAN = { lat: 5.33, lng: -4.03 };
  const ROTATION_DURATION = 15000;

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
      content: "Analyse des signaux entrants en temps réel.",
    },
    {
      id: 2,
      name: "CORE_DATA",
      designation: "SYNC",
      content: "Intégrité des protocoles de coopération.",
    },
    {
      id: 3,
      name: "HUB_ABIDJAN",
      designation: "ACTIVE",
      content: "Point de sortie primaire mondial.",
    },
    {
      id: 4,
      name: "RESILIENCE",
      designation: "SECURE",
      content: "Architecture de protection à zéro latence.",
    },
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % destinations.length),
      ROTATION_DURATION
    );
    return () => clearInterval(interval);
  }, [destinations.length]);

  if (!mounted) return null;
  const currentDest = destinations[index];

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-950 dark:text-zinc-50 transition-colors duration-700">
      <NavbarFront />

      {/* SECTION 1 : LAMP & ALGORITHMIC_SOVEREIGNTY */}
      <section className="relative z-30 h-screen overflow-hidden -mt-24 md:-mt-32">
        <motion.div
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 14,
            times: [0, 0.1, 0.5, 0.6],
            repeat: Infinity,
          }}
          className="absolute inset-0 z-0"
        >
          <LampContainer>
            <div className="h-full w-full" />
          </LampContainer>
        </motion.div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center pt-20 px-6 md:px-24 text-center">
          <div className="mb-8">
            <LogicBadge text="Nonnzytransformium" />
          </div>
          <h1
            className={cn(
              "text-3xl md:text-7xl italic leading-none bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent",
              UI_THEME.techBold
            )}
          >
            ALGORITHMIC_SOVEREIGNTY
          </h1>
          <p className="mt-6 text-sm md:text-xl font-light tracking-[0.2em] text-emerald-400 max-w-2xl border-t border-emerald-500/20 pt-6">
            "L'intuition est un luxe que nous avons remplacé par la certitude."
          </p>
        </div>
      </section>

      {/* SECTION 2 : DATA-DRIVEN (Zéro Redondance) */}
      <section className="relative py-32 flex flex-col items-center justify-center border-y border-zinc-100 dark:border-white/5 bg-zinc-50/30 dark:bg-transparent">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [bg-size:20px_20px]" />

        <div className="relative z-10 w-full max-w-5xl px-8 md:px-20 text-center">
          <h2
            className={cn("text-5xl md:text-[6rem] mb-12", UI_THEME.techBold)}
          >
            <span className="text-zinc-950 dark:text-white">Data-Driven</span>
            <br />
            <span className="text-zinc-500 text-lg md:text-2xl font-light tracking-[0.3em] uppercase block mt-4 italic">
              Ivory Coast Global Networking
            </span>
          </h2>

          <div className="space-y-10 mt-16 max-w-3xl mx-auto">
            <p className={UI_THEME.narrative}>
              Opérations en zone de haute instabilité décisionnelle
            </p>
            <div className="py-8 px-6 md:px-12 bg-white/5 backdrop-blur-sm border border-zinc-200 dark:border-white/5 rounded-sm">
              <WordRotate
                duration={ROTATION_DURATION}
                className="text-sm md:text-base font-mono text-emerald-600 dark:text-emerald-400 tracking-wide"
                words={[
                  "Optimisation de la charge mentale par vectorisation de l'investissement.",
                  "Décider n'est plus un pari. C'est un transfert de charge scénaristique.",
                  "Mesure quantitative : Risque, Potentiel et Valeur Espérée.",
                  "Architecture décisionnelle certifiée par analyse de flux stratégiques.",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 : ANALYSE (Structure Préservée) */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-4">
            <span className={UI_THEME.machineLabel}>02 // Stream_Analysis</span>
            <h3 className={cn("text-4xl md:text-5xl", UI_THEME.techBold)}>
              ANALYSE DES FLUX
            </h3>
            <p className={cn("opacity-60", UI_THEME.narrative)}>
              Interconnexion sécurisée des nœuds mondiaux.
            </p>
          </div>
          <div className="flex justify-center h-[300px]">
            <CardStack items={flowCards} offset={10} scaleFactor={0.05} />
          </div>
        </div>
      </section>

      {/* SECTION 4 : GLOBE (Structure Préservée) */}
      <section className="relative h-[80vh] w-full overflow-hidden border-t border-white/5">
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
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDest.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
            >
              <span className={UI_THEME.machineLabel}>Remote_Node_Active</span>
              <h2
                className={cn(
                  "text-6xl md:text-[9rem]",
                  UI_THEME.techBold,
                  UI_THEME.steelGradient
                )}
              >
                {currentDest.label}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center bg-[#050505]">
        <p className={UI_THEME.machineLabel}>Abidjan Data Center // 2026</p>
      </footer>
      <ScrollToTop />
    </div>
  );
}
