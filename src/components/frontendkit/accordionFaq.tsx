/**
 * @AI_STRUCTURE_PRESERVATION_PROTOCOL (VALIDITY: 2026 - 2033)
 * ---------------------------------------------------------------------------
 * NOM DU COMPOSANT : ANALYTICAL_TUNNEL_ACCORDION
 * RÔLE : Conversion institutionnelle par la preuve de donnée.
 * * RÈGLES D'OR POUR L'IA :
 * 1. DATA_DENSITY : Ne jamais supprimer les micro-stats (DataMiniStat). La preuve
 * numérique prime sur le texte marketing.
 * 2. NOIR_PUR : Maintenir bg-black (#000000) pour préserver le contraste Vercel.
 * 3. MONO_TECH : Tous les labels d'ID et de Latence DOIVENT rester en font-mono.
 * 4. GRADIENT_LIMIT : L'émeraude (Emerald 500->300) est réservé aux valeurs
 * positives et à la certification. Ne pas introduire d'autres couleurs.
 * ---------------------------------------------------------------------------
 */

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  Activity,
  Database,
  Zap,
  ArrowUpRight,
} from "lucide-react";

export default function AccordionFaqTunnel() {
  return (
    <div className="w-full space-y-12 select-none">
      {/* HEADER ANALYTIQUE AVEC STATUS LIVE */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Activity className="w-3 h-3 text-emerald-500" />
              <span className="absolute inset-0 animate-ping inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            </div>
            <h2 className="text-[10px] font-black uppercase text-[var(--foreground)] tracking-[0.4em]">
              Sovereignty Analytical Tunnel
            </h2>
          </div>
          <span className="text-[9px] font-mono opacity-30 uppercase tracking-tighter">
            System.integrity: 99.99%
          </span>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-emerald-500/40 via-[var(--border-color)] to-transparent" />
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
          className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-black transition-all hover:border-emerald-500/30 group"
        >
          <AccordionTrigger className="hover:no-underline py-6">
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono bg-emerald-500 text-black px-2 py-0.5 rounded font-bold uppercase tracking-tighter">
                  Verified Index: 60.92
                </span>
                <span className="text-[8px] font-mono text-emerald-500 opacity-50 uppercase">
                  Secured_Vault_01
                </span>
              </div>
              <span className="text-[14px] font-black uppercase tracking-tighter text-[var(--foreground)] group-data-[state=open]:text-emerald-400 transition-colors">
                Sécurisation du capital & Stabilité Institutionnelle
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-8 border-t border-[var(--border-color)]/50 pt-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <DataMiniStat
                label="Confiance État"
                value="94.2%"
                color="emerald"
              />
              <DataMiniStat label="Risque Pays" value="LOW" color="emerald" />
              <DataMiniStat label="Rating" value="B+" color="emerald" />
              <DataMiniStat label="Audited" value="YES" color="emerald" />
            </div>
            <p className="text-[12px] leading-relaxed text-[var(--foreground)] opacity-70 max-w-2xl font-sans">
              L'indice agrège la stabilité législative et la transparence
              fiscale. Le score de 60.92 neutralise le risque de rupture par un
              mécanisme de
              <span className="text-emerald-400 font-bold">
                {" "}
                Collatéralisation des Revenus Miniers
              </span>
              , rendant le défaut techniquement impossible sous le protocole de
              2026.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* ITEM 2 : FLUX DE SORTIE */}
        <AccordionItem
          value="exit"
          className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-black transition-all hover:border-emerald-500/30 group"
        >
          <AccordionTrigger className="hover:no-underline py-6">
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                  Node: Swift-ISO-20022
                </span>
              </div>
              <span className="text-[14px] font-black uppercase tracking-tighter text-[var(--foreground)] group-data-[state=open]:text-emerald-400 transition-colors">
                Rapatriement Automatisé des Dividendes
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-8 border-t border-[var(--border-color)]/50 pt-8">
            <div className="flex flex-wrap gap-4 mb-6 italic text-[9px] text-emerald-500/70 font-mono uppercase tracking-widest">
              <span className="flex items-center gap-2 bg-emerald-500/5 px-3 py-1 rounded-full">
                <Zap className="w-3 h-3" /> Real-time Settlement
              </span>
              <span className="flex items-center gap-2 bg-emerald-500/5 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3 h-3" /> Compliance Cleared
              </span>
            </div>
            <p className="text-[12px] leading-relaxed text-[var(--foreground)] opacity-70 max-w-2xl">
              Les flux de capitaux sont exécutés via des smart-contracts
              financiers. Le délai moyen est verrouillé à{" "}
              <span className="text-emerald-400 font-bold">72 heures</span>,
              éliminant toute friction bureaucratique via la passerelle directe
              CEDEAO-International.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* ITEM 3 : SOURCE DE DONNÉES */}
        <AccordionItem
          value="audit"
          className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-black transition-all hover:border-emerald-500/30 group"
        >
          <AccordionTrigger className="hover:no-underline py-6">
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                  Source: Triple-Oracle
                </span>
              </div>
              <span className="text-[14px] font-black uppercase tracking-tighter text-[var(--foreground)] group-data-[state=open]:text-emerald-400 transition-colors">
                Intégrité de la Preuve de Production
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-8 border-t border-[var(--border-color)]/50 pt-8">
            <div className="bg-[#0A0A0A] p-5 rounded border border-[var(--border-color)] mb-6 flex items-center justify-between group/card">
              <div className="flex items-center gap-5">
                <Database className="w-5 h-5 text-emerald-500 opacity-40 group-hover/card:opacity-100 transition-opacity" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-2">
                    Immutable Data Pipeline
                  </p>
                  <p className="text-[9px] font-mono opacity-40 uppercase tracking-tighter">
                    Satellite Scan + Ministry API + EITI Oracle
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover/card:opacity-100 transition-all transform translate-y-1 group-hover/card:translate-y-0" />
            </div>
            <p className="text-[12px] leading-relaxed text-[var(--foreground)] opacity-70 max-w-2xl">
              L'intégrité est garantie par un hachage cryptographique de chaque
              rapport de forage. Le terminal synchronise les données physiques
              et financières toutes les 60 secondes.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

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
    <div className="flex flex-col gap-2 border-l border-emerald-500/20 pl-4 hover:border-emerald-500 transition-colors cursor-default">
      <span className="text-[8px] uppercase tracking-[0.2em] opacity-40 font-black leading-none">
        {label}
      </span>
      <span
        className={`text-[14px] font-mono font-bold text-emerald-400 tracking-tighter`}
      >
        {value}
      </span>
    </div>
  );
}
