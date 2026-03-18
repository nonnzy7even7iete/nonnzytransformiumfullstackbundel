"use client";

/**
 * @STRUCTURE_PRESERVATION_PROTOCOL_V3.2
 * ---------------------------------------------------------------------------
 * PROTOCOLE DE PERSISTANCE VISUELLE ET PRÉCISION SECTORIELLE
 * 1. TYPOGRAPHIE : Ajustement du titre Oswald à font-bold (au lieu de black).
 * 2. GRADIENT : Affinement thermique : #10b981 (Vert Pur) -> #a7f3d0 (Vert Léger).
 * 3. PRÉCISION : Identification sectorielle "Industrie Minière & Ressources".
 * 4. STRUCTURE : Maintien strict Sidebar(3/12) / Chart(9/12) et animation.
 * ---------------------------------------------------------------------------
 */

import * as React from "react";
import { AiOutlineLineChart } from "react-icons/ai";
import { Info, ShieldCheck } from "lucide-react"; // ShieldCheck pour la validation
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// --- DONNÉES SOURCES (Maintenues dans le fichier) ---
const DONNEES_SOUVERAINETE = [
  { annee: "2021", indice: 41.0, moyenne_region: 54.0 },
  { annee: "2022", indice: 48.2, moyenne_region: 56.5 },
  { annee: "2023", indice: 52.7, moyenne_region: 58.0 },
  { annee: "2024", indice: 56.1, moyenne_region: 54.2 },
  { annee: "2025", indice: 58.9, moyenne_region: 51.5 },
  { annee: "2026", indice: 60.92, moyenne_region: 50.1 },
];

interface TerminalProps {
  titre?: string;
  donnees?: any[];
  labels?: { primary: string; secondary: string };
  secteur?: string; // Ajout pour précision sectorielle
}

