"use client";

/**
 * @file dataTexteIngeneering.tsx
 * @description Composant narratif stratégique pour Anyama.
 * Intègre la logique TextGenerateEffect pour une révélation progressive.
 */

import React from "react";
// Importation du moteur d'effet. Notation par point : @/ désigne la racine du projet.
import { TextGenerateEffect } from "@/components/frontendkit/ui/text-generate-effect";
// Utilitaire pour la gestion conditionnelle des classes CSS.
import { cn } from "@/lib/utils";

export const DataTexteIngeneering = () => {
  return (
    <section className="relative z-10 w-full max-w-[1100px] mx-auto px-6 lg:px-16 pb-64">
      {/* border-t : Bordure supérieure chirurgicale.
          border-[var(--border-color)] : Utilise ta variable CSS globale pour la cohérence du Design System.
      */}
      <div className="border-t border-[var(--border-color)] pt-32">
        <TextGenerateEffect className="text-[var(--foreground)]">
          {/* HEADER : TITRE ET INTRODUCTION - L'EXPERTISÉ LITTÉRALE */}
          <header className="mb-24 space-y-8">
            <h1 className="animate-target opacity-0 text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-12">
              Anyama : Hub industriel et logistique stratégique – opportunité
              unique
            </h1>
            <p className="animate-target opacity-0 text-xl md:text-2xl leading-relaxed max-w-4xl opacity-80 font-medium">
              Anyama est prête à devenir un centre économique majeur en Côte
              d’Ivoire. Les infrastructures et atouts existants en font un site
              où chaque investissement se transforme en valeur mesurable et
              scalable.
            </p>
          </header>

          {/* GRILLE DE POINTS CLÉS (V-CARD STYLE) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-color)] border border-[var(--border-color)] mb-32">
            {[
              "Industries existantes : ciment et métallurgie, capables de générer des synergies industrielles et logistiques.",
              "Zone industrielle prête à accueillir des expansions.",
              "Avantage logistique stratégique Y4, garantissant des flux fiables et rapides pour les marchandises.",
              "Projet stade : vecteur de renommée permanent, augmentant l’attractivité de la commune pour investisseurs et partenaires stratégiques.",
            ].map((text, i) => (
              <div
                key={i}
                // group hover : permet de déclencher des styles sur les enfants au survol du parent.
                className="bg-[var(--background)] p-10 group hover:bg-[var(--accents-1)] transition-colors duration-300"
              >
                <p className="animate-target opacity-0 text-sm leading-relaxed font-mono tracking-tight opacity-70 italic">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <p className="animate-target opacity-0 text-lg mb-32 border-l-2 border-emerald-500 pl-6 italic opacity-90">
            Chaque levier combiné crée un écosystème industrialo-logistique
            capable de croître rapidement, de sécuriser les flux et de
            multiplier les retours sur investissement.
          </p>

          {/* CORPS DE L'ANALYSE : LES LEVIERS STRATÉGIQUES */}
          <div className="space-y-40">
            {/* LEVIER 01 - STADE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-l border-[var(--border-color)] pl-8 lg:pl-0 lg:border-none">
              <div className="lg:col-span-4 lg:text-right lg:pr-12 lg:border-r lg:border-[var(--border-color)]">
                <h2 className="animate-target opacity-0 text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-6">
                  Levier 01 / Attractivité
                </h2>
                <h3 className="animate-target opacity-0 text-3xl font-bold tracking-tighter">
                  Stade : vecteur de renommée et attractivité constante
                </h3>
              </div>
              <div className="lg:col-span-8 space-y-8">
                <p className="animate-target opacity-0 text-lg leading-relaxed opacity-80">
                  Le stade ne se limite pas aux événements. Il devient un signal
                  permanent de dynamisme et de modernité :
                </p>
                <ul className="space-y-4 text-sm opacity-60">
                  <li className="animate-target opacity-0">
                    <strong>Visibilité continue :</strong> attire partenaires,
                    investisseurs et médias.
                  </li>
                  <li className="animate-target opacity-0">
                    <strong>Crédibilité immédiate :</strong> tout projet à
                    proximité bénéficie d’une image premium.
                  </li>
                  <li className="animate-target opacity-0">
                    <strong>Effet multiplicateur :</strong> même en l’absence
                    d’événements, le stade crée un flux indirect constant vers
                    la commune (emplois, transport, services).
                  </li>
                </ul>
                <p className="animate-target opacity-0 text-base italic opacity-70 pt-4">
                  Les investisseurs comprennent que le stade transcende son
                  usage sportif et agit comme un levier d’attractivité
                  stratégique permanent, capable de valoriser chaque nouveau
                  projet.
                </p>
              </div>
            </div>

            {/* LEVIER 02 - INDUSTRIES */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-l border-[var(--border-color)] pl-8 lg:pl-0 lg:border-none">
              <div className="lg:col-span-4 lg:text-right lg:pr-12 lg:border-r lg:border-[var(--border-color)]">
                <h2 className="animate-target opacity-0 text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-6">
                  Levier 02 / Scalabilité
                </h2>
                <h3 className="animate-target opacity-0 text-3xl font-bold tracking-tighter">
                  Industries : vecteurs de scalabilité et création de valeur
                </h3>
              </div>
              <div className="lg:col-span-8 space-y-6">
                <p className="animate-target opacity-0 text-lg leading-relaxed opacity-80">
                  <strong>Ciment :</strong> support des infrastructures, projets
                  de construction, extension industrielle et urbaine. Chaque
                  tonne produite soutient des projets supplémentaires et crée un
                  flux économique croissant.
                </p>
                <p className="animate-target opacity-0 text-lg leading-relaxed opacity-80">
                  <strong>Métallurgie :</strong> produit des équipements pour
                  d’autres industries, permettant de scaler rapidement des
                  projets industriels sans dépendre d’infrastructures externes.
                </p>
                <div className="v-card p-8 animate-target opacity-0 border-emerald-500/20 bg-emerald-500/[0.01]">
                  <p className="text-base leading-relaxed opacity-80">
                    <strong>Zone industrielle :</strong> centralise et mutualise
                    services logistiques, énergie, RH → réduction de coûts et
                    création de valeur exponentielle.
                  </p>
                </div>
                <p className="animate-target opacity-0 text-base font-bold text-emerald-500 pt-4">
                  L’effet combiné : chaque industrie existante augmente la
                  scalabilité de toute expansion, réduisant les risques et
                  maximisant les retours sur investissement.
                </p>
              </div>
            </div>

            {/* LEVIER 03 - Y4 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-l border-[var(--border-color)] pl-8 lg:pl-0 lg:border-none">
              <div className="lg:col-span-4 lg:text-right lg:pr-12 lg:border-r lg:border-[var(--border-color)]">
                <h2 className="animate-target opacity-0 text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-6">
                  Levier 03 / Logistique
                </h2>
                <h3 className="animate-target opacity-0 text-3xl font-bold tracking-tighter">
                  Y4 : levier logistique stratégique
                </h3>
              </div>
              <div className="lg:col-span-8 space-y-6">
                <ul className="space-y-4 text-lg opacity-80">
                  <li className="animate-target opacity-0">
                    Optimise le transport des matières premières et produits
                    finis.
                  </li>
                  <li className="animate-target opacity-0">
                    Sécurise les débouchés pour les industries existantes et
                    futures.
                  </li>
                  <li className="animate-target opacity-0">
                    Facilite l’implantation rapide de nouveaux projets grâce à
                    des flux logistiques fiables et planifiables.
                  </li>
                </ul>
                <p className="animate-target opacity-0 text-xl font-black tracking-tight pt-6">
                  Y4 transforme Anyama en hub logistique régional, où les
                  industries et investisseurs peuvent croître sans limites
                  géographiques ou opérationnelles.
                </p>
              </div>
            </div>

            {/* LEVIER 04 - ENGINE IT */}
            <div className="py-24 border-y border-[var(--border-color)] space-y-12">
              <div className="text-center">
                <h2 className="animate-target opacity-0 text-xs font-black uppercase tracking-[0.5em] text-emerald-500 mb-8">
                  Engine / IT & Data-Driven
                </h2>
                <h3 className="animate-target opacity-0 text-4xl md:text-5xl font-black tracking-tighter max-w-4xl mx-auto leading-[1.1] mb-12">
                  IT et tunnel de conversion data-driven : moteur décisionnel
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
                <div className="animate-target opacity-0 p-6 border border-[var(--border-color)]">
                  <p className="text-sm opacity-60">
                    Centraliser et analyser chaque projet et flux industriel.
                  </p>
                </div>
                <div className="animate-target opacity-0 p-6 border border-[var(--border-color)]">
                  <p className="text-sm opacity-60">
                    Identifier les synergies et proposer des solutions de
                    scalabilité pour maximiser la valeur économique.
                  </p>
                </div>
                <div className="animate-target opacity-0 p-6 border border-[var(--border-color)]">
                  <p className="text-sm opacity-60">
                    Simuler et sécuriser les investissements avant leur
                    implémentation, garantissant ROI et alignement stratégique.
                  </p>
                </div>
              </div>
              <div className="text-center pt-12">
                <p className="animate-target opacity-0 text-xl font-mono tracking-tighter opacity-80">
                  Industrie ciment + métallurgie + zone industrielle + Y4 →
                  valeur économique Z, mesurable et scalable.
                </p>
              </div>
            </div>

            {/* CONCLUSION FINALE */}
            <footer className="pt-20 text-center space-y-12">
              <h2 className="animate-target opacity-0 text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">
                Agir Maintenant.
              </h2>
              <div className="max-w-3xl mx-auto space-y-8">
                <p className="animate-target opacity-0 text-xl md:text-2xl font-bold opacity-90 leading-relaxed">
                  Investir à Anyama, c’est saisir une opportunité rare où chaque
                  projet s’intègre dans un écosystème générant des retours
                  tangibles et exponentiels.
                </p>
                <p className="animate-target opacity-0 text-lg opacity-70">
                  La décision stratégique est claire : agir maintenant permet
                  d’être les premiers à bénéficier de ce hub industriel et
                  logistique unique en Côte d’Ivoire.
                </p>
              </div>
              <div className="animate-target opacity-0 inline-flex items-center gap-4 px-10 py-5 bg-[var(--foreground)] text-[var(--background)] rounded-full text-xs font-black uppercase tracking-[0.3em] hover:scale-105 transition-transform duration-300 cursor-default">
                Priorité Stratégique : Maximale
              </div>
            </footer>
          </div>
        </TextGenerateEffect>
      </div>
    </section>
  );
};
