"use client";

/**
 * @STRUCTURE_PRESERVATION_PROTOCOL
 * ---------------------------------------------------------------------------
 * PAGE : TERMINAL DE SOUVERAINETÉ & TUNNEL DE CONVERSION
 * 1. LAYOUT : Stack verticale (Graphique -> FAQ -> Flux).
 * 2. SÉCURITÉ : Import dynamique robuste pour éviter l'erreur React #306.
 * 3. DESIGN : Respect des variables Vercel et du noir pur (#000000).
 * ---------------------------------------------------------------------------
 */

import React from "react";
import dynamic from "next/dynamic";

// Importations statiques (Composants sans conflits SSR)
import Navbarfront from "@/components/frontendkit/NavbarFront";
import MiningDashboard from "@/components/frontendkit/FluxCarousel";

/**
 * CHARGEMENT DYNAMIQUE DU GRAPHIQUE
 * ssr: false pour éviter les erreurs d'hydratation SVG.
 */
const DataChart = dynamic(() => import("@/components/frontendkit/dataChart"), {
  ssr: false,
  loading: () => (
    <SkeletonLoader
      height="500px"
      label="Initialisation du flux souverain..."
    />
  ),
});

/**
 * CHARGEMENT DYNAMIQUE DE LA FAQ (TUNNEL DE CONVERSION)
 * Correction de l'erreur #306 : On accepte l'export default OU nommé.
 */
const AccordionFaqTunnel = dynamic(
  () =>
    import("@/components/frontendkit/accordionFaq").then((mod) => {
      // Sécurité : récupère le composant quel que soit le type d'export
      return mod.default || mod.AccordionFaqTunnel;
    }),
  {
    ssr: false,
    loading: () => <SkeletonLoader height="200px" label="Chargement FAQ..." />,
  }
);

export default function LogiqueMetierEtServeur() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] flex flex-col font-sans selection:bg-[#10b981]/30">
      <Navbarfront />

      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full pt-32 pb-24 px-4 md:px-10 space-y-40">
        {/* SECTION 1 : ANALYSE DE SOUVERAINETÉ (DATA VISUALIZATION) */}
        <section className="max-w-7xl mx-auto w-full">
          <DataChart />
        </section>

        {/* SECTION 2 : TUNNEL DE CONVERSION (ACCORDÉON FAQ) */}
        <section className="max-w-3xl mx-auto w-full py-10 border-t border-[var(--accents-2)]">
          <div className="mb-12">
            <span className="bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent text-[10px] font-black uppercase tracking-[0.4em]">
              Vérification de Conformité
            </span>
          </div>
          <AccordionFaqTunnel />
        </section>

        {/* SECTION 3 : TERMINAL DE FLUX (IMMERSION) */}
        <section className="w-full">
          <MiningDashboard />
        </section>
      </main>

      {/* OVERLAY DÉCORATIF - CADRE DE SOUVERAINETÉ */}
      <div
        className="pointer-events-none fixed inset-0 z-[120] m-4 md:m-8 opacity-10"
        style={{ border: "1px solid var(--border-color)" }}
      />

      {/* FOOTER TECHNIQUE */}
      <footer className="p-12 flex flex-col items-center gap-4 opacity-20">
        <div className="h-[1px] w-20 bg-[var(--foreground)] opacity-20 mb-4" />
        <p className="text-[9px] font-mono tracking-[0.6em] uppercase text-[var(--foreground)] text-center">
          Système Opérationnel Abidjan // 2026 // Cryptography Verified
        </p>
      </footer>
    </div>
  );
}

/**
 * SKELETON LOADER UNIFIÉ
 */
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
