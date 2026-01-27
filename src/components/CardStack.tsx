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
      if (window.innerWidth < 768) {
        setCardOffset(6);
      } else {
        setCardOffset(offset || 10);
      }
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
            className="absolute h-56 w-full md:h-60 rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20 flex flex-col justify-between overflow-hidden"
            style={{
              transformOrigin: "top center",
              /* Glassmorphism & Radial Gradient */
              background: `radial-gradient(circle at 20% 20%, #22c55e40 0%, #f9731630 100%)`,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            animate={{
              top: index * -cardOffset,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            {/* Overlay subtile pour renforcer l'effet de profondeur */}
            <div className="absolute inset-0 bg-white/5 dark:bg-black/5 pointer-events-none" />

            <div className="relative z-10 font-normal text-[12px] md:text-[14px] text-foreground/90 leading-relaxed overflow-hidden">
              {card.content}
            </div>

            <div className="relative z-10 flex flex-col gap-0.5 md:gap-1">
              <p className="text-foreground font-bold text-[12px] md:text-[13px] tracking-tight uppercase">
                {card.name}
              </p>
              <p className="text-foreground/50 font-semibold text-[9px] md:text-[10px] uppercase tracking-widest italic">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
