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

      {/* Utilisation de Flexbox pour un contrôle total du centrage et des proportions */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 pt-32 pb-48 gap-12">
        {/* BLOC GAUCHE : DATACARD AVEC SCROLL INTERNE */}
        <div className="w-full lg:w-1/4 flex justify-center lg:justify-start order-2 lg:order-1">
          <DataCard
            width={320}
            height={320}
            title={
              <div className="flex items-center gap-2 text-foreground">
                <Info className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-semibold text-xs leading-tight">
                  Data-driven growth : Anyama
                </span>
              </div>
            }
            content={
              /* Scroll forcé ici avec overflow-y-auto */
              <div className="flex flex-col gap-4 text-foreground/80 text-sm leading-relaxed overflow-y-auto max-h-[200px] pr-2 custom-scrollbar">
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
              <div className="space-y-4 text-foreground/90 overflow-y-auto max-h-[350px] pr-2">
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

        {/* BLOC CENTRAL : CONNEXION ÉLARGIE ET CENTRAGE ABSOLU */}
        <div className="w-full lg:w-2/4 flex flex-col items-center justify-center order-1 lg:order-2">
          {/* Elargissement du max-width à 600px pour plus de présence */}
          <div className="w-full max-w-[600px] p-10 md:p-14 backdrop-blur-2xl rounded-2xl bg-glass-dual border border-border-dual flex flex-col items-center justify-center text-center shadow-none">
            <div className="w-full h-48 md:h-80 flex items-center justify-center overflow-visible">
              <TextHoverEffect
                text="Nonnzytr"
                duration={0.6}
                style={{
                  width: "140%",
                  height: "100%",
                  fontSize: "clamp(8rem, 22vw, 16rem)",
                }}
              />
            </div>

            <div className="flex flex-col items-center w-full mt-4">
              <p className="text-foreground/70 text-sm md:text-base mb-10 tracking-[0.3em] uppercase font-light">
                Votre aventure commence ici
              </p>

              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full max-w-[380px] py-4.5 flex items-center justify-center gap-4 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                <FcGoogle className="text-2xl" />
                <span className="tracking-[0.1em] text-sm">
                  CONTINUER AVEC GOOGLE
                </span>
              </button>

              <p className="text-foreground/40 text-[10px] mt-8 italic tracking-wide">
                Connexion sécurisée via Google • Workflow Access
              </p>
            </div>
          </div>
        </div>

        {/* BLOC DROIT : SIDE CARD */}
        <div className="w-full lg:w-1/4 flex justify-center lg:justify-end order-3">
          <SideCard
            imageSrc="/zyy.png"
            title="Zy recherche un financement orienté workspace & Workflow"
            description="Exécution de la logique métier et serveur en burn out."
            location="Anyama, Abidjan, Côte d'Ivoire"
          />
        </div>
      </main>

      {/* FOOTER RÉACTIF */}
      <footer className="fixed bottom-0 left-0 right-0 z-[100] h-28 flex items-center justify-center pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-background via-background/80 to-transparent dark:from-black dark:via-black/95 z-[-1]" />

        <div className="relative pointer-events-auto">
          <Dock
            items={dockItems}
            iconSize={15}
            magnification={22}
            distance={70}
            className="bg-background/80 dark:bg-zinc-900/90 border border-border-dual shadow-none backdrop-blur-3xl h-[40px] px-5 rounded-full"
          />
        </div>
      </footer>
    </div>
  );
}
