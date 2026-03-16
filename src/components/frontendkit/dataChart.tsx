"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { ArrowUpRight, Zap, Info, ShieldCheck, Database } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// --- STRUCTURE DE DONNÉES (Audit Fraser 2026) ---
const data = [
  { year: "2022", civ: 48.2, ghana: 60.1, others: 46.5 },
  { year: "2023", civ: 55.7, ghana: 62.4, others: 45.1 },
  { year: "2024", civ: 58.1, ghana: 54.8, others: 44.8 }, // Point de bascule
  { year: "2025", civ: 59.4, ghana: 55.1, others: 43.5 },
  { year: "2026", civ: 60.9, ghana: 55.2, others: 42.1 },
];

const config = {
  civ: { label: "Côte d'Ivoire", color: "#10b981" },
  ghana: { label: "Ghana", color: "#f59e0b" },
  others: { label: "Moyenne Régionale", color: "#27272a" },
} satisfies ChartConfig;

export default function SovereignIntelligenceTerminal() {
  const id = React.useId();

  return (
    <div className="w-full bg-black text-zinc-100 p-8 space-y-8 font-sans antialiased border border-zinc-900">
      {/* 1. HEADER EXÉCUTIF : LA PORTÉE DE LA DATA */}
      <header className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-zinc-800 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-1.5 rounded-sm">
              <ArrowUpRight className="w-5 h-5 text-black stroke-[3]" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">
              Sovereignty{" "}
              <span className="text-emerald-500 underline decoration-4 underline-offset-8">
                Report
              </span>
            </h1>
          </div>
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <Database className="w-3 h-3" /> Source : Audit Fraser Institute •
            Q1 2026 Update
          </p>
        </div>

        <div className="flex gap-12">
          <TopMetric
            label="Indice de Souveraineté"
            value="60.92"
            trend="+9.3%"
          />
          <TopMetric label="Position ECOWAS" value="#01" trend="Leader" />
        </div>
      </header>

      {/* 2. CORPS DU RAPPORT : ORGANISATION BENTO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* A. VISUALISATION TECHNIQUE (70% DE L'ESPACE) */}
        <section className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2 text-zinc-500">
            <Info className="w-3 h-3" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Évolution Comparative de l'Attractivité (Scores Fraser)
            </span>
          </div>

          <div className="bg-zinc-950/50 border border-zinc-900 p-6 rounded-sm">
            <ChartContainer config={config} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ left: 50, right: 10, top: 10 }}
                >
                  <defs>
                    <linearGradient
                      id={`grad-${id}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    vertical={false}
                    stroke="#18181b"
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#52525b", fontSize: 11, fontWeight: 700 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#3f3f46",
                      fontSize: 10,
                      fontWeight: 800,
                      fontFamily: "monospace",
                    }}
                    ticks={[42, 55, 61]}
                    tickFormatter={(v) =>
                      v === 61 ? "CIV" : v === 55 ? "GHA" : "REG"
                    }
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />

                  {/* RÉGION (FOND) */}
                  <Area
                    dataKey="others"
                    type="monotone"
                    stroke="#27272a"
                    fill="none"
                    strokeWidth={1}
                    opacity={0.5}
                  />
                  {/* GHANA (BENCHMARK) */}
                  <Area
                    dataKey="ghana"
                    type="monotone"
                    stroke="#f59e0b"
                    fill="none"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                  />
                  {/* COTE D'IVOIRE (DOMINATION) */}
                  <Area
                    dataKey="civ"
                    type="monotone"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill={`url(#grad-${id})`}
                  />

                  <ReferenceLine
                    x="2024"
                    stroke="#10b981"
                    strokeDasharray="5 5"
                    opacity={0.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </section>

        {/* B. ANALYSE DE LA PORTÉE (30% DE L'ESPACE) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="space-y-6">
            <AnalysisCard
              title="Pivot de Souveraineté"
              desc="L'année 2024 marque le croisement historique des courbes. La Côte d'Ivoire sécurise son leadership grâce à une réforme fiscale minière agressive."
              icon={<Zap className="text-yellow-500" />}
            />
            <AnalysisCard
              title="Attractivité Fraser"
              desc="Avec un score de 60.92, le pays entre dans le 'Tier A' mondial. La stabilité institutionnelle réduit le risque opérationnel de 14%."
              icon={<ShieldCheck className="text-emerald-500" />}
            />
          </div>

          <div className="p-6 bg-zinc-900/30 border border-zinc-800 space-y-2">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">
              Status de Production
            </p>
            <div className="text-3xl font-black italic tracking-tighter">
              63.0T{" "}
              <span className="text-sm text-emerald-500 tracking-normal">
                / 2026
              </span>
            </div>
            <div className="w-full bg-zinc-800 h-1 mt-4">
              <div className="bg-emerald-500 h-full w-[92%]" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// --- SOUS-COMPOSANTS DE STRUCTURE ---

function TopMetric({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-black tracking-tighter tabular-nums">
          {value}
        </span>
        <span className="text-[10px] font-bold text-emerald-500 uppercase italic">
          {trend}
        </span>
      </div>
    </div>
  );
}

function AnalysisCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-5 border-l-4 border-zinc-800 bg-zinc-900/10 space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-xs font-black uppercase tracking-tight text-white">
          {title}
        </h3>
      </div>
      <p className="text-[11px] text-zinc-500 leading-relaxed font-medium italic">
        "{desc}"
      </p>
    </div>
  );
}
