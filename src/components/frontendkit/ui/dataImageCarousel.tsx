"use client";

/**
 * @file dataImageCarousel.tsx
 * @description Carousel 3D Anyama - Évolution Sémantique et Impact.
 * @version 1.2.0
 * -----------------------------------------------------------------------
 * CHANGELOG :
 * - TEXTES : Réécriture pour un éclairage stratégique (Souveraineté, ROI, Hub).
 * - UI : Ajout de la bordure d'accentuation émeraude sur le texte de la carte.
 * - PERF : Maintien du scroll fluide et de la fermeture chirurgicale.
 * -----------------------------------------------------------------------
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/frontendkit/ui/text-generate-effect";
import { cn } from "@/lib/utils";

interface DataImageCarouselProps {
  onClose?: () => void;
}

const DATA_IMAGES = [
  {
    id: "01",
    title: "ANYAMA : HUB LOGISTIQUE SOUVERAIN",
    content:
      "Plus qu'une plateforme, une architecture de flux interconnectés. Nous optimisons chaque point de passage pour garantir une scalabilité industrielle sans précédent dans la région.",
    src: "/IMG-20260329-WA0002.jpg",
    alt: "Vision Logistique",
  },
  {
    id: "02",
    title: "ÉCOSYSTÈME D'INNOVATION DATA-DRIVEN",
    content:
      "L'industrialisation est pilotée par la donnée. Nous bâtissons un environnement où chaque infrastructure génère de la valeur mesurable, sécurisant ainsi l'avenir des investissements.",
    src: "/IMG-20260323-WA0004.jpg",
    alt: "Vision Industrielle",
  },
  {
    id: "03",
    title: "SIGNAL DE MODERNITÉ & ROI",
    content:
      "Nos actifs stratégiques agissent comme des vecteurs de confiance. À Anyama, la modernité n'est pas une option, c'est le socle d'un rendement économique stable et ambitieux.",
    src: "/IMG-20260323-WA0002.jpg",
    alt: "Vision Rayonnement",
  },
];

export default function DataImageCarousel({ onClose }: DataImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const isScrolling = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = useCallback(() => {
    if (index < DATA_IMAGES.length - 1) setIndex((prev) => prev + 1);
  }, [index]);

  const handlePrev = useCallback(() => {
    if (index > 0) setIndex((prev) => prev - 1);
  }, [index]);

  // SCROLL FLUIDE AVEC DEBOUNCE
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;
      if (Math.abs(e.deltaY) > 10) {
        isScrolling.current = true;
        if (e.deltaY > 0) handleNext();
        else handlePrev();
        setTimeout(() => {
          isScrolling.current = false;
        }, 600);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleNext, handlePrev]);

  if (!mounted) return null;

  return (
    <div className="relative h-screen w-full bg-black/95 backdrop-blur-xl overflow-hidden flex items-center justify-center">
      {/* COUCHE CLIC EXTÉRIEUR */}
      <div
        onClick={onClose}
        className="absolute inset-0 z-0 cursor-zoom-out"
        aria-hidden="true"
      />

      <div
        className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="relative flex items-center justify-center w-full max-w-[500px] pointer-events-auto"
          style={{ transformStyle: "preserve-3d" }}
        >
          {DATA_IMAGES.map((item, i) => (
            <ImageCard
              key={item.id}
              item={item}
              position={i - index}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-16 flex gap-4 z-20 pointer-events-auto">
        {DATA_IMAGES.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-[2px] transition-all duration-700",
              index === i
                ? "w-16 bg-emerald-500 shadow-[0_0_10px_#10b981]"
                : "w-4 bg-white/10"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function ImageCard({ item, position, onNext, onPrev }: any) {
  const isActive = position === 0;

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x < -50) onNext();
        if (info.offset.x > 50) onPrev();
      }}
      animate={{
        x:
          position *
          (typeof window !== "undefined" && window.innerWidth < 768
            ? 320
            : 520),
        rotateY: position * -25,
        z: isActive ? 0 : -400,
        opacity: isActive ? 1 : 0.3,
        scale: isActive ? 1 : 0.85,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "absolute w-[85vw] md:w-[500px] h-[500px] md:h-[600px] overflow-hidden border cursor-grab active:cursor-grabbing",
        isActive
          ? "border-emerald-500/40 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
          : "border-white/5"
      )}
      style={{ borderRadius: "16px", transformStyle: "preserve-3d" }}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover select-none"
        priority={isActive}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end p-10 md:p-14 pointer-events-none">
        <h1 className="text-xl md:text-2xl font-black tracking-widest uppercase mb-6 leading-[1.1]">
          {item.title}
        </h1>

        {/* ACCENT BORDER : Le trait vertical émeraude ajouté ici */}
        <div className="flex gap-6 items-stretch">
          <div className="w-[2px] bg-emerald-500 shadow-[0_0_10px_#10b981] shrink-0" />
          <div className="min-h-[60px]">
            {isActive && (
              <div className="text-[11px] font-mono opacity-80 leading-relaxed uppercase tracking-widest">
                <TextGenerateEffect words={item.content} />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
