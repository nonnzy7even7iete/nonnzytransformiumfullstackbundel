"use client";

import * as React from "react";
import { AiOutlineLineChart } from "react-icons/ai";
import { Info, ShieldAlert } from "lucide-react";
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

// TYPES ET INTERFACES
interface DonneeIndice {
  annee: string;
  indice: number;
  moyenne_region: number;
}

interface TerminalProps {
  titre?: string;
  donnees?: DonneeIndice[];
  labels?: { primary: string; secondary: string };
  secteur?: string;
}

const DONNEES_DEFAUT: DonneeIndice[] = [
  { annee: "2021", indice: 41.0, moyenne_region: 54.0 },
  { annee: "2022", indice: 48.2, moyenne_region: 56.5 },
  { annee: "2023", indice: 52.7, moyenne_region: 58.0 },
  { annee: "2024", indice: 56.1, moyenne_region: 54.2 },
  { annee: "2025", indice: 58.9, moyenne_region: 51.5 },
  { annee: "2026", indice: 60.92, moyenne_region: 50.1 },
];

export default function TerminalDynamiqueSouverain({
  titre = "Souveraineté",
  donnees = DONNEES_DEFAUT,
  labels = { primary: "Indice Côte d'Ivoire", secondary: "Moyenne CEDEAO" },
  secteur = "Industrie Minière & Ressources",
}: TerminalProps) {
  const id = React.useId().replace(/:/g, ""); // Nettoyage de l'ID pour les gradients SVG
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  const configGraphique = {
    indice: { label: labels.primary, color: "#10b981" },
    moyenne_region: { label: labels.secondary, color: "#64748b" },
  } satisfies ChartConfig;

  return (
    <div
      ref={ref}
      className="w-full bg-background text-foreground p-10 font-sans antialiased border border-border rounded-xl shadow-2xl transition-colors duration-200"
    >
      {/* HEADER : VERT PURE -> LEGER */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 border-b border-muted pb-10 gap-8 overflow-visible relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-6 overflow-visible">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#10b981] to-[#a7f3d0] rounded-lg blur opacity-15 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative p-3 bg-card/50 border border-border backdrop-blur-md rounded-lg">
                <AiOutlineLineChart className="h-6 w-6 text-[#10b981]" />
              </div>
            </div>

            <div className="overflow-visible">
              <h1
                className="text-5xl font-black tracking-tighter uppercase leading-none italic"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Indice de{" "}
                <span className="bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#a7f3d0] bg-clip-text text-transparent">
                  {titre}
                </span>
              </h1>
              <div className="flex items-center gap-2 mt-3 overflow-visible antialiased leading-none">
                <ShieldAlert className="h-3 w-3 text-[#10b981] opacity-60" />
                <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.6em] italic leading-none">
                  Audit Intégré : {secteur}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-12 tabular-nums relative z-10">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-0 antialiased">
        {/* SIDEBAR */}
        <div className="lg:col-span-3 space-y-12 overflow-visible">
          <div className="space-y-8 relative z-10">
            <h3 className="text-[10px] font-black uppercase opacity-30 tracking-widest border-l-2 border-[#10b981] pl-3 italic">
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

          <div className="p-6 bg-card border border-border rounded-lg relative group">
            <div className="flex items-center gap-2 mb-3 text-[9px] font-black uppercase opacity-40">
              <Info className="h-3 w-3 text-[#10b981]" />
              <span>Note d'expertise</span>
            </div>
            <div
              className="text-xl font-black italic uppercase tracking-tighter mb-4"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Nature de <br /> l'Indice
            </div>
            <p className="text-[11px] opacity-70 leading-relaxed font-medium">
              Cet indice quantifie la{" "}
              <span className="text-[#10b981] font-bold">
                capacité d'auto-détermination
              </span>{" "}
              économique dans le secteur extractif.
            </p>
          </div>
        </div>

        {/* CHART - ANIMATION 7s ISOLÉE */}
        <div className="lg:col-span-9 overflow-visible z-0">
          <ChartContainer config={configGraphique} className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={donnees}
                margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id={`line-grad-${id}`}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="60%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ff4500" />
                  </linearGradient>
                  <linearGradient
                    id={`area-grad-${id}`}
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
                  strokeDasharray="3 3"
                  strokeOpacity={0.1}
                />
                <XAxis
                  dataKey="annee"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "currentColor", fontSize: 11, opacity: 0.5 }}
                  dy={15}
                />
                <YAxis hide domain={[30, 75]} />
                <ChartTooltip
                  cursor={{
                    stroke: "#10b981",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                  }}
                  content={
                    <ChartTooltipContent
                      className="backdrop-blur-xl bg-background/80 border-border rounded-lg p-4 shadow-2xl"
                      formatter={(value, name) => (
                        <div className="flex w-full items-center justify-between gap-6 antialiased tabular-nums">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: "#10b981" }}
                            />
                            <span
                              className="text-[9px] font-black uppercase tracking-widest opacity-60 italic"
                              style={{ fontFamily: "'Oswald', sans-serif" }}
                            >
                              {configGraphique[
                                name as keyof typeof configGraphique
                              ]?.label || name}
                            </span>
                          </div>
                          <span className="font-mono font-bold text-[#10b981] text-xs">
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
                  stroke="#64748b"
                  strokeWidth={1}
                  fill="transparent"
                  strokeOpacity={0.2}
                  animationDuration={1000}
                />
                <Area
                  dataKey="indice"
                  type="monotone"
                  stroke={`url(#line-grad-${id})`}
                  strokeWidth={2}
                  fill={`url(#area-grad-${id})`}
                  isAnimationActive={true}
                  animationDuration={7000} // ANIMATION 7 SECONDES ISOLÉE
                  activeDot={{
                    stroke: "#10b981", // VERT FULL
                    strokeWidth: 2,
                    fill: "white",
                    r: 5,
                  }}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 border-t border-muted pt-10 relative z-10">
            <TuileActualite
              titre="Autonomie Fiscale"
              statut="SÉCURISÉ"
              desc="Découplage progressif des aides extérieures. Le budget est auto-financé à 82%."
            />
            <TuileActualite
              titre="Infrastructure Data"
              statut="TEMPS RÉEL"
              desc="Stockage local des données minières cryptées par le protocole v2026."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// SOUS-COMPOSANTS DÉBUGGÉS
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
    <div className="text-right border-l border-muted pl-8 tabular-nums">
      <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1 italic leading-none">
        {label}
      </p>
      <span
        className="text-4xl font-black tracking-tighter leading-none"
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
      <div className="flex justify-between items-end tabular-nums leading-none">
        <span className="text-[10px] font-black uppercase opacity-50 tracking-tight leading-none">
          {label}
        </span>
        <span className="text-xs font-mono font-bold leading-none">
          {isInView ? val : 0}%
        </span>
      </div>
      <div className="h-[1.5px] w-full bg-muted rounded-full overflow-hidden relative">
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
    <div className="p-6 bg-card border border-border rounded-lg hover:border-[#10b981]/50 transition-all group relative z-10">
      <div className="flex justify-between items-center mb-4 leading-none text-[9px] font-bold uppercase tracking-widest">
        <div className="h-1 w-8 bg-[#10b981]/20 group-hover:bg-[#10b981] transition-colors" />
        <span className="text-[#10b981]">{statut}</span>
      </div>
      <h4
        className="text-xs font-black uppercase mb-2 italic leading-none"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        {titre}
      </h4>
      <p className="text-[10px] opacity-60 font-medium leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
