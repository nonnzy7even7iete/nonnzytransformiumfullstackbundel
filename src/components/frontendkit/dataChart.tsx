"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

const MINING_PERFORMANCE = [
  { year: "2023", score: 55.7 },
  { year: "2024", score: 52.1 },
  { year: "2025", score: 60.92 },
];

export default function MiningDashboard() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground p-6 md:p-12 transition-colors duration-300">
      {/* HEADER : LOGIQUE DE POSITIONNEMENT */}
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-green-300 rounded-full" />
          <p className="text-xs font-black tracking-[0.3em] uppercase opacity-50">
            Secteur Extractif CI
          </p>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase">
          L'Ascension du <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-400">
            Top 5 Africain
          </span>
        </h1>
      </header>

      {/* GRID DE KPIs : LOGIQUE DE FLUX */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Indice d'Attractivité"
          value="60.92"
          trend="+9.3%"
          description="Score Global Fraser 2025"
        />
        <StatCard
          label="Avantage Régional"
          value="+5.71"
          trend="Leadership"
          description="Différentiel vs Ghana (55.21)"
        />
        <StatCard
          label="Rang Mondial"
          value="47"
          trend="Stable"
          description="Sur 68 juridictions évaluées"
        />
      </div>

      {/* CHART : GRADIENT GREEN LOGIC */}
      <div className="w-full h-[400px] rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="font-bold text-lg uppercase tracking-tight">
              Courbe de Redressement
            </h3>
            <p className="text-sm opacity-50">
              Analyse historique de l'attractivité (2023-2025)
            </p>
          </div>
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold">
            Live Data 2026
          </div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MINING_PERFORMANCE}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="currentColor"
              opacity={0.1}
            />
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "currentColor", opacity: 0.5, fontSize: 12 }}
            />
            <YAxis hide={true} domain={[50, 65]} />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #10b98133",
                background: "hsl(var(--card))",
              }}
              itemStyle={{ color: "#10b981", fontWeight: "bold" }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#10b981"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#chartGradient)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, description }: any) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card hover:border-emerald-500/50 transition-all duration-500">
      <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">
        {label}
      </p>
      <div className="flex items-baseline gap-2 mb-1">
        <h2 className="text-4xl font-black tabular-nums">{value}</h2>
        <span className="text-emerald-500 font-bold text-xs uppercase italic">
          {trend}
        </span>
      </div>
      <p className="text-xs opacity-60 font-medium">{description}</p>
    </div>
  );
}
