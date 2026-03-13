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
import { TrendingUp, Zap, ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// Interface stricte pour TypeScript
interface MiningDataPoint {
  year: string;
  civ: number;
  ghana: number;
  mali: number;
  burkina: number;
  guinea: number;
}

const eliteData: MiningDataPoint[] = [
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
    civ: 60.92,
    ghana: 55.21,
    mali: 46.1,
    burkina: 37.05,
    guinea: 52.14,
  },
];

const chartConfig = {
  civ: { label: "CÔTE D'IVOIRE (IAI)", color: "#10b981" },
  ghana: { label: "GHANA (BENCHMARK)", color: "#f59e0b" },
  mali: { label: "MALI", color: "#71717a" },
  burkina: { label: "BURKINA FASO", color: "#3f3f46" },
  guinea: { label: "RÉP. GUINÉE", color: "#a1a1aa" },
} satisfies ChartConfig;

export default function SovereignPrecisionDashboard() {
  const chartId = React.useId();

  return (
    <div className="w-full bg-black p-8 border border-zinc-900 font-sans tracking-tight text-zinc-100">
      {/* HEADER : SCALING ARROW */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-800/60 pb-8 mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500 rounded-sm">
            <ArrowUpRight className="text-black w-6 h-6 stroke-[3px]" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">
              Sovereign <span className="text-emerald-500 italic">Index</span>
            </h1>
            <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.3em]">
              Real-time Mining Intelligence • V.2026.03
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-l border-zinc-800 pl-8">
          <HeaderMetric label="Fraser Score" value="60.92" sub="+1.52%" />
          <HeaderMetric label="Region Rank" value="#01" sub="ECOWAS" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* MAIN CHART ENGINE */}
        <div className="lg:col-span-9 space-y-4">
          <ChartContainer config={chartConfig} className="h-[420px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={eliteData}
                margin={{ left: 60, right: 20, top: 10 }}
              >
                <defs>
                  <linearGradient
                    id={`fillCIV-${chartId}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  vertical={false}
                  stroke="#18181b"
                  strokeDasharray="2 2"
                />

                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#52525b", fontSize: 10, fontWeight: 800 }}
                  dy={15}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#3f3f46",
                    fontSize: 9,
                    fontWeight: 900,
                    fontFamily: "monospace",
                  }}
                  ticks={[37, 46, 52, 55, 61]}
                  tickFormatter={(val) => {
                    const labels: Record<number, string> = {
                      61: "CIV (60.92)",
                      55: "GHA (55.21)",
                      52: "GUI (52.14)",
                      46: "MLI (46.10)",
                      37: "BFA (37.05)",
                    };
                    return labels[val] || "";
                  }}
                />

                <ChartTooltip
                  cursor={{ stroke: "#27272a", strokeWidth: 1 }}
                  content={<ChartTooltipContent hideLabel />}
                />

                {/* BENCHMARKS */}
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
                  strokeDasharray="3 3"
                  opacity={0.6}
                />

                {/* LEADER */}
                <Area
                  dataKey="civ"
                  type="monotone"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill={`url(#fillCIV-${chartId})`}
                  dot={{
                    r: 4,
                    fill: "#10b981",
                    strokeWidth: 2,
                    stroke: "#000",
                  }}
                />

                <ReferenceLine
                  x="2024"
                  stroke="#10b981"
                  strokeDasharray="4 4"
                  opacity={0.4}
                >
                  <Label
                    value="LEADERSHIP CAPTURE"
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

        {/* SIDEBAR */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          <section className="space-y-4">
            <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <Zap className="w-3 h-3 fill-emerald-500" /> Technical Report
            </h4>
            <div className="space-y-3">
              <LogItem label="Rank" value="Global Tier A" />
              <LogItem label="Stability" value="94.2/100" />
            </div>
          </section>

          <section className="bg-zinc-900/40 p-5 border border-zinc-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black uppercase text-zinc-500">
                2026 Production
              </span>
              <TrendingUp className="w-3 h-3 text-emerald-500" />
            </div>
            <div className="text-2xl font-black tracking-tighter tabular-nums text-white">
              63.0
              <span className="text-zinc-500 text-sm ml-1 uppercase">Tons</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// SOUS-COMPOSANTS TYPÉS POUR ÉVITER LES ERREURS VS CODE
function HeaderMetric({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-black tracking-tighter text-white tabular-nums">
          {value}
        </span>
        <span className="text-[9px] font-bold text-emerald-500 italic uppercase">
          {sub}
        </span>
      </div>
    </div>
  );
}

function LogItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
      <span className="text-[9px] font-bold text-zinc-500 uppercase">
        {label}
      </span>
      <span className="text-[10px] font-mono font-black text-zinc-200">
        {value}
      </span>
    </div>
  );
}
