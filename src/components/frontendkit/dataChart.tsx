"use client";

import React, { useId } from "react";
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

const data = [
  { year: "2020", fraser: null, production: 32 },
  { year: "2021", fraser: null, production: 41 },
  { year: "2022", fraser: null, production: 48 },
  { year: "2023", fraser: 55.7, production: 51 },
  { year: "2024", fraser: null, production: 53 },
  { year: "2025", fraser: 60.92, production: 55 },
];

export default function DataChart() {
  const chartId = useId();

  return (
    <div className="w-full bg-zinc-950 p-6 border border-zinc-800 rounded-xl space-y-4">
      {/* Header simple et direct */}
      <div>
        <h3 className="text-zinc-100 text-lg font-bold">
          Performance Minière CI
        </h3>
        <p className="text-zinc-500 text-xs">
          Évolution Score Fraser vs Production (Tonnes)
        </p>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} id={chartId} margin={{ left: -20, right: 10 }}>
            <defs>
              {/* Gradient Émeraude pour le Score */}
              <linearGradient id="colorFraser" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              {/* Gradient Ambre pour la Production */}
              <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#27272a"
            />

            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#71717a", fontSize: 12 }}
            />

            {/* Deux axes Y pour comparer des échelles différentes sans confusion */}
            <YAxis yAxisId="left" hide domain={[0, 100]} />
            <YAxis yAxisId="right" orientation="right" hide domain={[0, 80]} />

            <Tooltip
              contentStyle={{
                backgroundColor: "#09090b",
                border: "1px solid #27272a",
                borderRadius: "8px",
              }}
              itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
            />

            {/* Zone de Production (Ambre) */}
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="production"
              name="Production (T)"
              stroke="#f59e0b"
              fillOpacity={1}
              fill="url(#colorProd)"
              strokeWidth={2}
            />

            {/* Zone de Score (Émeraude) - Priorité visuelle */}
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="fraser"
              name="Score Fraser"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorFraser)"
              strokeWidth={3}
              connectNulls={false} // Important : ne dessine pas là où c'est vide
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Légende simplifiée au maximum */}
      <div className="flex gap-6 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-zinc-400 text-xs font-medium">
            Attractivité (Fraser)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-zinc-400 text-xs font-medium">
            Production d'Or (Tonnes)
          </span>
        </div>
      </div>
    </div>
  );
}
