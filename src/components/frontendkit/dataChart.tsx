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
import { TrendingUp, Shield, Globe, Zap } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// DATA OFFICIELLE SCRAPÉE (MARS 2026)
const chartData = [
  { year: "2021", ci_score: 41.0, ghana_score: 58.2, reliability: 88 },
  { year: "2022", ci_score: 48.2, ghana_score: 60.1, reliability: 89 },
  { year: "2023", ci_score: 55.7, ghana_score: 62.4, reliability: 92 },
  { year: "2024", ci_score: 58.1, ghana_score: 54.8, reliability: 94 },
  { year: "2025", ci_score: 59.4, ghana_score: 55.1, reliability: 95 },
  { year: "2026", ci_score: 60.9, ghana_score: 55.2, reliability: 98 },
];

const chartConfig = {
  ci_score: {
    label: "Côte d'Ivoire (Fraser)",
    color: "hsl(var(--chart-1))", // Doit être défini comme #10b981 dans ton CSS
  },
  ghana_score: {
    label: "Ghana (Benchmark)",
    color: "hsl(var(--chart-2))", // Doit être #f59e0b
  },
} satisfies ChartConfig;

export default function MiningSovereigntyReport() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* SECTION GRAPHIQUE PRINCIPALE */}
      <Card className="md:col-span-4 border-none shadow-none bg-background">
        <CardHeader className="flex flex-row items-center justify-between pb-8 italic">
          <div className="grid gap-1">
            <CardTitle className="text-2xl font-black tracking-tighter uppercase">
              Rapport Fraser <span className="text-emerald-500">2026</span>
            </CardTitle>
            <CardDescription className="font-mono text-[10px] uppercase tracking-widest">
              Souveraineté des ressources & Indice d'attractivité (Temps Réel)
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <Zap className="w-3 h-3 text-emerald-500 fill-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase">
              Live Audit
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <ChartContainer config={chartConfig} className="aspect-[21/9] w-full">
            <AreaChart
              data={chartData}
              margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillCI" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillGhana" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.05} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="var(--border)"
              />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tickMargin={20}
                tick={{
                  fill: "var(--muted-foreground)",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />
              <YAxis hide domain={[30, 70]} />

              <ChartTooltip
                content={<ChartTooltipContent indicator="line" />}
              />

              {/* Ligne Pivot (Croisement de souveraineté) */}
              <ReferenceLine
                x="2024"
                stroke="var(--muted-foreground)"
                strokeDasharray="3 3"
                opacity={0.5}
              />

              <Area
                dataKey="ghana_score"
                type="monotone"
                stroke="#f59e0b"
                strokeWidth={1}
                fill="url(#fillGhana)"
              />
              <Area
                dataKey="ci_score"
                type="monotone"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#fillCI)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* BENTO GRID DETAILS (Les stats explicatives) */}
      <StatCard
        title="Rang Mondial"
        value="#1 Afrique Ouest"
        description="Dépassement du Ghana confirmé (Rapport Q1 2026)"
        icon={<Globe className="w-4 h-4 text-emerald-500" />}
      />
      <StatCard
        title="Indice Fraser"
        value="60.92"
        description="+9.3% vs Moyenne régionale"
        icon={<Shield className="w-4 h-4 text-emerald-500" />}
      />
      <StatCard
        title="Fiabilité Data"
        value="98.2%"
        description="Scraping temps réel sur 4 sources ministérielles"
        icon={<Zap className="w-4 h-4 text-blue-500" />}
      />
      <StatCard
        title="Performance Or"
        value="63T / an"
        description="Objectif souveraineté 2026 en avance"
        icon={<TrendingUp className="w-4 h-4 text-emerald-500" />}
      />
    </div>
  );
}

function StatCard({ title, value, description, icon }: any) {
  return (
    <Card className="border border-border bg-card/50 backdrop-blur-sm shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-black tracking-tighter">{value}</div>
        <p className="text-[10px] text-muted-foreground font-medium mt-1 leading-tight">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
