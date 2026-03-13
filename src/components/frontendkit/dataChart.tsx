"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

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

// Données nettoyées (zéro null pour le test de visibilité)
const chartData = [
  { year: "2021", performance: 41, benchmark: 38 },
  { year: "2022", performance: 48, benchmark: 42 },
  { year: "2023", performance: 51, benchmark: 46 },
  { year: "2024", performance: 53, benchmark: 50 },
  { year: "2025", performance: 55, benchmark: 54 },
  { year: "2026", performance: 62, benchmark: 58 },
];

const chartConfig = {
  performance: { label: "Performance", color: "#10b981" }, // Vert direct
  benchmark: { label: "Benchmark", color: "#f59e0b" }, // Orange direct
} satisfies ChartConfig;

export default function MiningSovereigntyChart() {
  return (
    <Card className="border-none bg-transparent shadow-none w-full">
      <CardHeader className="px-0">
        <CardTitle className="text-sm font-black uppercase tracking-[0.3em]">
          Mining Intelligence Index
        </CardTitle>
        <CardDescription className="text-[10px] uppercase tracking-widest">
          Souveraineté • Performance vs Benchmark Afrique 2026
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        {/* On s'assure que le container a une hauteur fixe pour le rendu */}
        <div className="h-[350px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
              >
                <defs>
                  {/* Gradients avec IDs uniques */}
                  <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorBench" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  opacity={0.3}
                />

                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={15}
                  tick={{ fontSize: 10, fontWeight: 600, fill: "#71717a" }}
                />

                {/* On force l'axe Y à exister mais sans le voir pour caler l'échelle */}
                <YAxis hide domain={[30, 70]} />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />

                {/* LIGNE BENCHMARK (ORANGE) */}
                <Area
                  dataKey="benchmark"
                  type="monotone"
                  stroke="#f59e0b"
                  strokeWidth={1.5}
                  fill="url(#colorBench)"
                  fillOpacity={1}
                />

                {/* LIGNE PERFORMANCE (VERTE) */}
                <Area
                  dataKey="performance"
                  type="monotone"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#colorPerf)"
                  fillOpacity={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="px-0 pt-6">
        <div className="flex items-center gap-2 font-bold text-sm">
          Croissance Q1 2026 +18.2%{" "}
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        </div>
      </CardFooter>
    </Card>
  );
}
