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
  icon: React.ElementType;
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
  magnification = 60,
  distance = 140,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex h-[58px] items-end gap-2 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/10 dark:bg-black/10 p-2 backdrop-blur-md shadow-2xl",
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
        >
          <a
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : "_self"}
            rel="noreferrer"
            className="flex h-full w-full items-center justify-center"
          >
            <item.icon
              className={cn(
                "h-full w-full transition-colors duration-300",
                item.color ? item.color : "text-zinc-950 dark:text-white"
              )}
            />
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
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize }}
      className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-zinc-800/5 dark:bg-white/10 p-2 hover:bg-zinc-800/10 dark:hover:bg-white/20 transition-colors"
    >
      {children}
    </motion.div>
  );
}
