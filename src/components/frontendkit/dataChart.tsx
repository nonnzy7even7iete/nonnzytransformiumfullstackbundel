"use client";

import React, { useState, useEffect } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const miningAttractivenessCI = [
  {
    year: 2020,
    fraser_score: null,
    gold_production_tonnes: 32,
    mining_investment_usd: 1500000000,
  },
  {
    year: 2021,
    fraser_score: null,
    gold_production_tonnes: 41,
    mining_investment_usd: 1600000000,
  },
  {
    year: 2022,
    fraser_score: null,
    gold_production_tonnes: 48,
    mining_investment_usd: 1700000000,
  },
  {
    year: 2023,
    fraser_score: 55.7,
    gold_production_tonnes: 51,
    mining_investment_usd: 1850000000,
  },
  {
    year: 2024,
    fraser_score: null,
    gold_production_tonnes: 53,
    mining_investment_usd: 1950000000,
  },
  {
    year: 2025,
    fraser_score: 60.92,
    gold_production_tonnes: 55,
    mining_investment_usd: 2000000000,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="p-4 bg-background/95 backdrop-blur-md border shadow-xl"
        style={{
          borderColor: "var(--border-color)",
          borderRadius: "var(--radius-vercel-zy)",
        }}
      >
        <p
          className="text-[11px] font-black text-emerald-500 mb-2 uppercase tracking-widest border-b pb-1"
          style={{ borderColor: "var(--border-color)" }}
        >
          Analyse Annuelle {label}
        </p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center gap-8 text-[12px]"
            >
              <span className="text-muted-foreground font-medium">
                {entry.name}
              </span>
              <span
                className="font-bold tabular-nums"
                style={{ color: entry.color }}
              >
                {entry.name.includes("USD")
                  ? `${(entry.value / 1e9).toFixed(2)} Bn $`
                  : entry.value}
                {entry.name === "Production Or" ? " T" : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function MiningIntelligenceChart() {
  // --- FIX INVARIANT FAILED : HYDRATION BARRIER ---
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-[450px] w-full bg-card animate-pulse"
        style={{ borderRadius: "var(--radius-vercel-zy)" }}
      />
    );
  }
  // ------------------------------------------------

  return (
    <div
      className="w-full bg-card p-6 md:p-8 transition-all duration-500"
      style={{
        borderRadius: "var(--radius-vercel-zy)",
        border: "1px solid var(--border-color)",
      }}
    >
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-black tracking-tighter text-foreground uppercase">
          Côte d’Ivoire – Mining Investment Attractiveness Trend
        </h2>
        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1 opacity-60">
          Source : Fraser Institute Annual Survey + Secteur minier CI /
          Intelligence Dashboard V.2026
        </p>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={miningAttractivenessCI}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border-color)"
              opacity={0.3}
            />
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "currentColor",
                opacity: 0.5,
                fontSize: 11,
                fontWeight: 700,
              }}
              dy={10}
            />

            <YAxis
              yAxisId="left"
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#10b981", fontSize: 10, fontWeight: 800 }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 70]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#f59e0b", fontSize: 10, fontWeight: 800 }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "var(--border-color)", strokeWidth: 1 }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              height={36}
              formatter={(value) => (
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/70">
                  {value}
                </span>
              )}
            />

            <Bar
              name="Investissements USD"
              dataKey="mining_investment_usd"
              barSize={40}
              fill="currentColor"
              className="fill-foreground/5"
              radius={[4, 4, 0, 0]}
            />

            <Line
              yAxisId="left"
              type="monotone"
              name="Fraser Score"
              dataKey="fraser_score"
              stroke="#10b981"
              strokeWidth={3}
              dot={{
                r: 6,
                fill: "#10b981",
                strokeWidth: 2,
                stroke: "var(--background)",
              }}
              connectNulls={false}
            />

            <Line
              yAxisId="right"
              type="monotone"
              name="Production Or"
              dataKey="gold_production_tonnes"
              stroke="#f59e0b"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ r: 4, fill: "#f59e0b" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* FOOTER STATS RAPIDES */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="space-y-1">
          <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
            Projection 2025 Or
          </p>
          <p className="text-xl font-black tabular-nums">55.00 T</p>
        </div>
        <div className="space-y-1">
          <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">
            Score Fraser Max
          </p>
          <p className="text-xl font-black tabular-nums text-emerald-500">
            60.92
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
            Invest. Peak (USD)
          </p>
          <p className="text-xl font-black tabular-nums">2.00 Bn</p>
        </div>
        <div className="space-y-1">
          <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest">
            Croissance Prod.
          </p>
          <p className="text-xl font-black tabular-nums">+71%</p>
        </div>
      </div>
    </div>
  );
}
