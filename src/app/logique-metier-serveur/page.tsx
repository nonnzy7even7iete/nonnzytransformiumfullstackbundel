"use client";

import React from "react";
// Importation des composants (Vérifie bien tes chemins d'accès)
import Navbarfront from "@/components/frontendkit/NavbarFront";
import MiningDashboard from "@/components/frontendkit/FluxCarousel";
// INJECTION CHIRURGICALE : Importation du graphique de souveraineté
import DataChart from "@/components/frontendkit/dataChart";

/**
 * PAGE PRINCIPALE : AUDIT STRATÉGIQUE 2026
 * Ce fichier orchestre la Navbar et le Dashboard de données sans surcharge de props.
 * Architecture : Nonnzytransformium // High-Frequency Governance
 */
export default function logiqueMetierEtServeur() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] flex flex-col">
      {/* NAVBAR : Appel direct. 
        Positionnée en absolute ou fixed selon ton Design System pour ne pas gêner le flux 3D.
      */}
      <Navbarfront />

      {/* MAIN CONTAINER : Orchestration du flux de données */}
      <main className="flex-1 w-full pt-24 pb-12 px-4 md:px-8 space-y-12">
        {/* SECTION MANIFESTE VISUEL : 
            On place le graphique ici pour valider la vision "Data-Driven" 
            avant d'entrer dans le terminal FluxCarousel.
        */}
        <section className="w-full flex justify-center">
          <DataChart />
        </section>

        {/* MINING DASHBOARD : Le terminal autonome.
          Contient déjà sa propre logique de données, de drag et de conversion.
        */}
        <section className="w-full">
          <MiningDashboard />
        </section>
      </main>

      {/* OVERLAY DÉCORATIF (Optionnel) 
        Pour renforcer le sentiment de "Terminal Sécurisé"
      */}
      <div className="pointer-events-none fixed inset-0 z-[120] border-[1px] border-white/5 m-4 md:m-8 opacity-20" />

      {/* FOOTER TECHNIQUE DISCRET */}
      <footer className="p-8 flex justify-center opacity-10">
        <p className="text-[10px] font-mono tracking-[0.5em] uppercase text-[var(--foreground)]">
          Abidjan - Anyama // 2026 // Latency 0.001ms
        </p>
      </footer>
    </div>
  );
}

/**
 * MONTÉE EN COMPÉTENCE JUNIOR (Architecture de Page) :
 * * 1. LE FLUX VERTICAL (space-y-12) :
 * Dans Tailwind, cette classe (utilisant la notation par point .space-y-12)
 * ajoute automatiquement une marge entre le DataChart et le MiningDashboard.
 * * 2. L'IMPORTATION RELATIVE (@/...) :
 * On utilise l'alias pour importer DataChart. Comme il est dans le même
 * dossier que FluxCarousel, la structure reste cohérente et facile à maintenir.
 * * 3. L'ORCHESTRATION SANS PROPS :
 * Ton architecture est intelligente. Chaque composant (DataChart, MiningDashboard)
 * gère sa propre "Logique Métier". La page ne sert que de conteneur (Layout).
 * C'est l'essence du développement moderne en Next.js.
 */
