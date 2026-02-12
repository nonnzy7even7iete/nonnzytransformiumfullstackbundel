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

// --- LOGIQUE 3D CARD INTÉGRÉE ---
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
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 100,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
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
        className={`flex items-center justify-center ${className}`}
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
          className="relative"
        >
          {children}
        </motion.div>
      </div>
    </MouseEnterContext.Provider>
  );
};

const CardItem = ({ children, translateZ = 0, className, style }: any) => {
  const context = useContext(MouseEnterContext);
  const [isMouseEnter] = context || [false];
  const tZ = isMouseEnter ? translateZ : 0;
  return (
    <motion.div
      animate={{ transform: `translateZ(${tZ}px)` }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

// --- INTERFACES ---
interface ZymantraSection {
  badge: string;
  title: string;
  description: string;
  image: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

// --- COMPOSANT PRINCIPAL ---
export default function Zymantra({
  content = ZYMANTRA_CONTENT,
}: {
  content?: ZymantraSection[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
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
      className="relative w-full transition-colors duration-300 py-16 px-4 overflow-hidden"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* BEAM (Plus fin, plus discret) */}
      <div className="absolute left-6 md:left-10 top-0 h-full w-[1px] hidden sm:block opacity-20">
        <div className="h-full w-full bg-zinc-800" />
        <motion.div
          style={{ height: beamY }}
          className="absolute top-0 w-full bg-emerald-500 shadow-[0_0_15px_#10b981]"
        />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-20 relative z-10">
        {content.map((item, index) => {
          const isInactive = activeIdx !== null && activeIdx !== index;
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              onMouseEnter={() => setActiveIdx(index)}
              onMouseLeave={() => setActiveIdx(null)}
              animate={{
                opacity: isInactive ? 0.4 : 1,
                filter: isInactive ? "blur(4px)" : "blur(0px)",
                scale: isInactive ? 0.99 : 1,
              }}
              className="transition-all duration-500 flex justify-center"
            >
              <CardContainer>
                <div
                  className={`flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } items-stretch gap-6 p-5 md:p-8 border transition-all duration-500 w-[95vw] md:w-[880px] hover:border-emerald-500/40 group/card group`}
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border-color)",
                    borderRadius: "var(--radius-vercel)",
                  }}
                >
                  {/* IMAGE SECTION - Prend sa place sans flotter */}
                  <CardItem
                    translateZ={60}
                    className="w-full md:w-[42%] aspect-square relative border overflow-hidden shrink-0"
                    style={{
                      borderColor: "var(--border-color)",
                      borderRadius: "var(--radius-vercel-zy)",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale-[0.5] group-hover/card:grayscale-0 group-hover/card:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-4 right-4 h-2 w-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] animate-pulse" />
                  </CardItem>

                  {/* TEXT SECTION - Alignée verticalement au centre de l'image */}
                  <div className="flex-1 flex flex-col justify-center items-start space-y-4 py-2">
                    <CardItem translateZ={30}>
                      <span className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-[9px] font-black tracking-[0.3em] uppercase">
                        {item.badge}
                      </span>
                    </CardItem>

                    <CardItem translateZ={50}>
                      <h2
                        className="text-2xl md:text-3xl font-black italic uppercase leading-none tracking-tighter"
                        style={{ color: "var(--foreground)" }}
                      >
                        {item.title}
                      </h2>
                    </CardItem>

                    <CardItem translateZ={40}>
                      <p className="opacity-60 text-sm md:text-base leading-snug font-medium line-clamp-4">
                        {item.description}
                      </p>
                    </CardItem>

                    <CardItem translateZ={80} className="pt-2 w-full">
                      <button
                        onClick={item.onCtaClick}
                        className="group relative px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.15em] transition-all duration-300 shadow-lg overflow-hidden border border-white/5"
                        style={{
                          backgroundColor: "var(--foreground)",
                          color: "var(--background)",
                        }}
                      >
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                          {item.ctaText || "Propulser la data"}
                        </span>
                        <div className="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
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

const ZYMANTRA_CONTENT: ZymantraSection[] = [
  {
    badge: "MANTRA",
    title: "DATA DRIVEN GROWTH",
    description:
      "La donnée est la seule monnaie de rechange contre l’échec stratégique. Piloter une commune sans data, c'est naviguer sans radar dans un champ de mines financier. Réveiller cet angle mort, c’est convertir le vortex de l'exécutif.",
    image: "/IMG-20260211-WA0000.jpg",
    ctaText: "Lancer le radar",
  },
  {
    badge: "02_STRATEGY",
    title: "DIANE CHAKA JUNIOR",
    description:
      "Anyama sera la première commune de Côte d'Ivoire dotée d'un radar économique. Un outil capable de synchroniser les ressources officielles avec les réalités du terrain.",
    image: "/IMG-20260116-WA0000.jpg",
    ctaText: "Explorer l'algo",
  },
];