export default function TerminalDynamiqueSouverain({
  titre = "Souveraineté",
  donnees = DONNEES_SOUVERAINETE,
  labels = { primary: "Indice Côte d'Ivoire", secondary: "Moyenne CEDEAO" },
  secteur = "Industrie Minière & Ressources", // Secteur par défaut
}: TerminalProps) {
  const id = React.useId();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.2 });

  // Config dynamique basée sur les labels passés ou par défaut
  const configGraphique = {
    indice: { label: labels.primary, color: "#10b981" },
    moyenne_region: { label: labels.secondary, color: "var(--accents-2)" },
  } satisfies ChartConfig;

  return (
    <div
      ref={ref}
      className="w-full bg-[var(--background)] text-[var(--foreground)] p-10 font-sans antialiased border border-[var(--border-color)] rounded-[var(--radius-vercel)] shadow-2xl transition-colors duration-200"
    >
      {/* HEADER_LOCKED : Titre affiné et Gradient Vert */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 border-b border-[var(--accents-2)] pb-10 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="relative group">
              {/* Glow affiné avec le nouveau dégradé vert */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#10b981] to-[#a7f3d0] rounded-lg blur opacity-15 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative p-3 bg-[var(--card-bg-glass)] border border-[var(--accents-2)] backdrop-blur-md rounded-[var(--radius-vercel-zy)]">
                <AiOutlineLineChart className="h-6 w-6 text-[#10b981]" />
              </div>
            </div>

            <div>
              {/* Titre affiné à font-bold et dégradé Vert pur -> Vert léger */}
              <h1
                className="text-5xl font-bold tracking-[calc(-0.04em)] uppercase leading-none italic"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Indice de{" "}
                <span className="bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#a7f3d0] bg-clip-text text-transparent">
                  Souveraineté
                </span>
              </h1>
              <div className="flex items-center gap-2 mt-3">
                <ShieldCheck className="h-3 w-3 text-[#10b981] opacity-60" />
                <p className="text-[10px] font-bold text-[var(--foreground)] opacity-40 uppercase tracking-[0.6em] italic leading-none">
                  Audit Sectoriel : {secteur}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-12 tabular-nums">
          <CompteurHeader
            label="Rang Politique"
            target={47}
            isInView={isInView}
          />
          <CompteurHeader
            label="Attractivité"
            target={28}
            isInView={isInView}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* SIDEBAR_LOCKED */}
        <div className="lg:col-span-3 space-y-12">
          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase text-[var(--foreground)] opacity-30 tracking-widest border-l-2 border-[#10b981] pl-3 italic">
              Métriques de Confiance
            </h3>
            <JaugeDynamique
              label="Indépendance Budgétaire"
              val={92}
              isInView={isInView}
            />
            <JaugeDynamique
              label="Maîtrise Foncière"
              val={89}
              isInView={isInView}
            />
            <JaugeDynamique
              label="Transparence Flux"
              val={74}
              isInView={isInView}
            />
          </div>

          <div className="p-6 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[var(--radius-vercel-zy)] shadow-sm relative overflow-hidden group hover:border-[#10b981]/30 transition-colors">
            <div className="flex items-center gap-2 mb-3 text-[9px] font-black uppercase text-[var(--foreground)] opacity-40">
              <Info className="h-3 w-3 text-[#10b981]" />
              <span>Note d'expertise</span>
            </div>
            {/* Titre de carte affiné à font-bold */}
            <div
              className="text-xl font-bold italic text-[var(--foreground)] leading-tight uppercase tracking-tighter mb-4"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Nature de <br /> l'Indice
            </div>
            <p className="text-[11px] text-[var(--foreground)] opacity-70 leading-relaxed font-medium font-sans">
              Cet indice quantifie la{" "}
              <span className="text-[#10b981] font-bold">
                capacité d'auto-détermination
              </span>{" "}
              économique dans le secteur extractif. Un score de 60.92 valide la
              protection des actifs.
            </p>
          </div>
        </div>

        {/* CHART_LOCKED - structure inchangée */}
        <div className="lg:col-span-9">
          <ChartContainer config={configGraphique} className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                key={isInView ? "visible" : "hidden"}
                data={donnees}
                margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
              >
                <defs>
                  {/* Dégradé de zone affiné pour plus de légèreté */}
                  <linearGradient
                    id={`eclat-${id}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="var(--accents-2)"
                  strokeWidth={1}
                  opacity={0.3}
                />
                <XAxis
                  dataKey="annee"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "var(--foreground)",
                    fontSize: 11,
                    fontWeight: 900,
                    opacity: 0.5,
                  }}
                  dy={15}
                />
                <YAxis domain={[30, 75]} hide />

                <ChartTooltip
                  cursor={{ stroke: "var(--accents-2)", strokeWidth: 1 }}
                  content={
                    <ChartTooltipContent
                      className="min-w-[220px] bg-[var(--card-bg)] border-[var(--border-color)] p-4 shadow-2xl backdrop-blur-xl"
                      formatter={(value, name) => (
                        <div className="flex w-full items-center justify-between gap-10tabular-nums">
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-50">
                            {configGraphique[
                              name as keyof typeof configGraphique
                            ]?.label || name}
                          </span>
                          <span className="font-mono font-bold text-[#10b981]">
                            {value}
                          </span>
                        </div>
                      )}
                    />
                  }
                />

                <Area
                  dataKey="moyenne_region"
                  type="monotone"
                  stroke="var(--accents-2)"
                  strokeWidth={1.5}
                  fill="none"
                  opacity={0.2}
                />
                <Area
                  dataKey="indice"
                  type="monotone"
                  stroke="#10b981"
                  strokeWidth={4}
                  fill={`url(#eclat-${id})`}
                  isAnimationActive={isInView}
                />
                <ReferenceLine
                  y={60}
                  stroke="#10b981"
                  strokeDasharray="4 4"
                  opacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 border-t border-[var(--accents-2)] pt-10 antialiased">
            <TuileActualite
              titre="Autonomie Fiscale"
              statut="SÉCURISÉ"
              desc="Découplage progressif des aides extérieures. Le budget de l'État est auto-financé à 82%."
            />
            <TuileActualite
              titre="Infrastructure Data"
              statut="TEMPS RÉEL"
              desc="Stockage local des données minières cryptées par le protocole souverain v2026."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SOUS-COMPOSANTS (Logique et structure inchangées) ---

function CompteurHeader({
  label,
  target,
  isInView,
}: {
  label: string;
  target: number;
  isInView: boolean;
}) {
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 40, damping: 20 });
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    if (isInView) count.set(target);
    else count.set(0);
  }, [isInView, target, count]);
  React.useEffect(() => {
    return rounded.on("change", (latest) => setDisplay(Math.round(latest)));
  }, [rounded]);
  return (
    <div className="text-right border-l border-[var(--accents-2)] pl-8 hover:border-[#10b981]/40 transition-colors">
      <p className="text-[10px] font-black text-[var(--foreground)] opacity-40 uppercase tracking-widest mb-1 italic">
        {label}
      </p>
      {/* Compteur affiné à font-bold */}
      <span
        className="text-4xl font-bold tracking-tighter tabular-nums"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        {display}
      </span>
    </div>
  );
}

function JaugeDynamique({
  label,
  val,
  isInView,
}: {
  label: string;
  val: number;
  isInView: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end tabular-nums">
        <span className="text-[10px] font-black uppercase opacity-50 tracking-tight">
          {label}
        </span>
        <span className="text-xs font-mono font-bold">
          {isInView ? val : 0}%
        </span>
      </div>
      <div className="h-[1.5px] w-full bg-[var(--accents-2)] rounded-full overflow-hidden relative">
        {/* Jauge affinée avec le nouveau dégradé vert pure vers léger */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${val}%` : 0 }}
          transition={{ duration: 1.5 }}
          className="h-full bg-gradient-to-r from-[#10b981] to-[#a7f3d0] absolute top-0 left-0"
        />
      </div>
    </div>
  );
}

function TuileActualite({
  titre,
  statut,
  desc,
}: {
  titre: string;
  statut: string;
  desc: string;
}) {
  return (
    <div className="p-6 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[var(--radius-vercel-zy)] hover:border-[#10b981]/50 transition-all group">
      <div className="flex justify-between items-center mb-4 text-[9px] font-bold uppercase tracking-widest antialiased">
        <div className="h-1 w-8 bg-[#10b981]/20 group-hover:bg-[#10b981] transition-colors" />
        <span className="text-[#10b981]">{statut}</span>
      </div>
      {/* Titre de tuile affiné à font-bold */}
      <h4
        className="text-xs font-bold uppercase mb-2 italic"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        {titre}
      </h4>
      <p className="text-[10px] opacity-60 font-medium font-sans">{desc}</p>
    </div>
  );
}
