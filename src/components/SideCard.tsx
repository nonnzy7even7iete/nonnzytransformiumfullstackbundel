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
        "flex flex-col rounded-2xl shadow-lg overflow-hidden text-center transition-all duration-300",
        "bg-white dark:bg-black/40 backdrop-blur-2xl border border-gray-200 dark:border-white/10",
        "w-[90vw] md:w-[300px]",
        className
      )}
    >
      {/* LE CONTENEUR IMAGE (L'Enfant Direct)
          - p-[2px] pb-0 : Applique 2px à gauche, droite et haut uniquement.
      */}
      <div className="relative w-full h-[200px] p-[2px] pb-0">
        <div className="relative w-full h-full overflow-hidden rounded-t-[calc(1rem-2px)] rounded-b-md bg-neutral-200 dark:bg-white/5">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* ZONE TEXTE : DÉCOLLÉE
          - py-6 : On redonne de l'air pour que le texte soit bien détaché de l'image.
      */}
      <div className="flex flex-col gap-2 items-center py-6 px-4">
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
