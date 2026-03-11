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

// COMPOSANTS EXTERNES (CORRIGÉS)
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// --- INTERFACES ---
interface ContentItem {
  badge: string;
  title: string;
  description: string;
  image: string;
}

interface CardItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  translateZ?: number;
}

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

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 100,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 100,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    x.set((e.clientX - left) / width - 0.5);
    y.set((e.clientY - top) / height - 0.5);
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEnter, setIsMouseEnter]}>
      <div
        className={cn("flex items-center justify-center", className)}
        style={{ perspective: "1200px" }}
        onMouseMove={handleMouseMove}
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

const CardItem = ({
  children,
  translateZ = 0,
  className,
  ...rest
}: CardItemProps) => {
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

// --- DATA ---
const ZYMANTRA_CONTENT: ContentItem[] = [
  {
    badge: "PROFIL",
    title: "DATA DRIVEN ARCHITECT",
    description:
      "Chaka Junior Diané. Software Engineer & Data Analyst. Conception de systèmes algorithmiques orientés data-driven. Modélisation, structuration et extraction des dynamiques de données.",
    image: "/IMG-20260311-WA0001.jpg",
  },
  {
    badge: "P-R-S",
    title: "ALGO ZY RADAR",
    description:
      "Anyama sera la première commune de Côte d'Ivoire dotée d'un radar économique synchronisant les ressources et les réalités.",
    image: "/IMG-20260116-WA0000.jpg",
  },
];

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

  return (
    <div
      ref={containerRef}
      className="relative w-full py-24 bg-background overflow-hidden"
    >
      <MultiStepLoader
        loadingStates={[
          { text: "Scan Data..." },
          { text: "Calcul Algorithme..." },
          { text: "Ready" },
          { text: "Logique metier et serveur en cours d execution" },
        ]}
        loading={loading}
        duration={1000}
        onClose={() => setLoading(false)}
      />

      <div className="absolute left-6 md:left-12 top-0 h-full w-[1px] hidden sm:block opacity-20 bg-border">
        <motion.div
          style={{ height: beamY }}
          className="absolute top-0 w-full bg-emerald-500 shadow-[0_0_15px_#10b981]"
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-32 relative z-10 px-6">
        {ZYMANTRA_CONTENT.map((item, index) => {
          const isInactive = activeIdx !== null && activeIdx !== index;
          return (
            <motion.div
              key={index}
              onMouseEnter={() => setActiveIdx(index)}
              onMouseLeave={() => setActiveIdx(null)}
              animate={{
                opacity: isInactive ? 0.4 : 1,
                filter: isInactive ? "blur(8px)" : "none",
              }}
              className="flex justify-center transition-all duration-500"
            >
              <CardContainer>
                <div
                  className={cn(
                    "flex flex-col lg:flex-row items-center gap-10 p-8 bg-card border border-border shadow-2xl",
                    index % 2 !== 0 && "lg:flex-row-reverse"
                  )}
                  style={{ borderRadius: "var(--radius-vercel)" }}
                >
                  <CardItem
                    translateZ={60}
                    className="w-full lg:w-[450px] aspect-square overflow-hidden"
                    style={{ borderRadius: "var(--radius-vercel)" }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                  </CardItem>

                  <div className="flex-1 space-y-6">
                    <CardItem
                      translateZ={30}
                      className="text-emerald-500 text-[10px] font-black tracking-widest uppercase"
                    >
                      {item.badge}
                    </CardItem>
                    <CardItem
                      translateZ={50}
                      className="text-4xl md:text-6xl font-black italic uppercase leading-tight text-foreground"
                    >
                      {item.title}
                    </CardItem>

                    <CardItem translateZ={20} className="min-h-[80px]">
                      <TextGenerateEffect
                        words={item.description}
                        className="text-sm md:text-lg opacity-80 leading-relaxed max-w-md"
                      />
                    </CardItem>

                    <CardItem translateZ={100} className="pt-6">
                      <button
                        onClick={() => setLoading(true)}
                        className="px-10 py-4 bg-foreground text-background text-[10px] font-black uppercase rounded-full tracking-[0.2em] hover:bg-emerald-600 transition-all active:scale-95"
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
