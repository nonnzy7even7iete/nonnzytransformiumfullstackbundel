"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, animate, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

/**
 * DATA_MINIERE_7 : Copywriting préservé à 100%.
 */
const DATA_MINIERE_7 = [
  {
    id: "01",
    title: "INDICE D'ATTRACTIVITÉ (PPI)",
    value: 60.9,
    progression: "+5.2",
    unit: "PTS",
    ref: "FRAZIER_CORE_INDEX",
    status: "CROISSANCE_CONFIRMÉE",
    detail: "PERCEPTION DES POLITIQUES PUBLIQUES",
  },
  {
    id: "02",
    title: "POTENTIEL MINÉRAL (BII)",
    value: 68.0,
    progression: "+8.4",
    unit: "PTS",
    ref: "AUDIT_GÉOLOGIQUE",
    status: "HAUT_POTENTIEL",
    detail: "MEILLEURES PRATIQUES D'EXPLOITATION",
  },
  {
    id: "03",
    title: "POSITION RÉGIONALE",
    value: 1.0,
    progression: "TOP_1",
    unit: "RANG",
    ref: "ZONE_CEDEAO",
    status: "DOMINATION_TOTALE",
    detail: "DIFFÉRENTIEL GHANA : +5.7 PTS",
  },
  {
    id: "04",
    title: "SÉCURITÉ DU CAPITAL",
    value: 100,
    progression: "STABLE",
    unit: "%",
    ref: "ASSURANCE_JURIDIQUE",
    status: "GARANTI_SÉCURISÉ",
    detail: "PROTECTION INTÉGRALE DES ACTIFS",
  },
  {
    id: "05",
    title: "CLIMAT DES AFFAIRES",
    value: 47.0,
    progression: "+12.0",
    unit: "POS",
    ref: "MARCHÉ_GLOBAL",
    status: "OPTIMISATION_FLUX",
    detail: "POSITION MONDIALE SUR 68 JURIDICTIONS",
  },
  {
    id: "06",
    title: "RANG CONTINENTAL",
    value: 5.0,
    progression: "-2_RANGS",
    unit: "POS",
    ref: "TOP_AFRIQUE",
    status: "ASCENSION_ÉLITE",
    detail: "PERFORMANCE SUR 36 MOIS",
  },
  {
    id: "07",
    title: "VECTEUR ROI 2026",
    value: 2026,
    progression: "ACTIF",
    unit: "V26",
    ref: "TRANSFORMIUM_CORE",
    status: "VALIDATION_SYSTÈME",
    detail: "SOUVERAINETÉ DES DONNÉES",
  },
];

export default function MiningDashboard() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const conversionText =
    "CÔTE D'IVOIRE : L'ÉPICENTRE DU ROI GARANTI . INVESTIR AILLEURS EST UNE ERREUR STRATÉGIQUE .";

  useEffect(() => setMounted(true), []);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 50;
    // .info.offset.x : Accès point pour piloter la navigation du carrousel
    if (info.offset.x < -threshold && index < DATA_MINIERE_7.length - 1)
      setIndex(index + 1);
    else if (info.offset.x > threshold && index > 0) setIndex(index - 1);
  };

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen bg-[var(--background)] overflow-hidden flex flex-col items-center justify-between py-16 transition-all">
      {/* HEADER : POSITIONNÉ POUR LAISSER LA NAVBAR RESPIRER */}
      <section className="relative z-[110] w-full max-w-5xl px-6 mt-12">
        <p className="text-[10px] font-black tracking-[0.5em] text-center uppercase opacity-30 mb-6 text-emerald-500">
          Nonnzytransformium High-Stakes Analytics
        </p>
        <TextGenerateEffect
          words={conversionText}
          className="text-2xl md:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-center leading-[0.95]"
        />
      </section>

      {/* CONTAINER DU CARROUSEL 3D */}
      <div
        className="relative w-full h-[50vh] flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {/* ZONE DE CAPTURE DRAG : LIMITÉE POUR NE PAS BLOQUER LA NAVBAR */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="absolute w-full max-w-[600px] h-full z-[150] cursor-grab active:cursor-grabbing"
        />

        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {DATA_MINIERE_7.map((item, i) => {
              const distance = i - index;
              // On affiche la carte actuelle et les suivantes (stacking vers l'arrière)
              if (distance >= 0 && distance <= 2) {
                return (
                  <DataCard key={item.id} item={item} distance={distance} />
                );
              }
              return null;
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* FOOTER : PROGRESSION AUDIT */}
      <footer className="relative z-[110] flex flex-col items-center gap-8 w-full">
        <div className="flex gap-2">
          {DATA_MINIERE_7.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-[1px] transition-all duration-700",
                i === index
                  ? "w-12 bg-emerald-500 shadow-[0_0_10px_#10b981]"
                  : "w-3 bg-white/10"
              )}
            />
          ))}
        </div>
        <div className="text-[9px] font-mono opacity-20 tracking-[0.4em] uppercase text-white">
          AUDIT_V26_CIV_CORE
        </div>
      </footer>
    </main>
  );
}

