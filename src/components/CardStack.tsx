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
            className="absolute h-56 w-full md:h-60 rounded-3xl p-6 md:p-8 shadow-2xl border border-white/[0.12] flex flex-col justify-between overflow-hidden"
            style={{
              transformOrigin: "top center",
              /* Mix de Noir à 77% (C4 en hex) et dégradé radial */
              background: `
                radial-gradient(circle at 20% 20%, #22c55e30 0%, #f9731620 50%, transparent 100%),
                linear-gradient(135deg, #000000C4 0%, #000000C4 100%)
              `,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
            animate={{
              top: index * -cardOffset,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            {/* Grain/Bruit optionnel pour le style verre */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="relative z-10 font-normal text-[12px] md:text-[14px] text-white/90 leading-relaxed overflow-hidden">
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
