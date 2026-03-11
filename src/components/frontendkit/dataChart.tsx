"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const PERFORMANCE_HISTORY = [
  { year: "2023", score: 55.7, label: "Initial" },
  { year: "2024", score: 52.1, label: "Perte Leadership" },
  { year: "2025", score: 60.92, label: "Reprise (Top 5)" },
];

export default function MiningAnalytics() {
  return (
    <div className="w-full bg-[#051109] p-8 text-white font-sans border border-emerald-900/30 rounded-xl">
      {/* HEADER STRATÉGIQUE */}
      <div className="flex flex-col mb-10 border-l-4 border-emerald-500 pl-6">
        <h2 className="text-3xl font-black tracking-tighter text-emerald-50">
          CÔTE D'IVOIRE : HUB EXTRACTIF 2026
        </h2>
        <p className="text-emerald-500/60 font-mono text-sm uppercase tracking-widest">
          Analytics Driven by Fraser Institute
        </p>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <MetricCard
          label="Indice d'Attractivité"
          value="60.92"
          change="+9.3%"
          sub="Score Global / 100"
        />
        <MetricCard
          label="Différentiel Régional"
          value="+5.71"
          change="vs Ghana"
          sub="Position : 1er UEMOA"
        />
        <MetricCard
          label="Rang Mondial"
          value="47"
          change="Stable"
          sub="Sur 68 Juridictions"
        />
      </div>

      {/* CHART SECTION */}
      <div className="h-[350px] w-full bg-[#0a1a10] border border-emerald-800/20 p-6 rounded-lg">
        <h3 className="text-emerald-400 text-xs font-bold uppercase mb-6 tracking-widest">
          Trajectoire de Redressement Institutionnel
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={PERFORMANCE_HISTORY}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#10b98110" />
            <XAxis
              dataKey="year"
              stroke="#34d399"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#34d399"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[50, 65]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#051109",
                border: "1px solid #065f46",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#34d399" }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorScore)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function MetricCard({ label, value, change, sub }: any) {
  return (
    <div className="bg-[#0a2014] p-6 border-b-2 border-emerald-900 hover:border-emerald-500 transition-all group">
      <p className="text-[10px] text-emerald-500/50 uppercase font-black tracking-widest mb-2">
        {label}
      </p>
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-white group-hover:text-emerald-400 transition-colors">
          {value}
        </span>
        <span className="text-xs font-bold text-emerald-400 bg-emerald-900/30 px-2 py-1 rounded">
          {change}
        </span>
      </div>
      <p className="text-[11px] text-emerald-700 mt-2 font-mono">{sub}</p>
    </div>
  );
}
