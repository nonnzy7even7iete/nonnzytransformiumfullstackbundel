"use client";

/**
 * @file dataTexteIngeneering.tsx
 * @description Expertise Anyama avec déclencheur vers DataImageCarousel.
 * FIX : Fermeture par clic dans le vide activée, suppression des éléments résiduels.
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextGenerateEffect } from "@/components/frontendkit/ui/text-generate-effect";
import DataImageCarousel from "@/components/frontendkit/ui/dataImageCarousel";
import { cn } from "@/lib/utils"; // Suppression de l'import X (Lucide) inutile

export const DataTexteIngeneering = () => {
  const [showCarousel, setShowCarousel] = useState(false);

  return (
    <section className="relative z-10 w-full max-w-[1100px] mx-auto px-6 lg:px-16 pb-64">
      <div className="border-t border-[var(--border-color)] pt-32">
        <div className="text-[var(--foreground)]">
          {/* HEADER : TITRE ET INTRODUCTION (TEXTE PRÉSERVÉ) */}
          <header className="mb-24 space-y-8 animate-target opacity-0">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-12">
              Anyama : Hub industriel et logistique stratégique – opportunité
              unique
            </h1>
            <div className="text-xl md:text-2xl leading-relaxed max-w-4xl opacity-80 font-medium">
              <TextGenerateEffect words="Anyama est prête à devenir un centre économique majeur en Côte d’Ivoire. Les infrastructures et atouts existants en font un site où chaque investissement se transforme en valeur mesurable et scalable." />
            </div>
          </header>

          {/* GRILLE DE POINTS CLÉS (V-CARD STYLE) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-color)] border border-[var(--border-color)] mb-32 animate-target opacity-0">
            {[
              "Industries existantes : ciment et métallurgie, capables de générer des synergies industrielles et logistiques.",
              "Zone industrielle prête à accueillir des expansions.",
              "Avantage logistique stratégique Y4, garantissant des flux fiables et rapides pour les marchandises.",
              "Projet stade : vecteur de renommée permanent, augmentant l’attractivité de la commune pour investisseurs et partenaires stratégiques.",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-[var(--background)] p-10 group hover:bg-[var(--accents-1)] transition-colors duration-300"
              >
                <div className="text-sm leading-relaxed font-mono tracking-tight opacity-70 italic">
                  <TextGenerateEffect words={text} />
                </div>
              </div>
            ))}
          </div>

          {/* CORPS DE L'ANALYSE (STRUCTURE ET TEXTE INTÉGRAUX) */}
          <div className="space-y-40">
            {/* LEVIER 01 - STADE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-l border-[var(--border-color)] pl-8 lg:pl-0 lg:border-none animate-target opacity-0">
              <div className="lg:col-span-4 lg:text-right lg:pr-12 lg:border-r lg:border-[var(--border-color)]">
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-6">
                  Levier 01 / Attractivité
                </h2>
                <h3 className="text-3xl font-bold tracking-tighter">
                  Stade : vecteur de renommée et attractivité constante
                </h3>
              </div>
              <div className="lg:col-span-8 space-y-8">
                <p className="text-lg leading-relaxed opacity-80">
                  Le stade ne se limite pas aux événements. Il devient un signal
                  permanent de dynamisme et de modernité.
                </p>
                <ul className="space-y-4 text-sm opacity-60">
                  <li>
                    <strong>Visibilité continue :</strong> attire partenaires,
                    investisseurs et médias.
                  </li>
                  <li>
                    <strong>Crédibilité immédiate :</strong> tout projet à
                    proximité bénéficie d’une image premium.
                  </li>
                </ul>
              </div>
            </div>

            {/* CONCLUSION ET BOUTON */}
            <footer className="pt-20 text-center space-y-12 animate-target opacity-0">
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">
                Agir Maintenant.
              </h2>
              <motion.button
                onClick={() => setShowCarousel(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 px-10 py-5 bg-[var(--foreground)] text-[var(--background)] rounded-full text-xs font-black uppercase tracking-[0.3em] transition-transform duration-300 cursor-pointer shadow-xl"
              >
                Priorité Stratégique : Maximale
              </motion.button>
            </footer>
          </div>
        </div>
      </div>

      {/* OVERLAY DU CARROUSEL 3D : LE VIDE RÉCUPÈRE LE POUVOIR */}
      <AnimatePresence>
        {showCarousel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // TRANSFERT DE POUVOIR : Le clic sur le fond ferme le composant
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowCarousel(false);
            }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center cursor-zoom-out"
          >
            <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
              <DataImageCarousel onClose={() => setShowCarousel(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
