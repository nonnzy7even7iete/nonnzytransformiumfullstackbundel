"use client";

import * as React from "react";
import { TrendingUp, ShieldCheck, Info } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
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
  others: { label: "Regional Avg", color: "#71717a" },
} satisfies ChartConfig;

export default function InvestorDashboard() {
  const id = React.useId();

  return (
    <Card className="border-none shadow-none bg-transparent font-sans w-full">
      <CardHeader className="px-0 pb-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-[#10b981] p-2 rounded-[4px]">
                <TrendingUp className="h-5 w-5 text-black stroke-[3]" />
              </div>
              <CardTitle className="text-3xl font-black tracking-tighter uppercase italic leading-none text-zinc-950 dark:text-white">
                Sovereign <span className="text-[#10b981]">Index</span>
              </CardTitle>
            </div>
            <div className="flex items-center gap-2 text-zinc-500">
              <Info className="h-3 w-3" />
              <CardDescription className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Fraser Investment Attractiveness Score (0-100)
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-4">
            <DataBadge label="CIV SCORE" value="60.9" color="text-[#10b981]" />
            <DataBadge label="GHA SCORE" value="55.2" color="text-[#f59e0b]" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <ChartContainer config={chartConfig} className="h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ left: 0, right: 60, top: 20, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id={`fillCiv-${id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* Grille horizontale uniquement pour la clarté de l'échelle */}
              <CartesianGrid
                vertical={false}
                stroke="#333333"
                strokeDasharray="3 3"
                opacity={0.2}
              />

              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tickMargin={20}
                tick={{ fontSize: 12, fontWeight: 800, fill: "#71717a" }}
              />

              {/* Échelle Y apparente et précise pour les investisseurs */}
              <YAxis
                orientation="right"
                domain={[30, 70]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: 700, fill: "#71717a" }}
                tickFormatter={(val) => `${val}.0`}
              />

              <ChartTooltip
                cursor={{ stroke: "#10b981", strokeWidth: 1 }}
                content={<ChartTooltipContent />}
              />

              {/* Benchmarks (Région) */}
              {["mali", "burkina", "guinea"].map((key) => (
                <Area
                  key={key}
                  dataKey={key}
                  type="monotone"
                  stroke="#3f3f46"
                  strokeWidth={1}
                  fill="none"
                  opacity={0.3}
                />
              ))}

              {/* Ghana */}
              <Area
                dataKey="ghana"
                type="monotone"
                stroke="#f59e0b"
                strokeWidth={2}
                fill="none"
                strokeDasharray="4 4"
              />

              {/* Côte d'Ivoire - La courbe maîtresse */}
              <Area
                dataKey="civ"
                type="monotone"
                stroke="#10b981"
                strokeWidth={4}
                fill={`url(#fillCiv-${id})`}
              >
                {/* Affiche le score final directement sur le dernier point */}
                <LabelList
                  dataKey="civ"
                  position="top"
                  offset={10}
                  content={(props: any) => {
                    const { x, y, value, index } = props;
                    if (index === chartData.length - 1) {
                      return (
                        <text
                          x={x}
                          y={y - 10}
                          fill="#10b981"
                          fontSize={12}
                          fontWeight={900}
                          textAnchor="middle"
                        >
                          {value}
                        </text>
                      );
                    }
                    return null;
                  }}
                />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="px-0 pt-10 border-t border-zinc-100 dark:border-zinc-900 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-black italic uppercase text-[#10b981]">
              <ShieldCheck className="h-4 w-4" /> Policy Reliability Audit
            </div>
            <p className="text-[11px] font-medium text-zinc-500 leading-relaxed italic">
              "L'inflexion de 2024 résulte de la convergence entre stabilité
              législative et potentiel géologique. Pour un investisseur, la CIV
              présente le profil risque/rendement le plus attractif de la zone
              ECOWAS."
            </p>
          </div>
          <div className="flex justify-end items-center gap-6">
            <div className="text-right">
              <p className="text-[9px] font-black text-zinc-500 uppercase">
                Projection 2026
              </p>
              <p className="text-2xl font-black text-zinc-950 dark:text-white leading-none">
                Tier A+
              </p>
            </div>
            <div className="h-10 w-[1px] bg-zinc-800" />
            <div className="text-right">
              <p className="text-[9px] font-black text-zinc-500 uppercase">
                Confidence Index
              </p>
              <p className="text-2xl font-black text-[#10b981] leading-none">
                94.8%
              </p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function DataBadge({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-end border-l border-zinc-800 pl-4">
      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-tighter">
        {label}
      </span>
      <span className={`text-xl font-black tabular-nums ${color}`}>
        {value}
      </span>
    </div>
  );
}
