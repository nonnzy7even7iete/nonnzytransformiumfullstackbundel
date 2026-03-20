"use client";

import React from "react";
// Importation de ta Navbar qui gère le switch de thèmes
// .NavbarFront : Composant exporté du répertoire frontendkit via un alias de chemin (@).
import NavbarFront from "@/components/frontendkit/ui/NavbarFront";
import Zymantra from "@/components/frontendkit/ui/ZymantraBeam";
import { TextGenerateEffect } from "@/components/frontendkit/ui/text-generate-effect";

/**
 * PAGE PRINCIPALE : Nonnzytransformium v.2026
 * Architecture Data-Driven et Design System réactif.
 */
export default function Page() {
  // Définition de la chaîne de caractères (string) littérale.
  // INTERDICTION DE MODIFIER : Le texte respecte strictement ta vision de "High-Frequency Governance".
  const manifesto =
    "Les économies à haute performance ne le sont pas par l'abondance de leurs ressources, mais par la brièveté de leurs boucles de rétroaction (Feedback Loops). Elles détectent les signaux faibles en millisecondes. À l'inverse, une gouvernance sans maturité Data subit l'impact, puis n'en produit l'analyse que deux ans plus tard. L'enjeu de Nonnzytransformium est d'instaurer une 'High-Frequency Governance' : nous ne pilotons plus la nation au cycle budgétaire annuel, mais à la minute stratégique.";

  return (
    // CHANGEMENT CHIRURGICAL :
    // Utilisation des variables CSS natives pour assurer la compatibilité avec ton Design System.
    <main
      className="min-h-screen selection:bg-emerald-500/30 relative transition-colors duration-500"
      style={{
        // .backgroundColor : Propriété du style en ligne (inline style).
        // On pointe vers la variable globale définie dans ton thème Tailwind/CSS.
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* La Navbar gère son propre background via var(--background) */}
      <NavbarFront />

      <section className="pt-32 pb-4 px-6 flex flex-col items-center">
        {/* COMPOSANT : TextGenerateEffect 
          Prop words : On passe notre constante 'manifesto'.
          Prop className : On définit l'impact visuel (font-black, uppercase).
        */}
        <TextGenerateEffect
          words={manifesto}
          className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-center"
        />

        <p className="mt-2 text-[10px] text-emerald-500 font-black tracking-[0.5em] uppercase opacity-50">
          Algorithme Zy v.2026
        </p>
      </section>

      {/* ZYMANTRA BEAM : Composant de flux visuel, réactif aux variables CSS. */}
      <Zymantra />

      <section className="py-20 flex justify-center">
        <p
          className="text-[10px] font-mono opacity-20 tracking-[0.5em] uppercase"
          style={{
            // .color : On utilise la notation par point pour définir la couleur de la police.
            color: "var(--foreground)",
          }}
        >
          data driven , Anyama , Abidjan , cote d ivoire , 2026
        </p>
      </section>
    </main>
  );
}

/**
 * NOTES DE MONTÉE EN COMPÉTENCE (NIVEAU JUNIOR) :
 * * 1. LE PASSAGE DE VARIABLES (PROPS) :
 * - Dans <TextGenerateEffect words={manifesto} />, 'words' est la propriété (prop).
 * - '{manifesto}' entre accolades indique à React qu'on utilise une variable JavaScript
 * et non une simple chaîne de texte.
 * * 2. LA NOTATION PAR POINT (DOT NOTATION) DANS LE STYLE :
 * - style={{ backgroundColor: "var(--background)" }}
 * - 'style' est un objet. 'backgroundColor' est une propriété de cet objet.
 * - On utilise le point (implicite dans la structure de l'objet) pour lier
 * le rendu visuel aux variables de ton Design System.
 * * 3. L'IMPORTATION CHIRURGICALE (@/...) :
 * - L'arobase (@) est un alias configuré dans ton fichier 'tsconfig.json'.
 * - Le point (.) dans le chemin d'importation (ex: ./ ou ../) servirait à naviguer
 * relativement, mais ici l'alias permet d'accéder directement à la racine 'src'.
 */
