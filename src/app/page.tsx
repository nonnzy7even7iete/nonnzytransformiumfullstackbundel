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
    <div className="relative min-h-screen flex flex-col bg-black overflow-x-hidden font-extralight selection:bg-white/20">
      <Navbar />

      {/* BACKGROUND LAYER - OPACITÉ RÉDUITE POUR LE NOIR PUR */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <MasterAuroraBackground />
      </div>

      {/* MAIN LAYOUT PROPORTIONNEL ALIGNÉ */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-3 items-center justify-items-center px-6 md:px-16 lg:px-24 py-32 gap-12 lg:gap-0">
        {/* BLOC GAUCHE - DATA CARD (TEXTE INTÉGRAL SANS COUPURE) */}
        <div className="w-full max-w-[340px] flex justify-center">
          <DataCard
            width={340}
            height={320}
            title={
              <div className="flex items-center gap-2 text-foreground">
                <Info className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="font-light text-[11px] uppercase tracking-widest leading-tight">
                  Data-driven growth : chaque flux, chaque métrique confirme le
                  potentiel d'Anyama
                </span>
              </div>
            }
            content={
              <div className="flex flex-col gap-3 text-zinc-400 text-[13px] leading-relaxed font-extralight italic">
                <p>
                  Les métriques d'attractivité et les flux d'investissement
                  convergent vers une réalité : le vrai potentiel se mesure dans
                  ce qui reste à révéler. Anyama dispose d'un avantage
                  stratégique encore invisible à la majorité des acteurs. La
                  data ne ment pas — la question, c'est qui l'exploitera en
                  premier :{" "}
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-normal not-italic tracking-normal">
                    Vision partagée
                  </span>
                </p>
                <p>
                  Les chiffres sont là. Les investisseurs arrivent. La question,
                  c'est : serez-vous prêts ?
                </p>
                <p>
                  Votre commune entre dans une zone d'attractivité stratégique :{" "}
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-normal not-italic tracking-normal">
                    Sans insights, chaque décision est un pari perdu d'avance.
                  </span>
                </p>
              </div>
            }
            buttonContent={
              <div className="w-full py-2 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors text-center">
                Explorer
              </div>
            }
            modalContent={
              <div className="space-y-4 text-zinc-300 text-sm font-extralight p-2">
                <p>
                  Potentiel latent détecté : chaque flux, chaque indicateur
                  montre que votre territoire est sous-évalué.
                </p>
                <p>
                  La donnée est le premier moteur de croissance du XXIᵉ siècle.
                  Les économies modernes sont tirées par : la précision des
                  décisions, la rapidité d'exécution, la capacité à anticiper
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

        {/* BLOC CENTRAL - CONNEXION (LAYOUT CENTRÉ & TYPO PRO) */}
        <div className="w-full max-w-[480px] flex flex-col items-center">
          <div className="w-full p-12 backdrop-blur-3xl rounded-[2.5rem] bg-black/40 border border-white/5 flex flex-col items-center shadow-none">
            <div className="w-full h-40 md:h-56 flex items-center justify-center">
              <TextHoverEffect
                text="Nonnzytr"
                duration={0.8}
                style={{
                  width: "100%",
                  height: "100%",
                  fontSize: "clamp(6.5rem, 18vw, 13rem)",
                }}
              />
            </div>

            <div className="w-full flex flex-col items-center text-center mt-6">
              <h1 className="text-white text-base mb-10 tracking-[0.4em] uppercase font-extralight opacity-70">
                Votre aventure commence ici
              </h1>

              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full max-w-[300px] py-4 flex items-center justify-center gap-4 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-all active:scale-95"
              >
                <FcGoogle className="text-xl" />
                <span className="text-[11px] tracking-[0.2em] uppercase">
                  Continuer avec Google
                </span>
              </button>

              <p className="mt-12 text-zinc-600 text-[9px] uppercase tracking-[0.2em] italic">
                Connexion sécurisée via Google requise pour accéder au Workflow.
              </p>
            </div>
          </div>
        </div>

        {/* BLOC DROIT - SIDE CARD (TEXTE INTÉGRAL) */}
        <div className="w-full max-w-[340px] flex justify-center">
          <SideCard
            imageSrc="/zyy.png"
            title="Zy recherche un financement orienté workspace & Workflow"
            description="Exécution de la logique métier et serveur en burn out."
            location="Anyama, Abidjan, Côte d'Ivoire"
          />
        </div>
      </main>

      {/* FOOTER NOIR PUR STRICT */}
      <footer className="fixed bottom-0 left-0 right-0 z-[100] h-28 flex items-end justify-center pointer-events-none pb-8">
        {/* GRADIENT NOIR PUR (OCCLUSION) */}
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black via-black/95 to-transparent z-[-1]" />

        <div className="pointer-events-auto">
          <Dock
            items={dockItems}
            iconSize={14}
            magnification={20}
            distance={60}
            className="bg-black border-white/10 shadow-none backdrop-blur-3xl h-[42px] px-5 rounded-full"
          />
        </div>
      </footer>
    </div>
  );
}
