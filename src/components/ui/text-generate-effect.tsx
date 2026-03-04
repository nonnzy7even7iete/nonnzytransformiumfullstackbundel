"use client";
// Importation des bibliothèques nécessaires.
// "framer-motion" est la référence pour les animations fluides et performantes.
import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
// "cn" (classnames) est un utilitaire pour fusionner les classes Tailwind sans conflits.
import { cn } from "@/lib/utils";

/**
 * COMPOSANT : TextGenerateEffect
 * Architecture Data-Driven pour le projet Nonnzytransformium.
 * Ce composant décompose une chaîne de caractères et anime chaque mot.
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
  // useAnimate() : Retourne un tableau avec deux éléments :
  // 1. "scope" : Une référence (ref) à attacher au parent pour délimiter l'animation.
  // 2. "animate" : La fonction pour déclencher les changements de propriétés CSS.
  // Notation par point : "useAnimate" est une fonction exportée par le module 'framer-motion'.
  const [scope, animate] = useAnimate();

  // useInView() : Hook qui surveille si l'élément "scope" est visible à l'écran.
  // .once: false -> L'animation se déclenche à chaque fois qu'on scrolle (disruptif).
  // .amount: 0.3 -> Déclenche quand 30% de l'élément est visible.
  const isInView = useInView(scope, { once: false, amount: 0.3 });

  // words.split(" ") :
  // "words" est une chaîne (String).
  // ".split" est une méthode de l'objet String (notation par point).
  // Elle découpe le texte à chaque espace (" ") et renvoie un Tableau (Array) de mots.
  let wordsArray = words.split(" ");

  useEffect(() => {
    // Structure conditionnelle : On vérifie si l'élément est dans le champ de vision.
    if (isInView) {
      // animate() : Fonction de Framer Motion.
      // Paramètre 1 : "span" -> On cible toutes les balises <span> à l'intérieur du scope.
      // Paramètre 2 : Objet de propriétés (opacity, filter).
      // Paramètre 3 : Objet de configuration (duration, delay).
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ? duration : 1,
          // stagger(0.1) : Crée un effet de cascade. Chaque mot attend 0.1s après le précédent.
          delay: stagger(0.1),
        }
      );
    } else {
      // Rinitialisation hors écran pour permettre le rejeu au scroll.
      animate(
        "span",
        { opacity: 0, filter: filter ? "blur(10px)" : "none" },
        { duration: 0 }
      );
    }
    // Le tableau de dépendances [isInView, animate, ...] dit à React de relancer useEffect
    // seulement si l'une de ces valeurs change.
  }, [isInView, animate, filter, duration]);

  const renderWords = () => {
    return (
      // motion.div : Un composant div boosté par Framer Motion.
      // ref={scope} : On lie ce div à la fonction animate définie plus haut.
      <motion.div ref={scope} className="inline">
        {/* wordsArray.map() : 
           "wordsArray" est notre tableau de mots.
           ".map" est une méthode (notation par point) qui boucle sur chaque élément.
           "word" représente le mot actuel, "idx" son index (sa position 0, 1, 2...).
        */}
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              // AJOUT CHIRURGICAL : "mr-1.5" (margin-right).
              // Cela force un espace de 6px environ entre chaque mot,
              // réglant le problème du texte collé sans modifier tes chaînes de caractères.
              className="opacity-0 inline-block mr-1.5"
              style={{
                // Utilisation de la variable CSS globale de ton Design System.
                color: "var(--foreground)",
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    // cn() : Fonction utilitaire. Elle prend "font-sans" et fusionne avec tes props "className".
    <div className={cn("font-sans", className)}>
      <div className="mt-4">
        <div
          className="text-2xl leading-snug tracking-wide"
          // Respect absolu du Design System via les variables CSS natives.
          style={{ color: "var(--foreground)" }}
        >
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
