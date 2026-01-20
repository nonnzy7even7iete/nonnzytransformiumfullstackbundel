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
        /* Glassmorphism Adaptatif : Noir en sombre, Blanc quasi-opaque en Light */
        "bg-white/90 dark:bg-black/40 backdrop-blur-2xl border border-gray-200 dark:border-white/10",
        "w-[90vw] md:w-[300px]",
        className
      )}
    >
      {/* Conteneur de l'image avec 1px de padding */}
      <div className="relative w-full h-[200px] p-[1px] bg-white/20 dark:bg-white/10 rounded-xl overflow-hidden border border-white/5">
        <div className="relative w-full h-full overflow-hidden rounded-[10px]">
          {/* rounded-[10px] pour épouser la courbe du parent qui est en rounded-xl */}
          <Image src={imageSrc} alt={title} fill className="object-cover" />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 items-center">
        {/* Texte adaptatif : Noir en Light, Blanc en Dark */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-white/70 text-sm">
          {description}
        </p>

        {location && (
          <p className="text-gray-400 dark:text-gray-400 text-xs italic mt-1">
            {location}
          </p>
        )}
      </div>
    </div>
  );
}
