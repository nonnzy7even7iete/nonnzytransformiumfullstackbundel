"use client";

import Image from "next/image";
import { cn } from "@/lib/utils"; // Assure-toi que cet utilitaire est dispo, sinon on fera sans

interface SideCardProps {
  imageSrc: string;
  title: string;
  description: string;
  location?: string;
  className?: string; // Ajouté pour la flexibilité
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
        "flex flex-col bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg p-[30px] overflow-hidden text-center transition-all duration-300",
        /* Mobile : 90vw | Desktop : 300px fixe */
        "w-[90vw] md:w-[300px]",
        className
      )}
    >
      <div className="relative w-full h-[200px]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="rounded-xl object-cover"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 items-center">
        <h2 className="text-lg font-bold text-white leading-tight">{title}</h2>
        <p className="text-white/70 text-sm">{description}</p>

        {/* Localisation optionnelle */}
        {location && (
          <p className="text-gray-400 text-xs italic mt-1">{location}</p>
        )}
      </div>
    </div>
  );
}