/**
 * SOUS-COMPOSANT : DataCard
 * Gère l'empilement (Z-index), le flou (Blur) et la perspective.
 */
function DataCard({ item, distance }: { item: any; distance: number }) {
  const counterRef = useRef<HTMLHeadingElement>(null);
  const isActive = distance === 0;

  useEffect(() => {
    if (isActive && counterRef.current) {
      // .animate() : Odomètre de données (Notation point)
      const controls = animate(0, item.value, {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => {
          // .current.textContent : Mise à jour directe pour 60FPS
          if (counterRef.current) counterRef.current.textContent = v.toFixed(1);
        },
      });
      return () => controls.stop();
    }
  }, [item.value, isActive]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 150 }}
      animate={{
        opacity: 1 - distance * 0.3, // Les cartes s'effacent en s'éloignant
        x: distance * 50, // Décalage latéral
        z: -distance * 200, // Enfoncement en profondeur
        rotateY: distance * -15, // Inclinaison de perspective
        filter: `blur(${distance * 2}px)`, // Flou progressif
      }}
      exit={{ opacity: 0, x: -150, transition: { duration: 0.3 } }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "absolute w-[85vw] md:w-[520px] p-8 md:p-12 backdrop-blur-3xl border relative transition-colors duration-500",
        isActive
          ? "bg-black/60 border-emerald-500/30"
          : "bg-black/20 border-white/5"
      )}
      style={{
        zIndex: 100 - distance, // L'active est toujours au-dessus
        borderRadius: "2px",
        boxShadow: isActive ? "0 25px 50px -12px rgba(0,0,0,0.8)" : "none",
        transformStyle: "preserve-3d",
      }}
    >
      {/* BADGE PROGRESSION */}
      <div className="absolute top-0 right-0 p-8 flex flex-col items-end">
        <span className="text-[7px] font-mono opacity-30 uppercase tracking-widest text-white">
          Delta
        </span>
        <span className="text-sm font-black text-emerald-500 font-mono italic">
          {item.progression}
        </span>
      </div>

      {/* HEADER CARD */}
      <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-1 h-1 rounded-full",
              isActive ? "bg-emerald-500 animate-pulse" : "bg-white/20"
            )}
          />
          <span className="font-mono text-[9px] tracking-[0.5em] opacity-40 uppercase text-white">
            {item.ref}
          </span>
        </div>
        <span className="font-mono text-[9px] px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 tracking-widest uppercase italic">
          {item.status}
        </span>
      </div>

      {/* DATA CONTENT */}
      <div className="space-y-4">
        <h3 className="font-black text-xl md:text-2xl tracking-[0.1em] uppercase italic text-white/90 leading-tight">
          {item.title}
        </h3>
        <p className="font-mono text-[9px] opacity-20 text-white tracking-[0.3em] uppercase">
          {item.detail}
        </p>

        <div className="flex items-baseline gap-4 py-6">
          <h2
            ref={counterRef}
            className="text-7xl md:text-[9rem] font-black tracking-tighter leading-none text-white"
          >
            {isActive ? "0.0" : item.value.toFixed(1)}
          </h2>
          <span className="text-xl md:text-3xl font-light italic opacity-20 text-emerald-500 uppercase">
            {item.unit}
          </span>
        </div>
      </div>

      {/* FOOTER CARD */}
      <div className="mt-8 grid grid-cols-2 gap-8 pt-6 border-t border-white/5">
        <div className="space-y-1">
          <p className="text-[8px] font-mono opacity-20 uppercase tracking-[0.2em] text-white">
            Validation
          </p>
          <p className="text-[10px] font-mono font-black uppercase text-white/60 tracking-tighter">
            FRAZIER_CERT_2026
          </p>
        </div>
        <div className="space-y-1 text-right">
          <p className="text-[8px] font-mono opacity-20 uppercase tracking-[0.2em] text-white">
            Source
          </p>
          <p className="text-[10px] font-mono font-black uppercase text-white/40 tracking-tighter">
            NONNZY_DATA_#0{item.id}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
