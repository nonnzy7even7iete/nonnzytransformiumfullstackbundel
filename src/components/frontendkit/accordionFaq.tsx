/**
 * @PROTOCOLE_PRESERVATION_STRUCTURE (2026 - 2033)
 * ---------------------------------------------------------------------------
 * COMPOSANT : ACCORDÉON D'EXPERTISE ANALYTIQUE
 * RÔLE : Validation institutionnelle et conversion haute fidélité.
 * DIRECTIVES :
 * 1. LANGUE : Français technique uniquement (Zéro anglicisme).
 * 2. DESIGN : Épurement radical, noir absolu, typographie technique.
 * 3. DONNÉES : Priorité absolue aux indicateurs de performance.
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
      {/* EN-TÊTE TECHNIQUE */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Activity className="w-3 h-3 text-emerald-500" />
              <span className="absolute inset-0 animate-ping inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            </div>
            <h2 className="text-[10px] font-black uppercase text-[var(--foreground)] tracking-[0.4em]">
              Tunnel d'Analyse de Souveraineté
            </h2>
          </div>
          <span className="text-[9px] font-mono opacity-30 uppercase tracking-tighter">
            Intégrité du système : 99.99%
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
        {/* SECTION 1 : PROTECTION DU CAPITAL */}
        <AccordionItem
          value="souverainete"
          className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-black transition-all hover:border-emerald-500/30 group"
        >
          <AccordionTrigger className="hover:no-underline py-6">
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono bg-emerald-500 text-black px-2 py-0.5 rounded font-bold uppercase tracking-tighter">
                  Indice de Stabilité : 60.92
                </span>
                <span className="text-[8px] font-mono text-emerald-500 opacity-50 uppercase italic">
                  Réserve_Sécurisée_01
                </span>
              </div>
              <span className="text-[14px] font-black uppercase tracking-tighter text-[var(--foreground)] group-data-[state=open]:text-emerald-400 transition-colors">
                Protection du capital et pérennité institutionnelle
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-8 border-t border-[var(--border-color)]/50 pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <IndicateurData libelle="Confiance État" valeur="94.2%" />
              <IndicateurData libelle="Risque Pays" valeur="FAIBLE" />
              <IndicateurData libelle="Notation" valeur="B+" />
              <IndicateurData libelle="Audit Externe" valeur="CERTIFIÉ" />
            </div>
            <p className="text-[12px] leading-relaxed text-[var(--foreground)] opacity-70 max-w-2xl font-sans">
              Cet indice synthétise la stabilité du cadre législatif et la
              transparence fiscale. Le score de 60.92 garantit l'absence de
              rupture par un mécanisme de
              <span className="text-emerald-400 font-bold">
                {" "}
                Collatéralisation des Revenus Miniers
              </span>
              , rendant le défaut techniquement impossible sous le protocole de
              2026.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* SECTION 2 : FLUX FINANCIERS */}
        <AccordionItem
          value="exit"
          className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-black transition-all hover:border-emerald-500/30 group"
        >
          <AccordionTrigger className="hover:no-underline py-6">
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                  Protocole : Swift-ISO-20022
                </span>
              </div>
              <span className="text-[14px] font-black uppercase tracking-tighter text-[var(--foreground)] group-data-[state=open]:text-emerald-400 transition-colors">
                Automatisation du rapatriement des dividendes
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-8 border-t border-[var(--border-color)]/50 pt-8">
            <div className="flex flex-wrap gap-4 mb-6 italic text-[9px] text-emerald-500/70 font-mono uppercase tracking-widest">
              <span className="flex items-center gap-2 bg-emerald-500/5 px-3 py-1 rounded-full">
                <Zap className="w-3 h-3" /> Règlement en temps réel
              </span>
              <span className="flex items-center gap-2 bg-emerald-500/5 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3 h-3" /> Conformité validée
              </span>
            </div>
            <p className="text-[12px] leading-relaxed text-[var(--foreground)] opacity-70 max-w-2xl">
              Les mouvements de fonds sont régis par des contrats financiers
              intelligents. Le délai de transfert est contractuellement limité à{" "}
              <span className="text-emerald-400 font-bold">72 heures</span>,
              supprimant toute friction administrative via la passerelle directe
              entre la CEDEAO et les places internationales.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* SECTION 3 : VÉRIFICATION DE LA DONNÉE */}
        <AccordionItem
          value="audit"
          className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-black transition-all hover:border-emerald-500/30 group"
        >
          <AccordionTrigger className="hover:no-underline py-6">
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                  Origine : Triple Oracle
                </span>
              </div>
              <span className="text-[14px] font-black uppercase tracking-tighter text-[var(--foreground)] group-data-[state=open]:text-emerald-400 transition-colors">
                Intégrité de la preuve de production minière
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-8 border-t border-[var(--border-color)]/50 pt-8">
            <div className="bg-[#0A0A0A] p-5 rounded border border-[var(--border-color)] mb-6 flex items-center justify-between group/card cursor-pointer">
              <div className="flex items-center gap-5">
                <Database className="w-5 h-5 text-emerald-500 opacity-40 group-hover/card:opacity-100 transition-opacity" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-2">
                    Flux de données immuables
                  </p>
                  <p className="text-[9px] font-mono opacity-40 uppercase tracking-tighter">
                    Imagerie Satellite + API Ministère + Audit EITI
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover/card:opacity-100 transition-all transform translate-y-1 group-hover/card:translate-y-0" />
            </div>
            <p className="text-[12px] leading-relaxed text-[var(--foreground)] opacity-70 max-w-2xl">
              Chaque étape de l'extraction est authentifiée par une signature
              cryptographique. Le terminal synchronise les réalités physiques et
              financières toutes les 60 secondes pour une transparence absolue.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

/**
 * COMPOSANT DE DONNÉE PURE
 */
function IndicateurData({
  libelle,
  valeur,
}: {
  libelle: string;
  valeur: string;
}) {
  return (
    <div className="flex flex-col gap-2 border-l border-emerald-500/20 pl-4 hover:border-emerald-500 transition-colors cursor-default">
      <span className="text-[8px] uppercase tracking-[0.2em] opacity-40 font-black leading-none">
        {libelle}
      </span>
      <span className="text-[14px] font-mono font-bold text-emerald-400 tracking-tighter">
        {valeur}
      </span>
    </div>
  );
}
