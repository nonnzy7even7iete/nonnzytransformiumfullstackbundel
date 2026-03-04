"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, animate, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

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

/**
 * COMPOSANT HARMONISÉ : MiningDashboard
 * Le nom du fichier et de l'export correspondent maintenant parfaitement.
 */
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
    <main className="relative min-h-screen bg-[var(--background)] overflow-hidden flex flex-col items-center justify-between py-20 transition-all">
      <section className="relative z-[110] w-full max-w-5xl px-6">
        <p className="text-[10px] font-black tracking-[0.5em] text-center uppercase opacity-30 mb-6 text-emerald-500">
          Nonnzytransformium High-Stakes Analytics
        </p>
        <TextGenerateEffect
          words={conversionText}
          className="text-3xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter text-center leading-[0.9]"
        />
      </section>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="absolute inset-0 z-[100] cursor-col-resize"
      />

      <div
        className="relative w-full h-[55vh] flex items-center justify-center"
        style={{ perspective: "2000px" }}
      >
        <AnimatePresence mode="popLayout">
          {DATA_MINIERE_7.map(
            (item, i) => i === index && <DataCard key={item.id} item={item} />
          )}
        </AnimatePresence>
      </div>

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

function DataCard({ item }: { item: any }) {
  const counterRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (counterRef.current) {
      const controls = animate(0, item.value, {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => {
          if (counterRef.current) counterRef.current.textContent = v.toFixed(1);
        },
      });
      return () => controls.stop();
    }
  }, [item.value]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, rotateY: 20 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      exit={{ opacity: 0, x: -100, rotateY: -20 }}
      transition={{ type: "spring", stiffness: 100, damping: 24 }}
      className="w-[90vw] md:w-[620px] bg-black/40 border border-white/10 p-10 md:p-14 backdrop-blur-3xl relative"
      style={{
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
        borderRadius: "2px",
      }}
    >
      <div className="absolute top-0 right-0 p-10 flex flex-col items-end">
        <span className="text-[8px] font-mono opacity-30 uppercase tracking-widest text-white">
          PROGR.
        </span>
        <span className="text-sm font-black text-emerald-500 font-mono italic">
          {item.progression}
        </span>
      </div>

      <div className="flex justify-between items-center mb-16 border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse rounded-full" />
          <span className="font-mono text-[9px] tracking-[0.5em] opacity-40 uppercase text-white">
            {item.ref}
          </span>
        </div>
        <span className="font-mono text-[9px] px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 tracking-widest uppercase italic">
          {item.status}
        </span>
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-2xl md:text-3xl tracking-[0.1em] uppercase italic text-white/90">
          {item.title}
        </h3>
        <p className="font-mono text-[10px] opacity-20 text-white tracking-[0.4em] uppercase">
          {item.detail}
        </p>
        <div className="flex items-baseline gap-4 py-8">
          <h2
            ref={counterRef}
            className="text-8xl md:text-[11rem] font-black tracking-tighter leading-none text-white"
          >
            0.0
          </h2>
          <span className="text-2xl md:text-4xl font-light italic opacity-20 text-emerald-500 uppercase">
            {item.unit}
          </span>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
        <div className="space-y-1">
          <p className="text-[8px] font-mono opacity-20 uppercase tracking-[0.3em] text-white">
            Validation
          </p>
          <p className="text-[10px] font-mono font-black uppercase text-white/60">
            FRAZIER_CERT_2026
          </p>
        </div>
        <div className="space-y-1 text-right">
          <p className="text-[8px] font-mono opacity-20 uppercase tracking-[0.3em] text-white">
            Source
          </p>
          <p className="text-[10px] font-mono font-black uppercase text-white/60">
            NONNZY_#0{item.id}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
