/**
 * @STRUCTURE_PRESERVATION_PROTOCOL
 * ---------------------------------------------------------------------------
 * COMPOSANT : ACCORDION FAQ - TUNNEL DE CONVERSION (ADVANCED AUDIT EDITION)
 * 1. DESIGN : High-density layout avec micro-labels.
 * 2. TYPO : Mono-tech pour les métadonnées / Sans-black pour les titres.
 * 3. VISUAL : Indicateurs de statut "VERIFIED" en gradient émeraude.
 * ---------------------------------------------------------------------------
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionFaqTunnel() {
  return (
    <div className="w-full space-y-12">
      {/* HEADER DE SECTION AVEC LIGNE TECHNIQUE */}
      <div className="flex items-center gap-4">
        <h2 className="text-[10px] font-black uppercase text-[var(--foreground)] tracking-[0.4em] whitespace-nowrap">
          Protocole de Transparence
        </h2>
        <div className="h-[1px] w-full bg-[var(--border-color)] opacity-30" />
        <span className="text-[9px] font-mono text-emerald-500/50 whitespace-nowrap uppercase tracking-widest">
          v2026.4
        </span>
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue="souverainete"
        className="w-full space-y-4"
      >
        {/* ITEM 1 : LA CONFIANCE */}
        <AccordionItem
          value="souverainete"
          className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-[var(--accents-1)]/30 transition-all hover:bg-[var(--accents-1)]/50 group"
        >
          <AccordionTrigger className="hover:no-underline py-6">
            <div className="flex flex-col items-start text-left gap-2">
              <span className="text-[9px] font-mono text-emerald-500 tracking-[0.2em] font-bold">
                ID: CONF-6092
              </span>
              <span className="text-[13px] font-black uppercase tracking-tighter text-[var(--foreground)] leading-none">
                Comment l'indice de 60.92 garantit-il la sécurité de mon capital
                ?
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-[11px] leading-relaxed text-[var(--foreground)] opacity-70 pb-8 max-w-2xl border-t border-[var(--border-color)] pt-6">
            L'indice agrège la stabilité législative et la transparence fiscale.
            Un score supérieur à 60 indique que la Côte d'Ivoire a franchi le
            seuil de{" "}
            <span className="font-extrabold bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent italic">
              "Risque de Rupture Institutionnelle Nul"
            </span>
            , alignant les intérêts de l'État sur ceux des investisseurs privés.
          </AccordionContent>
        </AccordionItem>

        {/* ITEM 2 : LA LOGISTIQUE / SORTIE */}
        <AccordionItem
          value="exit"
          className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-[var(--accents-1)]/30 transition-all hover:bg-[var(--accents-1)]/50 group"
        >
          <AccordionTrigger className="hover:no-underline py-6">
            <div className="flex flex-col items-start text-left gap-2">
              <span className="text-[9px] font-mono text-emerald-500 tracking-[0.2em] font-bold">
                ID: EXIT-72H
              </span>
              <span className="text-[13px] font-black uppercase tracking-tighter text-[var(--foreground)] leading-none">
                Quelles sont les conditions de sortie de capital en 2026 ?
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-[11px] leading-relaxed text-[var(--foreground)] opacity-70 pb-8 max-w-2xl border-t border-[var(--border-color)] pt-6">
            Grâce à la numérisation du cadastre et aux accords de la zone
            CEDEAO, les transferts de dividendes sont automatisés. Le délai
            moyen de rapatriement est désormais de{" "}
            <span className="font-extrabold bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent">
              72 heures ouvrées
            </span>
            .
          </AccordionContent>
        </AccordionItem>

        {/* ITEM 3 : AUDIT & TRANSPARENCE */}
        <AccordionItem
          value="audit"
          className="border border-[var(--border-color)] px-6 rounded-[var(--radius-vercel-zy)] bg-[var(--accents-1)]/30 transition-all hover:bg-[var(--accents-1)]/50 group"
        >
          <AccordionTrigger className="hover:no-underline py-6">
            <div className="flex flex-col items-start text-left gap-2">
              <span className="text-[9px] font-mono text-emerald-500 tracking-[0.2em] font-bold">
                ID: DATA-SOURCE
              </span>
              <span className="text-[13px] font-black uppercase tracking-tighter text-[var(--foreground)] leading-none">
                D'où proviennent les données du Terminal en temps réel ?
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-[11px] leading-relaxed text-[var(--foreground)] opacity-70 pb-8 max-w-2xl border-t border-[var(--border-color)] pt-6">
            Nos flux proviennent d'une triple vérification : le Ministère des
            Mines, les rapports certifiés de l'ITIE et le suivi géospatial.
            L'intégrité est{" "}
            <span className="font-extrabold bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent italic underline decoration-emerald-500/30">
              immuable
            </span>
            .
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
