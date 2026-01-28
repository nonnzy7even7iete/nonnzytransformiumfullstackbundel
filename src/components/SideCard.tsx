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
      {/* LE CONTENEUR IMAGE (PARENT) :
          - pt-[2px] : On applique les 2px de padding uniquement en haut.
          - bg-gray-300/white/20 : Sert de liseré visuel.
          - rounded-xl : L'arrondi extérieur.
      */}
      <div className="relative w-full h-[200px] pt-[2px] bg-gray-300 dark:bg-white/10 rounded-xl overflow-hidden">
        {/* L'IMAGE (ENFANT) :
            - rounded-[calc(0.75rem-2px)] : On soustrait les 2px du radius parent 
              pour une courbe parfaitement parallèle.
        */}
        <div className="relative w-full h-full overflow-hidden rounded-[calc(0.75rem-2px)]">
          <Image
            src={imageSrc}
            alt={title}
            fill
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
