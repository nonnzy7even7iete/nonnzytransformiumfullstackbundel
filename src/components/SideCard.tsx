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
        /* LE CONTENEUR PRINCIPAL : 400px par défaut, s'adapte à l'écran */
        "flex flex-col min-h-[400px] w-full max-w-[320px] rounded-2xl shadow-xl overflow-hidden transition-all duration-300",
        "bg-white dark:bg-black/40 backdrop-blur-2xl border border-gray-200 dark:border-white/10",
        className
      )}
    >
      {/* LE RENDU DE L'IMAGE (L'Enfant Direct)
          - p-[2px] : Le liseré de 2px (Haut, Gauche, Droite)
          - On applique les border-radius ici car c'est le "cadre" de l'image
      */}
      <div className="relative w-full h-[220px] p-[2px] pb-0">
        <div className="relative w-full h-full overflow-hidden rounded-t-[14px] rounded-b-[14px] bg-neutral-200 dark:bg-white/5">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* ZONE TEXTE : DÉCOLLÉE & UPPERCASE */}
      <div className="flex flex-col flex-1 justify-between py-6 px-5 text-center">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-black text-gray-900 dark:text-white leading-none uppercase tracking-widest">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {location && (
          <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-4">
            {location}
          </p>
        )}
      </div>
    </div>
  );
}
