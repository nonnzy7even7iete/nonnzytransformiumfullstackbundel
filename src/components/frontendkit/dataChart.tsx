"use client";

import * as React from "react";
import { TrendingUp, Globe, ShieldCheck } from "lucide-react";
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
  { year: "2021", performance: 41, benchmark: 38, reliability: 45 },
  { year: "2022", performance: 48, benchmark: 42, reliability: 48 },
  { year: "2023", performance: 51, benchmark: 46, reliability: 55.7 },
  { year: "2024", performance: 53, benchmark: 50, reliability: 58 },
  { year: "2025", performance: 55, benchmark: 54, reliability: 60.92 },
  { year: "2026", performance: 62, benchmark: 58, reliability: 66 },
];

const chartConfig = {
  performance: { label: "Performance", color: "hsl(var(--chart-1))" },
  benchmark: { label: "Benchmark", color: "hsl(var(--chart-2))" },
  reliability: { label: "Fiabilité", color: "hsl(var(--foreground))" },
} satisfies ChartConfig;

// UTILISE "export default" pour faciliter l'import dynamique
export default function MiningSovereigntyChart() {
  const chartId = React.useId();

  return (
    <Card className="border-none bg-transparent shadow-none w-full overflow-hidden">
      <CardHeader className="px-0">
        <CardTitle className="text-sm font-black uppercase tracking-[0.3em]">
          Mining Intelligence Index
        </CardTitle>
        <CardDescription className="text-[10px] uppercase tracking-widest">
          Souveraineté • Performance vs Benchmark Afrique 2026
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer config={chartConfig}>
          {/* ResponsiveContainer est crucial ici */}
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart
              data={chartData}
              margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillPerf" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-performance)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-performance)"
                    stopOpacity={0}
                  />
                </linearGradient>
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
              <YAxis hide domain={[30, 75]} />

              {/* Le Tooltip Shadcn peut parfois causer l'erreur 306 s'il mal configuré */}
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Area
                dataKey="benchmark"
                type="monotone"
                fill="url(#fillBench)"
                stroke="var(--color-benchmark)"
                strokeWidth={1}
              />
              <Area
                dataKey="performance"
                type="monotone"
                fill="url(#fillPerf)"
                stroke="var(--color-performance)"
                strokeWidth={1.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="px-0 pt-6">
        <div className="flex w-full items-start gap-4 text-sm border-t border-border pt-4">
          <div className="flex items-center gap-2 font-bold leading-none">
            Croissance Q1 2026 +18.2%{" "}
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
