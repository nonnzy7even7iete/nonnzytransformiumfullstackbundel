"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const CheckFilled = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("w-6 h-6", className)}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
      clipRule="evenodd"
    />
  </svg>
);

export const MultiStepLoader = ({
  loadingStates,
  loading,
  duration = 2000,
}: {
  loadingStates: { text: string }[];
  loading?: boolean;
  duration?: number;
}) => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }
    const timeout = setTimeout(() => {
      setCurrentState((prev) =>
        prev === loadingStates.length - 1 ? prev : prev + 1
      );
    }, duration);
    return () => clearTimeout(timeout);
  }, [currentState, loading, loadingStates.length, duration]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-xl"
          style={{ backgroundColor: "var(--card-bg-glass)" }}
        >
          <div className="relative z-50">
            {loadingStates.map((state, index) => {
              const isCurrent = currentState === index;
              const isPast = currentState > index;
              return (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isCurrent ? 1 : isPast ? 0.3 : 0.1,
                    y: 0,
                  }}
                >
                  <CheckFilled
                    className={cn(
                      "transition-colors duration-500",
                      isCurrent || isPast
                        ? "text-emerald-500"
                        : "text-[var(--accents-2)]"
                    )}
                  />
                  <span
                    className={cn(
                      "text-lg font-bold uppercase tracking-tighter transition-colors duration-500",
                      isCurrent
                        ? "text-[var(--foreground)]"
                        : "text-[var(--accents-2)]"
                    )}
                  >
                    {state.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
