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

const chartData = [
  { year: "2021", civ: 41.0, benchmark: 54.0 },
  { year: "2022", civ: 48.2, benchmark: 56.5 },
  { year: "2023", civ: 55.7, benchmark: 58.0 },
  { year: "2024", civ: 58.1, benchmark: 54.2 },
  { year: "2025", civ: 60.92, benchmark: 51.5 },
  { year: "2026", civ: 62.4, benchmark: 50.1 },
];

const chartConfig = {
  civ: { label: "Côte d'Ivoire (Global Rank #28)", color: "#10b981" },
  benchmark: { label: "Moyenne Régionale", color: "#27272a" },
} satisfies ChartConfig;

export default function HarvardSovereignTerminal() {
  const id = React.useId();

  return (
    <div className="w-full bg-[#000000] text-white p-10 font-sans antialiased border border-zinc-900 rounded-[14px] shadow-2xl">
      {/* HEADER : VISION SOUVERAINE */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 border-b border-zinc-800 pb-10 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {/* ICON CONTAINER EN TRANSPARENCE */}
            <div className="p-3 bg-[#10b981]/10 border border-[#10b981]/20 backdrop-blur-md rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <TrendingUp className="h-6 w-6 text-[#10b981] stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
                Sovereign <span className="text-[#10b981]">Index</span>
              </h1>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.5em] mt-2">
                Data Intelligence • Juridiction Tier-1
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          <TopStat
            label="Rang Mondial (Fraser)"
            value="#28"
            sub="TOP 30 GLOBAL"
          />
          <TopStat label="Rang Régional" value="#01" sub="LEADER CEDEAO" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* SIDEBAR : JAUGES DE STATUT (PRÉSERVÉES) */}
        <div className="lg:col-span-3 space-y-12">
          <div className="space-y-8 text-zinc-400">
            <h3 className="text-[10px] font-black uppercase text-zinc-600 tracking-widest border-l-2 border-[#10b981] pl-3">
              Statut Stratégique
            </h3>
            <GaugeBlock
              label="Indice de Stabilité"
              value={92}
              color="#10b981"
            />
            <GaugeBlock
              label="Attractivité Fiscale"
              value={86}
              color="#10b981"
            />
            <GaugeBlock label="Cadastre Digital" value={79} color="#3f3f46" />
          </div>

          <div className="p-6 bg-[#10b981]/5 border border-[#10b981]/10 rounded-lg">
            <p className="text-[9px] font-black uppercase text-[#10b981] mb-2 tracking-widest">
              Bilan Fraser 2025
            </p>
            <div className="text-xl font-black italic text-white leading-tight">
              CROISSANCE <br />
              SOUTENUE
            </div>
            <p className="text-[10px] text-zinc-500 mt-4 leading-relaxed font-medium">
              Passage du rang #42 (2021) au{" "}
              <span className="text-white">rang #28 mondial</span> en 2025.
            </p>
          </div>
        </div>

        {/* MAIN CHART : ÉCHELLES JUSTIFIÉES (PRÉSERVÉES) */}
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
                  stroke="#18181b"
                  strokeWidth={0.5}
                />

                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#3f3f46", fontSize: 12, fontWeight: 900 }}
                  dy={15}
                />

                {/* ÉCHELLE Y JUSTIFIANT LE SCORE FRASER */}
                <YAxis
                  domain={[30, 75]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#3f3f46", fontSize: 10, fontWeight: 800 }}
                />

                <ChartTooltip
                  cursor={{ stroke: "#27272a" }}
                  content={<ChartTooltipContent />}
                />

                <Area
                  dataKey="benchmark"
                  type="monotone"
                  stroke="#27272a"
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
                  animationDuration={3000}
                />

                {/* ANNOTATION DE LEADERSHIP RÉEL */}
                <ReferenceLine
                  y={60.92}
                  stroke="#10b981"
                  strokeDasharray="3 3"
                  opacity={0.3}
                >
                  <Label
                    value="THRESHOLD TIER-1"
                    position="right"
                    fill="#10b981"
                    fontSize={9}
                    fontWeight={900}
                  />
                </ReferenceLine>
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* LÉGENDE CARRÉE & ACTUALITÉS (PRÉSERVÉES) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 border-t border-zinc-900 pt-10">
            <NewsCard
              title="Hub Koné (155t d'Or)"
              status="PIVOT 2026"
              desc="Projet phare positionnant la Côte d'Ivoire dans le Top 3 des producteurs africains d'ici 2027."
            />
            <NewsCard
              title="Réforme Fiscale 2025"
              status="SÉCURISÉ"
              desc="Nouveau code minier garantissant la stabilité des investissements et la part de l'État."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPOSANTS UI */

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
    <div className="text-right border-l border-zinc-800 pl-8">
      <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">
        {label}
      </p>
      <div className="flex items-baseline gap-3 justify-end">
        <span className="text-3xl font-black tracking-tighter">{value}</span>
        <span className="text-[9px] font-black text-[#10b981] uppercase italic">
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
        <span className="text-[10px] font-black uppercase tracking-tight text-zinc-500">
          {label}
        </span>
        <span className="text-xs font-mono font-bold" style={{ color }}>
          {value}%
        </span>
      </div>
      <div className="h-[2px] w-full bg-zinc-900 rounded-full">
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
    <div className="p-6 bg-[#050505] border border-zinc-900 rounded-sm hover:border-zinc-700 transition-all">
      <div className="flex justify-between items-center mb-4">
        <div className="h-4 w-4 bg-[#10b981]" /> {/* POINT CARRÉ LÉGENDE */}
        <span className="text-[9px] font-bold text-[#10b981] uppercase tracking-widest">
          {status}
        </span>
      </div>
      <h4 className="text-xs font-black uppercase tracking-tight text-white mb-2">
        {title}
      </h4>
      <p className="text-[10px] leading-relaxed text-zinc-500 font-medium italic">
        "{desc}"
      </p>
    </div>
  );
}
