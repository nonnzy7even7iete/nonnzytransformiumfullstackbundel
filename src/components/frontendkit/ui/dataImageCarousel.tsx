"use client";

/**
 * @file dataImageCarousel.tsx
 * @description Carousel 3D sans icône de fermeture.
 * @logic Le vide (background) hérite du pouvoir de fermeture via la prop onClose.
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
    title: "ANYAMA LOGISTIQUE",
    content:
      "Le hub logistique Y4 transforme la commune en un point de passage critique pour l'Afrique de l'Ouest.",
    src: "/IMG-20260323-WA0003.jpg",
    alt: "Infrastructure Y4",
  },
  {
    id: "02",
    title: "ZONE INDUSTRIELLE CORE",
    content:
      "Ciment et métallurgie : les moteurs internes garantissant une scalabilité sans friction.",
    src: "/IMG-20260323-WA0001.jpg",
    alt: "Zone Industrielle",
  },
  {
    id: "03",
    title: "STADE VECTEUR DE ROI",
    content:
      "Le stade n'est pas qu'un équipement sportif. C'est un signal de renommée permanent qui crédibilise chaque investissement.",
    src: "/IMG-20260323-WA0002.jpg",
    alt: "Stade Olympique",
  },
];

export default function DataImageCarousel({ onClose }: DataImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 30;
    // .info.offset.x : Accès par point au vecteur de mouvement.
    if (info.offset.x < -threshold && index < DATA_IMAGES.length - 1)
      setIndex(index + 1);
    else if (info.offset.x > threshold && index > 0) setIndex(index - 1);
  };

  if (!mounted) return null;

  return (
    <div
      // LE POUVOIR DU VIDE : Le clic ici déclenche la fermeture.
      onClick={onClose}
      className="relative h-screen w-full bg-black/95 backdrop-blur-md overflow-hidden flex items-center justify-center font-sans cursor-zoom-out"
    >
      {/* ZONE INTERACTIVE DE DRAG */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        // e.stopPropagation : Empêche le clic de fermeture lors du drag.
        onClick={(e) => e.stopPropagation()}
        className="absolute w-full h-[75vh] z-[100] cursor-grab active:cursor-grabbing"
      />

      {/* SCÈNE 3D */}
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

      {/* INDICATEURS DE PROGRESSION */}
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
                : "w-4 bg-white/20"
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
        rotateY: position * -25,
        z: isActive ? 0 : -500,
        opacity: isActive ? 1 : 0.2,
        scale: isActive ? 1 : 0.8,
      }}
      transition={{ type: "spring", stiffness: 90, damping: 20 }}
      // Protection contre la fermeture lors du clic sur la carte.
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "absolute w-[88vw] md:w-[500px] h-[480px] md:h-[580px] overflow-hidden border cursor-default",
        isActive
          ? "border-emerald-500/30 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          : "border-white/5"
      )}
      style={{ borderRadius: "14px" }}
    >
      {/* MEDIA LAYER */}
      <div className="absolute inset-0 z-0">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover"
          priority={isActive}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      </div>

      {/* CONTENT LAYER */}
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
