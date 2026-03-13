"use client";

import { TrendingUp, ShieldCheck, Globe } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
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

// DATA OFFICIELLE & PROJECTIONS 2026
const chartData = [
  { year: "2021", performance: 41, benchmark: 38, reliability: 45 },
  { year: "2022", performance: 48, benchmark: 42, reliability: 48 },
  { year: "2023", performance: 51, benchmark: 46, reliability: 55 },
  { year: "2024", performance: 53, benchmark: 50, reliability: 58 },
  { year: "2025", performance: 55, benchmark: 54, reliability: 61 },
  { year: "2026", performance: 62, benchmark: 58, reliability: 66 }, // Projection Q1 2026
];

// CONFIGURATION DES COULEURS (Basé sur ton CSS)
const chartConfig = {
  performance: {
    label: "Performance CI",
    color: "hsl(var(--chart-1))", // Vert émeraude
  },
  benchmark: {
    label: "Moyenne Afrique",
    color: "hsl(var(--chart-2))", // Orange ambre
  },
  reliability: {
    label: "Indice Fraser",
    color: "hsl(var(--foreground))", // Blanc/Noir selon le mode
  },
} satisfies ChartConfig;

export function MiningSovereigntyChart() {
  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-sm font-black uppercase tracking-[0.3em]">
          Mining Intelligence Index
        </CardTitle>
        <CardDescription className="text-[10px] uppercase tracking-widest">
          Souveraineté • Performance vs Benchmark Afrique 2026
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <AreaChart
            data={chartData}
            margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
          >
            <defs>
              {/* GRADIENT PERFORMANCE (VERT) */}
              <linearGradient id="fillPerf" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-performance)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-performance)"
                  stopOpacity={0}
                />
              </linearGradient>
              {/* GRADIENT BENCHMARK (ORANGE) */}
              <linearGradient id="fillBench" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-benchmark)"
                  stopOpacity={0.1}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-benchmark)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="var(--border)"
              opacity={0.5}
            />

            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={15}
              tick={{
                fontSize: 10,
                fontWeight: 600,
                fill: "var(--muted-foreground)",
              }}
            />

            {/* ÉCHELLE SIMPLE : On cache l'axe Y pour la pureté visuelle */}
            <YAxis hide domain={[30, 75]} />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            {/* LIGNE ORANGE : BENCHMARK (FIN) */}
            <Area
              dataKey="benchmark"
              type="monotone"
              fill="url(#fillBench)"
              stroke="var(--color-benchmark)"
              strokeWidth={1}
              fillOpacity={1}
            />

            {/* LIGNE BLANCHE : FIABILITÉ / FRASER (TRES FIN) */}
            <Area
              dataKey="reliability"
              type="monotone"
              fill="none"
              stroke="var(--color-reliability)"
              strokeWidth={0.5}
              strokeDasharray="4 4"
              opacity={0.5}
            />

            {/* LIGNE VERTE : PERFORMANCE (PRINCIPALE) */}
            <Area
              dataKey="performance"
              type="monotone"
              fill="url(#fillPerf)"
              stroke="var(--color-performance)"
              strokeWidth={1.5}
              fillOpacity={1}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="px-0 pt-6">
        <div className="flex w-full items-start gap-4 text-sm border-t border-border pt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-black text-muted-foreground tracking-tighter">
                Statut Croissance
              </span>
              <span className="font-bold flex items-center gap-1">
                +18.2% <TrendingUp className="h-3 w-3 text-emerald-500" />
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-black text-muted-foreground tracking-tighter">
                Position Regionale
              </span>
              <span className="font-bold flex items-center gap-1 text-amber-500">
                Top 3 <Globe className="h-3 w-3" />
              </span>
            </div>
            <div className="flex flex-col hidden md:flex">
              <span className="text-[9px] uppercase font-black text-muted-foreground tracking-tighter">
                Indice Fraser 2026
              </span>
              <span className="font-bold flex items-center gap-1">
                66.0 <ShieldCheck className="h-3 w-3 text-zinc-400" />
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
