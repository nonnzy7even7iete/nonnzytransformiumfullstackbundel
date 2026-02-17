"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface DockItem {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

interface DockProps {
  items: DockItem[];
  className?: string;
  iconSize?: number;
  magnification?: number;
  distance?: number;
}

export function Dock({
  items,
  className,
  iconSize = 16,
  magnification = 22,
  distance = 100,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    // CONTENEUR RELATIF POUR LE SCRIM + DOCK
    <div className="relative flex items-center justify-center w-full h-full">
      {/* SCRIM OVERLAY INTEGRE : Adaptatif Light/Dark */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-0"
        style={{
          background: `linear-gradient(to top, var(--background) 0%, var(--background) 30%, transparent 100%)`,
        }}
      />

      {/* LE DOCK LUI-MEME */}
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "relative z-10 flex h-[38px] items-center gap-3 px-3 rounded-full border transition-all duration-500 shadow-xl",
          // Adaptativité totale aux variables du système
          "bg-[var(--background)]/70 backdrop-blur-[30px] border-[var(--border-color)] shadow-zinc-200/50",
          "dark:bg-[var(--background)]/80 dark:backdrop-blur-[40px] dark:border-white/10 dark:shadow-black/60",
          className
        )}
      >
        {items.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <DockIcon
              key={idx}
              mouseX={mouseX}
              size={iconSize}
              magnification={magnification}
              distance={distance}
            >
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                className="flex h-full w-full items-center justify-center"
              >
                <IconComponent className="h-full w-full stroke-[1.5px] text-[var(--foreground)]/80 transition-colors duration-300" />
              </a>
            </DockIcon>
          );
        })}
      </motion.div>
    </div>
  );
}

function DockIcon({
  size,
  magnification,
  distance,
  mouseX,
  children,
}: {
  size: number;
  magnification: number;
  distance: number;
  mouseX: MotionValue<number>;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size]
  );
  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 180,
    damping: 15,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize }}
      className="flex aspect-square items-center justify-center rounded-full transition-colors"
    >
      {children}
    </motion.div>
  );
}
