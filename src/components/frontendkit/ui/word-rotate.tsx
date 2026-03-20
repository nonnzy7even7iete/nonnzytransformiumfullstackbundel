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
  duration = 12000, // Ajusté à 12 secondes
  framerProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  className,
  containerClassName,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!words || words.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration, isPaused]);

  if (!words || words.length === 0) return null;

  return (
    <div
      className={cn(
        "grid text-center items-center justify-center w-full min-h-[80px]",
        containerClassName
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={cn(className, "col-start-1 row-start-1 text-center")}
          {...framerProps}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
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
