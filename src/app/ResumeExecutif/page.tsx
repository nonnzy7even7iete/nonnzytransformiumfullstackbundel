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
  // Gradient UNIQUE pour l'action
  orangeGreenGradient:
    "bg-[linear-gradient(135deg,#f97316_0%,#22c55e_100%)] bg-clip-text text-transparent",
  // Gradient Gris Acier optimisé (plus de blanc en haut pour la brillance)
  steelGradient:
    "bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent",
  machineLabel:
    "font-mono-tech uppercase tracking-[0.25em] text-[10px] text-zinc-500",
  narrative:
    "font-sans uppercase tracking-widest text-zinc-400 font-normal text-xs md:text-sm",
};

const LOG_CARDS_DATA = [
  {
    id: 0,
    name: "MOTEUR_CENTRAL",
    designation: "NŒUD : ABIDJAN",
    content: (
      <p className="text-[10px] uppercase tracking-widest">
        Traitement des flux critiques en temps réel.
      </p>
    ),
  },
  {
    id: 1,
    name: "MAILLAGE_SÉCURITÉ",
    designation: "PROTECTION : ACTIVE",
    content: (
      <p className="text-[10px] uppercase tracking-widest">
        Protocoles de chiffrement haute performance.
      </p>
    ),
  },
];

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#050505]" />,
  }
);

export default function ResumeExecutifPage() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const ABIDJAN = { lat: 5.33, lng: -4.03 };

  const destinations = useMemo(
    () => [
      { label: "AMÉRIQUE DU NORD", lat: 39.82, lng: -98.57 },
      { label: "NŒUDS EUROPÉENS", lat: 50.11, lng: 14.42 },
      { label: "HUB ABIDJAN", lat: 5.33, lng: -4.03 },
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
    <div className="flex flex-col min-h-screen bg-[#050505] text-zinc-50 transition-colors duration-500">
      <NavbarFront />

      {/* --- SECTION 1 : ACCUEIL --- */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center pt-24 overflow-hidden border-b border-white/5 bg-[#050505]">
        <WarpBackground
          className="w-full h-full opacity-60"
          gridColor="rgba(34, 197, 94, 0.1)"
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

      {/* --- SECTION 2 : ANALYSE DES FLUX --- */}
      <section className="relative z-30 w-full py-24 px-6 bg-[#050505]">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <span className={UI_THEME.machineLabel}>Nœud d'infrastructure</span>
            <h2 className={cn("text-3xl md:text-5xl", UI_THEME.techBold)}>
              <span className={UI_THEME.steelGradient}>Analyse des Flux</span>
            </h2>
            <p
              className={cn(
                "max-w-md border-l border-zinc-700 pl-6 py-2",
                UI_THEME.narrative
              )}
            >
              Surveillance stratégique des signaux critiques sur le réseau
              national.
            </p>
          </div>
          <div className="flex justify-center md:justify-end min-h-[400px]">
            <CardStack items={LOG_CARDS_DATA} offset={12} scaleFactor={0.06} />
          </div>
        </div>
      </section>

      {/* --- SECTION 3 : RÉSEAU --- */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-[#050505]">
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

        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-80 pointer-events-none" />

        <div className="relative z-20 h-full flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.h2
              key={destinations[index].label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.5, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={cn(
                "text-3xl md:text-7xl",
                UI_THEME.techBold,
                UI_THEME.steelGradient
              )}
            >
              {destinations[index].label}
            </motion.h2>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-16 text-center bg-black border-t border-white/5">
        <p className={UI_THEME.machineLabel}>
          Architecture Numérique Côte d'Ivoire // 2026
        </p>
      </footer>

      <ScrollToTop />
    </div>
  );
}
