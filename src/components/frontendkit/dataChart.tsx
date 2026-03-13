"use client";

import React, { useId } from "react";
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
// AJOUT DE L'IMPORT QUI MANQUAIT PROBABLEMENT
import { cn } from "@/lib/utils";

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

// Typage pour calmer VS Code si tu es en mode strict
interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="p-4 bg-background/95 backdrop-blur-md border shadow-2xl"
        style={{
          borderColor: "var(--border-color)",
          borderRadius: "var(--radius-vercel-zy)",
        }}
      >
        <p
          className="text-[10px] font-black text-emerald-500 mb-3 uppercase tracking-[0.2em] border-b pb-2"
          style={{ borderColor: "var(--border-color)" }}
        >
          Data Point: {label}
        </p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center gap-10 text-[11px]"
            >
              <span className="text-muted-foreground font-bold uppercase tracking-tighter">
                {entry.name}
              </span>
              <span
                className="font-black tabular-nums"
                style={{ color: entry.color }}
              >
                {entry.name.includes("Invest")
                  ? `${(entry.value / 1e9).toFixed(2)} Bn $`
                  : entry.value}
                {entry.name.includes("Production") ? " T" : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function DataChart() {
  const chartId = useId();

  return (
    <div
      className="w-full bg-card p-6 md:p-10 transition-all duration-500"
      style={{
        borderRadius: "var(--radius-vercel-zy)",
        border: "1px solid var(--border-color)",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          {/* Fix de l'espace dans tracking */}
          <h2 className="text-2xl font-black tracking-[-0.05em] text-foreground uppercase italic">
            Mining Attractiveness{" "}
            <span className="text-emerald-500 font-light">Index</span>
          </h2>
          <p className="text-[9px] text-muted-foreground uppercase font-black tracking-[0.3em] mt-1">
            Data Analysis // Fraser Institute & National Gold Metrics
          </p>
        </div>
        <div className="flex gap-4">
          <div
            className="px-3 py-1 border rounded-full text-[9px] font-black uppercase tracking-widest"
            style={{ borderColor: "var(--border-color)" }}
          >
            Live Stream 2026
          </div>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            id={chartId}
            data={miningAttractivenessCI}
            margin={{ top: 10, right: 10, bottom: 0, left: -20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border-color)"
              opacity={0.4}
            />
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "currentColor",
                opacity: 0.4,
                fontSize: 10,
                fontWeight: 800,
              }}
              dy={15}
            />
            <YAxis yAxisId="left" domain={[0, 100]} hide />
            <YAxis yAxisId="right" orientation="right" domain={[0, 70]} hide />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "var(--border-color)", strokeWidth: 1 }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="rect"
              formatter={(value) => (
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mr-4">
                  {value}
                </span>
              )}
            />
            <Bar
              name="Investissements"
              dataKey="mining_investment_usd"
              fill="currentColor"
              className="fill-foreground/5 dark:fill-white/5"
              radius={[2, 2, 0, 0]}
              yAxisId="left"
            />
            <Line
              yAxisId="left"
              type="monotone"
              name="Fraser Score"
              dataKey="fraser_score"
              stroke="#10b981"
              strokeWidth={4}
              dot={{ r: 4, fill: "#10b981", strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              connectNulls={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              name="Production Or"
              dataKey="gold_production_tonnes"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: "#f59e0b", strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-8 border-t"
        style={{ borderColor: "var(--border-color)" }}
      >
        {[
          {
            label: "Target Production",
            val: "55.00T",
            color: "text-foreground",
          },
          { label: "Current Fraser", val: "60.92", color: "text-emerald-500" },
          { label: "Capital Flow", val: "2.00Bn", color: "text-foreground" },
          { label: "Growth Index", val: "+71%", color: "text-amber-500" },
        ].map((stat, i) => (
          <div key={i} className="group">
            <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-1 group-hover:text-emerald-500 transition-colors">
              {stat.label}
            </p>
            <p
              className={cn(
                "text-2xl font-black tabular-nums tracking-tighter",
                stat.color
              )}
            >
              {stat.val}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
