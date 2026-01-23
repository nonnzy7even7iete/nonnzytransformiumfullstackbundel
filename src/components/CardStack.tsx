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
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();
    return () => clearInterval(interval);
  }, []);

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
    <div className="relative h-60 w-full md:h-60 md:w-96">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute h-60 w-full md:h-60 md:w-96 rounded-3xl p-8 shadow-xl border border-black/[0.05] dark:border-white/[0.1] bg-white dark:bg-black flex flex-col justify-between"
            style={{ transformOrigin: "top center" }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            {/* CONTENU DE LA CARTE */}
            <div className="font-normal text-[14px] text-foreground/70 leading-relaxed">
              {card.content}
            </div>

            {/* FOOTER DE LA CARTE (Design Vercel-ish) */}
            <div className="flex flex-col gap-1">
              <p className="text-foreground font-bold text-[13px] tracking-tight uppercase">
                {card.name}
              </p>
              <p className="text-foreground/30 font-semibold text-[10px] uppercase tracking-widest italic">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
