"use client";
/**
 * @file text-generate-effect.tsx
 * @description Moteur d'animation polyvalent : gère le mot par mot ET le bloc par bloc.
 */
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
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: false, amount: 0.05 });

  useEffect(() => {
    if (isInView) {
      /**
       * SELECTION DYNAMIQUE :
       * Si 'words' existe, on cible les 'span' (les mots).
       * Sinon, on cible les balises de structure (les blocs de ton expertise).
       */
      const selector = words ? "span" : ".animate-target, h1, h2, h3, p, li";

      animate(
        selector,
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
          y: 0,
        },
        {
          duration: duration,
          // stagger(0.1) : Crée l'effet de cascade entre chaque unité (mot ou bloc).
          delay: stagger(words ? 0.1 : 0.15),
        }
      );
    } else {
      const selector = words ? "span" : ".animate-target, h1, h2, h3, p, li";
      animate(
        selector,
        {
          opacity: 0,
          filter: filter ? "blur(10px)" : "none",
          y: 10,
        },
        { duration: 0.1 }
      );
    }
  }, [isInView, animate, filter, duration, words]);

  const renderContent = () => {
    // LOGIQUE "WORDS" : Découpage chirurgical par mot.
    // Notation par point : words.split(" ") crée un tableau de chaînes.
    if (words) {
      return (
        <motion.div ref={scope} className="inline">
          {words.split(" ").map((word, idx) => (
            <motion.span
              key={word + idx}
              // opacity-0 est crucial pour éviter le flash avant animation.
              className="opacity-0 inline-block mr-1.5"
              style={{ filter: filter ? "blur(10px)" : "none" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      );
    }

    // LOGIQUE "CHILDREN" : Affichage par blocs de catégories (Anyama).
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
