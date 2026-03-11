"use client";

import React from "react";
// Importation des outils de visualisation Recharts
// La notation par point (recharts.LineChart) sera utilisée par React pour le rendu
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

// Importation chirurgicale des composants Shadcn Chart
// On utilise l'alias "@" qui pointe vers ton dossier "src"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

/**
 * DATA : Évolution Cinétique de l'Extraction Minière (CI)
 * Architecture Data-Driven : Les valeurs sont isolées pour une précision maximale.
 */
const miningData = [
  { periode: "2022", or: 48, lithium: 2 },
  { periode: "2023", or: 54, lithium: 8 },
  { periode: "2024", or: 65, lithium: 22 },
  { periode: "2025", or: 82, lithium: 48 }, // Accélération Nonnzytransformium
  { periode: "2026", or: 98, lithium: 85 }, // Projection Souveraineté
];

/**
 * CONFIGURATION : Design System Réactif
 * Les clés 'or' et 'lithium' correspondent aux propriétés de notre objet miningData.
 */
const miningConfig = {
  or: {
    label: "Or (Tonnes/An)",
    color: "var(--primary)",
  },
  lithium: {
    label: "Lithium (Unités)",
    color: "#10b981", // Emerald-500 pour le secteur énergie
  },
} satisfies ChartConfig;

export default function DataChart() {
  return (
    <div className="w-full max-w-4xl p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl">
      {/* En-tête du composant : Philosophie de Gouvernance */}
      <div className="mb-10">
        <h3 className="text-3xl font-black uppercase tracking-tighter text-white">
          Souveraineté Cinétique
        </h3>
        <p className="mt-2 text-[10px] text-emerald-500 font-bold uppercase tracking-[0.4em] opacity-80">
          High-Frequency Governance // Mining Loop
        </p>
      </div>

      {/* ChartContainer : Composant de haut niveau de Shadcn.
          Il injecte les styles CSS nécessaires basés sur miningConfig.
      */}
      <ChartContainer config={miningConfig} className="h-[350px] w-full">
        {/* ResponsiveContainer assure que le graphique s'adapte à la largeur du parent */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={miningData}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            {/* Grille de fond : vertical={false} pour ne garder que les lignes de repères horizontales */}
            <CartesianGrid vertical={false} strokeOpacity={0.05} />

            {/* Axe X : Paramétrage chirurgical pour le minimalisme */}
            <XAxis
              dataKey="periode"
              axisLine={false}
              tickLine={false}
              tickMargin={15}
              className="text-[11px] font-mono opacity-40"
            />

            {/* Tooltip : Le composant qui affiche les détails au survol (Notation par point : ChartTooltip.content) */}
            <ChartTooltip content={<ChartTooltipContent />} />

            {/* COURBE DE L'OR : 
                type="monotone" pour une ligne fluide représentant l'extraction traditionnelle optimisée.
            */}
            <Line
              dataKey="or"
              type="monotone"
              stroke="var(--color-or)"
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-or)" }}
            />

            {/* COURBE DU LITHIUM : 
                type="stepAfter" pour symboliser les sauts de maturité technologique.
            */}
            <Line
              dataKey="lithium"
              type="stepAfter"
              stroke="var(--color-lithium)"
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-lithium)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Footer technique : Preuve de la réduction de latence */}
      <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[9px] font-mono opacity-30 uppercase tracking-[0.2em]">
        <span>Boucle de rétroaction : 0.001ms</span>
        <span>© Nonnzytransformium 2026</span>
      </div>
    </div>
  );
}

/**
 * SECTION MONTÉE EN COMPÉTENCES (NIVEAU JUNIOR)
 * * 1. NOTATION PAR POINT (.) DANS LES IMPORTS :
 * - import { LineChart } from "recharts" : On extrait le composant spécifique.
 * - <LineChart data={miningData}> : Le point (caché ici par React) lie la donnée au composant.
 * * 2. CONFIGURATION SATISFIES (TypeScript) :
 * - 'satisfies ChartConfig' permet à ton éditeur de code de comprendre que miningConfig
 * doit avoir une structure précise. Si tu oublies la propriété 'color', il te le dira.
 * * 3. LOGIQUE DATA-DRIVEN :
 * - Le composant ne contient pas de texte "dur" pour les chiffres.
 * - Si les chiffres de l'État changent dans miningData, le graphique s'ajuste
 * automatiquement sans toucher au design. C'est l'essence de ton projet.
 */
