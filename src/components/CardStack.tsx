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
            className="absolute h-56 w-full md:h-60 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col justify-between overflow-hidden"
            style={{
              transformOrigin: "top center",
              /* Background composite : Noir à 90% + dégradé radial d'angle */
              background: `
                radial-gradient(circle at 15% 15%, #22c55e25 0%, #f9731615 30%, transparent 70%),
                #000000E6
              `,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            animate={{
              top: index * -cardOffset,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            {/* Lueur de bordure pour l'angle actif */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/10 blur-[50px] pointer-events-none" />

            <div className="relative z-10 font-medium text-[12px] md:text-[14px] text-white/80 leading-relaxed">
              {card.content}
            </div>

            <div className="relative z-10 flex flex-col gap-0.5 md:gap-1">
              <p className="text-white font-bold text-[12px] md:text-[13px] tracking-tight uppercase">
                {card.name}
              </p>
              <p className="text-white/40 font-semibold text-[9px] md:text-[10px] uppercase tracking-widest italic">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
