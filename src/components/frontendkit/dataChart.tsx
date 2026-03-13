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
  Line,
  ComposedChart,
} from "recharts";
import { cn } from "@/lib/utils";
import { Shield, Activity } from "lucide-react";

// 1. DATA INTÉGRÉE (Pour éviter l'erreur 'data is not defined')
const internalData = [
  {
    year: "2021",
    perf: 41,
    bench: 38,
    trust: 45,
    info: "Expansion Structurelle",
  },
  { year: "2022", perf: 48, bench: 42, trust: 48, info: "Optimisation GIS" },
  { year: "2023", perf: 51, bench: 46, trust: 55.7, info: "Code Minier V2" },
  { year: "2024", perf: 53, bench: 50, trust: 58, info: "Nouveaux Gisements" },
  { year: "2025", perf: 55, bench: 54, trust: 60.9, info: "Audit Conformité" },
  { year: "2026", perf: 61, bench: 58, trust: 66, info: "Standard Mondial" },
];

export default function DataChart() {
  const chartId = useId();

  return (
    <div
      className="w-full p-6 border transition-colors duration-300"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border-color)",
        borderRadius: "var(--radius-vercel-zy)",
      }}
    >
      {/* HEADER */}
      <div
        className="flex justify-between items-start mb-12 border-b pb-6"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="space-y-1">
          <h2 className="text-[var(--foreground)] text-sm font-black uppercase tracking-[0.4em]">
            Sovereignty Mining Intelligence
          </h2>
          <div className="flex gap-4 text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
            <span>Market: CIV.Gold</span>
            <span className="flex items-center gap-1">
              Status: <span className="text-emerald-500 italic">Nominal</span>
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground text-[9px] font-mono uppercase tracking-tighter">
            Update: 2026-03-13
          </p>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <Metric label="Efficience" value="+16.4%" color="text-emerald-500" />
        <Metric label="Bench. Africa" value="Rank #3" color="text-amber-500" />
        <Metric
          label="Reliability"
          value="66.00"
          color="text-[var(--foreground)]"
        />
        <Metric label="Volatility" value="Low" color="text-muted-foreground" />
      </div>

      {/* CHART AREA */}
      <div className="h-[380px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={internalData} id={chartId}>
            <defs>
              <linearGradient id="gradPerf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="2 4"
              vertical={false}
              stroke="var(--border-color)"
              opacity={0.5}
            />

            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "var(--muted-foreground)",
                fontSize: 9,
                fontWeight: 700,
              }}
              dy={15}
            />

            <YAxis hide domain={[30, 75]} />

            <Tooltip
              cursor={{ stroke: "var(--border-color)", strokeWidth: 1 }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div
                      className="p-3 shadow-2xl backdrop-blur-md border rounded-sm"
                      style={{
                        backgroundColor: "var(--background)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <p
                        className="text-muted-foreground text-[9px] font-bold mb-2 uppercase border-b pb-1 italic"
                        style={{ borderColor: "var(--border-color)" }}
                      >
                        Logs: {label}
                      </p>
                      <div className="space-y-2">
                        {payload.map((item: any, i: number) => (
                          <div
                            key={i}
                            className="flex justify-between items-center gap-12 text-[10px]"
                          >
                            <span className="text-muted-foreground uppercase font-medium tracking-tighter">
                              {item.name}
                            </span>
                            <span
                              className="font-mono font-bold"
                              style={{ color: item.color }}
                            >
                              {item.value.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Line
              type="monotone"
              dataKey="bench"
              name="Benchmark"
              stroke="#d97706"
              strokeWidth={1}
              dot={false}
              strokeDasharray="3 3"
            />
            <Line
              type="monotone"
              dataKey="trust"
              name="Index Fraser"
              stroke="var(--foreground)"
              strokeWidth={1}
              dot={{ r: 2, fill: "var(--foreground)", strokeWidth: 0 }}
              opacity={0.2}
            />
            <Area
              type="monotone"
              dataKey="perf"
              name="Performance CI"
              stroke="#10b981"
              strokeWidth={1.2}
              fill="url(#gradPerf)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* FOOTER */}
      <div
        className="mt-12 pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4"
        style={{ borderColor: "var(--border-color)" }}
      >
        <Note
          icon={<Activity size={12} />}
          title="Vecteur de Croissance"
          desc="Performance surclassant le benchmark régional."
        />
        <Note
          icon={<Shield size={12} />}
          title="Compliance Score"
          desc="Convergence vers les standards Frazier Zone A."
        />
      </div>
    </div>
  );
}

// 2. TYPES ET SOUS-COMPOSANTS
interface MetricProps {
  label: string;
  value: string;
  color: string;
}
function Metric({ label, value, color }: MetricProps) {
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground text-[9px] font-black uppercase tracking-[0.2em]">
        {label}
      </p>
      <p
        className={cn(
          "text-lg font-medium tracking-tighter tabular-nums leading-none",
          color
        )}
      >
        {value}
      </p>
    </div>
  );
}

interface NoteProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}
function Note({ icon, title, desc }: NoteProps) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 text-muted-foreground">{icon}</div>
      <div className="space-y-0.5">
        <h5 className="text-[var(--foreground)] text-[10px] font-bold uppercase tracking-widest leading-none">
          {title}
        </h5>
        <p className="text-muted-foreground text-[10px] leading-relaxed opacity-70">
          {desc}
        </p>
      </div>
    </div>
  );
}
