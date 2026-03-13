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
import { TrendingUp, Award } from "lucide-react";

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
  { year: "2021", performance: 41, benchmark: 38 },
  { year: "2022", performance: 48, benchmark: 42 },
  { year: "2023", performance: 51, benchmark: 46 },
  { year: "2024", performance: 53, benchmark: 50 },
  { year: "2025", performance: 55, benchmark: 54 },
  { year: "2026", performance: 62, benchmark: 58 },
];

const chartConfig = {
  performance: { label: "Performance Nationale", color: "#10b981" },
  benchmark: { label: "Standard Régional", color: "#f59e0b" },
} satisfies ChartConfig;

export default function MiningSovereigntyChart() {
  return (
    <Card className="border-none bg-transparent shadow-none w-full">
      <CardHeader className="px-0">
        <div className="flex justify-between items-end">
          <div>
            <CardTitle className="text-xl font-black italic uppercase tracking-tighter">
              Indice de Souveraineté{" "}
              <span className="text-emerald-500">Minière</span>
            </CardTitle>
            <CardDescription className="text-[10px] font-bold opacity-60 uppercase tracking-widest">
              Comparatif Temps Réel : Côte d'Ivoire vs CEDEAO
            </CardDescription>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
              OBJECTIF 2026 : ATTEINT
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0 pt-6">
        <div className="h-[400px] w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
              >
                <defs>
                  {/* GRADIENT VERT (PERFORMANCE) */}
                  <linearGradient id="fillPerf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  {/* GRADIENT ORANGE (BENCHMARK) */}
                  <linearGradient id="fillBench" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  vertical={false}
                  stroke="var(--border)"
                  opacity={0.4}
                  strokeDasharray="4 4"
                />

                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={15}
                  tick={{
                    fontSize: 11,
                    fontWeight: 700,
                    fill: "var(--muted-foreground)",
                  }}
                />

                <YAxis hide domain={[30, 75]} />

                {/* LIGNE DE RÉFÉRENCE POUR L'ÉCHELLE INTUITIVE */}
                <ReferenceLine
                  y={60}
                  stroke="var(--muted-foreground)"
                  strokeDasharray="3 3"
                  label={{
                    position: "right",
                    value: "Seuil Excellence",
                    fill: "var(--muted-foreground)",
                    fontSize: 9,
                    fontWeight: "bold",
                  }}
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />

                {/* COURBE ORANGE : BENCHMARK (FINE ET COURBÉE) */}
                <Area
                  dataKey="benchmark"
                  type="natural"
                  stroke="#f59e0b"
                  strokeWidth={1.5}
                  fill="url(#fillBench)"
                  fillOpacity={1}
                />

                {/* COURBE VERTE : PERFORMANCE (ÉPAISSE ET COURBÉE) */}
                <Area
                  dataKey="performance"
                  type="natural"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fill="url(#fillPerf)"
                  fillOpacity={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>

      <CardFooter className="px-0 flex-col items-start gap-4 border-t border-border pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
          <div className="flex gap-2 font-bold leading-none items-center text-sm">
            <div className="p-2 bg-emerald-500/10 rounded-full">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div>
              <p>Performance CI en hausse de 18.2%</p>
              <p className="text-[10px] text-muted-foreground font-normal tracking-tight">
                Analyse basée sur les rapports officiels 2026
              </p>
            </div>
          </div>
          <div className="flex gap-2 font-bold leading-none items-center text-sm">
            <div className="p-2 bg-amber-500/10 rounded-full">
              <Award className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <p>Convergence Benchmark Afrique</p>
              <p className="text-[10px] text-muted-foreground font-normal tracking-tight">
                Gap réduit de 4.2 points en 12 mois
              </p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
