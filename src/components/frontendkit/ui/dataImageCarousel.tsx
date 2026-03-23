"use client";

/**
 * @file dataImageCarousel.tsx
 * @description Carousel 3D immersif pour actifs visuels stratégiques.
 * Utilise la profondeur Frazier (Z-axis) et l'effet de texte progressif.
 */

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
// Importation du moteur d'effet que nous avons stabilisé ensemble.
import { TextGenerateEffect } from "@/components/frontendkit/ui/text-generate-effect";
import { cn } from "@/lib/utils";

/**
 * DATA_CORE : Structure souveraine des données.
 * Ne pas modifier les strings pour préserver le "feeling" de travail.
 */
const DATA_IMAGES = [
  {
    id: "01",
    title: "ANYAMA LOGISTIQUE",
    content:
      "Le hub logistique Y4 transforme la commune en un point de passage critique pour l'Afrique de l'Ouest.",
    src: "/api/placeholder/800/600",
    alt: "Infrastructure Y4",
  },
  {
    id: "02",
    title: "ZONE INDUSTRIELLE CORE",
    content:
      "Ciment et métallurgie : les moteurs internes garantissant une scalabilité sans friction.",
    src: "/api/placeholder/800/600",
    alt: "Zone Industrielle",
  },
  {
    id: "03",
    title: "STADE VECTEUR DE ROI",
    content:
      "Le stade n'est pas qu'un équipement sportif. C'est un signal de renommée permanent qui crédibilise chaque investissement.",
    src: "/api/placeholder/800/600",
    alt: "Stade Olympique",
  },
];

export default function DataImageCarousel() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Montage sécurisé pour éviter les erreurs d'hydratation (SSR).
  useEffect(() => setMounted(true), []);

  /**
   * handleDragEnd : Logique de navigation gestuelle.
   * .info.offset.x : Accès par point au vecteur de déplacement horizontal.
   */
  const handleDragEnd = (_: any, info: any) => {
    const threshold = 30; // Seuil de déclenchement en pixels.
    if (info.offset.x < -threshold && index < DATA_IMAGES.length - 1)
      setIndex(index + 1);
    else if (info.offset.x > threshold && index > 0) setIndex(index - 1);
  };

  if (!mounted) return null;

  return (
    <div className="relative h-screen w-full bg-[var(--background)] overflow-hidden flex items-center justify-center font-sans">
      {/* COUCHE INTERACTIVE (Invisible, capte le Drag sur toute la zone) */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="absolute w-full h-[70vh] z-[100] cursor-grab active:cursor-grabbing"
      />

      {/* MOTEUR DE RENDU 3D */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1200px" }} // Définit la profondeur de la scène.
      >
        <motion.div
          className="relative flex items-center justify-center w-full max-w-[500px]"
          style={{ transformStyle: "preserve-3d" }} // Autorise les enfants à vivre dans l'espace 3D.
        >
          {DATA_IMAGES.map((item, i) => (
            <ImageCard key={item.id} item={item} position={i - index} />
          ))}
        </motion.div>
      </div>

      {/* BARRE DE PROGRESSION (INDICATEURS) */}
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

/**
 * COMPOSANT ImageCard : La cellule de base du carousel.
 */
function ImageCard({ item, position }: { item: any; position: number }) {
  const isActive = position === 0;

  // xOffset : Calcul du décalage latéral. 500px est la largeur de base de la carte.
  const xOffset =
    typeof window !== "undefined" && window.innerWidth < 768 ? 320 : 520;

  return (
    <motion.div
      initial={false}
      animate={{
        x: position * xOffset,
        rotateY: position * -25, // Rotation pour l'effet de cylindre.
        z: isActive ? 0 : -450, // Projection vers l'arrière pour les cartes inactives.
        opacity: isActive ? 1 : 0.3,
        scale: isActive ? 1 : 0.85,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "absolute w-[85vw] md:w-[500px] h-[400px] md:h-[450px] overflow-hidden border",
        isActive
          ? "border-emerald-500/40 shadow-2xl"
          : "border-[var(--border-color)]"
      )}
      style={{ borderRadius: "var(--radius-vercel, 14px)" }} // Respect de tes 14px.
    >
      {/* IMAGE DE FOND (Layer 0) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          priority={isActive}
        />
        {/* SCRIM NOIR : Overlay dégradé pour la lisibilité (Layer 1) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      </div>

      {/* CONTENU TEXTUEL (Layer 2) */}
      <div className="relative z-10 h-full flex flex-col items-center justify-between p-10 text-center">
        {/* TITRE H1 : Centré verticalement et horizontalement */}
        <div className="flex-1 flex items-center justify-center">
          <h1
            className={cn(
              "text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none transition-all duration-700",
              isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}
          >
            {item.title}
          </h1>
        </div>

        {/* TEXT-GENERATE-EFFECT : En bas du composant */}
        <div className="w-full min-h-[80px] flex items-end justify-center">
          {isActive && (
            <div className="text-xs md:text-sm font-medium leading-relaxed opacity-90 max-w-[380px]">
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
