"use client";

/**
 * @file dataImageCarousel.tsx
 * @description Carousel 3D Anyama - Optimisation Fluide.
 * FIX : Conflit Scroll/Click résolu par isolation des couches.
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
    title: "ANYAMA : PLATEFORME LOGISTIQUE",
    content:
      "Une infrastructure pensée pour l'évolutivité, transformant chaque flux en donnée de croissance pour le futur de la région.",
    src: "/IMG-20260323-WA0003.jpg",
    alt: "Vision Logistique",
  },
  {
    id: "02",
    title: "ÉCOSYSTÈME D'INNOVATION",
    content:
      "L'industrialisation ici est un moteur de scalabilité. Nous bâtissons un terrain fertile où chaque projet devient un pilier de l'évolution commune.",
    src: "/IMG-20260323-WA0004.jpg",
    alt: "Vision Industrielle",
  },
  {
    id: "03",
    title: "SIGNAL DE MODERNITÉ",
    content:
      "Nos infrastructures majeures sont des actifs de confiance, garantissant aux investisseurs un environnement stable, ambitieux et tourné vers demain.",
    src: "/IMG-20260323-WA0002.jpg",
    alt: "Vision Rayonnement",
  },
];

export default function DataImageCarousel({ onClose }: DataImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const isScrolling = useRef(false); // .useRef : Pour bloquer le scroll fou (debounce).

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = useCallback(() => {
    if (index < DATA_IMAGES.length - 1) setIndex((prev) => prev + 1);
  }, [index]);

  const handlePrev = useCallback(() => {
    if (index > 0) setIndex((prev) => prev - 1);
  }, [index]);

  // GESTION DU SCROLL FLUIDE
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return; // Bloque si une animation est en cours.

      if (Math.abs(e.deltaY) > 10) {
        // Seuil de sensibilité.
        isScrolling.current = true;
        if (e.deltaY > 0) handleNext();
        else handlePrev();

        // Timeout pour libérer le scroll et éviter le défilement brusque.
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
      {/* COUCHE 1 : LE VIDE (Fermeture) */}
      <div
        onClick={onClose}
        className="absolute inset-0 z-0 cursor-zoom-out"
        aria-hidden="true"
      />

      {/* COUCHE 2 : SCÈNE 3D (Interaction Cartes) */}
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

      {/* COUCHE 3 : INDICATEURS */}
      <div className="absolute bottom-16 flex gap-4 z-20 pointer-events-auto">
        {DATA_IMAGES.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-[2px] transition-all duration-700",
              index === i ? "w-16 bg-emerald-500" : "w-4 bg-white/10"
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
      drag="x" // .drag : Le drag est maintenant limité à la carte elle-même.
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
      onClick={(e) => e.stopPropagation()} // Protège la carte du clic de fermeture.
      className={cn(
        "absolute w-[85vw] md:w-[500px] h-[500px] md:h-[600px] overflow-hidden border cursor-grab active:cursor-grabbing",
        isActive
          ? "border-emerald-500/40 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
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
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end p-10 md:p-14 pointer-events-none">
        <h1 className="text-xl md:text-2xl font-black tracking-widest uppercase mb-4">
          {item.title}
        </h1>
        <div className="h-[1px] w-full bg-emerald-500/50 mb-6" />
        {isActive && (
          <div className="text-[11px] font-mono opacity-60 leading-relaxed uppercase tracking-wider">
            <TextGenerateEffect words={item.content} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
