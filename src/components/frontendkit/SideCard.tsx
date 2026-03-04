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
        /* h-[450px] : On stabilise la hauteur pour Ã©viter que la carte ne s'Ã©tire trop */
        "flex flex-col h-[450px] w-full min-w-[300px] max-w-[350px] overflow-hidden transition-all duration-500",
        "bg-[var(--card-bg)] backdrop-blur-3xl border border-[var(--border-color)] rounded-[var(--radius-vercel)] shadow-2xl group",
        "hover:border-emerald-500",
        className
      )}
    >
      {/* Container Image - Ratio CinÃ©matique pour libÃ©rer le texte 
          aspect-video : Ratio 16/9 plus compact que le carrÃ© (LibÃ¨re environ 80px de texte).
      */}
      <div className="relative w-full aspect-video p-2">
        <div className="relative w-full h-full overflow-hidden rounded-[var(--radius-vercel)] bg-black border border-[var(--border-color)]">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 350px"
            /* .object-top : PrÃ©serve le visage (Notation point).
               .object-cover : UniformitÃ© totale sans bandes noires. */
            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
            priority
          />
        </div>
      </div>

      {/* Zone Texte - Noir & Vert PUR */}
      <div className="flex flex-col flex-1 justify-between p-5 text-center bg-black">
        <div className="flex flex-col gap-3">
          {/* text-white : Blanc pur pour le contraste souverain */}
          <h2 className="text-lg font-black text-white leading-[1.1] uppercase tracking-[0.15em] italic">
            {title}
          </h2>
          <div className="overflow-y-auto max-h-[120px] pr-1 custom-scrollbar">
            {/* Suppression de opacity-60 pour du texte BLANC PUR lisible */}
            <p className="text-white text-[13px] font-bold leading-relaxed uppercase tracking-tight">
              {description}
            </p>
          </div>
        </div>

        {location && (
          <div className="flex flex-col gap-2 mt-2">
            {/* Ligne Emeraude PURE */}
            <div className="h-[2px] w-10 bg-emerald-500 mx-auto" />
            <p className="text-emerald-500 text-[11px] font-black uppercase tracking-[0.4em]">
              {location}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
