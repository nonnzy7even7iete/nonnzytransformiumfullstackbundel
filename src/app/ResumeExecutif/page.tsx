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

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % destinations.length),
      ROTATION_DURATION
    );
    return () => clearInterval(interval);
  }, [destinations.length]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-950 dark:text-zinc-50">
      <NavbarFront />
      <section className="relative h-[80vh] flex flex-col items-center justify-center border-b border-zinc-100 dark:border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6 w-full max-w-5xl"
        >
          <div className="mb-10">
            <LogicBadge text="Node_01 // Stable" />
          </div>
          <h1
            className={cn(
              "text-6xl md:text-8xl tracking-tighter uppercase",
              UI_THEME.techBold
            )}
          >
            <span className="text-zinc-900 dark:text-white">Nonnzytr</span>
            <br />
            <span className="text-zinc-600 font-light italic text-2xl md:text-4xl tracking-widest block mt-4">
              Ivory coast global networking
            </span>
          </h1>
          <div className="mt-16 space-y-8 w-full">
            <p className={UI_THEME.narrative}>
              Nous opérons là où la décision devient instable.
            </p>
            <WordRotate
              duration={ROTATION_DURATION}
              className="text-sm md:text-base font-mono text-emerald-600 dark:text-emerald-400 tracking-[0.1em] leading-relaxed max-w-3xl mx-auto"
              words={[
                "Lorsque vous commencez à sentir votre investissement menacé par l'intuition, la Côte d'Ivoire réduit votre charge mentale par vectoring à la transparence quant à la valeur attendue.",
                "Décider n'est plus un pari. C'est un transfert de charge entre scénarios.",
                "Nous mesurons pour chaque nœud : le risque, le potentiel, le coût d'erreur et la valeur espérée.",
                "Une architecture de décision transformée en vecteurs de certitude via l'analyse de données.",
              ]}
            />
          </div>
        </motion.div>
      </section>

      {/* ... Le reste de tes sections (Analyse, Globe, Footer) reste identique à ta structure Axiome immuable ... */}

      <ScrollToTop />
    </div>
  );
}
