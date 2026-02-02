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
      ROTATION_DURATION
    );
    return () => clearInterval(interval);
  }, [destinations.length]);

  if (!mounted) return null;
  const currentDest = destinations[index];

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-950 dark:text-zinc-50 transition-colors duration-700">
      <NavbarFront />

      {/* SECTION 1 : LAMP (Cycle 7s On / 7s Off pour le flux lumineux uniquement) */}
      <section className="relative z-30 h-screen overflow-hidden pt-20">
        {/* On anime l'opacité du LampContainer lui-même pour faire disparaître la lumière */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 14, // Cycle complet de 14s (7s visible, 7s invisible)
            times: [0, 0.1, 0.5, 0.6], // Apparaît vite (0.1), reste (0.5), disparaît (0.6)
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 z-0"
        >
          <LampContainer>
            <div className="h-full w-full" />
          </LampContainer>
        </motion.div>

        {/* Le texte reste fixe au-dessus du LampContainer grâce au z-index */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="mb-8">
              <LogicBadge text="Nonnzytransformium" />
            </div>
            <h1
              className={cn(
                "bg-gradient-to-br from-slate-100 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl italic",
                UI_THEME.techBold
              )}
            >
              ZY FONCE <br />
              <span className="text-lg md:text-xl font-light tracking-[0.2em] text-emerald-400 block mt-4 normal-case not-italic">
                "L'intuition est un luxe que nous avons remplacé par la
                certitude."
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* RESTE DU FICHIER : Structure strictement préservée */}
      <section className="relative py-24 flex flex-col items-center justify-center border-b border-zinc-100 dark:border-white/5 overflow-hidden">
        {/* ... Hero Texte ... */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6 max-w-5xl w-full"
        >
          <div className="mt-8 space-y-6">
            <p className={UI_THEME.narrative}>
              Nous opérons là où la décision devient instable.
            </p>
            <WordRotate
              duration={ROTATION_DURATION}
              className="text-sm md:text-base font-mono text-emerald-600 dark:text-emerald-400 tracking-[0.1em] leading-relaxed text-center block"
              words={[
                "Lorsque vous commencez à sentir votre investissement menacé par l'intuition, la Côte d'Ivoire réduit votre charge mentale de par le vectoring à la transparence quant à la valeur attendue.",
                "Décider n'est plus un pari. C'est un transfert de charge entre scénarios.",
                "Nous mesurons pour vous : le risque, le potentiel, le coût d'erreur et la valeur espérée.",
                "Une architecture de décision transformée en vecteurs a la certitude via l'analyse de données stratégiques.",
              ]}
            />
          </div>
        </motion.div>
      </section>

      {/* SECTIONS SUIVANTES (Analyse & Globe) : Strictement préservées */}
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
                  "text-6xl md:text-[10rem] mt-2 transition-all",
                  UI_THEME.techBold,
                  UI_THEME.steelGradient
                )}
              >
                {currentDest.label}
              </h2>
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-3 bg-white/60 dark:bg-white/5 backdrop-blur-md px-5 py-2 border border-zinc-200 dark:border-white/10 rounded-full">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#10b981] animate-ping" />
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#10b981] font-bold">
                    Signal Actif
                  </span>
                </div>
                <p className="max-w-md font-mono text-[9px] leading-loose tracking-[0.15em] text-zinc-500 dark:text-zinc-400 uppercase">
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
