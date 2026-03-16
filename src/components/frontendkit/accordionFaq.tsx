/**
 * @STRUCTURE_PRESERVATION_PROTOCOL
 * ---------------------------------------------------------------------------
 * COMPOSANT : ACCORDION FAQ - ANALYTICAL POWER EDITION
 * 1. ANALYTICS : Insertion de micro-données (KPIs) dans chaque réponse.
 * 2. TRUST : Badges "Verified by ITIE/Fraser" intégrés.
 * 3. STYLE : Bordures chirurgicales et typographie mono-numérique.
 * ---------------------------------------------------------------------------
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldCheck, Activity, Database, Zap } from "lucide-react";

export default function AccordionFaqTunnel() {
  return (
    <div className="w-full space-y-12">
      {/* HEADER ANALYTIQUE */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
          <h2 className="text-[10px] font-black uppercase text-[var(--foreground)] tracking-[0.4em]">
            Analyse de Souveraineté Appliquée
          </h2>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-[var(--border-color)] via-emerald-500/20 to-transparent" />
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue="souverainete"
        className="w-full space-y-4"
      >
        {/* ITEM 1 : RISQUE CAPITAL */}
        <AccordionItem
          value="souverainete"
          className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-black transition-all group"
        >
          <AccordionTrigger className="hover:no-underline py-6">
            <div className="flex justify-between items-center w-full pr-4">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-mono bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20">
                    STABILITY INDEX: 60.92
                  </span>
                </div>
                <span className="text-[13px] font-black uppercase tracking-tighter text-[var(--foreground)]">
                  Sécurisation du capital & Stabilité Institutionnelle
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-8 border-t border-[var(--border-color)] pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <DataMiniStat
                label="Confiance État"
                value="94.2%"
                color="emerald"
              />
              <DataMiniStat label="Risque Pays" value="Low" color="emerald" />
              <DataMiniStat label="Rating" value="B+" color="emerald" />
              <DataMiniStat label="Précision" value="0.001s" color="emerald" />
            </div>
            <p className="text-[11px] leading-relaxed text-[var(--foreground)] opacity-70 max-w-2xl">
              L'indice agrège la stabilité législative et la transparence
              fiscale via le protocole EITI. Le score de 60.92 neutralise le
              risque de rupture institutionnelle par un mécanisme de
              <span className="text-emerald-400 font-bold">
                {" "}
                Collatéralisation des Revenus Miniers (CRM)
              </span>
              .
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* ITEM 2 : FLUX DE SORTIE */}
        <AccordionItem
          value="exit"
          className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-black transition-all group"
        >
          <AccordionTrigger className="hover:no-underline py-6">
            <div className="flex flex-col items-start gap-2">
              <span className="text-[8px] font-mono bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20">
                LATENCY: 72H MAX
              </span>
              <span className="text-[13px] font-black uppercase tracking-tighter text-[var(--foreground)]">
                Algorithmes de Rapatriement de Dividendes
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-8 border-t border-[var(--border-color)] pt-6">
            <div className="flex gap-4 mb-4 italic text-[10px] text-emerald-500/70 font-mono">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" /> SWIFT ISO 20022 Verified
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> AML/KYC Compliant
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-[var(--foreground)] opacity-70 max-w-2xl">
              Les flux de capitaux sortants sont régis par le décret de 2026 sur
              la dématérialisation bancaire. L'exécution des ordres de transfert
              est automatisée dès la validation de l'audit fiscal semestriel.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* ITEM 3 : SOURCE DE DONNÉES */}
        <AccordionItem
          value="audit"
          className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-black transition-all group"
        >
          <AccordionTrigger className="hover:no-underline py-6">
            <div className="flex flex-col items-start gap-2">
              <span className="text-[8px] font-mono bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20">
                ORACLE: TRIPLE-CHECK
              </span>
              <span className="text-[13px] font-black uppercase tracking-tighter text-[var(--foreground)]">
                Intégrité des Données & Preuve de Production
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-8 border-t border-[var(--border-color)] pt-6">
            <div className="bg-[var(--accents-1)] p-4 rounded border border-[var(--border-color)] mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Database className="w-5 h-5 text-emerald-500 opacity-50" />
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest leading-none mb-1">
                    Source Pipeline
                  </p>
                  <p className="text-[8px] font-mono opacity-50 uppercase">
                    Satellite + EITI Reports + Ministry API
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-emerald-500 uppercase">
                  Status: Live
                </p>
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-[var(--foreground)] opacity-70 max-w-2xl">
              Chaque tonne extraite est tracée du forage à l'exportation via une
              clé cryptographique unique. Le terminal ne fait qu'afficher la
              réalité physique consolidée par l'audit Fraser.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

/**
 * MICRO-COMPOSANT ANALYTIQUE
 */
function DataMiniStat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex flex-col gap-1 border-l border-emerald-500/20 pl-3">
      <span className="text-[8px] uppercase tracking-widest opacity-40 font-black">
        {label}
      </span>
      <span className={`text-[12px] font-mono font-bold text-${color}-500`}>
        {value}
      </span>
    </div>
  );
}
