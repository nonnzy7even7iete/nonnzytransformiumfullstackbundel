"use client";

/**
 * @file dataTexteIngeneering.tsx
 * @description Expertise Anyama avec double logique d'animation.
 * Catégories globales + Animation "mot par mot" sur les textes stratégiques.
 */

import React from "react";
import { TextGenerateEffect } from "@/components/frontendkit/ui/text-generate-effect";
import { cn } from "@/lib/utils";

export const DataTexteIngeneering = () => {
  return (
    <section className="relative z-10 w-full max-w-[1100px] mx-auto px-6 lg:px-16 pb-64">
      <div className="border-t border-[var(--border-color)] pt-32">
        {/* LOGIQUE GLOBALE : Apparition par grandes catégories (header, grid, footer) */}
        <TextGenerateEffect className="text-[var(--foreground)]">
          {/* HEADER */}
          <header className="mb-24 space-y-8 animate-target opacity-0">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-12">
              Anyama : Hub industriel et logistique stratégique – opportunité
              unique
            </h1>
            {/* SUBTILITÉ : Ici, on utilise la prop 'words' pour que ce paragraphe précis s'anime mot par mot */}
            <div className="text-xl md:text-2xl leading-relaxed max-w-4xl opacity-80 font-medium">
              <TextGenerateEffect words="Anyama est prête à devenir un centre économique majeur en Côte d’Ivoire. Les infrastructures et atouts existants en font un site où chaque investissement se transforme en valeur mesurable et scalable." />
            </div>
          </header>

          {/* GRILLE DE POINTS CLÉS */}
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
                {/* Animation mot par mot à l'intérieur de chaque carte pour un effet premium */}
                <div className="text-sm leading-relaxed font-mono tracking-tight opacity-70 italic">
                  <TextGenerateEffect words={text} />
                </div>
              </div>
            ))}
          </div>

          <div className="animate-target opacity-0 mb-32 border-l-2 border-emerald-500 pl-6 italic opacity-90 text-lg">
            <TextGenerateEffect words="Chaque levier combiné crée un écosystème industrialo-logistique capable de croître rapidement, de sécuriser les flux et de multiplier les retours sur investissement." />
          </div>

          {/* CORPS DE L'ANALYSE */}
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
                  permanent de dynamisme et de modernité :
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
                  <li>
                    <strong>Effet multiplicateur :</strong> même en l’absence
                    d’événements, le stade crée un flux indirect constant vers
                    la commune.
                  </li>
                </ul>
              </div>
            </div>

            {/* LEVIER 04 - ENGINE IT (LE CŒUR DE TON PROJET) */}
            <div className="py-24 border-y border-[var(--border-color)] space-y-12 animate-target opacity-0">
              <div className="text-center">
                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-emerald-500 mb-8">
                  Engine / IT & Data-Driven
                </h2>
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter max-w-4xl mx-auto leading-[1.1] mb-12">
                  IT et tunnel de conversion data-driven : moteur décisionnel
                </h3>
              </div>
              <div className="text-center pt-12">
                <div className="text-xl font-mono tracking-tighter opacity-80">
                  {/* Animation chirurgicale de la formule mathématique de succès */}
                  <TextGenerateEffect words="Industrie ciment + métallurgie + zone industrielle + Y4 → valeur économique Z, mesurable et scalable." />
                </div>
              </div>
            </div>

            {/* CONCLUSION FINALE */}
            <footer className="pt-20 text-center space-y-12 animate-target opacity-0">
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">
                Agir Maintenant.
              </h2>
              <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-xl md:text-2xl font-bold opacity-90 leading-relaxed">
                  <TextGenerateEffect words="Investir à Anyama, c’est saisir une opportunité rare où chaque projet s’intègre dans un écosystème générant des retours tangibles et exponentiels." />
                </div>
              </div>
              <div className="inline-flex items-center gap-4 px-10 py-5 bg-[var(--foreground)] text-[var(--background)] rounded-full text-xs font-black uppercase tracking-[0.3em] hover:scale-105 transition-transform duration-300 cursor-default">
                Priorité Stratégique : Maximale
              </div>
            </footer>
          </div>
        </TextGenerateEffect>
      </div>
    </section>
  );
};
