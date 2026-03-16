"use client";

import * as React from "react";
import { TrendingUp, ShieldCheck, Zap, Info } from "lucide-react";
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

const DONNEES_SOUVERAINETE = [
  { annee: "2021", indice: 41.0, moyenne_region: 54.0 },
  { annee: "2022", indice: 48.2, moyenne_region: 56.5 },
  { annee: "2023", indice: 52.7, moyenne_region: 58.0 },
  { annee: "2024", indice: 56.1, moyenne_region: 54.2 },
  { annee: "2025", indice: 58.9, moyenne_region: 51.5 },
  { annee: "2026", indice: 60.92, moyenne_region: 50.1 },
];

const configGraphique = {
  indice: { label: "Indice CIV", color: "#10b981" },
  moyenne_region: { label: "Moyenne Région", color: "var(--accents-2)" },
} satisfies ChartConfig;

export default function TerminalStructurel() {
  const id = React.useId();

  return (
    <div className="w-full bg-[var(--background)] text-[var(--foreground)] p-10 font-sans antialiased border border-[var(--border-color)] rounded-[var(--radius-vercel)] shadow-2xl transition-colors duration-200">
      {/* EN-TÊTE : STRUCTURE PRÉSERVÉE */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 border-b border-[var(--accents-2)] pb-10 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[var(--card-bg-glass)] border border-[var(--accents-2)] backdrop-blur-md rounded-[var(--radius-vercel-zy)]">
              <TrendingUp className="h-6 w-6 text-[#10b981] stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
                Indice de <span className="text-[#10b981]">Souveraineté</span>
              </h1>
              <p className="text-[10px] font-bold text-[var(--foreground)] opacity-50 uppercase tracking-[0.5em] mt-2">
                Audit Officiel • Synchronisation 2026
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          <StatHeader label="Rang Politique" value="#47" />
          <StatHeader label="Attractivité" value="#28" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* BARRE LATÉRALE : PRÉSERVATION SQUELETTIQUE */}
        <div className="lg:col-span-3 space-y-12">
          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase text-[var(--foreground)] opacity-40 tracking-widest border-l-2 border-[#10b981] pl-3">
              Paramètres d'Audit
            </h3>
            <JaugeStat label="Stabilité Législative" val={92} />
            <JaugeStat label="Potentiel Géologique" val={89} />
            <JaugeStat label="Transparence ITIE" val={74} />
          </div>

          {/* LE CONTAINER DEMANDÉ : NOIR EN DARK / CLAIR EN LIGHT AVEC BORDURES */}
          <div className="p-6 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[var(--radius-vercel-zy)] shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-3 w-3 text-[#10b981]" />
              <p className="text-[9px] font-black uppercase text-[var(--foreground)] opacity-40 tracking-tighter">
                Note d'analyse
              </p>
            </div>
            <div className="text-xl font-black italic text-[var(--foreground)] leading-tight uppercase tracking-tighter mb-4">
              Optimisation <br />
              Risque / Rendement
            </div>
            <p className="text-[11px] text-[var(--foreground)] opacity-80 leading-relaxed font-medium">
              Le <span className="text-[#10b981] font-bold">60.92</span> marque
              le passage de la Côte d'Ivoire en{" "}
              <span className="font-bold underline decoration-[#10b981]/30">
                Zone de Confiance Majeure
              </span>{" "}
              pour les investisseurs institutionnels.
            </p>
          </div>
        </div>

        {/* GRAPHIQUE CENTRAL */}
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
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="var(--accents-2)"
                  strokeWidth={1}
                  opacity={0.4}
                />
                <XAxis
                  dataKey="annee"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "var(--foreground)",
                    fontSize: 11,
                    fontWeight: 900,
                    opacity: 0.5,
                  }}
                  dy={15}
                />
                <YAxis domain={[30, 75]} hide />
                <ChartTooltip
                  cursor={{ stroke: "var(--accents-2)" }}
                  content={<ChartTooltipContent />}
                />
                <Area
                  dataKey="moyenne_region"
                  type="monotone"
                  stroke="var(--accents-2)"
                  strokeWidth={1.5}
                  fill="none"
                  opacity={0.3}
                />
                <Area
                  dataKey="indice"
                  type="monotone"
                  stroke="#10b981"
                  strokeWidth={4}
                  fill={`url(#eclat-${id})`}
                  animationDuration={3000}
                />
                <ReferenceLine
                  y={60}
                  stroke="#10b981"
                  strokeDasharray="4 4"
                  opacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* LÉGENDE MATRICIELLE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 border-t border-[var(--accents-2)] pt-10">
            <NewsTile
              titre="Numérisation Cadastre"
              statut="ACTIF"
              desc="Attribution des permis en < 30 jours. Transparence totale exigée par les VC et les Politiques."
            />
            <NewsTile
              titre="Projet Koné"
              statut="STRATÉGIQUE"
              desc="Validation de la plus grande mine d'or du pays (11t/an). Pilier du leadership 2026."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- COMPOSANTS DE STRUCTURE CSS SYNC --- */

function StatHeader({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-right border-l border-[var(--accents-2)] pl-8">
      <p className="text-[10px] font-black text-[var(--foreground)] opacity-40 uppercase tracking-widest mb-1">
        {label}
      </p>
      <span className="text-3xl font-black tracking-tighter tabular-nums text-[var(--foreground)]">
        {value}
      </span>
    </div>
  );
}

function JaugeStat({ label, val }: { label: string; val: number }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black uppercase text-[var(--foreground)] opacity-50 tracking-tight">
          {label}
        </span>
        <span className="text-xs font-mono font-bold text-[var(--foreground)]">
          {val}%
        </span>
      </div>
      <div className="h-[2px] w-full bg-[var(--accents-2)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#10b981] transition-all duration-1000"
          style={{ width: `${val}%` }}
        />
      </div>
    </div>
  );
}

function NewsTile({
  titre,
  statut,
  desc,
}: {
  titre: string;
  statut: string;
  desc: string;
}) {
  return (
    <div className="p-6 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[var(--radius-vercel-zy)] hover:border-[var(--foreground)] transition-all group">
      <div className="flex justify-between items-center mb-4">
        <div className="h-4 w-4 bg-[#10b981] group-hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
        <span className="text-[9px] font-bold text-[#10b981] uppercase border border-[#10b981]/20 px-2 py-0.5 rounded-full">
          {statut}
        </span>
      </div>
      <h4 className="text-xs font-black uppercase text-[var(--foreground)] mb-2 tracking-tight">
        {titre}
      </h4>
      <p className="text-[10px] leading-relaxed text-[var(--foreground)] opacity-60 font-medium italic">
        "{desc}"
      </p>
    </div>
  );
}
