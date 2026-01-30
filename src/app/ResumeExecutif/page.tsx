"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Brain } from "lucide-react";

// Components
import NavbarFront from "@/components/frontendkit/NavbarFront";
import { CardStack } from "@/components/frontendkit/CardStack";
import { ScrollToTop } from "@/components/frontendkit/ScrollToTop";
import { WarpBackground } from "@/components/frontendkit/WarpBackground";
import { WordRotate } from "@/components/frontendkit/word-rotate";
import { AnimatedGradientText } from "@/components/frontendkit/animated-gradient-text";
import { cn } from "@/lib/utils";

const UI_THEME = {
  techBold: "font-oswald font-black uppercase tracking-tighter leading-none",
  machineLabel:
    "font-mono-tech uppercase tracking-[0.4em] text-[10px] opacity-70",
  narrative:
    "font-sans text-slate-500 dark:text-zinc-400 font-medium tracking-tight",
};

const HERO_CONTENT = {
  label: "Decision Resilience Protocol // v2.0.26",
  title: "NONNZYTR",
  titleSuffix: "OPERATE",
  intro: "Là où la décision devient instable,",
  rotatingWords: [
    "SIGNAUX CONTRADICTOIRES",
    "DONNÉES INCOMPLÈTES",
    "INTUITION DANGEREUSE",
  ],
  footerPrefix: "Zy introduis une",
  footerHighlight: "LOGIQUE MESURABLE",
};

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-white dark:bg-[#020408]" />
    ),
  }
);

export default function ResumeExecutifPage() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const ABIDJAN = { lat: 5.33, lng: -4.03 };
  const destinations = useMemo(
    () => [
      { label: "AMÉRIQUE DU NORD", lat: 39.82, lng: -98.57 },
      { label: "EUROPE", lat: 50.11, lng: 14.42 },
      { label: "ASIE", lat: 43.67, lng: 87.33 },
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
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020408] selection:bg-green-500/30 font-sans">
      <NavbarFront />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[95vh] flex flex-col items-center pt-32 pb-20 overflow-hidden border-b border-black/5 dark:border-white/5">
        <WarpBackground
          className="w-full h-full"
          gridColor="rgba(34, 197, 94, 0.15)"
        >
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full space-y-16"
            >
              <div className="space-y-6">
                <span className={UI_THEME.machineLabel}>
                  {HERO_CONTENT.label}
                </span>
                <h1 className={cn("text-7xl md:text-9xl", UI_THEME.techBold)}>
                  {HERO_CONTENT.title}{" "}
                  <span className="text-green-500">
                    {HERO_CONTENT.titleSuffix}
                  </span>
                </h1>
              </div>

              <div className="flex flex-col items-center gap-4">
                <p
                  className={cn(
                    "text-lg md:text-xl italic",
                    UI_THEME.narrative
                  )}
                >
                  {HERO_CONTENT.intro}
                </p>
                <div className="h-24 flex items-center justify-center">
                  <WordRotate
                    className={cn(
                      "text-4xl md:text-7xl bg-gradient-to-r from-[#f97316] to-[#22c55e] bg-clip-text text-transparent",
                      UI_THEME.techBold
                    )}
                    words={HERO_CONTENT.rotatingWords}
                  />
                </div>
              </div>

              {/* BADGE LOGIQUE OPTIMISÉ */}
              <div className="pt-10 flex flex-col items-center gap-6">
                <p className={cn("text-xl opacity-60", UI_THEME.techBold)}>
                  {HERO_CONTENT.footerPrefix}
                </p>

                <div className="group relative flex items-center justify-center rounded-full px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden">
                  <span
                    className="absolute inset-0 block h-full w-full p-[2px]"
                    style={{
                      background:
                        "linear-gradient(90deg, #f97316 0%, #22c55e 50%, #f97316 100%)",
                      backgroundSize: "200% 100%",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "destination-out",
                      maskComposite: "subtract",
                      animation: "logic-gradient 3s linear infinite",
                    }}
                  />

                  <Brain className="size-7 mr-3 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                  <hr className="mx-3 h-6 w-px bg-white/20" />

                  <AnimatedGradientText
                    className={cn("text-2xl md:text-4xl", UI_THEME.techBold)}
                  >
                    {HERO_CONTENT.footerHighlight}
                  </AnimatedGradientText>

                  <ChevronRight className="ml-3 size-6 text-neutral-500 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          </div>
        </WarpBackground>

        <style jsx global>{`
          @keyframes logic-gradient {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 200% 50%;
            }
          }
        `}</style>
      </section>

      {/* --- GLOBE SECTION --- */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <World
            data={[
              {
                order: 1,
                startLat: ABIDJAN.lat,
                startLng: ABIDJAN.lng,
                endLat: destinations[index].lat,
                endLng: destinations[index].lng,
                arcAlt: 0.4,
                color: "#22c55e",
              },
            ]}
          />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.h2
              key={destinations[index].label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn("text-5xl md:text-8xl", UI_THEME.techBold)}
            >
              {destinations[index].label}
            </motion.h2>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-12 text-center opacity-40">
        <p className={UI_THEME.machineLabel}>IVORY COAST ARCHITECTURE © 2026</p>
      </footer>
      <ScrollToTop />
    </div>
  );
}
