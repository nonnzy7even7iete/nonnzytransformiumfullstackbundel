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
        /* Sizing Senior : Hauteur fixe 450px pour Desktop, s'adapte en largeur */
        "flex flex-col h-[450px] w-full min-w-[300px] max-w-[350px] rounded-2xl shadow-2xl overflow-hidden transition-all duration-500",
        "bg-white/80 dark:bg-black/40 backdrop-blur-3xl border border-gray-200 dark:border-white/10 hover:border-blue-500/50 group",
        className
      )}
    >
      {/* Container Image avec protection ratio */}
      <div className="relative w-full h-[220px] p-1">
        <div className="relative w-full h-full overflow-hidden rounded-xl bg-neutral-200 dark:bg-white/5">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority
          />
        </div>
      </div>

      {/* Zone Texte avec typographie Senior */}
      <div className="flex flex-col flex-1 justify-between p-6 text-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-black text-gray-900 dark:text-white leading-[1.1] uppercase tracking-[0.15em]">
            {title}
          </h2>
          <div className="overflow-y-auto max-h-[100px] pr-1 scrollbar-hide">
            <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed font-medium">
              {description}
            </p>
          </div>
        </div>

        {location && (
          <p className="text-emerald-500 text-[11px] font-black uppercase tracking-[0.3em] mt-4 opacity-80 group-hover:opacity-100 transition-opacity">
            {location}
          </p>
        )}
      </div>
    </div>
  );
}
