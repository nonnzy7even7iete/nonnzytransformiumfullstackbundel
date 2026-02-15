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
} from "framer-motion";
import { cn } from "@/lib/utils";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

// --- TYPES ---
interface ContentItem {
  badge: string;
  title: string;
  description: string;
  image: string;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  translateZ?: number;
}

// --- CONTEXTE 3D ---
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
          className="relative"
        >
          {children}
        </motion.div>
      </div>
    </MouseEnterContext.Provider>
  );
};

const CardItem = ({ children, translateZ = 0, className }: CardProps) => {
  const context = useContext(MouseEnterContext);
  const isMouseEnter = context ? context[0] : false;

  return (
    <motion.div
      animate={{ transform: `translateZ(${isMouseEnter ? translateZ : 0}px)` }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- COMPOSANT PRINCIPAL ---
const LOADER_STATES = [
  { text: "Accès au serveur Penguin" },
  { text: "Scan de la zone Anyama" },
  { text: "Synchronisation Algorithme Zy" },
  { text: "Génération du Radar" },
  { text: "Data Ready" },
];

export default function Zymantra({
  content = ZYMANTRA_CONTENT,
}: {
  content?: ContentItem[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setSvgHeight(containerRef.current.offsetHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const beamY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, svgHeight]),
    { stiffness: 80, damping: 25 }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full py-24 px-4 overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      <MultiStepLoader
        loadingStates={LOADER_STATES}
        loading={loading}
        duration={1500}
      />

      {/* BEAM (Fil d'Ariane) */}
      <div className="absolute left-6 md:left-12 top-0 h-full w-[1px] hidden sm:block opacity-15">
        <div className="h-full w-full bg-[var(--accents-2)]" />
        <motion.div
          style={{ height: beamY }}
          className="absolute top-0 w-full bg-emerald-500 shadow-[0_0_15px_#10b981]"
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-32 relative z-10">
        {content.map((item, index) => {
          const isInactive = activeIdx !== null && activeIdx !== index;
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              onMouseEnter={() => setActiveIdx(index)}
              onMouseLeave={() => setActiveIdx(null)}
              animate={{
                opacity: isInactive ? 0.3 : 1,
                filter: isInactive ? "blur(12px)" : "blur(0px)",
                scale: isInactive ? 0.97 : 1,
              }}
              className="transition-all duration-700 flex justify-center"
            >
              <CardContainer>
                <div
                  className={cn(
                    "flex flex-col items-center transition-all duration-500 w-[92vw] lg:w-[1100px] group/card",
                    "gap-8 p-5 md:p-8", // Gap réduit pour supprimer le vide
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  )}
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderRadius: "var(--radius-vercel)",
                    boxShadow: "0 0 0 1px var(--border-color)",
                  }}
                >
                  {/* IMAGE - Padding 3px strict */}
                  <CardItem
                    translateZ={80}
                    className="w-full lg:w-[45%] aspect-square relative overflow-hidden p-[3px] shrink-0 shadow-xl"
                    style={{
                      backgroundColor: "var(--accents-1)",
                      borderRadius: "var(--radius-vercel-zy)",
                    }}
                  >
                    <div
                      className="w-full h-full overflow-hidden relative"
                      style={{
                        borderRadius: "calc(var(--radius-vercel-zy) - 2px)",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 group-hover/card:scale-105 transition-all duration-1000"
                      />
                    </div>
                  </CardItem>

                  {/* TEXTE - Compact et aligné */}
                  <div className="flex-1 flex flex-col items-start justify-center space-y-6 px-2 md:px-10">
                    <CardItem translateZ={40}>
                      <span className="text-emerald-500 text-[10px] font-black tracking-[0.4em] uppercase">
                        {item.badge}
                      </span>
                    </CardItem>

                    <CardItem translateZ={60}>
                      <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-[0.9] tracking-tighter text-[var(--foreground)]">
                        {item.title}
                      </h2>
                    </CardItem>

                    <CardItem translateZ={30}>
                      <p className="opacity-40 text-sm md:text-lg leading-snug max-w-md text-[var(--foreground)]">
                        {item.description}
                      </p>
                    </CardItem>

                    <CardItem translateZ={100} className="w-full pt-4">
                      <button
                        onClick={() => setLoading(true)}
                        className="group relative h-14 w-full lg:w-64 overflow-hidden rounded-full transition-all active:scale-95 shadow-lg"
                        style={{ backgroundColor: "var(--foreground)" }}
                      >
                        <span
                          className="relative z-10 text-[9px] font-black uppercase tracking-[0.3em]"
                          style={{ color: "var(--background)" }}
                        >
                          Lancer l'algorithme
                        </span>
                        <div className="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
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

const ZYMANTRA_CONTENT: ContentItem[] = [
  {
    badge: "MANTRA 01",
    title: "DATA DRIVEN GROWTH",
    description:
      "Piloter une commune sans data, c'est naviguer sans radar dans un champ de mines financier. Réveiller cet angle mort pour l'exécutif.",
    image: "/IMG-20260211-WA0000.jpg",
  },
  {
    badge: "P-R-S 02",
    title: "ALGO ZY RADAR",
    description:
      "Anyama sera la première commune de Côte d'Ivoire dotée d'un radar économique synchronisant les ressources et les réalités.",
    image: "/IMG-20260116-WA0000.jpg",
  },
];
