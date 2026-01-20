"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import NavbarFront from "@/components/NavbarFront";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen w-full bg-black flex items-center justify-center text-green-500 uppercase tracking-widest text-xs">
        Initialisation du Hub Abidjan...
      </div>
    ),
  }
);

export default function ResumeExecutifPage() {
  const [index, setIndex] = useState(0);

  // Coordonnées précises pour le départ d'Abidjan
  const ABIDJAN = { lat: 5.33, lng: -4.03 };

  const destinations = [
    { label: "USA", lat: 38.88, lng: -77.03, code: "NODE-DXB-US" },
    { label: "EUROPE", lat: 48.85, lng: 2.35, code: "NODE-LHR-EU" },
    { label: "BRÉSIL", lat: -23.55, lng: -46.63, code: "NODE-GRU-LATAM" },
    { label: "JAPON", lat: 35.67, lng: 139.65, code: "NODE-HND-ASIA" },
  ];

  // On passe à 6 secondes pour laisser le temps au globe de montrer le trajet
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % destinations.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [destinations.length]);

  const activeConnection = [
    {
      order: 1,
      startLat: ABIDJAN.lat,
      startLng: ABIDJAN.lng,
      endLat: destinations[index].lat,
      endLng: destinations[index].lng,
      arcAlt: 0.35, // Un peu plus haut pour bien voir la courbe sortir du globe
      color: "#22c55e",
    },
  ];

  return (
    <>
      <NavbarFront />
      <main className="relative min-h-screen bg-[#020408] text-white overflow-hidden flex flex-col items-center justify-center">
        {/* Le Globe en fond */}
        <div className="absolute inset-0 z-0">
          <World
            data={activeConnection}
            globeConfig={{
              globeColor: "#05070a",
              atmosphereColor: "#22c55e",
              polygonColor: "rgba(34, 197, 94, 0.15)",
              arcTime: 6000, // Synchronisé avec le timer (6s)
              arcLength: 0.4, // Effet "comète" qui suit la trajectoire
            }}
          />
        </div>

        {/* HUD UI - Design Business Tech */}
        <div className="relative z-10 flex flex-col items-center pointer-events-none w-full max-w-4xl px-6">
          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-8 px-4 py-1.5 bg-green-500/5 border border-green-500/20 rounded-full backdrop-blur-md">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
            <span className="text-[10px] text-green-500 font-bold tracking-[0.4em] uppercase">
              Ivory Coast Data-Driven Hub
            </span>
          </div>

          {/* Main Display */}
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-sm font-mono opacity-30 tracking-[0.5em] uppercase mb-2">
              Origin: Abidjan_Core
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={destinations[index].label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="flex flex-col items-center"
              >
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white">
                  {destinations[index].label}
                </h1>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5.5, ease: "linear" }}
                  className="h-[1px] bg-green-500/50 mt-4"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Stats */}
          <div className="absolute bottom-[-150px] flex flex-col items-center">
            <motion.p
              key={destinations[index].code}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="font-mono text-[10px] tracking-[0.8em] text-green-200 uppercase"
            >
              {destinations[index].code} // Pinging... OK
            </motion.p>
          </div>
        </div>
      </main>
    </>
  );
}
