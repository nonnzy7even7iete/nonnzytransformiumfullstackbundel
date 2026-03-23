"use client";

/**
 * @file dataTexteIngeneering.tsx
 * @description Expertise Anyama avec déclencheur vers DataImageCarousel.
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextGenerateEffect } from "@/components/frontendkit/ui/text-generate-effect";
import DataImageCarousel from "@/components/frontendkit/ui/dataImageCarousel"; // Importation de ton composant 3D
import { X } from "lucide-react"; // Pour le bouton fermer
import { cn } from "@/lib/utils";

export const DataTexteIngeneering = () => {
  // État pour gérer l'affichage du carrousel 3D
  const [showCarousel, setShowCarousel] = useState(false);

  return (
    <section className="relative z-10 w-full max-w-[1100px] mx-auto px-6 lg:px-16 pb-64">
      <div className="border-t border-[var(--border-color)] pt-32">
        <TextGenerateEffect className="text-[var(--foreground)]">
          {/* ... (Header, Grille et Leviers restent identiques pour préserver tes textes) */}

          <header className="mb-24 space-y-8 animate-target opacity-0">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-12">
              Anyama : Hub industriel et logistique stratégique – opportunité
              unique
            </h1>
            <div className="text-xl md:text-2xl leading-relaxed max-w-4xl opacity-80 font-medium">
              <TextGenerateEffect words="Anyama est prête à devenir un centre économique majeur en Côte d’Ivoire. Les infrastructures et atouts existants en font un site où chaque investissement se transforme en valeur mesurable et scalable." />
            </div>
          </header>

          {/* ... (Grille et Leviers omis ici pour la clarté, mais conservés dans ton fichier) */}

          {/* CONCLUSION FINALE AVEC CLICK HANDLER */}
          <footer className="pt-20 text-center space-y-12 animate-target opacity-0">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">
              Agir Maintenant.
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-xl md:text-2xl font-bold opacity-90 leading-relaxed">
                <TextGenerateEffect words="Investir à Anyama, c’est saisir une opportunité rare où chaque projet s’intègre dans un écosystème générant des retours tangibles et exponentiels." />
              </div>
            </div>

            {/* LE DÉCLENCHEUR : On transforme le div en motion.button */}
            <motion.button
              onClick={() => setShowCarousel(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-4 px-10 py-5 bg-[var(--foreground)] text-[var(--background)] rounded-full text-xs font-black uppercase tracking-[0.3em] transition-transform duration-300 cursor-pointer shadow-xl hover:shadow-emerald-500/20"
            >
              Priorité Stratégique : Maximale
            </motion.button>
          </footer>
        </TextGenerateEffect>
      </div>

      {/* OVERLAY DU CARROUSEL 3D */}
      <AnimatePresence>
        {showCarousel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[var(--background)] flex items-center justify-center"
          >
            {/* Bouton de fermeture chirurgical */}
            <button
              onClick={() => setShowCarousel(false)}
              className="absolute top-10 right-10 z-[210] p-4 text-[var(--foreground)] hover:rotate-90 transition-transform duration-500"
            >
              <X size={32} strokeWidth={3} />
            </button>

            {/* Appel de ton composant 3D */}
            <div className="w-full h-full">
              <DataImageCarousel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
