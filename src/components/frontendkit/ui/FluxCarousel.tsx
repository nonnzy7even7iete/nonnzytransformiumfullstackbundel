"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * SOURCE DE DONNÉES SOUVERAINE : FRAZIER 2026
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
    // .info.offset.x : Accès point-notation pour les vecteurs de mouvement
    if (info.offset.x < -threshold && index < DATA_MINIERE_7.length - 1)
      setIndex(index + 1);
    else if (info.offset.x > threshold && index > 0) setIndex(index - 1);
  };

  if (!mounted) return null;

  return (
    <div className="relative h-screen w-full bg-[var(--background)] overflow-hidden flex items-center justify-center font-sans transition-colors duration-500">
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
          className="relative flex items-center justify-center w-full max-w-[300px] md:max-w-[450px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {DATA_MINIERE_7.map((item, i) => (
            <Card key={item.id} item={item} position={i - index} />
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-10 flex gap-2 z-[110]">
        {DATA_MINIERE_7.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-[2px] transition-all duration-700",
              index === i
                ? "w-10 bg-emerald-500 shadow-[0_0_10px_#10b981]"
                : "w-2 bg-[var(--foreground)] opacity-20"
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
      ? window.innerWidth * 0.45
      : 480;

  useEffect(() => {
    if (isActive && counterRef.current) {
      const controls = animate(0, item.value, {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => {
          // .current.textContent : Mise à jour directe pour éviter les re-renders inutiles
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
        rotateY: position * -30,
        z: isActive ? 0 : -400,
        opacity: isActive ? 1 : 0.4,
        scale: isActive ? 1 : 0.8,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 25 }}
      className={cn(
        "absolute w-[85vw] md:w-[450px] h-auto min-h-[380px] p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-all duration-700",
        "backdrop-blur-[35px] border-2",
        isActive
          ? "border-emerald-500/30 bg-[var(--card-bg)] shadow-[0_40px_100px_rgba(0,0,0,0.1)]"
          : "border-[var(--border-color)] bg-transparent"
      )}
      style={{ borderRadius: "var(--radius-vercel, 14px)" }} // .radius-vercel : Respect strict de tes 14px
    >
      <div
        className={cn(
          "absolute top-6 right-6 h-2 w-2 rounded-full transition-all duration-1000",
          isActive
            ? "bg-emerald-500 shadow-[0_0_12px_#10b981]"
            : "bg-[var(--foreground)] opacity-10"
        )}
      />

      <div className="relative z-10 flex flex-col gap-1.5">
        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-emerald-500">
          {item.status}
        </p>
        <h3 className="text-[14px] font-bold text-[var(--foreground)] tracking-[0.1em] uppercase leading-tight">
          {item.title}
        </h3>
      </div>

      <div className="relative z-10 mt-5 flex-1">
        <div className="flex flex-col gap-3 border-l-2 border-emerald-500/30 pl-4 py-1">
          {item.notes.map((note: string, idx: number) => (
            <p
              key={idx}
              className="text-[11px] font-mono text-[var(--foreground)] font-bold italic leading-none tracking-tight"
            >
              {note}
            </p>
          ))}
          <p className="text-[11px] font-medium text-[var(--foreground)] uppercase leading-relaxed max-w-[220px]">
            {item.detail}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex items-baseline gap-3 mt-6">
        <h2
          ref={counterRef}
          className="text-7xl md:text-8xl font-black italic text-[var(--foreground)] tracking-tighter leading-none"
        >
          0.0
        </h2>
        <span className="text-2xl font-black italic text-emerald-500 uppercase tracking-tighter">
          {item.unit}
        </span>
      </div>

      <div className="relative z-10 flex justify-between items-end pt-6 border-t-2 border-[var(--border-color)] mt-5">
        <div className="flex flex-col">
          <span className="text-[8px] font-mono font-black uppercase tracking-widest text-emerald-500">
            Node_Ref
          </span>
          <span className="text-[11px] font-mono font-bold text-[var(--foreground)] uppercase">
            {item.ref}
          </span>
        </div>
        <span className="text-[12px] font-black italic text-emerald-500">
          {item.progression}
        </span>
      </div>
    </motion.div>
  );
}
