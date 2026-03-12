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
  useInView,
} from "framer-motion";
import { cn } from "@/lib/utils";

import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

// --- WRAPPER DE FOCUS (FLOU & OPACITÉ) ---
const SectionWrapper = ({
  children,
  index,
  activeIdx,
  setActiveIdx,
}: {
  children: React.ReactNode;
  index: number;
  activeIdx: number | null;
  setActiveIdx: (idx: number | null) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 });

  const isBlurred =
    (activeIdx !== null && activeIdx !== index) ||
    (activeIdx === null && !isInView);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setActiveIdx(index)}
      onMouseLeave={() => setActiveIdx(null)}
      animate={{
        opacity: isBlurred ? 0.35 : 1,
        filter: isBlurred ? "blur(12px)" : "blur(0px)",
        scale: isBlurred ? 0.98 : 1,
      }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="flex justify-center"
    >
      {children}
    </motion.div>
  );
};

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

      {/* BEAM - BRANCHÉE SUR TA VARIABLE CSS */}
      <div
        className="absolute left-6 md:left-20 top-0 h-full w-[1px] hidden sm:block opacity-50"
        style={{ backgroundColor: "var(--border-color)" }}
      >
        <motion.div
          style={{ height: beamY }}
          className="absolute top-0 w-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]"
        />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-40 relative z-10 px-6">
        {ZYMANTRA_CONTENT.map((item, index) => {
          return (
            <SectionWrapper
              key={index}
              index={index}
              activeIdx={activeIdx}
              setActiveIdx={setActiveIdx}
            >
              <CardContainer>
                <div
                  className={cn(
                    "flex flex-col lg:flex-row items-stretch gap-12 p-1 w-[95vw] lg:w-[1000px] transition-all duration-500 bg-card",
                    index % 2 !== 0 && "lg:flex-row-reverse"
                  )}
                  style={{
                    borderRadius: "var(--radius-vercel-zy)",
                    border: "1px solid var(--border-color)", // SYNCHRONISATION VARIABLE CSS
                  }}
                >
                  {/* IMAGE */}
                  <CardItem
                    translateZ={40}
                    className="w-full lg:w-1/2 aspect-square md:aspect-[4/5] overflow-hidden bg-muted m-1"
                    style={{
                      borderRadius: "calc(var(--radius-vercel-zy) - 1px)",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                  </CardItem>

                  {/* CONTENU */}
                  <div className="flex-1 flex flex-col items-start justify-center text-left space-y-6 p-10 lg:p-8">
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

                    <CardItem translateZ={30} className="flex items-start">
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
                          "px-10 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 bg-card text-muted-foreground",
                          "hover:text-emerald-500 hover:scale-105 duration-300"
                        )}
                        style={{ border: "1px solid var(--border-color)" }} // SYNCHRONISATION VARIABLE CSS
                      >
                        Lancer l'algorithme
                      </button>
                    </CardItem>
                  </div>
                </div>
              </CardContainer>
            </SectionWrapper>
          );
        })}
      </div>
    </div>
  );
}

CardContainer.displayName = "CardContainer";
CardItem.displayName = "CardItem";
ZymantraBeam.displayName = "ZymantraBeam";
