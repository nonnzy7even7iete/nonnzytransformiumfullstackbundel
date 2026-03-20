"use client";

/**
 * @STRUCTURE_PRESERVATION_PROTOCOL
 * ---------------------------------------------------------------------------
 * PAGE : TERMINAL DE SOUVERAINETÉ & TUNNEL DE CONVERSION
 * ---------------------------------------------------------------------------
 */

import React from "react";
import dynamic from "next/dynamic";

// Importations statiques
import Navbarfront from "@/components/frontendkit/ui/NavbarFront";
import MiningDashboard from "@/components/frontendkit/ui/FluxCarousel";

/**
 * CHARGEMENT DYNAMIQUE DU GRAPHIQUE
 */
const DataChart = dynamic(
  () => import("@/components/frontendkit/ui/dataChart"),
  {
    ssr: false,
    loading: () => (
      <SkeletonLoader
        height="500px"
        label="Initialisation du flux souverain..."
      />
    ),
  }
);

/**
 * CHARGEMENT DYNAMIQUE DE LA FAQ
 * CORRECTION : On simplifie l'import pour éviter l'erreur de type TS
 */
const AccordionFaqTunnel = dynamic(
  () =>
    import("@/components/frontendkit/ui/accordionFaq").then(
      (mod) => mod.default
    ),
  {
    ssr: false,
    loading: () => <SkeletonLoader height="200px" label="Chargement FAQ..." />,
  }
);

export default function LogiqueMetierEtServeur() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] flex flex-col font-sans selection:bg-[#10b981]/30">
      <Navbarfront />

      <main className="flex-1 w-full pt-32 pb-24 px-4 md:px-10 space-y-40">
        <section className="max-w-7xl mx-auto w-full">
          <DataChart />
        </section>

        <section className="max-w-3xl mx-auto w-full py-10 border-t border-[var(--accents-2)]">
          <div className="mb-12">
            <span className="bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent text-[10px] font-black uppercase tracking-[0.4em]">
              Vérification de Conformité
            </span>
          </div>
          <AccordionFaqTunnel />
        </section>

        <section className="w-full">
          <MiningDashboard />
        </section>
      </main>

      <div
        className="pointer-events-none fixed inset-0 z-[120] m-4 md:m-8 opacity-10"
        style={{ border: "1px solid var(--border-color)" }}
      />

      <footer className="p-12 flex flex-col items-center gap-4 opacity-20">
        <div className="h-[1px] w-20 bg-[var(--foreground)] opacity-20 mb-4" />
        <p className="text-[9px] font-mono tracking-[0.6em] uppercase text-[var(--foreground)] text-center">
          Système Opérationnel Abidjan // 2026 // Cryptography Verified
        </p>
      </footer>
    </div>
  );
}

function SkeletonLoader({ height, label }: { height: string; label: string }) {
  return (
    <div
      className="w-full bg-card animate-pulse flex items-center justify-center border border-[var(--border-color)]"
      style={{
        height,
        borderRadius: "var(--radius-vercel-zy)",
      }}
    >
      <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-20 italic">
        {label}
      </span>
    </div>
  );
}
