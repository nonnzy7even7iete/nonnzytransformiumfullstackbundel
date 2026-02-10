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

// COMPOSANT DE REVELATION (Flou réactif au scroll)
const BlurReveal = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <NavbarFront />

      {/* SECTION 1 : LAMP */}
      <section className="relative z-30 h-screen overflow-hidden -mt-24 md:-mt-32">
        <div className="absolute inset-0 z-0">
          <LampContainer>
            <div className="h-full w-full" />
          </LampContainer>
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center pt-20 px-10 md:px-32">
          <BlurReveal className="flex flex-col items-center text-center">
            <div className="mb-10">
              <LogicBadge text="Nonnzytransformium" />
            </div>
            <h1
              className={cn(
                "bg-gradient-to-br from-foreground to-foreground/40 py-4 bg-clip-text text-3xl md:text-7xl italic",
                UI_THEME.techBold
              )}
            >
              ALGORITHMIC_SOVEREIGNTY <br />
              <span className="text-sm md:text-xl font-light tracking-[0.2em] text-emerald-500 block mt-4 normal-case not-italic px-6 pt-6 border-t border-emerald-500/10">
                "L'intuition est un luxe que nous avons remplacé par la
                certitude."
              </span>
            </h1>
          </BlurReveal>
        </div>
      </section>

      {/* SECTION 2 : DATA-DRIVEN */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden">
        <BlurReveal className="relative z-10 text-center px-6 max-w-5xl w-full">
          <h1
            className={cn(
              "text-6xl md:text-8xl tracking-tighter uppercase text-foreground",
              UI_THEME.techBold
            )}
          >
            <span>Data-Driven</span>
            <br />
            <span className="text-foreground/40 font-light italic text-2xl md:text-4xl tracking-widest block mt-4 uppercase">
              Ivory coast global networking
            </span>
          </h1>
          <div className="mt-16 space-y-6">
            <p className={UI_THEME.narrative}>
              Nous opérons là où la décision devient instable.
            </p>
            <WordRotate
              duration={ROTATION_DURATION}
              className="text-sm md:text-base font-mono text-emerald-600 dark:text-emerald-400 tracking-[0.1em] leading-relaxed text-center block"
              words={[
                "Lorsque vous commencez à sentir votre investissement menacé par l'intuition, la Côte d'Ivoire réduit votre charge mentale.",
                "Décider n'est plus un pari. C'est un transfert de charge entre axes de Probabilité.",
                "Nous mesurons pour vous : le risque, le potentiel, le coût d'erreur et la valeur espérée.",
                "Une architecture de décision transformée en vecteurs de certitude via l'analyse stratégique.",
              ]}
            />
          </div>
        </BlurReveal>
      </section>

      {/* SECTION 3 : ANALYSE */}
      <section className="relative z-20 py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <BlurReveal className="space-y-6">
            <span className={UI_THEME.machineLabel}>02 // Stream_Analysis</span>
            <h2
              className={cn(
                "text-4xl md:text-5xl uppercase text-foreground",
                UI_THEME.techBold
              )}
            >
              Analyse des Flux
            </h2>
            <p
              className={cn(
                "max-w-sm opacity-70 text-foreground/60",
                UI_THEME.narrative
              )}
            >
              Interconnexion sécurisée des nœuds mondiaux.
            </p>
          </BlurReveal>
          <BlurReveal className="flex justify-center h-[350px] items-center">
            <CardStack items={flowCards} offset={12} scaleFactor={0.06} />
          </BlurReveal>
        </div>
      </section>

      {/* SECTION 4 : GLOBE */}
      <section className="relative h-[90vh] w-full overflow-hidden">
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
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
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

              <div className="mt-8 flex flex-col items-center gap-4 pointer-events-auto">
                <div className="flex items-center gap-3 bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/40 px-5 py-2 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-emerald-400 font-bold">
                    Signal Actif
                  </span>
                </div>
                <p className="max-w-md font-mono text-[9px] leading-loose tracking-[0.15em] text-foreground/50 uppercase">
                  Signal de prédisposition à la coopération internationale{" "}
                  <br /> en provenance d'Abidjan
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-20 border-t border-[var(--border-color)]/20 text-center">
        <p className={UI_THEME.machineLabel}>Abidjan Data Center // 2026</p>
      </footer>
      <ScrollToTop />
    </div>
  );
}
