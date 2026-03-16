/**
 * @STRUCTURE_PRESERVATION_PROTOCOL
 * ---------------------------------------------------------------------------
 * COMPOSANT : ACCORDION FAQ - TUNNEL DE CONVERSION (GRADIENT EDITION)
 * 1. DESIGN : Utilisation des variables --border-color et --foreground.
 * 2. TYPO : Titres en uppercase / font-black.
 * 3. GRADIENT : Application du gradient Emerald 500 -> 300 sur les notions clés.
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
    <div className="w-full space-y-6">
      <h2 className="text-[10px] font-black uppercase text-[var(--foreground)] opacity-30 tracking-[0.3em] mb-8 italic">
        Questions Stratégiques • Q&A
      </h2>

      <Accordion
        type="single"
        collapsible
        defaultValue="souverainete"
        className="w-full space-y-2"
      >
        {/* ITEM 1 : LA CONFIANCE */}
        <AccordionItem
          value="souverainete"
          className="border-[var(--border-color)]"
        >
          <AccordionTrigger className="text-xs font-black uppercase tracking-tighter text-[var(--foreground)] hover:no-underline py-6 text-left">
            Comment l'indice de 60.92 garantit-il la sécurité de mon capital ?
          </AccordionTrigger>
          <AccordionContent className="text-[11px] leading-relaxed text-[var(--foreground)] opacity-70 pb-6 max-w-2xl">
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
        <AccordionItem value="exit" className="border-[var(--border-color)]">
          <AccordionTrigger className="text-xs font-black uppercase tracking-tighter text-[var(--foreground)] hover:no-underline py-6 text-left">
            Quelles sont les conditions de sortie de capital en 2026 ?
          </AccordionTrigger>
          <AccordionContent className="text-[11px] leading-relaxed text-[var(--foreground)] opacity-70 pb-6 max-w-2xl">
            Grâce à la numérisation du cadastre et aux accords de la zone
            CEDEAO, les transferts de dividendes sont automatisés pour les
            entités certifiées. Le délai moyen de rapatriement est désormais de{" "}
            <span className="font-extrabold bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent">
              72 heures ouvrées
            </span>
            .
          </AccordionContent>
        </AccordionItem>

        {/* ITEM 3 : AUDIT & TRANSPARENCE */}
        <AccordionItem value="audit" className="border-[var(--border-color)]">
          <AccordionTrigger className="text-xs font-black uppercase tracking-tighter text-[var(--foreground)] hover:no-underline py-6 text-left">
            D'où proviennent les données du Terminal en temps réel ?
          </AccordionTrigger>
          <AccordionContent className="text-[11px] leading-relaxed text-[var(--foreground)] opacity-70 pb-6 max-w-2xl">
            Nos flux proviennent d'une triple vérification : le Ministère des
            Mines, les rapports certifiés de l'ITIE et les données géospatiales
            de suivi de production. L'intégrité de la donnée est{" "}
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
