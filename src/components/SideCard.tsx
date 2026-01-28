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
      {/* CONTENEUR PARENT DE L'IMAGE 
          - On met un fond contrasté (noir ou blanc brillant) pour que les 2px se voient.
      */}
      <div className="relative w-full h-[200px] bg-neutral-200 dark:bg-white/15 rounded-xl overflow-hidden">
        {/* L'IMAGE AVEC LE PADDING DE 2px EN HAUT
            - absolute inset-0 + top-[2px] : force l'image à descendre de 2px.
            - On ne met pas de padding sur les côtés pour qu'elle reste collée à gauche et à droite.
        */}
        <div className="absolute inset-x-0 bottom-0 top-[2px] overflow-hidden rounded-b-[calc(0.75rem-1px)]">
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
