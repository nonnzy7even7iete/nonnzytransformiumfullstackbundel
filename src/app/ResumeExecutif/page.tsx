"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import NavbarFront from "@/components/NavbarFront";
import { CardStack } from "@/components/ui/card-stack";

// ==========================================================
// 1. IMPORT DYNAMIQUE DU GLOBE
// Empêche les erreurs de rendu côté serveur (SSR)
// ==========================================================
const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

// ==========================================================
// 2. CONFIGURATION DES TEXTES (MAINTENANCE FACILE)
// C'est ici que tu changes tes textes sans toucher au design
// ==========================================================
const PAGE_CONTENT = {
  hero: {
    badge: "Ivory Coast Data-driven Global Networking Hub",
    source: "Source: CÔTE D'IVOIRE",
    signal: "SIGNAL STRENGTH: OPTIMAL",
  },
  logs: {
    title: "Real-time Node Logs",
    description:
      "Monitoring global data flow and infrastructure health across the Ivory Coast backbone. High-speed fiber optic synchronization active.",
    status: "System Live & Encrypted",
  },
};

// ==========================================================
// 3. DONNÉES DES CARTES (CARD STACK CONTENT)
// Chaque objet ici devient une carte physique dans la pile
// ==========================================================
const LOG_CARDS_DATA = [
  {
    id: 0,
    name: "Network Engine",
    designation: "Status: Active",
    content: (
      <p>
        Routing data packets from{" "}
        <span className="font-bold text-green-500">Abidjan Hub</span> to Global
        Nodes.
      </p>
    ),
  },
  {
    id: 1,
    name: "Security Protocol",
    designation: "Shield: 100%",
    content: (
      <p>
        End-to-end encryption active in the{" "}
        <span className="text-blue-500 font-bold">Ivory Coast</span> gateway.
      </p>
    ),
  },
  {
    id: 2,
    name: "Cloud Infra",
    designation: "Region: AF-WEST",
    content: <p>Nodes synchronized via 10Gbps fiber backbone.</p>,
  },
];

export default function ResumeExecutifPage() {
  const [index, setIndex] = useState(0);
  const ABIDJAN = { lat: 5.33, lng: -4.03 };

  // Liste des destinations pour l'animation du Globe
  const destinations = [
    {
      label: "AMÉRIQUE DU NORD",
      lat: 39.82,
      lng: -98.57,
      code: "NODE-NA-CENTRAL",
    },
    { label: "EUROPE", lat: 50.11, lng: 14.42, code: "NODE-EU-CENTRAL" },
    { label: "ASIE", lat: 43.67, lng: 87.33, code: "NODE-AS-CENTRAL" },
  ];

  // Gestion du cycle automatique (Change de destination toutes les 6s)
  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % destinations.length),
      6000
    );
    return () => clearInterval(timer);
  }, [destinations.length]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020408]">
      <NavbarFront />

      {/* ------------------------------------------------------
          SECTION 1 : LE GLOBE (HAUT DE PAGE)
          Prend toute la hauteur de l'écran (h-screen)
      ------------------------------------------------------- */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* LE GLOBE EN ARRIÈRE-PLAN */}
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
            globeConfig={{}}
          />
        </div>

        {/* HUD (AFFICHAGE TÊTE HAUTE) - SUPERPOSÉ SUR LE GLOBE */}
        <div className="relative z-10 flex flex-col items-center pointer-events-none px-6 text-center">
          {/* Badge Ivory Coast + Point Vert Clignotant */}
          <div className="flex items-center gap-3 mb-8 px-4 py-2 bg-green-500/10 border border-green-600/20 rounded-full backdrop-blur-sm">
            <div className="relative flex h-2 w-2">
              <div className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
              <div className="relative inline-flex rounded-full h-2 w-2 bg-green-600 dark:bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            </div>
            <span className="text-[10px] text-green-700 dark:text-green-500 font-black tracking-[0.4em] uppercase">
              {PAGE_CONTENT.hero.badge}
            </span>
          </div>

          <span className="text-sm font-mono opacity-40 tracking-[0.5em] uppercase mb-2">
            {PAGE_CONTENT.hero.source}
          </span>

          {/* Titre Animé (Nord Amérique, Europe, etc.) */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={destinations[index].label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic dark:text-white text-slate-900"
            >
              {destinations[index].label}
            </motion.h1>
          </AnimatePresence>

          <p className="mt-10 font-mono text-[11px] tracking-[0.6em] text-green-600 uppercase font-bold opacity-60">
            {PAGE_CONTENT.hero.signal} // {destinations[index].code}
          </p>
        </div>

        {/* EFFET DE GRADIENT POUR TRANSITIONNER VERS LA SECTION DU BAS */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-[#020408] to-transparent z-20" />
      </section>

      {/* ------------------------------------------------------
          SECTION 2 : LES LOGS (BAS DE PAGE)
          Cette section apparaît après le scroll
      ------------------------------------------------------- */}
      <section className="relative z-30 w-full py-24 px-6 flex justify-center border-t border-border/10 bg-white dark:bg-[#020408]">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* BLOC DE GAUCHE : TEXTES DESCRIPTIFS */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">
              {PAGE_CONTENT.logs.title}
            </h2>
            <p className="text-foreground/40 text-sm md:text-base leading-relaxed max-w-sm">
              {PAGE_CONTENT.logs.description}
            </p>
            <div className="flex items-center gap-2 text-green-600 font-mono text-[10px] tracking-widest uppercase font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              {PAGE_CONTENT.logs.status}
            </div>
          </div>

          {/* !!! APPEL DU COMPOSANT CARD STACK ICI !!! */}
          {/* BLOC DE DROITE : LA PILE DE CARTES ANIMÉES */}
          <div className="flex justify-center md:justify-end h-[350px]">
            <CardStack
              items={LOG_CARDS_DATA} // Envoie les données de logs définies plus haut
              offset={10} // Espace entre les cartes
              scaleFactor={0.06} // Différence de taille entre les cartes
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-border/5 text-center opacity-20">
        <p className="text-[9px] uppercase tracking-[0.5em]">
          Ivory Coast Digital Architecture © 2026
        </p>
      </footer>
    </div>
  );
}
