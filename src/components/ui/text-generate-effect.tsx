"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * COMPOSANT : TextGenerateEffect
 * Version Disruptive : Rejoue au scroll + Full Reactive Design System
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
  // useAnimate : Permet de piloter les propriétés CSS directement.
  const [scope, animate] = useAnimate();

  // useInView : Détecte la présence à l'écran.
  // once: false permet de relancer l'effet quand on remonte/redescend.
  const isInView = useInView(scope, { once: false, amount: 0.3 });

  // .split(" ") : Découpage de la chaîne de caractères par les espaces.
  let wordsArray = words.split(" ");

  useEffect(() => {
    // Logique conditionnelle basée sur la visibilité (isInView).
    if (isInView) {
      // ÉTAPE 1 : Animation d'entrée (Reveal).
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.1), // Décalage successif des mots.
        }
      );
    } else {
      // ÉTAPE 2 : Réinitialisation discrète hors écran.
      // On remet à 0 pour que l'effet soit prêt à se rejouer au prochain scroll.
      animate(
        "span",
        { opacity: 0, filter: filter ? "blur(10px)" : "none" },
        { duration: 0 } // Immédiat pour ne pas être vu par l'utilisateur.
      );
    }
  }, [isInView, animate, filter, duration]);

  const renderWords = () => {
    return (
      // Le 'scope' délimite la zone d'action de la fonction animate.
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              // opacity-0 : État initial pour éviter le flash de contenu.
              // text-[family-name:var(--font-sans)] ou équivalent peut être ajouté ici.
              className="opacity-0 inline-block"
              style={{
                // APPLICATION STRICTE DU DESIGN SYSTEM :
                // On lie directement la couleur à la variable CSS de la Navbar.
                color: "var(--foreground)",
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
    // Utilisation de cn() pour fusionner tes classes sans casser l'existant.
    <div className={cn("font-sans", className)}>
      <div className="mt-4">
        <div
          className="text-2xl leading-snug tracking-wide"
          style={{ color: "var(--foreground)" }}
        >
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
