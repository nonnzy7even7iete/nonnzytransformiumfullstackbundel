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

// --- LOGIQUE 3D CARD INTEGRÉE (Zéro erreur d'import) ---
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

const CardItem = ({ children, translateZ = 0, className }: any) => {
  const context = useContext(MouseEnterContext);
  const [isMouseEnter] = context || [false];
  const tZ = isMouseEnter ? translateZ : 0;
  return (
    <motion.div
      animate={{ transform: `translateZ(${tZ}px)` }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- INTERFACES ---
interface ZymantraItem {
  badge: string;
  title: string;
  description: string;
  image: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

interface ZymantraProps {
  content?: ZymantraItem[];
}

// --- COMPOSANT PRINCIPAL ---
export default function Zymantra({ content = DEFAULT_CONTENT }: ZymantraProps) {
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
    <section
      ref={containerRef}
      className="relative w-full transition-colors duration-300 py-24 px-4 overflow-hidden"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* SCROLL BEAM */}
      <div className="absolute left-6 md:left-12 top-0 h-full w-[1px] hidden sm:block opacity-20">
        <div className="h-full w-full bg-zinc-800" />
        <motion.div
          style={{ height: beamY }}
          className="absolute top-0 w-full bg-emerald-500 shadow-[0_0_20px_#10b981]"
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-32 relative z-10">
        {content.map((item, index) => {
          const isInactive = activeIdx !== null && activeIdx !== index;
          return (
            <motion.div
              key={index}
              onMouseEnter={() => setActiveIdx(index)}
              onMouseLeave={() => setActiveIdx(null)}
              animate={{
                opacity: isInactive ? 0.35 : 1,
                filter: isInactive ? "blur(4px)" : "blur(0px)",
                scale: isInactive ? 0.98 : 1,
              }}
              className="transition-all duration-500 flex justify-center"
            >
              <CardContainer>
                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-12 p-6 md:p-14 border transition-colors duration-500 w-[95vw] lg:w-[1100px] hover:border-emerald-500/50`}
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border-color)",
                    borderRadius: "var(--radius-vercel)",
                  }}
                >
                  {/* IMAGE SECTION */}
                  <CardItem
                    translateZ={80}
                    className="w-full lg:w-1/2 aspect-square relative group"
                  >
                    <div
                      className="w-full h-full overflow-hidden border shadow-3xl"
                      style={{
                        borderRadius: "var(--radius-vercel-zy)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-top grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                    </div>
                    <div className="absolute top-6 right-6 h-3 w-3 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981] animate-pulse" />
                  </CardItem>

                  {/* TEXT SECTION */}
                  <div className="flex-1 flex flex-col items-start space-y-8">
                    <CardItem translateZ={50}>
                      <span className="px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-[11px] font-black tracking-[0.4em] uppercase">
                        {item.badge}
                      </span>
                    </CardItem>

                    <CardItem translateZ={70}>
                      <h2
                        className="text-3xl md:text-5xl font-black italic uppercase leading-[0.95] tracking-tighter"
                        style={{ color: "var(--foreground)" }}
                      >
                        {item.title}
                      </h2>
                    </CardItem>

                    <CardItem translateZ={40}>
                      <p className="opacity-70 text-base md:text-lg leading-relaxed font-medium max-w-xl">
                        {item.description}
                      </p>
                    </CardItem>

                    {/* CALL TO ACTION ADAPTATIF */}
                    <CardItem translateZ={100} className="pt-4">
                      <button
                        onClick={item.onCtaClick}
                        className="group relative px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-xl"
                        style={{
                          backgroundColor: "var(--foreground)",
                          color: "var(--background)",
                        }}
                      >
                        <span className="relative z-10 transition-colors group-hover:text-white">
                          {item.ctaText || "Explorer la data"}
                        </span>
                        <div className="absolute inset-0 rounded-full bg-emerald-600 scale-0 group-hover:scale-100 transition-transform duration-500 -z-0 opacity-0 group-hover:opacity-100" />
                      </button>
                    </CardItem>
                  </div>
                </div>
              </CardContainer>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

const DEFAULT_CONTENT: ZymantraItem[] = [
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
    title: "Diane Chaka Junior : L'Algo Zy",
    description:
      "Anyama sera une valeur sûre sous l'algorithme Zy. Un outil capable de synchroniser les ressources officielles avec les réalités du terrain. Nous créons un bouclier contre les opportunités manquées.",
    image: "/IMG-20260116-WA0000.jpg",
    ctaText: "Découvrir l'algorithme",
  },
];
