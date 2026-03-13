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
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";
import { TrendingUp, Globe, ShieldCheck, Zap } from "lucide-react"; // Assure-toi d'avoir lucide-react

const data = [
  {
    year: "2021",
    performance: 41,
    benchmark: 38,
    reliability: 45,
    note: "Phase d'expansion initiale",
  },
  {
    year: "2022",
    performance: 48,
    benchmark: 42,
    reliability: 48,
    note: "Optimisation des sites miniers",
  },
  {
    year: "2023",
    performance: 51,
    benchmark: 46,
    reliability: 55.7,
    note: "Réforme du code minier",
  },
  {
    year: "2024",
    performance: 53,
    benchmark: 50,
    reliability: 58,
    note: "Nouveaux gisements opérationnels",
  },
  {
    year: "2025",
    performance: 55,
    benchmark: 54,
    reliability: 60.92,
    note: "Pic d'attractivité historique",
  },
  {
    year: "2026",
    performance: 59,
    benchmark: 58,
    reliability: 64,
    note: "Convergence standards mondiaux",
  },
];

export default function DataChart() {
  const chartId = useId();

  return (
    <div className="w-full bg-[#09090b] p-8 border border-[#27272a] rounded-2xl shadow-2xl font-sans">
      {/* SECTION 1 : RÉSUMÉ EXÉCUTIF (LECTURE EN 3 SECONDES) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
          <div className="flex items-center gap-2 text-emerald-500 mb-1">
            <TrendingUp size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Performance
            </span>
          </div>
          <p className="text-xl font-bold text-white tracking-tight">
            +14% de croissance
          </p>
          <p className="text-zinc-500 text-[10px]">
            Production nationale en hausse continue.
          </p>
        </div>

        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
          <div className="flex items-center gap-2 text-amber-500 mb-1">
            <Globe size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Compétitivité
            </span>
          </div>
          <p className="text-xl font-bold text-white tracking-tight">
            Top 3 CEDEAO
          </p>
          <p className="text-zinc-500 text-[10px]">
            Rattrapage accéléré du benchmark Afrique.
          </p>
        </div>

        <div className="p-4 bg-zinc-100/5 border border-zinc-100/20 rounded-xl">
          <div className="flex items-center gap-2 text-zinc-100 mb-1">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Confiance
            </span>
          </div>
          <p className="text-xl font-bold text-white tracking-tight">
            Score Fraser : 64.0
          </p>
          <p className="text-zinc-500 text-[10px]">
            Indice de fiabilité au plus haut (Audit 2026).
          </p>
        </div>
      </div>

      {/* SECTION 2 : LE GRAPHIQUE VISUEL */}
      <div className="h-[400px] w-full mb-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} id={chartId} margin={{ left: -15, right: 10 }}>
            <defs>
              <linearGradient id="perf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="bench" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#18181b"
            />
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#52525b", fontSize: 12, fontWeight: "bold" }}
              dy={15}
            />
            <YAxis hide domain={[30, 70]} />

            <Tooltip
              cursor={{ stroke: "#27272a", strokeWidth: 2 }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg shadow-2xl backdrop-blur-xl">
                      <p className="text-emerald-500 font-black text-[10px] uppercase mb-2">
                        Année {label}
                      </p>
                      <p className="text-white text-xs font-medium mb-3 border-b border-zinc-800 pb-2 italic">
                        "{payload[0].payload.note}"
                      </p>
                      <div className="space-y-1.5">
                        {payload.map((item: any, i: number) => (
                          <div
                            key={i}
                            className="flex justify-between gap-8 items-center"
                          >
                            <span className="text-[10px] text-zinc-500 uppercase font-bold">
                              {item.name}
                            </span>
                            <span
                              className="text-xs font-mono font-bold"
                              style={{ color: item.color }}
                            >
                              {item.value}
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

            <Area
              type="monotone"
              dataKey="benchmark"
              name="Benchmark"
              stroke="#f59e0b"
              fill="url(#bench)"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <Area
              type="monotone"
              dataKey="reliability"
              name="Fiabilité"
              stroke="#ffffff"
              fill="none"
              strokeWidth={1}
              dot={{ r: 2 }}
            />
            <Area
              type="monotone"
              dataKey="performance"
              name="Performance CI"
              stroke="#10b981"
              fill="url(#perf)"
              strokeWidth={4}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* SECTION 3 : NOTES DE PRÉCISION (POUR L'ANALYSE SANS EFFORT) */}
      <div className="border-t border-zinc-800 pt-6">
        <h4 className="text-zinc-100 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
          Interprétation de l'Algorithme ZY
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-[11px] text-zinc-400 leading-relaxed">
          <div className="flex gap-3">
            <span className="text-emerald-500 font-bold">●</span>
            <p>
              La <span className="text-white font-bold">Performance CI</span>{" "}
              (verte) montre une accélération post-2023. La distance croissante
              avec le benchmark signifie que la Côte d'Ivoire devient un leader
              régional.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-amber-500 font-bold">●</span>
            <p>
              Le <span className="text-white font-bold">Benchmark Afrique</span>{" "}
              (orange) sert de ligne de flottaison. En 2026, la Côte d'Ivoire
              dépasse enfin la moyenne des pays producteurs historiques.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-white font-bold">●</span>
            <p>
              Le <span className="text-white font-bold">Rapport Fraser</span>{" "}
              (blanc) valide que les investisseurs ont une confiance élevée. Un
              score &gt; 60 est le seuil de "Haute Fiabilité".
            </p>
          </div>
          <div className="flex gap-3 text-emerald-500 italic bg-emerald-500/5 p-2 rounded">
            <Zap size={14} />
            <p>
              Conclusion : Le secteur est en phase de "Convergence Totale". Les
              chiffres de production sont alignés avec la fiabilité
              internationale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
