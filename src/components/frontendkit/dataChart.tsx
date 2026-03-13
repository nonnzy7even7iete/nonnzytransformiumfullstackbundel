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
  Label,
} from "recharts";
import { Crown, Zap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// DATA SCRAPÉE 2026 - TOP 5 ECOWAS
const eliteData = [
  {
    year: "2022",
    civ: 48.2,
    ghana: 60.1,
    mali: 52.4,
    burkina: 45.1,
    guinea: 42.0,
  },
  {
    year: "2023",
    civ: 55.7,
    ghana: 62.4,
    mali: 50.8,
    burkina: 43.2,
    guinea: 44.5,
  },
  {
    year: "2024",
    civ: 58.1,
    ghana: 54.8,
    mali: 48.5,
    burkina: 40.1,
    guinea: 46.2,
  },
  {
    year: "2025",
    civ: 59.4,
    ghana: 55.1,
    mali: 47.2,
    burkina: 38.5,
    guinea: 48.1,
  },
  {
    year: "2026",
    civ: 60.9,
    ghana: 55.2,
    mali: 46.1,
    burkina: 37.0,
    guinea: 52.1,
  },
];

const chartConfig = {
  civ: { label: "CÔTE D'IVOIRE", color: "#10b981" },
  ghana: { label: "GHANA", color: "#f59e0b" },
  mali: { label: "MALI", color: "#71717a" },
  burkina: { label: "BURKINA", color: "#3f3f46" },
  guinea: { label: "GUINÉE", color: "#a1a1aa" },
} satisfies ChartConfig;

export default function EliteMiningDashboard() {
  const chartId = React.useId();

  return (
    <div className="w-full bg-black p-6 border border-zinc-900 font-sans tracking-tight">
      {/* HEADER ÉPURÉ & MODERNE */}
      <div className="flex justify-between items-center border-b border-zinc-800/50 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-full">
            <Crown className="text-emerald-500 w-4 h-4" />
          </div>
          <h1 className="text-lg font-black tracking-[0.2em] uppercase text-white">
            Sovereign <span className="text-emerald-500">Index</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 border-l border-zinc-800 pl-6 text-[10px] font-mono">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-400 uppercase">Audit Q1_2026</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CHART SECTION (9 COLUMNS) */}
        <div className="lg:col-span-9">
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={eliteData}
                margin={{ left: 40, right: 10, top: 10 }}
              >
                <defs>
                  <linearGradient
                    id={`fillCIV-${chartId}`}
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
                  tick={{ fill: "#52525b", fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />

                {/* AXE Y ORGANISÉ AVEC LABELS PAYS */}
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#3f3f46", fontSize: 9, fontWeight: 800 }}
                  ticks={[37, 46, 52, 55, 61]}
                  tickFormatter={(val) => {
                    if (val === 61) return "CIV #1";
                    if (val === 55) return "GHANA";
                    if (val === 52) return "GUINÉE";
                    if (val === 46) return "MALI";
                    if (val === 37) return "BURKINA";
                    return "";
                  }}
                />

                <ChartTooltip
                  cursor={{ stroke: "#27272a", strokeWidth: 1 }}
                  content={<ChartTooltipContent />}
                />

                {/* BENCHMARKS SPECTRÉS */}
                {["mali", "burkina", "guinea"].map((key) => (
                  <Area
                    key={key}
                    dataKey={key}
                    type="monotone"
                    stroke="#27272a"
                    strokeWidth={1}
                    fill="none"
                    opacity={0.3}
                  />
                ))}

                <Area
                  dataKey="ghana"
                  type="monotone"
                  stroke="#f59e0b"
                  strokeWidth={1}
                  fill="none"
                  strokeDasharray="4 4"
                  opacity={0.5}
                />

                {/* DOMINATION IVOIRIENNE */}
                <Area
                  dataKey="civ"
                  type="monotone"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fill={`url(#fillCIV-${chartId})`}
                  dot={{ r: 3, fill: "#10b981", strokeWidth: 0 }}
                />

                <ReferenceLine
                  x="2024"
                  stroke="#10b981"
                  strokeDasharray="3 3"
                  opacity={0.3}
                >
                  <Label
                    value="LEADERSHIP SHIFT"
                    position="top"
                    fill="#10b981"
                    fontSize={8}
                    fontWeight={900}
                  />
                </ReferenceLine>
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* SIDEBAR D'ANALYSE MINIMALISTE (3 COLUMNS) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-l-2 border-emerald-500 pl-3">
              Insights
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              Corrélation entre l'indice Fraser (
              <span className="text-white">60.9</span>) et la stabilité fiscale
              post-2024.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-zinc-900">
            <div className="flex justify-between items-center text-[10px] font-bold">
              <span className="text-zinc-500 uppercase">Global Ranking</span>
              <span className="text-emerald-500 italic">Tier A</span>
            </div>
            <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[85%]" />
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <MetricSmall label="Gap vs Ghana" value="+5.72" />
            <MetricSmall label="Reliability" value="99.2%" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricSmall({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
      <span className="text-[9px] font-black text-zinc-600 uppercase tracking-tighter">
        {label}
      </span>
      <span className="text-[10px] font-mono font-bold text-white">
        {value}
      </span>
    </div>
  );
}
