"use client";

import React from "react";
import dynamic from "next/dynamic"; // Importation pour le chargement dynamique

// Importations classiques
import Navbarfront from "@/components/frontendkit/NavbarFront";
import MiningDashboard from "@/components/frontendkit/FluxCarousel";

/**
 * SOLUTION CHIRURGICALE POUR L'ERREUR INVARIANT :
 * On charge le DataChart avec ssr: false pour éviter les conflits d'IDs SVG
 * entre le serveur et le client.
 */
const DataChart = dynamic(() => import("@/components/frontendkit/dataChart"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-[450px] bg-card animate-pulse flex items-center justify-center border"
      style={{
        borderRadius: "var(--radius-vercel-zy)",
        borderColor: "var(--border-color)",
      }}
    >
      <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-20">
        Initialisation du flux de données...
      </span>
    </div>
  ),
});

export default function logiqueMetierEtServeur() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] flex flex-col">
      <Navbarfront />

      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full pt-32 pb-12 px-4 md:px-10 space-y-20">
        {/* SECTION GRAPHIQUE ANALYTIQUE */}
        <section className="max-w-6xl mx-auto w-full">
          <DataChart />
        </section>

        {/* SECTION TERMINAL FLUX */}
        <section className="w-full">
          <MiningDashboard />
        </section>
      </main>

      {/* OVERLAY DÉCORATIF - HARMONISÉ AVEC TES BORDURES */}
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
