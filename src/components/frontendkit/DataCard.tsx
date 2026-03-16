"use client";

import * as React from "react";
import {
  TrendingUp,
  ArrowUp,
  Zap,
  Globe,
  Gavel,
  ShieldCheck,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
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

const chartData = [
  { year: "2021", civ: 41.0, benchmark: 54.0 },
  { year: "2022", civ: 48.2, benchmark: 56.5 },
  { year: "2023", civ: 52.7, benchmark: 58.0 },
  { year: "2024", civ: 56.1, benchmark: 54.2 },
  { year: "2025", civ: 58.9, benchmark: 51.5 },
  { year: "2026", civ: 60.92, benchmark: 50.1 },
];

const chartConfig = {
  civ: { label: "CIV Index", color: "#10b981" },
  benchmark: { label: "CEDEAO Avg", color: "var(--accents-2)" },
} satisfies ChartConfig;

export default function HarvardSovereignTerminal() {
  const id = React.useId();

  return (
    /* Utilisation de tes variables CSS : background et border-color */
    <div className="w-full bg-[var(--background)] text-[var(--foreground)] p-10 font-sans antialiased border border-[var(--border-color)] rounded-[var(--radius-vercel)] shadow-2xl transition-colors duration-200">
      {/* HEADER : SYNC VERCEL RADIUS */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 border-b border-[var(--accents-2)] pb-10 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {/* Glass Container pour l'icône Scaling */}
            <div className="p-3 bg-[var(--card-bg-glass)] border border-[var(--accents-2)] backdrop-blur-md rounded-[var(--radius-vercel-zy)] shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <TrendingUp className="h-6 w-6 text-[#10b981] stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
                Sovereign <span className="text-[#10b981]">Index</span>
              </h1>
              <p className="text-[10px] font-bold text-[var(--accents-2)] uppercase tracking-[0.5em] mt-2">
                Official Fraser Audit Sync • 2026
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          <TopStat label="Politique (PPI)" value="#47" sub="GLOBAL RANK" />
          <TopStat label="Attractivité" value="#28" sub="INVESTOR RANK" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* SIDEBAR : GAUGES (TON LAYOUT) */}
        <div className="lg:col-span-3 space-y-12">
          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase text-[var(--accents-2)] tracking-widest border-l-2 border-[#10b981] pl-3">
              KPI Souverains
            </h3>
            <ProgressBar
              label="Perception Politique"
              value={53}
              color="var(--accents-2)"
            />
            <ProgressBar label="Richesse Minérale" value={89} color="#10b981" />
            <ProgressBar label="Stabilité Fiscale" value={74} color="#10b981" />
          </div>

          <div className="p-6 bg-[var(--accents-1)] border border-[var(--border-color)] rounded-[var(--radius-vercel-zy)]">
            <p className="text-[9px] font-black uppercase text-[var(--accents-2)] mb-2">
              Bilan Exécutif
            </p>
            <div className="text-xl font-black italic text-[var(--foreground)] leading-tight uppercase tracking-tighter">
              Leadership <br />
              Confirmé
            </div>
            <p className="text-[10px] text-[var(--accents-2)] mt-4 leading-relaxed font-medium">
              Analyse Fraser : La Côte d'Ivoire maintient son{" "}
              <span className="text-[var(--foreground)] font-bold">
                rang #1 régional
              </span>{" "}
              malgré les défis structurels.
            </p>
          </div>
        </div>

        {/* MAIN CHART */}
        <div className="lg:col-span-9">
          <ChartContainer config={chartConfig} className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id={`glow-${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="var(--accents-2)"
                  strokeWidth={0.5}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "var(--accents-2)",
                    fontSize: 12,
                    fontWeight: 900,
                  }}
                  dy={15}
                />
                <YAxis domain={[30, 75]} hide />

                <ChartTooltip
                  cursor={{ stroke: "var(--accents-2)" }}
                  content={<ChartTooltipContent />}
                />

                <Area
                  dataKey="benchmark"
                  type="monotone"
                  stroke="var(--accents-2)"
                  strokeWidth={1.5}
                  fill="none"
                  opacity={0.4}
                />
                <Area
                  dataKey="civ"
                  type="monotone"
                  stroke="#10b981"
                  strokeWidth={4}
                  fill={`url(#glow-${id})`}
                />

                <ReferenceLine
                  y={60.92}
                  stroke="#10b981"
                  strokeDasharray="3 3"
                  opacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* LÉGENDE CARRÉE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 border-t border-[var(--accents-2)] pt-10">
            <NewsCard
              title="Réforme Cadastre"
              status="DIGITAL"
              desc="Transparence totale des permis miniers via la nouvelle plateforme blockchain 2025."
            />
            <NewsCard
              title="Potentiel Koné"
              status="STRATÉGIQUE"
              desc="Validation environnementale finale pour le plus grand gisement aurifère de la zone CEDEAO."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPOSANTS LIÉS À TES VARIABLES */

function TopStat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="text-right border-l border-[var(--accents-2)] pl-8">
      <p className="text-[10px] font-black text-[var(--accents-2)] uppercase tracking-[0.2em] mb-1">
        {label}
      </p>
      <div className="flex items-baseline gap-3 justify-end">
        <span className="text-3xl font-black tracking-tighter tabular-nums text-[var(--foreground)]">
          {value}
        </span>
        <span className="text-[9px] font-black text-[#10b981] uppercase italic">
          {sub}
        </span>
      </div>
    </div>
  );
}

function ProgressBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black uppercase tracking-tight text-[var(--accents-2)]">
          {label}
        </span>
        <span className="text-xs font-mono font-bold text-[var(--foreground)]">
          {value}%
        </span>
      </div>
      <div className="h-[2px] w-full bg-[var(--accents-1)] rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-1000"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function NewsCard({
  title,
  status,
  desc,
}: {
  title: string;
  status: string;
  desc: string;
}) {
  return (
    <div className="p-6 bg-[var(--background)] border border-[var(--border-color)] rounded-[var(--radius-vercel-zy)] hover:border-[#10b981]/50 transition-colors">
      <div className="flex justify-between items-center mb-4">
        {/* Point Carré Collé */}
        <div className="h-4 w-4 bg-[#10b981]" />
        <span className="text-[9px] font-bold text-[#10b981] uppercase tracking-widest">
          {status}
        </span>
      </div>
      <h4 className="text-xs font-black uppercase tracking-tight text-[var(--foreground)] mb-2">
        {title}
      </h4>
      <p className="text-[10px] leading-relaxed text-[var(--accents-2)] font-medium italic">
        "{desc}"
      </p>
    </div>
  );
}
