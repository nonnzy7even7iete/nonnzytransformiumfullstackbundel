"use client";
import { useEffect, useRef } from "react";
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

  // amount: 0.1 pour déclencher tôt, once: false pour que ça reset au scroll
  const isInView = useInView(scope, { once: false, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      // Animation d'entrée : Révélation progressive
      animate(
        "span, h1, h2, p, li",
        { opacity: 1, filter: filter ? "blur(0px)" : "none", y: 0 },
        { duration: duration, delay: stagger(0.1) }
      );
    } else {
      // Reset : On remet tout à zéro quand on sort du champ de vision
      animate(
        "span, h1, h2, p, li",
        { opacity: 0, filter: filter ? "blur(10px)" : "none", y: 10 },
        { duration: 0.1 }
      );
    }
  }, [isInView, animate, filter, duration]);

  const renderContent = () => {
    // LOGIQUE "WORDS" (Génératif mot par mot)
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

    // LOGIQUE "CHILDREN" (Génératif phrase par phrase)
    return (
      <div
        ref={scope}
        className="[&_h1]:opacity-0 [&_h2]:opacity-0 [&_p]:opacity-0 [&_li]:opacity-0 [&_h1]:translate-y-4 [&_h2]:translate-y-4 [&_p]:translate-y-4"
      >
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
