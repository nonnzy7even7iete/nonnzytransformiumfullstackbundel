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
        "flex flex-col rounded-2xl shadow-lg p-[30px] overflow-hidden text-center transition-all duration-300",
        "bg-white dark:bg-black/40 backdrop-blur-2xl border border-gray-200 dark:border-white/10",
        "w-[90vw] md:w-[300px]",
        className
      )}
    >
      {/* LE CADRE (CADILLAC EFFECT) 
          On force une hauteur fixe et un fond brillant pour voir le liseré 
      */}
      <div className="relative w-full h-[200px] bg-neutral-300 dark:bg-emerald-500/20 rounded-xl overflow-hidden">
        {/* L'IMAGE DÉCALÉE 
            On utilise 'absolute' avec un top de 2px pour CRÉER le vide visuel.
            On ajoute une bordure interne pour marquer la séparation.
        */}
        <div className="absolute inset-0 top-[2px] right-0 left-0 bottom-0 overflow-hidden rounded-b-lg border-t border-white/5">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 items-center">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-white/70 text-sm">
          {description}
        </p>
        {location && (
          <p className="text-gray-400 text-xs italic mt-1">{location}</p>
        )}
      </div>
    </div>
  );
}
