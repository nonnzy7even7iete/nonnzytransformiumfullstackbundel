"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
              "absolute h-56 w-full md:h-60 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-colors duration-500",
              /* Bordures et Ombres adaptatives */
              "border border-black/5 dark:border-white/10 shadow-xl dark:shadow-[0_40px_80px_rgba(0,0,0,0.7)]",
              /* Background adaptatif : Blanc givré (Light) vs Noir profond (Dark) */
              "bg-white/80 dark:bg-[#010204]/90 backdrop-blur-3xl"
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
            {/* LE SCRIM ADAPTATIF : Vert/Blanc (Light) vs Vert/Noir (Dark) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-100 bg-[radial-gradient(circle_at_15%_0%,rgba(0,158,96,0.2)_0%,transparent_60%)]" />

            {/* Texture de grain subtile */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay bg-[url('https://assets.aceternity.com/noise.webp')] bg-repeat pointer-events-none" />

            {/* Contenu de la carte */}
            <div className="relative z-10 font-medium text-[12px] md:text-[14px] text-gray-700 dark:text-white/90 leading-relaxed">
              {card.content}
            </div>

            {/* Pied de carte adaptatif */}
            <div className="relative z-10 flex flex-col gap-0.5 md:gap-1">
              <p className="text-gray-900 dark:text-white font-black text-[12px] md:text-[13px] tracking-[0.15em] uppercase">
                {card.name}
              </p>
              <p className="text-emerald-600 dark:text-emerald-500/60 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em]">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Fonction utilitaire cn (au cas où elle n'est pas importée)
function cn(...inputs: any) {
  return inputs.filter(Boolean).join(" ");
}
