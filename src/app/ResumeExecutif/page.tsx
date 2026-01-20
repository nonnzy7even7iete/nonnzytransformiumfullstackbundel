"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion"; // Pour les animations fluides
import NavbarFront from "@/components/NavbarFront";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen w-full bg-black flex items-center justify-center text-green-500 uppercase tracking-widest text-xs">
        Connexion Côte d'Ivoire...
      </div>
    ),
  }
);

export default function ResumeExecutifPage() {
  const [index, setIndex] = useState(0);

  const destinations = [
    { label: "USA", lat: 37.09, lng: -95.71, code: "US-NET-01" },
    { label: "EUROPE", lat: 48.85, lng: 2.35, code: "EU-HUB-04" },
    { label: "AMÉRIQUE LATINE", lat: -14.23, lng: -51.92, code: "LATAM-09" },
    { label: "ASIE", lat: 34.04, lng: 100.61, code: "ASIA-CORE-02" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % destinations.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const activeConnection = [
    {
      order: 1,
      startLat: 5.34,
      startLng: -4.03,
      endLat: destinations[index].lat,
      endLng: destinations[index].lng,
      arcAlt: 0.3,
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
              globeColor: "#060910",
              atmosphereColor: "#22c55e",
              polygonColor: "rgba(34, 197, 94, 0.1)",
              arcTime: 2000,
              arcLength: 0.9,
            }}
          />
        </div>

        {/* HUD UI - Texte Esthétique */}
        <div className="relative z-10 flex flex-col items-center pointer-events-none w-full max-w-4xl">
          {/* Badge de statut clignotant */}
          <div className="flex items-center gap-2 mb-4 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
            <span className="text-[10px] text-green-500 font-bold tracking-[0.3em] uppercase">
              Ivory cost Data-Driven
            </span>
          </div>

          {/* Animation du texte principal */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-center">
            <span className="text-3xl font-light opacity-40 tracking-tighter uppercase">
              Abidjan
            </span>
            <motion.div
              animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:block h-[2px] w-24 bg-gradient-to-r from-transparent via-green-500 to-transparent"
            />

            {/* Ici on gère l'apparition fluide du nom de la destination */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={destinations[index].label}
                initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -20, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-8xl font-black tracking-[0.1em] text-white"
              >
                {destinations[index].label}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Code technique qui change en dessous */}
          <motion.p
            key={destinations[index].code}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            className="mt-6 font-mono text-xs tracking-[0.5em] text-green-200"
          >
            {destinations[index].code}
          </motion.p>

          {/* Barre de progression visuelle */}
          <div className="mt-12 w-64 h-[2px] bg-white/5 overflow-hidden">
            <motion.div
              key={index}
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
              className="w-full h-full bg-green-500"
            />
          </div>
        </div>
      </main>
    </>
  );
}
