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

  const dockItems: DockItem[] = useMemo(() => [
    { icon: Home, href: "/", label: "H" },
    { icon: Github, href: "https://github.com", label: "G" },
    { icon: Linkedin, href: "https://linkedin.com", label: "L" },
  ], []);

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  if (status === "loading" || status === "authenticated") return <Loader />;

  return (
    <div className="relative min-h-screen flex flex-col bg-app-gradient overflow-x-hidden">
      <Navbar />

      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MasterAuroraBackground />
      </div>

      <main className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center px-4 md:px-8 pt-32 pb-48 gap-10">
        
        {/* ASIDE GAUCHE : DATA CARD (TEXTE INTÉGRAL RESTAURÉ) */}
        <aside className="w-full md:w-auto flex justify-center lg:absolute lg:left-8 xl:left-16 lg:top-1/2 lg:-translate-y-1/2">
          <DataCard
            width={320}
            height={300}
            title={
              <div className="flex items-center gap-2 text-foreground">
                <Info className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-semibold text-xs md:text-sm">
                  Data-driven growth : chaque flux, chaque métrique confirme le potentiel d'Anyama
                </span>
              </div>
            }
            content={
              <div className="flex flex-col gap-3 text-foreground/80 text-[13px] leading-relaxed font-light">
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
              <div className="w-full py-2 bg-foreground/5 border border-border rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-foreground/10 transition-all text-center">
                Comprendre
              </div>
            }
            modalContent={
              <div className="space-y-4 text-foreground/90 text-sm font-light p-2">
                <p>
                  Potentiel latent détecté : chaque flux, chaque indicateur
                  montre que votre territoire est sous-évalué.
                </p>
                <p>
                  La donnée est le premier moteur de croissance du XXIᵉ siècle.
                  Les économies modernes sont tirées par : la précision des
                  décisions, la rapidité d'exécution, la capacité à anticiper
                  les crises plutôt que les subir. Or, tout cela dépend de la donnée.
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
        </aside>

        {/* SECTION CENTRALE : BLOC CONNEXION */}
        <section className="relative z-20 w-full md:w-[460px]">
          <div className="p-10 backdrop-blur-xl rounded-2xl shadow-2xl bg-glass-dual border border-border-dual">
            <TextHoverEffect
              text="Nonnzytr"
              duration={0.6}
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "16/9",
                fontSize: "clamp(4rem, 12vw, 10rem)",
              }}
            />
            <p className="text-foreground text-base mb-8 font-medium">
              Votre aventure commence ici
            </p>
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full py-3.5 flex items-center justify-center gap-3 bg-foreground text-background font-bold rounded-xl shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-300 mb-6"
            >
              <FcGoogle className="text-2xl" />
              Continuer avec Google
            </button>
            <p className="text-foreground/50 text-[11px] italic">
              Connexion sécurisée via Google requise pour accéder au Workflow.
            </p>
          </div>
        </section>

        {/* ASIDE DROIT : SIDE CARD */}
        <aside className="w-full md:w-auto flex justify-center lg:absolute lg:right-8 xl:right-16 lg:top-1/2 lg:-translate-y-1/2">
          <SideCard
            imageSrc="/zyy.png"
            title="Zy recherche un financement orienté workspace & Workflow"
            description="Exécution de la logique métier et serveur en burn out."
            location="Anyama, Abidjan, Côte d'Ivoire"
          />
        </aside>
      </main>

      {/* FOOTER IU : ISOLATION ET DOCK MINIATURISÉ */}
      <footer className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-none">
        {/* L'OCCLUSION : Bloque visuellement le flux de texte au scroll */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/95 to-transparent shadow-[0_-15px_40px_-10px_rgba(0,0,0,0.3)]" />
        
        <div className="relative flex justify-center items-center pb-8 pt-4">
          <div className="pointer-events-auto">
            <Dock 
              items={dockItems}
              iconSize={15}
              magnification={22}
              distance={70}
              className="bg-glass-dual border border-border-dual shadow-2xl backdrop-blur-[40px]"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}