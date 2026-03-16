/**
 * @STRUCTURE_PRESERVATION_PROTOCOL
 * ---------------------------------------------------------------------------
 * COMPOSANT : ACCORDION FAQ - TUNNEL DE CONVERSION
 * 1. DESIGN : Utilisation des variables --border-color et --foreground.
 * 2. TYPO : Titres en uppercase / font-black pour matcher le Terminal.
 * 3. LOGIQUE : Ouverture unique (type="single") pour focaliser l'attention.
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
          <AccordionTrigger className="text-xs font-black uppercase tracking-tighter text-[var(--foreground)] hover:no-underline py-6">
            Comment l'indice de 60.92 garantit-il la sécurité de mon capital ?
          </AccordionTrigger>
          <AccordionContent className="text-[11px] leading-relaxed text-[var(--foreground)] opacity-70 pb-6 max-w-2xl">
            L'indice agrège la stabilité législative et la transparence fiscale.
            Un score supérieur à 60 indique que la Côte d'Ivoire a franchi le
            seuil de
            <span className="text-[#10b981] font-bold">
              {" "}
              "Risque de Rupture Institutionnelle Nul"
            </span>
            , alignant les intérêts de l'État sur ceux des investisseurs privés.
          </AccordionContent>
        </AccordionItem>

        {/* ITEM 2 : LA LOGISTIQUE / SORTIE */}
        <AccordionItem value="exit" className="border-[var(--border-color)]">
          <AccordionTrigger className="text-xs font-black uppercase tracking-tighter text-[var(--foreground)] hover:no-underline py-6">
            Quelles sont les conditions de sortie de capital en 2026 ?
          </AccordionTrigger>
          <AccordionContent className="text-[11px] leading-relaxed text-[var(--foreground)] opacity-70 pb-6 max-w-2xl">
            Grâce à la numérisation du cadastre et aux accords de la zone
            CEDEAO, les transferts de dividendes sont automatisés pour les
            entités certifiées. Le délai moyen de rapatriement est désormais de{" "}
            <span className="font-bold">72 heures ouvrées</span>.
          </AccordionContent>
        </AccordionItem>

        {/* ITEM 3 : AUDIT & TRANSPARENCE */}
        <AccordionItem value="audit" className="border-[var(--border-color)]">
          <AccordionTrigger className="text-xs font-black uppercase tracking-tighter text-[var(--foreground)] hover:no-underline py-6">
            D'où proviennent les données du Terminal en temps réel ?
          </AccordionTrigger>
          <AccordionContent className="text-[11px] leading-relaxed text-[var(--foreground)] opacity-70 pb-6 max-w-2xl">
            Nos flux proviennent d'une triple vérification : le Ministère des
            Mines, les rapports certifiés de l'ITIE et les données géospatiales
            de suivi de production. L'intégrité de la donnée est{" "}
            <span className="italic underline">immuable</span>.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
