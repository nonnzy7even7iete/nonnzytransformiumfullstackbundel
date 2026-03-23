"use client";

/**
 * @file dataImageCarousel.tsx
 * @version 1.0.1 (VISION_ANYAMA_2026)
 * @status SOUVERAIN - INTERDICTION DE MODIFICATION DE STRUCTURE
 * -----------------------------------------------------------------------
 * PROTOCOLE :
 * - ZERO ICONE : Fermeture déléguée au clic sur l'overlay (onClose).
 * - SEMANTIQUE : Focus sur l'évolutivité de la commune d'Anyama.
 * - DESIGN : Typographie asymétrique, titre à droite, soulignement émeraude.
 * -----------------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
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
    src: "/IMG-20260323-WA0001.jpg",
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

  useEffect(() => setMounted(true), []);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 30;
    // .info.offset.x : Accès par point (dot notation) au vecteur de mouvement horizontal.
    if (info.offset.x < -threshold && index < DATA_IMAGES.length - 1)
      setIndex(index + 1);
    else if (info.offset.x > threshold && index > 0) setIndex(index - 1);
  };

  if (!mounted) return null;

  return (
    <div
      // POUVOIR DU VIDE : Le clic sur le fond ferme le composant.
      onClick={onClose}
      className="relative h-screen w-full bg-black/98 backdrop-blur-xl overflow-hidden flex items-center justify-center font-sans cursor-zoom-out"
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        onClick={(e) => e.stopPropagation()}
        className="absolute w-full h-[75vh] z-[100] cursor-grab active:cursor-grabbing"
      />

      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1200px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="relative flex items-center justify-center w-full max-w-[500px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {DATA_IMAGES.map((item, i) => (
            <ImageCard key={item.id} item={item} position={i - index} />
          ))}
        </motion.div>
      </div>

      <div
        className="absolute bottom-16 flex gap-4 z-[110]"
        onClick={(e) => e.stopPropagation()}
      >
        {DATA_IMAGES.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-[2px] transition-all duration-700",
              index === i
                ? "w-16 bg-emerald-500 shadow-[0_0_20px_#10b981]"
                : "w-4 bg-white/10"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function ImageCard({ item, position }: { item: any; position: number }) {
  const isActive = position === 0;
  const xOffset =
    typeof window !== "undefined" && window.innerWidth < 768 ? 340 : 540;

  return (
    <motion.div
      initial={false}
      animate={{
        x: position * xOffset,
        rotateY: position * -25, // Effet cylindre 3D.
        z: isActive ? 0 : -500, // Profondeur Frazier.
        opacity: isActive ? 1 : 0.2,
        scale: isActive ? 1 : 0.8,
      }}
      transition={{ type: "spring", stiffness: 90, damping: 20 }}
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "absolute w-[88vw] md:w-[500px] h-[480px] md:h-[580px] overflow-hidden border cursor-default",
        isActive ? "border-emerald-500/30 shadow-2xl" : "border-white/5"
      )}
      style={{ borderRadius: "14px" }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover"
          priority={isActive}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end p-10 md:p-14">
        <div className="flex justify-end mb-8">
          <div className="relative">
            <h1
              className={cn(
                "text-xl md:text-2xl font-black tracking-[0.25em] uppercase leading-none transition-all duration-1000",
                isActive
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              )}
            >
              {item.title}
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isActive ? "100%" : 0 }}
              transition={{ duration: 1.5, ease: "circOut", delay: 0.6 }}
              className="h-[1px] bg-emerald-500 mt-3 shadow-[0_0_10px_#10b981]"
            />
          </div>
        </div>

        <div className="w-full min-h-[60px] flex justify-start border-l border-emerald-500/30 pl-6">
          {isActive && (
            <div className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-[0.15em] opacity-60 max-w-[340px] leading-relaxed">
              <TextGenerateEffect
                words={item.content}
                filter={false}
                duration={0.4}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
