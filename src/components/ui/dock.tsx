"use client";

import React, { useRef, useMemo } from "react";
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
  color?: string;
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
  iconSize = 40,
  magnification = 65,
  distance = 150,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex h-[64px] items-end gap-4 rounded-2xl border px-3 pb-3 pt-2 shadow-2xl transition-all duration-500",
        "border-white/30 bg-white/20 backdrop-blur-2xl", // Light mode glass
        "dark:border-white/10 dark:bg-black/20 dark:backdrop-blur-3xl", // Dark mode glass
        className
      )}
    >
      {items.map((item, idx) => (
        <DockIcon
          key={idx}
          mouseX={mouseX}
          size={iconSize}
          magnification={magnification}
          distance={distance}
          label={item.label}
        >
          <a
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : "_self"}
            rel="noreferrer"
            className="group flex h-full w-full flex-col items-center justify-center"
          >
            <item.icon
              className={cn(
                "h-full w-full transition-all duration-500 ease-out",
                item.color
                  ? item.color
                  : "text-zinc-900/80 dark:text-zinc-100/80 group-hover:text-zinc-950 dark:group-hover:text-white"
              )}
            />
            <span className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] font-extralight uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
              {item.label}
            </span>
          </a>
        </DockIcon>
      ))}
    </motion.div>
  );
}

function DockIcon({
  size,
  magnification,
  distance,
  mouseX,
  children,
  label,
}: {
  size: number;
  magnification: number;
  distance: number;
  mouseX: MotionValue<number>;
  children: React.ReactNode;
  label: string;
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
    mass: 0.15,
    stiffness: 200,
    damping: 15,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize }}
      className="relative flex aspect-square items-center justify-center rounded-xl transition-colors hover:bg-white/10 dark:hover:bg-white/5"
    >
      {children}
    </motion.div>
  );
}
