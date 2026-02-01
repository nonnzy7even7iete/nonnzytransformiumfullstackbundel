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
    <div className="relative min-h-screen flex flex-col bg-app-gradient">
      <Navbar />

      <div className="fixed inset-0 z-0">
        <MasterAuroraBackground />
      </div>

      <main className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center px-4 md:px-8 pb-32 pt-24 md:pt-32 gap-6 md:gap-0">
        {/* ASIDE GAUCHE */}
        <aside className="relative z-11 md:absolute md:left-3 md:ml-6 lg:ml-8 flex justify-center md:justify-start w-full md:w-auto min-w-[300px]">
          <DataCard
            width={300}
            height={270}
            title={
              <div className="flex items-center justify-center gap-2 text-foreground">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-xs md:text-sm">
                  Data-driven growth : chaque flux, chaque métrique confirme le
                  potentiel d'Anyama
                </span>
              </div>
            }
            content={
              <div className="flex flex-col gap-1 text-foreground/80 text-sm overflow-auto max-h-[200px]">
                <p>
                  Les métriques d'attractivité et les flux d'investissement
                  convergent vers une réalité : le vrai potentiel se mesure dans
                  ce qui reste à révéler. Anyama dispose d'un avantage
                  stratégique encore invisible à la majorité des acteurs. La
                  data ne ment pas — la question, c'est qui l'exploitera en
                  premier :{" "}
                  <span className="bg-gradient-to-r from-green-500 to-blue-300 bg-clip-text text-transparent font-semibold">
                    Vision partagée
                  </span>
                </p>
                <p>
                  Les chiffres sont là. Les investisseurs arrivent. La question,
                  c'est : serez-vous prêts ?
                </p>
                <p>
                  Votre commune entre dans une zone d'attractivité stratégique :{" "}
                  <span className="bg-gradient-to-r from-green-500 to-blue-300 bg-clip-text text-transparent font-semibold">
                    Sans insights, chaque décision est un pari perdu d'avance.
                  </span>
                </p>
              </div>
            }
            buttonContent={
              <div className="w-full py-2 flex items-center justify-center gap-2 bg-foreground/5 border border-border rounded-xl shadow-xl transition-all hover:bg-foreground/10 group">
                <span className="text-sm font-bold uppercase tracking-tighter text-foreground group-hover:scale-105 transition-all">
                  Comprendre
                </span>
              </div>
            }
            modalContent={
              <div className="flex flex-col gap-2 text-foreground/90 text-sm">
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
                  La donnée réduit les coûts structurels de l'État. Investir
                  dans la donnée n'est pas une dépense : c'est un amortisseur de
                  dépenses futures.
                </p>
              </div>
            }
          />
        </aside>

        {/* SECTION CENTRALE : LOGIN BOX OPTIMISÉE POUR LOGO GÉANT */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full md:w-[550px] max-w-[95vw]">
          <div className="w-full p-6 md:p-10 backdrop-blur-2xl rounded-2xl bg-glass-dual border border-border-dual flex flex-col items-center">
            {/* CONTAINER DU LOGO - On augmente la hauteur pour laisser respirer le texte */}
            <div className="w-full h-48 md:h-80 flex items-center justify-center overflow-visible">
              <TextHoverEffect
                text="Nonnzytr"
                duration={0.6}
                style={{
                  width: "120%", // On force le dépassement léger pour l'impact
                  height: "100%",
                  fontSize: "clamp(10rem, 25vw, 18rem)", // TAILLE MASSIVE RESTAURÉE
                }}
              />
            </div>

            <p className="text-foreground text-lg mb-8 tracking-widest font-light uppercase">
              Votre aventure commence ici
            </p>

            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full max-w-sm py-4 flex items-center justify-center gap-3 
              bg-foreground text-background font-bold rounded-xl shadow-none
              hover:scale-[1.02] active:scale-95 transition-all duration-300 mb-6"
            >
              <FcGoogle className="text-2xl" />
              CONTINUER AVEC GOOGLE
            </button>

            <p className="text-foreground/40 text-[10px] italic tracking-tight">
              Connexion sécurisée via Google requise pour accéder au Workflow.
            </p>
          </div>
        </div>

        {/* ASIDE DROIT */}
        <aside className="relative z-10 md:absolute md:right-3 md:mr-6 lg:mr-8 flex justify-center md:justify-end w-full md:w-auto min-w-[300px]">
          <SideCard
            imageSrc="/zyy.png"
            title="Zy recherche un financement orienté workspace & Workflow"
            description="Exécution de la logique métier et serveur en burn out."
            location="Anyama, Abidjan, Côte d'Ivoire"
          />
        </aside>
      </main>

      {/* FOOTER */}
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
