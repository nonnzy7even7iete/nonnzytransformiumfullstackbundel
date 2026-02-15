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
          className="relative transition-all duration-200 ease-linear"
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
  return (
    <motion.div
      animate={{ transform: `translateZ(${isMouseEnter ? translateZ : 0}px)` }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className={className}
      style={style}
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
      {/* BEAM (Fil d'Ariane stratégique) */}
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
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-12 p-8 md:p-16 border transition-all duration-500 w-[92vw] lg:w-[1150px] group/card`}
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border-color)",
                    borderRadius: "var(--radius-vercel)",
                  }}
                >
                  {/* IMAGE - Heritage 7px */}
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

                    <CardItem translateZ={120} className="pt-6 w-full">
                      <button
                        className="group relative px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl overflow-hidden"
                        style={{
                          backgroundColor: "var(--foreground)",
                          color: "var(--background)",
                        }}
                      >
                        <span className="relative z-10">
                          Lancer l'algorithme
                        </span>
                        <div className="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
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
    title: "L'Algo Zy :  Radar",
    description:
      "Anyama sera la première commune de Côte d'Ivoire dotée d'un radar économique. Un outil capable de synchroniser les ressources officielles avec les réalités du terrain.",
    image: "/IMG-20260116-WA0000.jpg",
  },
];
