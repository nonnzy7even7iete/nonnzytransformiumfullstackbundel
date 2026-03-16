"use client";

import * as React from "react";
import { TrendingUp, ShieldCheck, Zap, Globe, Gavel } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
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
  { year: "2023", civ: 55.7, benchmark: 58.0 },
  { year: "2024", civ: 58.1, benchmark: 54.2 },
  { year: "2025", civ: 59.4, benchmark: 52.8 },
  { year: "2026", civ: 60.9, benchmark: 51.5 },
];

const chartConfig = {
  civ: { label: "Côte d'Ivoire", color: "#10b981" },
  benchmark: { label: "Moyenne Régionale", color: "#27272a" },
} satisfies ChartConfig;

export default function SovereignAwardTerminal() {
  const id = React.useId();

  return (
    <div className="w-full bg-black text-white p-8 font-sans antialiased border border-zinc-900 rounded-lg">
      {/* HEADER ULTRA-ÉPURÉ */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-zinc-800 pb-8 gap-6">
        <div className="flex items-center gap-5">
          <div className="p-3 bg-[#10b981] rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <TrendingUp className="h-6 w-6 text-black stroke-[3]" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic leading-none">
              Sovereign <span className="text-[#10b981]">Index</span>
            </h1>
            <p className="text-[10px] font-mono text-zinc-500 mt-2 uppercase tracking-[0.4em]">
              Mining Intelligence Terminal v4.0
            </p>
          </div>
        </div>
        <div className="flex gap-10">
          <TopStat label="Indice Fraser" value="60.92" sub="+1.52 pts" />
          <TopStat
            label="Confiance Investisseur"
            value="94.8%"
            sub="Grade A+"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* SIDEBAR GAUGES (ILLUSTRATIONS DE STATUT) */}
        <div className="lg:col-span-3 space-y-10">
          <GaugeBlock
            label="Stabilité Législative"
            value={92}
            color="#10b981"
          />
          <GaugeBlock label="Potentiel Géologique" value={88} color="#10b981" />
          <GaugeBlock label="Infrastructures" value={76} color="#3f3f46" />

          <div className="pt-6 border-t border-zinc-900 space-y-4">
            <h3 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
              Target 2026
            </h3>
            <div className="text-2xl font-black italic tracking-tighter text-white">
              Top 10 Global
            </div>
          </div>
        </div>

        {/* MAIN CHART (LIGNES FINES, ÉPURÉES) */}
        <div className="lg:col-span-9">
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ left: -20, right: 0, top: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id={`glow-${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="#18181b"
                  strokeWidth={0.5}
                />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#3f3f46", fontSize: 11, fontWeight: 900 }}
                  dy={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#3f3f46", fontSize: 10, fontWeight: 800 }}
                />
                <ChartTooltip
                  cursor={{ stroke: "#333", strokeWidth: 1 }}
                  content={<ChartTooltipContent />}
                />

                {/* Benchmark Regional - Ligne Fine continue */}
                <Area
                  dataKey="benchmark"
                  type="monotone"
                  stroke="#27272a"
                  strokeWidth={1}
                  fill="none"
                />

                {/* Côte d'Ivoire - Ligne Maîtresse sans pointillés */}
                <Area
                  dataKey="civ"
                  type="monotone"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill={`url(#glow-${id})`}
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* LÉGENDE MATRICIELLE ET ACTUALITÉS (POUR CONVAINCRE) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 border-t border-zinc-900 pt-8">
            <NewsItem
              icon={<Zap className="w-4 h-4 text-[#10b981]" />}
              title="Réforme du Code Minier"
              desc="Optimisation des régimes fiscaux sécurisant les investissements directs étrangers (IDE) sur 20 ans."
            />
            <NewsItem
              icon={<Globe className="w-4 h-4 text-[#10b981]" />}
              title="Hub Minier Régional"
              desc="Inauguration de 3 nouveaux complexes industriels transformant la CIV en plaque tournante de l'or noir."
            />
            <NewsItem
              icon={<Gavel className="w-4 h-4 text-[#10b981]" />}
              title="Souveraineté des Données"
              desc="Digitalisation intégrale des cadastres miniers permettant une transparence de rang mondial."
            />
            <NewsItem
              icon={<ShieldCheck className="w-4 h-4 text-[#10b981]" />}
              title="ESG & Compliance"
              desc="Alignement sur les standards internationaux (ITIE) garantissant une exploitation éthique et durable."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPOSANTS DE PRÉCISION UI */

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
    <div className="text-right border-l border-zinc-800 pl-6">
      <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
        {label}
      </p>
      <div className="flex items-baseline gap-2 justify-end">
        <span className="text-2xl font-black tracking-tighter tabular-nums">
          {value}
        </span>
        <span className="text-[9px] font-bold text-[#10b981] italic uppercase">
          {sub}
        </span>
      </div>
    </div>
  );
}

function GaugeBlock({
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
        <span className="text-[10px] font-black uppercase tracking-tighter text-zinc-400">
          {label}
        </span>
        <span className="text-[11px] font-mono font-bold" style={{ color }}>
          {value}%
        </span>
      </div>
      <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function NewsItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4 p-4 bg-zinc-950 border border-zinc-900 rounded-sm hover:border-[#10b981]/50 transition-colors group">
      <div className="mt-1">{icon}</div>
      <div className="space-y-1">
        <h4 className="text-xs font-black uppercase tracking-tight text-white group-hover:text-[#10b981] transition-colors">
          {title}
        </h4>
        <p className="text-[10px] leading-relaxed text-zinc-500 font-medium italic">
          "{desc}"
        </p>
      </div>
    </div>
  );
}
