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
        "flex flex-col h-auto min-h-[450px] w-full min-w-[300px] max-w-[350px] overflow-hidden transition-all duration-500",
        "bg-[var(--card-bg)] backdrop-blur-3xl border border-[var(--border-color)] rounded-[var(--radius-vercel)] shadow-2xl group",
        "hover:border-emerald-500/30",
        className
      )}
    >
      {/* Container Image - Rendu Uniforme 
          Suppression du h-[220px] fixe pour éviter l'effet "petite image".
          Utilisation de aspect-square ou aspect-video pour forcer l'uniformité.
      */}
      <div className="relative w-full aspect-square p-2">
        <div className="relative w-full h-full overflow-hidden rounded-[var(--radius-vercel)] bg-[var(--accents-1)]">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 350px"
            /* .object-cover : Remplit tout le container sans laisser de vide.
               .object-top : S'assure que le visage n'est pas coupé.
               C'est la seule notation qui garantit l'uniformité totale. */
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/20 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Zone Texte - Inchangée pour respecter ton front */}
      <div className="flex flex-col flex-1 justify-between p-6 text-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-black text-[var(--foreground)] leading-[1.1] uppercase tracking-[0.15em] italic">
            {title}
          </h2>
          <div className="overflow-y-auto max-h-[100px] pr-1 custom-scrollbar">
            <p className="text-[var(--foreground)]/60 text-[13px] leading-relaxed font-medium uppercase tracking-tight">
              {description}
            </p>
          </div>
        </div>

        {location && (
          <div className="flex flex-col gap-2 mt-4">
            <div className="h-[1px] w-8 bg-emerald-500/30 mx-auto" />
            <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] opacity-80 group-hover:opacity-100 transition-opacity">
              {location}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
