"use client";

/**
 * @file dataImageCarousel.tsx
 * @description Carousel 3D.
 * STYLE : Typographie asymétrique, titre à droite, soulignement chirurgical.
 */

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/frontendkit/ui/text-generate-effect";
import { cn } from "@/lib/utils";

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

export default function DataImageCarousel() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 30;
    if (info.offset.x < -threshold && index < DATA_IMAGES.length - 1)
      setIndex(index + 1);
    else if (info.offset.x > threshold && index > 0) setIndex(index - 1);
  };

  if (!mounted) return null;

  return (
    <div className="relative h-screen w-full bg-[var(--background)] overflow-hidden flex items-center justify-center font-sans">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="absolute w-full h-[70vh] z-[100] cursor-grab active:cursor-grabbing"
      />

      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1200px" }}
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

      <div className="absolute bottom-12 flex gap-3 z-[110]">
        {DATA_IMAGES.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-[1px] transition-all duration-1000",
              index === i
                ? "w-12 bg-emerald-500 shadow-[0_0_15px_#10b981]"
                : "w-3 bg-[var(--foreground)] opacity-20"
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
    typeof window !== "undefined" && window.innerWidth < 768 ? 320 : 520;

  return (
    <motion.div
      initial={false}
      animate={{
        x: position * xOffset,
        rotateY: position * -25,
        z: isActive ? 0 : -450,
        opacity: isActive ? 1 : 0.3,
        scale: isActive ? 1 : 0.85,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "absolute w-[85vw] md:w-[500px] h-[450px] md:h-[550px] overflow-hidden border",
        isActive
          ? "border-emerald-500/40 shadow-2xl"
          : "border-[var(--border-color)]"
      )}
      style={{ borderRadius: "var(--radius-vercel, 14px)" }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover"
          priority={isActive}
        />
        {/* SCRIM : Noir profond en bas pour supporter le texte excentré */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end p-10 md:p-14">
        {/* TITRE : Alignement Droite (Right), plus petit, souligné avec subtilité */}
        <div className="flex justify-end mb-6">
          <div className="relative group">
            <h1
              className={cn(
                "text-xl md:text-2xl font-black tracking-[0.2em] uppercase leading-none transition-all duration-1000",
                isActive
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              )}
            >
              {item.title}
            </h1>
            {/* SOULIGNEMENT SUBTIL : S'anime seulement si la carte est active */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isActive ? "100%" : 0 }}
              transition={{ duration: 1.2, ease: "circOut", delay: 0.5 }}
              className="h-[1px] bg-emerald-500 mt-2 shadow-[0_0_8px_#10b981]"
            />
          </div>
        </div>

        {/* TEXT-GENERATE-EFFECT : Reste centré ou légèrement décalé pour l'équilibre */}
        <div className="w-full min-h-[50px] flex justify-start border-l border-emerald-500/20 pl-4">
          {isActive && (
            <div className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest opacity-70 max-w-[320px]">
              <TextGenerateEffect
                words={item.content}
                filter={false}
                duration={0.3}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
