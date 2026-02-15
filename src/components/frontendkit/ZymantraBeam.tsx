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
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";

// --- SOUS-COMPOSANTS DU LOADER (Design Dichotomique) ---
const CheckFilled = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("w-6 h-6", className)}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
      clipRule="evenodd"
    />
  </svg>
);

const InternalLoader = ({
  loading,
  duration = 2000,
}: {
  loading: boolean;
  duration?: number;
}) => {
  const [currentState, setCurrentState] = useState(0);
  const states = [
    { text: "Accès au serveur Penguin" },
    { text: "Scan de la zone Anyama" },
    { text: "Synchronisation Algorithme Zy" },
    { text: "Data Ready" },
  ];

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }
    const timeout = setTimeout(() => {
      setCurrentState((prev) => (prev === states.length - 1 ? prev : prev + 1));
    }, duration);
    return () => clearTimeout(timeout);
  }, [currentState, loading, states.length, duration]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-xl"
          style={{ backgroundColor: "var(--card-bg-glass)" }}
        >
          <div className="relative z-50">
            {states.map((state, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity:
                    currentState === index
                      ? 1
                      : currentState > index
                      ? 0.3
                      : 0.1,
                  y: 0,
                }}
              >
                <CheckFilled
                  className={cn(
                    "transition-colors duration-500",
                    currentState >= index
                      ? "text-emerald-500"
                      : "text-[var(--accents-2)]"
                  )}
                />
                <span
                  className={cn(
                    "text-lg font-bold uppercase tracking-tighter transition-colors duration-500",
                    currentState === index
                      ? "text-[var(--foreground)]"
                      : "text-[var(--accents-2)]"
                  )}
                >
                  {state.text}
                </span>
              </motion.div>
            ))}
            <button
              onClick={() => window.location.reload()}
              className="mt-8 text-[10px] font-black uppercase tracking-[0.4em] opacity-20 hover:opacity-100 text-[var(--foreground)]"
            >
              [ Fermer le scan ]
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 100,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
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
        style={{ perspective: "1000px" }}
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
          className="relative transition-all duration-200 ease-linear"
        >
          {children}
        </motion.div>
      </div>
    </MouseEnterContext.Provider>
  );
};

const CardItem = ({ children, translateZ = 0, className }: any) => {
  const context = useContext(MouseEnterContext);
  return (
    <motion.div
      animate={{ transform: `translateZ(${context?.[0] ? translateZ : 0}px)` }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- COMPOSANT PRINCIPAL ---
export default function Zymantra({
  content = ZYMANTRA_CONTENT,
}: {
  content?: any[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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
      className="relative w-full py-24 px-4 overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Intégration du Loader interne */}
      <InternalLoader loading={isLoading} />

      {/* BEAM */}
      <div className="absolute left-6 md:left-12 top-0 h-full w-[1px] hidden sm:block opacity-10">
        <div className="h-full w-full bg-[var(--accents-2)]" />
        <motion.div
          style={{ height: beamY }}
          className="absolute top-0 w-full bg-emerald-500 shadow-[0_0_20px_#10b981]"
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-40 relative z-10">
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
                filter: isInactive ? "blur(4px)" : "blur(0px)",
                scale: isInactive ? 0.98 : 1,
              }}
              className="transition-all duration-700 flex justify-center"
            >
              <CardContainer>
                <div
                  className={cn(
                    "flex flex-col gap-12 p-8 md:p-16 border transition-all duration-500 w-[92vw] lg:w-[1150px] group/card",
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  )}
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border-color)",
                    borderRadius: "var(--radius-vercel)",
                  }}
                >
                  {/* IMAGE */}
                  <CardItem
                    translateZ={100}
                    className="w-full lg:w-1/2 aspect-square relative border overflow-hidden shadow-2xl"
                    style={{
                      borderColor: "var(--border-color)",
                      borderRadius: "var(--radius-vercel-zy)",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 group-hover/card:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute top-6 right-6 h-3 w-3 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981] animate-pulse" />
                  </CardItem>

                  {/* TEXTE */}
                  <div className="flex-1 flex flex-col items-start space-y-8">
                    <CardItem translateZ={50}>
                      <span className="px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-[10px] font-black tracking-[0.4em] uppercase">
                        {item.badge}
                      </span>
                    </CardItem>
                    <CardItem translateZ={80}>
                      <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-[0.9] tracking-tighter">
                        {item.title}
                      </h2>
                    </CardItem>
                    <CardItem translateZ={40}>
                      <p className="opacity-50 text-base md:text-lg leading-relaxed font-medium max-w-xl">
                        {item.description}
                      </p>
                    </CardItem>

                    {/* BOUTON DÉCLENCHEUR DU LOADER */}
                    <CardItem translateZ={120} className="pt-6 w-full">
                      <button
                        onClick={() => setIsLoading(true)}
                        className="group relative px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl overflow-hidden"
                        style={{
                          backgroundColor: "var(--foreground)",
                          color: "var(--background)",
                        }}
                      >
                        <span className="relative z-10 transition-colors group-hover:text-emerald-500">
                          Lancer l'algorithme
                        </span>
                        <div className="absolute inset-0 bg-[var(--accents-1)] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
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

const ZYMANTRA_CONTENT = [
  {
    badge: "MANTRA",
    title: "DATA DRIVEN GROWTH",
    description:
      "La donnée est la seule monnaie de rechange contre l’échec stratégique. Piloter une commune sans data, c'est naviguer sans radar dans un champ de mines financier. Réveiller cet angle mort, c’est convertir le vortex de l'exécutif.",
    image: "/IMG-20260211-WA0000.jpg",
  },
  {
    badge: "P-R-S",
    title: "L'Algo Zy : Radar",
    description:
      "Anyama sera la première commune de Côte d'Ivoire dotée d'un radar économique. Un outil capable de synchroniser les ressources officielles avec les réalités du terrain.",
    image: "/IMG-20260116-WA0000.jpg",
  },
];
