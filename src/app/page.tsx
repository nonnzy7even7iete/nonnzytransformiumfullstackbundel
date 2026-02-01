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
    <div className="relative min-h-screen flex flex-col bg-app-gradient overflow-x-hidden">
      <Navbar />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <MasterAuroraBackground />
      </div>

      {/* LAYOUT GRID 3 COLONNES : PROPORTIONNEL ET ALIGNÉ */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-3 items-center justify-items-center px-4 md:px-12 lg:px-20 pt-32 pb-40 gap-8 lg:gap-0">
        {/* COLONNE GAUCHE : DATA CARD (TEXTE INTÉGRAL) */}
        <div className="w-full flex justify-center lg:justify-start">
          <DataCard
            width={320}
            height={300}
            title={
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-semibold text-xs leading-tight">
                  Data-driven growth : chaque flux, chaque métrique confirme le
                  potentiel d'Anyama
                </span>
              </div>
            }
            content={
              <div className="flex flex-col gap-2 text-sm text-foreground/80 leading-relaxed">
                <p>
                  Les métriques d'attractivité et les flux d'investissement
                  convergent vers une réalité : le vrai potentiel se mesure dans
                  ce qui reste à révéler. Anyama dispose d'un avantage
                  stratégique encore invisible à la majorité des acteurs. La
                  data ne ment pas — la question, c'est qui l'exploitera en
                  premier. :{" "}
                  <span className="font-bold text-blue-400">
                    Vision partagée
                  </span>
                </p>
                <p>
                  Les chiffres sont là. Les investisseurs arrivent. La question,
                  c'est : serez-vous prêts ?
                </p>
                <p>
                  Votre commune entre dans une zone d'attractivité stratégique :{" "}
                  <span className="font-bold text-blue-400">
                    Sans insights, chaque décision est un pari perdu d'avance.
                  </span>
                </p>
              </div>
            }
            buttonContent="Comprendre"
            modalContent={
              <div className="space-y-4">
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

        {/* COLONNE CENTRALE : LOGO GÉANT + CONNEXION */}
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full max-w-[460px] p-8 md:p-10 backdrop-blur-2xl rounded-2xl bg-glass-dual border border-border-dual flex flex-col items-center">
            <div className="w-full h-48 md:h-72 flex items-center justify-center overflow-visible">
              <TextHoverEffect
                text="Nonnzytr"
                duration={0.6}
                style={{
                  width: "150%", // Impact maximum
                  height: "100%",
                  fontSize: "clamp(8rem, 20vw, 15rem)",
                }}
              />
            </div>

            <p className="text-foreground/70 text-sm mb-8 tracking-[0.2em] uppercase font-light">
              Votre aventure commence ici
            </p>

            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full max-w-[320px] py-4 flex items-center justify-center gap-3 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 mb-6"
            >
              <FcGoogle className="text-2xl" />
              CONTINUER AVEC GOOGLE
            </button>

            <p className="text-foreground/40 text-[10px] italic">
              Connexion sécurisée via Google requise.
            </p>
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

      {/* FOOTER NOIR PUR */}
      <footer className="fixed bottom-0 left-0 right-0 z-[100] h-24 flex items-center justify-center pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black via-black/95 to-transparent z-[-1]" />
        <div className="relative pointer-events-auto">
          <Dock
            items={dockItems}
            iconSize={15}
            magnification={22}
            distance={70}
            className="bg-black border-white/10 shadow-none backdrop-blur-3xl h-[40px] px-4 rounded-full"
          />
        </div>
      </footer>
    </div>
  );
}
