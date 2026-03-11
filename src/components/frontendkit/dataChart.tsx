"use client";

import React, { useEffect, useRef } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const DATA = [
  { year: "23", score: 55.7 },
  { year: "24", score: 52.1 },
  { year: "25", score: 60.92 },
];

export default function MiningDashboard() {
  return (
    <div className="w-full bg-background text-foreground p-4 space-y-6">
      {/* GRID DE KPIs AVEC COMPTEURS ANIMÉS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Attractivité" value={60.92} delta="+9.3%" />
        <StatCard label="Vs Ghana" value={5.71} delta="Lead" prefix="+" />
        <StatCard label="Rang Mondial" value={47} delta="Top 5" isInt />
      </div>

      {/* CHART AVEC BORDURES VERTES ET LIGNE AFFINÉE */}
      <div
        className="w-full h-[300px] bg-card border border-emerald-500 p-4"
        style={{ borderRadius: "var(--radius)" }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={DATA}
            margin={{ top: 10, right: 10, left: -30, bottom: 0 }}
          >
            <defs>
              <linearGradient id="miningGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#10b981"
              opacity={0.1}
            />
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "currentColor",
                opacity: 0.4,
                fontSize: 11,
                fontWeight: 600,
              }}
            />
            <YAxis hide domain={[50, 65]} />
            <Tooltip
              cursor={{ stroke: "#10b981", strokeWidth: 1 }}
              contentStyle={{
                borderRadius: "var(--radius)",
                border: "1px solid #10b981",
                background: "hsl(var(--card))",
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#miningGradient)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ label, value, delta, prefix = "", isInt = false }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 }); // Réinitialise au scroll (focus)

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    } else {
      motionValue.set(0); // Reset quand on sort du champ de vision
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        (ref.current as HTMLElement).textContent =
          prefix + (isInt ? Math.round(latest) : latest.toFixed(2));
      }
    });
  }, [springValue, isInt, prefix]);

  return (
    <div
      className="p-4 bg-card border border-emerald-500 transition-colors"
      style={{ borderRadius: "var(--radius)" }}
    >
      <p className="text-[10px] font-bold uppercase tracking-tighter text-emerald-500/60 mb-2">
        {label}
      </p>
      <div className="flex justify-between items-end">
        <h2
          ref={ref}
          className="text-3xl font-black tabular-nums tracking-tight min-w-[100px]"
        >
          0
        </h2>
        <span className="text-[10px] font-bold text-emerald-500 mb-1 px-2 py-0.5 bg-emerald-500/10 rounded-full">
          {delta}
        </span>
      </div>
    </div>
  );
}
