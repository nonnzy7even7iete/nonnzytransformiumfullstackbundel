"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  children,
  className,
  filter = true,
  duration = 0.4,
}: {
  words?: string;
  children?: React.ReactNode;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  // useAnimate() : Hook pour piloter les animations sur le 'scope'.
  const [scope, animate] = useAnimate();

  // isInView : Détecte la visibilité. once: false permet de rejouer l'effet au scroll.
  const isInView = useInView(scope, { once: false, amount: 0.05 });

  useEffect(() => {
    if (isInView) {
      // Animation CHIRURGICALE :
      // On cible spécifiquement les éléments ayant la classe 'animate-target'
      // que tu as déjà placée avec prévoyance dans ton HomePage.
      animate(
        ".animate-target, h1, h2, h3, p, li",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
          y: 0,
        },
        {
          duration: duration,
          // delay: stagger(0.15) : Augmentation légère pour un effet "cascade" plus pro.
          delay: stagger(0.15),
        }
      );
    } else {
      // RESET : On remet l'état initial (invisible + décalage vers le bas).
      animate(
        ".animate-target, h1, h2, h3, p, li",
        {
          opacity: 0,
          filter: filter ? "blur(10px)" : "none",
          y: 20,
        },
        { duration: 0.1 }
      );
    }
  }, [isInView, animate, filter, duration]);

  const renderContent = () => {
    // LOGIQUE 1 : Si passage par la prop 'words' (String)
    if (words) {
      return (
        <motion.div ref={scope} className="inline">
          {words.split(" ").map((word, idx) => (
            <motion.span
              key={word + idx}
              className="opacity-0 inline-block mr-1.5"
              style={{ filter: filter ? "blur(10px)" : "none" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      );
    }

    // LOGIQUE 2 : Si passage par 'children' (JSX complexe de Anyama)
    // On garde ton JSX intact sans modifier une seule virgule de tes textes.
    return (
      <div ref={scope} className="w-full">
        {children}
      </div>
    );
  };

  return (
    <div className={cn("font-sans", className)}>
      <div className="mt-4">
        <div className="leading-snug tracking-wide">{renderContent()}</div>
      </div>
    </div>
  );
};
