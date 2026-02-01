"use client";

import React, { useEffect, useMemo } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Info, Home, Github, Linkedin } from "lucide-react";

import Loader from "@/components/frontendkit/Loader";
import { MasterAuroraBackground } from "@/components/ui/MasterAuroraBackground";
import { TextHoverEffect } from "@/components/ui/TextHoverEffect";
import SideCard from "@/components/frontendkit/SideCard";
import DataCard from "@/components/frontendkit/DataCard";
import Navbar from "@/components/frontendkit/NavbarFront";
import { Dock, type DockItem } from "@/components/ui/dock";

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
    <div className="relative min-h-screen flex flex-col bg-background transition-colors duration-300 overflow-x-hidden">
      <Navbar />

      {/* BACKGROUND AREA */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MasterAuroraBackground />
      </div>

      {/* MAIN GRID PROPORTIONNEL */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-3 items-center justify-items-center px-4 md:px-12 lg:px-20 pt-32 pb-48 gap-10 lg:gap-0">
        {/* COLONNE GAUCHE : DATA CARD AVEC GRADIENTS */}
        <div className="w-full flex justify-center lg:justify-start">
          <DataCard
            width={320}
            height={300}
            title={
              <div className="flex items-center gap-2 text-foreground">
                <Info className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-semibold text-xs">
                  Data-driven growth : Anyama
                </span>
              </div>
            }
            content={
              <div className="flex flex-col gap-3 text-foreground/80 text-sm leading-relaxed">
                <p>
                  Les métriques d'attractivité et les flux d'investissement
                  convergent vers une réalité : le vrai potentiel se mesure dans
                  ce qui reste à révéler. Anyama dispose d'un avantage
                  stratégique encore invisible à la majorité des acteurs. La
                  data ne ment pas — la question, c'est qui l'exploitera en
                  premier :{" "}
                  <span className="bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent font-bold inline-block">
                    Vision partagée
                  </span>
                </p>
                <p>
                  Les chiffres sont là. Les investisseurs arrivent. La question,
                  c'est : serez-vous prêts ?
                </p>
                <p>
                  Votre commune entre dans une zone d'attractivité stratégique :{" "}
                  <span className="bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent font-bold inline-block">
                    Sans insights, chaque décision est un pari perdu d'avance.
                  </span>
                </p>
              </div>
            }
            buttonContent={
              <span className="text-xs font-bold uppercase tracking-widest">
                Comprendre
              </span>
            }
            modalContent={
              <div className="space-y-4 text-foreground/90">
                <p>
                  Potentiel latent détecté : chaque flux, chaque indicateur
                  montre que votre territoire est sous-évalué.
                </p>
                <p>
                  La donnée est le premier moteur de croissance du XXIᵉ siècle.
                  Les économies modernes sont tirées par : la précision des
                  décisions, la rapiditée d'exécution, la capacité à anticiper
                  les crises plutôt que les subir.
                </p>
                <p>
                  La donnée réduit les coûts structurels de l'État (et ce de
                  façon massive). Investir dans la donnée n'est pas une dépense
                  : c'est un amortisseur de dépenses futures.
                </p>
              </div>
            }
          />
        </div>

        {/* COLONNE CENTRALE : LOGO GÉANT & CONNEXION */}
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full max-w-[460px] p-10 backdrop-blur-2xl rounded-2xl bg-glass-dual border border-border-dual flex flex-col items-center">
            <div className="w-full h-48 md:h-72 flex items-center justify-center overflow-visible">
              <TextHoverEffect
                text="Nonnzytr"
                duration={0.6}
                style={{
                  width: "150%",
                  height: "100%",
                  fontSize: "clamp(8rem, 20vw, 15rem)",
                }}
              />
            </div>

            <p className="text-foreground/70 text-sm mb-10 tracking-[0.3em] uppercase font-light">
              Votre aventure commence ici
            </p>

            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full max-w-sm py-4 flex items-center justify-center gap-3 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              <FcGoogle className="text-2xl" />
              <span className="tracking-wider">CONTINUER AVEC GOOGLE</span>
            </button>
          </div>
        </div>

        {/* COLONNE DROITE : SIDE CARD */}
        <div className="w-full flex justify-center lg:justify-end">
          <SideCard
            imageSrc="/zyy.png"
            title="Zy recherche un financement orienté workspace & Workflow"
            description="Exécution de la logique métier et serveur en burn out."
            location="Anyama, Abidjan, Côte d'Ivoire"
          />
        </div>
      </main>

      {/* FOOTER RÉACTIF (DARK/LIGHT) */}
      <footer className="fixed bottom-0 left-0 right-0 z-[100] h-28 flex items-center justify-center pointer-events-none">
        {/* Gradient adaptatif : Noir pur en dark, Blanc/Transparent en light */}
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-background via-background/80 to-transparent dark:from-black dark:via-black/95 z-[-1]" />

        <div className="relative pointer-events-auto">
          <Dock
            items={dockItems}
            iconSize={15}
            magnification={22}
            distance={70}
            className="bg-background/80 dark:bg-zinc-900/90 border border-border-dual shadow-none backdrop-blur-3xl h-[42px] px-5 rounded-full"
          />
        </div>
      </footer>
    </div>
  );
}
