"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * COMPOSANT : TextGenerateEffect
 * Adapté au Design System (Direct CSS Variable Injection)
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
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
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
              // On force la couleur via la variable CSS pour une réactivité totale au Dark Mode
              className="opacity-0 inline-block"
              style={{
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
    <div className={cn("font-sans", className)}>
      <div className="mt-4">
        {/* Le conteneur parent suit aussi la variable pour plus de sécurité */}
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
