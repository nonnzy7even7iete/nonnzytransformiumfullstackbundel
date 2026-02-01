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
    <div className="relative min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <MasterAuroraBackground />
      </div>

      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center px-6 md:px-12 gap-8 pt-32 pb-44">
        {/* BLOC GAUCHE */}
        <div className="w-[350px] h-[450px] flex flex-col">
          <DataCard
            width={350}
            height={450}
            title={
              <div className="flex items-center gap-2 text-foreground">
                <Info className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-bold text-[12px] leading-tight uppercase tracking-tighter">
                  Data-driven growth : potentiel d'Anyama
                </span>
              </div>
            }
            content={
              <div className="flex flex-col gap-4 text-foreground/80 text-[13px] leading-relaxed overflow-y-auto max-h-[280px] pr-2 scrollbar-hide">
                <p>
                  Les métriques d'attractivité et les flux d'investissement
                  convergent vers une réalité : le vrai potentiel se mesure dans
                  ce qui reste à révéler. Anyama dispose d'un avantage
                  stratégique encore invisible à la majorité des acteurs. La
                  data ne ment pas — la question, c'est qui l'exploitera en
                  premier :{" "}
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold">
                    Vision partagée
                  </span>
                </p>
                <p>
                  Les chiffres sont là. Les investisseurs arrivent. La question,
                  c'est : serez-vous prêts ?
                </p>
                <p>
                  Votre commune entre dans une zone d'attractivité stratégique :{" "}
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold">
                    Sans insights, chaque décision est un pari perdu d'avance.
                  </span>
                </p>
              </div>
            }
            buttonContent={
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                Explorer la data
              </span>
            }
            modalContent={
              <div className="space-y-4 text-sm leading-relaxed text-foreground/90">
                <p>
                  Potentiel latent détecté : chaque flux, chaque indicateur
                  montre que votre territoire est sous-évalué.
                </p>
                <p>
                  La donnée est le premier moteur de croissance du XXIᵉ siècle.
                  Les économies modernes sont tirées par : la précision des
                  décisions, la rapiditée d'exécution, la capacité à anticiper
                  les crises plutôt que les subir. Or, tout cela dépend de la
                  donnée.
                </p>
                <p>
                  La donnée réduit les coûts structurels de l'État (et ce de
                  façon massive). Les administrations gèrent des millions de
                  micro-décisions quotidiennes... Investir dans la donnée n'est
                  pas une dépense : c'est un amortisseur de dépenses futures.
                </p>
              </div>
            }
          />
        </div>

        {/* BLOC CENTRAL : OPTIMISATION DES ESPACEMENTS BAS */}
        <div className="w-[450px] h-[450px] p-10 backdrop-blur-3xl rounded-2xl bg-glass-dual border border-border-dual flex flex-col items-center shadow-none">
          {/* Logo centré dans l'espace restant */}
          <div className="w-full flex-1 flex items-center justify-center overflow-visible">
            <TextHoverEffect
              text="Nonnzytr"
              duration={0.6}
              style={{
                width: "140%",
                height: "100%",
                fontSize: "clamp(6rem, 15vw, 11rem)",
              }}
            />
          </div>

          {/* Groupe Action : Poussé vers le bas avec mt-auto et espacements resserrés */}
          <div className="w-full flex flex-col items-center mt-auto">
            <p className="text-foreground/60 text-[10px] tracking-[0.4em] uppercase font-light mb-6">
              Votre aventure commence ici
            </p>

            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full max-w-[320px] py-4 flex items-center justify-center gap-3 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 mx-auto"
            >
              <FcGoogle className="text-2xl shrink-0" />
              <span className="text-xs tracking-widest uppercase">
                Continuer avec Google
              </span>
            </button>

            {/* Espacement réduit entre le bouton et la phrase (mt-4) */}
            <p className="text-foreground/40 text-[9px] mt-4 italic text-center max-w-[280px]">
              Connexion sécurisée via Google requise pour accéder au Workflow.
            </p>
          </div>
        </div>

        {/* BLOC DROIT */}
        <div className="w-[350px] h-[450px] flex">
          <SideCard
            imageSrc="/zyy.png"
            title="Zy recherche un financement orienté workspace & Workflow"
            description="Exécution de la logique métier et serveur en burn out."
            location="Anyama, Abidjan, Côte d'Ivoire"
          />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 z-[100] h-28 flex items-center justify-center pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-background via-background/60 to-transparent dark:from-black dark:via-black/40 z-[-1]" />

        <div className="relative pointer-events-auto">
          <Dock
            items={dockItems}
            iconSize={16}
            magnification={24}
            distance={80}
            className="bg-background/40 dark:bg-black/40 border border-white/10 shadow-none backdrop-blur-2xl h-[46px] px-6 rounded-full"
          />
        </div>
      </footer>
    </div>
  );
}
