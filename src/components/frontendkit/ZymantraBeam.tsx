"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
  useMotionValue,
  HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// --- CONTEXTE 3D ---
const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

// --- COMPOSANTS DE STRUCTURE ---
const CardContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
    stiffness: 100,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    <MouseEnterContext.Provider value={[isMouseEnter, setIsMouseEnter]}>
      <div
        className={cn("flex items-center justify-center", className)}
        style={{ perspective: "1000px" }}
        onMouseMove={(e) => {
          if (!containerRef.current) return;
          const { left, top, width, height } =
            containerRef.current.getBoundingClientRect();
          x.set((e.clientX - left) / width - 0.5);
          y.set((e.clientY - top) / height - 0.5);
        }}
        onMouseEnter={() => setIsMouseEnter(true)}
        onMouseLeave={() => {
          setIsMouseEnter(false);
          x.set(0);
          y.set(0);
        }}
      >
        <motion.div
          ref={containerRef}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          {children}
        </motion.div>
      </div>
    </MouseEnterContext.Provider>
  );
};

const CardItem = ({ children, translateZ = 0, className, ...rest }: any) => {
  const context = useContext(MouseEnterContext);
  const isMouseEnter = context ? context[0] : false;
  return (
    <motion.div
      {...rest}
      animate={{
        transform: isMouseEnter
          ? `translateZ(${translateZ}px)`
          : `translateZ(0px)`,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function ZymantraBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  useEffect(() => {
    if (containerRef.current) setSvgHeight(containerRef.current.offsetHeight);
  }, []);

  const beamY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, svgHeight]),
    { stiffness: 80, damping: 25 }
  );

  const ZYMANTRA_CONTENT = [
    {
      badge: "PROFIL",
      title: "DATA DRIVEN ARCHITECT",
      description:
        "Chaka Junior Diané. Software Engineer & Data Analyst. Conception de systèmes algorithmiques orientés data-driven. Modélisation et structuration des dynamiques de données.",
      image: "/IMG-20260311-WA0001.jpg",
    },
    {
      badge: "P-R-S",
      title: "ALGO ZY RADAR",
      description:
        "Anyama : première commune dotée d'un radar économique synchronisant ressources et réalités.",
      image: "/IMG-20260116-WA0000.jpg",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full py-24 bg-background overflow-hidden transition-colors duration-500"
    >
      <MultiStepLoader
        loadingStates={[
          { text: "Synchronisation..." },
          { text: "Analyse des flux..." },
          { text: "Accès autorisé" },
        ]}
        loading={loading}
        duration={1000}
        onClose={() => setLoading(false)}
      />

      {/* BEAM BASÉ SUR LES VARIABLES CSS DU PROJET */}
      <div className="absolute left-6 md:left-12 top-0 h-full w-[1px] hidden sm:block opacity-20 bg-border">
        <motion.div
          style={{ height: beamY }}
          className="absolute top-0 w-full bg-primary shadow-[0_0_15px_hsl(var(--primary))]"
        />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-32 relative z-10 px-6">
        {ZYMANTRA_CONTENT.map((item, index) => {
          const isInactive = activeIdx !== null && activeIdx !== index;
          return (
            <motion.div
              key={index}
              onMouseEnter={() => setActiveIdx(index)}
              onMouseLeave={() => setActiveIdx(null)}
              animate={{
                opacity: isInactive ? 0.3 : 1,
                filter: isInactive ? "blur(10px)" : "none",
              }}
              className="flex justify-center"
            >
              <CardContainer>
                <div
                  className={cn(
                    "flex flex-col lg:flex-row items-center gap-12 p-8 md:p-12 w-[95vw] lg:w-[1000px] transition-all duration-500",
                    "bg-card border border-border/60",
                    index % 2 !== 0 && "lg:flex-row-reverse"
                  )}
                  style={{ borderRadius: "calc(var(--radius) * 2)" }}
                >
                  {/* IMAGE AVEC RATIO FIXE 4:3 POUR LA STABILITÉ */}
                  <CardItem
                    translateZ={40}
                    className="w-full lg:w-1/2 aspect-[4/3] overflow-hidden bg-muted"
                    style={{ borderRadius: "var(--radius)" }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                  </CardItem>

                  {/* CONTENU RÉACTIF AU MODE SOMBRE/CLAIR */}
                  <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                    <CardItem
                      translateZ={20}
                      className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase opacity-70"
                    >
                      {item.badge}
                    </CardItem>
                    <CardItem
                      translateZ={50}
                      className="text-3xl md:text-5xl font-black italic uppercase leading-none text-foreground tracking-tighter"
                    >
                      {item.title}
                    </CardItem>

                    <CardItem
                      translateZ={30}
                      className="min-h-[100px] flex items-center"
                    >
                      <TextGenerateEffect
                        words={item.description}
                        className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-sm"
                      />
                    </CardItem>

                    {/* BOUTON NEUMORPHISME RÉACTIF */}
                    <CardItem translateZ={80} className="pt-4">
                      <button
                        onClick={() => setLoading(true)}
                        className={cn(
                          "px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95",
                          "bg-card text-muted-foreground border border-border/40",
                          // Ombre adaptative : Sombre en Dark Mode, légère en Light Mode
                          "shadow-[6px_6px_12px_rgba(0,0,0,0.4),-4px_-4px_12px_rgba(255,255,255,0.01)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.7),-2px_-2px_10px_rgba(255,255,255,0.02)]",
                          "hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.01)]",
                          "hover:text-primary hover:border-primary/40"
                        )}
                      >
                        Lancer l'algorithme
                      </button>
                    </CardItem>
                  </div>
                </div>
              </CardContainer>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
