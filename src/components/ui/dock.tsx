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
  iconSize = 38,
  magnification = 60,
  distance = 140,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex h-[64px] items-center gap-4 px-4 rounded-full border shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500",
        // Light Mode : Verre blanc pur
        "border-white/40 bg-white/30 backdrop-blur-2xl shadow-zinc-200",
        // Dark Mode : Verre noir profond
        "dark:border-white/5 dark:bg-black/30 dark:backdrop-blur-3xl dark:shadow-black/50",
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
              <IconComponent className="h-full w-full stroke-[1.2px] text-zinc-900/70 dark:text-zinc-100/70 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300" />
            </a>
          </DockIcon>
        );
      })}
    </motion.div>
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
      className="flex aspect-square items-center justify-center rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
    >
      {children}
    </motion.div>
  );
}
