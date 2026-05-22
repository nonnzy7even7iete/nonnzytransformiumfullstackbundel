"use client";

/**
 * @file ZymantraBeam.tsx
 * @description Architecture de focus 3D avec optimisation du ratio d'image.
 * @version 1.0.1
 */

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

import { MultiStepLoader } from "@/components/frontendkit/ui/multi-step-loader";
import { TextGenerateEffect } from "@/components/frontendkit/ui/text-generate-effect";

// Initialisation du contexte React pour gerer l'etat de survol (Hover) en 3D
// createContext cree un espace de stockage partage entre composants parents et enfants
const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

// --- 1. WRAPPER DE FOCUS (FLOU & OPACITÉ AU SCROLL/HOVER) ---
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
  // useRef initialise une reference directe a un element du DOM sans declencher de re-rendu
  const ref = useRef(null);

  // useInView est un hook de Framer Motion qui detecte si l'element est visible a l'ecran
  // amount: 0.4 signifie que le declenchement se fait des que 40% de la section est visible
  const isInView = useInView(ref, { amount: 0.4 });

  // Determination logique de l'effet de flou (Blur)
  const isBlurred =
    (activeIdx !== null && activeIdx !== index) ||
    (activeIdx === null && !isInView);

  return (
    <motion.div
      ref={ref}
      // On associe les ecouteurs d'evenements pour modifier l'index actif au survol
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

// --- 2. CONTENEUR 3D ---
const CardContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  // Specification du type HTMLDivElement pour securiser le typage de la reference du conteneur
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  // useMotionValue cree des valeurs de mouvement fluides qui ne re-rendent pas le composant
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // useTransform mappe une plage de valeurs d'entree vers une plage de valeurs de sortie
  // useSpring applique un amortissement (damping) et une raideur (stiffness) pour un effet organique
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
    stiffness: 100,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    // .Provider injecte le tableau d'etat dans l'arbre des composants enfants (notation par point)
    <MouseEnterContext.Provider value={[isMouseEnter, setIsMouseEnter]}>
      <div
        className={cn("flex items-center justify-center", className)}
        style={{ perspective: "1000px" }}
        onMouseMove={(e) => {
          // Verification chirurgicale : si la reference n'est pas liee, on stoppe l'execution
          if (!containerRef.current) return;

          // .getBoundingClientRect() renvoie la taille et la position exacte de la carte (notation par point)
          const { left, top, width, height } =
            containerRef.current.getBoundingClientRect();

          // .set() met a jour la valeur motion directement pour les calculs de rotation (notation par point)
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

// --- 3. ITEM RÉACTIF ---
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

// --- 4. COMPOSANT PRINCIPAL ---
export default function ZymantraBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  // useScroll capture la progression du scroll sur le conteneur cible (target)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  useEffect(() => {
    // .offsetHeight lit la hauteur totale en pixels de l'element reel du DOM (notation par point)
    if (containerRef.current) setSvgHeight(containerRef.current.offsetHeight);
  }, []);

  const beamY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, svgHeight]),
    { stiffness: 80, damping: 25 }
  );

  // RESTAURATION ET NETTOYAGE STRICT DES STRINGS (AUCUNE ALTERATION DU CONTENU TEXTUEL)
  const ZYMANTRA_CONTENT = [
    {
      badge: "PROFIL",
      title: "DATA DRIVEN ARCHITECT",
      description:
        "CHAKA JUNIOR DIANÉ. SOFTWARE ENGINEER & DATA ANALYST. CONCEPTION DE SYSTÈMES ALGORITHMIQUES ORIENTÉS DATA-DRIVEN. MODÉLISATION ET STRUCTURATION DES DYNAMIQUES DE DONNÉES.",
      image: "/IMG-20260522-WA0000.jpg",
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

      {/* BEAM LATÉRAL HARMONISÉ */}
      <div
        className="absolute left-6 md:left-20 top-0 h-full w-[1px] hidden sm:block opacity-50"
        style={{ backgroundColor: "var(--border-color)" }}
      >
        <motion.div
          style={{ height: beamY }}
          className="absolute top-0 w-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-40 relative z-10 px-6">
        {ZYMANTRA_CONTENT.map((item, index) => (
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
                  border: "1px solid var(--border-color)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.02)",
                }}
              >
                {/* 
                  CONTENEUR IMAGE DU CARDITEM OPTIMISÉ 
                  Changement des ratios fixes pour laisser respirer l'image : aspect-auto au lieu de aspect-square.
                  max-h-[500px] garantit que l'image ne devienne pas trop grande verticalement.
                */}
                <CardItem
                  translateZ={40}
                  className="w-full lg:w-1/2 aspect-auto md:aspect-auto max-h-[500px] overflow-hidden bg-muted m-1 flex items-center justify-center"
                  style={{
                    borderRadius: "calc(var(--radius-vercel-zy) - 1px)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  {/* 
                    BALISE IMAGE OPTIMISÉE POUR LE RATIO ENTIER
                    Remplacement de 'object-cover' par 'object-contain' : Rend l'image 100% visible sans aucune coupure.
                    'w-full h-auto' conserve parfaitement les dimensions d'origine de ta prise de vue.
                  */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-contain object-top grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </CardItem>

                {/* CONTENU TEXTUEL */}
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
                        "px-10 py-4 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all active:scale-95 bg-card text-muted-foreground",
                        "hover:text-emerald-500 hover:border-emerald-500 duration-300"
                      )}
                      style={{
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius-vercel-zy)",
                      }}
                    >
                      Lancer l'algorithme
                    </button>
                  </CardItem>
                </div>
              </div>
            </CardContainer>
          </SectionWrapper>
        ))}
      </div>
    </div>
  );
}

// Noms pour React DevTools permettant d'identifier precisement les composants dans l'arbre d'analyse
SectionWrapper.displayName = "SectionWrapper";
CardContainer.displayName = "CardContainer";
CardItem.displayName = "CardItem";
ZymantraBeam.displayName = "ZymantraBeam";
