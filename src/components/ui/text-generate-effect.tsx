"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * COMPOSANT : TextGenerateEffect
 * Effet de révélation progressive des mots.
 * Idéal pour les résumés exécutifs ou les titres à fort impact.
 */
export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  // useAnimate permet de piloter manuellement l'animation des enfants (les spans)
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    // On cible tous les "span" à l'intérieur du scope
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        // stagger crée le décalage temporel entre chaque mot (l'effet de progression)
        delay: stagger(0.1),
      }
    );
  }, [scope.current, animate, filter, duration]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              /**
               * DESIGN SYSTEM :
               * On utilise 'text-foreground' (classe Tailwind liée au thème)
               * plutôt que 'text-[var(--foreground)]' pour garantir la compatibilité
               * avec les transitions de thèmes automatiques.
               */
              className="text-foreground opacity-0 inline-block"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-sans", className)}>
      <div className="mt-4">
        {/* On s'assure que le conteneur respecte la couleur du thème via text-foreground */}
        <div className="text-foreground text-2xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
