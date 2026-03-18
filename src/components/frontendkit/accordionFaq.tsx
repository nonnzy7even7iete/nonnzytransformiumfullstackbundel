/**
 * @PROTOCOLE_PRESERVATION_STRUCTURE_IMPACT_DATA
 * ---------------------------------------------------------------------------
 * IDENTITÉ : VALORISATION DES ACTIFS NUMÉRIQUES (ÉDITION 2026)
 * 1. COPYWRITING : Orientation "Impact & Rendement" (ROI, Liquidité, Solvabilité).
 * 2. DATA : Transformation de l'information brute en preuve de valeur.
 * 3. ESTHÉTIQUE : Transparence fine, réactivité systémique Dark/Light.
 * 4. STRUCTURE : Préservation des variables Vercel et du protocole de 7 ans.
 * ---------------------------------------------------------------------------
 */

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Activity, ShieldCheck, Database, Zap, TrendingUp } from "lucide-react";

export default function AccordionFaqTunnel() {
  return (
    <div className="w-full space-y-12 select-none antialiased">
      {/* HEADER : ANALYSE DE VALEUR ET PERFORMANCE */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-3 h-3 text-emerald-500/50" />
            <h2 className="text-[10px] font-black uppercase text-[var(--foreground)] tracking-[0.5em] opacity-50">
              Valorisation des Actifs & Garanties
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-mono opacity-30 uppercase tracking-widest">Flux Certifié Live</span>
          </div>
        </div>
        <div className="h-[1px] w-full bg-[var(--border-color)] opacity-40" />
      </div>

      <Accordion type="single" collapsible defaultValue="souverainete" className="w-full space-y-4">
        
        {/* DATA ASSET 1 : L'INDICE COMME GARANTIE DE SOLVABILITÉ */}
        <AccordionItem 
          value="souverainete" 
          className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-[var(--card-bg-glass)] backdrop-blur-xl transition-all duration-500 hover:border-emerald-500/20 group"
        >
          <AccordionTrigger className="hover:no-underline py-8">
            <div className="flex flex-col items-start gap-4 w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-mono text-emerald-500/60 font-bold uppercase tracking-[0.3em]">
                    Vecteur de Croissance_01
                  </span>
                  <h3 className="text-[20px] font-black uppercase tracking-tighter text-[var(--foreground)] group-data-[state=open]:text-emerald-500 transition-colors duration-300">
                    INDICE DE STABILITÉ : 60.92
                  </h3>
                </div>
                <div className="hidden md:flex flex-col items-end opacity-20 group-hover:opacity-40 transition-opacity">
                  <span className="text-[9px] font-mono font-bold tracking-tighter uppercase">Rating_A+ Equivalent</span>
                  <span className="text-[8px] font-mono tracking-tighter">Bâle IV Compliant</span>
                </div>
              </div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--foreground)] opacity-40 max-w-lg leading-relaxed">
                Corrélation directe entre transparence institutionnelle et prime de risque négative.
              </p>
            </div>
          </AccordionTrigger>

          <AccordionContent className="pb-10 border-t border-[var(--border-color)] pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
              <KpiExpert label="Taux de Confiance" valeur="94.2%" impact="+2.4% YoY" />
              <IndicateurFin label="Risque Pays" valeur="NUL" sub="Seuil de Rupture 0.0" />
              <IndicateurFin label="Solvabilité" valeur="B+" sub="Stable" />
              <IndicateurFin label="Audit Externe" valeur="EITI" sub="Standard Or" />
            </div>
            
            <p className="text-[12px] leading-relaxed text-[var(--foreground)] opacity-60 max-w-3xl font-sans italic border-l-2 border-emerald-500/20 pl-6">
              "L'indice de 60.92 n'est pas une mesure statistique, c'est une **garantie de rachat**. Il confirme que la structure souveraine de 2026 protège les flux de trésorerie contre toute volatilité politique, transformant le risque émergent en une **obligation sécurisée de haute technologie**."
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* DATA ASSET 2 : LIQUIDITÉ & TRANSFERT */}
        <AccordionItem value="exit" className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-[var(--card-bg-glass)] backdrop-blur-xl transition-all duration-500 hover:border-emerald-500/20 group">
          <AccordionTrigger className="hover:no-underline py-8">
            <div className="flex flex-col items-start gap-4">
              <span className="text-[9px] font-mono text-[var(--foreground)] opacity-20 uppercase tracking-[0.3em]">Latence de Sortie</span>
              <span className="text-[16px] font-black uppercase tracking-tighter text-[var(--foreground)] group-data-[state=open]:text-emerald-400 transition-colors">
                Ingénierie de Liquidité : Rapatriement 72H
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-10 border-t border-[var(--border-color)] pt-8">
            <div className="flex flex-wrap gap-8 mb-8 text-[9px] font-mono uppercase tracking-[0.1em]">
              <span className="flex items-center gap-2 text-emerald-500/80"><Zap className="w-3 h-3" /> Exécution Swift ISO-20022</span>
              <span className="flex items-center gap-2 opacity-30"><ShieldCheck className="w-3 h-3" /> AML-V3 Digital Verified</span>
            </div>
            <p className="text-[12px] leading-relaxed text-[var(--foreground)] opacity-60 max-w-2xl">
              La valorisation de votre capital repose sur sa **mobilité**. Notre protocole élimine les zones d'ombre bancaires : chaque dollar de dividende est pré-approuvé par le registre numérique, garantissant une sortie de fonds en <span className="text-emerald-500/80 font-bold font-mono">72 heures</span> sans décote de change.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* DATA ASSET 3 : IMMUABILITÉ SATELLITAIRE */}
        <AccordionItem value="audit" className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-[var(--card-bg-glass)] backdrop-blur-xl transition-all duration-500 hover:border-emerald-500/20 group">
          <AccordionTrigger className="hover:no-underline py-8">
            <div className="flex flex-col items-start gap-4">
              <span className="text-[9px] font-mono text-[var(--foreground)] opacity-20 uppercase tracking-[0.3em]">Oracle de Données</span>
              <span className="text-[16px] font-black uppercase tracking-tighter text-[var(--foreground)] group-data-[state=open]:text-emerald-400 transition-colors">
                Audit Satellite & Preuve de Valeur Physique
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-10 border-t border-[var(--border-color)] pt-8">
             <div className="bg-[var(--foreground)]/[0.03] p-6 rounded border border-[var(--border-color)] mb-8 flex items-center justify-between">
                <div className="flex items-center gap-6">
                   <Database className="w-5 h-5 text-emerald-500/40" />
                   <div>
                      <p className="text-[11px] font-black uppercase tracking-widest leading-none mb-2 text-[var(--foreground)]">Vérification par Preuve Physique</p>
                      <p className="text-[9px] font-mono opacity-25 uppercase tracking-tighter text-[var(--foreground)] italic text-pretty">
                        Données consolidées via radar sentinelle-1 & imagerie multispectrale.
                      </p>
                   </div>
                </div>
             </div>
             <p className="text-[12px] leading-relaxed text-[var(--foreground)] opacity-60 max-w-2xl font-sans">
              L'immuabilité de la donnée transforme la ressource souterraine en **actif financier liquide**. La synchronisation minute par minute entre l'extraction physique et le terminal d'investissement élimine toute asymétrie d'information.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

/**
 * MICRO-COMPOSANTS DE VALORISATION
 */
function IndicateurFin({ label, valeur, sub }: { label: string; valeur: string; sub: string }) {
  return (
    <div className="flex flex-col gap-2 border-l border-[var(--border-color)] pl-5 hover:border-emerald-500/30 transition-all cursor-default">
      <span className="text-[8px] uppercase tracking-[0.3em] opacity-30 font-black">{label}</span>
      <span className="text-[16px] font-mono font-bold text-[var(--foreground)] opacity-80 leading-none">{valeur}</span>
      <span className="text-[8px] font-mono opacity-20 uppercase tracking-tighter">{sub}</span>
    </div>
  );
}

function KpiExpert({ label, valeur, impact }: { label: string; valeur: string; impact: string }) {
  return (
    <div className="flex flex-col gap-2 border-l-2 border-emerald-500/40 pl-5">
      <span className="text-[8px] uppercase tracking-[0.3em] opacity-30 font-black">{label}</span>
      <span className="text-[18px] font-mono font-black text-emerald-500 leading-none">{valeur}</span>
      <span className="text-[8px] font-mono text-emerald-500/60 uppercase tracking-widest font-bold">{impact}</span>
    </div>
  );
}