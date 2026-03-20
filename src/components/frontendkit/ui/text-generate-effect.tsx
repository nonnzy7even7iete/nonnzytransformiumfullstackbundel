"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words, // Ancien format (optionnel maintenant)
  children, // Nouveau format (optionnel maintenant)
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
      // On cible les spans (mots isolés) ET les balises sémantiques
      animate(
        "span, h1, h2, p, li",
        { opacity: 1, filter: filter ? "blur(0px)" : "none" },
        { duration: duration, delay: stagger(0.1) }
      );
    }
  }, [isInView, animate, filter, duration]);

  const renderContent = () => {
    // Si on utilise l'ancien format "words"
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
    // Si on utilise le nouveau format "children" (Shadcn Style)
    return <div ref={scope}>{children}</div>;
  };

  return (
    <div className={cn("prose prose-invert max-w-none", className)}>
      <div className="mt-4">
        <div className="leading-snug tracking-wide">{renderContent()}</div>
      </div>
    </div>
  );
};
