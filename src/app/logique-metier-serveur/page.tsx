"use client";

import React from "react";
import dynamic from "next/dynamic";

// Importations classiques
import Navbarfront from "@/components/frontendkit/NavbarFront";
import MiningDashboard from "@/components/frontendkit/FluxCarousel";

/**
 * CHARGEMENT DYNAMIQUE DES COMPOSANTS CRITIQUES
 */
const DataChart = dynamic(() => import("@/components/frontendkit/dataChart"), {
  ssr: false,
  loading: () => (
    <SkeletonLoader height="450px" label="Initialisation du flux..." />
  ),
});

// Importation de ton nouveau composant Accordion
const AccordionFaqTunnel = dynamic(
  () => import("@/components/frontendkit/accordionFaq"),
  {
    ssr: false,
  }
);

export default function logiqueMetierEtServeur() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] flex flex-col">
      <Navbarfront />

      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full pt-32 pb-12 px-4 md:px-10 space-y-32">
        {/* SECTION 1 : ANALYSE VISUELLE & FAQ (LE TUNNEL) */}
        <section className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Le Graphique (9 colonnes pour garder la majesté de la donnée) */}
          <div className="lg:col-span-8">
            <DataChart />
          </div>

          {/* L'Accordéon (4 colonnes pour la conversion textuelle) */}
          <div className="lg:col-span-4 lg:pt-20">
            <AccordionFaqTunnel />
          </div>
        </section>

        {/* SECTION 2 : TERMINAL FLUX (L'IMMERSION) */}
        <section className="w-full">
          <MiningDashboard />
        </section>
      </main>

      {/* OVERLAY DÉCORATIF */}
      <div
        className="pointer-events-none fixed inset-0 z-[120] m-4 md:m-8 opacity-20"
        style={{ border: "1px solid var(--border-color)" }}
      />

      {/* FOOTER TECHNIQUE */}
      <footer className="p-8 flex justify-center opacity-10">
        <p className="text-[10px] font-mono tracking-[0.5em] uppercase text-[var(--foreground)]">
          Abidjan - Anyama // 2026 // Latency 0.001ms
        </p>
      </footer>
    </div>
  );
}

/**
 * SKELETON LOADER - RÉUTILISABLE
 */
function SkeletonLoader({ height, label }: { height: string; label: string }) {
  return (
    <div
      className="w-full bg-card animate-pulse flex items-center justify-center border"
      style={{
        height,
        borderRadius: "var(--radius-vercel-zy)",
        borderColor: "var(--border-color)",
      }}
    >
      <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-20">
        {label}
      </span>
    </div>
  );
}
