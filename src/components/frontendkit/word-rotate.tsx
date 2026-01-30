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
  words = [],
  duration = 3000,
  framerProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.35, ease: "easeInOut" },
  },
  className,
  containerClassName,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  if (!words || words.length === 0) return null;

  return (
    <div
      className={cn("inline-grid text-left items-center", containerClassName)}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          // Ici, on s'assure que les classes passées via props (comme dark:text-white)
          // sont appliquées à chaque nouveau mot monté
          className={cn(className, "col-start-1 row-start-1")}
          {...framerProps}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>

      {/* Ghost element pour maintenir la structure CSS même pendant le changement de thème */}
      <span
        className={cn(
          className,
          "invisible col-start-1 row-start-1 pointer-events-none"
        )}
      >
        {words.reduce((a, b) => (a.length > b.length ? a : b), "")}
      </span>
    </div>
  );
}
