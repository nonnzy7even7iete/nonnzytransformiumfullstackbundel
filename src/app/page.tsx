"use client";

import React, { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Info, Home, Github, Linkedin } from "lucide-react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";

import Loader from "@/components/frontendkit/Loader";
import { MasterAuroraBackground } from "@/components/ui/MasterAuroraBackground";
import SideCard from "@/components/frontendkit/SideCard";
import DataCard from "@/components/frontendkit/DataCard";
import Navbar from "@/components/frontendkit/NavbarFront";
import LoginCard from "@/components/frontendkit/LoginCard";
import { Dock, type DockItem } from "@/components/ui/dock";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const { status } = useSession();
  const router = useRouter();

  const dockItems: DockItem[] = useMemo(
    () => [
      { icon: Home, href: "/", label: "H" },
      { icon: Github, href: "https://github.com", label: "G" },
      { icon: Linkedin, href: "https://linkedin.com", label: "L" },
    ],
    []
  );

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  if (status === "loading" || status === "authenticated") return <Loader />;

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--background)] overflow-x-hidden">
      <Navbar />

      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MasterAuroraBackground />
      </div>

      {/* MAIN LAYOUT - PRÉSERVÉ */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center lg:justify-center px-4 lg:px-2 gap-6 pt-32 pb-10 w-full max-w-[1280px] mx-auto">
        <div className="order-2 lg:order-1 w-full max-w-[360px] h-[450px] shrink-0">
          <DataCard
            height={450}
            className="!w-full !max-w-none !min-w-0 h-full"
            title={
              <div className="flex items-center gap-2 text-[var(--foreground)]">
                <Info className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-bold text-[13px] leading-tight uppercase tracking-tighter">
                  Data-driven growth : potentiel d'Anyama
                </span>
              </div>
            }
            content={
              <div className="flex flex-col h-[350px] text-left">
                <div className="flex-grow overflow-y-auto pr-2 scrollbar-hide text-[var(--foreground)] text-[14px]">
                  <p>Les métriques d'attractivité convergent vers Anyama...</p>
                </div>
              </div>
            }
          />
        </div>

        <div className="order-1 lg:order-2 w-full max-w-[440px] h-[450px] shrink-0">
          <LoginCard className="!w-full !max-w-none !min-w-0 h-full" />
        </div>

        <div className="order-3 w-full max-w-[360px] h-[450px] shrink-0">
          <SideCard
            className="!w-full !max-w-none !min-w-0 h-full"
            imageSrc="/IMG-20260228-WA0000.jpg"
            title="Zy recherche un financement"
            description="Exécution de la logique métier."
            location="Anyama, Abidjan"
          />
        </div>
      </main>

      {/* TEXT GENERATE - REMONTÉ ICI POUR VISIBILITÉ DIRECTE */}
      <section className="relative z-10 w-full max-w-[1280px] mx-auto px-10 pb-44">
        <div className="max-w-5xl">
          <TextGenerateEffect
            words="Anyama : Hub industriel et logistique stratégique – opportunité unique. Anyama est prête à devenir un centre économique majeur en Côte d’Ivoire."
            className="text-[#10b981] font-black uppercase tracking-tighter"
            duration={0.8}
          />
        </div>
      </section>

      {/* FOOTER FIXED */}
      <footer className="fixed bottom-0 left-0 right-0 z-[100] h-32 flex items-center justify-center pointer-events-none">
        <div className="relative pointer-events-auto">
          <Dock
            items={dockItems}
            iconSize={16}
            magnification={24}
            distance={80}
            className="bg-[var(--background)] border border-[var(--border-color)] shadow-xl h-[46px] px-6 rounded-full"
          />
        </div>
      </footer>
    </div>
  );
}

/**
 * COMPOSANT TECHNIQUE : TextGenerateEffect
 * Définition en bas de fichier pour éviter les erreurs d'import
 */
const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  // PRÉSERVATION : once: false pour ré-animer, mais amount: 0.1 pour voir l'effet dès qu'il pointe son nez
  const isInView = useInView(scope, { once: false, amount: 0.1 });
  let wordsArray = words.split(" ");

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        { opacity: 1, filter: filter ? "blur(0px)" : "none" },
        { duration: duration ? duration : 1, delay: stagger(0.1) }
      );
    } else {
      animate(
        "span",
        { opacity: 0, filter: filter ? "blur(10px)" : "none" },
        { duration: 0 }
      );
    }
  }, [isInView, animate, filter, duration]);

  return (
    <div className={cn("font-sans", className)}>
      <div className="mt-4">
        <div
          className="text-3xl md:text-5xl leading-tight tracking-tighter"
          style={{ color: "var(--foreground)" }}
        >
          <motion.div ref={scope} className="inline">
            {wordsArray.map((word, idx) => (
              <motion.span
                key={word + idx}
                className="opacity-0 inline-block mr-2"
                style={{
                  color: "var(--foreground)",
                  filter: filter ? "blur(10px)" : "none",
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
