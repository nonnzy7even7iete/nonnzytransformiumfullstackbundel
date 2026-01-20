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
        /* Isolation totale pour le mode Light : Fond quasi opaque */
        "bg-white dark:bg-black/40 backdrop-blur-2xl border border-gray-200 dark:border-white/10",
        "w-[90vw] md:w-[300px]",
        className
      )}
    >
      {/* LE CONTENEUR IMAGE : On force le padding de 1px avec un fond contrasté */}
      <div className="relative w-full h-[200px] p-[1px] bg-gray-300 dark:bg-white/20 rounded-xl overflow-hidden">
        <div className="relative w-full h-full overflow-hidden rounded-[calc(0.75rem-1px)]">
          <Image src={imageSrc} alt={title} fill className="object-cover" />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 items-center">
        {/* Correction des couleurs pour la lisibilité Light Mode */}
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
