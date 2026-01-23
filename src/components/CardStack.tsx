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
  // Ajustement automatique de l'offset pour mobile (plus serré sur petit écran)
  const [cardOffset, setCardOffset] = useState(offset || 10);
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    // Gestion de l'offset responsive côté client
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardOffset(6); // Plus compact sur mobile
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
    /* Conteneur parent : w-full sur mobile pour utiliser toute la largeur disponible */
    <div className="relative h-56 w-[min(90vw,350px)] md:h-60 md:w-96 mx-auto">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute h-56 w-full md:h-60 rounded-3xl p-6 md:p-8 shadow-xl border border-black/[0.05] dark:border-white/[0.1] bg-white dark:bg-black flex flex-col justify-between"
            style={{ transformOrigin: "top center" }}
            animate={{
              top: index * -cardOffset,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            {/* CONTENU : Taille de texte ajustée */}
            <div className="font-normal text-[12px] md:text-[14px] text-foreground/70 leading-relaxed overflow-hidden">
              {card.content}
            </div>

            {/* FOOTER : Responsive spacing */}
            <div className="flex flex-col gap-0.5 md:gap-1">
              <p className="text-foreground font-bold text-[12px] md:text-[13px] tracking-tight uppercase">
                {card.name}
              </p>
              <p className="text-foreground/30 font-semibold text-[9px] md:text-[10px] uppercase tracking-widest italic">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
