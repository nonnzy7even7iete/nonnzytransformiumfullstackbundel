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
  // --- CONFIGURATION EXPERT ---
  const topPadding = "4px"; // Change ici pour la distance image <-> bord haut de la card
  const textGap = "2px"; // L'espace entre l'image et le début du texte

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl shadow-2xl overflow-hidden text-center transition-all duration-300",
        "bg-white dark:bg-black/40 backdrop-blur-2xl border border-gray-200 dark:border-white/10",
        "w-[90vw] md:w-[300px]",
        "px-4 pb-6", // On garde du padding latéral et bas, mais on gère le haut manuellement
        className
      )}
      style={{ paddingTop: topPadding }}
    >
      {/* LE CONTENEUR IMAGE 
          On réduit la hauteur à 180px pour un look plus élancé
      */}
      <div className="relative w-full h-[180px] bg-neutral-200 dark:bg-white/10 rounded-xl overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* ZONE TEXTE SERRÉE
          mt-[2px] : On colle le texte à l'image selon ton souhait
      */}
      <div
        className="flex flex-col items-center"
        style={{ marginTop: textGap }}
      >
        <h2 className="text-base font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tighter">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-white/60 text-[11px] leading-relaxed px-2">
          {description}
        </p>

        {location && (
          <p className="text-gray-400/50 text-[9px] uppercase tracking-widest mt-1 font-bold">
            {location}
          </p>
        )}
      </div>
    </div>
  );
}
