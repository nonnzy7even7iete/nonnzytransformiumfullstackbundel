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
    // Le conteneur occupe toute la largeur pour que le brouillard s'étende partout
    <div className="fixed bottom-0 left-0 right-0 w-full flex flex-col items-center pointer-events-none z-[100]">
      {/* LE VRAI SCRIM OVERLAY (Brouillard massif) */}
      <div
        className="absolute inset-x-0 bottom-0 h-[300px] w-full pointer-events-none"
        style={{
          background: `linear-gradient(to top, 
            var(--background) 0%, 
            var(--background) 15%, 
            var(--background)/95 30%, 
            var(--background)/75 45%, 
            var(--background)/40 65%, 
            var(--background)/10 85%, 
            transparent 100%)`,
        }}
      />

      {/* LE DOCK */}
      <div className="relative z-10 pb-12 pointer-events-auto">
        <motion.div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className={cn(
            "flex h-[44px] items-center gap-4 px-4 rounded-full border transition-all duration-500",
            "bg-[var(--background)]/30 backdrop-blur-[25px] border-[var(--border-color)] shadow-2xl",
            "dark:bg-black/30 dark:backdrop-blur-[40px] dark:border-white/5 dark:shadow-black/80",
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
                  <IconComponent className="h-full w-full stroke-[1.2px] text-[var(--foreground)] transition-opacity duration-300 hover:opacity-100 opacity-70" />
                </a>
              </DockIcon>
            );
          })}
        </motion.div>
      </div>
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
      className="flex aspect-square items-center justify-center rounded-full"
    >
      {children}
    </motion.div>
  );
}
