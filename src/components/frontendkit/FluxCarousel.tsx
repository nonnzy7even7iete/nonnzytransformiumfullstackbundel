"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import { cn } from "@/lib/utils";

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
    notes: ["Frazier Index", "Audit 2026"],
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
    notes: ["Expertise CI", "Gisement Core"],
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
    notes: ["Hub CEDEAO", "Leader"],
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
    notes: ["Asset Guard", "Risk Zero"],
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
    notes: ["Jump +12", "Market Ready"],
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
    notes: ["Africa Top 5", "Elite Growth"],
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
    notes: ["Core Engine", "ROI Focus"],
  },
];

export default function MiningDashboard() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 30;
    if (info.offset.x < -threshold && index < DATA_MINIERE_7.length - 1)
      setIndex(index + 1);
    else if (info.offset.x > threshold && index > 0) setIndex(index - 1);
  };

  if (!mounted) return null;

  return (
    <div className="relative h-screen w-full bg-[#000000] overflow-hidden flex items-center justify-center font-sans">
      {/* ZONE DE CAPTURE DRAG */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="absolute w-full h-[65vh] top-[15vh] z-[100] cursor-grab active:cursor-grabbing"
      />

      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="relative flex items-center justify-center w-full max-w-[450px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {DATA_MINIERE_7.map((item, i) => (
            <Card key={item.id} item={item} position={i - index} />
          ))}
        </motion.div>
      </div>

      {/* PAGINATION PUR ÉMERAUDE */}
      <div className="absolute bottom-10 flex gap-3 z-[110]">
        {DATA_MINIERE_7.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-[2px] transition-all duration-500",
              index === i ? "w-12 bg-[#10b981]" : "w-3 bg-white"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ item, position }: { item: any; position: number }) {
  const isActive = position === 0;
  const counterRef = useRef<HTMLHeadingElement>(null);
  const xOffset =
    typeof window !== "undefined" && window.innerWidth < 768
      ? window.innerWidth * 0.5
      : 500;

  useEffect(() => {
    if (isActive && counterRef.current) {
      const controls = animate(0, item.value, {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => {
          if (counterRef.current) counterRef.current.textContent = v.toFixed(1);
        },
      });
      return () => controls.stop();
    }
  }, [item.value, isActive]);

  return (
    <motion.div
      initial={false}
      animate={{
        x: position * xOffset,
        rotateY: position * -25,
        z: isActive ? 0 : -500,
        opacity: isActive ? 1 : 0.2, // Les cartes de côté sont là mais l'active est le focus pur
        scale: isActive ? 1 : 0.7,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 30 }}
      className={cn(
        "absolute w-[90vw] md:w-[480px] h-auto min-h-[400px] p-10 flex flex-col justify-between overflow-hidden",
        "border-2 transition-all duration-300",
        isActive
          ? "bg-[#000000] border-[#10b981] shadow-[0_0_40px_rgba(16,185,129,0.2)]"
          : "bg-black border-white/20"
      )}
    >
      {/* LED STATUS - PURE GREEN */}
      <div
        className={cn(
          "absolute top-8 right-8 h-3 w-3 rounded-full",
          isActive ? "bg-[#10b981] shadow-[0_0_15px_#10b981]" : "bg-white/10"
        )}
      />

      {/* HEADER : FULL VISIBILITY */}
      <div className="relative z-10 flex flex-col gap-2">
        <p className="text-[11px] font-black tracking-[0.5em] uppercase text-[#10b981]">
          {item.status}
        </p>
        <h3 className="text-lg font-black text-white tracking-widest uppercase leading-tight">
          {item.title}
        </h3>
      </div>

      {/* BODY : ZERO OPACITY ON TEXT */}
      <div className="relative z-10 mt-6 flex-1">
        <div className="flex flex-col gap-4 border-l-2 border-[#10b981] pl-6 py-2">
          {item.notes.map((note: string, idx: number) => (
            <p
              key={idx}
              className="text-[12px] font-bold font-mono text-white uppercase tracking-tight"
            >
              {note}
            </p>
          ))}
          <p className="text-[11px] font-bold text-white uppercase leading-relaxed max-w-[250px]">
            {item.detail}
          </p>
        </div>
      </div>

      {/* COMPTEUR : PURE WHITE ON BLACK */}
      <div className="relative z-10 flex items-baseline gap-4 mt-8">
        <h2
          ref={counterRef}
          className="text-7xl md:text-8xl font-black italic text-white tracking-tighter leading-none"
        >
          0.0
        </h2>
        <span className="text-3xl font-black italic text-[#10b981] uppercase">
          {item.unit}
        </span>
      </div>

      {/* FOOTER : BOLD CONTRAST */}
      <div className="relative z-10 flex justify-between items-end pt-8 border-t-2 border-white/10 mt-6">
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-[#10b981] uppercase tracking-widest">
            System_Reference
          </span>
          <span className="text-[11px] font-bold text-white uppercase">
            {item.ref}
          </span>
        </div>
        <span className="text-sm font-black italic text-[#10b981]">
          {item.progression}
        </span>
      </div>
    </motion.div>
  );
}
