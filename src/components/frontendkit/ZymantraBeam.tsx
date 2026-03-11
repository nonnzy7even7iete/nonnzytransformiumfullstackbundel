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

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

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
        "CHAKA JUNIOR DIANÉ. SOFTWARE ENGINEER & DATA ANALYST. CONCEPTION DE SYSTÈMES ALGORITHMIQUES ORIENTÉS DATA-DRIVEN. MODÉLISATION ET STRUCTURATION DES DYNAMIQUES DE DONNÉES.",
      image: "/IMG-20260311-WA0001.jpg",
      isUppercase: true,
    },
    {
      badge: "P-R-S",
      title: "Algo Zy Radar",
      description:
        "Anyama : première commune dotée d'un radar économique synchronisant ressources et réalités.",
      image: "/IMG-20260116-WA0000.jpg",
      isUppercase: false,
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
          { text: "Analyse Flux..." },
          { text: "Calcul Zy..." },
        ]}
        loading={loading}
        duration={1000}
        onClose={() => setLoading(false)}
      />

      <div className="absolute left-6 md:left-20 top-0 h-full w-[1px] hidden sm:block opacity-30 bg-border">
        <motion.div
          style={{ height: beamY }}
          className="absolute top-0 w-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
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
                    "flex flex-col lg:flex-row items-center gap-12 p-1 w-[95vw] lg:w-[1000px] transition-all duration-500",
                    "bg-card border border-[#e5e5e5] dark:border-[#171717]",
                    index % 2 !== 0 && "lg:flex-row-reverse"
                  )}
                  style={{ borderRadius: "var(--radius-vercel-zy)" }}
                >
                  {/* IMAGE - CONSISTANTE */}
                  <CardItem
                    translateZ={40}
                    className="w-full lg:w-1/2 aspect-square md:aspect-[4/5] overflow-hidden bg-muted m-1"
                    style={{
                      borderRadius: "calc(var(--radius-vercel-zy) - 4px)",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                  </CardItem>

                  {/* CONTENU - ALIGNEMENT FIXE À GAUCHE POUR LA LISIBILITÉ */}
                  <div className="flex-1 flex flex-col items-start text-left space-y-6 p-10 lg:p-4">
                    <CardItem
                      translateZ={20}
                      className="text-emerald-500 font-black tracking-[0.5em] text-[10px] uppercase"
                    >
                      {item.badge}
                    </CardItem>

                    <CardItem
                      translateZ={50}
                      className={cn(
                        "italic leading-[0.9] text-foreground tracking-tighter",
                        item.isUppercase
                          ? "text-2xl md:text-4xl uppercase font-black"
                          : "text-3xl md:text-5xl font-extrabold"
                      )}
                    >
                      {item.title}
                    </CardItem>

                    <CardItem
                      translateZ={30}
                      className="min-h-[80px] flex items-start"
                    >
                      <TextGenerateEffect
                        words={item.description}
                        className={cn(
                          "text-muted-foreground leading-relaxed max-w-sm",
                          item.isUppercase
                            ? "text-[11px] md:text-[12px] font-medium uppercase tracking-wider"
                            : "text-sm md:text-base font-medium"
                        )}
                      />
                    </CardItem>

                    <CardItem translateZ={80} className="pt-2">
                      <button
                        onClick={() => setLoading(true)}
                        className={cn(
                          "px-10 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95",
                          "bg-card text-muted-foreground border border-border/40",
                          "shadow-[5px_5px_10px_rgba(0,0,0,0.06),-5px_-5px_10px_rgba(255,255,255,0.8)]",
                          "dark:shadow-[6px_6px_12px_rgba(0,0,0,0.5),-4px_-4px_12px_rgba(255,255,255,0.01)]",
                          "hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.06),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]",
                          "dark:hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.01)]",
                          "hover:text-emerald-500 transition-all"
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
