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
  duration = 8000,
  framerProps = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  className,
  containerClassName,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!words || words.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration, isPaused]);

  if (!words || words.length === 0) return null;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center text-center w-full min-h-[4rem]",
        containerClassName
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={cn(
            className,
            "absolute inset-0 flex items-center justify-center text-center px-4"
          )}
          {...framerProps}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>

      {/* Ghost element : invisible mais garde l'espace pour la plus longue phrase */}
      <span
        className={cn(
          className,
          "invisible pointer-events-none px-4 opacity-0"
        )}
      >
        {words.reduce((a, b) => (a.length > b.length ? a : b), "")}
      </span>
    </div>
  );
}
