"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  framerProps?: MotionProps;
  className?: string;
  containerClassName?: string;
}

export function WordRotate({
  words,
  duration = 3000,
  framerProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  className,
  containerClassName,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    // On utilise grid pour superposer les éléments et garder l'espace
    <div className={cn("inline-grid text-left", containerClassName)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={cn(className, "col-start-1 row-start-1")}
          {...framerProps}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>

      {/* Élément invisible pour "réserver" l'espace le plus large et éviter le saut de layout */}
      <span
        className={cn(
          className,
          "invisible col-start-1 row-start-1 pointer-events-none"
        )}
      >
        {words.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
    </div>
  );
}
