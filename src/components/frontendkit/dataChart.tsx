"use client";

import * as React from "react";
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe,
  Gavel,
  ArrowUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

/**
 * MODÉLISATION DES DONNÉES D'EXPERTISE
 * Structure multidimensionnelle : Politique, Géologie, Économie.
 */
const DONNEES_SOUVERAINETE = [
  { annee: "2021", indice: 41.0, moyenne_region: 54.0, rang_politique: 52 },
  { annee: "2022", indice: 48.2, moyenne_region: 56.5, rang_politique: 50 },
  { annee: "2023", indice: 52.7, moyenne_region: 58.0, rang_politique: 48 },
  { annee: "2024", indice: 56.1, moyenne_region: 54.2, rang_politique: 47 },
  { annee: "2025", indice: 58.9, moyenne_region: 51.5, rang_politique: 45 },
  { annee: "2026", indice: 60.92, moyenne_region: 50.1, rang_politique: 42 },
];

const configGraphique = {
  indice: { label: "Indice de Souveraineté", color: "#10b981" },
  moyenne_region: { label: "Moyenne CEDEAO", color: "var(--accents-2)" },
} satisfies ChartConfig;

export default function TerminalExpertSouverain() {
  const id = React.useId();

  return (
    /* Correction lisibilité : Utilisation de var(--foreground) pour le texte principal */
    <div className="w-full bg-[var(--background)] text-[var(--foreground)] p-10 font-sans antialiased border border-[var(--border-color)] rounded-[var(--radius-vercel)] shadow-2xl transition-colors duration-200">
      {/* EN-TÊTE : IDENTITÉ ET RANGS OFFICIELS */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 border-b border-[var(--accents-2)] pb-10 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {/* Conteneur Icône "Effet Verre" (Glassmorphism) */}
            <div className="p-3 bg-[var(--card-bg-glass)] border border-[var(--accents-2)] backdrop-blur-md rounded-[var(--radius-vercel-zy)] shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <TrendingUp className="h-6 w-6 text-[#10b981] stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
                Indice de <span className="text-[#10b981]">Souveraineté</span>
              </h1>
              <p className="text-[10px] font-bold text-[var(--foreground)] opacity-60 uppercase tracking-[0.5em] mt-2 italic">
                Audit Officiel Fraser • Synchronisation 2026
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          <PointDonnee label="Rang Politique" value="#47" tendance="STABLE" />
          <PointDonnee
            label="Attractivité Globale"
            value="#28"
            tendance="HAUSSIER"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* BARRE LATÉRALE : INDICATEURS DE PERFORMANCE (Jauges) */}
        <div className="lg:col-span-3 space-y-12">
          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase text-[var(--foreground)] opacity-50 tracking-widest border-l-2 border-[#10b981] pl-3 italic">
              Paramètres d'Expertise
            </h3>
            <JaugeStatistique
              label="Stabilité Législative"
              valeur={92}
              couleur="#10b981"
            />
            <JaugeStatistique
              label="Potentiel Géologique"
              valeur={89}
              couleur="#10b981"
            />
            <JaugeStatistique
              label="Transparence (ITIE)"
              valeur={74}
              couleur="#10b981"
            />
          </div>

          <div className="p-6 bg-[var(--accents-1)] border border-[var(--border-color)] rounded-[var(--radius-vercel-zy)]">
            <p className="text-[9px] font-black uppercase text-[var(--foreground)] opacity-40 mb-2 font-mono">
              Note d'analyse
            </p>
            <div className="text-xl font-black italic text-[var(--foreground)] leading-tight uppercase tracking-tighter">
              Optimisation <br />
              Risque / Rendement
            </div>
            <p className="text-[10px] text-[var(--foreground)] opacity-70 mt-4 leading-relaxed font-medium">
              Le{" "}
              <span className="text-[#10b981] font-bold text-base">60.92</span>{" "}
              marque le passage de la Côte d'Ivoire en{" "}
              <span className="font-bold">Zone de Confiance Majeure</span> pour
              les investisseurs institutionnels.
            </p>
          </div>
        </div>

        {/* GRAPHIQUE PRINCIPAL : LIGNES DE PRÉCISION FINES */}
        <div className="lg:col-span-9">
          <ChartContainer config={configGraphique} className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={DONNEES_SOUVERAINETE}
                margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id={`eclat-${id}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                {/* Contrast ajusté pour le mode Light avec opacity={0.3} sur var(--accents-2) */}
                <CartesianGrid
                  vertical={false}
                  stroke="var(--accents-2)"
                  strokeWidth={1}
                  opacity={0.6}
                />

                <XAxis
                  dataKey="annee"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "var(--foreground)",
                    fontSize: 12,
                    fontWeight: 900,
                    opacity: 0.7,
                  }}
                  dy={15}
                />

                <YAxis domain={[30, 75]} hide />

                <ChartTooltip
                  cursor={{ stroke: "var(--accents-2)" }}
                  content={<ChartTooltipContent />}
                />

                {/* Ligne Moyenne Régionale (Benchmark) */}
                <Area
                  dataKey="moyenne_region"
                  type="monotone"
                  stroke="var(--accents-2)"
                  strokeWidth={1.5}
                  fill="none"
                  opacity={0.5}
                />

                {/* Ligne Maîtresse CIV */}
                <Area
                  dataKey="indice"
                  type="monotone"
                  stroke="#10b981"
                  strokeWidth={4}
                  fill={`url(#eclat-${id})`}
                  animationDuration={3000}
                />

                {/* Seuil Critique de Performance */}
                <ReferenceLine
                  y={60}
                  stroke="#10b981"
                  strokeDasharray="4 4"
                  opacity={0.4}
                >
                  <Label
                    value="SEUIL DE SOUVERAINETÉ GRADE A"
                    position="insideBottomRight"
                    fill="#10b981"
                    fontSize={9}
                    fontWeight={900}
                  />
                </ReferenceLine>
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* LÉGENDE MATRICIELLE : CARRÉS DE STATUT ET ACTUALITÉS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 border-t border-[var(--accents-2)] pt-10">
            <TuileActualite
              titre="Numérisation du Cadastre"
              statut="EN VIGUEUR"
              desc="Attribution des permis en moins de 30 jours. Transparence totale exigée par les investisseurs (VC) et les politiques."
            />
            <TuileActualite
              titre="Complexe Industriel Koné"
              statut="PRODUCTION"
              desc="Capacité confirmée de 11 tonnes/an. Pilier central du leadership souverain en Afrique de l'Ouest."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- COMPOSANTS DE STRUCTURE --- */

function PointDonnee({
  label,
  value,
  tendance,
}: {
  label: string;
  value: string;
  tendance: string;
}) {
  return (
    <div className="text-right border-l border-[var(--accents-2)] pl-8">
      <p className="text-[10px] font-black text-[var(--foreground)] opacity-40 uppercase tracking-[0.2em] mb-1">
        {label}
      </p>
      <div className="flex items-baseline gap-3 justify-end">
        <span className="text-3xl font-black tracking-tighter tabular-nums text-[var(--foreground)]">
          {value}
        </span>
        <span className="text-[9px] font-black text-[#10b981] uppercase italic tracking-widest">
          {tendance}
        </span>
      </div>
    </div>
  );
}

function JaugeStatistique({
  label,
  valeur,
  couleur,
}: {
  label: string;
  valeur: number;
  couleur: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black uppercase tracking-tight text-[var(--foreground)] opacity-60">
          {label}
        </span>
        <span className="text-xs font-mono font-bold text-[var(--foreground)]">
          {valeur}%
        </span>
      </div>
      <div className="h-[2px] w-full bg-[var(--accents-2)] rounded-full">
        <div
          className="h-full transition-all duration-1000"
          style={{ width: `${valeur}%`, backgroundColor: couleur }}
        />
      </div>
    </div>
  );
}

function TuileActualite({
  titre,
  statut,
  desc,
}: {
  titre: string;
  statut: string;
  desc: string;
}) {
  return (
    <div className="p-6 bg-[var(--background)] border border-[var(--border-color)] rounded-[var(--radius-vercel-zy)] hover:border-[#10b981]/50 transition-all group">
      <div className="flex justify-between items-center mb-4">
        {/* Point Carré Collé - Symbole de la légende */}
        <div className="h-4 w-4 bg-[#10b981] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-shadow" />
        <span className="text-[9px] font-bold text-[#10b981] uppercase tracking-widest">
          {statut}
        </span>
      </div>
      <h4 className="text-xs font-black uppercase tracking-tight text-[var(--foreground)] mb-2">
        {titre}
      </h4>
      <p className="text-[10px] leading-relaxed text-[var(--foreground)] opacity-60 font-medium italic">
        "{desc}"
      </p>
    </div>
  );
}
