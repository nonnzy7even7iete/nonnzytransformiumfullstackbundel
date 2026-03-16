"use client";

import * as React from "react";
import { TrendingUp, ArrowUpRight, ShieldCheck } from "lucide-react";
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
  {
    year: "2021",
    civ: 41.0,
    ghana: 58.2,
    guinea: 42.0,
    mali: 52.4,
    burkina: 45.1,
  },
  {
    year: "2022",
    civ: 48.2,
    ghana: 60.1,
    guinea: 42.0,
    mali: 52.4,
    burkina: 45.1,
  },
  {
    year: "2023",
    civ: 55.7,
    ghana: 62.4,
    guinea: 44.5,
    mali: 50.8,
    burkina: 43.2,
  },
  {
    year: "2024",
    civ: 58.1,
    ghana: 54.8,
    guinea: 46.2,
    mali: 48.5,
    burkina: 40.1,
  },
  {
    year: "2025",
    civ: 59.4,
    ghana: 55.1,
    guinea: 48.1,
    mali: 47.2,
    burkina: 38.5,
  },
  {
    year: "2026",
    civ: 60.9,
    ghana: 55.2,
    guinea: 52.1,
    mali: 46.1,
    burkina: 37.0,
  },
];

const chartConfig = {
  civ: { label: "Côte d'Ivoire", color: "#10b981" },
  ghana: { label: "Ghana", color: "#f59e0b" },
  guinea: { label: "Guinée", color: "#71717a" },
  mali: { label: "Mali", color: "#71717a" },
  burkina: { label: "Burkina", color: "#71717a" },
} satisfies ChartConfig;

// Changement ici : Export default pour éviter l'erreur de module React
export default function SovereignChart() {
  const id = React.useId();

  return (
    <Card className="border-none shadow-none bg-transparent font-sans w-full overflow-hidden">
      <CardHeader className="px-0 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-[#10b981] p-1.5 rounded-[4px]">
                <ArrowUpRight className="h-5 w-5 text-black stroke-[3]" />
              </div>
              <CardTitle className="text-2xl font-black tracking-tighter uppercase italic leading-none">
                Sovereign <span className="text-[#10b981]">Index</span>
              </CardTitle>
            </div>
            <CardDescription className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
              Top 5 ECOWAS • Mining Attractiveness Audit 2021-2026
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full w-fit">
            <ShieldCheck className="h-3 w-3 text-[#10b981]" />
            <span className="text-[9px] font-black uppercase text-zinc-500">
              Tier 1 Sovereign Data
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id={`fillCiv-${id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id={`fillGhana-${id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="#333333"
                strokeDasharray="3 3"
                opacity={0.3}
              />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tickMargin={20}
                tick={{ fontSize: 11, fontWeight: 800, fill: "#71717a" }}
              />
              <YAxis hide domain={[30, 75]} />
              <ChartTooltip
                cursor={{ stroke: "#333333", strokeWidth: 1 }}
                content={<ChartTooltipContent hideLabel />}
              />

              {["mali", "burkina", "guinea"].map((key) => (
                <Area
                  key={key}
                  dataKey={key}
                  type="natural"
                  stroke="#3f3f46"
                  strokeWidth={1}
                  fill="none"
                  opacity={0.4}
                />
              ))}

              <Area
                dataKey="ghana"
                type="natural"
                stroke="#f59e0b"
                strokeWidth={1.5}
                fill="url(#fillGhana)"
                strokeDasharray="4 4"
                opacity={0.6}
              />

              <Area
                dataKey="civ"
                type="natural"
                stroke="#10b981"
                strokeWidth={3}
                fill={`url(#fillCiv-${id})`}
                stackId="none"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="px-0 pt-8 border-t border-zinc-100 dark:border-zinc-900 mt-6">
        <div className="flex w-full items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-black italic uppercase tracking-tighter text-[#10b981] text-base">
              Regional Leadership <TrendingUp className="h-5 w-5" />
            </div>
            <p className="text-[10px] font-medium text-zinc-500 max-w-[300px] leading-relaxed">
              Basé sur l'audit Fraser 2026. La CIV maintient une croissance de
              souveraineté de{" "}
              <span className="text-zinc-900 dark:text-white font-bold">
                18.2%
              </span>
              .
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">
              Status
            </p>
            <p className="text-xs font-mono font-bold text-zinc-900 dark:text-white">
              ACTIVE_DOMINANCE
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
