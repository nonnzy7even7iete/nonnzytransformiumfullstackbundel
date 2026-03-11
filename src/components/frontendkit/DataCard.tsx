"use client";

import React from "react";
// Importation des outils spécifiques pour le rendu "Area" (Zone remplie)
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

/**
 * DATA : Flux de Souveraineté Minière
 * Structure Data-Driven pour Nonnzytransformium.
 */
const miningData = [
  { periode: "Jan", or: 40, lithium: 24 },
  { periode: "Fév", or: 30, lithium: 13 },
  { periode: "Mar", or: 20, lithium: 98 }, // Pic de réactivité
  { periode: "Avr", or: 27, lithium: 39 },
  { periode: "Mai", or: 18, lithium: 48 },
  { periode: "Juin", or: 23, lithium: 38 },
  { periode: "Juil", or: 34, lithium: 43 },
];

/**
 * CONFIGURATION : Intégration au Design System Vercel
 * On utilise les variables de ton fichier CSS.
 */
const miningConfig = {
  or: {
    label: "Or (Tonnes)",
    // On utilise foreground pour la ligne principale pour le contraste max
    color: "var(--foreground)",
  },
  lithium: {
    label: "Lithium",
    // On utilise un accent pour la ligne secondaire
    color: "#0070f3", // Bleu Vercel typique pour le contraste
  },
} satisfies ChartConfig;

export default function DataChart() {
  return (
    /* v-card : On utilise ta classe CSS personnalisée pour la bordure et le rayon */
    <div className="v-card w-full max-w-5xl p-6 shadow-sm">
      <div className="flex flex-col gap-1 mb-10">
        <h3 className="text-sm font-medium tracking-tight opacity-50 uppercase">
          Flux de Performance Minière
        </h3>
        <p className="text-2xl font-bold tracking-tighter">
          Area Chart — Interactive
        </p>
      </div>

      <ChartContainer config={miningConfig} className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={miningData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            {/* DÉFINITION DES DÉGRADÉS CHIRURGICAUX */}
            <defs>
              <linearGradient id="fillOr" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--foreground)"
                  stopOpacity={0.1}
                />
                <stop
                  offset="95%"
                  stopColor="var(--foreground)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="fillLithium" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0070f3" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#0070f3" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Grille utilisant ta variable --border-color */}
            <CartesianGrid
              vertical={false}
              stroke="var(--border-color)"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="periode"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              // S'adapte au foreground avec opacité
              className="text-[12px] font-medium fill-[var(--foreground)] opacity-40"
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              className="text-[12px] font-medium fill-[var(--foreground)] opacity-40"
            />

            <ChartTooltip
              cursor={{ stroke: "var(--border-color)" }}
              content={<ChartTooltipContent />}
            />

            {/* ZONE LITHIUM */}
            <Area
              dataKey="lithium"
              type="natural"
              fill="url(#fillLithium)"
              stroke="#0070f3"
              strokeWidth={2}
              stackId="a"
            />

            {/* ZONE OR */}
            <Area
              dataKey="or"
              type="natural"
              fill="url(#fillOr)"
              stroke="var(--foreground)"
              strokeWidth={2}
              stackId="a"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* LÉGENDE ALIGNÉE SUR TES ACCENTS */}
      <div className="mt-6 flex items-center gap-4 text-[11px] font-mono uppercase tracking-widest opacity-50">
        <div className="flex items-center gap-2">
          <div className="h-1 w-4 bg-[var(--foreground)]" />
          Souveraineté Or
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1 w-4 bg-[#0070f3]" />
          Lithium Pulse
        </div>
      </div>
    </div>
  );
}

/**
 * LOGIQUE JUNIOR : ADAPTATION LIGHT/DARK
 * 1. var(--foreground) : En mode Light, c'est noir (#000). En mode Dark, c'est blanc (#fff).
 * Le graphique change donc de couleur automatiquement sans code JS supplémentaire.
 * 2. var(--border-color) : La grille du graphique utilise la même bordure que tes cartes.
 * Cela crée une unité visuelle parfaite.
 * 3. v-card : En ajoutant cette classe sur le div parent, ton graphique hérite du
 * background-color réactif (blanc ou noir pur) et du radius de 14px.
 */
