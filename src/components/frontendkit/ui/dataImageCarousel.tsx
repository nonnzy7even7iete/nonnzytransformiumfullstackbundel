"use client";

/**
 * @file dataImageCarousel.tsx
 * @description Carousel 3D Anyama - Experience Multisensorielle.
 * @version 1.5.1
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, PanInfo } from "framer-motion"; // Import de PanInfo pour le typage precis du drag
import { TextGenerateEffect } from "@/components/frontendkit/ui/text-generate-effect";
import { cn } from "@/lib/utils";

import { AudioEngine } from "@/components/frontendkit/ui/AudioEngine";
import { MasterAuroraBackground } from "@/components/frontendkit/ui/MasterAuroraBackground";

// Definition de l'interface pour les donnees d'image
// Cela permet a VS Code de comprendre la structure de chaque objet dans DATA_IMAGES
interface DataItem {
  id: string;
  title: string;
  content: string;
  src: string;
  alt: string;
}

interface DataImageCarouselProps {
  onClose?: () => void;
}

const DATA_IMAGES: DataItem[] = [
  {
    id: "01",
    title: "ANYAMA : HUB LOGISTIQUE SOUVERAIN",
    content:
      "Plus qu'une plateforme, une architecture de flux interconnectés. Nous optimisons chaque point de passage pour garantir une scalabilité industrielle sans précédent dans la région.",
    src: "/IMG-20260329-WA0002(1).jpg",
    alt: "Vision Logistique",
  },
  {
    id: "02",
    title: "ÉCOSYSTÈME D'INNOVATION DATA-DRIVEN",
    content:
      "L'industrialisation est pilotée par la donnée. Nous bâtissons un environnement où chaque infrastructure génère de la valeur mesurable, sécurisant ainsi l'avenir des investissements.",
    src: "/IMG-20260522-WA0002.jpg",
    alt: "Vision Industrielle",
  },
  {
    id: "03",
    title: "SIGNAL DE MODERNITÉ & ROI",
    content:
      "Nos actifs stratégiques agissent comme des vecteurs de confiance. À Anyama, la modernité n'est pas une option, c'est le socle d'un rendement économique stable et ambitieux.",
    src: "/IMG-20260522-WA0001.jpg",
    alt: "Vision Rayonnement",
  },
];

export default function DataImageCarousel({ onClose }: DataImageCarouselProps) {
  // useState declare la variable d'etat index et sa fonction de modification setIndex
  const [index, setIndex] = useState(0);
  // useState declare la variable d'etat mounted pour controler le rendu cote client
  const [mounted, setMounted] = useState(false);

  // useRef permet de stocker une valeur qui persiste sans declencher de re-rendu
  // Ici, on l'utilise pour bloquer le scroll pendant l'animation
  const isScrolling = useRef(false);

  // useEffect s'execute apres l'affichage du composant pour valider le montage
  useEffect(() => {
    setMounted(true);
  }, []);

  // useCallback memorise la fonction pour eviter de la recreer a chaque rendu
  // .length accede a la propriete "longueur" du tableau (notation par point)
  const handleNext = useCallback(() => {
    if (index < DATA_IMAGES.length - 1) setIndex((prev) => prev + 1);
  }, [index]);

  const handlePrev = useCallback(() => {
    if (index > 0) setIndex((prev) => prev - 1);
  }, [index]);

  // CORRECTION DES ERREURS DE PORTÉE : Creation de references placees APRES handleNext et handlePrev
  // L'objet renvoye par useRef possede la propriete unique .current (notation par point)
  const handleNextRef = useRef(handleNext);
  const handlePrevRef = useRef(handlePrev);

  // Ce useEffect synchronise chirurgicalement les references des que handleNext ou handlePrev changent d'etat
  // La notation par point (.current) permet d'assigner la nouvelle logique sans declencher de re-rendu
  useEffect(() => {
    handleNextRef.current = handleNext;
    handlePrevRef.current = handlePrev;
  }, [handleNext, handlePrev]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // .current accede au booleen stocke dans la reference isScrolling (notation par point)
      if (isScrolling.current) return;

      // Math.abs() est une methode statique de l'objet global Math qui retourne la valeur absolue
      // e.deltaY represente la distance de defilement vertical de la molette (notation par point)
      if (Math.abs(e.deltaY) > 10) {
        isScrolling.current = true;

        // Execution securisee des fonctions stockees dans la propriete .current (notation par point)
        if (e.deltaY > 0) handleNextRef.current();
        else handlePrevRef.current();

        // setTimeout retarde l'execution de la fonction flechee de 600ms pour temporiser le scroll
        setTimeout(() => {
          isScrolling.current = false;
        }, 600);
      }
    };

    // window.addEventListener attache l'evenement "wheel" (molette) au navigateur
    // Le tableau de dependances vide [] garantit que l'ecouteur est lie une seule fois au montage
    window.addEventListener("wheel", handleWheel, { passive: true });

    // Nettoyage de l'evenement quand le composant est detruit
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative h-screen w-full bg-black/95 backdrop-blur-xl overflow-hidden flex items-center justify-center">
      <MasterAuroraBackground isActive={true} />

      <AudioEngine
        src="/Extrait du discours de Félix Houphouët-Boigny découragement n_est pas ivoirien(480P)(mp3).mp3"
        isPlaying={true}
        volume={0.7}
        loop={false}
      />

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

// Typage des arguments pour eviter que VS Code ne renvoie une erreur sur le type 'any'
interface ImageCardProps {
  item: DataItem;
  position: number;
  onNext: () => void;
  onPrev: () => void;
}

function ImageCard({ item, position, onNext, onPrev }: ImageCardProps) {
  const isActive = position === 0;

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      // info.offset.x accede a la distance parcourue par le doigt/souris (notation par point)
      onDragEnd={(_e, info: PanInfo) => {
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
      onClick={(e) => e.stopPropagation()} // e.stopPropagation() empeche le clic de fermer le carousel
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
        <h1 className="text-xl md:text-2xl font-black tracking-widest uppercase mb-6 leading-[1.1]">
          {item.title}
        </h1>

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
