"use client";

import React, { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Info, Home, Github, Linkedin } from "lucide-react";

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

      {/* MAIN LAYOUT : Optimisé pour écran 1250px */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center lg:justify-center px-4 lg:px-2 gap-6 pt-32 pb-44 w-full max-w-[1280px] mx-auto">
        {/* BLOC GAUCHE - DATA CARD */}
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
                <div className="flex-grow overflow-y-auto pr-2 scrollbar-hide">
                  <div className="flex flex-col gap-4 text-[var(--foreground)] text-[14px] leading-relaxed">
                    <p>
                      Les métriques d'attractivité et les flux d'investissement
                      convergent vers une réalité : le vrai potentiel se mesure
                      dans ce qui reste à révéler. Anyama dispose d'un avantage
                      stratégique encore invisible à la majorité des acteurs. La
                      data ne ment pas — la question, c'est qui l'exploitera en
                      premier :{" "}
                      <span className="text-emerald-500 font-bold">
                        Vision partagée
                      </span>
                    </p>
                    <p>
                      Les chiffres sont là. Les investisseurs arrivent. La
                      question, c'est : serez-vous prêts ?
                    </p>
                    <p>
                      Votre commune entre dans une zone d'attractivité
                      stratégique :{" "}
                      <span className="text-emerald-500 font-bold italic">
                        Sans insights, chaque décision est un pari perdu
                        d'avance.
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-[var(--border-color)]">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                    Explorer la data
                  </span>
                </div>
              </div>
            }
            modalContent={
              <div className="space-y-4">
                <p className="font-bold text-blue-400 uppercase tracking-widest text-[10px]">
                  Argumentaire Financement
                </p>
                <p>
                  Potentiel latent détecté : chaque flux, chaque indicateur
                  montre que votre territoire est sous-évalué.
                </p>
                <p>
                  La donnée est le premier moteur de croissance du XXIᵉ siècle.
                  Investir dans la donnée n'est pas une dépense : c'est un
                  amortisseur de dépenses futures.
                </p>
              </div>
            }
          />
        </div>

        {/* BLOC CENTRAL - LOGIN CARD */}
        <div className="order-1 lg:order-2 w-full max-w-[440px] h-[450px] shrink-0">
          <LoginCard className="!w-full !max-w-none !min-w-0 h-full" />
        </div>

        {/* BLOC DROIT - SIDE CARD */}
        <div className="order-3 w-full max-w-[360px] h-[450px] shrink-0">
          <SideCard
            className="!w-full !max-w-none !min-w-0 h-full"
            imageSrc="/zyy.png"
            title="Zy recherche un financement orienté workspace & Workflow"
            description="Exécution de la logique métier et serveur en burn out."
            location="Anyama, Abidjan, Côte d'Ivoire"
          />
        </div>
      </main>

      {/* FOOTER FIXED : Logique Scrim gérée par le composant Dock lui-même */}
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
