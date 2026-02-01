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

      <main className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center px-4 md:px-8 pb-32 pt-24 md:pt-32 gap-6 md:gap-0">
        {/* ASIDE GAUCHE : DATA CARD (TEXTES INTÉGRAUX RÉTABLIS) */}
        <aside className="relative z-11 md:absolute md:left-3 md:ml-6 lg:ml-8 flex justify-center md:justify-start w-full md:w-auto min-w-[300px]">
          <DataCard
            width={300}
            height={270}
            // Utilisation de titres et contenus simples pour éviter les erreurs VS Code
            title="Data-driven growth : chaque flux, chaque métrique confirme le potentiel d'Anyama"
            content="Les métriques d'attractivité et les flux d'investissement convergent vers une réalité : le vrai potentiel se mesure dans ce qui reste à révéler. Anyama dispose d'un avantage stratégique encore invisible à la majorité des acteurs. La data ne ment pas — la question, c'est qui l'exploitera en premier. : Vision partagée. Les chiffres sont là. Les investisseurs arrivent. La question, c'est : serez-vous prêts ? Votre commune entre dans une zone d'attractivité stratégique : Sans insights, chaque décision est un pari perdu d'avance."
            buttonContent="Comprendre"
            modalContent="Potentiel latent détecté : chaque flux, chaque indicateur montre que votre territoire est sous-évalué. La donnée est le premier moteur de croissance du XXIᵉ siècle. Les économies modernes sont tirées par : la précision des décisions, la rapiditée d'exécution, la capacité à anticiper les crises plutôt que les subir. Or, tout cela dépend de la donnée. La donnée réduit les coûts structurels de l'État (et ce de façon massive). Les administrations gèrent des millions de micro-décisions quotidiennes... Investir dans la donnée n'est pas une dépense : c'est un amortisseur de dépenses futures."
          />
        </aside>

        {/* SECTION CENTRALE : LOGO GÉANT / TEXTES SECONDAIRES PETITS */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full md:w-[500px] max-w-[95vw]">
          <div className="w-full p-8 md:p-10 backdrop-blur-2xl rounded-2xl bg-glass-dual border border-border-dual flex flex-col items-center">
            {/* LE LOGO GÉANT (Occupant l'espace) */}
            <div className="w-full h-40 md:h-72 flex items-center justify-center overflow-visible">
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

            <p className="text-foreground/80 text-sm md:text-base mb-10 tracking-[0.2em] font-light">
              Votre aventure commence ici
            </p>

            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full max-w-sm py-3.5 flex items-center justify-center gap-3 
              bg-foreground text-background font-bold rounded-xl shadow-none
              hover:scale-[1.02] active:scale-95 transition-all duration-300 mb-6"
            >
              <FcGoogle className="text-2xl" />
              <span className="text-sm tracking-wide uppercase">
                Continuer avec Google
              </span>
            </button>

            <p className="text-foreground/40 text-[10px] italic">
              Connexion sécurisée via Google requise pour accéder au Workflow.
            </p>
          </div>
        </div>

        {/* ASIDE DROIT : SIDE CARD (TEXTE INTÉGRAL) */}
        <aside className="relative z-10 md:absolute md:right-3 md:mr-6 lg:mr-8 flex justify-center md:justify-end w-full md:w-auto min-w-[300px]">
          <SideCard
            imageSrc="/zyy.png"
            title="Zy recherche un financement orienté workspace & Workflow"
            description="Exécution de la logique métier et serveur en burn out."
            location="Anyama, Abidjan, Côte d'Ivoire"
          />
        </aside>
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
