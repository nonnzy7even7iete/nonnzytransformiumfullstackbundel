"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  children,
  className,
  filter = true,
  duration = 0.5,
}: {
  words?: string;
  children?: React.ReactNode;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      // On anime les span (pour le mode words) ET les balises (pour le mode children)
      animate(
        "span, h1, h2, p, li",
        { opacity: 1, filter: filter ? "blur(0px)" : "none" },
        { duration: duration, delay: stagger(0.1) }
      );
    }
  }, [isInView, animate, filter, duration]);

  const renderContent = () => {
    // CAS 1 : ANCIENNE LOGIQUE (WORDS) - Préserve le comportement exact
    if (words) {
      let wordsArray = words.split(" ");
      return (
        <motion.div ref={scope} className="inline">
          {wordsArray.map((word, idx) => (
            <motion.span
              key={word + idx}
              className="opacity-0 inline-block mr-1.5"
              style={{
                filter: filter ? "blur(10px)" : "none",
                color: "var(--foreground)",
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      );
    }

    // CAS 2 : NOUVELLE LOGIQUE (CHILDREN)
    // On force l'opacité 0 SEULEMENT ICI sur les balises de haut niveau
    return (
      <div
        ref={scope}
        className="[&_h1]:opacity-0 [&_h2]:opacity-0 [&_p]:opacity-0 [&_li]:opacity-0"
      >
        {children}
      </div>
    );
  };

  return (
    <div className={cn("font-sans", className)}>
      <div className="mt-4">
        <div
          className="text-2xl leading-snug tracking-wide"
          style={{ color: "var(--foreground)" }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
