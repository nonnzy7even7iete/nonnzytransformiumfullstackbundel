"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface SideCardProps {
  imageSrc: string;
  title: string;
  description: string;
  location?: string;
  className?: string;
}

export default function SideCard({
  imageSrc,
  title,
  description,
  location,
  className,
}: SideCardProps) {
  return (
    <div
      className={cn(
        /* h-[480px] : Hauteur stabilisÃ©e pour le ratio portrait */
        "flex flex-col h-[480px] w-full min-w-[300px] max-w-[350px] overflow-hidden transition-all duration-500",
        /* Utilisation de var(--card-bg) pour la rÃ©activitÃ© Light/Dark */
        "bg-[var(--card-bg)] backdrop-blur-3xl border border-[var(--border-color)] rounded-[var(--radius-vercel)] shadow-2xl group",
        "hover:border-emerald-500/50",
        className
      )}
    >
      {/* Container Image - Ratio Portrait 3/4 */}
      <div className="relative w-full aspect-[3/4] p-2 max-h-[240px]">
        {/* .bg-[var(--accents-1)] : Fond neutre rÃ©actif pendant le chargement */}
        <div className="relative w-full h-full overflow-hidden rounded-[var(--radius-vercel)] bg-[var(--accents-1)] border border-[var(--border-color)]">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 350px"
            /* .object-top : PrioritÃ© visage + torse.
               .object-cover : Remplissage uniforme (Notation point). */
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            priority
          />
        </div>
      </div>

      {/* Zone Texte - ADAPTATIVE AU DESIGN SYSTEM
          Remplacement de bg-black par var(--card-bg)
      */}
      <div className="flex flex-col flex-1 justify-between p-5 text-center bg-[var(--card-bg)]">
        <div className="flex flex-col gap-3">
          {/* .text-[var(--foreground)] : Bascule automatiquement entre blanc et noir */}
          <h2 className="text-lg font-black text-[var(--foreground)] leading-[1.1] uppercase tracking-[0.15em] italic">
            {title}
          </h2>
          <div className="overflow-y-auto max-h-[90px] pr-1 custom-scrollbar">
            <p className="text-[var(--foreground)] text-[12px] font-bold leading-tight uppercase tracking-tight">
              {description}
            </p>
          </div>
        </div>

        {location && (
          <div className="flex flex-col gap-2 mt-2">
            {/* .bg-emerald-500 : Le vert reste souverain dans les deux modes */}
            <div className="h-[2px] w-12 bg-emerald-500 mx-auto" />
            <p className="text-emerald-500 text-[11px] font-black uppercase tracking-[0.4em]">
              {location}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
