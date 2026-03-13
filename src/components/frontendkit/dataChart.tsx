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
import { TrendingUp, ShieldCheck, Globe, Zap, Crown } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// Types stricts pour VS Code
interface EliteDataPoint {
  year: string;
  civ: number;
  ghana: number;
  mali: number;
  burkina: number;
  guinea: number;
}

const eliteData: EliteDataPoint[] = [
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
  civ: { label: "Côte d'Ivoire", color: "#10b981" },
  ghana: { label: "Ghana", color: "#f59e0b" },
  mali: { label: "Mali", color: "#71717a" },
  burkina: { label: "Burkina Faso", color: "#3f3f46" },
  guinea: { label: "Guinée", color: "#a1a1aa" },
} satisfies ChartConfig;

export default function EliteMiningDashboard() {
  const chartId = React.useId();

  return (
    <div className="w-full space-y-6 bg-black p-4 md:p-8 border border-zinc-900">
      {/* HEADER PROFESSIONNEL */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-zinc-800 pb-8 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Crown className="text-emerald-500 w-5 h-5" />
            <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white">
              Sovereign{" "}
              <span className="text-emerald-500 underline decoration-4 underline-offset-4">
                Mining
              </span>{" "}
              Terminal
            </h1>
          </div>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em]">
            TOP 5 WEST AFRICAN PRODUCERS • FRASER INDEX AUDIT 2026
          </p>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col items-end leading-none">
            <span className="text-[8px] text-zinc-600 font-black uppercase tracking-widest mb-1">
              Status
            </span>
            <span className="text-xs font-mono font-bold text-emerald-500">
              DOMINANT
            </span>
          </div>
          <div className="flex flex-col items-end leading-none">
            <span className="text-[8px] text-zinc-600 font-black uppercase tracking-widest mb-1">
              Confidence
            </span>
            <span className="text-xs font-mono font-bold text-blue-500">
              99.2%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 bg-transparent border-none shadow-none p-0">
          <CardContent className="p-0">
            <ChartContainer config={chartConfig} className="h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={eliteData}
                  margin={{ left: -20, right: 0, top: 20 }}
                >
                  <defs>
                    <linearGradient
                      id={`fillCIV-${chartId}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
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
                    tick={{ fill: "#52525b", fontSize: 11, fontWeight: 800 }}
                    dy={15}
                  />
                  <YAxis hide domain={[30, 70]} />

                  <ChartTooltip
                    cursor={{ stroke: "#27272a", strokeWidth: 1 }}
                    content={<ChartTooltipContent />}
                  />

                  {/* BENCHMARKS (GRIS) */}
                  {["mali", "burkina", "guinea"].map((key) => (
                    <Area
                      key={key}
                      dataKey={key}
                      type="monotone"
                      stroke="#27272a"
                      strokeWidth={1}
                      fill="none"
                      opacity={0.4}
                      animationDuration={1000}
                    />
                  ))}

                  {/* GHANA CHALLENGER */}
                  <Area
                    dataKey="ghana"
                    type="monotone"
                    stroke="#f59e0b"
                    strokeWidth={1.5}
                    fill="none"
                    strokeDasharray="4 4"
                  />

                  {/* COTE D'IVOIRE LEADER */}
                  <Area
                    dataKey="civ"
                    type="monotone"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill={`url(#fillCIV-${chartId})`}
                    animationDuration={2500}
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
                    strokeDasharray="3 3"
                    opacity={0.5}
                  >
                    <Label
                      value="Sovereignty Pivot"
                      position="top"
                      fill="#10b981"
                      fontSize={10}
                      fontWeight={900}
                    />
                  </ReferenceLine>
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* SIDEBAR ANALYSE */}
        <div className="space-y-6">
          <div className="space-y-2 border-l-2 border-emerald-500 pl-4 py-1">
            <h4 className="text-[11px] font-black text-white uppercase tracking-tighter italic">
              Leadership Analysis
            </h4>
            <p className="text-[10px] text-zinc-500 leading-relaxed font-medium tracking-tight">
              La Côte d'Ivoire affiche une corrélation de 0.94 entre stabilité
              et attractivité. Le dépassement du Ghana en 2024 marque l'ère de
              la souveraineté totale.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <RankingItem rank="01" name="Côte d'Ivoire" score="60.9" active />
            <RankingItem rank="02" name="Ghana" score="55.2" active={false} />
            <RankingItem rank="03" name="Guinée" score="52.1" active={false} />
            <RankingItem rank="04" name="Mali" score="46.1" active={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant de ligne de classement typé
function RankingItem({
  rank,
  name,
  score,
  active,
}: {
  rank: string;
  name: string;
  score: string;
  active: boolean;
}) {
  return (
    <div
      className={`flex justify-between items-center p-2 border transition-all ${
        active
          ? "bg-emerald-500/10 border-emerald-500/30"
          : "bg-zinc-900/30 border-zinc-800"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`text-[10px] font-black ${
            active ? "text-emerald-500" : "text-zinc-600"
          }`}
        >
          {rank}
        </span>
        <span
          className={`text-[11px] font-bold uppercase ${
            active ? "text-white" : "text-zinc-400"
          }`}
        >
          {name}
        </span>
      </div>
      <span
        className={`text-[10px] font-mono font-bold ${
          active ? "text-emerald-500" : "text-zinc-500"
        }`}
      >
        {score}
      </span>
    </div>
  );
}
