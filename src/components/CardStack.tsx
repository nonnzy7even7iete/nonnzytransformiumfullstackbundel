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
            className="absolute h-56 w-full md:h-60 rounded-3xl p-6 md:p-8 shadow-[0_40px_80px_rgba(0,0,0,0.7)] border border-white/10 flex flex-col justify-between overflow-hidden"
            style={{
              transformOrigin: "top center",
              /* --- LOGIQUE SCRIM OVERLAY (POLISHED) --- */
              /* On passe d'un vert émeraude très subtil à un noir pur profond */
              background: `
                radial-gradient(circle at 10% 0%, rgba(0, 158, 96, 0.15) 0%, rgba(2, 4, 8, 1) 80%)
              `,
              backgroundColor: "#010204",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
            }}
            animate={{
              top: index * -cardOffset,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
              opacity: 1 - index * 0.2, // On ajoute un fondu sur les cartes de derrière
            }}
          >
            {/* Texture de grain (Grain-Overlay) */}
            <div className="absolute inset-0 opacity-[0.04] mix-blend-soft-light bg-[url('https://assets.aceternity.com/noise.webp')] bg-repeat pointer-events-none" />

            {/* Vignettage bas pour sceller le texte */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-0 pointer-events-none" />

            {/* Lueur d'accentuation émeraude */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 blur-[60px] pointer-events-none" />

            <div className="relative z-10 font-medium text-[12px] md:text-[14px] text-white/90 leading-relaxed">
              {card.content}
            </div>

            <div className="relative z-10 flex flex-col gap-0.5 md:gap-1">
              <p className="text-white font-black text-[12px] md:text-[13px] tracking-[0.15em] uppercase">
                {card.name}
              </p>
              <p className="text-emerald-500/60 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em]">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
