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
  techBold: "font-oswald font-black tracking-tighter leading-[0.85]",
  orangeGreenGradient:
    "bg-gradient-to-r from-[#ff5f00] to-[#00ff62] bg-clip-text text-transparent",
  machineLabel:
    "font-mono text-[11px] uppercase tracking-[0.4em] text-[#00ff62] font-bold",
};

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black" />,
  }
);

export default function ResumeExecutifPage() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const ABIDJAN = { lat: 5.33, lng: -4.03 };

  const destinations = useMemo(
    () => [
      { label: "SÉNÉGAL", lat: 14.49, lng: -14.45, color: "#00ff62" },
      { label: "NIGÉRIA", lat: 9.08, lng: 8.67, color: "#00ff62" },
      { label: "MAROC", lat: 31.79, lng: -7.09, color: "#ff5f00" },
      { label: "CHINE", lat: 35.86, lng: 104.19, color: "#ff0000" },
      { label: "USA", lat: 37.09, lng: -95.71, color: "#0084ff" },
      { label: "EUROPE", lat: 48.85, lng: 2.35, color: "#ffd000" },
    ],
    []
  );

  // Correction : Formatage strict pour le composant CardStack local
  const dummyCards = useMemo(
    () => [
      {
        id: 1,
        name: "CORE_01",
        designation: "ACTIVE",
        content: (
          <span className="font-bold">
            FLUX DE DONNÉES HAUTE INTENSITÉ. ZÉRO LATENCE.
          </span>
        ),
      },
      {
        id: 2,
        name: "CORE_02",
        designation: "STABLE",
        content: (
          <span className="font-bold">
            ARCHITECTURE BRUTALISTE SANS COMPROMIS VISUEL.
          </span>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    setMounted(true);
    const intervalId = setInterval(() => {
      setIndex((prev) => (prev + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [destinations.length]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white overflow-x-hidden">
      <NavbarFront />

      {/* --- SECTION 1 : HERO ULTRA-VIF --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-20 border-b-4 border-[#00ff62]">
        <div className="absolute inset-0 z-0 opacity-40">
          <WarpBackground gridColor="#00ff62" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          <div className="bg-[#00ff62] text-black px-4 py-1 mb-6 font-black text-sm tracking-[0.3em]">
            SYSTEM_STATUS: OPERATIONAL
          </div>

          <h1
            className={cn(
              "text-[15vw] md:text-[12rem] uppercase",
              UI_THEME.techBold
            )}
          >
            <span className="text-black dark:text-white">NONNZYTR</span>
            <br />
            <span className={UI_THEME.orangeGreenGradient}>OPÈRE</span>
          </h1>

          <div className="mt-12 flex flex-col items-center gap-6">
            <WordRotate
              className="text-3xl md:text-6xl font-black text-[#00ff62] italic"
              words={["LIVE_STREAM", "SHARP_DATA", "PURE_LOGIC"]}
            />
            <div className="scale-150 mt-4">
              <LogicBadge text="DIRECT_ACCESS" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- SECTION 2 : ANALYSE (BRUT) --- */}
      <section className="relative w-full py-24 px-6 grid grid-cols-1 md:grid-cols-2 gap-0 border-b-4 border-[#ff5f00]">
        <div className="p-12 bg-[#00ff62] text-black flex flex-col justify-center">
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] mb-6">
            ANALYSE
            <br />
            DES FLUX
          </h2>
          <p className="text-xl font-black border-t-4 border-black pt-4">
            INTERCONNEXION BRUTE. ZÉRO FILTRE. ZÉRO BRUME.
          </p>
        </div>
        <div className="bg-black dark:bg-zinc-900 flex items-center justify-center p-12 min-h-[450px]">
          <CardStack items={dummyCards} offset={15} scaleFactor={0.08} />
        </div>
      </section>

      {/* --- SECTION 3 : GLOBE (PURETÉ TOTALE) --- */}
      <section className="relative h-screen w-full bg-black overflow-hidden">
        {/* Le Globe : Aucune brume, aucune couche de gradient par-dessus */}
        <div className="absolute inset-0">
          <World
            data={[
              {
                order: 1,
                startLat: ABIDJAN.lat,
                startLng: ABIDJAN.lng,
                endLat: destinations[index].lat,
                endLng: destinations[index].lng,
                arcAlt: 0.5,
                color: destinations[index].color,
              },
            ]}
          />
        </div>

        {/* HUD UI ULTRA-VIF & TRANCHANT */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-between py-24 pointer-events-none">
          <div className={UI_THEME.machineLabel}>
            GLOBAL_NETWORK_ESTABLISHED
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={destinations[index].label}
              initial={{ opacity: 0, x: -100, rotate: -5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: 100, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="text-center"
            >
              <h2 className="text-7xl md:text-[13rem] font-black text-white leading-none tracking-tighter">
                {destinations[index].label}
              </h2>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-4">
            <div className="w-4 h-4 bg-[#ff5f00] animate-ping" />
            <div className="w-4 h-4 bg-[#00ff62] animate-ping delay-100" />
            <div className="w-4 h-4 bg-[#0084ff] animate-ping delay-200" />
          </div>
        </div>

        {/* Cadre de viseur technique pour renforcer le côté vif */}
        <div className="absolute inset-10 border-2 border-white/10 pointer-events-none z-10" />
        <div className="absolute top-10 left-10 w-20 h-20 border-t-4 border-l-4 border-[#00ff62] z-30" />
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b-4 border-r-4 border-[#ff5f00] z-30" />
      </section>

      <footer className="bg-black text-[#00ff62] p-8 flex flex-col md:flex-row justify-between items-center font-black border-t-4 border-[#00ff62]">
        <span className="text-2xl italic tracking-tighter">
          NONNZYTR // ARCHITECTURE 2026
        </span>
        <span className="text-sm tracking-[0.5em]">ABIDJAN_CORE_UNIT</span>
      </footer>

      <ScrollToTop />
    </div>
  );
}
