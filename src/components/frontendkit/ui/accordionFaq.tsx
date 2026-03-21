/**
 * @PROTOCOLE_PRESERVATION_STRUCTURE_STRICTE
 * ---------------------------------------------------------------------------
 * IDENTITÉ : TUNNEL ANALYTIQUE RÉACTIF (VERSION ORIGINALE)
 * RÈGLE D'OR : Ne jamais modifier les textes originaux ci-dessous.
 * STRUCTURE : Transparence fine, réactivité systémique Dark/Light.
 * ---------------------------------------------------------------------------
 */

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/frontendkit/shadcnUi/accordion";
import {
  Activity,
  ShieldCheck,
  Database,
  Zap,
  ArrowUpRight,
} from "lucide-react";

export default function AccordionFaqTunnel() {
  return (
    <div className="w-full space-y-12 select-none antialiased text-[var(--foreground)]">
      {/* EN-TÊTE TECHNIQUE ÉPURÉ */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-3 h-3 text-emerald-500/40" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">
              Questions Stratégiques • Q&A
            </h2>
          </div>
          <span className="text-[9px] font-mono opacity-20 uppercase tracking-widest italic">
            Protocole v.2026
          </span>
        </div>
        <div className="h-[1px] w-full bg-[var(--border-color)] opacity-50" />
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue="souverainete"
        className="w-full space-y-4"
      >
        {/* ITEM 1 : LA CONFIANCE / INDICE */}
        <AccordionItem
          value="souverainete"
          className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-[var(--card-bg-glass)] backdrop-blur-md transition-all duration-500 hover:border-emerald-500/30 group overflow-hidden"
        >
          <AccordionTrigger className="hover:no-underline py-8">
            <div className="flex flex-col items-start gap-4 w-full text-left">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-mono text-emerald-500/50 font-bold uppercase tracking-[0.3em]">
                  Indice de Stabilité : 60.92
                </span>
                <h3 className="text-[14px] font-black uppercase tracking-tighter group-data-[state=open]:text-emerald-500/80 transition-colors duration-300">
                  Comment l'indice de 60.92 garantit-il la sécurité de mon
                  capital ?
                </h3>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="pb-10 border-t border-[var(--border-color)] pt-8">
            {/* INDICATEURS DE DONNÉES FINES */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
              <IndicateurFin libelle="Confiance État" valeur="94.2%" />
              <IndicateurFin libelle="Risque Pays" valeur="NUL" />
              <IndicateurFin libelle="Notation" valeur="B+" />
              <IndicateurFin libelle="Précision" valeur="0.001s" />
            </div>

            <p className="text-[12px] leading-relaxed opacity-60 max-w-2xl font-sans">
              L'indice agrège la stabilité législative et la transparence
              fiscale. Un score supérieur à 60 indique que la Côte d'Ivoire a
              franchi le seuil de{" "}
              <span className="font-extrabold bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent italic">
                "Risque de Rupture Institutionnelle Nul"
              </span>
              , alignant les intérêts de l'État sur ceux des investisseurs
              privés.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* ITEM 2 : LA LOGISTIQUE / SORTIE */}
        <AccordionItem
          value="exit"
          className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-[var(--card-bg-glass)] backdrop-blur-md transition-all duration-500 hover:border-emerald-500/30 group"
        >
          <AccordionTrigger className="hover:no-underline py-8 text-left">
            <div className="flex flex-col items-start gap-4">
              <span className="text-[9px] font-mono opacity-20 uppercase tracking-[0.3em]">
                Latence de Sortie : 72H
              </span>
              <span className="text-[14px] font-black uppercase tracking-tighter group-data-[state=open]:text-emerald-500/80 transition-colors duration-300">
                Quelles sont les conditions de sortie de capital en 2026 ?
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-10 border-t border-[var(--border-color)] pt-8">
            <div className="flex gap-6 mb-8 italic text-[9px] opacity-30 font-mono uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2">
                <Zap className="w-3 h-3" /> Règlement ISO-20022
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" /> Conformité Validée
              </span>
            </div>
            <p className="text-[12px] leading-relaxed opacity-60 max-w-2xl font-sans">
              Grâce à la numérisation du cadastre et aux accords de la zone
              CEDEAO, les transferts de dividendes sont automatisés pour les
              entités certifiées. Le délai moyen de rapatriement est désormais
              de{" "}
              <span className="font-extrabold bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent">
                72 heures ouvrées
              </span>
              .
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* ITEM 3 : AUDIT & TRANSPARENCE */}
        <AccordionItem
          value="audit"
          className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-[var(--card-bg-glass)] backdrop-blur-md transition-all duration-500 hover:border-emerald-500/30 group"
        >
          <AccordionTrigger className="hover:no-underline py-8 text-left">
            <div className="flex flex-col items-start gap-4">
              <span className="text-[9px] font-mono opacity-20 uppercase tracking-[0.3em]">
                Source : Triple Oracle
              </span>
              <span className="text-[14px] font-black uppercase tracking-tighter group-data-[state=open]:text-emerald-500/80 transition-colors duration-300">
                D'où proviennent les données du Terminal en temps réel ?
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-10 border-t border-[var(--border-color)] pt-8">
            <div className="bg-[var(--foreground)]/[0.02] p-6 rounded border border-[var(--border-color)] mb-8 flex items-center justify-between group/card cursor-pointer">
              <div className="flex items-center gap-6">
                <Database className="w-4 h-4 text-emerald-500/30 group-hover/card:text-emerald-500 transition-colors" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] leading-none mb-2">
                    Flux de données immuables
                  </p>
                  <p className="text-[9px] font-mono opacity-20 uppercase tracking-tighter">
                    Satellite • API Ministère • Audit ITIE
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/card:opacity-100 transition-all" />
            </div>
            <p className="text-[12px] leading-relaxed opacity-60 max-w-2xl font-sans">
              Nos flux proviennent d'une triple vérification : le Ministère des
              Mines, les rapports certifiés de l'ITIE et les données
              géospatiales de suivi de production. L'intégrité de la donnée est{" "}
              <span className="font-extrabold bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent italic underline decoration-emerald-500/30">
                immuable
              </span>
              .
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

/**
 * MICRO-COMPOSANT DE DONNÉE ULTRA-FIN
 */
function IndicateurFin({
  libelle,
  valeur,
}: {
  libelle: string;
  valeur: string;
}) {
  return (
    <div className="flex flex-col gap-3 border-l border-[var(--border-color)] pl-5 hover:border-emerald-500/40 transition-all cursor-default group/data">
      <span className="text-[8px] uppercase tracking-[0.3em] opacity-20 font-black leading-none">
        {libelle}
      </span>
      <span className="text-[16px] font-mono font-bold opacity-80 group-hover/data:text-emerald-500 transition-colors leading-none tracking-tighter">
        {valeur}
      </span>
    </div>
  );
}
