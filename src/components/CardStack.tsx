"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assure-toi que l'import est correct

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const [cardOffset, setCardOffset] = useState(offset || 10);
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    const handleResize = () => {
      setCardOffset(window.innerWidth < 768 ? 6 : offset || 10);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    startFlipping();

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [offset]);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative h-56 w-[min(90vw,350px)] md:h-60 md:w-96 mx-auto">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className={cn(
              "absolute h-56 w-full md:h-60 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500",
              /* LES BORDURES : Noires en Light, Blanches/10 en Dark */
              "border-[1.5px] border-black/90 dark:border-white/10",
              /* OMBRES : Profondes pour détacher du fond */
              "shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.7)]",
              /* FOND : Blanc Pur/Givré vs Noir Profond */
              "bg-white dark:bg-[#010204] backdrop-blur-3xl"
            )}
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -cardOffset,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
              opacity: 1 - index * 0.2,
            }}
          >
            {/* LE SCRIM : Émeraude qui reste présent dans les deux modes */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_15%_0%,rgba(0,158,96,0.15)_0%,transparent_60%)]" />

            {/* TEXTURE DE GRAIN : Plus visible en Dark, très subtile en Light */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] mix-blend-multiply dark:mix-blend-overlay bg-[url('https://assets.aceternity.com/noise.webp')] bg-repeat pointer-events-none" />

            {/* CONTENU TEXTE */}
            <div className="relative z-10 font-medium text-[12px] md:text-[14px] text-black/80 dark:text-white/90 leading-relaxed">
              {card.content}
            </div>

            {/* PIED DE CARTE */}
            <div className="relative z-10 flex flex-col gap-0.5 md:gap-1">
              <p className="text-black dark:text-white font-black text-[12px] md:text-[13px] tracking-[0.15em] uppercase">
                {card.name}
              </p>
              <p className="text-emerald-600 dark:text-emerald-500/60 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em]">
                {card.designation}
              </p>
            </div>

            {/* EFFET DE GLOSS (Uniquement Light Mode) pour renforcer le côté premium */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/5 to-transparent dark:hidden" />
          </motion.div>
        );
      })}
    </div>
  );
};
