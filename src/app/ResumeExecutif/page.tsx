"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { CardStack } from "@/components/frontendkit/CardStack";
import { WordRotate } from "@/components/frontendkit/word-rotate";
import { cn } from "@/lib/utils";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

export default function ResumeExecutifPage() {
  const [index, setIndex] = useState(0);
  const destinations = useMemo(
    () => [
      { label: "SÉNÉGAL", lat: 14.49, lng: -14.45, color: "#10b981" },
      { label: "EUROPE", lat: 48.85, lng: 2.35, color: "#eab308" },
    ],
    []
  );

  useEffect(() => {
    const int = setInterval(
      () => setIndex((p) => (p + 1) % destinations.length),
      5000
    );
    return () => clearInterval(int);
  }, [destinations.length]);

  return (
    <div className="bg-white dark:bg-[#050505] transition-colors duration-700 min-h-screen">
      {/* SECTION 1 : HERO */}
      <section className="h-[70vh] flex flex-col items-center justify-center px-6">
        <h1 className="text-7xl md:text-[8rem] font-bold text-zinc-900 dark:text-white tracking-tighter text-center">
          NONNZYTR <span className="text-emerald-500">OPÈRE</span>
        </h1>
      </section>

      {/* SECTION 2 : CARDS (RÉINTÉGRÉES) */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/10 border-y border-zinc-200 dark:border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold uppercase tracking-tighter">
              Analyse des flux
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-mono text-sm uppercase tracking-widest">
              Node_02 // Abidjan_Hub
            </p>
          </div>
          <div className="flex justify-center">
            <CardStack
              items={[
                {
                  id: 1,
                  name: "ALPHA",
                  designation: "LIVE",
                  content: "Flux de données stable.",
                },
                {
                  id: 2,
                  name: "BETA",
                  designation: "SYNC",
                  content: "Synchronisation globale active.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* SECTION 3 : GLOBE (LA RÉUSSITE) */}
      <section className="relative h-[80vh] w-full bg-transparent overflow-hidden">
        <div className="absolute inset-0 z-0">
          <World
            data={[
              {
                startLat: 5.33,
                startLng: -4.03,
                endLat: destinations[index].lat,
                endLng: destinations[index].lng,
                color: destinations[index].color,
              },
            ]}
          />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.h2
              key={destinations[index].label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="text-8xl md:text-[14rem] font-bold uppercase text-zinc-900/10 dark:text-white/5"
            >
              {destinations[index].label}
            </motion.h2>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
