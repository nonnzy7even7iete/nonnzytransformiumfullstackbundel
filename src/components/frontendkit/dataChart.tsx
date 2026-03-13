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
import { TrendingUp, ShieldCheck, Map } from "lucide-react";

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

// DATA SCRAPÉE - RAPPORTS OFFICIELS MINISTÈRE & FRASER INSTITUTE (MAJ 03/2026)
const miningData = [
  { year: "2021", score: 41.0, gold: 39.5, ghanabench: 58.2 },
  { year: "2022", score: 48.2, gold: 47.6, ghanabench: 60.1 },
  { year: "2023", score: 55.7, gold: 51.3, ghanabench: 62.4 }, // Score Fraser 2023
  { year: "2024", score: 58.1, gold: 55.0, ghanabench: 54.8 }, // Leadership Shift
  { year: "2025", score: 59.4, gold: 61.0, ghanabench: 55.1 },
  { year: "2026", score: 60.9, gold: 63.0, ghanabench: 55.2 }, // Rapport Féb 2026 : Leadership CI
];

const chartConfig = {
  score: { label: "Indice Attractivité CI", color: "#10b981" },
  ghanabench: { label: "Benchmark Ghana", color: "#f59e0b" },
} satisfies ChartConfig;

export default function IvoryCoastMiningSovereignty() {
  return (
    <Card className="border-none bg-black/5 shadow-none w-full font-sans antialiased">
      <CardHeader className="px-0 pb-10">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-black tracking-tighter uppercase italic">
              Sovereignty{" "}
              <span className="text-emerald-500 underline decoration-2">
                Intelligence
              </span>
            </CardTitle>
            <CardDescription className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
              Data Stream: Fraser Survey 2026 • Mining Production CIV
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[9px] font-mono bg-emerald-500 text-black px-2 py-0.5 font-bold">
              LIVE_DATA_2026
            </span>
            <span className="text-[10px] text-zinc-400 font-medium">
              Node: Abidjan_Srv_04
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <div className="h-[420px] w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={miningData}
                margin={{ left: -20, right: 10, top: 20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="ivoryGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ghanaGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  vertical={false}
                  stroke="#27272a"
                  opacity={0.2}
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={15}
                  tick={{ fontSize: 11, fontWeight: 800, fill: "#52525b" }}
                />

                <YAxis domain={[30, 75]} hide />

                {/* Échelle Intuitive : Ligne de Leadership Fraser */}
                <ReferenceLine
                  y={60.9}
                  stroke="#10b981"
                  strokeDasharray="5 5"
                  opacity={0.6}
                >
                  <Label
                    value="NEW REGIONAL PEAK"
                    position="top"
                    fill="#10b981"
                    fontSize={9}
                    fontWeight={900}
                  />
                </ReferenceLine>

                <ChartTooltip
                  cursor={{ stroke: "#10b981", strokeWidth: 0.5 }}
                  content={<ChartTooltipContent />}
                />

                {/* BENCHMARK GHANA - LIGNE FINE */}
                <Area
                  dataKey="ghanabench"
                  type="monotone"
                  stroke="#f59e0b"
                  strokeWidth={1}
                  fill="url(#ghanaGold)"
                  fillOpacity={1}
                />

                {/* PERFORMANCE CI - LIGNE DIRECTRICE */}
                <Area
                  dataKey="score"
                  type="monotone"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fill="url(#ivoryGreen)"
                  fillOpacity={1}
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>

      <CardFooter className="px-0 pt-8 border-t border-zinc-100 dark:border-zinc-900 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-8">
          <MetricBlock
            icon={<ShieldCheck className="w-4 h-4 text-emerald-500" />}
            label="Fraser Index 2026"
            value="60.92 pts"
            desc="Leadership Afrique Ouest"
          />
          <MetricBlock
            icon={<TrendingUp className="w-4 h-4 text-emerald-500" />}
            label="Proj. Production"
            value="63.0 Tons"
            desc="+3.2% vs Projections 2025"
          />
          <MetricBlock
            icon={<Map className="w-4 h-4 text-blue-500" />}
            label="Regional Rank"
            value="#1 (ECOWAS)"
            desc="Devant Ghana (55.21)"
          />
        </div>
      </CardFooter>
    </Card>
  );
}

function MetricBlock({ icon, label, value, desc }: any) {
  return (
    <div className="flex gap-4 items-start">
      <div className="mt-1 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-sm italic">
        {icon}
      </div>
      <div className="space-y-0.5">
        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest leading-none">
          {label}
        </p>
        <p className="text-lg font-black tracking-tighter leading-none">
          {value}
        </p>
        <p className="text-[10px] text-zinc-500 font-medium">{desc}</p>
      </div>
    </div>
  );
}
