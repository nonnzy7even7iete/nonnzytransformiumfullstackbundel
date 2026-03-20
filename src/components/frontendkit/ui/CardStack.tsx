"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items = [],
  offset,
  scaleFactor,
}: {
  items?: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const [cardOffset, setCardOffset] = useState(offset || 10);
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  const startFlipping = useCallback(() => {
    return setInterval(() => {
      setCards((prevCards: Card[]) => {
        if (prevCards.length === 0) return prevCards;
        const newArray = [...prevCards];
        const lastItem = newArray.pop();
        if (lastItem) newArray.unshift(lastItem);
        return newArray;
      });
    }, 5000);
  }, []);

  useEffect(() => {
    setCards(items);
  }, [items]);

  useEffect(() => {
    const handleResize = () => {
      setCardOffset(window.innerWidth < 768 ? 6 : offset || 10);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    const intervalId = startFlipping();

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, [offset, startFlipping]);

  if (!cards || cards.length === 0) return null;

  return (
    <div className="relative h-56 w-[min(90vw,350px)] md:h-60 md:w-96 mx-auto">
      {/* Correction : Suppression de la prop inexistante 'items' sur AnimatePresence */}
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={cn(
              "absolute h-56 w-full md:h-60 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden",
              "border-[1.5px] border-black/90 dark:border-white/10",
              "shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.7)]",
              "bg-white dark:bg-[#010204] backdrop-blur-3xl"
            )}
            style={{ transformOrigin: "top center" }}
            animate={{
              top: index * -cardOffset,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
              opacity: 1 - index * 0.2,
            }}
            // Ajout d'une transition spécifique pour la sortie
            exit={{
              opacity: 0,
              scale: 1.1,
              y: 20,
              transition: { duration: 0.3 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* GRADIENT D'AMBIANCE */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_15%_0%,rgba(0,158,96,0.15)_0%,transparent_60%)]" />

            {/* TEXTURE DE BRUIT */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] mix-blend-multiply dark:mix-blend-overlay bg-[url('https://assets.aceternity.com/noise.webp')] bg-repeat pointer-events-none" />

            {/* CONTENU PRINCIPAL */}
            <div className="relative z-10 font-medium text-[12px] md:text-[14px] text-black/80 dark:text-white/90 leading-relaxed">
              {card.content}
            </div>

            {/* IDENTITÉ */}
            <div className="relative z-10 flex flex-col gap-0.5 md:gap-1">
              <p className="text-black dark:text-white font-black text-[12px] md:text-[13px] tracking-[0.15em] uppercase">
                {card.name}
              </p>
              <p className="text-emerald-600 dark:text-emerald-500/60 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em]">
                {card.designation}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
